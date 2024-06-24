import { getOptionsPageTab } from '../libs/browser'
import { getCurrentUserId, getLocal, setLocal } from '../libs/storage'
import { Emitter } from '../libs/workflow/trigger'
import { TriggerContext } from '../libs/workflow/trigger.type'
import {
  ClientPageStorageKey,
  Message,
  MessageType,
} from '../libs/workflow/types'
import { API_HOST, Host } from '../types'

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

chrome.runtime.onMessage.addListener(async (message: Message) => {
  if (message.type === MessageType.GetTriggerResponse) {
    Emitter.emit(message.payload as TriggerContext)
  } else if (message.type === MessageType.ValidateLicense) {
    const [user_id, license_code] = await Promise.all([
      getCurrentUserId(),
      getLocal(ClientPageStorageKey.License),
    ])
    if (!user_id) {
      console.error('current_user_id not found')
      return
    }

    const res = await fetch(API_HOST + '/webhook/license/validate', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        license_code,
        device_id: user_id,
      }),
    })
    const data = await res.json()
    if (data.message || data.exppires_at < Math.floor(Date.now() / 1000)) {
      setLocal({ [ClientPageStorageKey.License]: null })
    }
    console.warn(data.message)
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
