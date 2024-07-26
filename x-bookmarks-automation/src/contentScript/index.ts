import { getLocal, setCurrentUserId } from 'utils/storage'
import {
  createTweet,
  getTweetConversations,
  getTweetDetails,
  likeTweet,
  repostTweet,
  toRecord,
} from 'utils/api/twitter'

//@ts-ignore
import mainWorld from './inject?script&module'
import {
  API_HOST,
  Host,
  TaskType,
  TimelineEntry,
  TimelineTimelineItem,
  TimelineTweet,
} from 'utils/types'
import fetchWithTimeout from 'utils/xfetch'

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
    const {
      like,
      repost,
      reply,
      webhook,
      reply_text,
      webhook_url,
      webhook_token,
    } = await getLocal(['like', 'repost', 'reply', 'webhook'])
    const payload: Payload = data.payload
    const tweet_id = payload.variables.tweet_id
    if (like) {
      await likeTweet(tweet_id)
    }
    if (repost) {
      await repostTweet(tweet_id)
    }
    if (reply && reply_text) {
      await createTweet({
        text: reply_text,
        replyTweetId: tweet_id,
      })
    }
    if (webhook) {
      // TODO 提取为公共方法
      const json = await getTweetDetails(tweet_id)
      const tweet = toRecord(
        json.data.threaded_conversation_with_injections_v2.instructions[0].entries.find(
          (
            i: TimelineEntry<
              TimelineTweet,
              TimelineTimelineItem<TimelineTweet>
            >,
          ) => i.entryId.includes(tweet_id),
        ).content.itemContent as TimelineTweet,
        '',
      )
      const threads = await getTweetConversations(tweet_id, json)
      tweet.conversations = threads
      await fetchWithTimeout(
        API_HOST + '/webhooks/twitter/bookmark-automation',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            data: tweet,
            webhook: {
              url: webhook_url,
              token: webhook_token,
            },
          }),
        },
      )
    }
  }
})
