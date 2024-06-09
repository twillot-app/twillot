/**
 * Note:
 * ClienAction 和 Action 的区别
 * 1）运行环境不同，前者运行在网页中，受到 CORS 和 CSP 策略影响
 * 2）后者运行在 Content Script / Background Script / Options Page
 * 3）ClientAction 支持 tweet 相关接口调用，需要手动传入 headers
 */

import { createTweet, getTweetLanguage, getTweetVideoUrl } from '../api/twitter'
import { addTask } from './task'
import { API_HOST } from '../../types'
import { Monitor } from './trigger'
import { Trigger, TriggerContext, TriggerReuqestBody } from './trigger.type'

export type ActionHandler = (context: ActionContext) => Promise<any>

export type ClientActionHandler = (
  trigger: Trigger,
  body: TriggerReuqestBody,
  headers: any,
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

export function createClientAction(
  name: string,
  desc: string,
  transformer: (
    trigger: Trigger,
    body: TriggerReuqestBody,
    headers: any,
  ) => Promise<string>,
): ClientActionConfig {
  return {
    name,
    desc,
    is_client: true,
    handler: async (
      trigger: Trigger,
      body: TriggerReuqestBody,
      headers: any,
    ) => {
      if (!body?.variables?.tweet_text) {
        console.error('No tweet text found in body', body)
      } else {
        const transformed = await transformer(trigger, body, headers)
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
    async (trigger, body, headers) => {
      let text = body.variables.tweet_text
      try {
        let { source } = Monitor.getContext(trigger, body)
        /**
         * 标准化输入参数
         */
        const apiBody = {
          source: {
            id: source || '',
            lang: 'en',
          },
          user: {
            id: 'twillot',
            browser: navigator.language,
          },
          input: [text],
        }
        let lang = await getTweetLanguage(source, headers)
        if (apiBody.user.browser.includes(lang) || lang === 'qme') {
          console.log('Skip auto translate for same language', lang)
          return text
        }
        const json: any = await Monitor.proxyClientPageRequest({
          url: API_HOST + '/translate',
          body: apiBody,
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
 * NOTE:
 * For some operations, interaction with the Options page is required:
 * 1) Add Task first
 * 2) Send message to Options page (in case the Options page is not open)
 * 3) Options page performs specific operations.
 *
 * Operations that do not require the Options page can be executed directly.
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
        const videoUrl = await getTweetVideoUrl(tweet_id)
        if (videoUrl) {
          chrome.downloads.download({
            url: videoUrl,
            filename: `${tweet_id}.mp4`,
          })
        } else {
          console.warn('No video found in tweet', tweet_id)
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
