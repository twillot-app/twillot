import { useNavigate } from '@solidjs/router'
import { createEffect, createMemo, createSignal, For } from 'solid-js'

import dataStore from './store'

const allCategories = [
  {
    name: 'All',
    value: '',
  },
  {
    name: 'Image',
    value: 'has_image',
  },
  {
    name: 'Video',
    value: 'has_video',
  },
  {
    name: 'Gif',
    value: 'has_gif',
  },
  {
    name: 'Link',
    value: 'has_link',
  },
  {
    name: 'Quote',
    value: 'is_quote',
  },
  {
    name: 'Article',
    value: 'is_long_text',
  },
]

export default function Search() {
  const [isMenuVisible, setIsMenuVisible] = createSignal(false)
  const [store, setStore] = dataStore
  const navigate = useNavigate()
  const placeholder = createMemo(() => `Search ${store.totalCount} tweets`)
  const category = createMemo(() =>
    allCategories.find((c) => c.value === store.category),
  )
  const categories = createMemo(() =>
    allCategories.filter((c) => c.value !== store.category),
  )
  const onSubmit = async (e) => {
    try {
      e.preventDefault()
      const keyword = e.target.keyword.value.trim()
      setStore('keyword', keyword)
      navigate('/')
    } catch (err) {}
  }

  createEffect(() => {
    if (typeof store.category) {
      setIsMenuVisible(false)
    }
  })

  return (
    <form onSubmit={onSubmit} class="flex w-full">
      <div class="relative flex w-full">
        <button
          class="z-10 inline-flex w-24 flex-shrink-0 items-center rounded-s-lg border border-gray-300 bg-gray-100 px-4 py-2.5 text-center text-sm font-medium text-gray-900 hover:bg-gray-200 focus:outline-none dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:hover:bg-gray-600 "
          type="button"
          onClick={() => setIsMenuVisible(!isMenuVisible())}
        >
          {category().name}{' '}
          <svg
            class="ms-2.5 h-2.5 w-2.5"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 10 6"
          >
            <path
              stroke="currentColor"
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="m1 1 4 4 4-4"
            />
          </svg>
        </button>
        <div
          class={`absolute left-0 top-12 z-10 w-24 divide-y divide-gray-100 rounded-lg bg-white shadow dark:bg-gray-700 ${isMenuVisible() ? 'block' : 'hidden'}`}
        >
          <ul class="py-2 text-sm text-gray-700 dark:text-gray-200">
            <For each={categories()}>
              {(category) => {
                return (
                  <li>
                    <button
                      onClick={() => setStore('category', category.value)}
                      type="button"
                      class="inline-flex w-full px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                    >
                      {category.name}
                    </button>
                  </li>
                )
              }}
            </For>
          </ul>
        </div>

        <div class="relative w-full">
          <input
            type="search"
            placeholder={placeholder()}
            name="keyword"
            value={store.keyword}
            class="z-20 block w-full rounded-e-lg border  border-gray-300 border-s-gray-50 bg-gray-50 p-2.5 text-sm text-gray-900 outline-0 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:border-s-gray-700  dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500"
          />
          <button
            type="submit"
            class="absolute end-0 top-0 h-full rounded-e-lg border border-blue-700 bg-blue-700 p-2.5 text-center text-sm font-medium text-white hover:bg-blue-800 dark:bg-blue-600 dark:hover:bg-blue-700 "
          >
            <svg
              class="mx-4 h-4 w-4"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 20 20"
            >
              <path
                stroke="currentColor"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
              />
            </svg>
          </button>
        </div>
      </div>
    </form>
  )
}
