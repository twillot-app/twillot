import { For, Show, createMemo } from 'solid-js'

import dataStore from '../options/store'
import { IconFolderMove } from './Icons'
import { moveToFolder } from '../options/handlers'

export default function FolderSelect(props) {
  const [store, setStore] = dataStore
  const tweet = props.tweet
  const isActionChangeFolder = createMemo(
    () => store.selectedTweet === tweet && store.action === 'changeFolder',
  )

  return (
    <>
      <Show when={store.folders.length}>
        <Show
          when={tweet.folder}
          fallback={
            <span
              class={`${isActionChangeFolder() ? 'hidden' : ''}`}
              onClick={() =>
                setStore({
                  selectedTweet: tweet,
                  action: 'changeFolder',
                })
              }
            >
              <IconFolderMove />
            </span>
          }
        >
          <span
            class={`me-2 rounded bg-green-100 px-2.5 py-0.5 text-xs font-medium text-green-800 dark:bg-green-900 dark:text-green-300 ${isActionChangeFolder() ? 'hidden' : ''}`}
            onClick={() =>
              setStore({
                selectedTweet: tweet,
                action: 'changeFolder',
              })
            }
          >
            {tweet.folder}
          </span>
        </Show>

        <Show when={isActionChangeFolder()}>
          <select
            class={` rounded-lg border border-gray-300 bg-gray-50 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500`}
            onchange={(e) => moveToFolder(e.target.value)}
          >
            <option value="">Choose a folder</option>
            <For each={store.folders}>
              {(folder) => (
                <option selected={folder === tweet.folder} value={folder}>
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
