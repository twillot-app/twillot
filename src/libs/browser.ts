import { getLocal, setLocal } from './storage'

export function openNewTab(url: string, active = true) {
  return chrome.tabs.create({
    url,
    active,
  })
}

export async function getAuthInfo() {
  const keys = ['token', 'csrf', 'lastForceSynced', 'bookmark_cursor']
  let auth = await getLocal(keys)
  /**
   * NOTE
   * 同步旧版本的登录信息，同步完成后删除
   */
  if (!auth.token) {
    auth = await chrome.storage.local.get(keys)
    if (auth.token) {
      await setLocal(auth)
      await chrome.storage.local.remove(keys)
    }
  }
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
