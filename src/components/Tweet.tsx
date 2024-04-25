import { createMemo, createSignal, Show } from 'solid-js'

import {
  escapeHtml,
  escapeRegExp,
  highlightAndLinkify,
  maxChars,
} from '../libs/text'
import { Media, Tweet, TweetQuoted } from '../types'

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
            class="mt-2 cursor-pointer text-blue-500"
            onClick={() => setShowFullText(true)}
          >
            {matches > 1 ? `Show all ${matches} matches` : 'Show full text'}
          </div>
        </>
      }
    >
      <span class="whitespace-pre-wrap break-words" innerHTML={html()} />
    </Show>
  )
}

export const MediaItems = (props: { media_items: Media[] }) => {
  const width = props.media_items.length > 1 ? 'w-[calc(50%-4px)]' : 'w-full'
  return props.media_items.map((item) => (
    <div class={`relative ${width} flex items-center`}>
      <Image
        src={item.media_url_https}
        alt={item.ext_alt_text}
        url={
          item.video_info
            ? item.video_info.variants[item.video_info.variants.length - 1].url
            : ''
        }
      />
      <Show when={item.type === 'video'}>
        <div class="pointer-events-none absolute left-1/2 top-1/2 -ml-8 -mt-8 flex h-14 w-14 items-center justify-center rounded-full">
          <svg viewBox="0 0 60 61" aria-hidden="true">
            <g>
              <circle
                cx="30"
                cy="30.4219"
                fill="#333333"
                opacity="0.6"
                r="30"
              ></circle>
              <path
                d="M22.2275 17.1971V43.6465L43.0304 30.4218L22.2275 17.1971Z"
                fill="white"
              ></path>
            </g>
          </svg>
        </div>
      </Show>
    </div>
  ))
}

export function Image(props: { src: string; alt?: string; url?: string }) {
  return (
    <figure
      class="h-auto w-full cursor-pointer grayscale filter transition-all duration-300 hover:grayscale-0"
      title={props.alt || ''}
    >
      <a href={props.url || props.src} target="_blank">
        <img class="rounded-lg" src={props.src} />
      </a>
    </figure>
  )
}

export const Content = (props: {
  tweet: Tweet | TweetQuoted
  keyword?: string
}) => {
  const tweet = props.tweet
  return (
    <>
      <div class="width-auto text-base font-normal leading-6 ">
        <FullText text={tweet.full_text} keyword={props.keyword} />
      </div>
      <Show when={tweet.media_items}>
        <div class="my-2 flex flex-wrap space-x-1 space-y-1">
          <MediaItems media_items={tweet.media_items} />
        </div>
      </Show>
    </>
  )
}
