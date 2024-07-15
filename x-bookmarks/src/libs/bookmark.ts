import { addRecords, getRecord, iterate } from 'utils/db/tweets'
import {
  TimelineEntry,
  TimelineTimelineItem,
  TimelineTweet,
  TimelineAddEntriesInstruction,
  Endpoint,
} from 'utils/types'
import {
  getBookmarks,
  getTweetConversations,
  getTweetId,
  toRecord,
} from 'utils/api/twitter'
import { getLocal, StorageKeys, setLocal } from 'utils/storage'
import { getRateLimitInfo } from 'utils/api/twitter-base'
import { FetchError } from 'utils/xfetch'

export async function* syncAllBookmarks(forceSync = false) {
  /**
   * 仅针对全量同步记录 cursor 到本地
   */
  let cursor: string | undefined = forceSync
    ? (await getLocal(StorageKeys.Bookmark_Cursor))[StorageKeys.Bookmark_Cursor]
    : undefined
  while (true) {
    const json = await getBookmarks(cursor)
    const instruction =
      json.data.bookmark_timeline_v2.timeline.instructions?.find(
        (i) => i.type === 'TimelineAddEntries',
      ) as TimelineAddEntriesInstruction | undefined
    if (!instruction) {
      console.error('No instructions found in response')
      break
    }

    const tweets = instruction.entries.filter(
      (e) => e.content.entryType === 'TimelineTimelineItem',
    ) as TimelineEntry<TimelineTweet, TimelineTimelineItem<TimelineTweet>>[]
    if (!tweets.length) {
      console.warn(
        `Reached end of bookmarks with cursor ${cursor}, ${tweets.length}`,
      )
      break
    } else {
      if (!forceSync) {
        if (await isBookmarksSynced(tweets)) {
          console.log('All bookmarks have been synchronized')
          break
        }
      }

      const docs = tweets.map((i) =>
        toRecord(i.content.itemContent, i.sortIndex),
      )
      await addRecords(docs)
      yield docs
    }
    const target = instruction.entries[instruction.entries.length - 1].content
    if (target.entryType === 'TimelineTimelineCursor') {
      cursor = target.value
      if (forceSync) {
        await setLocal({ [StorageKeys.Bookmark_Cursor]: cursor })
      }
    } else {
      break
    }
  }
}

/**
 * 定期同步 threads 记录
 * 详情接口的限制是 150 条
 */
export async function syncThreads() {
  const detailLimit = 150
  const records = await iterate((t) => t.is_thread == null, detailLimit * 0.5)
  console.log(`Syncing ${records.length} threads`, records)

  for (const record of records) {
    const rateLimitInfo = await getRateLimitInfo(Endpoint.TWEET_DETAIL)
    if (rateLimitInfo?.remaining < 50) {
      const retryIn = rateLimitInfo.reset * 1000 - Date.now() + 60 * 1000
      setTimeout(syncThreads, retryIn)
      console.log(
        `Rate limit reached, retry in ${Math.floor(retryIn / 1000)} seconds`,
        rateLimitInfo,
      )
      break
    }

    try {
      const conversations = await getTweetConversations(record.tweet_id)
      record.conversations = conversations
      record.is_thread = conversations.length > 0
      await addRecords([record], true)
    } catch (e) {
      console.error('Failed to get conversations', e)
      if (e.name === FetchError.IdentityError) {
        break
      }
    }
  }

  console.log('Synced threads finished')
  setTimeout(syncThreads, 10 * 60 * 1000)
}

export async function isBookmarksSynced(
  tweets: TimelineEntry<TimelineTweet, TimelineTimelineItem<TimelineTweet>>[],
) {
  const remoteLatest = tweets[0]
  const remoteLast = tweets[tweets.length - 1]
  const [localLatest, localLast] = await Promise.all([
    getRecord(getTweetId(remoteLatest)),
    getRecord(getTweetId(remoteLast)),
  ])
  /**
   * 首尾两条都同步过了，说明已经同步完毕，可以退出循环
   * 如果因为同步被中断导致部分旧数据未同步，可以手动调用时设置 forceSync 参数为 true
   */
  if (localLatest && localLast) {
    // 有可能将老数据取消收藏，然后又重新收藏
    // 这个时候 sort_index 没有更新，需要重新同步
    if (
      localLatest.sort_index === remoteLatest.sortIndex &&
      localLast.sort_index === remoteLast.sortIndex
    ) {
      return true
    }
  }

  return false
}
