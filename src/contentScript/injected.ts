import {
  MessageType,
  Trigger,
  TriggerNames,
  TriggerReponsePayload,
} from '../libs/workflow/types'
import { Host } from '../types'
import {
  triggerResponseRetriever,
  getRealTrigger,
} from '../libs/workflow/trigger'

const origOpen = XMLHttpRequest.prototype.open
XMLHttpRequest.prototype.open = function (method: string, url: string) {
  this._method = method
  this._url = url

  origOpen.apply(this, arguments)
}

const origSend = XMLHttpRequest.prototype.send
XMLHttpRequest.prototype.send = function (data) {
  const url = this._url
  const trigger = url.split('/').pop() as Trigger
  if (trigger && trigger in TriggerNames) {
    this.addEventListener('load', async function () {
      const parse = triggerResponseRetriever[trigger]
      const body =
        this.responseText && parse ? await parse(this.responseText) : {}
      const reqBody = data && typeof data === 'string' ? JSON.parse(data) : {}
      const id = Math.floor(new Date().getTime() / 1000)
        .toString(16)
        .toUpperCase()
      console.log('trigger response:', id, trigger, body)
      window.postMessage(
        {
          id,
          type: MessageType.GetTriggerResponse,
          payload: {
            id,
            trigger: getRealTrigger(trigger, reqBody),
            request: { method: this._method, url: this._url, body: reqBody },
            response: {
              status: this.status,
              statusText: this.statusText,
              body,
            },
          } as TriggerReponsePayload,
        },
        Host,
      )
    })
  }

  origSend.apply(this, [data])
}

export default {}
