import {
  BookmarksResponse,
  TimelineAddEntriesInstruction,
  TimelineEntry,
  TimelineTimelineItem,
  TimelineTimelineModule,
  TimelineTweet,
  Endpoint,
  EndpointQuery,
  Tweet,
  TweetBase,
  TweetUnion,
  EntityURL,
  getEndpoint,
} from '../types'
import { URL_REG } from '../text'
import { FetchError } from '../xfetch'
import { request } from './twitter-base'
import {
  BOOKMARK_FEATURES,
  COMMON_FEATURES,
  USER_FEATURES,
} from './twitter-features'

function replaceWithExpandedUrl(text: string, urls: EntityURL[]) {
  if (urls.length === 0) {
    return text
  }

  for (let item of urls) {
    text = text.replace(new RegExp(item.url, 'g'), item.expanded_url)
  }

  return text
}

export function getTweet(tweet?: TweetUnion): TweetBase | null {
  if (!tweet) {
    return null
  }
  if (tweet.__typename === 'TweetWithVisibilityResults') {
    return tweet.tweet
  }

  return 'legacy' in tweet && tweet.legacy ? tweet : null
}

function getTweetFields(tweet?: TweetUnion) {
  if (!tweet) {
    return null
  }
  tweet = getTweet(tweet)
  if (!tweet) {
    return null
  }

  const user_legacy = tweet.core.user_results.result.legacy
  const entities = tweet.legacy.extended_entities || tweet.legacy.entities
  const media_items = entities?.media
  let full_text = ''
  if (tweet.note_tweet) {
    full_text = tweet.note_tweet.note_tweet_results.result.text
    full_text = replaceWithExpandedUrl(
      full_text,
      tweet.note_tweet.note_tweet_results.result.entity_set.urls,
    )
  } else {
    full_text = tweet.legacy.full_text
    full_text = replaceWithExpandedUrl(full_text, tweet.legacy.entities.urls)
  }

  return {
    username: user_legacy.name,
    screen_name: user_legacy.screen_name,
    avatar_url: user_legacy.profile_image_url_https,
    user_id: tweet.legacy.user_id_str,
    tweet_id: tweet.legacy.id_str,
    possibly_sensitive: tweet.legacy.possibly_sensitive,
    full_text,
    media_items,
    created_at: Math.floor(new Date(tweet.legacy.created_at).getTime() / 1000),
    lang: tweet.legacy.lang,
    bookmark_count: tweet.legacy.bookmark_count,
    favorite_count: tweet.legacy.favorite_count,
    quote_count: tweet.legacy.quote_count,
    reply_count: tweet.legacy.reply_count,
    retweet_count: tweet.legacy.retweet_count,
    bookmarked: tweet.legacy.bookmarked,
    favorited: tweet.legacy.favorited,
    is_quote_status: tweet.legacy.is_quote_status,
    retweeted: tweet.legacy.retweeted,
  }
}

export function toRecord(
  record: TimelineTweet,
  sortIndex: string,
): Tweet | null {
  let tweet_base = getTweet(record.tweet_results.result)
  if (!tweet_base) {
    return null
  }

  const fields = getTweetFields(tweet_base)
  const media_items = fields.media_items
  const has_quote = !!tweet_base.quoted_status_result?.result

  return {
    ...fields,
    sort_index: sortIndex,
    has_gif: !!media_items?.some((item) => item.type === 'animated_gif'),
    has_image: !!media_items?.some((item) => item.type === 'photo'),
    has_video: !!media_items?.some((item) => item.type === 'video'),
    has_quote,
    is_long_text: !!tweet_base.note_tweet?.note_tweet_results,
    has_link: URL_REG.test(fields.full_text),
    is_thread: record.tweetDisplayType === 'SelfThread',
    quoted_tweet: has_quote
      ? getTweetFields(tweet_base.quoted_status_result.result)
      : null,
  } as Tweet
}

export function getTweetId(
  record: TimelineEntry<TimelineTweet, TimelineTimelineItem<TimelineTweet>>,
): string {
  let tweet = getTweet(record.content.itemContent.tweet_results.result)
  return tweet?.legacy?.id_str || ''
}
const pageSize = 100

function flatten(obj: {}, stringify = true) {
  return Object.keys(obj)
    .map(
      (key) =>
        `${key}=${encodeURIComponent(stringify ? JSON.stringify(obj[key]) : obj[key])}`,
    )
    .join('&')
}

