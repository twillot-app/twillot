import { Tweet } from '../types'

const DB_VERSION = 2

function getObjectStore(db: IDBDatabase) {
  const transaction = db.transaction(['tweets'], 'readwrite')
  return {
    transaction,
    objectStore: transaction.objectStore('tweets'),
  }
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
      let objectStore = db.objectStoreNames.contains('tweets')
        ? target.transaction.objectStore('tweets')
        : db.createObjectStore('tweets', {
            keyPath: 'tweet_id',
          })

      if (!objectStore.indexNames.contains('full_text')) {
        objectStore.createIndex('full_text', 'full_text', { unique: false })
      }
      if (!objectStore.indexNames.contains('sort_index')) {
        objectStore.createIndex('sort_index', 'sort_index', { unique: false })
      }
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
      objectStore.put(record)
    })
  })
}

export async function findRecords(
  page = 1,
  pageSize = 100,
  keyword?: string | { fromUser: string },
): Promise<Tweet[]> {
  const db = await openDb()
  const skip = (page - 1) * pageSize // 计算跳过的记录数
  let recordsFetched = 0 // 已获取的记录数

  return new Promise((resolve, reject) => {
    const { objectStore } = getObjectStore(db)
    const index = objectStore.index('sort_index')
    const request = index.openCursor(null, 'prev')
    const results: Tweet[] = []

    request.onsuccess = (event: Event) => {
      const cursor = (event.target as IDBRequest<IDBCursorWithValue>).result
      if (cursor) {
        if (recordsFetched < skip) {
          cursor.advance(skip)
          recordsFetched = skip
        } else {
          const tweet = cursor.value as Tweet
          if (typeof keyword === 'object' && keyword.fromUser) {
            if (tweet.screen_name === keyword.fromUser) {
              results.push(tweet)
            }
          } else if (
            !keyword ||
            (typeof keyword === 'string' &&
              tweet.full_text.toLowerCase().includes(keyword.toLowerCase()))
          ) {
            results.push(tweet)
          }

          if (results.length < skip + pageSize) {
            cursor.continue()
          } else {
            resolve(results)
            return
          }
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

export function toRecord(record) {
  let base_result = record.content.itemContent.tweet_results.result
  if (base_result.tweet) {
    base_result = base_result.tweet
  }
  const legacy = base_result.legacy
  const user_legacy = base_result.core.user_results.result.legacy
  const entities = legacy.extended_entities || legacy.entities
  const alt_text = []
  const url = []
  const type = []
  if (entities.media) {
    for (const media of entities.media) {
      alt_text.push(media.ext_alt_text || '')
      url.push(media.media_url_https)
      type.push(media.type)
    }
  }
  return {
    sort_index: record.sortIndex,
    user_id: legacy.user_id_str,
    username: user_legacy.name,
    screen_name: user_legacy.screen_name,
    tweet_id: legacy.id_str,
    avatar_url: user_legacy.profile_image_url_https,
    possibly_sensitive: legacy.possibly_sensitive,
    media: {
      alt_text,
      url,
      type,
    },
    lang: legacy.lang,
    full_text:
      base_result.note_tweet?.note_tweet_results.result.text ||
      legacy.full_text,
    created_at: Math.floor(new Date(legacy.created_at).getTime() / 1000),
  }
}

export function getTweetId(record): string {
  let base_result = record.content.itemContent.tweet_results.result
  if (base_result.tweet) {
    base_result = base_result.tweet
  }
  const legacy = base_result.legacy
  return legacy.id_str
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
