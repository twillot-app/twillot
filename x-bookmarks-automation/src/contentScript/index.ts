import { getLocal, setCurrentUserId } from 'utils/storage'
import { likeTweet, repostTweet } from 'utils/api/twitter'

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
  if (data.type === TaskType.CreateBookmark) {
    const { like, repost, reply, webhook } = await getLocal([
      'like',
      'repost',
      'reply',
      'webhook',
    ])
    const payload: Payload = data.payload
    if (like) {
      await likeTweet(payload.variables.tweet_id)
    }
    if (repost) {
      await repostTweet(payload.variables.tweet_id)
    }
  }
})
