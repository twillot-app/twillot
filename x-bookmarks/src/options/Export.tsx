import { Show } from 'solid-js'
import { For, onMount } from 'solid-js'
import dataStore from './store'
import { IconCrown } from '../components/Icons'

const [store, setStore] = dataStore

enum MemberLevel {
  Free,
  Basic,
  Pro,
}

const fileTypes = [
  { value: 'csv', label: 'CSV', level: MemberLevel.Free },
  { value: 'json', label: 'JSON', level: MemberLevel.Free },
  // { value: 'pdf', label: 'PDF', level: 1 },
  // { value: 'docx', label: 'DOCX', level: 1 },
]
const unrollThreads = [
  { value: 'no', label: 'No', level: MemberLevel.Free },
  { value: 'yes', label: 'Yes', level: MemberLevel.Basic },
]
const metaDatas = [
  {
    value: 'yes',
    label: 'Likes, Views, Replies, Quotes, Bookmarks, and More',
    level: 1,
  },
  { value: 'no', label: 'None', level: MemberLevel.Free },
]
const fastMode = [
  { value: 'no', label: 'Normal', level: MemberLevel.Free },
  { value: 'yes', label: 'Ultra Fast', level: MemberLevel.Pro },
]
const formFields = [
  {
    name: 'file_format',
    data: fileTypes,
    label: 'File format',
    default: 'csv',
  },
  {
    name: 'unroll',
    data: unrollThreads,
    label: 'Unroll threads',
    default: 'yes',
  },
  {
    name: 'metadata',
    data: metaDatas,
    label: 'Metadata',
    default: 'yes',
  },
  {
    name: 'fast_mode',
    data: fastMode,
    label: 'Export speed',
    default: 'yes',
  },
]

const ExportPage = () => {
  onMount(async () => {})

  return (
    <div class="container mx-auto p-4 text-base">
      <div class="mb-4 rounded-md border border-gray-200 p-4 dark:border-gray-700">
        <div class="w-full border-b pb-4 pt-2 text-lg font-bold text-gray-900 outline-none dark:border-gray-600  dark:border-b-[#121212]  dark:bg-[#121212] dark:text-white">
          Export
        </div>

        <div class="relative overflow-x-auto sm:rounded-lg">
          <form class="mx-auto max-w-sm" onSubmit={(e) => e.preventDefault()}>
            {formFields.map((field) => {
              return (
                <div class="mb-4">
                  <label class="mb-2 block font-medium text-gray-900 dark:text-white">
                    {field.label}:
                  </label>
                  <fieldset>
                    {field.data.map((row, index) => (
                      <div class="mb-4 flex items-center text-sm">
                        <input
                          id={`${field.name}_${index}`}
                          type="radio"
                          value={row.value}
                          name={field.name}
                          class="h-4 w-4 border-gray-300 focus:ring-2 focus:ring-blue-300 dark:border-gray-600 dark:bg-gray-700 dark:focus:bg-blue-600 dark:focus:ring-blue-600"
                          checked={row.value === field.default}
                        />
                        <label
                          for={`${field.name}_${index}`}
                          class="ms-2 flex cursor-pointer items-center font-medium text-gray-900 dark:text-gray-300"
                        >
                          {row.label}
                          <span class="ml-2 scale-75 text-yellow-400">
                            {row.level > 0 && <IconCrown />}
                          </span>
                        </label>
                      </div>
                    ))}
                  </fieldset>
                </div>
              )
            })}

            <div class="my-5">
              <button
                type="submit"
                class="mb-2 me-4 rounded-lg bg-blue-700 px-5 py-2.5 text-sm font-medium text-white hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
              >
                Export Now
              </button>
              <button
                type="button"
                class="mb-2 me-4 rounded-lg bg-yellow-400 px-5 py-2.5 text-sm font-medium text-white hover:bg-yellow-500 focus:outline-none focus:ring-4 focus:ring-yellow-400 dark:focus:ring-yellow-900"
              >
                Images & Videos
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

export default ExportPage
