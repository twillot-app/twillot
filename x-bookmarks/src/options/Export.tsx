import { createSignal, Show } from 'solid-js'
import { For, onMount } from 'solid-js'
import dataStore from './store'
import { IconCrown } from '../components/Icons'
import { openNewTab } from 'utils/browser'
import { findRecords, iterate } from 'utils/db/tweets'
import { getTweetMediaImage, getTweetMediaVideo } from 'utils/tweet'
import { exportData } from 'utils/exporter'
import {
  EXPORT_FORM_FIELDS,
  EXPORT_MEDIA_FIELDS,
  getExportFields,
  MAX_EXPORT_SIZE,
  MAX_MEDIA_EXPORT_SIZE,
  MemberLevel,
} from '../libs/member'
import { Host } from 'utils/types'
import { getTweetConversations, getTweetDetails } from 'utils/api/twitter'

const [store, setStore] = dataStore

const pricingUrl =
  'https://twillot.com/x-twitter-bookmarks/pricing?utm_source=extension&utm_medium=export'

function getMediaSavePath(item, mode: string) {
  // name.ext
  const originalName = item.media_url.split('/').pop().split('?')[0]
  if (mode === 'default') {
    return `twillot-media-files/${item.folder}-${item.screen_name}-${item.tweet_id}-${originalName}`
  } else if (mode === 'folder') {
    return `twillot-media-files/${item.folder}/${item.screen_name}-${item.tweet_id}-${originalName}`
  } else if (mode === 'user') {
    return `twillot-media-files/${item.screen_name}/${item.tweet_id}-${originalName}`
  }

  throw new Error('Unimplemented media save path mode')
}

