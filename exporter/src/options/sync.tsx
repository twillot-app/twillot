import { getLocal, setLocal } from 'utils/storage'
import {
  getAllInstructionDetails,
  getInstructions,
  ResponseKeyPath,
} from 'utils/api/twitter-res-utils'
import {
  getPosts,
  getReplies,
  getMedia,
  getLikes,
  getFollowers,
} from 'utils/api/twitter-user'
import { getUserById, toRecord } from 'utils/api/twitter'
import { FetchError } from 'utils/xfetch'
import { getRateLimitInfo } from 'utils/api/twitter-base'
import { Endpoint, TimelineTweet, TimelineUser, Tweet, User } from 'utils/types'
import { createSchema, getObjectStore, indexFields, openDb } from 'utils/db'

import { mutateStore, TaskState } from './store'
import { getPostId } from 'utils/db/tweets'
import get from 'lodash.get'

const dbName = 'twillot'
const dbVersion = 2
const tableName = 'posts'

type Category = 'posts' | 'replies' | 'media' | 'likes' | 'followers'

type Handler =
  | typeof getPosts
  | typeof getReplies
  | typeof getMedia
  | typeof getLikes
  | typeof getFollowers

export async function initDb() {
  await openDb(dbName, dbVersion, function upgradeDb(db, transaction) {
    createSchema(
      db,
      transaction,
      tableName,
      'id',
      indexFields.concat({
        name: 'category_name',
        options: {
          unique: false,
          multiEntry: false,
        },
      }),
    )
  })
}

export async function upsertDocs(docs: Tweet[] | User[]) {
  const db = await openDb(dbName, dbVersion)

  return new Promise((resolve, reject) => {
    const { transaction: tx, objectStore } = getObjectStore(db, tableName)
    docs.forEach((doc) => {
      objectStore.put(doc)
    })
    tx.oncomplete = () => {
      resolve(true)
    }
    tx.onerror = () => {
      reject(false)
    }
  })
}

export async function countDocs(
  uid: string,
): Promise<Record<Category, number>> {
  const db = await openDb(dbName, dbVersion)
  const { objectStore } = getObjectStore(db, tableName)

  return new Promise((resolve, reject) => {
    const categoryCount: Record<Category, number> = {
      posts: 0,
      replies: 0,
      media: 0,
      likes: 0,
      followers: 0,
    }
    const index = objectStore.index('owner_id')
    const request = index.openCursor(IDBKeyRange.only(uid))

    request.onsuccess = (event) => {
      const cursor = (event.target as IDBRequest).result
      if (cursor) {
        const category = cursor.value.category_name
        if (category) {
          categoryCount[category] += 1
        }
        cursor.continue()
      } else {
        resolve(categoryCount)
      }
    }

    request.onerror = (e) => {
      reject(e)
    }
  })
}

export function getCategoryDetails(
  uid: string,
  jsonPosts: any,
  category: Category,
) {
  const instructions = getInstructions(
    jsonPosts,
    ResponseKeyPath[`user_${category}`],
  )
  /**
   * Followers 的 itemEntries itemType 为 "TimelineUser"
   * moduleEntries 里面可能包含 TimelineUser
   */
  const { cursorEntry, itemEntries, moduleEntries, moduleItems } =
    getAllInstructionDetails(instructions, uid)

  const list = [
    ...itemEntries,
    ...(moduleEntries.length > 0 &&
    moduleEntries[0].itemType === 'TimelineTweet'
      ? moduleEntries
      : []),
    ...moduleItems,
  ]

  let docs
  if (category === 'followers') {
    docs = (list as TimelineUser[]).map((item) => {
      const user = item.user_results.result
      if (!user) {
        return null
      }

      return {
        ...user,
        owner_id: uid,
        category_name: category,
      }
    })
  } else {
    docs = (list as TimelineTweet[]).map((item) => {
      const tweet = toRecord(item, '')
      if (!tweet) {
        return null
      }
      if (category === 'replies' && !tweet.is_reply) {
        return null
      }

      const key = getPostId(uid, tweet.tweet_id)
      tweet.sort_index = tweet.created_at.toString()
      // 多个分类下存在重复内容，需要区分
      tweet.id = `${category}_${key}`
      tweet.owner_id = uid

      return {
        ...tweet,
        category_name: category,
      }
    })
  }

  docs = docs.filter((t) => t !== null)

  return {
    docs,
    cursorEntry,
  }
}

