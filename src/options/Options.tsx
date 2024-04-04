import { createEffect, For, Show } from 'solid-js'
import dataStore from './store'

import { searchBookmark, syncAllBookmarks } from '../libs/bookmark'
import { AuthStatus, Header, Tweet } from '../types'
import { openNewTab } from '../libs/browser'
import { countRecords } from '../libs/db'
import { Text } from '../components/Tweet'

export const Options = () => {
  let listRef: HTMLDivElement
  const [store, setStore] = dataStore
  const addTweets = (tweets: Tweet[]) => {
    setStore('tweets', () => [...tweets])
  }
  const query = async (keyword?: string) => {
    const result = await searchBookmark(keyword || '', store.page, store.pageSize)
    addTweets(result)
    listRef.scrollTo(0, 0)
  }
  const onSubmit = async (e) => {
    try {
      e.preventDefault()
      const keyword = e.target.keyword.value.trim()
      setStore('keyword', keyword)
      await query(keyword)
    } catch (err) {}
  }
  const openPage = (e) => {
    const url = e.target.dataset.text
    if (url) {
      if (url.startsWith('http')) {
        openNewTab(url)
      } else if (url.startsWith('@')) {
        openNewTab(`https://twitter.com/${url.slice(1)}`)
      } else if (url.startsWith('#')) {
        openNewTab(`https://twitter.com/hashtag/${url.slice(1)}`)
      }
    }
  }

  createEffect(async () => {
    try {
      setStore('isAutoSyncing', true)
      const total = await countRecords()
      setStore('totalCount', total)
      await query()
      const auth = await chrome.storage.local.get([
        'token',
        'url',
        'cookie',
        'csrf',
      ])
      await syncAllBookmarks(auth as Header)
      setStore('isAuthFailed', false)
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
    <main class="bg-white dark:bg-black">
      <div class="flex flex-col items-center max-w-2xl mx-auto h-screen">
        <h1 class="font-large text-xl text-center my-4 text-black dark:text-white">
          Twillot - your social media copilot
        </h1>
        <p>
          {store.isAuthFailed
            ? 'Authentication failed. Please log in again.'
            : ''}
        </p>
        <div class="flex items-center justify-center w-full">
          <div class="flex w-full">
            <form onSubmit={onSubmit} class="flex w-full">
              <div class="flex w-10 items-center justify-center rounded-tl-lg rounded-bl-lg border-r border-gray-200 bg-white p-5">
                <svg
                  viewBox="0 0 20 20"
                  aria-hidden="true"
                  class="pointer-events-none absolute w-5 fill-gray-500 transition"
                >
                  <path d="M16.72 17.78a.75.75 0 1 0 1.06-1.06l-1.06 1.06ZM9 14.5A5.5 5.5 0 0 1 3.5 9H2a7 7 0 0 0 7 7v-1.5ZM3.5 9A5.5 5.5 0 0 1 9 3.5V2a7 7 0 0 0-7 7h1.5ZM9 3.5A5.5 5.5 0 0 1 14.5 9H16a7 7 0 0 0-7-7v1.5Zm3.89 10.45 3.83 3.83 1.06-1.06-3.83-3.83-1.06 1.06ZM14.5 9a5.48 5.48 0 0 1-1.61 3.89l1.06 1.06A6.98 6.98 0 0 0 16 9h-1.5Zm-1.61 3.89A5.48 5.48 0 0 1 9 14.5V16a6.98 6.98 0 0 0 4.95-2.05l-1.06-1.06Z"></path>
                </svg>
              </div>
              <input
                type="text"
                class="flex-1 bg-white pl-2 text-base font-semibold outline-0"
                placeholder={`Search ${store.totalCount} tweets`}
                name="keyword"
              />
              <input
                type="submit"
                value="Search"
                class="bg-blue-500 p-2 rounded-tr-lg rounded-br-lg text-white font-semibold hover:bg-blue-800 transition-colors cursor-pointer"
              />
            </form>
          </div>
        </div>
        <Show when={!!store.keyword.trim()}>
          <div class="mt-4 text-base text-gray-500 text-left w-full">
            Found {store.tweets.length} records:{' '}
            <strong>{store.keyword}</strong>
          </div>
        </Show>
        <div class="my-4 flex-1 overflow-y-auto" onClick={openPage} ref={listRef!}>
          <For each={store.tweets}>
            {(tweet) => (
              <div class="hover:bg-black hover:bg-opacity-5 p-2">
                <div class="flex flex-shrink-0 pb-0">
                  <div class="flex items-start cursor-pointer">
                    <div
                      class="mr-2"
                      data-text={`https://twitter.com/${tweet.screen_name}/`}
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
                          data-text={`https://twitter.com/${tweet.screen_name}/`}
                        >
                          {tweet.username}&nbsp;
                        </span>
                        <span class="text-sm leading-5 ml-1 font-normal text-[rgb(83,100,113)] dark:text-gray-500">
                          <span
                            data-text={`https://twitter.com/${tweet.screen_name}/`}
                          >
                            @{tweet.screen_name} ·{' '}
                          </span>
                          <span
                            class="dark:text-gray-500"
                            data-text={`https://twitter.com/${tweet.screen_name}/status/${tweet.tweet_id}`}
                          >
                            {new Date(tweet.created_at * 1000).toLocaleString()}
                          </span>
                        </span>
                      </p>
                    </div>
                  </div>
                </div>
                <div class="pl-12 -mt-2">
                  <div class="text-base width-auto font-medium text-black dark:text-white flex-shrink">
                    {tweet.full_text.split('\n').map((i) => (
                      <>
                        <Text text={i} keyword={store.keyword} />
                        <br />
                      </>
                    ))}
                  </div>
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
