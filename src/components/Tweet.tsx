import { createMemo, createSignal, Show } from 'solid-js'
import {
  escapeHtml,
  escapeRegExp,
  highlightAndLinkify,
  maxChars,
} from '../libs/text'

export const FullText = (props: { text: string; keyword?: string }) => {
  const [showFullText, setShowFullText] = createSignal(
    !props.keyword || props.text.length < maxChars,
  )
  const keyword = props.keyword ? escapeHtml(props.keyword) : ''
  const text = keyword ? escapeHtml(props.text) : props.text
  const escapedQueryForRegex = keyword ? escapeRegExp(keyword) : ''
  const highlightRegex = keyword
    ? new RegExp(`(${escapedQueryForRegex})`, 'gi')
    : null
  const matches = keyword ? text.match(highlightRegex)?.length || 0 : 0
  const html = createMemo(() =>
    highlightAndLinkify(text, highlightRegex, showFullText()),
  )

  return (
    <Show
      when={showFullText()}
      fallback={
        <>
          <span class="whitespace-pre-wrap break-words" innerHTML={html()} />
          <div
            class="text-blue-500 cursor-pointer mt-2"
            onClick={() => setShowFullText(true)}
          >
            {matches > 1 ? `Show all ${matches} matches` : 'Show full text'}
          </div>
        </>
      }
    >
      <span class="break-words whitespace-pre-wrap" innerHTML={html()} />
    </Show>
  )
}
