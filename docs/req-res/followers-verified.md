```js
fetch(
  'https://x.com/i/api/graphql/hf2B_p-eEZQOrNF1brf50Q/BlueVerifiedFollowers?variables=%7B%22userId%22%3A%222751923820%22%2C%22count%22%3A20%2C%22includePromotedContent%22%3Afalse%7D&features=%7B%22rweb_tipjar_consumption_enabled%22%3Atrue%2C%22responsive_web_graphql_exclude_directive_enabled%22%3Atrue%2C%22verified_phone_label_enabled%22%3Afalse%2C%22creator_subscriptions_tweet_preview_api_enabled%22%3Atrue%2C%22responsive_web_graphql_timeline_navigation_enabled%22%3Atrue%2C%22responsive_web_graphql_skip_user_profile_image_extensions_enabled%22%3Afalse%2C%22communities_web_enable_tweet_community_results_fetch%22%3Atrue%2C%22c9s_tweet_anatomy_moderator_badge_enabled%22%3Atrue%2C%22articles_preview_enabled%22%3Atrue%2C%22tweetypie_unmention_optimization_enabled%22%3Atrue%2C%22responsive_web_edit_tweet_api_enabled%22%3Atrue%2C%22graphql_is_translatable_rweb_tweet_is_translatable_enabled%22%3Atrue%2C%22view_counts_everywhere_api_enabled%22%3Atrue%2C%22longform_notetweets_consumption_enabled%22%3Atrue%2C%22responsive_web_twitter_article_tweet_consumption_enabled%22%3Atrue%2C%22tweet_awards_web_tipping_enabled%22%3Afalse%2C%22creator_subscriptions_quote_tweet_preview_enabled%22%3Afalse%2C%22freedom_of_speech_not_reach_fetch_enabled%22%3Atrue%2C%22standardized_nudges_misinfo%22%3Atrue%2C%22tweet_with_visibility_results_prefer_gql_limited_actions_policy_enabled%22%3Atrue%2C%22rweb_video_timestamps_enabled%22%3Atrue%2C%22longform_notetweets_rich_text_read_enabled%22%3Atrue%2C%22longform_notetweets_inline_media_enabled%22%3Atrue%2C%22responsive_web_enhance_cards_enabled%22%3Afalse%7D',
  {
    body: null,
    method: 'GET',
  },
)
```

