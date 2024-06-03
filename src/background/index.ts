import {
  authTwitter,
  getOptionsPageTab,
  openOptionsPageWhenIconClicked,
} from '../libs/browser'
import { initWorkflows } from '../libs/workflow'

openOptionsPageWhenIconClicked()
authTwitter()

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

initWorkflows()
