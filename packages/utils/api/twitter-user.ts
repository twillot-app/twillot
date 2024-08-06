import { Endpoint } from '../types'
import { flatten, request } from './twitter-base'
import { COMMON_FEATURES } from './twitter-features'
import { FetchError } from '../xfetch'

export async function getPosts(userId: string, cursor?: string) {
  try {
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

    return json
  } catch (e) {
    if (e.name !== FetchError.TimeoutError && e.name !== FetchError.DataError) {
      e.name = FetchError.IdentityError
    }

    throw e
  }
}

export async function getReplies(userId: string, cursor?: string) {
  try {
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
      features: COMMON_FEATURES,
      fieldToggles: { withArticlePlainText: false },
    })
    const json = await request(`${Endpoint.USER_TWEETS_AND_REPLIES}?${query}`, {
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

export async function getMedia(userId: string, cursor?: string) {
  try {
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
    const json = await request(`${Endpoint.USER_MEDIA}?${query}`, {
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

export async function getLikes(userId: string, cursor?: string) {
  try {
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
    const json = await request(`${Endpoint.USER_MEDIA}?${query}`, {
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