```json
{
  "data": {
    "user": {
      "result": {
        "__typename": "User",
        "timeline": {
          "timeline": {
            "instructions": [
              {
                "type": "TimelineClearCache"
              },
              {
                "type": "TimelineTerminateTimeline",
                "direction": "Top"
              },
              {
                "type": "TimelineAddEntries",
                "entries": [
                  {
                    "entryId": "user-1752346519758405632",
                    "sortIndex": "1811054364396093440",
                    "content": {
                      "entryType": "TimelineTimelineItem",
                      "__typename": "TimelineTimelineItem",
                      "itemContent": {
                        "itemType": "TimelineUser",
                        "__typename": "TimelineUser",
                        "user_results": {
                          "result": {
                            "__typename": "User",
                            "id": "VXNlcjoxNzUyMzQ2NTE5NzU4NDA1NjMy",
                            "rest_id": "1752346519758405632",
                            "affiliates_highlighted_label": {},
                            "has_graduated_access": true,
                            "is_blue_verified": true,
                            "profile_image_shape": "Circle",
                            "legacy": {
                              "followed_by": true,
                              "following": true,
                              "can_dm": true,
                              "can_media_tag": true,
                              "created_at": "Tue Jan 30 15:02:29 +0000 2024",
                              "default_profile": true,
                              "default_profile_image": false,
                              "description": "Get free access to 1000+ Micro SaaS ideas with insights into the average monthly search volumes and ranking difficulty in Google \uD83D\uDC49\uD83C\uDFFD https://t.co/Cj3Mh8piBU",
                              "entities": {
                                "description": {
                                  "urls": [
                                    {
                                      "display_url": "microsaasvault.com",
                                      "expanded_url": "https://microsaasvault.com",
                                      "url": "https://t.co/Cj3Mh8piBU",
                                      "indices": [132, 155]
                                    }
                                  ]
                                },
                                "url": {
                                  "urls": [
                                    {
                                      "display_url": "microsaasvault.com",
                                      "expanded_url": "https://microsaasvault.com",
                                      "url": "https://t.co/Cj3Mh8piBU",
                                      "indices": [0, 23]
                                    }
                                  ]
                                }
                              },
                              "fast_followers_count": 0,
                              "favourites_count": 413,
                              "followers_count": 846,
                              "friends_count": 1292,
                              "has_custom_timelines": false,
                              "is_translator": false,
                              "listed_count": 3,
                              "location": "",
                              "media_count": 20,
                              "name": "Paco",
                              "normal_followers_count": 846,
                              "pinned_tweet_ids_str": ["1795544752726683689"],
                              "possibly_sensitive": false,
                              "profile_banner_url": "https://pbs.twimg.com/profile_banners/1752346519758405632/1716671165",
                              "profile_image_url_https": "https://pbs.twimg.com/profile_images/1793340283880439808/kp0W2zKu_x96.jpg",
                              "profile_interstitial_type": "",
                              "screen_name": "pacovermeulen",
                              "statuses_count": 305,
                              "translator_type": "none",
                              "url": "https://t.co/Cj3Mh8piBU",
                              "verified": false,
                              "want_retweets": true,
                              "withheld_in_countries": []
                            },
                            "tipjar_settings": {}
                          }
                        },
                        "userDisplayType": "User"
                      },
                      "clientEventInfo": {
                        "component": "BlueVerifiedFollowersSgs",
                        "element": "user"
                      }
                    }
                  },
                  {
                    "entryId": "user-1712095004",
                    "sortIndex": "1811054364396093439",
                    "content": {
                      "entryType": "TimelineTimelineItem",
                      "__typename": "TimelineTimelineItem",
                      "itemContent": {
                        "itemType": "TimelineUser",
                        "__typename": "TimelineUser",
                        "user_results": {
                          "result": {
                            "__typename": "User",
                            "id": "VXNlcjoxNzEyMDk1MDA0",
                            "rest_id": "1712095004",
                            "affiliates_highlighted_label": {},
                            "has_graduated_access": true,
                            "is_blue_verified": true,
                            "profile_image_shape": "Circle",
                            "legacy": {
                              "followed_by": true,
                              "following": true,
                              "can_dm": true,
                              "can_media_tag": true,
                              "created_at": "Fri Aug 30 07:47:00 +0000 2013",
                              "default_profile": false,
                              "default_profile_image": false,
                              "description": "关注Apple Vision Pro和Moonbit，只聊技术和生活，仅代表个人观点！",
                              "entities": {
                                "description": {
                                  "urls": []
                                },
                                "url": {
                                  "urls": [
                                    {
                                      "display_url": "github.com/npmstudy/",
                                      "expanded_url": "https://github.com/npmstudy/",
                                      "url": "https://t.co/nq88mKst2L",
                                      "indices": [0, 23]
                                    }
                                  ]
                                }
                              },
                              "fast_followers_count": 0,
                              "favourites_count": 926,
                              "followers_count": 8801,
                              "friends_count": 2528,
                              "has_custom_timelines": false,
                              "is_translator": false,
                              "listed_count": 60,
                              "location": "Beijing",
                              "media_count": 174,
                              "name": "狼叔",
                              "normal_followers_count": 8801,
                              "pinned_tweet_ids_str": ["1747892052875260233"],
                              "possibly_sensitive": false,
                              "profile_banner_url": "https://pbs.twimg.com/profile_banners/1712095004/1710332016",
                              "profile_image_url_https": "https://pbs.twimg.com/profile_images/1753993281074339840/zs5sSccl_x96.jpg",
                              "profile_interstitial_type": "",
                              "screen_name": "i5ting",
                              "statuses_count": 2796,
                              "translator_type": "none",
                              "url": "https://t.co/nq88mKst2L",
                              "verified": false,
                              "want_retweets": true,
                              "withheld_in_countries": []
                            },
                            "tipjar_settings": {
                              "is_enabled": true
                            }
                          }
                        },
                        "userDisplayType": "User"
                      },
                      "clientEventInfo": {
                        "component": "BlueVerifiedFollowersSgs",
                        "element": "user"
                      }
                    }
                  },
                  {
                    "entryId": "user-1409561390906417162",
                    "sortIndex": "1811054364396093438",
                    "content": {
                      "entryType": "TimelineTimelineItem",
                      "__typename": "TimelineTimelineItem",
                      "itemContent": {
                        "itemType": "TimelineUser",
                        "__typename": "TimelineUser",
                        "user_results": {
                          "result": {
                            "__typename": "User",
                            "id": "VXNlcjoxNDA5NTYxMzkwOTA2NDE3MTYy",
                            "rest_id": "1409561390906417162",
                            "affiliates_highlighted_label": {},
                            "has_graduated_access": true,
                            "is_blue_verified": true,
                            "profile_image_shape": "Circle",
                            "legacy": {
                              "followed_by": true,
                              "following": true,
                              "can_dm": true,
                              "can_media_tag": true,
                              "created_at": "Mon Jun 28 17:17:14 +0000 2021",
                              "default_profile": true,
                              "default_profile_image": false,
                              "description": "UTC+3  Husband, father, investor, binarist, coder. Goosinals#6687. Stay real, stay humble…",
                              "entities": {
                                "description": {
                                  "urls": []
                                }
                              },
                              "fast_followers_count": 0,
                              "favourites_count": 5395,
                              "followers_count": 4942,
                              "friends_count": 1809,
                              "has_custom_timelines": true,
                              "is_translator": false,
                              "listed_count": 44,
                              "location": "EU",
                              "media_count": 342,
                              "name": "J.T.",
                              "normal_followers_count": 4942,
                              "pinned_tweet_ids_str": ["1795594775317660137"],
                              "possibly_sensitive": false,
                              "profile_banner_url": "https://pbs.twimg.com/profile_banners/1409561390906417162/1700633488",
                              "profile_image_url_https": "https://pbs.twimg.com/profile_images/1767894399218827264/eEzfN6Ry_x96.jpg",
                              "profile_interstitial_type": "",
                              "screen_name": "web3jt",
                              "statuses_count": 4462,
                              "translator_type": "none",
                              "verified": false,
                              "want_retweets": true,
                              "withheld_in_countries": []
                            },
                            "professional": {
                              "rest_id": "1516184895906746368",
                              "professional_type": "Creator",
                              "category": [
                                {
                                  "id": 713,
                                  "name": "Science & Technology",
                                  "icon_name": "IconBriefcaseStroke"
                                }
                              ]
                            },
                            "tipjar_settings": {
                              "is_enabled": true,
                              "ethereum_handle": "0x66666666f6d4Eef3bF30A60DDe1Bf50Ce056e87f"
                            }
                          }
                        },
                        "userDisplayType": "User"
                      },
                      "clientEventInfo": {
                        "component": "BlueVerifiedFollowersSgs",
                        "element": "user"
                      }
                    }
                  },
                  {
                    "entryId": "user-1130628715",
                    "sortIndex": "1811054364396093437",
                    "content": {
                      "entryType": "TimelineTimelineItem",
                      "__typename": "TimelineTimelineItem",
                      "itemContent": {
                        "itemType": "TimelineUser",
                        "__typename": "TimelineUser",
                        "user_results": {
                          "result": {
                            "__typename": "User",
                            "id": "VXNlcjoxMTMwNjI4NzE1",
                            "rest_id": "1130628715",
                            "affiliates_highlighted_label": {},
                            "has_graduated_access": true,
                            "is_blue_verified": true,
                            "profile_image_shape": "Circle",
                            "legacy": {
                              "followed_by": true,
                              "following": true,
                              "can_dm": true,
                              "can_media_tag": true,
                              "created_at": "Tue Jan 29 10:07:21 +0000 2013",
                              "default_profile": false,
                              "default_profile_image": false,
                              "description": "\uD83D\uDD16 Indie Maker & Solo Pioneer at 5KM Software Tech (https://t.co/4Mm4PesQ0d). \uD83D\uDD25 Pursuing the art of Minimalism in Tech! | Crafting Zipic(https://t.co/y7MjKEbhDJ)",
                              "entities": {
                                "description": {
                                  "urls": [
                                    {
                                      "display_url": "5km.tech",
                                      "expanded_url": "https://5km.tech",
                                      "url": "https://t.co/4Mm4PesQ0d",
                                      "indices": [51, 74]
                                    },
                                    {
                                      "display_url": "zipic.5km.tech",
                                      "expanded_url": "https://zipic.5km.tech",
                                      "url": "https://t.co/y7MjKEbhDJ",
                                      "indices": [136, 159]
                                    }
                                  ]
                                },
                                "url": {
                                  "urls": [
                                    {
                                      "display_url": "5km.studio",
                                      "expanded_url": "https://5km.studio",
                                      "url": "https://t.co/l629onYXCY",
                                      "indices": [0, 23]
                                    }
                                  ]
                                }
                              },
                              "fast_followers_count": 0,
                              "favourites_count": 3141,
                              "followers_count": 2863,
                              "friends_count": 786,
                              "has_custom_timelines": false,
                              "is_translator": false,
                              "listed_count": 35,
                              "location": "5km away from you",
                              "media_count": 288,
                              "name": "okooo5km",
                              "normal_followers_count": 2863,
                              "pinned_tweet_ids_str": ["1780528451495084063"],
                              "possibly_sensitive": false,
                              "profile_banner_url": "https://pbs.twimg.com/profile_banners/1130628715/1709559739",
                              "profile_image_url_https": "https://pbs.twimg.com/profile_images/1736951826271047680/cNYNLf0E_x96.jpg",
                              "profile_interstitial_type": "",
                              "screen_name": "okooo5km",
                              "statuses_count": 1266,
                              "translator_type": "none",
                              "url": "https://t.co/l629onYXCY",
                              "verified": false,
                              "want_retweets": true,
                              "withheld_in_countries": []
                            },
                            "tipjar_settings": {
                              "is_enabled": true,
                              "ethereum_handle": "0xA88d704d76fD5babe380944b556D885A773C0a2d"
                            }
                          }
                        },
                        "userDisplayType": "User"
                      },
                      "clientEventInfo": {
                        "component": "BlueVerifiedFollowersSgs",
                        "element": "user"
                      }
                    }
                  },
                  {
                    "entryId": "user-1594260560962457600",
                    "sortIndex": "1811054364396093436",
                    "content": {
                      "entryType": "TimelineTimelineItem",
                      "__typename": "TimelineTimelineItem",
                      "itemContent": {
                        "itemType": "TimelineUser",
                        "__typename": "TimelineUser",
                        "user_results": {
                          "result": {
                            "__typename": "User",
                            "id": "VXNlcjoxNTk0MjYwNTYwOTYyNDU3NjAw",
                            "rest_id": "1594260560962457600",
                            "affiliates_highlighted_label": {},
                            "has_graduated_access": true,
                            "is_blue_verified": true,
                            "profile_image_shape": "Circle",
                            "legacy": {
                              "followed_by": true,
                              "following": true,
                              "can_dm": true,
                              "can_media_tag": true,
                              "created_at": "Sun Nov 20 09:25:22 +0000 2022",
                              "default_profile": true,
                              "default_profile_image": false,
                              "description": "一名失败的中老年独立\uD83E\uDD13(失业)开发，失败人生\uD83E\uDD21的代表，欢迎关注看我笑话。原生/Web，AI，AR，VR项目都写点。P.S 上X纯开心。观点不同友好探讨，不吵架，现实已很烦心了，我来赛博散心的。如果误ban了先道歉\uD83E\uDDCE我真是随手ban的\uD83E\uDD23，您也可随时ban我哈。 我要开心的活在信息茧房里，快乐平静过一辈子，谢谢\uD83D\uDE4F",
                              "entities": {
                                "description": {
                                  "urls": []
                                }
                              },
                              "fast_followers_count": 0,
                              "favourites_count": 954,
                              "followers_count": 2575,
                              "friends_count": 39,
                              "has_custom_timelines": false,
                              "is_translator": false,
                              "listed_count": 18,
                              "location": "Seattle, WA",
                              "media_count": 76,
                              "name": "独立开发者William",
                              "normal_followers_count": 2575,
                              "pinned_tweet_ids_str": ["1810352298075500704"],
                              "possibly_sensitive": false,
                              "profile_banner_url": "https://pbs.twimg.com/profile_banners/1594260560962457600/1720002670",
                              "profile_image_url_https": "https://pbs.twimg.com/profile_images/1808448058742722560/pk5_PodW_x96.jpg",
                              "profile_interstitial_type": "",
                              "screen_name": "DLKFZWilliam",
                              "statuses_count": 969,
                              "translator_type": "none",
                              "verified": false,
                              "want_retweets": true,
                              "withheld_in_countries": []
                            },
                            "professional": {
                              "rest_id": "1629835514684772355",
                              "professional_type": "Creator",
                              "category": [
                                {
                                  "id": 1055,
                                  "name": "Software developer/Programmer/Software engineer",
                                  "icon_name": "IconBriefcaseStroke"
                                }
                              ]
                            },
                            "tipjar_settings": {}
                          }
                        },
                        "userDisplayType": "User"
                      },
                      "clientEventInfo": {
                        "component": "BlueVerifiedFollowersSgs",
                        "element": "user"
                      }
                    }
                  },
                  {
                    "entryId": "user-11765952",
                    "sortIndex": "1811054364396093435",
                    "content": {
                      "entryType": "TimelineTimelineItem",
                      "__typename": "TimelineTimelineItem",
                      "itemContent": {
                        "itemType": "TimelineUser",
                        "__typename": "TimelineUser",
                        "user_results": {
                          "result": {
                            "__typename": "User",
                            "id": "VXNlcjoxMTc2NTk1Mg==",
                            "rest_id": "11765952",
                            "affiliates_highlighted_label": {},
                            "has_graduated_access": true,
                            "is_blue_verified": true,
                            "profile_image_shape": "Circle",
                            "legacy": {
                              "followed_by": true,
                              "following": true,
                              "can_dm": true,
                              "can_media_tag": true,
                              "created_at": "Wed Jan 02 18:38:17 +0000 2008",
                              "default_profile": false,
                              "default_profile_image": false,
                              "description": "\uD83E\uDD77\uD83C\uDFFC ENTJ-A ｜ 双子座｜ AI 加持的非典型码农 ｜专业网络冲浪员\n\uD83D\uDE80 现居日本大阪 ｜ 初创公司代表取缔役\n✨ 来交友的 ｜ 分享和传递价值\n\uD83E\uDD16 e/acc: @zhaikr\n\uD83D\uDCF1 TG: https://t.co/lVWLtbqDMA\n\uD83D\uDCA1 More: https://t.co/znj8r66ccp",
                              "entities": {
                                "description": {
                                  "urls": [
                                    {
                                      "display_url": "t.me/interjc",
                                      "expanded_url": "https://t.me/interjc",
                                      "url": "https://t.co/lVWLtbqDMA",
                                      "indices": [99, 122]
                                    },
                                    {
                                      "display_url": "x.com/interjc/bio",
                                      "expanded_url": "https://x.com/interjc/bio",
                                      "url": "https://t.co/znj8r66ccp",
                                      "indices": [131, 154]
                                    }
                                  ]
                                },
                                "url": {
                                  "urls": [
                                    {
                                      "display_url": "interjc.net",
                                      "expanded_url": "http://interjc.net/",
                                      "url": "https://t.co/woFwrTWzsu",
                                      "indices": [0, 23]
                                    }
                                  ]
                                }
                              },
                              "fast_followers_count": 0,
                              "favourites_count": 6638,
                              "followers_count": 6842,
                              "friends_count": 772,
                              "has_custom_timelines": true,
                              "is_translator": false,
                              "listed_count": 53,
                              "location": "Japan",
                              "media_count": 731,
                              "name": "Justin",
                              "normal_followers_count": 6842,
                              "pinned_tweet_ids_str": ["1795763123179450503"],
                              "possibly_sensitive": false,
                              "profile_banner_url": "https://pbs.twimg.com/profile_banners/11765952/1712804144",
                              "profile_image_url_https": "https://pbs.twimg.com/profile_images/1791761180610211840/JrLnAGtF_x96.jpg",
                              "profile_interstitial_type": "",
                              "screen_name": "interjc",
                              "statuses_count": 9224,
                              "translator_type": "none",
                              "url": "https://t.co/woFwrTWzsu",
                              "verified": false,
                              "want_retweets": true,
                              "withheld_in_countries": []
                            },
                            "professional": {
                              "rest_id": "1783708321767440526",
                              "professional_type": "Business",
                              "category": [
                                {
                                  "id": 713,
                                  "name": "Science & Technology",
                                  "icon_name": "IconBriefcaseStroke"
                                }
                              ]
                            },
                            "tipjar_settings": {
                              "is_enabled": true
                            }
                          }
                        },
                        "userDisplayType": "User"
                      },
                      "clientEventInfo": {
                        "component": "BlueVerifiedFollowersSgs",
                        "element": "user"
                      }
                    }
                  },
                  {
                    "entryId": "user-1648944372489023488",
                    "sortIndex": "1811054364396093434",
                    "content": {
                      "entryType": "TimelineTimelineItem",
                      "__typename": "TimelineTimelineItem",
                      "itemContent": {
                        "itemType": "TimelineUser",
                        "__typename": "TimelineUser",
                        "user_results": {
                          "result": {
                            "__typename": "User",
                            "id": "VXNlcjoxNjQ4OTQ0MzcyNDg5MDIzNDg4",
                            "rest_id": "1648944372489023488",
                            "affiliates_highlighted_label": {},
                            "has_graduated_access": true,
                            "is_blue_verified": true,
                            "profile_image_shape": "Circle",
                            "legacy": {
                              "followed_by": true,
                              "following": true,
                              "can_dm": true,
                              "can_media_tag": true,
                              "created_at": "Thu Apr 20 06:59:52 +0000 2023",
                              "default_profile": true,
                              "default_profile_image": false,
                              "description": "Passionate about using technology to create positive change.\n#buildinpublic\n\n⚡️ https://t.co/iYg6V1cTgs (\uD83D\uDFE9 $1.1k MRR)\n\uD83D\uDCA5 https://t.co/dnZ96kPNgI (\uD83D\uDFE5 failed)",
                              "entities": {
                                "description": {
                                  "urls": [
                                    {
                                      "display_url": "animstats.com",
                                      "expanded_url": "http://animstats.com",
                                      "url": "https://t.co/iYg6V1cTgs",
                                      "indices": [80, 103]
                                    },
                                    {
                                      "display_url": "tweetloom.com",
                                      "expanded_url": "http://tweetloom.com",
                                      "url": "https://t.co/dnZ96kPNgI",
                                      "indices": [120, 143]
                                    }
                                  ]
                                },
                                "url": {
                                  "urls": [
                                    {
                                      "display_url": "audiencon.beehiiv.com",
                                      "expanded_url": "https://audiencon.beehiiv.com",
                                      "url": "https://t.co/5xa9C5n1G4",
                                      "indices": [0, 23]
                                    }
                                  ]
                                }
                              },
                              "fast_followers_count": 0,
                              "favourites_count": 50279,
                              "followers_count": 6051,
                              "friends_count": 1031,
                              "has_custom_timelines": false,
                              "is_translator": false,
                              "listed_count": 61,
                              "location": " \uD83D\uDFE9\uD83D\uDFE8⬜⬜⬜⬜⬜⬜⬜⬜ $10k MRR",
                              "media_count": 815,
                              "name": "Audiencon⚡️",
                              "normal_followers_count": 6051,
                              "pinned_tweet_ids_str": ["1664564667476320260"],
                              "possibly_sensitive": false,
                              "profile_banner_url": "https://pbs.twimg.com/profile_banners/1648944372489023488/1682087151",
                              "profile_image_url_https": "https://pbs.twimg.com/profile_images/1649411092286779393/978ESXXj_x96.jpg",
                              "profile_interstitial_type": "",
                              "screen_name": "audiencon",
                              "statuses_count": 8835,
                              "translator_type": "none",
                              "url": "https://t.co/5xa9C5n1G4",
                              "verified": false,
                              "want_retweets": true,
                              "withheld_in_countries": []
                            },
                            "tipjar_settings": {
                              "is_enabled": false
                            }
                          }
                        },
                        "userDisplayType": "User"
                      },
                      "clientEventInfo": {
                        "component": "BlueVerifiedFollowersSgs",
                        "element": "user"
                      }
                    }
                  },
                  {
                    "entryId": "user-1799131784493539329",
                    "sortIndex": "1811054364396093433",
                    "content": {
                      "entryType": "TimelineTimelineItem",
                      "__typename": "TimelineTimelineItem",
                      "itemContent": {
                        "itemType": "TimelineUser",
                        "__typename": "TimelineUser",
                        "user_results": {
                          "result": {
                            "__typename": "User",
                            "id": "VXNlcjoxNzk5MTMxNzg0NDkzNTM5MzI5",
                            "rest_id": "1799131784493539329",
                            "affiliates_highlighted_label": {},
                            "has_graduated_access": true,
                            "is_blue_verified": true,
                            "profile_image_shape": "Circle",
                            "legacy": {
                              "followed_by": true,
                              "can_dm": true,
                              "can_media_tag": true,
                              "created_at": "Fri Jun 07 17:30:34 +0000 2024",
                              "default_profile": true,
                              "default_profile_image": false,
                              "description": "AI-powered search engine for investment research",
                              "entities": {
                                "description": {
                                  "urls": []
                                },
                                "url": {
                                  "urls": [
                                    {
                                      "display_url": "onwish.ai",
                                      "expanded_url": "https://www.onwish.ai/",
                                      "url": "https://t.co/cPitzXq4Rq",
                                      "indices": [0, 23]
                                    }
                                  ]
                                }
                              },
                              "fast_followers_count": 0,
                              "favourites_count": 24,
                              "followers_count": 488,
                              "friends_count": 2066,
                              "has_custom_timelines": false,
                              "is_translator": false,
                              "listed_count": 1,
                              "location": "",
                              "media_count": 8,
                              "name": "Onwish",
                              "normal_followers_count": 488,
                              "pinned_tweet_ids_str": [],
                              "possibly_sensitive": false,
                              "profile_image_url_https": "https://pbs.twimg.com/profile_images/1799132553867304968/XXbKNPqi_x96.jpg",
                              "profile_interstitial_type": "",
                              "screen_name": "Onwish_ai",
                              "statuses_count": 14,
                              "translator_type": "none",
                              "url": "https://t.co/cPitzXq4Rq",
                              "verified": false,
                              "want_retweets": false,
                              "withheld_in_countries": []
                            },
                            "professional": {
                              "rest_id": "1802911467207114978",
                              "professional_type": "Business",
                              "category": [
                                {
                                  "id": 192,
                                  "name": "Financial Services",
                                  "icon_name": "IconBriefcaseStroke"
                                }
                              ]
                            },
                            "tipjar_settings": {}
                          }
                        },
                        "userDisplayType": "User"
                      },
                      "clientEventInfo": {
                        "component": "BlueVerifiedFollowersSgs",
                        "element": "user"
                      }
                    }
                  },
                  {
                    "entryId": "user-717142471",
                    "sortIndex": "1811054364396093432",
                    "content": {
                      "entryType": "TimelineTimelineItem",
                      "__typename": "TimelineTimelineItem",
                      "itemContent": {
                        "itemType": "TimelineUser",
                        "__typename": "TimelineUser",
                        "user_results": {
                          "result": {
                            "__typename": "User",
                            "id": "VXNlcjo3MTcxNDI0NzE=",
                            "rest_id": "717142471",
                            "affiliates_highlighted_label": {},
                            "has_graduated_access": true,
                            "is_blue_verified": true,
                            "profile_image_shape": "Circle",
                            "legacy": {
                              "followed_by": true,
                              "following": true,
                              "can_dm": true,
                              "can_media_tag": true,
                              "created_at": "Thu Jul 26 01:32:13 +0000 2012",
                              "default_profile": true,
                              "default_profile_image": false,
                              "description": "Prompt Engineer | 产品 + 设计 + 编码 | \uD83C\uDFAF Focus： AI 玩法分享 | 智能分析和可视化 | \uD83D\uDCD6 极客时间专栏《零基础 GPT 应用入门课》",
                              "entities": {
                                "description": {
                                  "urls": []
                                }
                              },
                              "fast_followers_count": 0,
                              "favourites_count": 3577,
                              "followers_count": 4237,
                              "friends_count": 394,
                              "has_custom_timelines": false,
                              "is_translator": false,
                              "listed_count": 67,
                              "location": "China",
                              "media_count": 531,
                              "name": "\uD835\uDCD9\uD835\uDCEE\uD835\uDCFB\uD835\uDCDB\uD835\uDCF2\uD835\uDCF7",
                              "normal_followers_count": 4237,
                              "pinned_tweet_ids_str": [],
                              "possibly_sensitive": false,
                              "profile_banner_url": "https://pbs.twimg.com/profile_banners/717142471/1705931817",
                              "profile_image_url_https": "https://pbs.twimg.com/profile_images/1657358662061658112/dPPwghCd_x96.jpg",
                              "profile_interstitial_type": "",
                              "screen_name": "eviljer",
                              "statuses_count": 1438,
                              "translator_type": "none",
                              "verified": false,
                              "want_retweets": true,
                              "withheld_in_countries": []
                            },
                            "professional": {
                              "rest_id": "1779236351290098052",
                              "professional_type": "Creator",
                              "category": [
                                {
                                  "id": 713,
                                  "name": "Science & Technology",
                                  "icon_name": "IconBriefcaseStroke"
                                }
                              ]
                            },
                            "tipjar_settings": {
                              "is_enabled": true
                            }
                          }
                        },
                        "userDisplayType": "User"
                      },
                      "clientEventInfo": {
                        "component": "BlueVerifiedFollowersSgs",
                        "element": "user"
                      }
                    }
                  },
                  {
                    "entryId": "user-1413340227687571456",
                    "sortIndex": "1811054364396093431",
                    "content": {
                      "entryType": "TimelineTimelineItem",
                      "__typename": "TimelineTimelineItem",
                      "itemContent": {
                        "itemType": "TimelineUser",
                        "__typename": "TimelineUser",
                        "user_results": {
                          "result": {
                            "__typename": "User",
                            "id": "VXNlcjoxNDEzMzQwMjI3Njg3NTcxNDU2",
                            "rest_id": "1413340227687571456",
                            "affiliates_highlighted_label": {},
                            "has_graduated_access": true,
                            "is_blue_verified": true,
                            "profile_image_shape": "Circle",
                            "legacy": {
                              "followed_by": true,
                              "following": true,
                              "can_dm": true,
                              "can_media_tag": true,
                              "created_at": "Fri Jul 09 03:32:38 +0000 2021",
                              "default_profile": true,
                              "default_profile_image": false,
                              "description": "\uD83E\uDDBE INTJ/ENTJ 间左右横跳的莫得感情的执行机器 \n\uD83C\uDF0E En @lycfyi \n⛴️ Founder of @chuhaiqu\n\uD83C\uDFA8 Angel Investor & ex-CTO of Sequoia-backed Start-up \n\uD83E\uDD16 ex-Staff ML Engineer\n\uD83D\uDCCD 现居 Boston",
                              "entities": {
                                "description": {
                                  "urls": []
                                },
                                "url": {
                                  "urls": [
                                    {
                                      "display_url": "link.lyc.fyi/portfolio",
                                      "expanded_url": "https://link.lyc.fyi/portfolio",
                                      "url": "https://t.co/msO3kbHObR",
                                      "indices": [0, 23]
                                    }
                                  ]
                                }
                              },
                              "fast_followers_count": 0,
                              "favourites_count": 3131,
                              "followers_count": 5746,
                              "friends_count": 1233,
                              "has_custom_timelines": true,
                              "is_translator": false,
                              "listed_count": 66,
                              "location": "出海孵化器 \uD83D\uDE80 ❖❖❖◇◇◇◇◇◇◇ 100",
                              "media_count": 486,
                              "name": "YL (Yucheng Liu)",
                              "normal_followers_count": 5746,
                              "pinned_tweet_ids_str": ["1803803344588157286"],
                              "possibly_sensitive": false,
                              "profile_banner_url": "https://pbs.twimg.com/profile_banners/1413340227687571456/1712149877",
                              "profile_image_url_https": "https://pbs.twimg.com/profile_images/1804221360907894784/MBHxAzRf_x96.jpg",
                              "profile_interstitial_type": "",
                              "screen_name": "lyc_zh",
                              "statuses_count": 2715,
                              "translator_type": "none",
                              "url": "https://t.co/msO3kbHObR",
                              "verified": false,
                              "want_retweets": true,
                              "withheld_in_countries": []
                            },
                            "professional": {
                              "rest_id": "1621169595204734979",
                              "professional_type": "Creator",
                              "category": [
                                {
                                  "id": 1009,
                                  "name": "Community",
                                  "icon_name": "IconBriefcaseStroke"
                                }
                              ]
                            },
                            "tipjar_settings": {
                              "is_enabled": true
                            }
                          }
                        },
                        "userDisplayType": "User"
                      },
                      "clientEventInfo": {
                        "component": "BlueVerifiedFollowersSgs",
                        "element": "user"
                      }
                    }
                  },
                  {
                    "entryId": "user-18896395",
                    "sortIndex": "1811054364396093430",
                    "content": {
                      "entryType": "TimelineTimelineItem",
                      "__typename": "TimelineTimelineItem",
                      "itemContent": {
                        "itemType": "TimelineUser",
                        "__typename": "TimelineUser",
                        "user_results": {
                          "result": {
                            "__typename": "User",
                            "id": "VXNlcjoxODg5NjM5NQ==",
                            "rest_id": "18896395",
                            "affiliates_highlighted_label": {},
                            "has_graduated_access": true,
                            "is_blue_verified": true,
                            "profile_image_shape": "Circle",
                            "legacy": {
                              "followed_by": true,
                              "following": true,
                              "can_dm": true,
                              "can_media_tag": true,
                              "created_at": "Mon Jan 12 09:29:14 +0000 2009",
                              "default_profile": true,
                              "default_profile_image": false,
                              "description": "专注于Web前端和移动端的自由职业程序员。\n\uD83D\uDCB0热爱远程工作的数字游民生活\n\uD83D\uDE9A开房车走遍了中国33省160城\n\uD83E\uDD17目前在泰国清迈生活\n\n英文推：@imdashuai\n\n\uD83D\uDCB0https://t.co/AGJB2sbNcv\n\uD83C\uDFAA@thesoulsland\n\uD83D\uDCA1@theawesomesites\n\n公众号同名",
                              "entities": {
                                "description": {
                                  "urls": [
                                    {
                                      "display_url": "spherevegas.online",
                                      "expanded_url": "http://spherevegas.online",
                                      "url": "https://t.co/AGJB2sbNcv",
                                      "indices": [83, 106]
                                    }
                                  ]
                                },
                                "url": {
                                  "urls": [
                                    {
                                      "display_url": "desktop.dashu.ai",
                                      "expanded_url": "https://desktop.dashu.ai/",
                                      "url": "https://t.co/8rizAAZWqM",
                                      "indices": [0, 23]
                                    }
                                  ]
                                }
                              },
                              "fast_followers_count": 0,
                              "favourites_count": 330,
                              "followers_count": 14114,
                              "friends_count": 424,
                              "has_custom_timelines": false,
                              "is_translator": false,
                              "listed_count": 110,
                              "location": "大帅的云桌面\uD83D\uDC49\uD83C\uDFFB",
                              "media_count": 511,
                              "name": "大帅老猿",
                              "normal_followers_count": 14114,
                              "pinned_tweet_ids_str": ["1763538685159465250"],
                              "possibly_sensitive": false,
                              "profile_banner_url": "https://pbs.twimg.com/profile_banners/18896395/1700505811",
                              "profile_image_url_https": "https://pbs.twimg.com/profile_images/687927732311863297/iJSmNFUt_x96.jpg",
                              "profile_interstitial_type": "",
                              "screen_name": "ezshine",
                              "statuses_count": 2717,
                              "translator_type": "none",
                              "url": "https://t.co/8rizAAZWqM",
                              "verified": false,
                              "want_retweets": true,
                              "withheld_in_countries": []
                            },
                            "professional": {
                              "rest_id": "1773570171074154872",
                              "professional_type": "Creator",
                              "category": []
                            },
                            "tipjar_settings": {}
                          }
                        },
                        "userDisplayType": "User"
                      },
                      "clientEventInfo": {
                        "component": "BlueVerifiedFollowersSgs",
                        "element": "user"
                      }
                    }
                  },
                  {
                    "entryId": "user-3122661542",
                    "sortIndex": "1811054364396093429",
                    "content": {
                      "entryType": "TimelineTimelineItem",
                      "__typename": "TimelineTimelineItem",
                      "itemContent": {
                        "itemType": "TimelineUser",
                        "__typename": "TimelineUser",
                        "user_results": {
                          "result": {
                            "__typename": "User",
                            "id": "VXNlcjozMTIyNjYxNTQy",
                            "rest_id": "3122661542",
                            "affiliates_highlighted_label": {},
                            "has_graduated_access": true,
                            "is_blue_verified": true,
                            "profile_image_shape": "Circle",
                            "legacy": {
                              "followed_by": true,
                              "following": true,
                              "can_dm": true,
                              "can_media_tag": false,
                              "created_at": "Wed Apr 01 03:00:40 +0000 2015",
                              "default_profile": true,
                              "default_profile_image": false,
                              "description": "分享AI与增长获客的见闻\n英推主要分享海外产品@yangyi_xxxx",
                              "entities": {
                                "description": {
                                  "urls": []
                                },
                                "url": {
                                  "urls": [
                                    {
                                      "display_url": "jingle.bio/yangyi",
                                      "expanded_url": "http://jingle.bio/yangyi",
                                      "url": "https://t.co/bIMbKcNfk5",
                                      "indices": [0, 23]
                                    }
                                  ]
                                }
                              },
                              "fast_followers_count": 0,
                              "favourites_count": 1816,
                              "followers_count": 30647,
                              "friends_count": 324,
                              "has_custom_timelines": false,
                              "is_translator": false,
                              "listed_count": 331,
                              "location": "",
                              "media_count": 503,
                              "name": "\uD835\uDCE8\uD835\uDCEA\uD835\uDCF7\uD835\uDCF0\uD835\uDD02\uD835\uDCF2",
                              "normal_followers_count": 30647,
                              "pinned_tweet_ids_str": ["1791768612086354425"],
                              "possibly_sensitive": false,
                              "profile_banner_url": "https://pbs.twimg.com/profile_banners/3122661542/1702609915",
                              "profile_image_url_https": "https://pbs.twimg.com/profile_images/1790540021327712256/72wMFr9-_x96.jpg",
                              "profile_interstitial_type": "",
                              "screen_name": "Yangyixxxx",
                              "statuses_count": 4248,
                              "translator_type": "none",
                              "url": "https://t.co/bIMbKcNfk5",
                              "verified": false,
                              "want_retweets": true,
                              "withheld_in_countries": []
                            },
                            "professional": {
                              "rest_id": "1740381499894157456",
                              "professional_type": "Creator",
                              "category": [
                                {
                                  "id": 713,
                                  "name": "Science & Technology",
                                  "icon_name": "IconBriefcaseStroke"
                                }
                              ]
                            },
                            "tipjar_settings": {
                              "is_enabled": true
                            }
                          }
                        },
                        "userDisplayType": "User"
                      },
                      "clientEventInfo": {
                        "component": "BlueVerifiedFollowersSgs",
                        "element": "user"
                      }
                    }
                  },
                  {
                    "entryId": "user-1400764228244590595",
                    "sortIndex": "1811054364396093428",
                    "content": {
                      "entryType": "TimelineTimelineItem",
                      "__typename": "TimelineTimelineItem",
                      "itemContent": {
                        "itemType": "TimelineUser",
                        "__typename": "TimelineUser",
                        "user_results": {
                          "result": {
                            "__typename": "User",
                            "id": "VXNlcjoxNDAwNzY0MjI4MjQ0NTkwNTk1",
                            "rest_id": "1400764228244590595",
                            "affiliates_highlighted_label": {},
                            "has_graduated_access": true,
                            "is_blue_verified": true,
                            "profile_image_shape": "Circle",
                            "legacy": {
                              "followed_by": true,
                              "following": true,
                              "can_dm": true,
                              "can_media_tag": true,
                              "created_at": "Fri Jun 04 10:40:02 +0000 2021",
                              "default_profile": true,
                              "default_profile_image": false,
                              "description": "我的奮鬥，一個中國農村小伙的自我救贖。YouTube頻道：https://t.co/VptwKPmzPQ",
                              "entities": {
                                "description": {
                                  "urls": [
                                    {
                                      "display_url": "youtube.com/@zaiyeshuo",
                                      "expanded_url": "http://youtube.com/@zaiyeshuo",
                                      "url": "https://t.co/VptwKPmzPQ",
                                      "indices": [29, 52]
                                    }
                                  ]
                                }
                              },
                              "fast_followers_count": 0,
                              "favourites_count": 290,
                              "followers_count": 1053,
                              "friends_count": 447,
                              "has_custom_timelines": true,
                              "is_translator": false,
                              "listed_count": 4,
                              "location": "Osaka-fu, Japan",
                              "media_count": 38,
                              "name": "在野說",
                              "normal_followers_count": 1053,
                              "pinned_tweet_ids_str": ["1418849587717197838"],
                              "possibly_sensitive": false,
                              "profile_banner_url": "https://pbs.twimg.com/profile_banners/1400764228244590595/1693403206",
                              "profile_image_url_https": "https://pbs.twimg.com/profile_images/1696882144411373568/5WWRzpIb_x96.jpg",
                              "profile_interstitial_type": "",
                              "screen_name": "zaiyeshuo",
                              "statuses_count": 440,
                              "translator_type": "none",
                              "verified": false,
                              "want_retweets": true,
                              "withheld_in_countries": []
                            },
                            "tipjar_settings": {
                              "is_enabled": true
                            }
                          }
                        },
                        "userDisplayType": "User"
                      },
                      "clientEventInfo": {
                        "component": "BlueVerifiedFollowersSgs",
                        "element": "user"
                      }
                    }
                  },
                  {
                    "entryId": "user-796520748961697794",
                    "sortIndex": "1811054364396093427",
                    "content": {
                      "entryType": "TimelineTimelineItem",
                      "__typename": "TimelineTimelineItem",
                      "itemContent": {
                        "itemType": "TimelineUser",
                        "__typename": "TimelineUser",
                        "user_results": {
                          "result": {
                            "__typename": "User",
                            "id": "VXNlcjo3OTY1MjA3NDg5NjE2OTc3OTQ=",
                            "rest_id": "796520748961697794",
                            "affiliates_highlighted_label": {},
                            "has_graduated_access": true,
                            "is_blue_verified": true,
                            "profile_image_shape": "Circle",
                            "legacy": {
                              "followed_by": true,
                              "following": true,
                              "can_dm": true,
                              "can_media_tag": true,
                              "created_at": "Thu Nov 10 01:12:00 +0000 2016",
                              "default_profile": true,
                              "default_profile_image": false,
                              "description": "Building \uD83E\uDD2F https://t.co/ssgC9x0kMc\nAI / OSS",
                              "entities": {
                                "description": {
                                  "urls": [
                                    {
                                      "display_url": "getshortcuts.ai",
                                      "expanded_url": "https://getshortcuts.ai",
                                      "url": "https://t.co/ssgC9x0kMc",
                                      "indices": [11, 34]
                                    }
                                  ]
                                },
                                "url": {
                                  "urls": [
                                    {
                                      "display_url": "getshortcuts.ai",
                                      "expanded_url": "https://getshortcuts.ai",
                                      "url": "https://t.co/ssgC9x0kMc",
                                      "indices": [0, 23]
                                    }
                                  ]
                                }
                              },
                              "fast_followers_count": 0,
                              "favourites_count": 355,
                              "followers_count": 514,
                              "friends_count": 557,
                              "has_custom_timelines": true,
                              "is_translator": false,
                              "listed_count": 2,
                              "location": "Try \uD83D\uDC49\uD83C\uDFFB",
                              "media_count": 57,
                              "name": "Shadow Walker",
                              "normal_followers_count": 514,
                              "pinned_tweet_ids_str": ["1801367884490543169"],
                              "possibly_sensitive": false,
                              "profile_banner_url": "https://pbs.twimg.com/profile_banners/796520748961697794/1706518462",
                              "profile_image_url_https": "https://pbs.twimg.com/profile_images/1751891919117139968/zd2-HeOy_x96.jpg",
                              "profile_interstitial_type": "",
                              "screen_name": "DavidWShadow",
                              "statuses_count": 662,
                              "translator_type": "none",
                              "url": "https://t.co/ssgC9x0kMc",
                              "verified": false,
                              "want_retweets": true,
                              "withheld_in_countries": []
                            },
                            "tipjar_settings": {}
                          }
                        },
                        "userDisplayType": "User"
                      },
                      "clientEventInfo": {
                        "component": "BlueVerifiedFollowersSgs",
                        "element": "user"
                      }
                    }
                  },
                  {
                    "entryId": "user-1379446206875627522",
                    "sortIndex": "1811054364396093426",
                    "content": {
                      "entryType": "TimelineTimelineItem",
                      "__typename": "TimelineTimelineItem",
                      "itemContent": {
                        "itemType": "TimelineUser",
                        "__typename": "TimelineUser",
                        "user_results": {
                          "result": {
                            "__typename": "User",
                            "id": "VXNlcjoxMzc5NDQ2MjA2ODc1NjI3NTIy",
                            "rest_id": "1379446206875627522",
                            "affiliates_highlighted_label": {},
                            "has_graduated_access": true,
                            "is_blue_verified": true,
                            "profile_image_shape": "Circle",
                            "legacy": {
                              "followed_by": true,
                              "following": true,
                              "can_dm": true,
                              "can_media_tag": true,
                              "created_at": "Tue Apr 06 14:50:07 +0000 2021",
                              "default_profile": true,
                              "default_profile_image": false,
                              "description": "Indie Developer",
                              "entities": {
                                "description": {
                                  "urls": []
                                }
                              },
                              "fast_followers_count": 0,
                              "favourites_count": 73,
                              "followers_count": 11017,
                              "friends_count": 480,
                              "has_custom_timelines": false,
                              "is_translator": false,
                              "listed_count": 0,
                              "location": "",
                              "media_count": 6,
                              "name": "find out",
                              "normal_followers_count": 11017,
                              "pinned_tweet_ids_str": [],
                              "possibly_sensitive": false,
                              "profile_image_url_https": "https://pbs.twimg.com/profile_images/1782479618286698496/6fnmk24m_x96.jpg",
                              "profile_interstitial_type": "",
                              "screen_name": "findout19119740",
                              "statuses_count": 116,
                              "translator_type": "none",
                              "verified": false,
                              "want_retweets": true,
                              "withheld_in_countries": []
                            },
                            "tipjar_settings": {}
                          }
                        },
                        "userDisplayType": "User"
                      },
                      "clientEventInfo": {
                        "component": "BlueVerifiedFollowersSgs",
                        "element": "user"
                      }
                    }
                  },
                  {
                    "entryId": "user-11471612",
                    "sortIndex": "1811054364396093425",
                    "content": {
                      "entryType": "TimelineTimelineItem",
                      "__typename": "TimelineTimelineItem",
                      "itemContent": {
                        "itemType": "TimelineUser",
                        "__typename": "TimelineUser",
                        "user_results": {
                          "result": {
                            "__typename": "User",
                            "id": "VXNlcjoxMTQ3MTYxMg==",
                            "rest_id": "11471612",
                            "affiliates_highlighted_label": {},
                            "has_graduated_access": true,
                            "is_blue_verified": true,
                            "profile_image_shape": "Circle",
                            "legacy": {
                              "followed_by": true,
                              "following": true,
                              "can_dm": true,
                              "can_media_tag": true,
                              "created_at": "Mon Dec 24 07:13:39 +0000 2007",
                              "default_profile": false,
                              "default_profile_image": false,
                              "description": "25+ Years building tech businesses. Helping entrepreneurs use the right tools to grow and scale their businesses.",
                              "entities": {
                                "description": {
                                  "urls": []
                                },
                                "url": {
                                  "urls": [
                                    {
                                      "display_url": "shawnjooste.com",
                                      "expanded_url": "http://www.shawnjooste.com",
                                      "url": "https://t.co/mWrPEh12Sj",
                                      "indices": [0, 23]
                                    }
                                  ]
                                }
                              },
                              "fast_followers_count": 0,
                              "favourites_count": 2986,
                              "followers_count": 2443,
                              "friends_count": 1007,
                              "has_custom_timelines": true,
                              "is_translator": false,
                              "listed_count": 58,
                              "location": "Cape Town",
                              "media_count": 2180,
                              "name": "Shawn Jooste",
                              "normal_followers_count": 2443,
                              "pinned_tweet_ids_str": [],
                              "possibly_sensitive": false,
                              "profile_banner_url": "https://pbs.twimg.com/profile_banners/11471612/1570251378",
                              "profile_image_url_https": "https://pbs.twimg.com/profile_images/1790499003982909440/ZznRI5rH_x96.jpg",
                              "profile_interstitial_type": "",
                              "screen_name": "shawnjooste",
                              "statuses_count": 37962,
                              "translator_type": "none",
                              "url": "https://t.co/mWrPEh12Sj",
                              "verified": false,
                              "want_retweets": true,
                              "withheld_in_countries": []
                            },
                            "professional": {
                              "rest_id": "1540622608948936705",
                              "professional_type": "Creator",
                              "category": [
                                {
                                  "id": 713,
                                  "name": "Science & Technology",
                                  "icon_name": "IconBriefcaseStroke"
                                }
                              ]
                            },
                            "tipjar_settings": {}
                          }
                        },
                        "userDisplayType": "User"
                      },
                      "clientEventInfo": {
                        "component": "BlueVerifiedFollowersSgs",
                        "element": "user"
                      }
                    }
                  },
                  {
                    "entryId": "user-382673585",
                    "sortIndex": "1811054364396093424",
                    "content": {
                      "entryType": "TimelineTimelineItem",
                      "__typename": "TimelineTimelineItem",
                      "itemContent": {
                        "itemType": "TimelineUser",
                        "__typename": "TimelineUser",
                        "user_results": {
                          "result": {
                            "__typename": "User",
                            "id": "VXNlcjozODI2NzM1ODU=",
                            "rest_id": "382673585",
                            "affiliates_highlighted_label": {},
                            "has_graduated_access": true,
                            "is_blue_verified": true,
                            "profile_image_shape": "Circle",
                            "legacy": {
                              "followed_by": true,
                              "following": true,
                              "can_dm": true,
                              "can_media_tag": false,
                              "created_at": "Fri Sep 30 13:56:03 +0000 2011",
                              "default_profile": false,
                              "default_profile_image": false,
                              "description": "科技爱好者｜五星评论家｜热点图捕手｜INFJ 提倡者｜ 擅长话题：科技 / 营销 / 产品 / 副业 / 互联网等｜ 关注理念：不看粉丝只看价值。 关注我获得一个有趣的 \uD835\uDD4F 友。",
                              "entities": {
                                "description": {
                                  "urls": []
                                },
                                "url": {
                                  "urls": [
                                    {
                                      "display_url": "x.com/i/communities/…",
                                      "expanded_url": "https://x.com/i/communities/1517247024458244096",
                                      "url": "https://t.co/fuHKb0B5w3",
                                      "indices": [0, 23]
                                    }
                                  ]
                                }
                              },
                              "fast_followers_count": 0,
                              "favourites_count": 2831,
                              "followers_count": 5137,
                              "friends_count": 346,
                              "has_custom_timelines": false,
                              "is_translator": false,
                              "listed_count": 30,
                              "location": "日本",
                              "media_count": 868,
                              "name": "\uD83D\uDD30桃子队长",
                              "normal_followers_count": 5137,
                              "pinned_tweet_ids_str": [],
                              "possibly_sensitive": false,
                              "profile_banner_url": "https://pbs.twimg.com/profile_banners/382673585/1715012963",
                              "profile_image_url_https": "https://pbs.twimg.com/profile_images/1450481288696107009/dWF5B1Gy_x96.jpg",
                              "profile_interstitial_type": "",
                              "screen_name": "TH9521",
                              "statuses_count": 5156,
                              "translator_type": "none",
                              "url": "https://t.co/fuHKb0B5w3",
                              "verified": false,
                              "want_retweets": true,
                              "withheld_in_countries": []
                            },
                            "professional": {
                              "rest_id": "1489236969268064265",
                              "professional_type": "Creator",
                              "category": [
                                {
                                  "id": 713,
                                  "name": "Science & Technology",
                                  "icon_name": "IconBriefcaseStroke"
                                }
                              ]
                            },
                            "tipjar_settings": {
                              "is_enabled": false
                            }
                          }
                        },
                        "userDisplayType": "User"
                      },
                      "clientEventInfo": {
                        "component": "BlueVerifiedFollowersSgs",
                        "element": "user"
                      }
                    }
                  },
                  {
                    "entryId": "user-2365702494",
                    "sortIndex": "1811054364396093423",
                    "content": {
                      "entryType": "TimelineTimelineItem",
                      "__typename": "TimelineTimelineItem",
                      "itemContent": {
                        "itemType": "TimelineUser",
                        "__typename": "TimelineUser",
                        "user_results": {
                          "result": {
                            "__typename": "User",
                            "id": "VXNlcjoyMzY1NzAyNDk0",
                            "rest_id": "2365702494",
                            "affiliates_highlighted_label": {},
                            "has_graduated_access": true,
                            "is_blue_verified": true,
                            "profile_image_shape": "Circle",
                            "legacy": {
                              "followed_by": true,
                              "following": true,
                              "can_dm": true,
                              "can_media_tag": true,
                              "created_at": "Fri Feb 28 14:43:16 +0000 2014",
                              "default_profile": true,
                              "default_profile_image": false,
                              "description": "我相信：创作带来自由 | 做过独立开发者，并赚到钱| 长期的生产力工具内容作者，6年+ | 为 xmind，sspai 等 提供专业咨询服务 | 一些出海AI项目的联创 | 故事很多，愿结交天下有趣的灵魂",
                              "entities": {
                                "description": {
                                  "urls": []
                                },
                                "url": {
                                  "urls": [
                                    {
                                      "display_url": "xlrocket.blog",
                                      "expanded_url": "http://xlrocket.blog",
                                      "url": "https://t.co/iek5XbyDvO",
                                      "indices": [0, 23]
                                    }
                                  ]
                                }
                              },
                              "fast_followers_count": 0,
                              "favourites_count": 478,
                              "followers_count": 809,
                              "friends_count": 824,
                              "has_custom_timelines": false,
                              "is_translator": false,
                              "listed_count": 6,
                              "location": "上海",
                              "media_count": 13,
                              "name": "火箭君 CC",
                              "normal_followers_count": 809,
                              "pinned_tweet_ids_str": [],
                              "possibly_sensitive": false,
                              "profile_banner_url": "https://pbs.twimg.com/profile_banners/2365702494/1702711457",
                              "profile_image_url_https": "https://pbs.twimg.com/profile_images/1735923539830804480/9Qc7htqb_x96.jpg",
                              "profile_interstitial_type": "",
                              "screen_name": "CurtisChengC",
                              "statuses_count": 887,
                              "translator_type": "none",
                              "url": "https://t.co/iek5XbyDvO",
                              "verified": false,
                              "want_retweets": true,
                              "withheld_in_countries": []
                            },
                            "tipjar_settings": {}
                          }
                        },
                        "userDisplayType": "User"
                      },
                      "clientEventInfo": {
                        "component": "BlueVerifiedFollowersSgs",
                        "element": "user"
                      }
                    }
                  },
                  {
                    "entryId": "user-45327059",
                    "sortIndex": "1811054364396093422",
                    "content": {
                      "entryType": "TimelineTimelineItem",
                      "__typename": "TimelineTimelineItem",
                      "itemContent": {
                        "itemType": "TimelineUser",
                        "__typename": "TimelineUser",
                        "user_results": {
                          "result": {
                            "__typename": "User",
                            "id": "VXNlcjo0NTMyNzA1OQ==",
                            "rest_id": "45327059",
                            "affiliates_highlighted_label": {},
                            "has_graduated_access": true,
                            "is_blue_verified": true,
                            "profile_image_shape": "Circle",
                            "legacy": {
                              "followed_by": true,
                              "following": true,
                              "can_dm": true,
                              "can_media_tag": true,
                              "created_at": "Sun Jun 07 11:56:13 +0000 2009",
                              "default_profile": false,
                              "default_profile_image": false,
                              "description": "| The Founder Buidling $HOPE (@hope_money_) - Next Gen Money | 我心光明 #HOPE the #LIGHT be with you! | \uD83D\uDD17 https://t.co/8unpSmqQqC",
                              "entities": {
                                "description": {
                                  "urls": [
                                    {
                                      "display_url": "linktr.ee/hope.money",
                                      "expanded_url": "http://linktr.ee/hope.money",
                                      "url": "https://t.co/8unpSmqQqC",
                                      "indices": [102, 125]
                                    }
                                  ]
                                },
                                "url": {
                                  "urls": [
                                    {
                                      "display_url": "hope.money",
                                      "expanded_url": "https://hope.money/",
                                      "url": "https://t.co/rfTdxsuIFB",
                                      "indices": [0, 23]
                                    }
                                  ]
                                }
                              },
                              "fast_followers_count": 0,
                              "favourites_count": 3114,
                              "followers_count": 5099,
                              "friends_count": 2230,
                              "has_custom_timelines": true,
                              "is_translator": false,
                              "listed_count": 53,
                              "location": "#lighthouse@sg",
                              "media_count": 519,
                              "name": "Flex \uD83C\uDF15 Moonman",
                              "normal_followers_count": 5099,
                              "pinned_tweet_ids_str": [],
                              "possibly_sensitive": false,
                              "profile_banner_url": "https://pbs.twimg.com/profile_banners/45327059/1678902910",
                              "profile_image_url_https": "https://pbs.twimg.com/profile_images/1801524449872879616/o77YOg8R_x96.jpg",
                              "profile_interstitial_type": "",
                              "screen_name": "HopeMoonman",
                              "statuses_count": 6974,
                              "translator_type": "none",
                              "url": "https://t.co/rfTdxsuIFB",
                              "verified": false,
                              "want_retweets": true,
                              "withheld_in_countries": []
                            },
                            "professional": {
                              "rest_id": "1610790658641661952",
                              "professional_type": "Creator",
                              "category": [
                                {
                                  "id": 713,
                                  "name": "Science & Technology",
                                  "icon_name": "IconBriefcaseStroke"
                                }
                              ]
                            },
                            "tipjar_settings": {}
                          }
                        },
                        "userDisplayType": "User"
                      },
                      "clientEventInfo": {
                        "component": "BlueVerifiedFollowersSgs",
                        "element": "user"
                      }
                    }
                  },
                  {
                    "entryId": "user-841921201534586880",
                    "sortIndex": "1811054364396093421",
                    "content": {
                      "entryType": "TimelineTimelineItem",
                      "__typename": "TimelineTimelineItem",
                      "itemContent": {
                        "itemType": "TimelineUser",
                        "__typename": "TimelineUser",
                        "user_results": {
                          "result": {
                            "__typename": "User",
                            "id": "VXNlcjo4NDE5MjEyMDE1MzQ1ODY4ODA=",
                            "rest_id": "841921201534586880",
                            "affiliates_highlighted_label": {},
                            "has_graduated_access": true,
                            "is_blue_verified": true,
                            "profile_image_shape": "Circle",
                            "legacy": {
                              "followed_by": true,
                              "following": true,
                              "can_dm": true,
                              "can_media_tag": true,
                              "created_at": "Wed Mar 15 07:57:11 +0000 2017",
                              "default_profile": false,
                              "default_profile_image": false,
                              "description": "\uD83D\uDEF8https://t.co/mQAprLcd4d\n\uD83D\uDCB8 https://t.co/Y3Idnzhj7w\n\uD83D\uDCD6 https://t.co/78yRfLmwaE\n\uD83D\uDE4A /r/BootstrappedSaaS/\n\nMade @unicornplatform (acq'd for $0.8M by @marsxdev). \nYoutuber.\nI have autism.",
                              "entities": {
                                "description": {
                                  "urls": [
                                    {
                                      "display_url": "paracast.io",
                                      "expanded_url": "http://paracast.io",
                                      "url": "https://t.co/mQAprLcd4d",
                                      "indices": [1, 24]
                                    },
                                    {
                                      "display_url": "acquire.website",
                                      "expanded_url": "http://acquire.website",
                                      "url": "https://t.co/Y3Idnzhj7w",
                                      "indices": [27, 50]
                                    },
                                    {
                                      "display_url": "startupswiki.org",
                                      "expanded_url": "http://startupswiki.org",
                                      "url": "https://t.co/78yRfLmwaE",
                                      "indices": [53, 76]
                                    }
                                  ]
                                },
                                "url": {
                                  "urls": [
                                    {
                                      "display_url": "isora.me/bio/",
                                      "expanded_url": "https://isora.me/bio/",
                                      "url": "https://t.co/4x26ppYToG",
                                      "indices": [0, 23]
                                    }
                                  ]
                                }
                              },
                              "fast_followers_count": 0,
                              "favourites_count": 7361,
                              "followers_count": 4039,
                              "friends_count": 1001,
                              "has_custom_timelines": false,
                              "is_translator": false,
                              "listed_count": 44,
                              "location": "\uD835\uDD4F",
                              "media_count": 380,
                              "name": "Alexander Isora \uD83D\uDC7D",
                              "normal_followers_count": 4039,
                              "pinned_tweet_ids_str": ["1790944951955505491"],
                              "possibly_sensitive": false,
                              "profile_banner_url": "https://pbs.twimg.com/profile_banners/841921201534586880/1714373315",
                              "profile_image_url_https": "https://pbs.twimg.com/profile_images/1780068887465238528/HmTP8z2Y_x96.jpg",
                              "profile_interstitial_type": "",
                              "screen_name": "alexanderisorax",
                              "statuses_count": 2840,
                              "translator_type": "none",
                              "url": "https://t.co/4x26ppYToG",
                              "verified": false,
                              "want_retweets": true,
                              "withheld_in_countries": []
                            },
                            "tipjar_settings": {}
                          }
                        },
                        "userDisplayType": "User"
                      },
                      "clientEventInfo": {
                        "component": "BlueVerifiedFollowersSgs",
                        "element": "user"
                      }
                    }
                  },
                  {
                    "entryId": "cursor-bottom-1811054364396093420",
                    "sortIndex": "1811054364396093420",
                    "content": {
                      "entryType": "TimelineTimelineCursor",
                      "__typename": "TimelineTimelineCursor",
                      "value": "1802385439786851299|1811054364396093418",
                      "cursorType": "Bottom"
                    }
                  },
                  {
                    "entryId": "cursor-top-1811054364396093441",
                    "sortIndex": "1811054364396093441",
                    "content": {
                      "entryType": "TimelineTimelineCursor",
                      "__typename": "TimelineTimelineCursor",
                      "value": "-1|1811054364396093441",
                      "cursorType": "Top"
                    }
                  }
                ]
              }
            ]
          }
        }
      }
    }
  }
}
```
