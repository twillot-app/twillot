/**
 * This module is for backgrounded workflow processing.
 */

import {
  Host,
  TimelineAddEntriesInstruction,
  TimelineTweet,
  TweetBase,
} from '../../types'
import { getClientWorkflows, getWorkflows } from '.'
import { MessageType, Workflow, Message, WF_KEY_FOR_CLIET_PAGE } from './types'
import {
  ACTION_LIST,
  ActionHandler,
  ActionKey,
  CLIENT_ACTION_LIST,
} from './actions'
import {
  Trigger,
  TriggerReuqestBody,
  TriggerResponseBody,
  TriggerContext,
} from './trigger.type'
import { getTweet, getTweetDetails } from '../api/twitter'

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
    response?: TriggerResponseBody,
  ): {
    source?: string
    destination?: string
  } {
    try {
      if (trigger === 'CreateTweet') {
        const tweet = response?.data.create_tweet.tweet_results
          .result as TweetBase
        return {
          destination: tweet?.rest_id,
        }
      } else if (trigger === 'CreateReply') {
        const tweet = response?.data.create_tweet.tweet_results
          .result as TweetBase
        return {
          source: request.variables.reply.in_reply_to_tweet_id,
          destination: tweet?.rest_id,
        }
      } else if (trigger === 'CreateQuote') {
        const tweet = response?.data.create_tweet.tweet_results
          .result as TweetBase
        return {
          source: request.variables.attachment_url.split('/').pop(),
          destination: tweet?.rest_id,
        }
      } else if (trigger === 'CreateRetweet') {
        const tweet = response?.data.create_retweet.retweet_results
          .result as TweetBase
        return {
          source: request.variables.tweet_id,
          destination: tweet?.rest_id,
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
    const reqBody: TriggerReuqestBody =
      request.body && typeof request.body === 'string'
        ? JSON.parse(request.body)
        : request.body || {}
    const realTrigger = Monitor.getRealTrigger(trigger, reqBody)
    const { source, destination } = Monitor.getContext(
      realTrigger,
      reqBody,
      typeof response.body === 'string'
        ? JSON.parse(response.body)
        : response.body || {},
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

  static postClientPageMessage(
    payload: any,
    type = MessageType.ClientPageEvent,
  ) {
    const event = new CustomEvent(type, {
      detail: payload,
    })
    window.dispatchEvent(event)
  }

  static onContentScriptMessage() {
    const sendWorkflows2ClientPage = async () => {
      const workflows = await getClientWorkflows()
      if (!workflows.length) {
        console.log('No client workflows found')
      }
      Monitor.postClientPageMessage(workflows)
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
      } else if (data.type === MessageType.ClientPageRequest) {
        const { url, body } = data.payload
        if (body.source.id) {
          const json = await getTweetDetails(body.source.id)
          const entry = json.data.threaded_conversation_with_injections_v2
            .instructions[0] as TimelineAddEntriesInstruction<TimelineTweet>
          const content = entry.entries[0].content
          if (content.entryType === 'TimelineTimelineItem') {
            const tweet = getTweet(content.itemContent.tweet_results.result)
            if (tweet) {
              body.source.lang = tweet.legacy.lang
            }
          }
        }
        const res = await fetch(url, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(body),
        })
        const msg = await res.json()
        Monitor.postClientPageMessage(msg, MessageType.ClientPageRequest)
      }
    })

    chrome.storage.local.onChanged.addListener(async (changes) => {
      if (changes['workflows']) {
        console.log('Workflows changed', changes['workflows'])
        sendWorkflows2ClientPage()
      }
    })
  }

  static proxyClientPageRequest(payload) {
    window.postMessage({ type: MessageType.ClientPageRequest, payload }, Host)

    return new Promise((resolve, reject) => {
      const timeout = setTimeout(() => {
        reject(new Error('Request timed out'))
        window.removeEventListener(MessageType.ClientPageRequest, handleMessage)
      }, 10000)

      function handleMessage(event) {
        console.log('Client page response:', event)
        resolve(event.detail)
        clearTimeout(timeout)
        window.removeEventListener(MessageType.ClientPageRequest, handleMessage)
      }

      window.addEventListener(MessageType.ClientPageRequest, handleMessage)
    })
  }

  static onClientPageMessage() {
    window.addEventListener(MessageType.ClientPageEvent, (event: any) => {
      if (!event.detail || !event.detail.length) {
        localStorage.removeItem(WF_KEY_FOR_CLIET_PAGE)
      } else {
        localStorage.setItem(
          WF_KEY_FOR_CLIET_PAGE,
          JSON.stringify(event.detail),
        )
      }
      console.log('Client workflows updated', event.detail)
      // }
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
    const reqBody: TriggerReuqestBody = data ? JSON.parse(data) : {}
    const realTrigger = Monitor.getRealTrigger(trigger, reqBody)
    const text = localStorage.getItem(WF_KEY_FOR_CLIET_PAGE)
    const workflows: Workflow[] = text ? JSON.parse(text) : []

    if (workflows.length) {
      /**
       * TODO 添加的时候验证同一个 trigger 仅能添加一个 client workflow
       */
      const workflow = workflows.find((w) => w.when === realTrigger)
      if (workflow) {
        for (const action of workflow.thenList) {
          /**
           * TODO 一个 trigger 下可以支持多个 client actions
           */
          const item = CLIENT_ACTION_LIST.find((h) => h.name === action.name)
          const newData = await item.handler(realTrigger, reqBody)
          return newData || ''
        }
      }
    }

    return data
  }
}

export class Emitter {
  workflows = [] as Workflow[]
  handlers = {}

  register(action: ActionKey, fn: ActionHandler) {
    this.handlers[action] = fn
  }

  async emit(payload: TriggerContext) {
    const { trigger } = payload
    const workflows = this.workflows.filter((w) => w.when === trigger)
    console.log('Workflows:', workflows)
    for (const w of workflows) {
      let prevActionResponse = null
      console.log(`Workflow starts`, payload)
      for (const action of w.thenList) {
        const handler = this.handlers[action.name]
        if (handler) {
          const context = {
            ...payload,
            action,
            prevActionResponse,
          }
          prevActionResponse = await handler(context)
        } else {
          console.log(
            `No handler for action ${action.name}, maybe it is a client action`,
          )
        }
      }
      console.log(`Workflow ends`)
    }
  }

  async start() {
    this.workflows = await getWorkflows()
    console.log('Workflows:', this.workflows)

    ACTION_LIST.forEach((action) => {
      /**
       * Client workflow 不需要注册到 content script
       */
      this.register(action.name, action.handler)
    })

    chrome.runtime.onMessage.addListener((message: Message) => {
      if (message.type === MessageType.GetTriggerResponse) {
        this.emit(message.payload as TriggerContext)
      } else {
        console.log('Unknown message type:', message)
      }
    })

    chrome.storage.local.onChanged.addListener((changes) => {
      if ('workflows' in changes) {
        this.workflows = changes.workflows.newValue
      }
    })
  }
}
