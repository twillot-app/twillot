import {
  AuthStatus,
  OptionName,
  TimelineAddEntriesInstruction,
  TimelineInstructions,
  TimelineTimelineCursor,
  TimelineTweet,
  TimelineEntry,
  Tweet,
  TimelineTimelineItem,
  TweetBase,
} from '../types'
import dataStore, { mutateStore } from '../options/store'
import {
  addRecords,
  clearFolder,
  countRecords,
  getPostId,
  updateFolder,
} from '../libs/db/tweets'
import { unwrap } from 'solid-js/store'
import { readConfig, upsertConfig } from '../libs/db/configs'
import { getFolders, getFolderTweets } from '../libs/api/twitter'
import { getCurrentUserId } from '../libs/storage'

const [store, setStore] = dataStore

export async function initFolders() {
  const config = await readConfig(OptionName.FOLDER)
  let folders = [],
    xFolders: { name: string; id: string }[] = []
  try {
    xFolders = (
      await getFolders()
    ).data.viewer.user_results.result.bookmark_collections_slice.items.map(
      (f) => ({ name: f.name, id: f.id }),
    )
  } catch (err) {
    console.log('This account is not a premium user')
  }

  if (!config || !config.option_value) {
    folders = xFolders.map((f) => f.name)
    await upsertConfig({
      option_name: OptionName.FOLDER,
      option_value: folders,
    })
  } else {
    folders = config.option_value as string[]
  }

  if (folders.length < 1) {
    return
  }

  /**
   * 单向同步 X 的书签
   */
  const sharedFolders = xFolders.filter((f) => folders.includes(f.name))
  folders = folders
    .filter((f) => !!f)
    .map((f: string) => ({
      name: f,
      count: 0,
    }))
  setStore('folders', folders)
  for (const [index, folder] of Object.entries(folders)) {
    const count = (await countRecords('folder', folder.name)).total
    mutateStore((state) => {
      state.folders[index].count = count
    })
  }

  await syncXFolders(sharedFolders)
}

export async function removeFolder(folder: string) {
  const index = store.folders.findIndex((f) => f.name === folder)
  if (index === -1) {
    return
  }
  const folders = store.folders.filter((f) => f.name !== folder)
  await upsertConfig({
    option_name: OptionName.FOLDER,
    option_value: folders.map((f) => f.name),
  })
  await clearFolder(folder)
  mutateStore((state) => {
    state.tweets.forEach((t) => {
      if (t.folder === folder) {
        t.folder = ''
      }
    })
    state.folders.splice(index, 1)
  })
}

export async function moveTweetToFolder(folder: string, tweet: Tweet) {
  const index = store.tweets.findIndex((t) => t.tweet_id === tweet.tweet_id)
  const folderIndex = store.folders.findIndex((f) => f.name === folder)
  const oldFolderIndex = tweet.folder
    ? store.folders.findIndex((f) => f.name === tweet.folder)
    : -1
  await addRecords([{ ...unwrap(tweet), folder }], true)
  mutateStore((state) => {
    state.tweets[index].folder = folder
    state.folders[folderIndex].count += 1
    if (oldFolderIndex > -1) {
      state.folders[oldFolderIndex].count -= 1
    } else {
      // 未分类存储在 total
      state.totalCount.unsorted -= 1
    }
    if (store.folder && folder !== store.folder) {
      state.tweets.splice(index, 1)
    }
  })
}

/**
 * 仅移动没有分类的 tweets 到指定文件夹
 */
export const moveTweetsToFolder = async (folder: string) => {
  try {
    const index = store.folders.findIndex((f) => f.name === folder)
    if (index === -1) {
      return
    }
    let tweets = unwrap(store.tweets)
      .filter((x) => !x.folder)
      .map((tweet) => ({
        ...tweet,
        folder,
      }))
    await addRecords(tweets, true)
    mutateStore((state) => {
      state.tweets.forEach((t) => {
        if (!t.folder) {
          t.folder = folder
        }
      })
      state.folders[index].count += tweets.length
    })
    alert(`${tweets.length} tweets has been moved to folder ${folder}`)
  } catch (error) {
    console.error(error)
  }
}

export const addFolder = async (folderName: string) => {
  if (
    folderName &&
    store.folders.some((f) => f.name === folderName) === false
  ) {
    await upsertConfig({
      option_name: OptionName.FOLDER,
      option_value: store.folders.map((f) => f.name).concat(folderName),
    })
    mutateStore((state) => {
      state.folders.push({ name: folderName, count: 0 })
    })
  }
}

export const syncXFolders = async (folders: { name: string; id: string }[]) => {
  if (!folders.length) {
    console.log('no shared folders')
    return
  }

  const user_id = await getCurrentUserId()
  for (const folder of folders) {
    let cursor = ''
    while (true) {
      try {
        const json = await getFolderTweets(folder.id, cursor)
        const instructions = json.data.bookmark_collection_timeline.timeline
          .instructions as TimelineInstructions
        const entry = instructions.filter(
          (i) => i.type === 'TimelineAddEntries',
        )[0] as TimelineAddEntriesInstruction
        if (!entry) {
          break
        }
        const cursorEntry = entry.entries.filter(
          (i) => i.content.entryType === 'TimelineTimelineCursor',
        )[0] as TimelineEntry<TimelineTweet, TimelineTimelineCursor>
        const tweetsEntry = entry.entries.filter(
          (i) => i.content.entryType === 'TimelineTimelineItem',
        ) as TimelineEntry<TimelineTweet, TimelineTimelineItem<TimelineTweet>>[]
        if (tweetsEntry.length === 0) {
          break
        }
        const ids = tweetsEntry.map((e) => {
          const tweet = e.content.itemContent.tweet_results.result as TweetBase
          return getPostId(user_id, tweet.rest_id)
        })
        await updateFolder(ids, folder.name)
        cursor = cursorEntry.content.value
      } catch (err) {
        console.error(`syncXFolders error:`, folder)
        console.error(err)
        break
      }
    }
  }
}
