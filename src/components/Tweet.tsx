import { createMemo, createSignal, Show } from 'solid-js'
import { Host } from '../types'

const dots = '<span class="text-gray-400 flex items-center my-1">...</span>'
const maxChars = 280
const prevChars = 140
const nextChars = 140
const urlRegex =
  /(?<!")(https?:\/\/[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9]{1,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*))(?!")/g
const mentionRegex = /(?<!@)@(\w{1,15})\b/g
const hashtagRegex = /(\s|^)#([a-zA-Z0-9_]+)\b/g

function escapeHtml(unsafe: string): string {
  return unsafe
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;')
}

function escapeRegExp(string: string): string {
  return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
}

function highlight(html: string, reg: RegExp) {
  return html.replace(new RegExp(`>([^<]*)`, 'g'), (match, group1) => {
    return '>' + group1.replace(reg, '<mark>$1</mark>')
  })
}

function linkify(text: string) {
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

function highlightAndLinkify(
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

export const FullText = (props: { text: string; keyword?: string }) => {
  const [showFullText, setShowFullText] = createSignal(
    !props.keyword || props.text.length < maxChars,
  )
  const text = escapeHtml(props.text)
  const keyword = props.keyword ? escapeHtml(props.keyword) : ''
  const regex = props.keyword && new RegExp(keyword, 'gi')
  const matches = props.keyword ? text.match(regex)?.length || 0 : 0
  const html = createMemo(() =>
    highlightAndLinkify(text, keyword, showFullText()),
  )
  return (
    <Show
      when={showFullText()}
      fallback={
        <>
          <span class="text-wrap whitespace-pre-wrap" innerHTML={html()} />
          <div
            class="text-blue-500 cursor-pointer mt-2"
            onClick={() => setShowFullText(true)}
          >
            {matches > 1 ? `Show all ${matches} matches` : 'Show full text'}
          </div>
        </>
      }
    >
      <span class="text-wrap whitespace-pre-wrap" innerHTML={html()} />
    </Show>
  )
}
