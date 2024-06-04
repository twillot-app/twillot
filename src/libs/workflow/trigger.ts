/**
 * This module is for backgrounded workflow processing.
 */

import { Host, TweetBase } from '../../types'
import { getWorkflows } from '.'
import { MessageType, Workflow, Message, WF_KEY_FOR_CLIET_PAGE } from './types'
import { ACTION_LIST, ActionHandler, ActionKey, ClientActions } from './actions'

export const TRIGGER_LIST = [
  {
    name: 'CreateBookmark',
    desc: 'Create a bookmark',
  },
  {
    name: 'DeleteBookmark',
    desc: 'Delete a bookmark',
  },
  {
    name: 'CreateTweet',
    desc: 'Post',
  },
  {
    name: 'CreateReply',
    desc: 'Reply',
  },
  {
    name: 'CreateRetweet',
    desc: 'Repost',
  },
  {
    name: 'CreateQuote',
    desc: 'Quote',
  },
] as const

export type Trigger = (typeof TRIGGER_LIST)[number]['name']

export const TriggerKeys = TRIGGER_LIST.map((t) => t.name)

export interface TriggerReuqestBody {
  variables: any
  features: any
  queryId?: string
}

interface TriggerResponseBody {
  data: any
}

export interface TriggerContext {
  trigger: Trigger
  request: { method: string; url: string; body: string | TriggerReuqestBody }
  response: { status: number; statusText: string; body?: string }
  // 源推 id
  source: string
  // 目标推 id
  destination: string
}

export class Monitor {
  static getRealTrigger(trigger: Trigger, body: TriggerReuqestBody): Trigger {
    // post / quote / reply
    if (trigger === 'CreateTweet') {
      const { attachment_url, reply } = body.variables
      // qoute
      if (attachment_url) {
        return 'CreateQuote'
      }

      // reply
      if (reply) {
        return 'CreateReply'
      }

      // post
      return 'CreateTweet'
    }

    return trigger
  }

  static getContext(
    trigger: Trigger,
    request: TriggerReuqestBody,
    response: TriggerResponseBody,
  ): {
    source?: string
    destination?: string
  } {
    try {
      if (trigger === 'CreateTweet') {
        const tweet = response.data.create_tweet.tweet_results
          .result as TweetBase
        return {
          destination: tweet.rest_id,
        }
      } else if (trigger === 'CreateReply') {
        const tweet = response.data.create_tweet.tweet_results
          .result as TweetBase
        return {
          source: request.variables.reply.in_reply_to_tweet_id,
          destination: tweet.rest_id,
        }
      } else if (trigger === 'CreateQuote') {
        const tweet = response.data.create_tweet.tweet_results
          .result as TweetBase
        return {
          source: request.variables.attachment_url.split('/').pop(),
          destination: tweet.rest_id,
        }
      } else if (trigger === 'CreateRetweet') {
        const tweet = response.data.create_retweet.retweet_results
          .result as TweetBase
        return {
          source: request.variables.tweet_id,
          destination: tweet.rest_id,
        }
      } else if (trigger === 'DeleteBookmark') {
        return {
          source: request.variables.tweet_id,
        }
      } else if (trigger === 'CreateBookmark') {
        return {
          source: request.variables.tweet_id,
        }
      }

      throw new Error(`Unsupported trigger ${trigger}`)
    } catch (e) {
      console.error('parseTriggerContext error', e)
    }
  }

  /**
   * 将网页中的请求和响应组织成上下文发送给 content script
   */
  static postContentScriptMessage(
    trigger: Trigger,
    request: TriggerContext['request'],
    response: TriggerContext['response'],
  ) {
    const reqBody =
      request.body && typeof request.body === 'string'
        ? JSON.parse(request.body)
        : {}
    const realTrigger = Monitor.getRealTrigger(trigger, reqBody)
    const { source, destination } = Monitor.getContext(
      realTrigger,
      reqBody,
      JSON.parse(response.body),
    )
    window.postMessage(
      {
        type: MessageType.GetTriggerResponse,
        payload: {
          trigger: realTrigger,
          request: {
            ...request,
            body: reqBody,
          },
          response: {
            ...response,
            // 一般不需要 response body 的内容
            body: null,
          },
          source,
          destination,
        } as TriggerContext,
      },
      Host,
    )
  }

