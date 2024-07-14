import { Tweet, QueryOptions, CountInfo } from '../types'
import { formatDate } from '../date'
import { parseTwitterQuery } from '../query-parser'
import { getCurrentUserId } from '../storage'
import { openDb, getObjectStore, TWEETS_TABLE_NAME_V2 } from './index'

export function getPostId(user_id: string, tweet_id: string) {
  if (!user_id || !tweet_id) {
    console.error('Invalid user_id or tweet_id', user_id, tweet_id)
    throw new Error('Invalid user_id or tweet_id')
  }

  return tweet_id.includes(user_id) ? tweet_id : user_id + '_' + tweet_id
}

export async function addRecords(
  records: Tweet[],
  overwrite = false,
): Promise<void> {
  const db = await openDb()
  const user_id = await getCurrentUserId()

  return new Promise((resolve, reject) => {
    const { transaction, objectStore } = getObjectStore(
      db,
      TWEETS_TABLE_NAME_V2,
    )
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
        const key = getPostId(user_id, record.tweet_id)
        record.id = key
        record.owner_id = user_id

        if (overwrite) {
          objectStore.put(record)
          return
        }

        const getRequest = objectStore.get(key)
        getRequest.onsuccess = () => {
          if (!getRequest.result) {
            objectStore.put(record)
          }
        }
        getRequest.onerror = (event: Event) => {
          console.error(
            'Get request error: ' +
              record.tweet_id +
              (event.target as IDBRequest).error?.toString(),
          )
        }
      }
    })
  })
}

