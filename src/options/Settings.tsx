import { createEffect, createSignal } from 'solid-js'
import { For, onMount } from 'solid-js'
import dataStore, { mutateStore } from './store'
import { upsertConfig } from '../libs/db/configs'
import { OptionName } from '../types'
import { getTemplates } from '../libs/workflow/store'

const [store, setStore] = dataStore

const Settings = () => {
  const [newContent, setNewContent] = createSignal('')
  const [editingIndex, setEditingIndex] = createSignal(-1)
  const [editingName, setEditingName] = createSignal('')
  const [editingContent, setEditingContent] = createSignal('')

  onMount(async () => {
    await getTemplates()
  })

  createEffect(async () => {
    const templates = store.templates.map((t) => ({ ...t }))
    if (templates.length) {
      await upsertConfig({
        option_name: OptionName.COMMENT_TEMPLATE,
        option_value: templates,
      })
    }
  })

  const addTemplate = (e) => {
    e.preventDefault()
    const content = newContent().trim()
    if (!content || store.templates.some((t) => t.content === content)) {
      return
    }
    const newTemplate = {
      id: new Date().getTime().toString(16),
      name: `Untitled ${store.templates.length + 1}`,
      content,
      createdAt: Math.floor(new Date().getTime() / 1000),
    }
    setStore('templates', [newTemplate, ...store.templates])
    setNewContent('')
    setEditingIndex(-1)
  }

  const saveEdit = (index: number) => {
    const content = editingContent().trim()
    if (
      !content ||
      store.templates.some((t, i) => t.content === content && i !== index)
    ) {
      return
    }
    setStore('templates', index, 'name', editingName())
    setStore('templates', index, 'content', content)
    setEditingIndex(-1)
  }

  return (
    <div class="container mx-auto p-4 text-base">
      <div class="flex items-center gap-8">
        <h1 class="mb-4 flex-1 text-2xl font-bold">Workflows / Settings</h1>
      </div>

      <div class="mb-4 rounded-md border border-gray-200 p-4 dark:border-gray-700">
        <div class="w-full border-b pb-4 pt-2 text-lg font-bold text-gray-900 outline-none dark:border-gray-600  dark:border-b-[#121212]  dark:bg-[#121212] dark:text-white">
          Auto Comment Template
        </div>

        <div class="relative overflow-x-auto sm:rounded-lg">
          <form onSubmit={addTemplate}>
            <div class="relative my-4">
              <input
                type="text"
                name="template_content"
                class="block w-80 rounded-lg border border-gray-300 bg-gray-50 py-2 pl-4 text-gray-900  outline-none focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
                placeholder="Add a template"
                value={newContent()}
                onInput={(e) => setNewContent(e.target.value)}
              />
            </div>
          </form>
          <table class="w-full text-left text-gray-500 dark:text-gray-400 rtl:text-right">
            <thead class="bg-gray-50 text-gray-700 dark:bg-gray-700 dark:text-gray-400">
              <tr>
                <th scope="col" class="w-1/6 px-6 py-3">
                  Template Name
                </th>
                <th scope="col" class="w-3/6 px-6 py-3">
                  Template Content
                </th>
                <th scope="col" class="w-1/6 px-6 py-3">
                  Created At
                </th>
                <th scope="col" class="w-1/6 px-6 py-3">
                  Action
                </th>
              </tr>
            </thead>
            <tbody>
              <For each={store.templates}>
                {(template, index) => (
                  <tr class="border-b bg-white last:border-b-0 hover:bg-gray-50 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-600">
                    <th
                      scope="row"
                      class="whitespace-nowrap px-6 py-4 font-medium text-gray-900 dark:text-white"
                    >
                      {editingIndex() === index() ? (
                        <input
                          type="text"
                          value={editingName()}
                          onInput={(e) => setEditingName(e.target.value)}
                          class="rounded-lg border border-gray-300 bg-gray-50 px-4 py-2 text-gray-900 outline-none dark:border-gray-600 dark:bg-gray-700 dark:text-white"
                        />
                      ) : (
                        template.name
                      )}
                    </th>
                    <td class="px-6 py-4">
                      {editingIndex() === index() ? (
                        <textarea
                          value={editingContent()}
                          onInput={(e) => setEditingContent(e.target.value)}
                          rows={3}
                          class="w-full rounded-lg border border-gray-300 bg-gray-50 px-4 py-1 py-2 pl-2 text-gray-900 outline-none dark:border-gray-600 dark:bg-gray-700 dark:text-white"
                        />
                      ) : (
                        template.content
                      )}
                    </td>
                    <td class="px-6 py-4">
                      {new Date(template.createdAt * 1000).toLocaleString()}
                    </td>
                    <td class="px-6 py-4">
                      {editingIndex() === index() ? (
                        <button
                          class="font-medium text-blue-600 hover:underline dark:text-blue-500"
                          onClick={() => saveEdit(index())}
                        >
                          Save
                        </button>
                      ) : (
                        <button
                          class="font-medium text-blue-600 hover:underline dark:text-blue-500"
                          onClick={() => {
                            setEditingIndex(index())
                            setEditingName(template.name)
                            setEditingContent(template.content)
                          }}
                        >
                          Edit
                        </button>
                      )}
                      <button
                        class="ml-8 font-medium text-red-600 hover:underline dark:text-red-500"
                        onClick={() => {
                          mutateStore((state) => {
                            state.templates.splice(index(), 1)
                          })
                        }}
                      >
                        Remove
                      </button>
                    </td>
                  </tr>
                )}
              </For>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

export default Settings
