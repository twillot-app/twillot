import { Monitor } from '../libs/workflow/trigger'
import { Trigger, TriggerKeys } from '../libs/workflow/trigger.type'

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
XMLHttpRequest.prototype.send = async function (data: string | null) {
  const url = this._url
  const trigger = url.split('/').pop() as Trigger
  if (trigger && TriggerKeys.includes(trigger)) {
    data = await Monitor.transformClientPageReuqest(
      trigger,
      data,
      this._headers,
    )
    this.addEventListener('load', async function () {
      Monitor.postContentScriptMessage(
        trigger,
        { method: this._method, url, body: data },
        {
          status: this.status,
          statusText: this.statusText,
          body: this.responseText,
        },
      )
    })
  }

  origSend.apply(this, [data])
}

Monitor.onClientPageMessage()

export default {}
