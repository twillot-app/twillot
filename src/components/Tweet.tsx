import { createSignal, Show } from 'solid-js'

const dots = '<span class="text-gray-400 flex items-center my-1">...</span>'
const markTag = '<mark>$&</mark>'
const maxChars = 280
const escapeHtml = (unsafe: string) => {
  return unsafe
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;')
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

    return `${excerpt.replace(regex, markTag)} `
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
        innerHTML={
          props.keyword ? props.text.replace(regex, markTag) : props.text
        }
      />
    </Show>
  )
}
