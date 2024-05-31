import { Message, MessageType } from '../libs/workflow/types'
import { Host, X_DOMAIN } from '../types'
//@ts-ignore
import mainWorld from './injected?script&module'

const oldDomain = 'twitter.com'
if (location.host === oldDomain) {
  location.href = location.href.replace(oldDomain, X_DOMAIN)
}

const triggered = new Set<string>()

window.addEventListener('message', (event) => {
  const { data } = event
  if (event.origin !== Host || data.type !== MessageType.GetTriggerResponse) {
    return
  }

  const { id } = data
  if (!id || triggered.has(id)) {
    console.log('Ignored message', { id, data })
    return
  }

  triggered.add(id)
  console.log('contentScript received message', { event })
  chrome.runtime.sendMessage<Message>(data)
})

/**
 * NOTE:HMR 无效
 */
const script = document.createElement('script')
script.src = chrome.runtime.getURL(mainWorld)
script.type = 'module'
document.head.prepend(script)
