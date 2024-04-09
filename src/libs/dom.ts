import { openNewTab } from '../libs/browser'

export function openPage(e) {
  const url = e.target.dataset.text
  if (url) {
    if (url.startsWith('http')) {
      openNewTab(url)
    } else if (url.startsWith('@')) {
      openNewTab(`https://twitter.com/${url.slice(1)}`)
    } else if (url.startsWith('#')) {
      openNewTab(`https://twitter.com/hashtag/${url.slice(1)}`)
    }
  }
}
