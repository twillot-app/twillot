import { addRecords, findRecords, toRecord, getTweetId, getRecord } from './db'
import { Tweet, Header } from '../types'

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
}

export async function syncAllBookmarks(headers: Header) {
  let cursor: string | undefined = undefined
  while (true) {
    const json = await getBookmarks(headers, cursor)
    const instruction = json.data.bookmark_timeline_v2.timeline.instructions?.find(
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
      console.warn(`Reached end of bookmarks with cursor ${cursor}, ${tweets.length}`)
      break
    } else {
      const [latestTweet, lastTweet] = await Promise.all([
        getRecord(getTweetId(tweets[0])),
        getRecord(getTweetId(tweets[tweets.length - 1])),
      ])
      if (!latestTweet && !lastTweet) {
        const docs = tweets.map(toRecord)
        await addRecords(docs)
        console.log(`Synced ${tweets.length} bookmarks`)
      } else {
        console.log(`Tweets already exists`)
        break
      }
    }
    cursor = instruction.entries[instruction.entries.length - 1]?.content.value
  }
}

export function searchBookmark(keyword: string) {
  return findRecords(1, 100, keyword)
}
