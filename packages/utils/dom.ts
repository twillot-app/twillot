import { openNewTab } from './browser'
import { Host } from './types'

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

export function createStyleSheet(url: string, id?: string) {
  if (id) {
    const existing = document.getElementById(id)
    if (existing) {
      existing.setAttribute('href', url)
      return
    }
  }

  const link = document.createElement('link')
  link.href = url
  link.rel = 'stylesheet'
  link.id = id
  document.head.appendChild(link)
}
