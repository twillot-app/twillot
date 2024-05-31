import { createTweet } from '../api/twitter'
import { addTask } from '.'
import { ActionContext } from './types'

/**
 * 获取 Context 对象的 tweet_id
 */
function getContextTweetId(context: ActionContext): string {
  const { trigger, request, response } = context
  const { attachment_url, reply, tweet_id } = request.body.variables
  /**
   * 发推时获取新发表推文的 id
   */
  if (trigger === 'CreateTweet') {
    return response.body.tweetId
  } else if (trigger === 'CreateQuote') {
    /**
     * 获取引用推文 id
     */
    return attachment_url.split('/').pop()
  } else if (trigger === 'CreateReply') {
    /**
     * 回复时获取(被)回复推文 id
     */
    return response.body.tweetId || reply.in_reply_to_tweet_id
  } else if (
    trigger === 'CreateRetweet' ||
    trigger === 'CreateBookmark' ||
    trigger === 'DeleteBookmark'
  ) {
    return tweet_id
  }

  console.error('Unsupported trigger', trigger)
  return ''
}

export default {
  UnrollThread: async (context: ActionContext) =>
    await addTask({
      id: Date.now().toString(16),
      name: 'UnrollThread',
      tweetId: context.request.body.variables.tweet_id,
    }),
  DeleteBookmark: async (context: ActionContext) =>
    await addTask({
      id: Date.now().toString(16),
      name: 'DeleteBookmark',
      tweetId: context.request.body.variables.tweet_id,
    }),
  AutoComment: async (context: ActionContext) => {
    const replyTweetId = getContextTweetId(context)
    const { action } = context
    if (typeof action !== 'object' || !action.inputs?.[0]) {
      console.error('This action is configured incorrectly', context)
      return
    }

    await createTweet({
      text: action.inputs[0],
      replyTweetId,
    })
  },
}
