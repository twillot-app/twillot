import { Show } from 'solid-js'
import { For, onMount } from 'solid-js'
import dataStore from './store'
import { LICENSE_CODE_KEY, activateLicense, getLicense } from '../libs/license'
import { setLocal } from '../libs/storage'

const [store, setStore] = dataStore

const License = () => {
  const activate = async (e) => {
    e.preventDefault()
    const code = e.target.key.value as string
    if (!code) {
      return
    }

    try {
      const profile = await activateLicense(code)
      setStore(LICENSE_CODE_KEY, profile || null)
    } catch (error) {
      console.error(error)
      alert(error.message)
    }
  }
  const items = () => (store[LICENSE_CODE_KEY] ? [store[LICENSE_CODE_KEY]] : [])

  onMount(async () => {
    const profile = await getLicense()
    setStore(LICENSE_CODE_KEY, profile || null)
  })

  return (
    <div class="container mx-auto p-4 text-base">
      <div class="mb-4 rounded-md border border-gray-200 p-4 dark:border-gray-700">
        <div class="w-full border-b pb-4 pt-2 text-lg font-bold text-gray-900 outline-none dark:border-gray-600  dark:border-b-[#121212]  dark:bg-[#121212] dark:text-white">
          Activate Your License Code
        </div>

        <div class="relative overflow-x-auto sm:rounded-lg">
          <Show when={!store[LICENSE_CODE_KEY]}>
            <form onSubmit={activate}>
              <div class="relative my-4 flex items-center gap-4">
                <input
                  type="text"
                  name="key"
                  class="block w-1/3 rounded-lg border border-gray-300 bg-gray-50 py-2 pl-4 text-gray-900  outline-none focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
                  placeholder="Enter your license code to activate"
                />
                <button
                  type="submit"
                  class="me-2 rounded-lg bg-blue-700 px-5 py-2.5 text-sm font-medium text-white hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                >
                  Add
                </button>
              </div>
            </form>
          </Show>

          <table class="w-full text-left text-gray-500 dark:text-gray-400 rtl:text-right">
            <thead class="bg-gray-50 text-gray-700 dark:bg-gray-700 dark:text-gray-400">
              <tr>
                <th scope="col" class="w-4/12 px-6 py-3">
                  License Code
                </th>
                <th scope="col" class="w-1/12 px-6 py-3">
                  Plan
                </th>
                <th scope="col" class="w-2/12 px-6 py-3">
                  Expires At
                </th>
                <th scope="col" class="w-2/12 px-6 py-3">
                  Activated At
                </th>
                <th scope="col" class="w-2/12 px-6 py-3">
                  Action
                </th>
              </tr>
            </thead>
            <tbody class="text-sm">
              <For
                each={items()}
                fallback={
                  <tr>
                    <td colspan="4">
                      <div class="flex justify-center p-8">
                        <a
                          href="https://ko-fi.com/s/b5bc05eba5"
                          target="_blank"
                          class="text-blue-500 hover:text-blue-700"
                        >
                          Get a Free License Code
                        </a>
                      </div>
                    </td>
                  </tr>
                }
              >
                {(license) => (
                  <tr class="border-b bg-white last:border-b-0 hover:bg-gray-50 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-600">
                    <th
                      scope="row"
                      class="whitespace-nowrap px-6 py-4 font-medium text-gray-900 dark:text-white"
                    >
                      {license.license_code}
                    </th>
                    <td class="px-6 py-4 uppercase">{license.level}</td>
                    <td class="px-6 py-4">
                      {new Date(license.expires_at * 1000).toLocaleString()}
                    </td>
                    <td class="px-6 py-4">
                      {new Date(license.activated_at * 1000).toLocaleString()}
                    </td>
                    <td class="px-6 py-4">
                      <button
                        class="font-medium text-red-600 hover:underline dark:text-red-500"
                        onClick={async () => {
                          await setLocal({ [LICENSE_CODE_KEY]: null })
                          setStore(LICENSE_CODE_KEY, null)
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

export default License
