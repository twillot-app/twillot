/**
 * This module is for backgrounded workflow processing.
 */

import { Host, TweetBase } from '../../types'
import { getWorkflows } from '.'
import { MessageType, Workflow, Message } from './types'
import { ActionHandler, ActionKey } from './actions'

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
}

interface TriggerResponseBody {
  data: any
}

export interface TriggerContext {
  trigger: Trigger
  request: { method: string; url: string; body: string }
  response: { status: number; statusText: string; body: string }
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
  static postMessage(
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

  static onMessage() {
    window.addEventListener('message', (event) => {
      if (
        event.origin !== Host ||
        event.data.type !== MessageType.GetTriggerResponse
      ) {
        return
      }

      console.log('contentScript received message', { event })
      chrome.runtime.sendMessage<Message>(event.data)
    })
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
