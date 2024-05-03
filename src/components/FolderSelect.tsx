import { For, Show } from 'solid-js'
import { unwrap } from 'solid-js/store'

import dataStore from '../options/store'
import { IconFolderMove } from './Icons'
import { addRecords } from '../libs/db'

export default function FolderSelect(props) {
  const [store, setStore] = dataStore
  const tweet = props.tweet

  return (
    <>
      <Show when={store.folders.length}>
        <Show
          when={tweet.folder}
          fallback={
            <span
              class={`${store.selectedTweet === tweet && store.action === 'changeFolder' ? 'hidden' : ''}`}
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
            class={`me-2 rounded bg-green-100 px-2.5 py-0.5 text-xs font-medium text-green-800 dark:bg-green-900 dark:text-green-300 ${store.selectedTweet === tweet && store.action === 'changeFolder' ? 'hidden' : ''}`}
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
      </Show>

      <Show
        when={
          store.folders.length &&
          store.selectedTweet === tweet &&
          store.action === 'changeFolder'
        }
      >
        <select
          class={` rounded-lg border border-gray-300 bg-gray-50 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500`}
          onchange={async (e) => {
            const folder = e.target.value
            const tweet = unwrap(store.selectedTweet)
            tweet.folder = folder
            await addRecords([tweet])
            const newTweets = store.tweets.map((t) =>
              t.tweet_id === tweet.tweet_id ? { ...t, folder } : t,
            )
            setStore({
              tweets: newTweets,
              selectedTweet: null,
              action: '',
            })
          }}
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
    </>
  )
}
