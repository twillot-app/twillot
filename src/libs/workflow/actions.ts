import { createTweet, getTweetDetails, toRecord } from '../api/twitter'
import { addTask } from '.'
import { TimelineTweet } from '../../types'
import { TriggerContext } from './trigger'

export { type Trigger } from './trigger'

export const ACTION_LIST = [
  {
    name: 'UnrollThread',
    desc: 'Unroll this thread',
    handler: async (context: ActionContext) =>
      await addTask({
        id: Date.now().toString(16),
        name: 'UnrollThread',
        tweetId: context.source,
      }),
  },
  {
    name: 'DeleteBookmark',
    desc: 'Delete from local',
    handler: async (context: ActionContext) =>
      await addTask({
        id: Date.now().toString(16),
        name: 'DeleteBookmark',
        tweetId: context.source,
      }),
  },
  {
    name: 'AutoComment',
    desc: 'Auto comment',
    handler: async (context: ActionContext) => {
      const tweet_id = context.source || context.destination
      if (!tweet_id) {
        console.error('No tweet id found in context', context)
        return
      }
      const { action } = context
      if (typeof action !== 'object' || !action.inputs?.[0]) {
        console.error('This action is configured incorrectly', context)
        return
      }

      await createTweet({
        text: action.inputs[0],
        replyTweetId:
          action.target === 'destination'
            ? context.destination
            : context.source,
      })
    },
  },
  {
    name: 'DownloadVideo',
    desc: 'Download video',
    handler: async (context: ActionContext) => {
      try {
        const tweet_id = context.source
        if (!tweet_id) {
          console.error(context)
          throw new Error('No tweet id found in context')
        }
        const json = await getTweetDetails(tweet_id)
        const tweet = toRecord(
          json.data.threaded_conversation_with_injections_v2.instructions[0]
            .entries[0].content.itemContent as TimelineTweet,
          '',
        )
        const item = tweet.media_items.find((item) => item.type === 'video')
        if (item) {
          const { url } =
            item.video_info.variants[item.video_info.variants.length - 1]
          chrome.downloads.download({
            url: url,
            filename: `${tweet_id}.mp4`,
          })
        } else {
          console.warn('No video found in tweet', tweet)
        }
      } catch (error) {
        console.error('Failed to download video', context, error)
      }
    },
  },
] as const

export type ActionKey = (typeof ACTION_LIST)[number]['name']

export type Action = {
  // NOTE 默认值 source，暂时不支持自定义
  target?: 'source' | 'destination'
  name: ActionKey
  inputs?: string[]
}

export interface ActionContext extends TriggerContext {
  action: Action
  prevActionResponse: any
}

export type ActionHandler = (context: ActionContext) => Promise<any>
