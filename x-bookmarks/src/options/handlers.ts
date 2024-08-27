import { untrack } from 'solid-js/web'
import { reconcile } from 'solid-js/store'

import {
  deleteBookmark,
  getBookmarks,
  getTweetConversations,
  getTweetId,
  toRecord,
} from 'utils/api/twitter'
import { getRateLimitInfo } from 'utils/api/twitter-base'
import { DAYS, getLastNDaysDates } from 'utils/date'
import {
  upsertRecords,
  getRecord,
  iterate,
  countRecords,
  deleteRecord,
  findRecords,
  getRencentTweets,
  getTopUsers,
} from 'utils/db/tweets'
import { FetchError } from 'utils/xfetch'
import {
  TimelineEntry,
  TimelineTimelineItem,
  TimelineTweet,
  TimelineAddEntriesInstruction,
  Endpoint,
  AuthStatus,
  TaskType,
  API_HOST,
} from 'utils/types'
import {
  getCurrentUserId,
  StorageKeys,
  logout,
  setLocal,
  getAuthInfo,
  getLastSyncInfo,
  getLocal,
} from 'utils/storage'

import dataStore, { mutateStore } from './store'
import { getLevel, getLicense, MemberLevel } from 'utils/license'
import { PRICING_URL } from '~/libs/member'

// Wrap the sleep function
const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms))

const BATCH_SIZE = 10
const MAX_REQUESTS_PER_DAY = 512
const INITIAL_WAIT_TIME = 1000 // 初始等待时间，3秒
const MAX_RANDOM_VARIATION = 0.1 // 最大随机变化，10%

function calculateWaitTime(currentRequest: number): number {
  const baseTime = INITIAL_WAIT_TIME
  const ratio = currentRequest / MAX_REQUESTS_PER_DAY
  const waitTime = baseTime * (1 + Math.pow(ratio, 2))
  const randomVariation =
    (Math.random() * 2 - 1) * MAX_RANDOM_VARIATION * waitTime
  return waitTime + randomVariation
}

async function query(
  keyword = '',
  category = '',
  folder = '',
  lastId = '',
  limit = 100,
  append = false,
) {
  const [store, setStore] = dataStore
  const start = new Date().getTime()
  const tweets = await findRecords(keyword, category, folder, lastId, limit)
  setStore('hasMore', tweets.length === limit)
  if (append) {
    if (tweets.length > 0) {
      setStore('tweets', (current) => [...current, ...tweets])
    }
  } else {
    setStore('tweets', tweets)
    if (!store.isSidePanel && (keyword.trim() || category || folder)) {
      window.scrollTo(0, 720)
    }
  }
  setStore('searchTime', new Date().getTime() - start)
}

export async function queryByCondition(append = false) {
  const [store] = dataStore
  const tweets = untrack(() => store.tweets)
  query(
    store.keyword,
    store.category,
    store.folder,
    append ? tweets[tweets.length - 1]?.tweet_id || '' : '',
    store.pageSize,
    append,
  )
}

export async function initSync() {
  const [store, setStore] = dataStore
  try {
    /**
     * 可能之前已经同步过数据
     */
    setStore('topUsers', await getTopUsers(10))
    setStore('totalCount', await countRecords())
    await initHistory()

    const [auth, lastForceSynced] = await Promise.all([
      getAuthInfo(),
      getLastSyncInfo(),
    ])
    if (!auth || !auth.token) {
      throw new Error(AuthStatus.AUTH_FAILED)
    }

    if (!lastForceSynced) {
      setStore('isForceSyncing', true)
      /**
       * 全量同步时展示最新的 100 条数据
       * 后续更新只更新总数
       */
      for await (const docs of syncAllBookmarks(true)) {
        /**
         * 已经有最新的数据展示，不对数据进行操作
         */
        if (store.tweets.length > 0) {
          setStore('totalCount', await countRecords())
        } else {
          setStore('tweets', docs)
        }
        await initHistory()
      }

      setStore('isForceSyncing', false)
      setStore('topUsers', reconcile(await getTopUsers(10)))
      const syncedTime = Math.floor(Date.now() / 1000)
      await setLocal({
        [StorageKeys.Last_Sync]: syncedTime,
      })
    } else {
      /**
       * 增量更新时先展示最新的 100 条
       * 后续更新同时更新总数和展示数据
       */
      setStore('isAutoSyncing', true)
      for await (const docs of syncAllBookmarks()) {
        setStore('totalCount', await countRecords())
        /**
         * 当前正在搜索时不更新数据
         */
        const isSearching = store.keyword.trim() || store.category
        if (store.isAutoSyncing && isSearching) {
          continue
        }
        await query(store.keyword)
      }
      await initHistory()
      setStore('isAutoSyncing', false)
    }

    setStore('topUsers', reconcile(await getTopUsers(10)))
  } catch (err) {
    console.error(err)
    if (
      err.name == FetchError.IdentityError ||
      err.message == AuthStatus.AUTH_FAILED
    ) {
      setStore('isAuthFailed', true)
      await logout(await getCurrentUserId())
    } else {
      setStore('isForceSyncTimedout', true)
      setStore('isForceSyncing', false)
    }
  }
}

