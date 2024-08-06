import { Endpoint } from '~/types'
import { flatten, request } from './twitter-base'
import { COMMON_FEATURES } from './twitter-features'
import { FetchError } from '~/xfetch'

export async function getPosts() {}

export async function getReplies(postId: string) {}

export async function getMedia(postId: string) {}

export async function getLikes(postId: string) {}

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
