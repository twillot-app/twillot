import { type Trigger } from '../libs/workflow/types'
import { Monitor } from '../libs/workflow/trigger'

const origOpen = XMLHttpRequest.prototype.open
XMLHttpRequest.prototype.open = function (method: string, url: string) {
  this._method = method
  this._url = url

  origOpen.apply(this, arguments)
}

const origSend = XMLHttpRequest.prototype.send
XMLHttpRequest.prototype.send = function (data: string | null) {
  const url = this._url
  const trigger = url.split('/').pop() as Trigger
  if (trigger) {
    this.addEventListener('load', async function () {
      Monitor.postMessage(
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

  // TODO 获取需要改写请求的工作流，改写 data
  origSend.apply(this, [data])
}

export default {}
