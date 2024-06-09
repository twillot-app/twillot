import { getOptionsPageTab } from '../libs/browser'
import { Emitter } from '../libs/workflow/trigger'
import { TriggerContext } from '../libs/workflow/trigger.type'
import { Message, MessageType } from '../libs/workflow/types'
import { Host } from '../types'

chrome.action.onClicked.addListener(function () {
  chrome.runtime.openOptionsPage()
})

chrome.webRequest.onSendHeaders.addListener(
  async (details: chrome.webRequest.WebRequestHeadersDetails) => {
    const { url } = details
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

    if (csrf && token) {
      await chrome.storage.local.set({
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

chrome.runtime.onMessage.addListener((message: Message) => {
  if (message.type === MessageType.GetTriggerResponse) {
    Emitter.emit(message.payload as TriggerContext)
  } else {
    console.log('Unknown message type:', message)
  }
})

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
