import { openNewTab } from '../libs/browser'
import { Host } from '../types'

export function openPage(e) {
  const url = e.target.dataset.text
  if (url) {
    if (url.startsWith('http')) {
      openNewTab(url)
    } else if (url.startsWith('@')) {
      openNewTab(`${Host}/${url.slice(1)}`)
    } else if (url.startsWith('#')) {
      openNewTab(`${Host}/hashtag/${url.slice(1)}`)
    }
  }
}
