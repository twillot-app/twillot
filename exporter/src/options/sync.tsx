import { getCurrentUserId, getLocal, setLocal } from 'utils/storage'
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
import { toRecord } from 'utils/api/twitter'
import { FetchError } from 'utils/xfetch'
import { getRateLimitInfo } from 'utils/api/twitter-base'
import { Endpoint, TimelineTweet, TimelineUser, Tweet, User } from 'utils/types'
import { createSchema, getObjectStore, indexFields, openDb } from 'utils/db'

import { mutateStore, TaskState } from './store'
import { getPostId } from 'utils/db/tweets'

const dbName = 'twillot'
const dbVersion = 2
const tableName = 'posts'

type Category = 'posts' | 'replies' | 'media' | 'likes' | 'followers'

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

export async function startSyncTask(
  uid: string,
  category: Category,
  endpoint: Endpoint,
  func:
    | typeof getPosts
    | typeof getReplies
    | typeof getMedia
    | typeof getLikes
    | typeof getFollowers,
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
      state[category].total = state[category].done
      state[category].state = TaskState.finished
    })
  }

  while (true) {
    try {
      jsonPosts = await func(uid, cursor)
      mutateStore((state) => {
        state[category].state = TaskState.started
      })
    } catch (err) {
      if (err.name === FetchError.RateLimitError) {
        const rate_limit = getRateLimitInfo(endpoint, uid)
        mutateStore((state) => {
          state[category].state = TaskState.paused
          state[category].reset = rate_limit.reset
        })
      } else {
        console.error(err)
        mutateStore((state) => {
          state[category].state = TaskState.errored
        })
      }

      break
    }

    const instructions = getInstructions(
      jsonPosts,
      ResponseKeyPath[`user_${category}`],
    )
    /**
     * Followers 的 itemEntries itemType 为 "TimelineUser"
     * moduleEntries 里面可能包含 TimelineUser
     */
    const { cursorEntry, itemEntries, moduleEntries, moduleItems } =
      getAllInstructionDetails(instructions)

    const list = [
      ...itemEntries,
      ...(moduleEntries.length > 0 &&
      moduleEntries[0].itemType === 'TimelineTweet'
        ? moduleEntries
        : []),
      ...moduleItems,
    ]

    if (list.length < 1) {
      console.log('End of timeline reached, no data found', category)
      finish()

      /**
       * 如果已经获取不到数据了，退出循环
       * 记录上次的 cursor 到本地（不更新本次的 cursor），以便下次继续同步
       */
      break
    }

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

    try {
      await upsertDocs(docs.filter((t) => t !== null))
    } catch (err) {
      console.error(err)
      break
    }

    mutateStore((state) => {
      state[category].done += list.length
      state[category].reset = 0
    })

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
