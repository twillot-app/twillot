import get from 'lodash.get'
import { getCurrentUserId, getLocal, setLocal } from 'utils/storage'
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
import {
  Endpoint,
  TimelineAddEntriesInstruction,
  TimelineAddToModuleInstruction,
  TimelineInstructions,
  TimelinePinEntryInstruction,
  TimelineTweet,
} from 'utils/types'

export async function startSyncTask(
  category: 'posts' | 'replies' | 'media' | 'likes' | 'followers',
  endpoint: Endpoint,
  instructionKeyPath: string,
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

    const instructions = get(
      jsonPosts,
      instructionKeyPath,
    ) as TimelineInstructions

    let list = []
    if (category === 'media') {
      // There are two types of instructions: "TimelineAddEntries" and "TimelineAddToModule".
      // For "Media", the "TimelineAddEntries" instruction initializes "profile-grid" module.
      const timelineAddEntriesInstruction = instructions.find(
        (i) => i.type === 'TimelineAddEntries',
      ) as TimelineAddEntriesInstruction<TimelineTweet>

      // The "TimelineAddEntries" instruction may not exist in some cases.
      const timelineAddEntriesInstructionEntries =
        timelineAddEntriesInstruction?.entries ?? []

      for (const entry of timelineAddEntriesInstructionEntries) {
        if (entry.content.entryType === 'TimelineTimelineModule') {
          const tweetsInSearchGrid = entry.content.items
            .map((i) => i.item.itemContent)
            .filter((t) => !!t)

          list.push(...tweetsInSearchGrid)
        }
      }

      // The "TimelineAddToModule" instruction then prepends items to existing "profile-grid" module.
      const timelineAddToModuleInstruction = instructions.find(
        (i) => i.type === 'TimelineAddToModule',
      ) as TimelineAddToModuleInstruction<TimelineTweet>

      if (timelineAddToModuleInstruction) {
        const tweetsInProfileGrid = timelineAddToModuleInstruction.moduleItems
          .map((i) => i.item.itemContent)
          .filter((t) => !!t)

        list.push(...tweetsInProfileGrid)
      }
    } else {
      const timelinePinEntryInstruction = instructions.find(
        (i) => i.type === 'TimelinePinEntry',
      ) as TimelinePinEntryInstruction

      if (timelinePinEntryInstruction) {
        const tweet = timelinePinEntryInstruction.entry.content.itemContent
        if (tweet) {
          list.push(tweet)
        }
      }

      // Normal tweets.
      const timelineAddEntriesInstruction = instructions.find(
        (i) => i.type === 'TimelineAddEntries',
      ) as TimelineAddEntriesInstruction<TimelineTweet>

      // The "TimelineAddEntries" instruction may not exist in some cases.
      const timelineAddEntriesInstructionEntries =
        timelineAddEntriesInstruction?.entries ?? []

      for (const entry of timelineAddEntriesInstructionEntries) {
        // Extract normal tweets.
        if (entry.content.entryType === 'TimelineTimelineItem') {
          const tweet = entry.content.itemContent
          if (tweet) {
            list.push(tweet)
          }
        }

        // Extract conversations.
        if (entry.content.entryType === 'TimelineTimelineModule') {
          const tweetsInConversation = entry.content.items
            .map((i) => i.item.itemContent)
            .filter((t) => !!t)

          list.push(...tweetsInConversation)
        }
      }
    }

    if (list.length < 1) {
      console.log('End of timeline reached, no data found', category)
      mutateStore((state) => {
        state[category].state = TaskState.finished
      })
      /**
       * 如果已经获取不到数据了，退出循环
       * 记录上次的 cursor 到本地（不更新本次的 cursor），以便下次继续同步
       */
      break
    }

    const entries = instructions.find(
      (i) => i.type === 'TimelineAddEntries',
    )?.entries
    const cursorItem = entries && entries[entries.length - 1]

    mutateStore((state) => {
      state[category].done += list.length
      state[category].reset = 0
    })

    if (
      cursorItem &&
      cursorItem.content.entryType === 'TimelineTimelineCursor'
    ) {
      cursor = cursorItem.content.value
      await setLocal({ [key]: cursor })
    } else {
      console.log('End of timeline reached')
      mutateStore((state) => {
        state[category].state = TaskState.finished
      })
      break
    }
  }
}
