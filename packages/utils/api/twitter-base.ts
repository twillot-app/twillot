import { Endpoint } from '../types'
import { getCurrentUserId, getAuthInfo } from '../storage'
import fetchWithTimeout, { FetchError } from '../xfetch'

interface RateLimitInfo {
  limit: number
  remaining: number
  reset: number
}

let rateLimitInfo: Record<string, Record<Endpoint, RateLimitInfo>> = {}

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

export async function getRateLimitInfo(endpoint: Endpoint) {
  const uid = await getCurrentUserId()
  if (!uid) {
    return null
  }

  return rateLimitInfo[uid]?.[endpoint] || null
}

export async function request(url: string, options: RequestInit) {
  // 页面中可以直接设置 headers
  if (!options.headers?.['authorization']) {
    const { token, csrf } = await getAuthInfo()
    if (!token) {
      const error = new Error('No token found')
      error.name = FetchError.IdentityError
      throw error
    }

    options.headers = {
      ...options.headers,
      ...get_headers(token, csrf),
    }
  }
  if (options.body instanceof FormData) {
    delete options.headers['Content-Type']
  }
  const res = await fetchWithTimeout(url, {
    method: 'POST',
    credentials: 'include',
    ...options,
  })
  const uid = await getCurrentUserId()
  const reset = res.headers.get('X-Rate-Limit-Reset')
  if (uid) {
    const limit = res.headers.get('X-Rate-Limit-Limit')
    const remaining = res.headers.get('X-Rate-Limit-Remaining')
    if (limit && remaining && reset) {
      const endpoint = url.split('?')[0] as Endpoint
      rateLimitInfo[uid] = {
        [endpoint]: {
          limit: parseInt(limit),
          remaining: parseInt(remaining),
          reset: parseInt(reset),
        },
      } as Record<Endpoint, RateLimitInfo>
    }
  }
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
    const leftTime = reset
      ? Math.ceil((parseInt(reset) * 1000 - Date.now()) / 60000)
      : 10
    const error = new Error(
      `Server error occurred, retry after ${leftTime} minutes.`,
    )
    error.name = FetchError.DataError
    throw error
  }

  return data
}
