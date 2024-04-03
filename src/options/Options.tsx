import { createEffect, For } from 'solid-js'
import dataStore from './store'

import { searchBookmark, syncAllBookmarks } from '../libs/bookmark'
import { AuthStatus, Header, Tweet } from '../types'
import { openNewTab } from '../libs/browser'

export const Options = () => {
  const [store, setStore] = dataStore
  const addTweets = (tweets: Tweet[]) => {
    setStore('tweets', () => [...tweets])
  }
  const query = async () => {
    try {
      const keyword = store.keyword.trim()
      const result = await searchBookmark(keyword, store.page, store.pageSize)
      console.log(result)
      addTweets(result)
    } catch (err) {}
  }

  createEffect(async () => {
    try {
      setStore('isAutoSyncing', true)
      const auth = await chrome.storage.local.get([
        'token',
        'url',
        'cookie',
        'csrf',
      ])
      await syncAllBookmarks(auth as Header)
    } catch (err) {
      console.error(err)
      if (err.message == AuthStatus.AUTH_FAILED) {
        setStore('isAuthFailed', true)
      }
    } finally {
      setStore('isAutoSyncing', false)
    }
  })

  return (
    <main>
      <div class="flex flex-col items-center max-w-2xl mx-auto">
        <p>
          {store.isAuthFailed
            ? 'Authentication failed. Please log in again.'
            : ''}
        </p>
        <div class="flex">
          <input
            onChange={(e) => setStore('keyword', e.target.value as string)}
            placeholder="Search for a tweet now"
            class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          />
          <button onClick={query}>Search</button>
        </div>

        <div class="">
          <For each={store.tweets}>
            {(tweet) => (
              <div class="">
                <div class="flex flex-shrink-0 p-4 pb-0">
                  <a class="flex-shrink-0 group block" target="_blank">
                    <div class="flex items-center cursor-pointer">
                      <div
                        onClick={() =>
                          openNewTab(
                            `https://twitter.com/${tweet.screen_name}/`,
                          )
                        }
                      >
                        <img
                          class="inline-block h-10 w-10 rounded-full"
                          src={tweet.avatar_url}
                          alt="avatar"
                        />
                      </div>
                      <div
                        class="ml-3 cursor-pointer"
                        onClick={() =>
                          openNewTab(
                            `https://twitter.com/${tweet.screen_name}/status/${tweet.tweet_id}`,
                          )
                        }
                      >
                        <p class="text-base leading-6 font-medium text-black dark:text-white">
                          {tweet.username}&nbsp;
                          <span class="text-sm leading-5 font-medium text-black dark:text-white">
                            @{tweet.screen_name} .{' '}
                            {new Date(tweet.created_at * 1000).toLocaleString()}
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