  static onContentScriptMessage() {
    const sendWorkflows2ClientPage = async () => {
      const workflows = await getWorkflows()
      const payload = workflows.filter((w) =>
        w.thenList.some((a) => ClientActions.includes(a.name)),
      )
      if (payload.length) {
        const event = new CustomEvent(MessageType.GetClientWorkflows, {
          detail: payload,
        })
        window.dispatchEvent(event)
      } else {
        console.log('No client workflows found')
      }
    }

    window.addEventListener('message', async (event) => {
      if (event.origin !== Host) {
        return
      }

      const { data } = event
      if (data.type === MessageType.GetTriggerResponse) {
        chrome.runtime.sendMessage<Message>(data)
      } else if (data.type === MessageType.GetClientWorkflows) {
        sendWorkflows2ClientPage()
      }
    })

    chrome.storage.local.onChanged.addListener(async (changes) => {
      if (changes['workflows']) {
        console.log('Workflows changed', changes['workflows'])
        sendWorkflows2ClientPage()
      }
    })
  }

  static onClientPageMessage() {
    window.addEventListener(MessageType.GetClientWorkflows, (event: any) => {
      if (event.type === MessageType.GetClientWorkflows) {
        if (!event.detail || !event.detail.length) {
          localStorage.removeItem(WF_KEY_FOR_CLIET_PAGE)
        } else {
          localStorage.setItem(
            WF_KEY_FOR_CLIET_PAGE,
            JSON.stringify(event.detail),
          )
        }
        console.log('Client workflows updated', event.detail)
      }
    })
    /**
     * 主动获取客户端的工作流
     * NOTE 目前只支持单一工作流
     * 多步骤工作流的难点：
     * 1）多个 action 的交互场景
     * 2）夹杂客户端 action
     */
    window.postMessage(
      {
        type: MessageType.GetClientWorkflows,
      },
      Host,
    )
  }

  static async transformClientPageReuqest(
    trigger: Trigger,
    data: string | null,
  ) {
    const text = localStorage.getItem(WF_KEY_FOR_CLIET_PAGE)
    const workflows: Workflow[] = text ? JSON.parse(text) : []
    if (workflows.length) {
      // NOTE 仅支持一个包含 client action 的工作流
      const workflow = workflows.find((w) => w.when === trigger)
      if (workflow) {
        for (const action of workflow.thenList) {
          // NOTE 仅支持一个 client action
          const item = ACTION_LIST.find((h) => h.name === action.name)
          // @ts-ignore
          const newData = await item.handler(data)
          return newData
        }
      }
    }

    return data
  }
}

export class Emitter {
  workflows = [] as Workflow[]
  handlers = {}

  /**
   * 获取所有的工作流
   * 1) 第一次启动时，从本地存储中获取所有的工作流
   * 2) 监听 chrome.runtime.onMessage 事件，获取新的工作流, 并更新本地存储
   */
  async init() {
    this.workflows = await getWorkflows()
  }

  register(action: ActionKey, fn: ActionHandler) {
    this.handlers[action] = fn
  }

  async emit(payload: TriggerContext) {
    const { trigger } = payload
    const workflows = this.workflows.filter((w) => w.when === trigger)
    for (const w of workflows) {
      let prevActionResponse = null
      for (const action of w.thenList) {
        const handler = this.handlers[action.name]
        if (handler) {
          const context = {
            ...payload,
            action,
            prevActionResponse,
          }
          console.log(`Workflow starts`, context)
          prevActionResponse = await handler(context)
          console.log(`Workflow ends`, prevActionResponse)
        }
      }
    }
  }
}
