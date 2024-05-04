import { createEffect, For } from 'solid-js'
import { getTimeline } from '../libs/db/tweets'
import dataStore from '../options/store'
import { FullText } from './Tweet'

export default function Timeline() {
  const [store, setStore] = dataStore
  createEffect(async () => {
    if (store.timeline.length) return
    const timeline = await getTimeline()
    setStore('timeline', timeline)
  })
  return (
    <ol class="relative border-s border-gray-200 dark:border-gray-700">
      <For each={store.timeline}>
        {(item) => (
          <li class="mb-10 ms-6">
            <span class="absolute -start-5 flex h-10 w-10 items-center justify-center rounded-full bg-blue-100 ring-white dark:bg-gray-800 ">
              <a href={`/?q=from:${item.tweet.screen_name}`}>
                <img
                  class="rounded-full shadow-lg"
                  src={item.tweet.avatar_url}
                />
              </a>
            </span>
            <div class="ml-3 rounded-lg border border-gray-200 bg-white p-4 shadow-sm dark:border-gray-600 dark:bg-gray-800">
              <div class="mb-3 items-center justify-between sm:flex">
                <time class="mb-1 text-sm font-normal text-gray-400 sm:order-last sm:mb-0">
                  <a
                    href={`/?q=from:${item.tweet.screen_name}`}
                    class="hover:underline"
                  >
                    {item.tweet.username}
                  </a>{' '}
                  on{' '}
                  {new Date(item.tweet.created_at * 1000).toLocaleDateString()}
                </time>
                <div class="lex text-lg font-normal text-gray-900 dark:text-white">
                  #{item.position}
                </div>
              </div>
              <div class="p-3 text-sm font-normal leading-4 ">
                <FullText text={item.tweet.full_text} />
              </div>
            </div>
          </li>
        )}
      </For>
    </ol>
  )
}
