import { createEffect, createSignal, For, onMount } from 'solid-js'

import dataStore, { mutateStore } from '../options/store'
import { upsertConfig } from '../libs/db/configs'
import { OptionName, OptionStoreField } from '../types'
import {
  defaultCommentTemplateName,
  defaultSignatureTemplateName,
} from '../libs/workflow/defaults'
import { getLicense, isFreeLicense } from '../libs/license'

const [store, setStore] = dataStore

const PanelSettings = (props: {
  option_key: string
  title: string
  placeholder: string
}) => {
  const [newContent, setNewContent] = createSignal('')
  const [editingIndex, setEditingIndex] = createSignal(-1)
  const [editingName, setEditingName] = createSignal('')
  const [editingContent, setEditingContent] = createSignal('')

  createEffect(async () => {
    const option_name = OptionName[props.option_key]
    const templates = store[OptionStoreField[props.option_key]].map((t) => ({
      ...t,
    }))
    await upsertConfig({
      option_name,
      option_value: templates,
    })
  })

  const addTemplate = async (e) => {
    e.preventDefault()
    const profile = await getLicense()
    if (isFreeLicense(profile)) {
      alert('You need a license to add templates.')
      return
    }
    const content = newContent()
    const items = store[OptionStoreField[props.option_key]]
    if (!content || items.some((t) => t.content === content)) {
      return
    }

    const newTemplate = {
      id: new Date().getTime().toString(16),
      name: `Untitled ${items.length + 1}`,
      content,
      createdAt: Math.floor(new Date().getTime() / 1000),
    }
    setStore(OptionStoreField[props.option_key], [newTemplate, ...items])
    setNewContent('')
    setEditingIndex(-1)
  }

  const saveEdit = async (index: number) => {
    const profile = await getLicense()
    if (isFreeLicense(profile)) {
      alert('You need a license to edit templates.')
      return
    }

    const content = editingContent()
    const key = OptionStoreField[props.option_key]
    const items = store[key]
    if (
      !content ||
      items.some((t, i) => t.content === content && i !== index)
    ) {
      return
    }
    setStore(key, index, 'name', editingName())
    setStore(key, index, 'content', content)
    setEditingIndex(-1)
  }

  return (
    <div class="mb-8 rounded-md border border-gray-200 p-4 dark:border-gray-700">
      <div class="w-full border-b pb-4 pt-2 text-lg font-bold text-gray-900 outline-none dark:border-gray-600  dark:border-b-[#121212]  dark:bg-[#121212] dark:text-white">
        {props.title}
      </div>

      <div class="relative overflow-x-auto sm:rounded-lg">
        <form onSubmit={addTemplate}>
          <div class="relative my-4 flex items-center gap-4">
            <textarea
              rows={3}
              name="template_content"
              class="block w-1/2 rounded-lg border border-gray-300 bg-gray-50 px-4 py-2 text-gray-900  outline-none focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
              placeholder={props.placeholder}
              value={newContent()}
              onInput={(e) => setNewContent(e.target.value)}
            />
            <button
              type="submit"
              class="me-2 rounded-lg bg-blue-700 px-5 py-2.5 text-sm font-medium text-white hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            >
              Add
            </button>
          </div>
        </form>
        <table class="w-full text-left text-gray-500 dark:text-gray-400 rtl:text-right">
          <thead class="bg-gray-50 text-gray-700 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" class="w-1/6 px-6 py-3">
                Name
              </th>
              <th scope="col" class="w-3/6 px-6 py-3">
                Content
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
            <For
              each={store[OptionStoreField[props.option_key]]}
              fallback={
                <tr>
                  <td colSpan={4} class="p-8 text-center">
                    No templates found
                  </td>
                </tr>
              }
            >
              {(template, index) => (
                <tr class="border-b bg-white last:border-b-0 hover:bg-gray-50 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-600">
                  <th
                    scope="row"
                    class="whitespace-nowrap px-6 py-4 text-sm font-medium text-gray-900 dark:text-white"
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
                  <td class="whitespace-pre-wrap px-6 py-4 text-xs">
                    {editingIndex() === index() ? (
                      <textarea
                        value={editingContent()}
                        onInput={(e) => setEditingContent(e.target.value)}
                        rows={3}
                        class="w-full rounded-lg border border-gray-300 bg-gray-50 px-4 py-2 pl-2 text-gray-900 outline-none dark:border-gray-600 dark:bg-gray-700 dark:text-white"
                      />
                    ) : (
                      template.content
                    )}
                  </td>
                  <td class="px-6 py-4 text-xs">
                    {new Date(template.createdAt * 1000).toLocaleString()}
                  </td>
                  <td class={`px-6 py-4 text-sm`}>
                    <div
                      class={`${template.name === defaultCommentTemplateName || template.name === defaultSignatureTemplateName ? 'hidden' : ''}`}
                    >
                      {editingIndex() === index() ? (
                        <>
                          <button
                            class="font-medium text-blue-600 hover:underline dark:text-blue-500"
                            onClick={() => saveEdit(index())}
                          >
                            Save
                          </button>
                          <button
                            class="ml-4 font-medium text-gray-600 hover:underline dark:text-white"
                            onClick={() => setEditingIndex(-1)}
                          >
                            Cancel
                          </button>
                        </>
                      ) : (
                        <>
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
                          <button
                            class="ml-4 font-medium text-red-600 hover:underline dark:text-red-500"
                            onClick={() => {
                              mutateStore((state) => {
                                state[
                                  OptionStoreField[props.option_key]
                                ].splice(index(), 1)
                              })
                            }}
                          >
                            Remove
                          </button>
                        </>
                      )}
                    </div>
                  </td>
                </tr>
              )}
            </For>
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default PanelSettings
