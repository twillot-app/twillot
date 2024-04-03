import { createEffect, For, Show } from 'solid-js'
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
    <main class="flex flex-col items-center max-w-2xl mx-auto h-screen">
      <p>
        {store.isAuthFailed
          ? 'Authentication failed. Please log in again.'
          : ''}
      </p>
      <div class="flex w-full mt-4">
        <input
          onChange={(e) => setStore('keyword', e.target.value as string)}
          placeholder="Search for a tweet now"
          class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg  block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white flex-1 outline-none"
        />
        <button
          onClick={query}
          class="ml-2 w-20 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg"
        >
          Search
        </button>
      </div>
      <Show when={!!store.keyword.trim()}>
        <div class="mt-4 text-base text-gray-500 text-left w-full">
          Find {store.tweets.length} records: <strong>{store.keyword}</strong>
        </div>
      </Show>
      <div class="my-4 flex-1 overflow-y-auto">
        <For each={store.tweets}>
          {(tweet) => (
            <div class="hover:bg-black hover:bg-opacity-5 p-2">
              <div class="flex flex-shrink-0 pb-0">
                <div class="flex items-start cursor-pointer">
                  <div
                    class="mr-2"
                    onClick={() =>
                      openNewTab(`https://twitter.com/${tweet.screen_name}/`)
                    }
                  >
                    <img
                      class="inline-block h-10 w-10 rounded-full"
                      src={tweet.avatar_url}
                      alt="avatar"
                    />
                  </div>
                  <div class="cursor-pointer">
                    <p class="text-base leading-6 font-bold text-black dark:text-white">
                      <span
                        onClick={() =>
                          openNewTab(
                            `https://twitter.com/${tweet.screen_name}/`,
                          )
                        }
                      >
                        {tweet.username}&nbsp;
                      </span>
                      <span class="text-sm leading-5 ml-1 font-normal text-[rgb(83,100,113)] dark:text-white">
                        <span
                          onClick={() =>
                            openNewTab(
                              `https://twitter.com/${tweet.screen_name}/`,
                            )
                          }
                        >
                          @{tweet.screen_name} ·{' '}
                        </span>
                        <span
                          onClick={() =>
                            openNewTab(
                              `https://twitter.com/${tweet.screen_name}/status/${tweet.tweet_id}`,
                            )
                          }
                        >
                          {new Date(tweet.created_at * 1000).toLocaleString()}
                        </span>
                      </span>
                    </p>
                  </div>
                </div>
              </div>
              <div class="pl-12 -mt-2">
                <p class="text-base width-auto font-medium text-black dark:text-white flex-shrink">
                  {tweet.full_text.split('\n').map((i) => (
                    <>
                      <span>{i}</span>
                      <br />
                    </>
                  ))}
                </p>
              </div>
            </div>
          )}
        </For>
      </div>
    </main>
  )
}

export default Options