function meetsCriteria(
  tweet: Tweet,
  options: QueryOptions,
  category = '',
  folder = '',
  user_id = '',
): boolean {
  if (tweet.owner_id !== user_id) {
    return false
  }

  let folderFilter = false
  // 指定 folder 为 null 表示查询没有 unsorted 的记录
  if (folder === 'Unsorted') {
    folderFilter = !tweet.folder
  } else {
    folderFilter =
      !folder || tweet.folder?.toLowerCase() === folder.toLowerCase()
  }

  return (
    (!options.keyword ||
      tweet.full_text.toLowerCase().includes(options.keyword.toLowerCase())) &&
    (!options.fromUser ||
      tweet.screen_name.toLowerCase() === options.fromUser.toLowerCase()) &&
    (!category || tweet[category]) &&
    folderFilter
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
  folder = '',
  lastId = '',
  pageSize = 100,
): Promise<Tweet[]> {
  const db = await openDb()
  const user_id = await getCurrentUserId()
  const options = parseTwitterQuery(keyword)
  const results: Tweet[] = []
  let recordsFetched = 0 // 实际已获取的记录数
  let isStartLooking = !lastId
  const since = options.since
    ? Math.floor(new Date(options.since + ' 00:00:00').getTime() / 1000)
    : null
  const until = options.until
    ? Math.floor(new Date(options.until + ' 23:59:59').getTime() / 1000)
    : null
  const indexName = since || until ? 'created_at' : 'sort_index' // 选择索引

  return new Promise((resolve, reject) => {
    const { objectStore } = getObjectStore(db, TWEETS_TABLE_NAME_V2)
    const index = objectStore.index(indexName)
    const range = getRange(since, until) // 创建时间范围
    const request = index.openCursor(range, 'prev')

    request.onsuccess = (event: Event) => {
      const cursor = (event.target as IDBRequest<IDBCursorWithValue>).result
      if (cursor) {
        const tweet = cursor.value as Tweet
        if (isStartLooking) {
          const met = meetsCriteria(tweet, options, category, folder, user_id)
          if (met) {
            recordsFetched++
            if (recordsFetched <= pageSize) {
              results.push(tweet)
            }
            if (recordsFetched === pageSize) {
              resolve(results)
              return
            }
          }
        } else {
          if (tweet.tweet_id === lastId) {
            isStartLooking = true
          }
        }

        cursor.continue()
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

export async function getRecord(tweetId: string): Promise<Tweet | undefined> {
  if (!tweetId) {
    return Promise.resolve(undefined)
  }

  const db = await openDb()
  const user_id = await getCurrentUserId()
  const key = getPostId(user_id, tweetId)

  return new Promise((resolve, reject) => {
    const { objectStore } = getObjectStore(db, TWEETS_TABLE_NAME_V2)
    const request = objectStore.get(key)

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

export async function deleteRecord(id: string): Promise<Tweet | undefined> {
  if (!id) {
    return Promise.resolve(undefined)
  }

  const db = await openDb()
  const user_id = await getCurrentUserId()
  const key = getPostId(user_id, id)
  const record = await getRecord(key)

  return new Promise((resolve, reject) => {
    const { objectStore } = getObjectStore(db, TWEETS_TABLE_NAME_V2)
    const request = objectStore.delete(key)
    request.onsuccess = (event: Event) => {
      resolve(record)
    }
    request.onerror = (event: Event) => {
      reject(
        'Get record error: ' + (event.target as IDBRequest).error?.toString(),
      )
    }
  })
}

export async function countRecords(
  indexName?: string,
  value?: string,
): Promise<CountInfo> {
  const db = await openDb()
  const user_id = await getCurrentUserId()

  return new Promise((resolve, reject) => {
    const { objectStore } = getObjectStore(db, TWEETS_TABLE_NAME_V2)
    let request
    if (indexName) {
      const index = objectStore.index(indexName)
      const keyRange = IDBKeyRange.only(value)
      request = index.count(keyRange)
    } else {
      request = objectStore.count()
    }
    const counts = {
      total: 0,
      // 不属于任何文件夹
      unsorted: 0,
      image: 0,
      video: 0,
      gif: 0,
      link: 0,
      quote: 0,
      long_text: 0,
    }
    request.onsuccess = async (event: Event) => {
      const total = (event.target as IDBRequest<number>).result
      if (indexName) {
        counts.total = total
        resolve(counts)
      } else {
        const cursorRequest = objectStore.openCursor()
        cursorRequest.onsuccess = (cursorEvent: Event) => {
          const cursor = (cursorEvent.target as IDBRequest<IDBCursorWithValue>)
            .result
          if (cursor) {
            const record = cursor.value
            if (record.owner_id === user_id) {
              counts.total++
              if (record.has_image) counts.image++
              if (record.has_video) counts.video++
              if (record.has_gif) counts.gif++
              if (record.has_link) counts.link++
              if (record.has_quote) counts.quote++
              if (record.is_long_text) counts.long_text++
              if (!record.folder) counts.unsorted++
            }
            cursor.continue()
          } else {
            resolve(counts)
          }
        }
        cursorRequest.onerror = (cursorEvent: Event) => {
          reject(
            'Cursor error: ' +
              (cursorEvent.target as IDBRequest).error?.toString(),
          )
        }
      }
    }
    request.onerror = (event: Event) => {
      reject(
        'Count records error: ' +
          (event.target as IDBRequest).error?.toString(),
      )
    }
  })
}

export async function aggregateUsers(): Promise<
  Record<
    string,
    { username: string; avatar_url: string; screen_name: string; count: number }
  >
> {
  const db = await openDb()
  const user_id = await getCurrentUserId()
  const userInfo = {}

  return new Promise((resolve, reject) => {
    const { objectStore } = getObjectStore(db, TWEETS_TABLE_NAME_V2)
    const index = objectStore.index('sort_index')
    const request = index.openCursor()

    request.onsuccess = (event) => {
      const cursor = (event.target as IDBRequest<IDBCursorWithValue>).result
      if (cursor) {
        const record = cursor.value
        if (record.owner_id === user_id) {
          const userId = record.screen_name
          if (!userInfo[userId]) {
            userInfo[userId] = {
              avatar_url: record.avatar_url,
              username: record.username,
              screen_name: record.screen_name,
              count: 0,
            }
          }
          userInfo[userId].count += 1
        }
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

export async function getRencentTweets(days: number): Promise<{
  total: number
  data: { date: string; count: number }[]
}> {
  const db = await openDb()
  const user_id = await getCurrentUserId()
  return new Promise((resolve, reject) => {
    const { objectStore } = getObjectStore(db, TWEETS_TABLE_NAME_V2)
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
        if (tweet.owner_id === user_id) {
          const date = formatDate(new Date(tweet.created_at * 1000))
          total += 1
          if (dateCounts[date]) {
            dateCounts[date] += 1
          } else {
            dateCounts[date] = 1
          }
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

export async function clearFolder(folder: string): Promise<void> {
  const db = await openDb()
  const user_id = await getCurrentUserId()

  return new Promise((resolve, reject) => {
    const store = getObjectStore(db, TWEETS_TABLE_NAME_V2).objectStore
    const index = store.index('folder')
    const request = index.openCursor(IDBKeyRange.only(folder))

    request.onsuccess = (event) => {
      const cursor = (event.target as IDBRequest<IDBCursorWithValue>).result
      if (cursor) {
        const updateData = cursor.value
        if (updateData.owner_id === user_id) {
          updateData.folder = ''
          cursor.update(updateData)
        }
        cursor.continue()
      } else {
        resolve()
      }
    }

    request.onerror = (event) => {
      reject(
        'Failed to clear folder: ' +
          (event.target as IDBRequest).error?.toString(),
      )
    }
  })
}

export async function updateFolder(
  ids: string[],
  folder: string,
): Promise<number> {
  const db = await openDb()
  return new Promise((resolve, reject) => {
    const { objectStore, transaction } = getObjectStore(
      db,
      TWEETS_TABLE_NAME_V2,
    )

    let count = 0

    transaction.oncomplete = function () {
      resolve(count)
    }

    transaction.onerror = function (err) {
      reject(err)
    }

    ids.forEach((id) => {
      // 获取记录
      const request = objectStore.get(id)
      request.onsuccess = function () {
        const record = request.result
        if (record) {
          record.folder = folder
          objectStore.put(record)
          count += 1
        } else {
          console.log(`Record with id ${id} not found`)
        }
      }

      request.onerror = function (err) {
        console.error(`Error getting record with id ${id}:`, err)
      }
    })
  })
}

export async function iterate(
  filter: (record: Tweet) => boolean,
): Promise<Tweet[]> {
  const db = await openDb()
  const user_id = await getCurrentUserId()
  const records: Tweet[] = []

  return new Promise((resolve, reject) => {
    const { objectStore } = getObjectStore(db, TWEETS_TABLE_NAME_V2)
    const index = objectStore.index('sort_index')
    const request = index.openCursor()

    request.onsuccess = (event) => {
      const cursor = (event.target as IDBRequest<IDBCursorWithValue>).result
      if (cursor) {
        const record = cursor.value
        if (record.owner_id === user_id) {
          if (filter(record)) {
            records.push(record)
          }
        }
        cursor.continue()
      } else {
        resolve(records)
      }
    }

    request.onerror = () => reject(request.error)
  })
}
