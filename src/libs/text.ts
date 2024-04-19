import { Host } from '../types'

const dots = '<span class="text-gray-400 flex items-center my-1">...</span>'
const prevChars = 140
const nextChars = 140
const urlRegex =
  /(?<!")(https?:\/\/[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9]{1,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*))(?!")/g
const mentionRegex = /(?<!@)@(\w{1,15})\b/g
const hashtagRegex = /(\s|^)#([a-zA-Z0-9_]+)\b/g

export const maxChars = 280

export function escapeHtml(unsafe: string): string {
  return unsafe
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;')
}

export function escapeRegExp(string: string): string {
  return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
}

export function highlight(html: string, reg: RegExp) {
  return html.replace(new RegExp(`>([^<]*)`, 'g'), (match, group1) => {
    return '>' + group1.replace(reg, '<mark>$1</mark>')
  })
}

export function linkify(text: string) {
  return text
    .replace(urlRegex, (url) => {
      return `<a href="${url}" target="_blank" class="text-blue-500 mx-1">${url.replace(/[@#]/g, '')}</a>`
    })
    .replace(
      mentionRegex,
      `<a href="${Host}/$1" target="_blank" class="text-blue-500 mx-1">@$1</a>`,
    )
    .replace(
      hashtagRegex,
      `<a href="${Host}/hashtag/$2" target="_blank" class="text-blue-500 mx-1">#$2</a>`,
    )
}

export function highlightAndLinkify(
  text: string,
  query: string,
  expanded = false,
): string {
  text = escapeHtml(text)

  if (query) {
    query = escapeHtml(query)
    const escapedQueryForRegex = escapeRegExp(query)
    const highlightRegex = new RegExp(`(${escapedQueryForRegex})`, 'gi')

    if (!expanded) {
      const index = text.search(highlightRegex)
      const startIndex = Math.max(0, index - prevChars)
      const endIndex = Math.min(text.length, index + nextChars)
      let exerpt = text.slice(startIndex, endIndex)
      if (startIndex > 0) {
        exerpt = dots + exerpt
      }
      if (endIndex < text.length) {
        exerpt += dots
      }

      return highlight(linkify(exerpt), highlightRegex)
    }

    return highlight(linkify(text), highlightRegex)
  } else {
    return linkify(text)
  }
}
