import { addRecords, findRecords, toRecord, getTweetId, getRecord } from './db'
import { Tweet, Header, AuthStatus } from '../types'
import { exportData, ExportFormatType } from './export'

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
        'x-twitter-active-user': 'no',
        'x-twitter-auth-type': 'OAuth2Session',
        'x-twitter-client-language': 'zh-cn',
        cookie: headers.cookie,
        Referer: 'https://twitter.com/i/bookmarks',
      },
      referrer: 'https://twitter.com/i/bookmarks',
      body: null,
      method: 'GET',
    })
    const json = await res.json()
    return json
  } catch (error) {
    console.error('Authentication failed', error)
    throw new Error(AuthStatus.AUTH_FAILED)
  }
}

export async function* syncAllBookmarks(headers: Header, forceSync = false) {
  let cursor: string | undefined = undefined
  while (true) {
    const json = await getBookmarks(headers, cursor)
    const instruction =
      json.data.bookmark_timeline_v2.timeline.instructions?.find(
        (i) => i.type === 'TimelineAddEntries',
      )
    if (!instruction) {
      console.error('No instructions found in response')
      break
    }

    const tweets = instruction.entries.filter(
      (e) => e.content.entryType === 'TimelineTimelineItem',
    ) as Tweet[]
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

      const docs = tweets.map(toRecord)
      await addRecords(docs)
      yield docs
    }
    cursor = instruction.entries[instruction.entries.length - 1]?.content.value
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
      url: `https://x.com/${i.screen_name}/status/${i.tweet_id}`,
      content: i.full_text,
      media: i.media.url.length > 0 ? i.media.url.join('\t') : '',
      media_count: i.media.url.length,
      contains_video: i.media.type.includes('video') ? 'Y' : 'N',
    }
  })
  exportData(all, format, `twillot.${format.toLowerCase()}`)
}
