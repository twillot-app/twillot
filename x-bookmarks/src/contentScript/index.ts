import {
  getLocal,
  setCurrentUserId,
  setLocal,
  StorageKeys,
} from 'utils/storage'

//@ts-ignore
import mainWorld from './inject?script&module'
import { Host } from 'utils/types'

interface Payload {
  variables: {
    tweet_id: string
    queryId: string
  }
}

for (const item of document.cookie.split(';')) {
  const [key, value] = item.split('=')
  if (key.includes('twid')) {
    setCurrentUserId(value.replace('u%3D', ''))
    break
  }
}

/**
 * NOTE:HMR 无效
 */
const script = document.createElement('script')
script.src = chrome.runtime.getURL(mainWorld)
script.type = 'module'
document.head.prepend(script)

window.addEventListener('message', async (event) => {
  if (event.origin !== Host || event.source !== window) {
    return
  }

  const { data } = event
  if (data.type === 'DeleteBookmark') {
    let tasks = (await getLocal(StorageKeys.DeleteBookmark))[
      StorageKeys.DeleteBookmark
    ]
    if (!tasks) {
      tasks = []
    }
    tasks.push({
      task_name: StorageKeys.DeleteBookmark,
      payload: data.payload,
    })
    await setLocal({
      [StorageKeys.DeleteBookmark]: tasks,
    })
    console.log('DeleteBookmark task added', tasks)
  } else if (data.type === 'CreateBookmark') {
    let tasks = (await getLocal(StorageKeys.DeleteBookmark))[
      StorageKeys.DeleteBookmark
    ]
    if (!tasks) {
      return
    }
    const index = tasks.findIndex(
      (t: { task_name: string; payload: Payload }) =>
        t.task_name === StorageKeys.DeleteBookmark &&
        t.payload.variables.tweet_id === data.payload.variables.tweet_id,
    )
    if (index < 0) {
      return
    }
    tasks.splice(index, 1)
    await setLocal({
      [StorageKeys.DeleteBookmark]: tasks,
    })
    console.log('DeleteBookmark task removed', tasks)
  }
})
