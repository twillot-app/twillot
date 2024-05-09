import { Show, createMemo } from 'solid-js'

import { Content } from './Tweet'
import dataStore from '../options/store'
import FolderSelect from './FolderSelect'
import { IconClose, IconLeft, IconRight } from './Icons'
import { getNextTweet, getPrevTweet } from '../options/handlers'

export default function ZenMode() {
  const [store, setStore] = dataStore
  const tweet = createMemo(() => {
    const index = store.selectedTweet
    if (index < 0) {
      return null
    }

    return store.tweets[index]
  })
  return (
    <Show when={tweet()}>
      <div class="relative flex h-full min-h-[400px] w-full flex-col bg-white dark:bg-gray-800 ">
        <header class="sticky top-0 mx-auto w-[40rem] bg-white py-4 dark:bg-gray-800">
          <address class="flex items-center not-italic">
            <div class="mr-3 inline-flex items-center text-sm text-gray-900 dark:text-white">
              <img
                class="mr-4 h-16 w-16 rounded-full"
                src={`${tweet().avatar_url.replace('_normal', '_x96')}`}
              />
              <div>
                <span class="text-xl font-bold text-gray-900 dark:text-white ">
                  {tweet().username}
                </span>
                <span class="dark:text-gray-40 ml-2 text-gray-500">
                  @{tweet().screen_name}
                </span>
                <span class="dark:text-gray-40 ml-2 inline-flex items-center gap-4 font-normal text-gray-500">
                  <time>
                    {new Date(tweet().created_at * 1000).toLocaleString()}
                  </time>
                  <FolderSelect tweet={tweet()} />
                </span>
              </div>
            </div>
          </address>
        </header>
        <article class="mx-auto w-[40rem] flex-1">
          <Content tweet={tweet}></Content>
        </article>
        <footer class="sticky bottom-0 mx-auto flex h-14 w-[40rem] select-none items-center justify-center gap-4 bg-white pb-2 pt-4 *:cursor-pointer dark:bg-gray-800">
          <div class="flex items-center gap-4">
            <span onClick={getPrevTweet}>
              <IconLeft />
            </span>
            <span onClick={getNextTweet}>
              <IconRight />
            </span>
          </div>
        </footer>
        <div
          class="fixed left-8 top-8 cursor-pointer"
          onClick={() => setStore({ selectedTweet: -1 })}
        >
          <IconClose />
        </div>
      </div>
    </Show>
  )
}