// 新增函数：检查文档是否存在
async function checkDocsExist(ids: string[]): Promise<string[]> {
  const db = await openDb(dbName, dbVersion)
  const { objectStore } = getObjectStore(db, tableName)

  return new Promise((resolve) => {
    const existingIds: string[] = []
    let count = 0

    ids.forEach((id) => {
      const request = objectStore.get(id)
      request.onsuccess = () => {
        if (request.result) {
          existingIds.push(id)
        }
        count++
        if (count === ids.length) {
          resolve(existingIds)
        }
      }
    })
  })
}

export function catchError(
  err: Error,
  uid: string,
  category: Category,
  endpoint: Endpoint,
) {
  console.error('Sync error', uid, category, endpoint, err)
  if (err.name === FetchError.RateLimitError) {
    const rate_limit = getRateLimitInfo(endpoint, uid)
    mutateStore((state) => {
      state[category].state = TaskState.paused
      state[category].reset = rate_limit.reset
    })
  } else {
    mutateStore((state) => {
      state[category].state = TaskState.errored
    })
  }
}

/**
 * 取最近三页数据强制同步
 */
export async function startSyncRecent(
  uid: string,
  category: Category,
  func: Handler,
  endpoint: Endpoint,
) {
  /**
   * 还没有进行全量同步则不强制同步最近数据
   */
  try {
    const local = await getLocal(category + '_cursor')
    if (!local[category + '_cursor']) {
      console.log('No cursor found, skipping recent sync', category)
      return
    }

    let cursor = ''
    for (let i = 0; i < 3; i++) {
      const jsonPosts = await func(uid, cursor)
      const { docs, cursorEntry } = getCategoryDetails(uid, jsonPosts, category)
      cursor = cursorEntry

      // 检查首尾文档是否已存在
      if (docs.length > 0) {
        const [firstDoc, lastDoc] = [docs[0], docs[docs.length - 1]]
        const existingDocs = await checkDocsExist([firstDoc.id, lastDoc.id])
        if (existingDocs.length === 2) {
          console.log('Item exists', category)
          break
        }
      }

      await upsertDocs(docs)
      mutateStore((state) => {
        state[category].state = TaskState.started
      })
      console.log('Synced recent data', category, docs.length)
    }
  } catch (err) {
    catchError(err, uid, category, endpoint)
  }
}

export async function startSyncAll(
  uid: string,
  category: Category,
  func: Handler,
  endpoint: Endpoint,
) {
  if (!uid) {
    console.error('User not logged in', category)
    return
  }

  const key = category + '_cursor'
  let result = await getLocal(key)
  let cursor = result[key]
  console.log('Last cursor:', category, cursor)

  let jsonPosts
  const finish = () => {
    mutateStore((state) => {
      state[category].state = TaskState.finished
    })
  }
  const progress = (size: number) => {
    mutateStore((state) => {
      state[category].done += size
      state[category].reset = 0
      if (state[category].done >= state[category].total) {
        state[category].total = state[category].done
      }
    })
  }

  while (true) {
    try {
      jsonPosts = await func(uid, cursor)
      mutateStore((state) => {
        state[category].state = TaskState.started
      })
    } catch (err) {
      catchError(err, uid, category, endpoint)
      break
    }

    const { docs, cursorEntry } = await getCategoryDetails(
      uid,
      jsonPosts,
      category,
    )

    if (docs.length === 0) {
      console.log('End of timeline reached, no data found', category)
      finish()
      break
    }

    try {
      await upsertDocs(docs)
    } catch (err) {
      console.error(err)
      break
    }

    progress(docs.length)

    if (cursorEntry) {
      cursor = cursorEntry
      await setLocal({ [key]: cursor })
    } else {
      console.log('End of timeline reached')
      finish()
      break
    }
  }
}

export async function summary(uid: string) {
  const [json, countInfo] = await Promise.all([
    getUserById(uid),
    countDocs(uid),
  ])
  /**
   * Update total by category
   */
  const user = get(json, 'data.user.result')
  mutateStore((state) => {
    /**
     * user.legacy.statuses_count 可能不准确
     */
    const info = {
      posts: 1000,
      replies: 1000,
      likes: user.legacy.favourites_count,
      media: user.legacy.media_count,
      followers: user.legacy.followers_count,
    }

    for (const [category, count] of Object.entries(countInfo)) {
      state[category].done = count
      state[category].total = Math.max(info[category], count as number)
    }
  })
}