export async function createTweet(
  args:
    | { text: string; replyTweetId?: string }
    | { queryId: string; text: string; replyTweetId?: string; variables: any },
) {
  if ('variables' in args) {
    return request(getEndpoint(args.queryId, 'CreateTweet'), {
      body: JSON.stringify(args),
    })
  }

  const { text, replyTweetId } = args
  if (!text) {
    throw new Error('Text is required')
  }

  const variables = {
    tweet_text: text,
    // batch_compose: 'BatchSubsequent',
    dark_request: false,
    media: {
      media_entities: [],
      possibly_sensitive: false,
    },
    semantic_annotation_ids: [],
  }
  if (replyTweetId) {
    variables['reply'] = {
      in_reply_to_tweet_id: replyTweetId,
      exclude_reply_user_ids: [],
    }
  }
  return request(Endpoint.CREATE_TWEET, {
    body: JSON.stringify({
      queryId: EndpointQuery.CREATE_TWEET,
      variables,
      features: COMMON_FEATURES,
    }),
  })
}

export async function deleteTweet(tweetId: string) {
  return request(Endpoint.DELETE_TWEET, {
    body: JSON.stringify({
      variables: {
        tweet_id: tweetId,
        dark_request: false,
      },
      queryId: EndpointQuery.DELETE_TWEET,
    }),
  })
}

export async function deleteBookmark(tweetId: string) {
  return request(Endpoint.DELETE_BOOKMARK, {
    body: JSON.stringify({
      variables: {
        tweet_id: tweetId,
      },
      queryId: EndpointQuery.DELETE_BOOKMARK,
    }),
  })
}

export async function getBookmarks(cursor?: string) {
  try {
    const variables = {
      cursor: '',
      count: pageSize,
      includePromotedContent: true,
    }
    if (cursor) {
      variables.cursor = cursor
    }
    const query = flatten({
      variables,
      features: BOOKMARK_FEATURES,
    })
    const json = (await request(`${Endpoint.LIST_BOOKMARKS}?${query}`, {
      body: null,
      method: 'GET',
    })) as BookmarksResponse

    return json
  } catch (e) {
    if (e.name !== FetchError.TimeoutError && e.name !== FetchError.DataError) {
      e.name = FetchError.IdentityError
    }

    throw e
  }
}

export function getTweetDetails(
  tweetId: string,
  cursor?: string,
  headers?: any,
) {
  const variables = {
    focalTweetId: tweetId,
    with_rux_injections: false,
    includePromotedContent: true,
    withCommunity: true,
    withQuickPromoteEligibilityTweetFields: true,
    withBirdwatchNotes: true,
    withVoice: true,
    withV2Timeline: true,
    cursor: '',
  }
  if (cursor) {
    variables.cursor = cursor
  }

  const params = {
    variables: variables,
    features: COMMON_FEATURES,
    fieldToggles: {
      withArticleRichContentState: true,
      withArticlePlainText: false,
      withGrokAnalyze: false,
    },
  }
  return request(`${Endpoint.TWEET_DETAIL}?${flatten(params)}`, {
    method: 'GET',
    body: null,
    headers,
  })
}

/**
 * 获取推文主题
 * sortIndex 依赖与书签同步接口
 */
export async function getTweetConversations(tweetId: string) {
  const json = await getTweetDetails(tweetId)
  const wrapper =
    json.data.threaded_conversation_with_injections_v2.instructions
  const instructions = wrapper.find((i) => i.type === 'TimelineAddEntries') as
    | TimelineAddEntriesInstruction
    | undefined
  if (!instructions) {
    console.error('No instructions found in response')
    return []
  }

  // 这是原推
  let index = instructions.entries.findIndex((i) => i.entryId.includes(tweetId))
  if (index > 0) {
    console.error('No conversation found in response')
    return []
  }

  const conversations: Tweet[] = []
  // 主题回复只会在第一个？
  let entry = instructions.entries[1] as TimelineEntry<
    TimelineTweet,
    TimelineTimelineModule<TimelineTweet>
  > | null
  if (!entry) {
    return []
  }

  const items =
    entry.content.items?.filter(
      (i) =>
        i.item.itemContent.itemType === 'TimelineTweet' &&
        i.item.itemContent.tweetDisplayType === 'SelfThread',
    ) || []

  for (const i of items) {
    conversations.push(toRecord(i.item.itemContent, ''))
  }

  return conversations
}

export function getFolders() {
  return request(`${Endpoint.GET_FOLDERS}?variables=%7B%7D`, {
    body: null,
    method: 'GET',
  })
}

export function getFolderTweets(folderId: string, cursor?: string) {
  const query = flatten({
    variables: {
      bookmark_collection_id: folderId,
      cursor: cursor || '',
      includePromotedContent: true,
    },
    features: COMMON_FEATURES,
  })
  return request(`${Endpoint.GET_FOLDER_TWEETS}?${query}`, {
    body: null,
    method: 'GET',
  })
}

export async function getTweetLanguage(
  tweetId: string,
  headers?: any,
): Promise<string | undefined> {
  let json = await getTweetDetails(tweetId, '', headers)
  const entry = json.data.threaded_conversation_with_injections_v2
    .instructions[0] as TimelineAddEntriesInstruction<TimelineTweet>
  const content = entry.entries.find(
    (i: TimelineEntry<TimelineTweet, TimelineTimelineItem<TimelineTweet>>) =>
      i.entryId.includes(tweetId),
  ).content
  if (content.entryType === 'TimelineTimelineItem') {
    const tweet = getTweet(content.itemContent.tweet_results.result)
    if (tweet) {
      return tweet.legacy.lang
    }
  }
}

