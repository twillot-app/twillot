import { createEffect, onMount, Show } from 'solid-js'

import dataStore from './store'
import Indicator from '../components/Indicator'
import Authenticate from './Authenticate'
import Search from './Search'
import Tabs from './Tabs'
import { useSearchParams } from '@solidjs/router'
import {
  initFolders,
  initHistory,
  initSync,
  queryByCondition,
} from './handlers'
import { Alert } from '../components/Alert'
import Notification from '../components/Notification'

export const Layout = (props) => {
  const [searchParams] = useSearchParams()
  const [store, setStore] = dataStore

  createEffect(() => {
    if (searchParams.q) {
      setStore('keyword', searchParams.q)
    }
  })

  createEffect(() => {
    queryByCondition()
  })

  onMount(() => {
    initHistory()
    initSync(searchParams.q)
    initFolders()
  })

  return (
    <main class="overflow-y-auto bg-white text-black dark:bg-black dark:text-white">
      <Tabs />
      <div class="fixed left-1/2 top-0 z-30 -ml-[24rem] w-[48rem] bg-white dark:bg-black">
        <h1 class="font-large my-4 bg-gradient-to-r from-blue-500 to-purple-500 bg-clip-text text-center text-xl font-semibold text-transparent">
          Twillot - your social media copilot
        </h1>
        <div class="flex w-full items-center justify-center">
          <div class="flex w-full">
            <Search />
          </div>
        </div>
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
                <ul class="mt-1.5 list-inside list-disc">
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
      <div class="flex h-screen flex-col items-center pt-[102px]">
        {props.children}
      </div>
      <Notification />
    </main>
  )
}

export default Layout
