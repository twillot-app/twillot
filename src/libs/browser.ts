import { Host, X_DOMAIN } from '../types'

export function openNewTab(url: string, active = true) {
  return chrome.tabs.create({
    url,
    active,
  })
}

export function openOptionsPageWhenIconClicked() {
  chrome.action.onClicked.addListener(function () {
    chrome.runtime.openOptionsPage()
  })
}

export function authTwitter() {
  chrome.webRequest.onSendHeaders.addListener(
    async (details) => {
      const { url } = details
      if (
        /**
         * 会员与非会员界面不一样
         * 会员先请求文件夹，普通用户直接请求书签
         */
        !url.includes('/Bookmarks') &&
        !url.includes('/BookmarkFoldersSlice')
      ) {
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
        const cookies = await chrome.cookies.getAll({ domain: X_DOMAIN })
        const cookiesStr = cookies.map((c) => c.name + '=' + c.value).join('; ')
        await chrome.storage.local.set({
          cookie: cookiesStr,
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
}

export async function getAuthInfo() {
  const auth = await chrome.storage.local.get([
    'token',
    'url',
    'cookie',
    'csrf',
    'lastForceSynced',
  ])
  if (auth && auth.url) {
    const url = new URL(auth.url)
    /**
     * 2024.5.19 twitter 域名正式使用 x.com
     */
    if (url.hostname !== X_DOMAIN) {
      await chrome.storage.local.clear()
      return null
    }
  }

  return auth
}

export async function addLocalItem(key: string, value: string | string[]) {
  if (value && value.length > 0) {
    await chrome.storage.local.set({
      [key]: value,
    })
  }
}

export async function getLocalItem(key: string) {
  const item = await chrome.storage.local.get(key)
  return item && item[key]
}

export async function getOptionsPageTab(
  useNewTab = false,
): Promise<chrome.tabs.Tab | undefined> {
  let tabs = await chrome.tabs.query({
    windowType: 'normal',
    currentWindow: true,
  })
  const pageUrl = chrome.runtime.getURL('pages/options.html')
  let tab = tabs.find((t) => t.url.includes(pageUrl))
  if (!tab && useNewTab) {
    tab = tabs.find((tab) => tab.url.includes('newtab'))
  }
  return tab
}

export async function sendMessageToOptions(message: any) {
  const tab = await getOptionsPageTab()
  if (tab) {
    await chrome.tabs.sendMessage(tab.id, message)
  }
}
