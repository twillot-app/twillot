/**
 * This module is for backgrounded workflow processing.
 */

import { Host, TweetBase } from '../../types'
import { getClientWorkflows, getWorkflows } from '.'
import { MessageType, Workflow, Message, ClientPageStorageKey } from './types'
import { ACTION_LIST, CLIENT_ACTION_LIST } from './actions'
import {
  Trigger,
  TriggerReuqestBody,
  TriggerResponseBody,
  TriggerContext,
} from './trigger.type'
import { getCurrentUserId, onLocalChanged } from '../storage'
import { type License, getLicense } from '../license'

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

  static startValidation() {
    setInterval(
      () => {
        chrome.runtime.sendMessage<Message>({
          type: MessageType.ValidateLicense,
          payload: null,
        })
      },
      1000 * 60 * 5,
    )
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

  static postClientPageMessage(payload: any, type: MessageType) {
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
      Monitor.postClientPageMessage(workflows, MessageType.ClientPageWorkflows)
    }
    const sendLicense2ClientPage = async () => {
      const license = await getLicense()
      if (!license) {
        console.log('No license found')
      }
      Monitor.postClientPageMessage(license, MessageType.ClientPageLicense)
    }

    window.addEventListener('message', async (event) => {
      if (event.origin !== Host || event.source !== window) {
        return
      }

      const { data } = event
      if (data.type === MessageType.GetTriggerResponse) {
        chrome.runtime.sendMessage<Message>(data)
      } else if (data.type === MessageType.ClientPageWorkflows) {
        sendWorkflows2ClientPage()
      } else if (data.type === MessageType.ClientPageProxyRequest) {
        const { url, body } = data.payload
        const [user_id, profile] = await Promise.all([
          getCurrentUserId(),
          getLicense(),
        ])
        const res = await fetch(url, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'X-User-Id': user_id,
            'X-License-Code': profile?.license_code,
          },
          body: JSON.stringify(body),
        })
        const msg = await res.json()
        Monitor.postClientPageMessage(msg, MessageType.ClientPageProxyRequest)
      } else if (data.type === MessageType.ClientPageLicense) {
        sendLicense2ClientPage()
      }
    })

    onLocalChanged(ClientPageStorageKey.Workflows, sendWorkflows2ClientPage)
    onLocalChanged(ClientPageStorageKey.License, sendLicense2ClientPage)
  }

  static proxyClientPageRequest(payload) {
    window.postMessage(
      { type: MessageType.ClientPageProxyRequest, payload },
      Host,
    )

    return new Promise((resolve, reject) => {
      const timeout = setTimeout(() => {
        reject(new Error('Request timed out'))
        window.removeEventListener(
          MessageType.ClientPageProxyRequest,
          handleMessage,
        )
      }, 10000)

      function handleMessage(event) {
        console.log('Client page response:', event)
        resolve(event.detail)
        clearTimeout(timeout)
        window.removeEventListener(
          MessageType.ClientPageProxyRequest,
          handleMessage,
        )
      }

      window.addEventListener(MessageType.ClientPageProxyRequest, handleMessage)
    })
  }

  static onClientPageMessage() {
    /**
     * Actively fetch client workflows
     * NOTE: Currently only supports single workflows.
     * Challenges with multi-step workflows:
     * 1) Interaction scenarios with multiple actions
     * 2) Mixing client actions
     */
    const localSyncTasks = [
      [MessageType.ClientPageWorkflows, ClientPageStorageKey.Workflows],
      [MessageType.ClientPageLicense, ClientPageStorageKey.License],
    ]
    localSyncTasks.forEach(([eventName, storageKey]) => {
      window.addEventListener(eventName, (event: any) => {
        if (!event.detail || !event.detail.length) {
          localStorage.removeItem(storageKey)
        } else {
          localStorage.setItem(storageKey, JSON.stringify(event.detail))
        }
        console.log(
          'Client data synced to local storage',
          eventName,
          storageKey,
          event.detail,
        )
      })
      window.postMessage(
        {
          type: eventName,
        },
        Host,
      )
    })
  }
}

export class Emitter {
  /**
   * This method is running in background script.
   * It will fetch workflows and execute them.
   */
  static async emit(payload: TriggerContext) {
    const { trigger } = payload
    let workflows = await getWorkflows()
    workflows = workflows.filter((w) => w.when === trigger)
    if (workflows.length === 0) {
      console.warn(`No workflows found for trigger ${trigger}`)
      return
    }

    const handlers = {}
    ACTION_LIST.forEach((action) => {
      handlers[action.name] = action.handler
    })
    const profile = await getLicense()

    console.log('Matched workflows:', workflows)
    for (const w of workflows) {
      let prevActionResponse = null
      console.log(`Workflow starts`, payload)
      for (const action of w.thenList) {
        const handler = handlers[action.name]
        if (handler) {
          const context = {
            ...payload,
            action,
            profile,
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

  static async emitClientWorkflows(
    trigger: Trigger,
    data: string | null,
    headers,
  ) {
    const reqBody: TriggerReuqestBody = data ? JSON.parse(data) : {}
    const realTrigger = Monitor.getRealTrigger(trigger, reqBody)
    const text = localStorage.getItem(ClientPageStorageKey.Workflows)
    const workflows: Workflow[] = text ? JSON.parse(text) : []

    if (workflows.length) {
      /**
       * TODO 添加的时候验证同一个 trigger 仅能添加一个 client workflow
       */
      const workflow = workflows.find((w) => w.when === realTrigger)
      if (workflow) {
        const license_str = localStorage.getItem(ClientPageStorageKey.License)
        const license: License | null = license_str
          ? JSON.parse(license_str)
          : null
        for (const action of workflow.thenList) {
          /**
           * TODO 一个 trigger 下可以支持多个 client actions
           */
          const item = CLIENT_ACTION_LIST.find((h) => h.name === action.name)
          const newData = await item.handler({
            trigger: realTrigger,
            action,
            body: reqBody,
            headers,
            profile: license,
          })
          return newData || ''
        }
      }
    }

    return data
  }
}
