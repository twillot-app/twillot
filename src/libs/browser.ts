import { getLocal, setLocal } from './storage'

export function openNewTab(url: string, active = true) {
  return chrome.tabs.create({
    url,
    active,
  })
}

export async function getAuthInfo() {
  const auth = await getLocal(['token', 'csrf', 'lastForceSynced'])
  return auth
}

export async function addLocalItem(key: string, value: string | string[]) {
  if (value && value.length > 0) {
    await setLocal({
      [key]: value,
    })
  }
}

export async function getLocalItem(key: string) {
  const item = await getLocal(key)
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
