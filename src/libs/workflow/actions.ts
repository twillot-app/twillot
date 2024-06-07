import { createTweet, getTweetDetails, toRecord } from '../api/twitter'
import { addTask } from './task'
import { API_HOST, TimelineTweet } from '../../types'
import { Monitor, Trigger, TriggerContext, TriggerReuqestBody } from './trigger'

export { type Trigger } from './trigger'

export type ActionHandler = (context: ActionContext) => Promise<any>

export type ClientActionHandler = (
  trigger: Trigger,
  body: TriggerReuqestBody,
) => Promise<string>

export type ActionConfig = {
  name: string
  desc: string
  is_client: boolean
  handler: ActionHandler
}

export type ClientActionConfig = {
  name: string
  desc: string
  is_client: true
  handler: ClientActionHandler
}

function createClientAction(
  name: string,
  desc: string,
  transformer: (trigger: Trigger, body: TriggerReuqestBody) => Promise<string>,
): ClientActionConfig {
  return {
    name,
    desc,
    is_client: true,
    handler: async (trigger: Trigger, body: TriggerReuqestBody) => {
      if (!body?.variables?.tweet_text) {
        console.error('No tweet text found in body', body)
      } else {
        const transformed = await transformer(trigger, body)
        body.variables.tweet_text = transformed
      }
      return JSON.stringify(body)
    },
  }
}

export const CLIENT_ACTION_LIST: ClientActionConfig[] = [
  createClientAction(
    'AutoTranslate',
    'Auto translate',
    async (trigger, body) => {
      let text = body.variables.tweet_text
      try {
        let { source } = Monitor.getContext(trigger, body)
        const json: any = await Monitor.proxyClientPageRequest({
          url: API_HOST + '/translate',
          // TODO 确定翻译参数
          body: {
            user_id: 'twillot',
            tweet_id: source || 'empty',
            text,
            target_lang: 'en',
          },
        })
        return json.data.text
      } catch (error) {
        console.error('Failed to auto translate', error)
        return text
      }
    },
  ),
  createClientAction('AppendSignature', 'Append a signature', async (text) => {
    return (
      text + '\n----\nThis message was sent from Twillot, https://twillot.com'
    )
  }),
]

export type ClientActionKey = (typeof CLIENT_ACTION_LIST)[number]['name']

export const ClientActions = CLIENT_ACTION_LIST.map((a) => a.name)

/**
 * NOTE
 * 对于一些操作需要与 Options 页面交互
 * 1）先添加 Task
 * 2）消息发送给 Options 页面（防止 Options 页面未打开）
 * 3）Options 页面执行特定操作。
 *
 * 无需 Options 页面执行操作的可以直接执行。
 */
export const ACTION_LIST: ActionConfig[] = [
  {
    name: 'UnrollThread',
    desc: 'Unroll this thread',
    is_client: false,
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
    is_client: false,
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
    is_client: false,
    handler: async (context: ActionContext) => {
      const { action } = context
      if (typeof action !== 'object' || !action.inputs?.[0]) {
        console.error('This action is configured incorrectly', context)
        return
      }
      let tweet_id = context.source
      if (context.trigger === 'CreateTweet') {
        tweet_id = context.destination
      }
      if (!tweet_id) {
        console.error('No tweet id found in context', context)
        return
      }

      await createTweet({
        text: action.inputs[0],
        replyTweetId: tweet_id,
      })
    },
  },
  {
    name: 'DownloadVideo',
    desc: 'Download video',
    is_client: false,
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
]

export type ActionKey = (typeof ACTION_LIST)[number]['name']

export type Action = {
  // NOTE 默认值 source，暂时不支持自定义
  target?: 'source' | 'destination'
  name: ActionKey | ClientActionKey
  inputs?: string[]
}

export interface ActionContext extends TriggerContext {
  action: Action
  prevActionResponse: any
}
