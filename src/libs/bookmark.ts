import { addRecords, findRecords, toRecord, getTweetId, getRecord } from './db'
import {
  Header,
  AuthStatus,
  Host,
  TimelineEntry,
  TimelineTimelineItem,
  TimelineTweet,
  TimelineAddEntriesInstruction,
} from '../types'
import { exportData, ExportFormatType } from './export'
import { BookmarksResponse } from '../types'
import { addLocalItem, getLocalItem } from './browser'

const pageSize = 100

function buildUrl(url: string, cursor?: string) {
  const [base, query] = url.split('?')
  const variables = {
    cursor: '',
    count: pageSize,
    includePromotedContent: true,
  }
  if (cursor) {
    variables.cursor = cursor
  }
  return `${base}?variables=${encodeURIComponent(JSON.stringify(variables))}${query}`
}

async function getBookmarks(headers: Header, cursor?: string) {
  try {
    const res = await fetch(`${buildUrl(headers.url, cursor)}`, {
      headers: {
        accept: '*/*',
        authorization: headers.token,
        'content-type': 'application/json',
        'x-csrf-token': headers.csrf,
        'x-twitter-active-user': 'yes',
        'x-twitter-auth-type': 'OAuth2Session',
        'x-twitter-client-language': 'en-us',
        cookie: headers.cookie,
        Referer: `${Host}/i/bookmarks`,
      },
      body: null,
      method: 'GET',
    })
    const json = (await res.json()) as BookmarksResponse
    return json
  } catch (error) {
    console.error('Authentication failed', error)
    throw new Error(AuthStatus.AUTH_FAILED)
  }
}

export async function* syncAllBookmarks(headers: Header, forceSync = false) {
  /**
   * 从上次同步位置开始同步，如果没有上次同步位置，则从头开始同步
   */
  let cursor: string | undefined = await getLocalItem('bookmark_cursor')
  while (true) {
    const json = await getBookmarks(headers, cursor)
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
        const [latestTweet, lastTweet] = await Promise.all([
          getRecord(getTweetId(tweets[0])),
          getRecord(getTweetId(tweets[tweets.length - 1])),
        ])
        /**
         * 首尾两条都同步过了，说明已经同步完毕，可以退出循环
         * 如果因为同步被中断导致部分旧数据未同步，可以手动调用时设置 forceSync 参数为 true
         */
        if (latestTweet && lastTweet) {
          console.log('All bookmarks have been synchronized')
          break
        }
      }

      const docs = tweets.map((i) => toRecord(i))
      await addRecords(docs)
      yield docs
    }
    const target = instruction.entries[instruction.entries.length - 1].content
    if (target.entryType === 'TimelineTimelineCursor') {
      cursor = target.value
      await addLocalItem('bookmark_cursor', cursor)
    } else {
      break
    }
  }
}

export function searchBookmark(
  keyword: string | { fromUser: string },
  page = 1,
  pageSize = 100,
) {
  return findRecords(page, pageSize, keyword)
}

export async function exportBookmarks(format: ExportFormatType) {
  let allTweets = await searchBookmark('', 1, 100000)
  const all = allTweets.map((i) => {
    return {
      username: i.username,
      url: `${Host}/${i.screen_name}/status/${i.tweet_id}`,
      content: i.full_text,
      media: i.media.url.length > 0 ? i.media.url.join('\t') : '',
      media_count: i.media.url.length,
      contains_video: i.media.type.includes('video') ? 'Y' : 'N',
    }
  })
  exportData(all, format, `twillot.${format.toLowerCase()}`)
}
