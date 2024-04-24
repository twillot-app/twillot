import {
  TimelineTweet,
  Tweet,
  TimelineEntry,
  TimelineTimelineItem,
  TweetWithPosition,
  IndexedDbIndexItem,
  QueryOptions,
} from '../types'
import { parseTwitterQuery } from './query-parser'
import { URL_REG } from './text'

const DB_VERSION = 6

function getObjectStore(db: IDBDatabase, tableName = 'tweets') {
  const transaction = db.transaction([tableName], 'readwrite')
  return {
    transaction,
    objectStore: transaction.objectStore(tableName),
  }
}

function updateTableScheme(
  db: IDBDatabase,
  transaction: IDBTransaction,
  tableName: string,
  keyPath: string,
  indexes: IndexedDbIndexItem[],
) {
  let objectStore = db.objectStoreNames.contains(tableName)
    ? transaction.objectStore(tableName)
    : db.createObjectStore(tableName, {
        keyPath: keyPath,
      })

  indexes.forEach((index) => {
    if (!objectStore.indexNames.contains(index.name)) {
      objectStore.createIndex(index.name, index.name, index.options)
    }
  })
}

export function openDb(): Promise<IDBDatabase> {
  return new Promise((resolve, reject) => {
    if (!window.indexedDB) {
      reject('IndexedDB is not supported by this browser.')
      return
    }

    const request = window.indexedDB.open('twillot', DB_VERSION)
    request.onerror = (event: Event) => {
      reject(
        'Database error: ' +
          (event.target as IDBOpenDBRequest).error?.toString(),
      )
    }
    request.onupgradeneeded = (event: IDBVersionChangeEvent) => {
      const target = event.target as IDBOpenDBRequest
      const db = target.result
      // DO NOT create a new transaction here
      const indexFields =
        'full_text,sort_index,screen_name,created_at,has_image,has_video,has_link,has_quote,is_long_text'
          .split(',')
          .map((field) => ({
            name: field,
            options: {
              unique: false,
            },
          }))
      updateTableScheme(
        db,
        target.transaction,
        'tweets',
        'tweet_id',
        indexFields,
      )
    }

    request.onsuccess = (event: Event) => {
      const db = (event.target as IDBOpenDBRequest).result
      resolve(db)
    }
  })
}

export async function addRecords(records: Tweet[]): Promise<void> {
  const db = await openDb()
  return new Promise((resolve, reject) => {
    const { transaction, objectStore } = getObjectStore(db)
    transaction.oncomplete = () => {
      resolve()
    }
    transaction.onerror = (event: Event) => {
      reject(
        'Transaction error: ' + (event.target as IDBRequest).error?.toString(),
      )
    }
    records.forEach((record) => {
      if (record) {
        objectStore.put(record)
      }
    })
  })
}

function meetsCriteria(
  tweet: Tweet,
  options: QueryOptions,
  category = '',
): boolean {
  return (
    (!options.keyword ||
      tweet.full_text.toLowerCase().includes(options.keyword.toLowerCase())) &&
    (!options.fromUser ||
      tweet.screen_name.toLowerCase() === options.fromUser.toLowerCase()) &&
    (!category || tweet[category])
  )
}

function getRange(since?: number, until?: number): IDBKeyRange | null {
  if (since && until) {
    return IDBKeyRange.bound(since, until)
  } else if (since) {
    return IDBKeyRange.lowerBound(since)
  } else if (until) {
    return IDBKeyRange.upperBound(until)
  }
  return null
}

/**
 * Number 目前都只查了第一页，翻页涉及查询条件会不准
 */
export async function findRecords(
  keyword = '',
  category = '',
  page = 1,
  pageSize = 100,
): Promise<Tweet[]> {
  const db = await openDb()
  const options = parseTwitterQuery(keyword)
  const skip = (page - 1) * pageSize
  const results: Tweet[] = []
  let recordsFetched = 0 // 实际已获取的记录数
  const since = options.since
    ? Math.floor(new Date(options.since + ' 00:00:00').getTime() / 1000)
    : null
  const until = options.until
    ? Math.floor(new Date(options.until + ' 23:59:59').getTime() / 1000)
    : null
  const indexName = since || until ? 'created_at' : 'sort_index' // 选择索引

  return new Promise((resolve, reject) => {
    const { objectStore } = getObjectStore(db)
    const index = objectStore.index(indexName)
    const range = getRange(since, until) // 创建时间范围
    const request = index.openCursor(range, 'prev')

    request.onsuccess = (event: Event) => {
      const cursor = (event.target as IDBRequest<IDBCursorWithValue>).result
      if (cursor) {
        // 如果还没有到达应该开始收集数据的记录
        if (recordsFetched < skip) {
          // 高效跳过
          cursor.advance(skip - recordsFetched)
          recordsFetched = skip
        } else {
          const tweet = cursor.value as Tweet
          const met = meetsCriteria(tweet, options, category)
          if (met) {
            recordsFetched++
            if (recordsFetched <= skip + pageSize) {
              results.push(tweet)
            }
            if (recordsFetched === skip + pageSize) {
              resolve(results)
              return
            }
          }
          cursor.continue()
        }
      } else {
        resolve(results)
      }
    }

    request.onerror = (event: Event) => {
      reject(
        'Failed to retrieve records: ' +
          (event.target as IDBRequest).error?.toString(),
      )
    }
  })
}

export async function getRecord(id: string): Promise<Tweet | undefined> {
  const db = await openDb()

  return new Promise((resolve, reject) => {
    const { objectStore } = getObjectStore(db)
    const request = objectStore.get(id)

    request.onsuccess = (event: Event) => {
      resolve((event.target as IDBRequest<Tweet>).result)
    }

    request.onerror = (event: Event) => {
      reject(
        'Get record error: ' + (event.target as IDBRequest).error?.toString(),
      )
    }
  })
}

