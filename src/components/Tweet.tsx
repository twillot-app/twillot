import { createSignal, Show } from 'solid-js'
import { Host } from '../types'

const dots = '<span class="text-gray-400 flex items-center my-1">...</span>'
const markTag = '<mark>$&</mark>'
const maxChars = 280
const urlRegex = /(https?:\/\/[^\s]+)/g
const usernameRegex = /(@[a-zA-Z0-9_]{1,15})\b/g
const hashtagRegex = /(#[a-zA-Z0-9_]+)\b/g

const escapeHtml = (unsafe: string) => {
  return unsafe
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;')
}

function richText(tweet: string): string {
  return tweet
    .replace(
      urlRegex,
      '<a href="$1" target="_blank" class="text-blue-500">$1</a>',
    )
    .replace(
      usernameRegex,
      `<a href="${Host}/$1" target="_blank" class="text-blue-500">$1</a>`,
    )
    .replace(
      hashtagRegex,
      `<a href="${Host}/hashtag/$1" target="_blank" class="text-blue-500">$1</a>`,
    )
}

export const FullText = (props: { text: string; keyword?: string }) => {
  const [showFullText, setShowFullText] = createSignal(
    !props.keyword || props.text.length < maxChars,
  )
  const regex = props.keyword && new RegExp(props.keyword, 'gi')
  const matches = props.keyword ? props.text.match(regex).length : 0
  const highlightText = () => {
    const index = props.text.search(regex)
    const startIndex = Math.max(0, index - 100)
    const endIndex = Math.min(props.text.length, index + maxChars)
    let excerpt = escapeHtml(props.text.slice(startIndex, endIndex))
    if (startIndex > 0) {
      excerpt = dots + excerpt
    }
    if (endIndex < props.text.length) {
      excerpt += dots
    }

    return richText(excerpt.replace(regex, markTag))
  }

  return (
    <Show
      when={showFullText()}
      fallback={
        <>
          <span
            class="text-wrap whitespace-pre-wrap"
            innerHTML={highlightText()}
          />
          <div
            class="text-blue-500 cursor-pointer mt-2"
            onClick={() => setShowFullText(true)}
          >
            {matches > 1 ? `Show all ${matches} matches` : 'Show full text'}
          </div>
        </>
      }
    >
      <span
        class="text-wrap whitespace-pre-wrap"
        innerHTML={richText(
          props.keyword ? props.text.replace(regex, markTag) : props.text,
        )}
      />
    </Show>
  )
}
