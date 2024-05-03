import { createEffect, createSignal, onMount } from 'solid-js'

export default function Notification() {
  const [text, setText] = createSignal('')
  let timeoutId: number | undefined

  createEffect(() => {
    if (text()) {
      if (timeoutId) {
        clearTimeout(timeoutId)
      }
      // @ts-ignore
      timeoutId = setTimeout(() => {
        setText('')
      }, 5000)
    }
  })

  onMount(() => {
    window.alert = (message: string) => {
      setText(message)
    }
  })

  return (
    <div
      tabindex="-1"
      class={`fixed bottom-0 start-0 z-50 flex w-full justify-between border-t border-gray-200 bg-gray-50 p-4 dark:border-gray-600 dark:bg-gray-700 ${text() ? '' : 'hidden'}`}
    >
      <div class="mx-auto flex items-center">
        <p class="flex items-center text-base font-normal text-gray-500 dark:text-gray-400">
          <span class="me-3 inline-flex h-6 w-6 items-center justify-center rounded-full bg-gray-200 p-1 dark:bg-gray-600">
            <svg
              class="h-3 w-3 text-gray-500 dark:text-gray-400"
              xmlns="http://www.w3.org/2000/svg"
              fill="currentColor"
              viewBox="0 0 18 19"
            >
              <path d="M15 1.943v12.114a1 1 0 0 1-1.581.814L8 11V5l5.419-3.871A1 1 0 0 1 15 1.943ZM7 4H2a2 2 0 0 0-2 2v4a2 2 0 0 0 2 2v5a2 2 0 0 0 2 2h1a2 2 0 0 0 2-2V4ZM4 17v-5h1v5H4ZM16 5.183v5.634a2.984 2.984 0 0 0 0-5.634Z" />
            </svg>
          </span>
          <span class="text-gray-900 dark:text-white">{text()}</span>
          <span class="ml-4 text-sm">Auto hide in 5 seconds</span>
        </p>
      </div>
      <div class="flex items-center">
        <button
          type="button"
          class="inline-flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-lg p-1.5 text-base text-gray-400 hover:bg-gray-200 hover:text-gray-900 dark:hover:bg-gray-600 dark:hover:text-white"
        >
          <svg
            class="h-3 w-3"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 14 14"
          >
            <path
              stroke="currentColor"
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
            />
          </svg>
        </button>
      </div>
    </div>
  )
}
