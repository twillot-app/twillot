import { Monitor } from '../libs/workflow/trigger'
import { X_DOMAIN } from '../types'
//@ts-ignore
import mainWorld from './injected?script&module'

console.log('content script loaded')

const oldDomain = 'twitter.com'
if (location.host === oldDomain) {
  location.href = location.href.replace(oldDomain, X_DOMAIN)
}

Monitor.onMessage()

/**
 * NOTE:HMR 无效
 */
const script = document.createElement('script')
script.src = chrome.runtime.getURL(mainWorld)
script.type = 'module'
document.head.prepend(script)
