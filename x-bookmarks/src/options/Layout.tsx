import { createEffect, For, onMount, Show } from 'solid-js'
import { Portal } from 'solid-js/web'
import { A, useSearchParams } from '@solidjs/router'
import debounce from 'lodash.debounce'

import { createStyleSheet } from 'utils/dom'
import dataStore from './store'
import Indicator from '../components/Indicator'
import Authenticate from './Authenticate'
import Search from './Search'
import {
  initSync,
  syncBookmarkChanges,
  queryByCondition,
  resetQuery,
  syncThreads,
} from './handlers'
import { Alert } from '../components/Alert'
import Notification from '../components/Notification'
import {
  IconBookmark,
  IconCrown,
  IconExport,
  IconFolderMove,
  IconFolders,
  IconMessage,
  IconMoon,
  IconSun,
  IconUp,
} from '../components/Icons'
import ZenMode from '../components/ZenMode'
import logo from '../../public/img/logo-128.png'
import { allCategories } from '../constants'
import { initFolders } from '../stores/folders'
import AsideFolder from '../components/AsideFolder'
import {
  getCurrentUserId,
  getLastSyncInfo,
  onLocalChanged,
  StorageKeys,
} from 'utils/storage'

export const Layout = (props) => {
  const [store, setStore] = dataStore
  const [searchParams] = useSearchParams()

  createEffect(() => {
    if (searchParams.q) {
      setStore('keyword', searchParams.q)
    }
  })

  createEffect(() => {
    queryByCondition()
  })

  createEffect(() => {
    const font = store.activeFont
    if (font) {
      createStyleSheet(font.url, 'active-font')
    }
  })

  createEffect(() => {
    const theme = store.theme
    if (theme) {
      document.documentElement.classList.replace(
        theme === 'light' ? 'dark' : 'light',
        theme,
      )
      localStorage.setItem('theme', theme)
    }
  })

  onMount(async () => {
    const handler = debounce((changes) => {
      if (StorageKeys.Tasks in changes) {
        syncBookmarkChanges()
      }
    }, 3000)
    onLocalChanged(handler)
    // 如果已经同步书签，则开始同步 threads
    const lastSync = await getLastSyncInfo()
    if (lastSync) {
      syncThreads()
    }

    if (!store.isSidePanel) {
      const user_id = await getCurrentUserId()
      if (!user_id) {
        setStore('isAuthFailed', true)
        return
      }

      await Promise.all([initSync(), initFolders()])
    }

    // 如果没有同步过书签，则开始首次同步 threads
    if (!lastSync) {
      syncThreads()
    }
  })

  return (
    <>
      <nav
        class={`text-gary-700 fixed top-0 z-50 w-full border-b border-gray-200 bg-white text-base text-gray-700 dark:border-gray-700 dark:bg-[#121212] dark:text-white ${store.selectedTweet > -1 ? 'hidden' : ''}`}
      >
        <div class="px-3 py-3 lg:px-5 lg:pl-3">
          <div class="flex items-center justify-between">
            <div class="flex w-full flex-col items-center justify-start space-y-4  lg:w-auto lg:flex-row lg:space-y-0 rtl:justify-end">
              <a
                href="https://twillot.com?utm_source=extension"
                target="_blank"
                class="ms-2 flex w-60"
              >
                <img src={logo} class="me-3 h-8" />
                <span class="flex-1 self-center whitespace-nowrap text-xl font-semibold">
                  Twillot
                </span>
              </a>
              <div class="flex w-full lg:w-[500px]">
                <Search />
              </div>
            </div>
            <div class="fixed right-4 top-4 items-center lg:static lg:flex">
              <div class="ms-3 flex items-center gap-4">
                <button
                  class="cursor-pointer"
                  onClick={() =>
                    setStore(
                      'theme',
                      store.theme === 'light' ? 'dark' : 'light',
                    )
                  }
                >
                  <Show when={store.theme === 'light'} fallback={<IconMoon />}>
                    <IconSun />
                  </Show>
                </button>
                <a
                  href="https://s.twillot.com/chat-with-twillot"
                  target="_blank"
                >
                  <IconMessage />
                </a>
              </div>
            </div>
          </div>
        </div>
      </nav>

      <Show when={!store.isSidePanel}>
        <aside
          class={`fixed left-0 top-0 z-40 h-screen w-64 -translate-x-full border-r border-gray-200 bg-white pt-20 text-lg text-gray-700 transition-transform sm:translate-x-0 dark:border-gray-700 dark:bg-[#121212] dark:text-white ${store.selectedTweet > -1 ? 'hidden' : ''}`}
        >
          <div class="h-full overflow-y-auto px-3 pb-4 ">
            <ul class="space-y-1 font-medium">
              <li>
                <A
                  href="/"
                  class="flex w-full items-center rounded-lg p-2  transition duration-75 hover:bg-gray-100  dark:hover:bg-gray-700"
                  onClick={resetQuery}
                >
                  <IconBookmark />
                  <span class="ms-3 flex-1 whitespace-nowrap text-left rtl:text-right">
                    Bookmarks
                  </span>
                  <span class="ms-3 inline-flex items-center justify-center rounded-full text-xs opacity-60">
                    <Show when={store.totalCount}>
                      {store.totalCount.total}
                    </Show>
                  </span>
                </A>
                <ul class="space-y-1 py-1 text-base">
                  <For each={allCategories}>
                    {(category) => {
                      return (
                        <li class="cursor-pointer">
                          <A
                            href="/"
                            class={`flex w-full items-center rounded-lg p-1 pl-11 transition duration-75  ${category.value === store.category ? 'text-blue-500' : ''}`}
                            onClick={() => setStore('category', category.value)}
                          >
                            {category.name}
                            <span class="mr-1 flex-1 items-center rounded-full text-right text-xs opacity-60">
                              <Show when={store.totalCount}>
                                {
                                  store.totalCount[
                                    category.value.replace(/has_|is_/, '')
                                  ]
                                }
                              </Show>
                            </span>
                          </A>
                        </li>
                      )
                    }}
                  </For>
                </ul>
              </li>
              <li>
                <div class="flex items-center rounded-lg p-2 hover:bg-gray-100  dark:hover:bg-gray-700">
                  <IconFolders />
                  <span class="ms-3 flex-1 whitespace-nowrap">Folders</span>
                </div>
                <Show when={store.totalCount}>
                  <div class="text-base">
                    <A
                      href="/"
                      class={`${'Unsorted' === store.folder ? 'text-blue-500 ' : ''} flex w-full items-center rounded-lg p-1 pl-11 transition duration-75`}
                      onClick={() => setStore('folder', 'Unsorted')}
                    >
                      Unsorted
                      <div class="ml-4 hidden flex-1 items-center justify-end gap-2">
                        <Show when={store.keyword}>
                          <span class="cursor-pointer">
                            <IconFolderMove />
                          </span>
                        </Show>
                      </div>
                      <span class="mr-1 flex-1 items-center text-right text-xs font-medium opacity-60">
                        {store.totalCount.unsorted}
                      </span>
                    </A>
                  </div>
                </Show>
                <AsideFolder />
              </li>
              <li>
                <a
                  class="cursor-d flex items-center rounded-lg p-2  hover:bg-gray-100 dark:hover:bg-gray-700"
                  href="/export"
                >
                  <IconExport />
                  <span class="ms-3 flex-1 whitespace-nowrap">Export</span>
                  <span class="ms-3 inline-flex scale-75 items-center justify-center rounded-full text-xs text-gray-500 opacity-60">
                    <IconCrown />
                  </span>
                </a>
              </li>
            </ul>
          </div>
        </aside>
      </Show>

      <main class="bg-white text-gray-700 lg:ml-72 dark:bg-[#121212] dark:text-white">
        <div
          class={`flex-col items-center pt-28 lg:pt-[64px] ${store.selectedTweet > -1 ? 'hidden' : ''}`}
        >
          <div class="mx-auto hidden lg:block lg:w-[48rem]">
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
                        If this problem persists, join our
                        <a
                          href="https://x.com/i/communities/1796857620672008306"
                          target="_blank"
                          class="text-blue-500 underline"
                        >
                          &nbsp;community&nbsp;
                        </a>
                        to get help from developers.
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
                    Sync in progress: {store.totalCount.total} tweets.
                  </div>
                }
              />
            </Show>
          </div>

          {props.children}
        </div>
        <Portal>
          <ZenMode />
          <Notification />
          <button
            class="fixed bottom-10 right-10 z-50 h-14 w-14 rounded-full border-0 bg-purple-500 p-4 text-lg font-semibold text-white opacity-40 shadow-md transition-colors duration-300 hover:bg-purple-700 hover:opacity-100"
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          >
            <IconUp />
          </button>
        </Portal>
      </main>
    </>
  )
}

export default Layout
