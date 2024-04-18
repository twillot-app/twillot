import { Host } from '../types'
import { getAuthInfo } from './browser'

enum Endpoint {
  CREATE_BOOKMARK = `${Host}/i/api/graphql/aoDbu3RHznuiSkQ9aNM67Q/CreateBookmark`,
  DELETE_BOOKMARK = `${Host}/i/api/graphql/Wlmlj2-xzyS1GN3a6cj-mQ/DeleteBookmark`,
}

function get_query_id(endpoint: string) {
  return endpoint.split('/').reverse()[1]
}

export async function removeBookmark(tweet_id: string) {
  const { token, cookie, csrf } = await getAuthInfo()
  const data = {
    variables: { tweet_id },
    queryId: get_query_id(Endpoint.DELETE_BOOKMARK),
  }

  return fetch(`${Host}/i/api/graphql/Wlmlj2-xzyS1GN3a6cj-mQ/DeleteBookmark`, {
    headers: {
      'Accept-Language': 'en-US,us;q=0.9',
      Authorization: token,
      Cookie: cookie,
      'Content-Type': 'application/json',
      'x-csrf-token': csrf,
      'x-twitter-active-user': 'yes',
      'x-twitter-auth-type': 'OAuth2Session',
      'x-twitter-client-language': 'en-us',
    },
    referrer: `${Host}/home`,
    body: JSON.stringify(data),
    method: 'POST',
  })
}
