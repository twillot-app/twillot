import { Content } from './Tweet'
import dataStore from '../options/store'
import { Show, createMemo } from 'solid-js'
import { Host } from '../types'
import FolderSelect from './FolderSelect'
import { A } from '@solidjs/router'

export default function ZenMode() {
  const [store] = dataStore
  const tweet = createMemo(() => store.tweets[0])
  return (
    <div class="relative flex h-full w-full flex-col bg-white dark:bg-gray-800 ">
      <header class="sticky top-0 mx-auto w-[40rem] bg-white py-4 dark:bg-gray-800">
        <Show when={tweet()} fallback={null}>
          <address class="flex items-center not-italic">
            <div class="mr-3 inline-flex items-center text-sm text-gray-900 dark:text-white">
              <img
                class="mr-4 h-16 w-16 rounded-full"
                src={`${tweet().avatar_url.replace('_normal', '_x96')}`}
              />
              <div>
                <span class="text-xl font-bold text-gray-900 dark:text-white">
                  {tweet().screen_name}
                  <span class="dark:text-gray-40 mx-6 inline-flex items-center gap-4 text-base font-normal text-gray-500">
                    <time>
                      {new Date(tweet().created_at * 1000).toLocaleString()}
                    </time>
                    <FolderSelect tweet={tweet()} />
                  </span>
                </span>
              </div>
            </div>
          </address>
        </Show>
      </header>
      <article class="mx-auto w-[40rem] flex-1">
        <Show when={tweet()}>
          <Content tweet={tweet()}></Content>
        </Show>
      </article>
      <footer class="sticky bottom-0 mx-auto h-14 w-[40rem] bg-white pt-4 dark:bg-gray-800">
        <h1>Footer</h1>
      </footer>
    </div>
  )
}