export async function initHistory() {
  const [_, setStore] = dataStore
  const days = getLastNDaysDates(DAYS)
  const { total, data: items } = await getRencentTweets(DAYS)
  const countMap = items.reduce((map, item) => {
    map[item.date] = item.count
    return map
  }, {})
  const history = days.map((date) => {
    return {
      date: date,
      count: countMap[date] || 0,
    }
  })
  setStore({
    history,
    historySize: total,
  })
}

export async function syncBookmarkChanges(isInit = false) {
  const tasks = (await getLocal(StorageKeys.Tasks))[StorageKeys.Tasks] || []
  const del_ids = []

  for (const task of tasks) {
    try {
      const id = task.payload.variables.tweet_id
      if (task.type === TaskType.DeleteBookmark) {
        await deleteRecord(id)
        del_ids.push(id)
      }
    } catch (e) {
      console.error(`Failed to delete bookmark`, task)
    }
  }
  mutateStore((state) => {
    state.tweets = state.tweets.filter((t) => !del_ids.includes(t.tweet_id))
  })

  if (!isInit && tasks.length > 0) {
    console.log(`Bookmark changes synced, total ${tasks.length} changes`, tasks)
    initSync()
  }

  await setLocal({
    [StorageKeys.Tasks]: [],
  })

  return del_ids
}

