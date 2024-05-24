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

export async function onSendHeaders(
  details: chrome.webRequest.WebRequestHeadersDetails,
) {
  const { url } = details
  if (!url.includes('/Bookmarks?')) {
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
    // NOTE 加了这一句获取登录态不稳定，导致登录失败，暂时注释掉
    // chrome.webRequest.onSendHeaders.removeListener(onSendHeaders)
  }
}

export function authTwitter() {
  chrome.webRequest.onSendHeaders.addListener(
    onSendHeaders,
    {
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

export async function addLocalItem(key: string, value: string) {
  if (value && value.length > 0) {
    await chrome.storage.local.set({
      [key]: value,
    })
    return value.trim()
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
  let tab = tabs.find((t) => t.url.includes('pages/options.html'))
  if (!tab && useNewTab) {
    tab = tabs.find((tab) => tab.url.includes('newtab'))
  }
  return tab
}
