import { getAuthInfo } from './browser'

enum Endpoint {
  CREATE_BOOKMARK = 'https://twitter.com/i/api/graphql/aoDbu3RHznuiSkQ9aNM67Q/CreateBookmark',
  DELETE_BOOKMARK = 'https://twitter.com/i/api/graphql/Wlmlj2-xzyS1GN3a6cj-mQ/DeleteBookmark',
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
  const lang = navigator.language || 'en-US'

  return fetch(
    'https://twitter.com/i/api/graphql/Wlmlj2-xzyS1GN3a6cj-mQ/DeleteBookmark',
    {
      headers: {
        Accept: '*/*',
        'Accept-Language': 'zh-CN,zh;q=0.9,en-US;q=0.8,en;q=0.7,zh-TW;q=0.6',
        Authorization: token,
        Cookie: cookie,
        'Content-Type': 'application/json',
        'x-csrf-token': csrf,
        'x-twitter-active-user': 'yes',
        'x-twitter-auth-type': 'OAuth2Session',
        'x-twitter-client-language': 'zh-cn',
      },
      referrer: 'https://twitter.com/home',
      body: JSON.stringify(data),
      method: 'POST',
    },
  )
}