const ExportPage = () => {
  const [maxMediaRows, setMaxMediaRows] = createSignal(
    MAX_MEDIA_EXPORT_SIZE[MemberLevel.Free],
  )
  const level = MemberLevel.Basic
  const totalRecords = 500
  const maxRows = MAX_EXPORT_SIZE[level]
  const onRadioChange = (row, field) => {
    if (row.level > level) {
      alert(
        row.level === MemberLevel.Pro
          ? 'Unlock unlimited exporting to access this feature.'
          : 'You need upgrade your membership level to access this feature.',
      )
    }

    if (field.name === 'action_type') {
      if (row.value === 'csv') {
        setMaxMediaRows(MAX_MEDIA_EXPORT_SIZE[MemberLevel.Pro])
      } else {
        setMaxMediaRows(MAX_MEDIA_EXPORT_SIZE[level])
      }
    }
  }
  const exportBookmarks = async (e) => {
    e.preventDefault()
    const form: HTMLFormElement = e.target
    const params: any = {}
    EXPORT_FORM_FIELDS.forEach((field) => {
      params[field.name] = form[field.name].value
    })
    let minLevel = MemberLevel.Free
    if (
      params.metadata === 'yes' ||
      // params.fast_mode === 'yes' ||
      params.unroll === 'yes' ||
      totalRecords > MAX_EXPORT_SIZE[MemberLevel.Basic]
    ) {
      minLevel = MemberLevel.Basic
    }

    if (level < minLevel) {
      openNewTab(pricingUrl)
      return
    }

    const records = await findRecords('', '', '', '', MAX_EXPORT_SIZE[level])
    if (records.length === 0) {
      alert('No bookmarks found.')
      return
    }

    exportData(
      records.map((i) => ({
        ...i,
        is_thread: i.is_thread || i.conversations?.length > 0,
        url: `${Host}/${i.screen_name}/status/${i.tweet_id}`,
        full_text:
          level < MemberLevel.Basic
            ? i.full_text
            : i.conversations?.length
              ? i.full_text +
                '\n' +
                i.conversations.map((i) => i?.full_text || '').join('\n')
              : i.full_text,
      })),
      params.file_format.toUpperCase(),
      'twillot-bookmarks.' + params.file_format,
      getExportFields(level, params.file_format),
    )
  }
  const exportMedia = async (e) => {
    e.preventDefault()
    const form: HTMLFormElement = e.target
    const params: any = {}
    EXPORT_MEDIA_FIELDS.forEach((field) => {
      params[field.name] = form[field.name].value
    })
    const records = await iterate((tweet) => {
      if (params.media_type === 'all') {
        if (tweet.has_image || tweet.has_video || tweet.has_gif) {
          return true
        }
      } else if (params.media_type === 'image') {
        return tweet.has_image
      } else if (params.media_type === 'video') {
        return tweet.has_video || tweet.has_gif
      }

      return false
    })
    const mediaList = []
    const containImage =
      params.media_type === 'all' || params.media_type === 'image'
    const containVideo =
      params.media_type === 'all' || params.media_type === 'video'
    const containGif =
      params.media_type === 'all' || params.media_type === 'gif'
    for (const record of records) {
      const mediaItem = {
        tweet_id: record.tweet_id,
        tweet_url: `${Host}/${record.screen_name}/status/${record.tweet_id}`,
        user_id: record.user_id,
        username: record.username,
        screen_name: record.screen_name,
        folder: record.folder || 'unsorted',
        created_at: new Date(record.created_at * 1000).toLocaleString(),
      }
      record.media_items.forEach((item) => {
        if (containImage && item.type === 'photo') {
          mediaList.push({
            ...mediaItem,
            key: item.media_key,
            media_type: 'image',
            media_url: getTweetMediaImage(item, 'jpg', 'large'),
          })
        } else if (containVideo && item.type === 'video') {
          mediaList.push({
            ...mediaItem,
            media_type: 'video',
            media_url: getTweetMediaVideo(item),
          })
        } else if (containGif && item.type === 'animated_gif') {
          mediaList.push({
            ...mediaItem,
            media_type: 'gif',
            media_url: getTweetMediaVideo(item),
          })
        }
      })
    }

    if (params.action_type === 'csv') {
      exportData(
        mediaList,
        'CSV',
        `twillot-${params.media_type === 'all' ? 'media' : params.media_type}-files.csv`,
        {
          media_url: 'Media URL',
          tweet_id: 'Post ID',
          tweet_url: 'Post URL',
          user_id: 'User ID',
          username: 'Username',
          screen_name: 'Screen Name',
          folder: 'Folder',
          created_at: 'Created At',
        },
      )
    } else if (params.action_type === 'media') {
      let downloaded = 0
      let errored = 0
      for (const item of mediaList) {
        if (downloaded >= maxMediaRows()) {
          alert(
            'Max media rows reached, unlock unlimited exporting to download more.',
          )
          break
        }

        try {
          console.log(`Downloading ${item.media_url}...`, item)
          await chrome.downloads.download({
            url: item.media_url,
            filename: getMediaSavePath(item, params.save_mode),
          })
          downloaded += 1
          console.log(`Downloaded ${downloaded} of ${mediaList.length} files.`)
        } catch (error) {
          errored += 1
          console.error(error, item)
        }
      }
      alert('Your media files have been downloaded completely.')
    }
  }

  onMount(async () => {})

  return (
    <div class="container mx-auto p-4 text-base">
      <div class="mb-4 rounded-md border border-gray-200 p-4 dark:border-gray-700">
        <div class="w-full border-b pb-4 pt-2 text-lg font-bold text-gray-900 outline-none dark:border-gray-600  dark:border-b-[#121212]  dark:bg-[#121212] dark:text-white">
          Export Bookmarks
        </div>

        <div class="relative overflow-x-auto p-4 sm:rounded-lg">
          <form class="mx-auto block max-w-3xl" onSubmit={exportBookmarks}>
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
                          onChange={() => onRadioChange(row, field)}
                        />
                        <label
                          for={`${field.name}_${index}`}
                          class="ms-2 flex cursor-pointer items-center font-medium text-gray-900 dark:text-gray-300"
                        >
                          {row.label}
                          <span class="ml-2 flex scale-75 text-yellow-400">
                            {new Array(row.level).fill(0).map((_) => (
                              <IconCrown />
                            ))}
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
                  <p class="flex cursor-pointer items-center font-medium text-gray-900 dark:text-gray-300">
                    {maxRows}
                  </p>
                )}
              </div>
            </div>
            <div class="my-5">
              <button
                type="submit"
                class="mb-2 me-8 rounded-lg bg-blue-700 px-5 py-2.5 text-sm font-medium text-white hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
              >
                Download
              </button>
              <a
                href={pricingUrl}
                target="_blank"
                class="mb-2 me-2 inline-block rounded-lg bg-gradient-to-br from-purple-600 to-blue-500 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-gradient-to-bl focus:outline-none focus:ring-4 focus:ring-blue-300 dark:focus:ring-blue-800"
              >
                Unlock Unlimited Exporting
              </a>
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
                          onChange={() => onRadioChange(row, field)}
                        />
                        <label
                          for={`${field.name}_${index}`}
                          class="ms-2 flex cursor-pointer items-center font-medium text-gray-900 dark:text-gray-300"
                        >
                          {row.label}
                          <span class="ml-2 flex scale-75 text-yellow-400">
                            {new Array(row.level).fill(0).map((_) => (
                              <IconCrown />
                            ))}
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
                <p class="flex items-center font-medium text-gray-900 dark:text-gray-300">
                  <Show
                    when={
                      maxMediaRows() < MAX_MEDIA_EXPORT_SIZE[MemberLevel.Pro]
                    }
                    fallback="Unlimited"
                  >
                    {maxMediaRows()}
                  </Show>
                </p>
              </div>
            </div>

            <div class="my-5">
              <button
                type="submit"
                class="mb-2 me-8 rounded-lg bg-blue-700 px-5 py-2.5 text-sm font-medium text-white hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
              >
                Download
              </button>
              <a
                href={pricingUrl}
                target="_blank"
                class="mb-2 me-4 inline-block rounded-lg bg-gradient-to-br from-purple-600 to-blue-500 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-gradient-to-bl focus:outline-none focus:ring-4 focus:ring-blue-300 dark:focus:ring-blue-800"
              >
                Unlock Unlimited Exporting
              </a>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

export default ExportPage
