export function openNewTab(url: string) {
  return chrome.tabs.create({
    url,
  })
}
