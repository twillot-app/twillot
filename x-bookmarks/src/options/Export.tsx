import { Show } from 'solid-js'
import { For, onMount } from 'solid-js'
import dataStore from './store'
import { IconCrown } from '../components/Icons'
import { openNewTab } from 'utils/browser'
import { findRecords } from 'utils/db/tweets'
import { exportData } from 'utils/exporter'
import {
  EXPORT_FORM_FIELDS,
  EXPORT_MEDIA_FIELDS,
  getExportFields,
  MAX_EXPORT_SIZE,
  MemberLevel,
} from '../libs/member'

const [store, setStore] = dataStore

const ExportPage = () => {
  const level = MemberLevel.Free
  const totalRecords = 500
  const maxRows = MAX_EXPORT_SIZE[level]
  const onSubmit = async (e) => {
    e.preventDefault()
    const form: HTMLFormElement = e.target
    const params: any = {}
    EXPORT_FORM_FIELDS.forEach((field) => {
      params[field.name] = form[field.name].value
    })
    let minLevel = MemberLevel.Free
    if (
      params.metadata === 'yes' ||
      params.fast_mode === 'yes' ||
      params.unroll === 'yes' ||
      totalRecords > MAX_EXPORT_SIZE[MemberLevel.Basic]
    ) {
      minLevel = MemberLevel.Pro
    }

    if (level < minLevel) {
      openNewTab(
        `https://twillot.com/x-twitter-bookmarks/pricing?utm_source=extension&utm_medium=export`,
      )
      return
    }

    const records = await findRecords('', '', '', '', MAX_EXPORT_SIZE[level])
    if (records.length === 0) {
      alert('No bookmarks found.')
      return
    }

    exportData(
      records,
      params.file_format.toUpperCase(),
      'twillot-bookmarks.' + params.file_format,
      getExportFields(level, params.file_format),
    )
  }
  const exportMedia = (e) => {
    e.preventDefault()
  }

  onMount(async () => {})

  return (
    <div class="container mx-auto p-4 text-base">
      <div class="mb-4 rounded-md border border-gray-200 p-4 dark:border-gray-700">
        <div class="w-full border-b pb-4 pt-2 text-lg font-bold text-gray-900 outline-none dark:border-gray-600  dark:border-b-[#121212]  dark:bg-[#121212] dark:text-white">
          Export Bookmarks
        </div>

        <div class="relative overflow-x-auto p-4 sm:rounded-lg">
          <form class="mx-auto block max-w-3xl" onSubmit={onSubmit}>
            {EXPORT_FORM_FIELDS.map((field) => {
              return (
                <div class="mb-4 flex gap-8">
                  <label class="mb-2 block w-32 text-right font-medium text-gray-900 dark:text-white">
                    {field.label}:
                  </label>
                  <fieldset class="flex-1">
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

            <div class="mb-4 flex gap-8">
              <label class="mb-2 block w-32 text-right font-medium text-gray-900 dark:text-white">
                Rows Limited:
              </label>
              <div class="flex-1">
                {level > MemberLevel.Basic ? (
                  'Unlimited'
                ) : (
                  <p class="ms-2 flex cursor-pointer items-center font-medium text-gray-900 dark:text-gray-300">
                    {maxRows}{' '}
                    <a
                      href="https://twillot.com/x-bookmarks/pricing?utm_source=export&level=pro"
                      target="_blank"
                      class="ml-4 text-sm text-blue-500 hover:text-blue-700"
                    >
                      Unlock unlimited
                    </a>
                  </p>
                )}
              </div>
            </div>
            <div class="my-5">
              <button
                type="submit"
                class="mb-2 me-4 rounded-lg bg-blue-700 px-5 py-2.5 text-sm font-medium text-white hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
              >
                Download
              </button>
            </div>
          </form>
        </div>
      </div>

      <div class="mb-4 rounded-md border border-gray-200 p-4 dark:border-gray-700">
        <div class="w-full border-b pb-4 pt-2 text-lg font-bold text-gray-900 outline-none dark:border-gray-600  dark:border-b-[#121212]  dark:bg-[#121212] dark:text-white">
          Export Media Files from Bookmarks
        </div>

        <div class="relative overflow-x-auto p-4 sm:rounded-lg">
          <form class="mx-auto block max-w-3xl" onSubmit={exportMedia}>
            {EXPORT_MEDIA_FIELDS.map((field) => {
              return (
                <div class="mb-4 flex gap-8">
                  <label class="mb-2 block w-32 text-right font-medium text-gray-900 dark:text-white">
                    {field.label}:
                  </label>
                  <fieldset class="flex-1">
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
                Download
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

export default ExportPage