export async function countRecords(): Promise<number> {
  const db = await openDb()

  return new Promise((resolve, reject) => {
    const { objectStore } = getObjectStore(db)
    const request = objectStore.count()
    request.onsuccess = (event: Event) => {
      resolve((event.target as IDBRequest<number>).result)
    }
    request.onerror = (event: Event) => {
      reject(
        'Count records error: ' +
          (event.target as IDBRequest).error?.toString(),
      )
    }
  })
}
export function toRecord(
  record: TimelineEntry<TimelineTweet, TimelineTimelineItem<TimelineTweet>>,
): Tweet | null {
  let base_result = record.content.itemContent.tweet_results.result
  const typename = base_result.__typename
  if (typename !== 'Tweet' && typename !== 'TweetWithVisibilityResults') {
    return null
  }
  if (typename === 'TweetWithVisibilityResults') {
    base_result = base_result.tweet
  }
  const legacy = base_result.legacy
  // 接口有时候报错，不返回
  if (!legacy) {
    return null
  }

  const user_legacy = base_result.core.user_results.result.legacy
  const entities = legacy.extended_entities || legacy.entities
  const media_items = entities?.media
  const full_text =
    base_result.note_tweet?.note_tweet_results.result.text || legacy.full_text

  return {
    sort_index: record.sortIndex,
    user_id: legacy.user_id_str,
    username: user_legacy.name,
    screen_name: user_legacy.screen_name,
    tweet_id: legacy.id_str,
    avatar_url: user_legacy.profile_image_url_https,
    possibly_sensitive: legacy.possibly_sensitive,
    media_items,
    has_gif: !!media_items?.some((item) => item.type === 'animated_gif'),
    has_image: !!media_items?.some((item) => item.type === 'photo'),
    has_video: !!media_items?.some((item) => item.type === 'video'),
    has_quote: !!base_result.quoted_status_result,
    is_long_text: !!base_result.note_tweet?.note_tweet_results,
    has_link: URL_REG.test(full_text),
    lang: legacy.lang,
    full_text,
    created_at: Math.floor(new Date(legacy.created_at).getTime() / 1000),
  } as Tweet
}

export function getTweetId(
  record: TimelineEntry<TimelineTweet, TimelineTimelineItem<TimelineTweet>>,
): string {
  let base_result = record.content.itemContent.tweet_results.result
  if ('tweet' in base_result) {
    return base_result.tweet.legacy.id_str
  }
  if ('legacy' in base_result) {
    return base_result.legacy.id_str
  }

  return ''
}

export async function aggregateUsers() {
  const db = await openDb()
  const userInfo = {}

  return new Promise((resolve, reject) => {
    const { objectStore } = getObjectStore(db)
    const index = objectStore.index('sort_index')
    const request = index.openCursor()

    request.onsuccess = (event) => {
      const cursor = (event.target as IDBRequest<IDBCursorWithValue>).result
      if (cursor) {
        const userId = cursor.value.screen_name
        if (!userInfo[userId]) {
          userInfo[userId] = {
            avatar_url: cursor.value.avatar_url,
            username: cursor.value.username,
            screen_name: cursor.value.screen_name,
            count: 0,
          }
        }
        userInfo[userId].count += 1

        cursor.continue()
      } else {
        resolve(userInfo)
      }
    }

    request.onerror = () => reject(request.error)
  })
}

export async function getTopUsers(num = 10) {
  const users = await aggregateUsers()
  return Object.values(users)
    .sort((a, b) => b.count - a.count)
    .slice(0, num)
}

export async function getTimeline(): Promise<TweetWithPosition[]> {
  const db = await openDb()

  return new Promise((resolve, reject) => {
    const { objectStore } = getObjectStore(db)
    const index = objectStore.index('sort_index')
    const request = index.openCursor(null, 'next')
    const results: TweetWithPosition[] = []
    let count = 0
    const targets = new Set([1, 100, 1000])

    request.onsuccess = (event) => {
      const cursor = (event.target as IDBRequest<IDBCursorWithValue>).result
      if (cursor) {
        count++
        if (
          (count <= 1000 && targets.has(count)) ||
          (count > 1000 && (count - 1000) % 1000 === 0)
        ) {
          results.unshift({
            tweet: cursor.value,
            position: count,
          })
        }
        cursor.continue()
      } else {
        resolve(results)
      }
    }

    request.onerror = (event) => {
      reject((event.target as IDBRequest).error)
    }
  })
}

export async function getRencentTweets(days: number): Promise<{
  total: number
  data: { date: string; count: number }[]
}> {
  const db = await openDb()
  return new Promise((resolve, reject) => {
    const { objectStore } = getObjectStore(db)
    const index = objectStore.index('created_at')
    const oneYearAgo = Math.floor(
      (Date.now() - days * 24 * 60 * 60 * 1000) / 1000,
    )
    const range = IDBKeyRange.lowerBound(oneYearAgo)
    const request = index.openCursor(range)
    const dateCounts: { [key: string]: number } = {}
    let total = 0

    request.onsuccess = () => {
      const cursor = request.result
      if (cursor) {
        const tweet = cursor.value
        const date = new Date(tweet.created_at * 1000).toLocaleDateString()
        total += 1
        if (dateCounts[date]) {
          dateCounts[date] += 1
        } else {
          dateCounts[date] = 1
        }
        cursor.continue()
      } else {
        const result = Object.keys(dateCounts).map((date) => ({
          date,
          count: dateCounts[date],
        }))
        resolve({
          total,
          data: result,
        })
      }
    }

    request.onerror = (event) => {
      reject(request.error)
    }
  })
}
