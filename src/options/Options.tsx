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
    const result = await searchBookmark(
      keyword || '',
      store.page,
      store.pageSize,
    )
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
      const auth = await chrome.storage.local.get([
        'token',
        'url',
        'cookie',
        'csrf',
        'lastSynced',
      ])
      if (!auth || !auth.url) {
        throw new Error(AuthStatus.AUTH_FAILED)
      }

      setStore('totalCount', await countRecords())

      if (!auth.lastSynced) {
        setStore('isForceSyncing', true)
        await syncAllBookmarks(auth as Header, true)
        setStore('isForceSyncing', false)
      } else {
        await query()
        setStore('isAutoSyncing', true)
        const addedCount = await syncAllBookmarks(auth as Header)
        setStore('isAutoSyncing', false)
        if (addedCount > 0) {
          await query()
          setStore('totalCount', await countRecords())
        }
      }
      const syncedTime = Math.floor(Date.now() / 1000)
      await chrome.storage.local.set({
        lastSynced: syncedTime,
      })
      setStore('syncTime', syncedTime)
    } catch (err) {
      console.error(err)
      if (err.message == AuthStatus.AUTH_FAILED) {
        setStore('isAuthFailed', true)
      }
    }
  })

  return (
    <main class="bg-white dark:bg-black">
      <div class="flex flex-col items-center max-w-2xl mx-auto h-screen">
        <h1 class="font-large text-xl text-center my-4 bg-gradient-to-r from-blue-500 to-purple-500 bg-clip-text text-transparent font-semibold">
          Twillot - your social media copilot
        </h1>
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
        <div
          class="my-4 flex-1 overflow-y-auto"
          onClick={openPage}
          ref={listRef!}
        >
          <Show when={store.isAuthFailed}>
            <p
              class="text-black dark:text-white text-center cursor-pointer"
              data-text="https://twitter.com/i/bookmarks?twillot=reauth"
            >
              Authentication failed, click here to reauthenticate.
            </p>
          </Show>
          <div>
            <Show when={store.isForceSyncing}>
              <svg
                aria-hidden="true"
                class="w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600"
                viewBox="0 0 100 101"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                  fill="currentColor"
                />
                <path
                  d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                  fill="currentFill"
                />
              </svg>
            </Show>
            <Show when={store.isForceSyncing}>
              <p class="text-red">
                Performing initial data synchronization. Please do not close
                this window.
              </p>
            </Show>
          </div>
          <For each={store.tweets}>
            {(tweet) => (
              <div class="hover:bg-black hover:bg-opacity-5 p-2">
                <div class="flex flex-shrink-0 pb-0">
                  <div class="flex items-start cursor-pointer">
                    <div class="mr-2">
                      <img
                        class="inline-block h-10 w-10 rounded-full"
                        src={tweet.avatar_url.replace('_normal', '_x96')}
                        data-text={`https://twitter.com/${tweet.screen_name}/`}
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
                  <div class="text-base leading-5 width-auto font-normal text-[rgb(15,20,25)] dark:text-white flex-shrink">
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
