```typescript
fetch('https://x.com/i/api/graphql/ojPdsZsimiJrUGLR1sjUtA/CreateRetweet', {
  headers: {
    accept: '*/*',
    'accept-language': 'zh-CN,zh;q=0.9,en-US;q=0.8,en;q=0.7,zh-TW;q=0.6',
    authorization:
      'Bearer AAAAAAAAAAAAAAAAAAAAANRILgAAAAAAnNwIzUejRCOuH5E6I8xnZz4puTs%3D1Zv7ttfk8LF81IUq16cHjhLTvJu4FA33AGWWjCpTnA',
    'content-type': 'application/json',
    priority: 'u=1, i',
    'sec-ch-ua':
      '"Microsoft Edge";v="125", "Chromium";v="125", "Not.A/Brand";v="24"',
    'sec-ch-ua-mobile': '?0',
    'sec-ch-ua-platform': '"Windows"',
    'sec-fetch-dest': 'empty',
    'sec-fetch-mode': 'cors',
    'sec-fetch-site': 'same-origin',
    'x-client-transaction-id':
      'O3m2np+PhZT535fMnw9jm+iwQqjv+No8dzfPaUElcK9vZq1D4OEd4lOXzlBefaDaOTN7PDnEvW1/8zZNMjIhNDaLl9RLOA',
    'x-csrf-token':
      '963891b03ebfe4ab88e46fe37a1940caa6e9bcd89d58cd1fc3fd1410593627836c89728db0bd7fea74fad17fc588574288d91d1bee2c1de3148f1bacc76a69f3f0fd7d794ee131e925502c46edc2cf62',
    'x-twitter-active-user': 'yes',
    'x-twitter-auth-type': 'OAuth2Session',
    'x-twitter-client-language': 'zh-cn',
  },
  referrer: 'https://x.com/home',
  referrerPolicy: 'strict-origin-when-cross-origin',
  body: '{"variables":{"tweet_id":"1795624438588997945","dark_request":false},"queryId":"ojPdsZsimiJrUGLR1sjUtA"}',
  method: 'POST',
  mode: 'cors',
  credentials: 'include',
})
```

```json
{
  "data": {
    "create_retweet": {
      "retweet_results": {
        "result": {
          "rest_id": "1795661230100853207",
          "legacy": {
            "full_text": "RT @ruanyf: 我写了一篇博客《分布式数据库入门：以国产数据库 TDSQL 为例》。https://t.co/ATCVfmeJp6\n\n分布式数据库堪称最重要的数据库，几乎所有你知道的大型互联网服务，都运行在它之上。\n\n我尽量用通俗的语言，说清楚分布式数据库的概念、产品和…"
          }
        }
      }
    }
  }
}
```