export async function* syncAllBookmarks(forceSync = false) {
  /**
   * 仅针对全量同步记录 cursor 到本地
   */
  const del_ids = await syncBookmarkChanges(true)
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

    let tweets = instruction.entries.filter(
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

      // 有可能被删除
      const docs = tweets
        .map((i) => toRecord(i.content.itemContent, i.sortIndex))
        .filter((t) => t && del_ids.includes(t.tweet_id) === false)
      await upsertRecords(docs)
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
  const detailLimit = 50
  /**
   * 一旦设置为 true/false 表示已经同步过
   */
  const records = await iterate(
    (t) => typeof t.is_thread !== 'boolean',
    detailLimit * 0.5,
  )
  console.log(`Syncing ${records.length} threads`, records)
  const uid = await getCurrentUserId()

  for (const record of records) {
    const rateLimitInfo = await getRateLimitInfo(Endpoint.TWEET_DETAIL, uid)
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
      await upsertRecords([record], true)
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

export async function getNextTweet() {
  const [store, setStore] = dataStore
  const index = store.selectedTweet
  if (index < 0) {
    console.warn('Invalid index')
    return
  }
  const nextIndex = index + 1
  if (nextIndex >= store.tweets.length) {
    console.warn('Invalid index')
    return
  }
  setStore('selectedTweet', nextIndex)
}

export async function getPrevTweet() {
  const [store, setStore] = dataStore
  const index = store.selectedTweet

  if (index < 0) {
    console.warn('Invalid index')
    return
  }
  const prevIndex = index - 1
  if (prevIndex < 0) {
    console.warn('Invalid index')
    return
  }
  setStore('selectedTweet', prevIndex)
}

export function resetQuery() {
  const [store, setStore] = dataStore
  setStore({
    keyword: '',
    category: '',
    folder: '',
  })
}

/**
 * 删除收藏
 * 删除数据库记录
 * 更新 store 中的数据
 * @param tweetId
 */
export async function removeBookmark(tweetId: string) {
  try {
    await deleteBookmark(tweetId)
    await deleteRecord(tweetId)
    mutateStore((state) => {
      const tweet = state.tweets.find((t) => t.tweet_id === tweetId)
      if (!tweet) {
        return
      }
      const folder = tweet.folder
      if (folder) {
        const folderItem = state.folders.find((f) => f.name === folder)
        if (folderItem) {
          folderItem.count -= 1
        }
      }
      state.tweets.splice(
        state.tweets.findIndex((t) => t.tweet_id === tweetId),
        1,
      )
      state.totalCount.total -= 1
    })
  } catch (e) {
    console.error('Failed to delete bookmark', e)
  }
}

export async function smartTagging() {
  const [store, setStore] = dataStore
  if (store.isTagging) {
    // 暂时不允许暂停
    // setStore('isTagging', false)
    // console.log('Stopping AI tagging process')
    return
  }

  let offset = 0
  let reqCount = 0
  let isLimited = false
  setStore('isTagging', true)

  const folders = store.folders.map((i) => i.name)
  const uid = await getCurrentUserId()
  while (store.isTagging) {
    // server error
    if (isLimited) {
      setStore('isTagging', false)
      alert('AI auto organizing is temporarily limited, please try again later')
      break
    }

    try {
      const license = await getLicense()
      const level = getLevel(license)
      const isFree = level === MemberLevel.Free

      if (isFree) {
        if (reqCount > BATCH_SIZE) {
          localStorage.setItem(
            'limited_time',
            Math.floor(Date.now() / 1000).toString(),
          )
          isLimited = true
        } else {
          // 24 小时后才能再次使用
          const limitedTime = parseInt(
            localStorage.getItem('limited_time') || '0',
          )
          isLimited = Date.now() / 1000 - limitedTime < 24 * 60 * 60
        }

        if (isLimited) {
          alert('Please upgrade to a paid plan to continue AI auto organizing')
          await sleep(3000)
          await chrome.tabs.create({
            url: PRICING_URL,
          })
          setStore('isTagging', false)
          break
        }
      }

      const tweets = await iterate((t) => !t.folder, BATCH_SIZE, offset)
      if (tweets.length === 0) {
        console.log('No more unclassified tweets')
        await sleep(60000)
        continue
      }

      offset += tweets.length

      for (const tweet of tweets) {
        if (!store.isTagging) {
          break
        }

        try {
          /**
           * Supply more text to parse
           */
          const text = tweet.quoted_tweet
            ? tweet.full_text + '\n' + tweet.quoted_tweet.full_text
            : tweet.full_text
          const res = await fetch(API_HOST + '/classify', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'X-Request-Id': btoa(
                JSON.stringify({
                  reqCount,
                  uid,
                  timestamp: Date.now(),
                  level,
                  license,
                }),
              ),
            },
            body: JSON.stringify({
              tweetText: text,
              folders: folders,
            }),
          })
          if (res.status === 429) {
            console.log('Rate limit exceeded')
            isLimited = true
            break
          }

          const json = await res.json()
          const folder = json.data.folder
          if (folder) {
            tweet.folder = folder
            await upsertRecords([tweet], true)
            mutateStore((state) => {
              const folderItem = state.folders.find((f) => f.name === folder)
              if (folderItem) {
                state.totalCount.unsorted -= 1
                folderItem.count += 1
              }
            })
            console.log(`Tweet ${tweet.tweet_id} classified into ${folder}`)
          }
        } catch (error) {
          console.error(`Error classifying tweet ${tweet.tweet_id}:`, error)
        }

        reqCount += 1
        const waitTime = calculateWaitTime(reqCount)
        console.log(
          `Request id = ${reqCount}, waiting for ${waitTime / 1000} seconds`,
        )
        await sleep(waitTime)
      }
    } catch (error) {
      console.error('Error fetching unclassified tweets:', error)
    }
  }
}
