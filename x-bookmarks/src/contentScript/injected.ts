import { Monitor, Emitter } from '../libs/workflow/trigger'
import { Trigger, TriggerKeys } from '../libs/workflow/trigger.type'
import { Endpoint } from '../types'

const origOpen = XMLHttpRequest.prototype.open
XMLHttpRequest.prototype.open = function (method: string, url: string) {
  this._method = method
  this._url = url

  origOpen.apply(this, arguments)
}

const originSetRequestHeader = XMLHttpRequest.prototype.setRequestHeader
XMLHttpRequest.prototype.setRequestHeader = function (
  header: string,
  value: string,
) {
  if (!this._headers) {
    this._headers = {}
  }
  const key = header.toLowerCase()
  if (key === 'authorization' || key.startsWith('x-')) {
    this._headers[key] = value
  }
  originSetRequestHeader.apply(this, arguments)
}

const origSend = XMLHttpRequest.prototype.send
XMLHttpRequest.prototype.send = async function (
  data: string | FormData | null,
) {
  const url = this._url
  if (typeof data === 'string') {
    const trigger = url.split('/').pop() as Trigger

    if (trigger && TriggerKeys.includes(trigger)) {
      const body = await Emitter.emitClientWorkflows(
        trigger,
        data,
        this._headers,
      )
      this.addEventListener('load', async function () {
        Monitor.postContentScriptMessage(
          trigger,
          { method: this._method, url, body },
          {
            status: this.status,
            statusText: this.statusText,
            body: this.responseText,
          },
        )
      })
      origSend.apply(this, [body])
      return
    }
  } else if (data instanceof FormData) {
    if (url.startsWith(Endpoint.UPLOAD_MEDIA)) {
      if (!window['twillot_attachments']) {
        window['twillot_attachments'] = []
      }
      window['twillot_attachments'].push({
        file: data.get('media'),
        media_id: url.match(/media_id=(\d+)/)?.[1],
      })
    }
  }

  origSend.apply(this, [data])
}

Monitor.onClientPageMessage()

export default {}
