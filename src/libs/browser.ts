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
    chrome.storage.local.set({
      cookie: cookiesStr,
      csrf,
      token,
      url: bookmarkUrl,
    })
    chrome.webRequest.onSendHeaders.removeListener(onSendHeaders)
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
