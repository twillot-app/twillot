import { setCurrentUserId } from '../libs/storage'
import { Monitor } from '../libs/workflow/trigger'
//@ts-ignore
import mainWorld from './injected?script&module'

console.log('content script loaded')

for (const item of document.cookie.split(';')) {
  const [key, value] = item.split('=')
  if (key.includes('twid')) {
    setCurrentUserId(value.replace('u%3D', ''))
    break
  }
}
Monitor.onContentScriptMessage()
// Monitor.startValidation()

/**
 * NOTE:HMR 无效
 */
const script = document.createElement('script')
script.src = chrome.runtime.getURL(mainWorld)
script.type = 'module'
document.head.prepend(script)
