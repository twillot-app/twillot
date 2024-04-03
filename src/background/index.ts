console.log('background is running')

chrome.action.onClicked.addListener(function () {
  chrome.runtime.openOptionsPage()
})

let csrf = '',
  token = ''
let trigged = false
chrome.webRequest.onSendHeaders.addListener(
  async (e) => {
    if (trigged) {
      console.log('background has already triggered')
      return
    }
    if (csrf && token) {
      chrome.tabs.sendMessage(e.tabId, { type: 'ready' })
      trigged = true
      return
    }
    const { url: t } = e
    if (t.includes('/Bookmarks?')) {
      chrome.storage.local.set({ url: t.replace(/variables=[^&]+/, '') })
      for (const { name: t, value: o } of e.requestHeaders || []) {
        if (csrf && token) {
          // chrome.tabs.sendMessage(e.tabId, { csrf, token, type: "start" });
          const cookies = await chrome.cookies.getAll({ domain: 'twitter.com' })
          const cookiesStr = cookies.map((c) => c.name + '=' + c.value).join('; ')
          chrome.storage.local.set({ cookie: cookiesStr })
          break
        }
        if (t === 'x-csrf-token') {
          csrf = o || ''
          chrome.storage.local.set({ csrf })
        } else if (t === 'authorization') {
          token = o || ''
          chrome.storage.local.set({ token })
        }

        console.log('csrf:', csrf, 'token:', token)
      }
    }
  },
  {
    urls: ['https://twitter.com/i/bookmarks*'],
  },
  ['requestHeaders'],
)
