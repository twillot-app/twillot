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
} from '../../types'
import { getAuthInfo } from '../browser'
import { URL_REG } from '../text'
import { TriggerReuqestBody } from '../workflow/trigger.type'
import fetchWithTimeout, { FetchError } from '../xfetch'
import { BOOKMARK_FEATURES, COMMON_FEATURES } from './twitter-features'

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
    lang: tweet.legacy.lang,
    created_at: Math.floor(new Date(tweet.legacy.created_at).getTime() / 1000),
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

function get_headers(token: string, csrf: string) {
  return {
    Authorization: token,
    'X-Csrf-Token': csrf,
    'Content-Type': 'application/json',
    'X-Twitter-Active-User': 'yes',
    'X-Twitter-Auth-Type': 'OAuth2Session',
    'X-Twitter-Client-Language': 'en-us',
  }
}

async function request(url: string, options: RequestInit) {
  let headers = options.headers
  // 页面中可以直接设置 headers
  if (!options.headers?.['authorization']) {
    const { token, csrf } = await getAuthInfo()
    headers = {
      ...options.headers,
      ...get_headers(token, csrf),
    }
  }
  if (options.body instanceof FormData) {
    delete headers['Content-Type']
  }
  const res = await fetchWithTimeout(url, {
    method: 'POST',
    credentials: 'include',
    ...options,
  })
  if (res.status === 403) {
    const error = new Error('Forbidden')
    error.name = FetchError.IdentityError
    throw error
  }

  // No Content
  if (res.status === 204) {
    return
  }

  const data = await res.json()
  if ('errors' in data) {
    const t = res.headers.get('X-Rate-Limit-Reset')
    const leftTime = t
      ? Math.ceil((parseInt(t) * 1000 - Date.now()) / 60000)
      : 10
    const error = new Error(
      `Server error occurred, retry after ${leftTime} minutes.`,
    )
    error.name = FetchError.DataError
    throw error
  }

  return data
}

export async function createTweet(
  args: { text: string; replyTweetId?: string } | TriggerReuqestBody,
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
    return null
  }

  // 这是原推
  let index = instructions.entries.findIndex((i) => i.entryId.includes(tweetId))
  if (index > 0) {
    console.error('No conversation found in response')
    return null
  }

  const conversations = []
  // 主题回复只会在第一个？
  let entry = instructions.entries[1] as TimelineEntry<
    TimelineTweet,
    TimelineTimelineModule<TimelineTweet>
  > | null
  if (!entry) {
    return null
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

  return conversations.length > 0 ? conversations : null
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
    features: {
      c9s_tweet_anatomy_moderator_badge_enabled: true,
      responsive_web_home_pinned_timelines_enabled: true,
      blue_business_profile_image_shape_enabled: true,
      creator_subscriptions_tweet_preview_api_enabled: true,
      freedom_of_speech_not_reach_fetch_enabled: true,
      graphql_is_translatable_rweb_tweet_is_translatable_enabled: true,
      graphql_timeline_v2_bookmark_timeline: true,
      hidden_profile_likes_enabled: true,
      highlights_tweets_tab_ui_enabled: true,
      interactive_text_enabled: true,
      longform_notetweets_consumption_enabled: true,
      longform_notetweets_inline_media_enabled: true,
      longform_notetweets_rich_text_read_enabled: true,
      longform_notetweets_richtext_consumption_enabled: true,
      profile_foundations_tweet_stats_enabled: true,
      profile_foundations_tweet_stats_tweet_frequency: true,
      responsive_web_birdwatch_note_limit_enabled: true,
      responsive_web_edit_tweet_api_enabled: true,
      responsive_web_enhance_cards_enabled: false,
      responsive_web_graphql_exclude_directive_enabled: true,
      responsive_web_graphql_skip_user_profile_image_extensions_enabled: false,
      responsive_web_graphql_timeline_navigation_enabled: true,
      responsive_web_media_download_video_enabled: false,
      responsive_web_text_conversations_enabled: false,
      responsive_web_twitter_article_data_v2_enabled: true,
      responsive_web_twitter_article_tweet_consumption_enabled: false,
      responsive_web_twitter_blue_verified_badge_is_enabled: true,
      rweb_lists_timeline_redesign_enabled: true,
      spaces_2022_h2_clipping: true,
      spaces_2022_h2_spaces_communities: true,
      standardized_nudges_misinfo: true,
      subscriptions_verification_info_verified_since_enabled: true,
      tweet_awards_web_tipping_enabled: false,
      tweet_with_visibility_results_prefer_gql_limited_actions_policy_enabled:
        true,
      tweetypie_unmention_optimization_enabled: true,
      verified_phone_label_enabled: false,
      vibe_api_enabled: true,
      view_counts_everywhere_api_enabled: true,
    },
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
  const MAX_SEGMENT_SIZE = 8 * 1024 * 1024 // The maximum segment size is 8 MB
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
