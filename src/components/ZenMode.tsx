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
      <header class="mx-auto h-14 w-[60rem] pb-4">
        <Show when={tweet()} fallback={null}>
          Avatar
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
