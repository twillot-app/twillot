import get from 'lodash.get'

import {
  ItemContentUnion,
  TimelineAddEntriesInstruction,
  TimelineAddToModuleInstruction,
  TimelineEntry,
  TimelineInstructions,
  TimelinePinEntryInstruction,
  TimelineTimelineCursor,
  TimelineTimelineItem,
  TimelineTimelineModule,
  TimelineTweet,
} from '~/types'
import { getTweet } from './twitter'

export enum ResponseKeyPath {
  bookmarks = 'bookmark_timeline_v2.timeline',
  home = 'home.home_timeline_urt',
  post_detail = 'threaded_conversation_with_injections_v2',
  user_followers = 'user.result.timeline.timeline',
  user_following = 'user.result.timeline.timeline',
  user_likes = 'user.result.timeline_v2.timeline',
  user_media = 'user.result.timeline_v2.timeline',
  user_posts = 'user.result.timeline_v2.timeline',
  user_replies = 'user.result.timeline_v2.timeline',
}

export function getInstructions(
  json: any,
  keypath: ResponseKeyPath,
): TimelineInstructions {
  return get(json, 'data.' + keypath + '.instructions')
}

export function getPinEntryInstruction(
  instructions: TimelineInstructions,
): TimelinePinEntryInstruction {
  return instructions?.find((i) => i.type === 'TimelinePinEntry')
}

export function getAddEntriesInstruction(
  instructions: TimelineInstructions,
): TimelineAddEntriesInstruction {
  return instructions?.find((i) => i.type === 'TimelineAddEntries')
}

export function getAddToModuleInstruction(
  instructions: TimelineInstructions,
): TimelineAddToModuleInstruction {
  return instructions?.find((i) => i.type === 'TimelineAddToModule')
}

export function getPinEntry(
  instruction: TimelinePinEntryInstruction,
): TimelineEntry<TimelineTweet, TimelineTimelineItem<TimelineTweet>> {
  return instruction?.entry
}

export function getItemEntries<T>(
  instruction: TimelineAddEntriesInstruction<T>,
): T[] | TimelineTimelineCursor[] {
  const list = instruction?.entries ?? []
  const entries = list.filter(
    (e) => e.content.entryType === 'TimelineTimelineItem',
  ) as TimelineEntry<T, TimelineTimelineItem<T>>[]
  return entries.map((i) => i.content.itemContent)
}

export function getModuleEntries<T>(
  instruction: TimelineAddEntriesInstruction<T>,
): T[] {
  const list = instruction?.entries ?? []
  const items: T[] = []
  const entries = list.filter(
    (e) => e.content.entryType === 'TimelineTimelineModule',
  ) as TimelineEntry<T, TimelineTimelineModule<T>>[]
  for (const entry of entries) {
    for (const item of entry.content.items) {
      items.push(item.item.itemContent)
    }
  }
  return items
}

export function getCursorEntries<T>(
  instruction: TimelineAddEntriesInstruction<T>,
): TimelineTimelineCursor[] {
  const list = instruction?.entries ?? []
  const entries = list.filter(
    (e) => e.content.entryType === 'TimelineTimelineCursor',
  ) as TimelineEntry<T, TimelineTimelineCursor>[]
  return entries.map((i) => i.content)
}

export function getModuleItems<T>(
  instruction: TimelineAddToModuleInstruction<T>,
): T[] {
  const moduleItems = instruction?.moduleItems ?? []
  return moduleItems.map((i) => i.item.itemContent)
}

export function getBottomCursor<T>(
  instruction: TimelineAddEntriesInstruction<T>,
): string {
  const entries = getCursorEntries(instruction)
  const last = entries.find((i) => i.cursorType === 'Bottom')
  return last?.value
}

export function getAllInstructionDetails(
  instructions: TimelineInstructions,
  uid?: string,
) {
  let pinEntry: TimelineEntry<
    TimelineTweet,
    TimelineTimelineItem<TimelineTweet>
  >
  let itemEntries: ItemContentUnion[] = []
  let moduleEntries: ItemContentUnion[] = []
  let cursorEntry: string = ''
  let moduleItems: ItemContentUnion[] = []
  for (let index = 0; index < instructions.length; index++) {
    const element = instructions[index]
    if (element.type === 'TimelinePinEntry') {
      pinEntry = getPinEntry(element)
    } else if (element.type === 'TimelineAddEntries') {
      itemEntries = getItemEntries(element)
      moduleEntries = getModuleEntries(element)
      cursorEntry = getBottomCursor(element)

      if (uid) {
        /**
         * 这里主要解决评论中会附带原推文的问题
         * 原推文可能是自己也可能是别人的
         */
        moduleEntries = moduleEntries.filter((i: TimelineTweet) => {
          const tweet = getTweet(i.tweet_results?.result)
          if (tweet) {
            return tweet.legacy.user_id_str === uid
          }
          return false
        })
      }
    } else if (element.type === 'TimelineAddToModule') {
      moduleItems = getModuleItems(element)
    }
  }

  return {
    pinEntry,
    itemEntries,
    moduleEntries,
    cursorEntry,
    moduleItems,
  }
}