export async function getTweetVideoUrl(tweetId: string) {
  const json = await getTweetDetails(tweetId)
  const tweet = toRecord(
    json.data.threaded_conversation_with_injections_v2.instructions[0].entries.find(
      (i: TimelineEntry<TimelineTweet, TimelineTimelineItem<TimelineTweet>>) =>
        i.entryId.includes(tweetId),
    ).content.itemContent as TimelineTweet,
    '',
  )
  const item = tweet.media_items.find((item) => item.type === 'video')
  return item?.video_info.variants[item.video_info.variants.length - 1].url
}

/**
 * 用于获取主页签名
 */
export async function getUserById(userId: string) {
  const query = flatten({
    variables: {
      userId,
      withSafetyModeUserFields: true,
    },
    features: USER_FEATURES,
  })
  return request(Endpoint.USER_DETAIL + '?' + query, {
    body: null,
    method: 'get',
  })
}
export async function uploadMedia(
  binary: ArrayBuffer | string | File,
  headers = {},
  options = { mediaType: 'image/jpeg', mediaCategory: 'tweet_image' },
) {
  const { mediaType, mediaCategory } = options || {}

  // Handle URL string input by fetching the data
  if (typeof binary === 'string') {
    const res = await fetch(binary)
    binary = await res.arrayBuffer()
  }

  // If the input is a File, convert it to an ArrayBuffer
  if (binary instanceof File) {
    binary = await binary.arrayBuffer()
  }

  const totalBytes = binary.byteLength

  // ============ INIT =============
  const initParams = {
    command: 'INIT',
    total_bytes: totalBytes,
    media_type: mediaType,
    media_category: mediaCategory,
  }
  const json = await request(
    `${Endpoint.UPLOAD_MEDIA}?${flatten(initParams, false)}`,
    {
      method: 'POST',
      body: null,
      headers,
    },
  )
  const mediaId = json.media_id_string

  // =========== APPEND ============
  const MAX_SEGMENT_SIZE = 1250000
  let segmentIndex = 0
  let bytesSent = 0

  while (bytesSent < totalBytes) {
    const chunk = binary.slice(bytesSent, bytesSent + MAX_SEGMENT_SIZE)
    const appendParams = {
      command: 'APPEND',
      media_id: mediaId,
      segment_index: segmentIndex.toString(),
    }
    const formData = new FormData()
    formData.append(
      'media',
      new Blob([chunk], { type: 'application/octet-stream' }),
      'blob',
    )

    await request(`${Endpoint.UPLOAD_MEDIA}?${flatten(appendParams, false)}`, {
      method: 'POST',
      body: formData,
      headers,
    })

    segmentIndex++
    bytesSent += chunk.byteLength
  }

  // ========== FINALIZE ===========
  const finalizeParams = {
    command: 'FINALIZE',
    media_id: mediaId,
  }
  await request(`${Endpoint.UPLOAD_MEDIA}?${flatten(finalizeParams, false)}`, {
    method: 'POST',
    body: null,
    headers,
  })

  return mediaId
}

export async function getFollowers(userId: string, cursor?: string) {
  try {
    const variables = {
      cursor: '',
      userId,
      count: 100,
      includePromotedContent: true,
    }
    if (cursor) {
      variables.cursor = cursor
    }
    const query = flatten({
      variables,
      features: COMMON_FEATURES,
    })
    const json = await request(`${Endpoint.FOLLOWERS}?${query}`, {
      body: null,
      method: 'GET',
    })

    return json
  } catch (e) {
    if (e.name !== FetchError.TimeoutError && e.name !== FetchError.DataError) {
      e.name = FetchError.IdentityError
    }

    throw e
  }
}

export async function getFollowing(userId: string, cursor?: string) {}

export async function getUserLikes(userId: string, cursor?: string) {}

export async function getUserByScreenName(screenName: string) {
  const query = flatten({
    variables: {
      screen_name: screenName,
      withSafetyModeUserFields: true,
    },
    features: {
      hidden_profile_likes_enabled: false,
      responsive_web_graphql_exclude_directive_enabled: true,
      verified_phone_label_enabled: false,
      subscriptions_verification_info_verified_since_enabled: true,
      highlights_tweets_tab_ui_enabled: true,
      creator_subscriptions_tweet_preview_api_enabled: true,
      responsive_web_graphql_skip_user_profile_image_extensions_enabled: false,
      responsive_web_graphql_timeline_navigation_enabled: true,
    },
  })
  return request(`${Endpoint.USER_BY_SCREEN_NAME}?${query}`, {
    body: null,
    method: 'get',
  })
}

// getFollowers('2751923820').then((x) => console.log({ x }))
