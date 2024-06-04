import { ACTION_LIST } from '../libs/workflow/actions'
import { Monitor, Trigger, TriggerKeys } from '../libs/workflow/trigger'
import { WF_KEY_FOR_CLIET_PAGE, Workflow } from '../libs/workflow/types'

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
    const workflows: Workflow[] = localStorage.getItem(WF_KEY_FOR_CLIET_PAGE)
      ? JSON.parse(localStorage.getItem(WF_KEY_FOR_CLIET_PAGE) as string)
      : []
    console.log('workflows', workflows)
    if (workflows.length) {
      const workflow = workflows.find((w) => w.when === trigger)
      if (workflow) {
        for (const action of workflow.thenList) {
          const item = ACTION_LIST.find((h) => h.name === action.name)
          // @ts-ignore
          const newData = await item.handler(data)
          origSend.apply(this, [newData])
          return
        }
      }
    }
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
