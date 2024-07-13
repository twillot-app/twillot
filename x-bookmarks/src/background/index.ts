import { getOptionsPageTab } from 'utils/browser'
import { getCurrentUserId, setLocal } from 'utils/storage'
import { Host } from 'utils/types'

chrome.action.onClicked.addListener(function () {
  chrome.runtime.openOptionsPage()
})

chrome.webRequest.onSendHeaders.addListener(
  async (details: chrome.webRequest.WebRequestHeadersDetails) => {
    const { url, initiator } = details
    // 当前页面不监听
    if (initiator !== Host) {
      return
    }

    /**
     * The interface for members and non-members is different.
     * Members request folders first, while regular users directly request bookmarks.
     */
    if (!url.includes('/Bookmarks') && !url.includes('/BookmarkFoldersSlice')) {
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

    const current_user_id = await getCurrentUserId()
    if (current_user_id) {
      if (csrf && token) {
        await setLocal({
          csrf,
          token,
        })
      } else {
        console.error('csrf or token not found', url)
      }
    } else {
      console.error('current_user_id not found')
    }
  },
  {
    types: ['xmlhttprequest'],
    urls: [`${Host}/i/api/graphql/*`],
  },
  ['requestHeaders'],
)

chrome.omnibox.onInputEntered.addListener(async (text) => {
  const newURL =
    chrome.runtime.getURL('pages/options.html') +
    '#/?q=' +
    encodeURIComponent(text)
  let tab = await getOptionsPageTab()
  if (tab) {
    await chrome.tabs.update(tab.id, { url: newURL, active: true })
  } else {
    await chrome.tabs.create({ url: newURL })
  }
})
