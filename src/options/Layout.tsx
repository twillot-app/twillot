import { createEffect, onMount, Show } from 'solid-js'

import dataStore from './store'
import { searchBookmark, syncAllBookmarks } from '../libs/bookmark'
import { AuthStatus, Header } from '../types'
import { getAuthInfo } from '../libs/browser'
import { countRecords, getTopUsers } from '../libs/db'
import Indicator from '../components/Indicator'
import Authenticate from './Authenticate'
import Search from './Search'
import Tabs from './Tabs'
import { useSearchParams } from '@solidjs/router'
import { parseTwitterQuery } from '../libs/query-parser'

export const Layout = (props) => {
  const [searchParams] = useSearchParams()
  const [store, setStore] = dataStore
  const query = async () => {
    const q = parseTwitterQuery(store.keyword) as any
    const start = new Date().getTime()
    const tweets = await searchBookmark(
      q.fromUser ? q : store.keyword || '',
      store.page,
      store.pageSize,
    )
    setStore('tweets', () => [...tweets])
    setStore('searchTime', new Date().getTime() - start)
  }

  createEffect(async () => {
    if (searchParams.q) {
      setStore('keyword', searchParams.q)
    }
    await query()
  })

  onMount(async () => {
    try {
      /**
       * 可能之前已经同步过数据，先获取试试
       */
      const topUsers = await getTopUsers(10)
      setStore('topUsers', topUsers)
      setStore('totalCount', await countRecords())

      const auth = await getAuthInfo()
      if (!auth || !auth.cookie) {
        throw new Error(AuthStatus.AUTH_FAILED)
      }

      if (!auth.lastSynced) {
        setStore('isForceSyncing', true)
        /**
         * 全量同步时展示最新的 100 条数据
         * 后续更新只更新总数
         */
        for await (const docs of syncAllBookmarks(auth as Header, true)) {
          /**
           * 已经有最新的数据展示，不对数据进行操作
           */
          if (store.tweets.length > 0) {
            setStore('totalCount', (val) => val + docs.length)
          } else {
            setStore('tweets', () => [...docs])
          }
        }
        setStore('isForceSyncing', false)
        const topUsers = await getTopUsers(10)
        setStore('topUsers', topUsers)
      } else {
        setStore('syncTime', auth.lastSynced)
        /**
         * 增量更新时先展示最新的 100 条
         * 后续更新同时更新总数和展示数据
         */
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
      setStore('topUsers', await getTopUsers(10))
    } catch (err) {
      console.error(err)
      if (err.message == AuthStatus.AUTH_FAILED) {
        setStore('isAuthFailed', true)
      }
    }
  })

  return (
    <main class="bg-white dark:bg-black text-black dark:text-white">
      <div class="flex flex-col items-center h-screen">
        <div class="w-[42rem] mx-auto">
          <h1 class="font-large text-xl text-center my-4 bg-gradient-to-r from-blue-500 to-purple-500 bg-clip-text text-transparent font-semibold">
            Twillot - your social media copilot
          </h1>
          <div class="flex items-center justify-center w-full">
            <div class="flex w-full">
              <Search />
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
              text={
                <div class="text-center">
                  Sync in progress: {store.totalCount} tweets. <br /> Please do
                  not refresh or close this page.
                </div>
              }
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
