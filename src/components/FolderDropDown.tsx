import { For, Show, createSignal } from 'solid-js'
import { A } from '@solidjs/router'

import { IconFolder, IconFolderMove } from './Icons'
import dataStore from '../options/store'
import { upsertConfig } from '../libs/db/configs'
import { OptionName } from '../types'
import { addRecords } from '../libs/db'
import { unwrap } from 'solid-js/store'
import useClickOutside from '../hooks/useClickOutside'

export default function FolderDropDown() {
  const [store, setStore] = dataStore
  const [expanded, setExpanded] = createSignal(false)
  const [dropdownRef, setDropdownRef] = createSignal(null)
  const addFolder = async (e) => {
    e.preventDefault()
    const folderName = e.target.folder.value.trim()
    if (folderName && store.folders.includes(folderName) === false) {
      const newFolders = [...store.folders, folderName]
      setStore('folders', newFolders)
      e.target.folder.value = ''
      await upsertConfig({
        option_name: OptionName.FOLDER,
        option_value: newFolders,
      })
    }
  }
  const moveToFolder = async (folder: string) => {
    try {
      // TODO 确认是否移动，可能误操作
      let tweets = unwrap(store.tweets).map((tweet) => ({ ...tweet, folder }))
      await addRecords(tweets)
    } catch (error) {
      console.error(error)
    }
  }

  useClickOutside(dropdownRef, () => setExpanded(false))

  return (
    <div ref={setDropdownRef}>
      <span class="cursor-pointer" onClick={() => setExpanded(true)}>
        <IconFolder />
      </span>
      <div
        class={`absolute right-1 z-10 w-44 divide-y divide-gray-100 rounded-lg bg-white shadow dark:divide-gray-600 dark:bg-gray-700 ${expanded() ? 'block' : 'hidden'}`}
      >
        <Show when={store.folders.length}>
          <ul class="py-2 text-sm text-gray-700 dark:text-gray-200">
            <For each={store.folders}>
              {(folder) => (
                <li class="flex items-center gap-1 pl-4 pr-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">
                  <A
                    href={`/?q=folder:${folder}`}
                    class="block flex-1 py-2"
                    onClick={() => setExpanded(false)}
                  >
                    {folder}
                  </A>
                  <Show when={store.keyword && store.tweets.length}>
                    <span
                      title={`Move to folder ${folder}`}
                      onClick={() => moveToFolder(folder)}
                      class="cursor-pointer"
                    >
                      <IconFolderMove />
                    </span>
                  </Show>
                </li>
              )}
            </For>
          </ul>
        </Show>
        <div class="flex p-2 text-sm">
          <form class="flex items-center" onSubmit={addFolder}>
            <input
              type="text"
              name="folder"
              class="block w-full rounded-lg border border-gray-300 bg-gray-50 px-2 py-1 text-gray-900 outline-none focus:border-blue-500 focus:ring-blue-500 dark:border-gray-500 dark:bg-gray-600 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
              placeholder="Add new folder"
            />
          </form>
        </div>
      </div>
    </div>
  )
}
