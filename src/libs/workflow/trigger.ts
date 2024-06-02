/**
 * This module is for backgrounded workflow processing.
 */

import { TweetBase } from '../../types'
import { getWorkflows } from '.'
import {
  ActionHandler,
  ActionKey,
  Trigger,
  TriggerReponse,
  TriggerReponsePayload,
  TriggerReuqestBody,
  Workflow,
} from './types'

export function getRealTrigger(
  trigger: Trigger,
  body: TriggerReuqestBody,
): Trigger {
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

export function parseTriggerContext(
  trigger: Trigger,
  request: any,
  response: any,
): {
  source?: string
  destination?: string
} {
  try {
    if (trigger === 'CreateTweet') {
      const tweet = response.data.create_tweet.tweet_results.result as TweetBase
      return {
        destination: tweet.rest_id,
      }
    } else if (trigger === 'CreateReply') {
      const tweet = response.data.create_tweet.tweet_results.result as TweetBase
      return {
        source: request.variables.reply.in_reply_to_tweet_id,
        destination: tweet.rest_id,
      }
    } else if (trigger === 'CreateQuote') {
      const tweet = response.data.create_tweet.tweet_results.result as TweetBase
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

export class TriggerMonitor {
  requestBody = { variables: null as any, features: null as any }
  url = ''
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

  async emit(payload: TriggerReponsePayload) {
    const { request, response, trigger } = payload
    const workflows = this.workflows.filter((w) => w.when === trigger)
    for (const w of workflows) {
      let prevActionResponse = null
      for (const action of w.thenList) {
        const handler =
          this.handlers[typeof action === 'object' ? action.name : action]
        if (handler) {
          const context = {
            request,
            response,
            trigger,
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
