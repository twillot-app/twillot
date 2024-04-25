import { Host } from '../types'

export const URL_REG =
  /(?<!")(https?:\/\/[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9]{1,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*))(?!")/g
export const mentionRegex = /(?<!@)@(\w{1,15})\b/g
// copied from https://regex101.com/r/NLHUQh/1
export const hashtagRegex =
  /\B(?:#|＃)((?![\p{N}_]+(?:$|\b|\s))(?:[\p{L}\p{M}\p{N}_]{1,60}))/gu
export const maxChars = 280

const dots = '<span class="text-gray-400 flex items-center my-1">...</span>'
const prevChars = 140
const nextChars = 140

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
  const attrs = 'target="_blank" class="text-blue-500 mx-1"'
  return text
    .replace(URL_REG, (url) => {
      return `<a href="${url}" ${attrs}>${url.replace(/[@#]/g, '')}</a>`
    })
    .replace(mentionRegex, `<a href="${Host}/$1" ${attrs}>@$1</a>`)
    .replace(hashtagRegex, `<a href="${Host}/hashtag/$1" ${attrs}>#$1</a>`)
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
    return linkify(
      expanded
        ? text
        : text.slice(0, maxChars) + (text.length > maxChars ? dots : ''),
    )
  }
}
