import { onMount, Show } from 'solid-js'

import dataStore from './store'
import { searchBookmark, syncAllBookmarks } from '../libs/bookmark'
import { AuthStatus, Header } from '../types'
import { getAuthInfo } from '../libs/browser'
import { countRecords } from '../libs/db'
import Indicator from '../components/Indicator'
import Authenticate from './Authenticate'
import Search from './Search'
import Tabs from './Tabs'
import { useNavigate } from '@solidjs/router'

export const Layout = (props) => {
  const navigate = useNavigate()
  const [store, setStore] = dataStore
  const query = async (keyword = '', isTriggeredByUser = false) => {
    const start = new Date().getTime()
    const tweets = await searchBookmark(
      keyword || '',
      store.page,
      store.pageSize,
    )
    setStore('tweets', () => [...tweets])
    setStore('searchTime', new Date().getTime() - start)
    if (isTriggeredByUser) {
      navigate('/')
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
        setStore('syncTime', auth.lastSynced)
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

        <Tabs />

        {props.children}
      </div>
    </main>
  )
}

export default Layout
