import {
  MessageType,
  Trigger,
  TriggerNames,
  TriggerReponsePayload,
} from '../libs/workflow/types'
import { Host } from '../types'
import { getRealTrigger, parseTriggerContext } from '../libs/workflow/trigger'

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
      const reqBody = data && typeof data === 'string' ? JSON.parse(data) : {}
      const realTrigger = getRealTrigger(trigger, reqBody)
      const { source, destination } = parseTriggerContext(
        realTrigger,
        reqBody,
        JSON.parse(this.responseText),
      )
      window.postMessage(
        {
          type: MessageType.GetTriggerResponse,
          payload: {
            trigger: realTrigger,
            request: { method: this._method, url: this._url, body: reqBody },
            response: {
              status: this.status,
              statusText: this.statusText,
            },
            source,
            destination,
          } as TriggerReponsePayload,
        },
        Host,
      )
    })
  }

  origSend.apply(this, [data])
}

export default {}
