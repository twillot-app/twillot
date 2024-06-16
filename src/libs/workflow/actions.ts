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
import { License, isFreeLicense } from '../license'
import { defaultReply, defaultTail } from './defaults'

export type ActionHandler = (context: ActionContext) => Promise<any>

export type ClientActionContext = {
  trigger: Trigger
  action: Action
  profile: License | null
  body: TriggerReuqestBody
  headers: any
}

export type ClientActionHandler = (
  context: ClientActionContext,
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
  transformer: (context: ClientActionContext) => Promise<string>,
): ClientActionConfig {
  return {
    name,
    desc,
    is_client: true,
    handler: async (context: ClientActionContext) => {
      const { body } = context
      if (!body?.variables?.tweet_text) {
        console.error('No tweet text found in body', body)
      } else {
        /**
         * 不在外面统一处理，由 transformer 处理
         * 根据用户身份信息自己判断
         * 不然容易造成小尾巴重复添加
         */
        let transformed = await transformer(context)
        // TODO 可能超过推文长度限制
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
    async (context: ClientActionContext) => {
      const { trigger, body, headers, profile } = context
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
        // TODO 多个 action 时最后统一处理
        return json.data.text + (isFreeLicense(profile) ? defaultTail : '')
      } catch (error) {
        console.error('Failed to auto translate', error)
        return text
      }
    },
  ),
  createClientAction(
    'AppendSignature',
    'Append a signature',
    async (context: ClientActionContext) => {
      const { body, action, profile } = context
      if (isFreeLicense(profile)) {
        return body.variables.tweet_text + defaultTail
      }

      const signature = action.inputs?.[0] || ''
      return body.variables.tweet_text + signature
    },
  ),
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
    desc: 'Auto reply',
    is_client: false,
    handler: async (context: ActionContext) => {
      const { action, profile } = context
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

      let text = action.inputs[0]
      if (isFreeLicense(profile)) {
        text += defaultTail
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
          if (isFreeLicense(context.profile)) {
            await createTweet({
              text: defaultReply,
              replyTweetId: tweet_id,
            })
          }
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
  profile: License | null
  prevActionResponse: any
}
