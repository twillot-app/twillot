import { A } from '@solidjs/router'
import { For } from 'solid-js'

import dataStore from './store'
import { FolderForm } from '../components/FolderDropDown'

export default function Folders() {
  const [store] = dataStore

  return (
    <div class="relative mt-4 w-[48rem] overflow-x-auto text-base">
      <table class="w-full text-left  text-gray-500 rtl:text-right dark:text-gray-400">
        <caption class="bg-white p-5 text-left text-lg font-semibold text-gray-900 rtl:text-right dark:bg-gray-800 dark:text-white">
          Folders
          <p class="mt-1 font-normal text-gray-500 dark:text-gray-400">
            Add folders to organize your bookmarks.
          </p>
          <div class="mt-2 w-1/3 bg-white font-normal dark:bg-gray-900">
            <FolderForm />
          </div>
        </caption>
        <thead class="bg-gray-50  text-gray-700 dark:bg-gray-700 dark:text-gray-400">
          <tr>
            <th scope="col" class="px-6 py-3">
              Folder name
            </th>
            <th scope="col" class="px-6 py-3">
              Bookmarks
            </th>
            <th scope="col" class="px-6 py-3">
              <span class="sr-only">Operation</span>
            </th>
          </tr>
        </thead>
        <tbody>
          <For each={store.folders}>
            {(folder) => (
              <tr class="border-b bg-white dark:border-gray-700 dark:bg-gray-800">
                <th
                  scope="row"
                  class="whitespace-nowrap px-6 py-4 font-medium text-gray-900 dark:text-white"
                >
                  <div class="flex items-center gap-4">
                    <span>{folder}</span>
                  </div>
                </th>
                <td class="px-6 py-4">
                  <A
                    href={`/?q=folder:${folder}`}
                    class="mr-4 cursor-pointer font-medium text-blue-600 hover:underline dark:text-blue-500"
                  >
                    {store.folderInfo[folder] || 0}
                  </A>
                </td>
                <td class="px-6 py-4 text-right">
                  <span class="cursor-pointer font-medium text-red-600 hover:underline dark:text-red-500">
                    Delete
                  </span>
                </td>
              </tr>
            )}
          </For>
        </tbody>
      </table>
    </div>
  )
}
