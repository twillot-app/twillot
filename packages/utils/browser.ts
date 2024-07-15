import { getLocal, StorageKeys, setLocal } from './storage'

export function openNewTab(url: string, active = true) {
  return chrome.tabs.create({
    url,
    active,
  })
}

export async function getAuthInfo(): Promise<{
  token: string
  csrf: string
  bookmark_cursor: string
}> {
  const keys = [
    StorageKeys.Token,
    StorageKeys.Csrf,
    StorageKeys.Bookmark_Cursor,
  ]
  let auth = await getLocal(keys)
  return auth
}

export async function getLastSyncInfo(): Promise<number> {
  let obj = await getLocal(StorageKeys.Last_Sync)
  return obj[StorageKeys.Last_Sync] || 0
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
