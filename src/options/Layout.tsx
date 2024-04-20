import { createEffect, onMount, Show } from 'solid-js'

import dataStore from './store'
import Indicator from '../components/Indicator'
import Authenticate from './Authenticate'
import Search from './Search'
import Tabs from './Tabs'
import { useSearchParams } from '@solidjs/router'
import { initSync, query } from './handlers'
import { Alert } from '../components/Alert'

export const Layout = (props) => {
  const [searchParams] = useSearchParams()
  const [store, setStore] = dataStore

  createEffect(() => {
    if (searchParams.q) {
      setStore('keyword', searchParams.q)
    }
  })

  createEffect(() => {
    query(store.keyword)
  })
  onMount(() => {
    initSync(searchParams.q)
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
          <Show when={store.isForceSyncTimedout}>
            <Alert
              message={
                <>
                  <span class="font-medium">
                    Sync timed out, but that's not a big problem:
                  </span>
                  <ul class="mt-1.5 list-disc list-inside">
                    <li>All your synced tweets are available from now on.</li>
                    <li>
                      Refresh this page to continue syncing from where it last
                      failed.
                    </li>
                    <li>
                      Contact the{' '}
                      <a
                        href="https://twitter.com/SiZapPaaiGwat"
                        target="_blank"
                        class="text-blue-500 underline"
                      >
                        maker
                      </a>{' '}
                      of Twillot if the problem persists.
                    </li>
                  </ul>
                </>
              }
              type="error"
            />
          </Show>
          <Show when={store.isForceSyncing}>
            <Indicator
              text={
                <div class="text-center">
                  Sync in progress: {store.totalCount} tweets.
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
