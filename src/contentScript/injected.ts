import { Monitor, Trigger, TriggerKeys } from '../libs/workflow/trigger'

const origOpen = XMLHttpRequest.prototype.open
XMLHttpRequest.prototype.open = function (method: string, url: string) {
  this._method = method
  this._url = url

  origOpen.apply(this, arguments)
}

const origSend = XMLHttpRequest.prototype.send
XMLHttpRequest.prototype.send = async function (data: string | null) {
  const url = this._url
  const trigger = url.split('/').pop() as Trigger
  if (trigger && TriggerKeys.includes(trigger)) {
    const sendData = await Monitor.transformClientPageReuqest(trigger, data)
    if (sendData === data) {
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
      origSend.apply(this, [data])
    } else {
      origSend.apply(this, [sendData])
    }
  }
}

Monitor.onClientPageMessage()

export default {}
