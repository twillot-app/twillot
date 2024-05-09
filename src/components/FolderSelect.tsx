import { For, Show, createMemo, createSignal } from 'solid-js'

import dataStore from '../options/store'
import { IconFolderMove } from './Icons'
import { moveToFolder } from '../options/handlers'

export default function FolderSelect(props) {
  const [store] = dataStore
  const [isSelectVisible, setIsSelectVisible] = createSignal(false)
  const tweet = createMemo(() =>
    typeof props.tweet === 'function' ? props.tweet() : props.tweet,
  )

  return (
    <>
      <Show when={store.folders.length}>
        <Show
          when={tweet().folder}
          fallback={
            <span
              class={`${isSelectVisible() ? 'hidden' : ''}`}
              onClick={() => setIsSelectVisible(true)}
            >
              <IconFolderMove />
            </span>
          }
        >
          <span
            class={`me-2 rounded bg-green-100 px-2.5 py-0.5 text-xs font-medium text-green-800 dark:bg-green-900 dark:text-green-300 ${isSelectVisible() ? 'hidden' : ''}`}
            onClick={() => setIsSelectVisible(true)}
          >
            {tweet().folder}
          </span>
        </Show>

        <Show when={isSelectVisible()}>
          <select
            class={` rounded-lg border border-gray-300 bg-gray-50 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500`}
            onchange={async (e) => {
              await moveToFolder(e.target.value, tweet())
              setIsSelectVisible(false)
            }}
          >
            <option value="">Choose a folder</option>
            <For each={store.folders}>
              {(folder) => (
                <option selected={folder === tweet().folder} value={folder}>
                  {folder}
                </option>
              )}
            </For>
          </select>
        </Show>
      </Show>
    </>
  )
}
