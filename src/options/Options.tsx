import { createEffect, For } from 'solid-js'
import { createStore } from 'solid-js/store'

import { searchBookmark, syncAllBookmarks } from '../libs/bookmark'
import { Header, Tweet } from '../types'

export const Options = () => {
  const [store, setStore] = createStore({
    tweets: new Array<Tweet>(),
  })
  const addTweets = (tweets: Tweet[]) => {
    setStore('tweets', () => [...tweets])
  }
  const query = async (e) => {
    try {
      const keyword = e.target.value as string
      const result = await searchBookmark(keyword.trim())
      console.log(result)
      addTweets(result)
    } catch (err) {}
  }

  createEffect(async () => {
    const auth = (await chrome.storage.local.get(['token', 'url', 'cookie', 'csrf'])) as Header
    await syncAllBookmarks(auth)
  })

  return (
    <main>
      <div class="flex flex-col items-center w-full">
        <input
          onChange={query}
          placeholder="Search for a tweet now"
          class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        />
        <div class="">
          <For each={store.tweets}>
            {(tweet) => (
              <div class="">
                <div class="flex flex-shrink-0 p-4 pb-0">
                  <a class="flex-shrink-0 group block" target="_blank">
                    <div class="flex items-center">
                      <div>
                        <img
                          class="inline-block h-10 w-10 rounded-full"
                          src={tweet.avatar_url}
                          alt=""
                        />
                      </div>
                      <div class="ml-3">
                        <p class="text-base leading-6 font-medium text-white">
                          {tweet.username}
                          <span class="text-sm leading-5 font-medium text-gray-400 group-hover:text-gray-300 transition ease-in-out duration-150">
                            @{tweet.screen_name} . {tweet.created_at}
                          </span>
                        </p>
                      </div>
                    </div>
                  </a>
                </div>
                <div class="pl-16">
                  <p class="text-base width-auto font-medium text-black dark:text-white flex-shrink">
                    {tweet.full_text}
                  </p>
                </div>
              </div>
            )}
          </For>
        </div>
      </div>
    </main>
  )
}

export default Options
