import { syncAuthHeaders } from 'utils/storage'
import { Host } from 'utils/types'

chrome.webRequest.onSendHeaders.addListener(
  async (details: chrome.webRequest.WebRequestHeadersDetails) => {
    const { initiator } = details
    // 当前页面不监听
    if (initiator !== Host) {
      return
    }

    await syncAuthHeaders(details.requestHeaders)
  },
  {
    types: ['xmlhttprequest'],
    urls: [`${Host}/i/api/graphql/*`],
  },
  ['requestHeaders'],
)
