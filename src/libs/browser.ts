export function openNewTab(url: string) {
  return chrome.tabs.create({
    url,
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
    token = '',
    bookmarkUrl = url.replace(/variables=[^&]+/, '')

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
    const cookies = await chrome.cookies.getAll({ domain: 'twitter.com' })
    const cookiesStr = cookies.map((c) => c.name + '=' + c.value).join('; ')
    await chrome.storage.local.set({
      cookie: cookiesStr,
      csrf,
      token,
      url: bookmarkUrl,
    })
    // NOTE 加了这一句获取登录态不稳定，导致登录失败，暂时注释掉
    // chrome.webRequest.onSendHeaders.removeListener(onSendHeaders)
  }
}

export function authTwitter() {
  chrome.webRequest.onSendHeaders.addListener(
    onSendHeaders,
    {
      urls: ['https://twitter.com/i/api/graphql/*'],
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
    'lastSynced',
  ])

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

export async function createPopup(url: string, width = 1, height = 1) {
  const tab = await chrome.tabs.create({
    url,
    active: true,
  })
  const window = await chrome.windows.create({
    tabId: tab.id,
    type: 'popup',
    width,
    height,
    focused: true,
  })

  return { tab, window }
}
