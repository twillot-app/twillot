import { A } from '@solidjs/router'
import { For, Show, createSignal } from 'solid-js'

import { IconFolderMove, IconTrash } from './Icons'
import { moveTweetsToFolder, removeFolder } from '../stores/folders'
import { FolderForm } from './FolderDropDown'
import dataStore from '../options/store'
import { upsertConfig } from 'utils/db/configs'
import { OptionName } from 'utils/types'

export default function AsideFolder() {
  const [store, setStore] = dataStore
  const [draggingIndex, setDraggingIndex] = createSignal<number | null>(null)
  const handleDragStart = (index: number) => {
    setDraggingIndex(index)
  }
  const handleDragOver = async (index: number, event: DragEvent) => {
    event.preventDefault()
    const draggingItemIndex = draggingIndex()
    if (draggingItemIndex === null || draggingItemIndex === index) return
    const newItems = [...store.folders]
    const draggedItem = newItems.splice(draggingItemIndex, 1)[0]
    newItems.splice(index, 0, draggedItem)
    setStore('folders', newItems)
    setDraggingIndex(index)
    await upsertConfig({
      option_name: OptionName.FOLDER,
      option_value: newItems.map((folder) => folder.name),
    })
  }
  const handleDragEnd = () => {
    setDraggingIndex(null)
  }

  return (
    <ul class="space-y-1 py-1 text-base">
      <For each={store.folders}>
        {(folder, index) => {
          return (
            <li
              draggable
              onDragStart={() => handleDragStart(index())}
              onDragOver={(event) => handleDragOver(index(), event)}
              onDragEnd={handleDragEnd}
              class="select-none"
            >
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
