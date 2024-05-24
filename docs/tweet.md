## 引用推文

https://x.com/ruanyf/status/1795624438588997945

```js
fetch('https://x.com/i/api/graphql/oB-5XsHNAbjvARJEc8CZFw/CreateTweet', {
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
      '97V6UlNDSVg1E1sAU8OvVyR8jmQjNBbwu/sDpY3pvGOjqmGPLC3RLp9bApySsWwW9Um38PUQEKjZ/hMjBmJCt9n7dpT39A',
    'x-csrf-token':
      '963891b03ebfe4ab88e46fe37a1940caa6e9bcd89d58cd1fc3fd1410593627836c89728db0bd7fea74fad17fc588574288d91d1bee2c1de3148f1bacc76a69f3f0fd7d794ee131e925502c46edc2cf62',
    'x-twitter-active-user': 'yes',
    'x-twitter-auth-type': 'OAuth2Session',
    'x-twitter-client-language': 'zh-cn',
  },
  referrer: 'https://x.com/home',
  referrerPolicy: 'strict-origin-when-cross-origin',
  body: '{"variables":{"tweet_text":"持续学习的阮老师","attachment_url":"https://x.com/ruanyf/status/1795624438588997945","dark_request":false,"media":{"media_entities":[],"possibly_sensitive":false},"semantic_annotation_ids":[]},"features":{"communities_web_enable_tweet_community_results_fetch":true,"c9s_tweet_anatomy_moderator_badge_enabled":true,"tweetypie_unmention_optimization_enabled":true,"responsive_web_edit_tweet_api_enabled":true,"graphql_is_translatable_rweb_tweet_is_translatable_enabled":true,"view_counts_everywhere_api_enabled":true,"longform_notetweets_consumption_enabled":true,"responsive_web_twitter_article_tweet_consumption_enabled":true,"tweet_awards_web_tipping_enabled":false,"creator_subscriptions_quote_tweet_preview_enabled":false,"longform_notetweets_rich_text_read_enabled":true,"longform_notetweets_inline_media_enabled":true,"articles_preview_enabled":true,"rweb_video_timestamps_enabled":true,"rweb_tipjar_consumption_enabled":true,"responsive_web_graphql_exclude_directive_enabled":true,"verified_phone_label_enabled":false,"freedom_of_speech_not_reach_fetch_enabled":true,"standardized_nudges_misinfo":true,"tweet_with_visibility_results_prefer_gql_limited_actions_policy_enabled":true,"responsive_web_graphql_skip_user_profile_image_extensions_enabled":false,"responsive_web_graphql_timeline_navigation_enabled":true,"responsive_web_enhance_cards_enabled":false},"queryId":"oB-5XsHNAbjvARJEc8CZFw"}',
  method: 'POST',
  mode: 'cors',
  credentials: 'include',
})
```

