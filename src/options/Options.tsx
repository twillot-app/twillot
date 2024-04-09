import { For, onMount, Show } from 'solid-js'

import dataStore from './store'
import { searchBookmark, syncAllBookmarks } from '../libs/bookmark'
import { AuthStatus, Header } from '../types'
import { getAuthInfo, openNewTab } from '../libs/browser'
import { countRecords } from '../libs/db'
import { Text } from '../components/Tweet'
import Indicator from '../components/Indicator'
import Authenticate from './Authenticate'
import SupportUs from '../components/SupportUs'
import Search from './Search'

export const Options = () => {
  let listRef: HTMLDivElement
  const [store, setStore] = dataStore
  const query = async (keyword?: string) => {
    const start = new Date().getTime()
    const tweets = await searchBookmark(
      keyword || '',
      store.page,
      store.pageSize,
    )
    setStore('tweets', () => [...tweets])
    listRef.scrollTo(0, 0)
    setStore('searchTime', new Date().getTime() - start)
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

  onMount(async () => {
    try {
      const auth = await getAuthInfo()
      if (!auth || !auth.cookie) {
        throw new Error(AuthStatus.AUTH_FAILED)
      }

      setStore('totalCount', await countRecords())

      if (!auth.lastSynced) {
        setStore('isForceSyncing', true)
        /**
         * 全量同步时展示最新的 100 条数据
         * 后续更新只更新总数
         */
        for await (const docs of syncAllBookmarks(auth as Header, true)) {
          if (store.tweets.length > 0) {
            setStore('totalCount', (val) => val + docs.length)
          } else {
            setStore('tweets', () => [...docs])
          }
        }
        setStore('isForceSyncing', false)
      } else {
        /**
         * 增量更新时先展示最新的 100 条
         * 后续更新同时更新总数和展示数据
         */
        await query()
        setStore('isAutoSyncing', true)
        for await (const docs of syncAllBookmarks(auth as Header)) {
          setStore('totalCount', await countRecords())
          /**
           * 当前正在搜索时不更新数据
           */
          if (store.isAutoSyncing && store.keyword.trim()) {
            continue
          }
          await query()
        }
        setStore('isAutoSyncing', false)
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
      <div class="flex flex-col items-center h-screen">
        <div class="w-[42rem] mx-auto">
          <h1 class="font-large text-xl text-center my-4 bg-gradient-to-r from-blue-500 to-purple-500 bg-clip-text text-transparent font-semibold">
            Twillot - your social media copilot
          </h1>
          <div class="flex items-center justify-center w-full">
            <div class="flex w-full">
              <Search onSubmit={query} />
            </div>
          </div>
          <Show when={!!store.keyword.trim()}>
            <div class="mt-4 text-base text-gray-500 text-left w-full">
              Found {store.tweets.length} records in {store.searchTime} ms
            </div>
          </Show>
          <Show when={store.isAuthFailed}>
            <Authenticate />
          </Show>
          <Show when={store.isForceSyncing}>
            <Indicator
              text={`Sync in progress: ${store.totalCount} tweets. Please do not refresh or close this page.`}
            />
          </Show>
        </div>
        <Show when={store.isSupportUsVisible}>
          <SupportUs />
        </Show>
        <div
          class="my-4 flex-1 overflow-y-auto w-[42rem] mx-auto"
          onClick={openPage}
          ref={listRef!}
        >
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
