import { A } from '@solidjs/router'
import { For, Show, onCleanup, onMount } from 'solid-js'

import { IconFolderMove, IconTrash } from './Icons'
import { moveTweetsToFolder, removeFolder } from '../stores/folders'
import { FolderForm } from './FolderDropDown'
import dataStore, { mutateStore } from '../options/store'
import { upsertConfig } from '../libs/db/configs'
import { OptionName } from '../types'

export default function AsideFolder() {
  const [store, setStore] = dataStore
  let sortableContainer

  return (
    <ul class="space-y-1 py-1 text-base" ref={sortableContainer}>
      <For each={store.folders}>
        {(folder) => {
          return (
            <li>
              <A
                href="/"
                class={`${folder.name === store.folder ? 'text-blue-500 ' : ''} group flex w-full items-center rounded-lg p-1 pl-11 transition duration-75`}
                onClick={() => setStore('folder', folder.name)}
              >
                {folder.name}
                <div class="ml-4 hidden flex-1 items-center justify-end gap-2 group-hover:flex">
                  <Show when={store.keyword}>
                    <span
                      class="cursor-pointer"
                      onClick={(e) => {
                        e.stopPropagation()
                        moveTweetsToFolder(folder.name)
                      }}
                    >
                      <IconFolderMove />
                    </span>
                  </Show>
                  <span
                    class="cursor-pointer"
                    onClick={(e) => {
                      e.stopPropagation()
                      removeFolder(folder.name)
                    }}
                  >
                    <IconTrash />
                  </span>
                </div>
                <span class="mr-1 flex-1 items-center text-right text-xs font-medium opacity-60 group-hover:hidden">
                  {folder.count}
                </span>
              </A>
            </li>
          )
        }}
      </For>
      <li>
        <div class="flex w-full items-center rounded-lg p-1 pl-11 transition duration-75">
          <FolderForm />
        </div>
      </li>
    </ul>
  )
}
