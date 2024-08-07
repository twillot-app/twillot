import { getCurrentUserId, getLocal, setLocal } from 'utils/storage'
import {
  getAllInstructionDetails,
  getInstructions,
  ResponseKeyPath,
} from 'utils/api/twitter-res-utils'
import { mutateStore, TaskState } from './store'
import {
  getPosts,
  getReplies,
  getMedia,
  getLikes,
  getFollowers,
} from 'utils/api/twitter-user'
import { FetchError } from 'utils/xfetch'
import { getRateLimitInfo } from 'utils/api/twitter-base'
import { Endpoint } from 'utils/types'

export async function startSyncTask(
  category: 'posts' | 'replies' | 'media' | 'likes' | 'followers',
  endpoint: Endpoint,
  func:
    | typeof getPosts
    | typeof getReplies
    | typeof getMedia
    | typeof getLikes
    | typeof getFollowers,
) {
  const uid = await getCurrentUserId()
  if (!uid) {
    console.error('User not logged in', category)
    return
  }

  const key = category + '_cursor'
  let result = await getLocal(key)
  let cursor = result[key]
  console.log('Last cursor:', category, cursor)
  let jsonPosts

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
    const { cursorEntry, itemEntries, moduleEntries, moduleItems } =
      getAllInstructionDetails(instructions)
    const list = [...itemEntries, ...moduleItems, moduleEntries]

    if (list.length < 1) {
      console.log('End of timeline reached, no data found', category)
      mutateStore((state) => {
        state[category].total = state[category].done
        state[category].state = TaskState.finished
      })
      /**
       * 如果已经获取不到数据了，退出循环
       * 记录上次的 cursor 到本地（不更新本次的 cursor），以便下次继续同步
       */
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
      mutateStore((state) => {
        state[category].total = state[category].done
        state[category].state = TaskState.finished
      })
      break
    }
  }
}
