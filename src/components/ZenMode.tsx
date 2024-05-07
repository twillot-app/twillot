import { Content } from './Tweet'
import dataStore from '../options/store'
import { Show, createMemo } from 'solid-js'
import { Host } from '../types'
import FolderSelect from './FolderSelect'
import { A } from '@solidjs/router'

export default function ZenMode() {
  const [store] = dataStore
  const tweet = createMemo(() => store.tweets[0])
  return (
    <div class="fixed inset-0 z-40 flex flex-col bg-white dark:bg-gray-800">
      <header class="h-23 mx-auto w-[60rem] pb-4">
        <Show when={tweet()} fallback={null}>
          <address class="flex items-center not-italic">
            <div class="mr-3 inline-flex items-center text-sm text-gray-900 dark:text-white">
              <img
                class="mr-4 h-16 w-16 rounded-full"
                src="https://flowbite.com/docs/images/people/profile-picture-2.jpg"
                alt="Jese Leos"
              />
              <div>
                <a
                  href="#"
                  rel="author"
                  class="text-xl font-bold text-gray-900 dark:text-white"
                >
                  Jese Leos
                </a>
                <p class="text-base text-gray-500 dark:text-gray-400">
                  Graphic Designer, educator &amp; CEO Flowbite
                </p>
                <p class="text-base text-gray-500 dark:text-gray-400">
                  <time datetime="2022-02-08" title="February 8th, 2022">
                    Feb. 8, 2022
                  </time>
                </p>
              </div>
            </div>
          </address>
        </Show>
      </header>
      <div class="-my-14 flex-1 overflow-auto py-14">
        <article class="mx-auto w-[40rem] px-2">
          <Show when={tweet()}>
            <Content tweet={tweet()}></Content>
          </Show>
        </article>
      </div>
      <footer class="mx-auto h-14 w-[60rem] pt-4">
        <h1>Footer</h1>
      </footer>
    </div>
  )
}
