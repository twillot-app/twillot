import { Endpoint, TimelineInstructions } from '../types'
import { flatten, request } from './twitter-base'
import { COMMON_FEATURES } from './twitter-features'

export interface UserDataResponse {
  data: {
    user: {
      result: {
        timeline: {
          timeline: {
            instructions: TimelineInstructions
          }
        }
        __typename: 'User'
      }
    }
  }
}

export interface FollowersResponse {
  data: {
    user: {
      result: {
        timeline: {
          timeline: {
            instructions: TimelineInstructions
          }
        }
        __typename: 'User'
      }
    }
  }
}

export async function getPosts(userId: string, cursor?: string) {
  const variables = {
    userId,
    count: 100,
    cursor: '',
    includePromotedContent: true,
    withQuickPromoteEligibilityTweetFields: true,
    withVoice: true,
    withV2Timeline: true,
  }
  if (cursor) {
    variables.cursor = cursor
  }
  const query = flatten({
    variables,
    features: COMMON_FEATURES,
    fieldToggles: { withArticlePlainText: false },
  })
  const json = await request(`${Endpoint.USER_TWEETS}?${query}`, {
    body: null,
    method: 'GET',
  })

  return json as UserDataResponse
}

export async function getReplies(userId: string, cursor?: string) {
  const variables = {
    userId,
    count: 100,
    cursor: '',
    includePromotedContent: true,
    withCommunity: true,
    withVoice: true,
    withV2Timeline: true,
  }
  if (cursor) {
    variables.cursor = cursor
  }
  const query = flatten({
    variables,
    features: {
      rweb_tipjar_consumption_enabled: true,
      responsive_web_graphql_exclude_directive_enabled: true,
      verified_phone_label_enabled: false,
      creator_subscriptions_tweet_preview_api_enabled: true,
      responsive_web_graphql_timeline_navigation_enabled: true,
      responsive_web_graphql_skip_user_profile_image_extensions_enabled: false,
      communities_web_enable_tweet_community_results_fetch: true,
      c9s_tweet_anatomy_moderator_badge_enabled: true,
      articles_preview_enabled: true,
      responsive_web_edit_tweet_api_enabled: true,
      graphql_is_translatable_rweb_tweet_is_translatable_enabled: true,
      view_counts_everywhere_api_enabled: true,
      longform_notetweets_consumption_enabled: true,
      responsive_web_twitter_article_tweet_consumption_enabled: true,
      tweet_awards_web_tipping_enabled: false,
      creator_subscriptions_quote_tweet_preview_enabled: false,
      freedom_of_speech_not_reach_fetch_enabled: true,
      standardized_nudges_misinfo: true,
      tweet_with_visibility_results_prefer_gql_limited_actions_policy_enabled:
        true,
      rweb_video_timestamps_enabled: true,
      longform_notetweets_rich_text_read_enabled: true,
      longform_notetweets_inline_media_enabled: true,
      responsive_web_enhance_cards_enabled: false,
    },
    fieldToggles: { withArticlePlainText: false },
  })
  const json = await request(`${Endpoint.USER_TWEETS_AND_REPLIES}?${query}`, {
    body: null,
    method: 'GET',
  })

  return json as UserDataResponse
}

export async function getMedia(userId: string, cursor?: string) {
  const variables = {
    userId,
    count: 100,
    cursor: '',
    includePromotedContent: false,
    withClientEventToken: false,
    withBirdwatchNotes: false,
    withVoice: true,
    withV2Timeline: true,
  }
  if (cursor) {
    variables.cursor = cursor
  }
  const query = flatten({
    variables,
    features: {
      rweb_tipjar_consumption_enabled: true,
      responsive_web_graphql_exclude_directive_enabled: true,
      verified_phone_label_enabled: false,
      creator_subscriptions_tweet_preview_api_enabled: true,
      responsive_web_graphql_timeline_navigation_enabled: true,
      responsive_web_graphql_skip_user_profile_image_extensions_enabled: false,
      communities_web_enable_tweet_community_results_fetch: true,
      c9s_tweet_anatomy_moderator_badge_enabled: true,
      articles_preview_enabled: true,
      responsive_web_edit_tweet_api_enabled: true,
      graphql_is_translatable_rweb_tweet_is_translatable_enabled: true,
      view_counts_everywhere_api_enabled: true,
      longform_notetweets_consumption_enabled: true,
      responsive_web_twitter_article_tweet_consumption_enabled: true,
      tweet_awards_web_tipping_enabled: false,
      creator_subscriptions_quote_tweet_preview_enabled: false,
      freedom_of_speech_not_reach_fetch_enabled: true,
      standardized_nudges_misinfo: true,
      tweet_with_visibility_results_prefer_gql_limited_actions_policy_enabled:
        true,
      rweb_video_timestamps_enabled: true,
      longform_notetweets_rich_text_read_enabled: true,
      longform_notetweets_inline_media_enabled: true,
      responsive_web_enhance_cards_enabled: false,
    },
    fieldToggles: { withArticlePlainText: false },
  })
  const json = await request(`${Endpoint.USER_MEDIA}?${query}`, {
    body: null,
    method: 'GET',
  })

  return json as UserDataResponse
}

export async function getLikes(userId: string, cursor?: string) {
  const variables = {
    userId,
    count: 100,
    cursor: '',
    includePromotedContent: false,
    withClientEventToken: false,
    withBirdwatchNotes: false,
    withVoice: true,
    withV2Timeline: true,
  }
  if (cursor) {
    variables.cursor = cursor
  }
  const query = flatten({
    variables,
    features: COMMON_FEATURES,
    fieldToggles: { withArticlePlainText: false },
  })
  const json = await request(`${Endpoint.LIKES}?${query}`, {
    body: null,
    method: 'GET',
  })

  return json as UserDataResponse
}

export async function getFollowers(userId: string, cursor?: string) {
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

  return json as FollowersResponse
}
