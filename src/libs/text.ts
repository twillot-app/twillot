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
  /**
   * & " ' 已经转义，不需要再次转义
   */
  return unsafe.replace(/</g, '&lt;').replace(/>/g, '&gt;')
}

export function escapeRegExp(string: string): string {
  return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
}

/**
 * 高亮关键字，不命中 html 标签相关的属性
 */
export function highlight(html: string, reg: RegExp) {
  return html.replace(
    new RegExp(`(?!<[^<>]*)${reg.source}(?![^<>]*>)`, 'gi'),
    '<mark>$1</mark>',
  )
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
  keywordReg?: RegExp,
  expanded = false,
): string {
  if (keywordReg) {
    /**
     * 文本太长则仅显示摘要
     */
    if (!expanded) {
      const index = text.search(keywordReg)
      const startIndex = Math.max(0, index - prevChars)
      const endIndex = Math.min(text.length, index + nextChars)
      let exerpt = text.slice(startIndex, endIndex)
      if (startIndex > 0) {
        exerpt = dots + exerpt
      }
      if (endIndex < text.length) {
        exerpt += dots
      }

      return highlight(linkify(exerpt), keywordReg)
    }

    return highlight(linkify(text), keywordReg)
  } else {
    return linkify(text)
  }
}
