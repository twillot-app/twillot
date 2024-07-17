import {
  getLocal,
  setCurrentUserId,
  setLocal,
  StorageKeys,
} from 'utils/storage'

//@ts-ignore
import mainWorld from './inject?script&module'
import { Host, TaskType } from 'utils/types'

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
  if (data.type === TaskType.DeleteBookmark) {
    let tasks = (await getLocal(StorageKeys.Tasks))[StorageKeys.Tasks]
    if (!tasks) {
      tasks = []
    }
    tasks.push(data)
    await setLocal({
      [StorageKeys.Tasks]: tasks,
    })
    console.log('Tasks task added', tasks)
  } else if (data.type === TaskType.CreateBookmark) {
    let tasks = (await getLocal(StorageKeys.Tasks))[StorageKeys.Tasks]
    if (!tasks) {
      return
    }
    const index = tasks.findIndex(
      (t: { type: string; payload: Payload }) =>
        t.type === TaskType.DeleteBookmark &&
        t.payload.variables.tweet_id === data.payload.variables.tweet_id,
    )
    if (index < 0) {
      return
    }
    tasks.splice(index, 1)
    tasks.push(data)
    await setLocal({
      [StorageKeys.Tasks]: tasks,
    })
    console.log('Tasks task removed', tasks)
  }
})
