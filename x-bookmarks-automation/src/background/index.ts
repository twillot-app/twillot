import { getCurrentUserId, setLocal } from 'utils/storage'
import { Host } from 'utils/types'

chrome.webRequest.onSendHeaders.addListener(
  async (details: chrome.webRequest.WebRequestHeadersDetails) => {
    const { url, initiator } = details
    // 当前页面不监听
    if (initiator !== Host) {
      return
    }

    let csrf = '',
      token = ''

    for (const { name: t, value: o } of details.requestHeaders || []) {
      if (csrf && token) {
        break
      }

      if (t === 'x-csrf-token') {
        csrf = o || ''
      } else if (t === 'authorization') {
        token = o || ''
      }
    }

    if (!csrf || !token) {
      return
    }

    const uid = await getCurrentUserId()
    if (uid) {
      await setLocal({
        csrf,
        token,
      })
    }
  },
  {
    types: ['xmlhttprequest'],
    urls: [`${Host}/i/api/graphql/*`],
  },
  ['requestHeaders'],
)