```json
{
    "data": {
        "create_tweet": {
            "tweet_results": {
                "result": {
                    "rest_id": "1795661993053143061",
                    "core": {
                        "user_results": {
                            "result": {
                                "__typename": "User",
                                "id": "VXNlcjoyNzUxOTIzODIw",
                                "rest_id": "2751923820",
                                "affiliates_highlighted_label": {},
                                "has_graduated_access": true,
                                "is_blue_verified": true,
                                "profile_image_shape": "Circle",
                                "legacy": {
                                    "can_dm": true,
                                    "can_media_tag": true,
                                    "created_at": "Thu Aug 21 11:41:20 +0000 2014",
                                    "default_profile": false,
                                    "default_profile_image": false,
                                    "description": "\uD83D\uDD16 Twillot: searching twitter bookmarks https://t.co/8N09FfZyKY\n\uD83D\uDCB5 Millionaire Calculator: https://t.co/cD4zMnl2Sn",
                                    "entities": {
                                        "description": {
                                            "urls": [
                                                {
                                                    "display_url": "dub.sh/7ubLVdF",
                                                    "expanded_url": "https://dub.sh/7ubLVdF",
                                                    "url": "https://t.co/8N09FfZyKY",
                                                    "indices": [
                                                        39,
                                                        62
                                                    ]
                                                },
                                                {
                                                    "display_url": "millionairecalculator.org",
                                                    "expanded_url": "https://millionairecalculator.org",
                                                    "url": "https://t.co/cD4zMnl2Sn",
                                                    "indices": [
                                                        89,
                                                        112
                                                    ]
                                                }
                                            ]
                                        },
                                        "url": {
                                            "urls": [
                                                {
                                                    "display_url": "twillot.com",
                                                    "expanded_url": "https://twillot.com/",
                                                    "url": "https://t.co/4jBXyW6cep",
                                                    "indices": [
                                                        0,
                                                        23
                                                    ]
                                                }
                                            ]
                                        }
                                    },
                                    "fast_followers_count": 0,
                                    "favourites_count": 971,
                                    "followers_count": 417,
                                    "friends_count": 2087,
                                    "has_custom_timelines": true,
                                    "is_translator": false,
                                    "listed_count": 17,
                                    "location": "",
                                    "media_count": 54,
                                    "name": "饭特稀",
                                    "needs_phone_verification": false,
                                    "normal_followers_count": 417,
                                    "pinned_tweet_ids_str": [
                                        "1777325561947549814"
                                    ],
                                    "possibly_sensitive": false,
                                    "profile_image_url_https": "https://pbs.twimg.com/profile_images/1789982655100194816/eznb-5Di_normal.png",
                                    "profile_interstitial_type": "",
                                    "screen_name": "SiZapPaaiGwat",
                                    "statuses_count": 1462,
                                    "translator_type": "none",
                                    "url": "https://t.co/4jBXyW6cep",
                                    "verified": false,
                                    "want_retweets": false,
                                    "withheld_in_countries": []
                                },
                                "tipjar_settings": {}
                            }
                        }
                    },
                    "unmention_data": {},
                    "edit_control": {
                        "edit_tweet_ids": [
                            "1795661993053143061"
                        ],
                        "editable_until_msecs": "1716957755000",
                        "is_edit_eligible": true,
                        "edits_remaining": "5"
                    },
                    "is_translatable": false,
                    "views": {
                        "state": "Enabled"
                    },
                    "source": "<a href=\"https://mobile.twitter.com\" rel=\"nofollow\">Twitter Web App</a>",
                    "quoted_status_result": {
                        "result": {
                            "__typename": "Tweet",
                            "rest_id": "1795624438588997945",
                            "core": {
                                "user_results": {
                                    "result": {
                                        "__typename": "User",
                                        "id": "VXNlcjoxNTgwNzgx",
                                        "rest_id": "1580781",
                                        "affiliates_highlighted_label": {},
                                        "has_graduated_access": true,
                                        "is_blue_verified": false,
                                        "profile_image_shape": "Circle",
                                        "legacy": {
                                            "following": true,
                                            "notifications": true,
                                            "can_dm": true,
                                            "can_media_tag": false,
                                            "created_at": "Tue Mar 20 02:53:02 +0000 2007",
                                            "default_profile": false,
                                            "default_profile_image": false,
                                            "description": "Stay Focused, Keep Shipping. Build Early, Build Always. Improve yourself, Write solid/simple/stupid code.",
                                            "entities": {
                                                "description": {
                                                    "urls": []
                                                },
                                                "url": {
                                                    "urls": [
                                                        {
                                                            "display_url": "ruanyifeng.com",
                                                            "expanded_url": "http://www.ruanyifeng.com",
                                                            "url": "http://t.co/fw8pEsBuak",
                                                            "indices": [
                                                                0,
                                                                22
                                                            ]
                                                        }
                                                    ]
                                                }
                                            },
                                            "fast_followers_count": 0,
                                            "favourites_count": 14331,
                                            "followers_count": 173249,
                                            "friends_count": 378,
                                            "has_custom_timelines": true,
                                            "is_translator": false,
                                            "listed_count": 1422,
                                            "location": "Shanghai, China",
                                            "media_count": 2814,
                                            "name": "ruanyf",
                                            "normal_followers_count": 173249,
                                            "pinned_tweet_ids_str": [],
                                            "possibly_sensitive": false,
                                            "profile_banner_url": "https://pbs.twimg.com/profile_banners/1580781/1355537048",
                                            "profile_image_url_https": "https://pbs.twimg.com/profile_images/2363795309/wbi37mdkxhr2trsr4ofa_normal.jpeg",
                                            "profile_interstitial_type": "",
                                            "screen_name": "ruanyf",
                                            "statuses_count": 4789,
                                            "translator_type": "none",
                                            "url": "http://t.co/fw8pEsBuak",
                                            "verified": false,
                                            "want_retweets": true,
                                            "withheld_in_countries": []
                                        },
                                        "professional": {
                                            "rest_id": "1712651990424322255",
                                            "professional_type": "Creator",
                                            "category": [
                                                {
                                                    "id": 713,
                                                    "name": "科技",
                                                    "icon_name": "IconBriefcaseStroke"
                                                }
                                            ]
                                        },
                                        "tipjar_settings": {}
                                    }
                                }
                            },
                            "unmention_data": {},
                            "edit_control": {
                                "edit_tweet_ids": [
                                    "1795624438588997945"
                                ],
                                "editable_until_msecs": "1716948801000",
                                "is_edit_eligible": true,
                                "edits_remaining": "5"
                            },
                            "is_translatable": false,
                            "views": {
                                "count": "3966",
                                "state": "EnabledWithCount"
                            },
                            "source": "<a href=\"https://mobile.twitter.com\" rel=\"nofollow\">Twitter Web App</a>",
                            "legacy": {
                                "bookmark_count": 21,
                                "bookmarked": false,
                                "created_at": "Wed May 29 01:13:21 +0000 2024",
                                "conversation_id_str": "1795624438588997945",
                                "display_text_range": [
                                    0,
                                    130
                                ],
                                "entities": {
                                    "hashtags": [],
                                    "media": [
                                        {
                                            "display_url": "pic.x.com/whvbt4lqns",
                                            "expanded_url": "https://twitter.com/ruanyf/status/1795624438588997945/photo/1",
                                            "id_str": "1795624387850506240",
                                            "indices": [
                                                131,
                                                154
                                            ],
                                            "media_key": "3_1795624387850506240",
                                            "media_url_https": "https://pbs.twimg.com/media/GOtW3fvbkAAoT-D.jpg",
                                            "type": "photo",
                                            "url": "https://t.co/whvBt4LqnS",
                                            "ext_media_availability": {
                                                "status": "Available"
                                            },
                                            "features": {
                                                "large": {
                                                    "faces": [
                                                        {
                                                            "x": 461,
                                                            "y": 236,
                                                            "h": 61,
                                                            "w": 61
                                                        }
                                                    ]
                                                },
                                                "medium": {
                                                    "faces": [
                                                        {
                                                            "x": 461,
                                                            "y": 236,
                                                            "h": 61,
                                                            "w": 61
                                                        }
                                                    ]
                                                },
                                                "small": {
                                                    "faces": [
                                                        {
                                                            "x": 391,
                                                            "y": 200,
                                                            "h": 51,
                                                            "w": 51
                                                        }
                                                    ]
                                                },
                                                "orig": {
                                                    "faces": [
                                                        {
                                                            "x": 461,
                                                            "y": 236,
                                                            "h": 61,
                                                            "w": 61
                                                        }
                                                    ]
                                                }
                                            },
                                            "sizes": {
                                                "large": {
                                                    "h": 444,
                                                    "w": 800,
                                                    "resize": "fit"
                                                },
                                                "medium": {
                                                    "h": 444,
                                                    "w": 800,
                                                    "resize": "fit"
                                                },
                                                "small": {
                                                    "h": 377,
                                                    "w": 680,
                                                    "resize": "fit"
                                                },
                                                "thumb": {
                                                    "h": 150,
                                                    "w": 150,
                                                    "resize": "crop"
                                                }
                                            },
                                            "original_info": {
                                                "height": 444,
                                                "width": 800,
                                                "focus_rects": [
                                                    {
                                                        "x": 0,
                                                        "y": 0,
                                                        "w": 793,
                                                        "h": 444
                                                    },
                                                    {
                                                        "x": 0,
                                                        "y": 0,
                                                        "w": 444,
                                                        "h": 444
                                                    },
                                                    {
                                                        "x": 0,
                                                        "y": 0,
                                                        "w": 389,
                                                        "h": 444
                                                    },
                                                    {
                                                        "x": 68,
                                                        "y": 0,
                                                        "w": 222,
                                                        "h": 444
                                                    },
                                                    {
                                                        "x": 0,
                                                        "y": 0,
                                                        "w": 800,
                                                        "h": 444
                                                    }
                                                ]
                                            },
                                            "media_results": {
                                                "result": {
                                                    "media_key": "3_1795624387850506240"
                                                }
                                            }
                                        }
                                    ],
                                    "symbols": [],
                                    "timestamps": [],
                                    "urls": [
                                        {
                                            "display_url": "ruanyifeng.com/blog/2024/05/t…",
                                            "expanded_url": "https://www.ruanyifeng.com/blog/2024/05/tdsql.html",
                                            "url": "https://t.co/ATCVfmeJp6",
                                            "indices": [
                                                34,
                                                57
                                            ]
                                        }
                                    ],
                                    "user_mentions": []
                                },
                                "extended_entities": {
                                    "media": [
                                        {
                                            "display_url": "pic.twitter.com/whvBt4LqnS",
                                            "expanded_url": "https://twitter.com/ruanyf/status/1795624438588997945/photo/1",
                                            "id_str": "1795624387850506240",
                                            "indices": [
                                                131,
                                                154
                                            ],
                                            "media_key": "3_1795624387850506240",
                                            "media_url_https": "https://pbs.twimg.com/media/GOtW3fvbkAAoT-D.jpg",
                                            "type": "photo",
                                            "url": "https://t.co/whvBt4LqnS",
                                            "ext_media_availability": {
                                                "status": "Available"
                                            },
                                            "features": {
                                                "large": {
                                                    "faces": [
                                                        {
                                                            "x": 461,
                                                            "y": 236,
                                                            "h": 61,
                                                            "w": 61
                                                        }
                                                    ]
                                                },
                                                "medium": {
                                                    "faces": [
                                                        {
                                                            "x": 461,
                                                            "y": 236,
                                                            "h": 61,
                                                            "w": 61
                                                        }
                                                    ]
                                                },
                                                "small": {
                                                    "faces": [
                                                        {
                                                            "x": 391,
                                                            "y": 200,
                                                            "h": 51,
                                                            "w": 51
                                                        }
                                                    ]
                                                },
                                                "orig": {
                                                    "faces": [
                                                        {
                                                            "x": 461,
                                                            "y": 236,
                                                            "h": 61,
                                                            "w": 61
                                                        }
                                                    ]
                                                }
                                            },
                                            "sizes": {
                                                "large": {
                                                    "h": 444,
                                                    "w": 800,
                                                    "resize": "fit"
                                                },
                                                "medium": {
                                                    "h": 444,
                                                    "w": 800,
                                                    "resize": "fit"
                                                },
                                                "small": {
                                                    "h": 377,
                                                    "w": 680,
                                                    "resize": "fit"
                                                },
                                                "thumb": {
                                                    "h": 150,
                                                    "w": 150,
                                                    "resize": "crop"
                                                }
                                            },
                                            "original_info": {
                                                "height": 444,
                                                "width": 800,
                                                "focus_rects": [
                                                    {
                                                        "x": 0,
                                                        "y": 0,
                                                        "w": 793,
                                                        "h": 444
                                                    },
                                                    {
                                                        "x": 0,
                                                        "y": 0,
                                                        "w": 444,
                                                        "h": 444
                                                    },
                                                    {
                                                        "x": 0,
                                                        "y": 0,
                                                        "w": 389,
                                                        "h": 444
                                                    },
                                                    {
                                                        "x": 68,
                                                        "y": 0,
                                                        "w": 222,
                                                        "h": 444
                                                    },
                                                    {
                                                        "x": 0,
                                                        "y": 0,
                                                        "w": 800,
                                                        "h": 444
                                                    }
                                                ]
                                            },
                                            "media_results": {
                                                "result": {
                                                    "media_key": "3_1795624387850506240"
                                                }
                                            }
                                        }
                                    ]
                                },
                                "favorite_count": 20,
                                "favorited": false,
                                "full_text": "我写了一篇博客《分布式数据库入门：以国产数据库 TDSQL 为例》。https://t.co/ATCVfmeJp6\n\n分布式数据库堪称最重要的数据库，几乎所有你知道的大型互联网服务，都运行在它之上。\n\n我尽量用通俗的语言，说清楚分布式数据库的概念、产品和用法。 https://t.co/whvBt4LqnS",
                                "is_quote_status": false,
                                "lang": "zh",
                                "possibly_sensitive": false,
                                "possibly_sensitive_editable": true,
                                "quote_count": 1,
                                "reply_count": 3,
                                "retweet_count": 7,
                                "retweeted": true,
                                "user_id_str": "1580781",
                                "id_str": "1795624438588997945"
                            }
                        }
                    },
                    "legacy": {
                        "bookmark_count": 0,
                        "bookmarked": false,
                        "created_at": "Wed May 29 03:42:35 +0000 2024",
                        "conversation_id_str": "1795661993053143061",
                        "display_text_range": [
                            0,
                            8
                        ],
                        "entities": {
                            "hashtags": [],
                            "symbols": [],
                            "timestamps": [],
                            "urls": [],
                            "user_mentions": []
                        },
                        "favorite_count": 0,
                        "favorited": false,
                        "full_text": "持续学习的阮老师",
                        "is_quote_status": true,
                        "lang": "zh",
                        "quote_count": 0,
                        "quoted_status_id_str": "1795624438588997945",
                        "quoted_status_permalink": {
                            "url": "https://t.co/mz5fLbld1V",
                            "expanded": "https://twitter.com/ruanyf/status/1795624438588997945",
                            "display": "twitter.com/ruanyf/status/…"
                        },
                        "reply_count": 0,
                        "retweet_count": 0,
                        "retweeted": false,
                        "user_id_str": "2751923820",
                        "id_str": "1795661993053143061"
                    },
                    "unmention_info": {}
                }
            }
        }
    }
}
```