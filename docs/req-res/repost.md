```js
fetch('https://x.com/i/api/graphql/ojPdsZsimiJrUGLR1sjUtA/CreateRetweet', {
  body: '{"variables":{"tweet_id":"1795624438588997945","dark_request":false},"queryId":"ojPdsZsimiJrUGLR1sjUtA"}',
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
