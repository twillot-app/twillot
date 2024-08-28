import { JSXElement } from 'solid-js'

export default function Modal(props: {
  children: JSXElement
  title: string
  visible: boolean
  okText?: string
  cancelText?: string
  onOk?: () => void
  onCancel?: () => void
}) {
  return (
    <div
      tabindex="-1"
      class={`${props.visible ? '' : 'hidden'} fixed left-0 right-0 top-0  z-50 flex h-full max-h-full w-full items-center justify-center overflow-y-auto overflow-x-hidden bg-black/50 md:inset-0`}
    >
      <div class="relative mx-auto max-h-full w-full max-w-2xl p-4">
        {/* <!-- Modal content --> */}
        <div class="relative rounded-lg bg-white shadow dark:bg-gray-700">
          {/* <!-- Modal header --> */}
          <div class="flex items-center justify-between rounded-t border-b p-4 md:p-5 dark:border-gray-600">
            <h3 class="text-xl font-semibold text-gray-900 dark:text-white">
              {props.title}
            </h3>
            <button
              type="button"
              class="ms-auto inline-flex h-8 w-8 items-center justify-center rounded-lg bg-transparent text-sm text-gray-400 hover:bg-gray-200 hover:text-gray-900 dark:hover:bg-gray-600 dark:hover:text-white"
              onClick={props.onCancel}
            >
              <svg
                class="h-3 w-3"
                aria-hidden="true"
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
              <span class="sr-only">Close modal</span>
            </button>
          </div>
          {/* <!-- Modal body --> */}
          <div class="space-y-4 p-4 text-base text-gray-700 md:p-5 dark:text-white">
            {props.children}
          </div>
          {/* <!-- Modal footer --> */}
          <div class="flex items-center justify-end gap-4 rounded-b border-t border-gray-200 p-4 md:p-5 dark:border-gray-600">
            <button
              type="button"
              hidden={!props.cancelText}
              class="ms-3 rounded-lg border border-gray-200 bg-white px-5 py-2.5 text-sm font-medium text-gray-900 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:outline-none focus:ring-4 focus:ring-gray-100 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white dark:focus:ring-gray-700"
              onClick={props.onCancel}
            >
              {props.cancelText}
            </button>
            <button
              type="button"
              hidden={!props.okText}
              class="rounded-lg bg-blue-700 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
              onClick={props.onOk}
            >
              {props.okText}
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
