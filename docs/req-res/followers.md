```js
fetch(
  'https://x.com/i/api/graphql/bTRZD3w3wQv72oNU3lV6Rw/Followers?variables=%7B%22userId%22%3A%222751923820%22%2C%22count%22%3A20%2C%22includePromotedContent%22%3Afalse%7D&features=%7B%22rweb_tipjar_consumption_enabled%22%3Atrue%2C%22responsive_web_graphql_exclude_directive_enabled%22%3Atrue%2C%22verified_phone_label_enabled%22%3Afalse%2C%22creator_subscriptions_tweet_preview_api_enabled%22%3Atrue%2C%22responsive_web_graphql_timeline_navigation_enabled%22%3Atrue%2C%22responsive_web_graphql_skip_user_profile_image_extensions_enabled%22%3Afalse%2C%22communities_web_enable_tweet_community_results_fetch%22%3Atrue%2C%22c9s_tweet_anatomy_moderator_badge_enabled%22%3Atrue%2C%22articles_preview_enabled%22%3Atrue%2C%22tweetypie_unmention_optimization_enabled%22%3Atrue%2C%22responsive_web_edit_tweet_api_enabled%22%3Atrue%2C%22graphql_is_translatable_rweb_tweet_is_translatable_enabled%22%3Atrue%2C%22view_counts_everywhere_api_enabled%22%3Atrue%2C%22longform_notetweets_consumption_enabled%22%3Atrue%2C%22responsive_web_twitter_article_tweet_consumption_enabled%22%3Atrue%2C%22tweet_awards_web_tipping_enabled%22%3Afalse%2C%22creator_subscriptions_quote_tweet_preview_enabled%22%3Afalse%2C%22freedom_of_speech_not_reach_fetch_enabled%22%3Atrue%2C%22standardized_nudges_misinfo%22%3Atrue%2C%22tweet_with_visibility_results_prefer_gql_limited_actions_policy_enabled%22%3Atrue%2C%22rweb_video_timestamps_enabled%22%3Atrue%2C%22longform_notetweets_rich_text_read_enabled%22%3Atrue%2C%22longform_notetweets_inline_media_enabled%22%3Atrue%2C%22responsive_web_enhance_cards_enabled%22%3Afalse%7D',
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
                    "entryId": "user-878285982092546048",
                    "sortIndex": "1811053341308878848",
                    "content": {
                      "entryType": "TimelineTimelineItem",
                      "__typename": "TimelineTimelineItem",
                      "itemContent": {
                        "itemType": "TimelineUser",
                        "__typename": "TimelineUser",
                        "user_results": {
                          "result": {
                            "__typename": "User",
                            "id": "VXNlcjo4NzgyODU5ODIwOTI1NDYwNDg=",
                            "rest_id": "878285982092546048",
                            "affiliates_highlighted_label": {},
                            "has_graduated_access": true,
                            "is_blue_verified": false,
                            "profile_image_shape": "Circle",
                            "legacy": {
                              "followed_by": true,
                              "can_dm": true,
                              "can_media_tag": true,
                              "created_at": "Fri Jun 23 16:17:50 +0000 2017",
                              "default_profile": true,
                              "default_profile_image": false,
                              "description": "",
                              "entities": {
                                "description": {
                                  "urls": []
                                }
                              },
                              "fast_followers_count": 0,
                              "favourites_count": 263,
                              "followers_count": 17,
                              "friends_count": 633,
                              "has_custom_timelines": true,
                              "is_translator": false,
                              "listed_count": 2,
                              "location": "中华人民共和国",
                              "media_count": 4,
                              "name": "Qonyyy",
                              "normal_followers_count": 17,
                              "pinned_tweet_ids_str": [],
                              "possibly_sensitive": false,
                              "profile_image_url_https": "https://pbs.twimg.com/profile_images/953949364958801920/ACZH_sPg_x96.jpg",
                              "profile_interstitial_type": "",
                              "screen_name": "Qonyyyy",
                              "statuses_count": 447,
                              "translator_type": "none",
                              "verified": false,
                              "want_retweets": false,
                              "withheld_in_countries": []
                            },
                            "tipjar_settings": {}
                          }
                        },
                        "userDisplayType": "User"
                      },
                      "clientEventInfo": {
                        "component": "FollowersSgs",
                        "element": "user"
                      }
                    }
                  },
                  {
                    "entryId": "user-968494279810170881",
                    "sortIndex": "1811053341308878847",
                    "content": {
                      "entryType": "TimelineTimelineItem",
                      "__typename": "TimelineTimelineItem",
                      "itemContent": {
                        "itemType": "TimelineUser",
                        "__typename": "TimelineUser",
                        "user_results": {
                          "result": {
                            "__typename": "User",
                            "id": "VXNlcjo5Njg0OTQyNzk4MTAxNzA4ODE=",
                            "rest_id": "968494279810170881",
                            "affiliates_highlighted_label": {},
                            "has_graduated_access": true,
                            "is_blue_verified": false,
                            "profile_image_shape": "Circle",
                            "legacy": {
                              "followed_by": true,
                              "can_dm": true,
                              "can_media_tag": true,
                              "created_at": "Tue Feb 27 14:33:24 +0000 2018",
                              "default_profile": true,
                              "default_profile_image": false,
                              "description": "",
                              "entities": {
                                "description": {
                                  "urls": []
                                }
                              },
                              "fast_followers_count": 0,
                              "favourites_count": 884,
                              "followers_count": 323,
                              "friends_count": 2581,
                              "has_custom_timelines": true,
                              "is_translator": false,
                              "listed_count": 0,
                              "location": "",
                              "media_count": 2,
                              "name": "Anson",
                              "normal_followers_count": 323,
                              "pinned_tweet_ids_str": [],
                              "possibly_sensitive": false,
                              "profile_image_url_https": "https://pbs.twimg.com/profile_images/1660135489243086855/AAZ6LPZx_x96.jpg",
                              "profile_interstitial_type": "",
                              "screen_name": "aa61598899",
                              "statuses_count": 191,
                              "translator_type": "none",
                              "verified": false,
                              "want_retweets": false,
                              "withheld_in_countries": []
                            },
                            "tipjar_settings": {}
                          }
                        },
                        "userDisplayType": "User"
                      },
                      "clientEventInfo": {
                        "component": "FollowersSgs",
                        "element": "user"
                      }
                    }
                  },
                  {
                    "entryId": "user-1423841559540273158",
                    "sortIndex": "1811053341308878846",
                    "content": {
                      "entryType": "TimelineTimelineItem",
                      "__typename": "TimelineTimelineItem",
                      "itemContent": {
                        "itemType": "TimelineUser",
                        "__typename": "TimelineUser",
                        "user_results": {
                          "result": {
                            "__typename": "User",
                            "id": "VXNlcjoxNDIzODQxNTU5NTQwMjczMTU4",
                            "rest_id": "1423841559540273158",
                            "affiliates_highlighted_label": {},
                            "has_graduated_access": true,
                            "is_blue_verified": false,
                            "profile_image_shape": "Circle",
                            "legacy": {
                              "followed_by": true,
                              "can_dm": true,
                              "can_media_tag": false,
                              "created_at": "Sat Aug 07 03:01:04 +0000 2021",
                              "default_profile": true,
                              "default_profile_image": false,
                              "description": "What important truth do very few people agree with you on?― Peter Thiel",
                              "entities": {
                                "description": {
                                  "urls": []
                                }
                              },
                              "fast_followers_count": 0,
                              "favourites_count": 22124,
                              "followers_count": 899,
                              "friends_count": 2614,
                              "has_custom_timelines": true,
                              "is_translator": false,
                              "listed_count": 15,
                              "location": "Garage",
                              "media_count": 1823,
                              "name": "Jack",
                              "normal_followers_count": 899,
                              "pinned_tweet_ids_str": ["1796664028359430223"],
                              "possibly_sensitive": false,
                              "profile_banner_url": "https://pbs.twimg.com/profile_banners/1423841559540273158/1718582910",
                              "profile_image_url_https": "https://pbs.twimg.com/profile_images/1809414622035804160/AooF4qr9_x96.jpg",
                              "profile_interstitial_type": "",
                              "screen_name": "robertmaurerfan",
                              "statuses_count": 30576,
                              "translator_type": "none",
                              "verified": false,
                              "want_retweets": false,
                              "withheld_in_countries": []
                            },
                            "tipjar_settings": {}
                          }
                        },
                        "userDisplayType": "User"
                      },
                      "clientEventInfo": {
                        "component": "FollowersSgs",
                        "element": "user"
                      }
                    }
                  },
                  {
                    "entryId": "user-1621870986449801216",
                    "sortIndex": "1811053341308878845",
                    "content": {
                      "entryType": "TimelineTimelineItem",
                      "__typename": "TimelineTimelineItem",
                      "itemContent": {
                        "itemType": "TimelineUser",
                        "__typename": "TimelineUser",
                        "user_results": {
                          "result": {
                            "__typename": "User",
                            "id": "VXNlcjoxNjIxODcwOTg2NDQ5ODAxMjE2",
                            "rest_id": "1621870986449801216",
                            "affiliates_highlighted_label": {},
                            "has_graduated_access": true,
                            "is_blue_verified": false,
                            "profile_image_shape": "Circle",
                            "legacy": {
                              "followed_by": true,
                              "can_dm": true,
                              "can_media_tag": true,
                              "created_at": "Sat Feb 04 13:59:24 +0000 2023",
                              "default_profile": true,
                              "default_profile_image": false,
                              "description": "\uD83D\uDCAA挣够100万就去环游世界！ 分享些减肥和生活有趣小事\uD83D\uDE1C 非常期待能遇到更多有趣的人",
                              "entities": {
                                "description": {
                                  "urls": []
                                },
                                "url": {
                                  "urls": [
                                    {
                                      "display_url": "captain12.com",
                                      "expanded_url": "http://captain12.com",
                                      "url": "https://t.co/AgianMopVg",
                                      "indices": [0, 23]
                                    }
                                  ]
                                }
                              },
                              "fast_followers_count": 0,
                              "favourites_count": 328,
                              "followers_count": 110,
                              "friends_count": 296,
                              "has_custom_timelines": false,
                              "is_translator": false,
                              "listed_count": 0,
                              "location": "",
                              "media_count": 54,
                              "name": "船長eiha",
                              "normal_followers_count": 110,
                              "pinned_tweet_ids_str": [],
                              "possibly_sensitive": false,
                              "profile_banner_url": "https://pbs.twimg.com/profile_banners/1621870986449801216/1700410466",
                              "profile_image_url_https": "https://pbs.twimg.com/profile_images/1621873920503857160/jWJbtyBq_x96.jpg",
                              "profile_interstitial_type": "",
                              "screen_name": "captaineiha",
                              "statuses_count": 354,
                              "translator_type": "none",
                              "url": "https://t.co/AgianMopVg",
                              "verified": false,
                              "want_retweets": false,
                              "withheld_in_countries": []
                            },
                            "tipjar_settings": {}
                          }
                        },
                        "userDisplayType": "User"
                      },
                      "clientEventInfo": {
                        "component": "FollowersSgs",
                        "element": "user"
                      }
                    }
                  },
                  {
                    "entryId": "user-1148977651324841984",
                    "sortIndex": "1811053341308878844",
                    "content": {
                      "entryType": "TimelineTimelineItem",
                      "__typename": "TimelineTimelineItem",
                      "itemContent": {
                        "itemType": "TimelineUser",
                        "__typename": "TimelineUser",
                        "user_results": {
                          "result": {
                            "__typename": "User",
                            "id": "VXNlcjoxMTQ4OTc3NjUxMzI0ODQxOTg0",
                            "rest_id": "1148977651324841984",
                            "affiliates_highlighted_label": {},
                            "has_graduated_access": true,
                            "is_blue_verified": false,
                            "profile_image_shape": "Circle",
                            "legacy": {
                              "followed_by": true,
                              "can_dm": true,
                              "can_media_tag": true,
                              "created_at": "Wed Jul 10 15:29:53 +0000 2019",
                              "default_profile": true,
                              "default_profile_image": true,
                              "description": "Full stack web developer, ＃js, #php, ＃flutter,  ＃java. ＃web3 beginer. Microchip applications software Engineer, ＃C/#C++",
                              "entities": {
                                "description": {
                                  "urls": []
                                }
                              },
                              "fast_followers_count": 0,
                              "favourites_count": 768,
                              "followers_count": 35,
                              "friends_count": 1427,
                              "has_custom_timelines": true,
                              "is_translator": false,
                              "listed_count": 0,
                              "location": "Malaysia",
                              "media_count": 9,
                              "name": "Jefferson",
                              "normal_followers_count": 35,
                              "pinned_tweet_ids_str": [],
                              "possibly_sensitive": false,
                              "profile_image_url_https": "https://abs.twimg.com/sticky/default_profile_images/default_profile_x96.png",
                              "profile_interstitial_type": "",
                              "screen_name": "Joefferson007",
                              "statuses_count": 54,
                              "translator_type": "none",
                              "verified": false,
                              "want_retweets": false,
                              "withheld_in_countries": []
                            },
                            "tipjar_settings": {}
                          }
                        },
                        "userDisplayType": "User"
                      },
                      "clientEventInfo": {
                        "component": "FollowersSgs",
                        "element": "user"
                      }
                    }
                  },
                  {
                    "entryId": "user-170741889",
                    "sortIndex": "1811053341308878843",
                    "content": {
                      "entryType": "TimelineTimelineItem",
                      "__typename": "TimelineTimelineItem",
                      "itemContent": {
                        "itemType": "TimelineUser",
                        "__typename": "TimelineUser",
                        "user_results": {
                          "result": {
                            "__typename": "User",
                            "id": "VXNlcjoxNzA3NDE4ODk=",
                            "rest_id": "170741889",
                            "affiliates_highlighted_label": {},
                            "has_graduated_access": true,
                            "is_blue_verified": false,
                            "profile_image_shape": "Circle",
                            "legacy": {
                              "followed_by": true,
                              "can_dm": true,
                              "can_media_tag": true,
                              "created_at": "Sun Jul 25 16:52:32 +0000 2010",
                              "default_profile": true,
                              "default_profile_image": false,
                              "description": "",
                              "entities": {
                                "description": {
                                  "urls": []
                                }
                              },
                              "fast_followers_count": 0,
                              "favourites_count": 881,
                              "followers_count": 109,
                              "friends_count": 680,
                              "has_custom_timelines": false,
                              "is_translator": false,
                              "listed_count": 0,
                              "location": "",
                              "media_count": 4,
                              "name": "ray",
                              "normal_followers_count": 109,
                              "pinned_tweet_ids_str": [],
                              "possibly_sensitive": false,
                              "profile_image_url_https": "https://pbs.twimg.com/profile_images/679224766415245312/ImgptokC_x96.jpg",
                              "profile_interstitial_type": "",
                              "screen_name": "rayidea",
                              "statuses_count": 606,
                              "translator_type": "none",
                              "verified": false,
                              "want_retweets": false,
                              "withheld_in_countries": []
                            },
                            "tipjar_settings": {}
                          }
                        },
                        "userDisplayType": "User"
                      },
                      "clientEventInfo": {
                        "component": "FollowersSgs",
                        "element": "user"
                      }
                    }
                  },
                  {
                    "entryId": "user-1409561390906417162",
                    "sortIndex": "1811053341308878842",
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
                              "friends_count": 1808,
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
                        "component": "FollowersSgs",
                        "element": "user"
                      }
                    }
                  },
                  {
                    "entryId": "user-1657421162148950016",
                    "sortIndex": "1811053341308878841",
                    "content": {
                      "entryType": "TimelineTimelineItem",
                      "__typename": "TimelineTimelineItem",
                      "itemContent": {
                        "itemType": "TimelineUser",
                        "__typename": "TimelineUser",
                        "user_results": {
                          "result": {
                            "__typename": "User",
                            "id": "VXNlcjoxNjU3NDIxMTYyMTQ4OTUwMDE2",
                            "rest_id": "1657421162148950016",
                            "affiliates_highlighted_label": {},
                            "has_graduated_access": true,
                            "is_blue_verified": false,
                            "profile_image_shape": "Circle",
                            "legacy": {
                              "followed_by": true,
                              "can_dm": true,
                              "can_media_tag": true,
                              "created_at": "Sat May 13 16:23:05 +0000 2023",
                              "default_profile": true,
                              "default_profile_image": false,
                              "description": "",
                              "entities": {
                                "description": {
                                  "urls": []
                                }
                              },
                              "fast_followers_count": 0,
                              "favourites_count": 1,
                              "followers_count": 30,
                              "friends_count": 644,
                              "has_custom_timelines": false,
                              "is_translator": false,
                              "listed_count": 0,
                              "location": "",
                              "media_count": 1,
                              "name": "jitekaifang",
                              "normal_followers_count": 30,
                              "pinned_tweet_ids_str": [],
                              "possibly_sensitive": false,
                              "profile_image_url_https": "https://pbs.twimg.com/profile_images/1657421426939564033/I9Y6Xwyt_x96.jpg",
                              "profile_interstitial_type": "",
                              "screen_name": "jitekaifang",
                              "statuses_count": 12,
                              "translator_type": "none",
                              "verified": false,
                              "want_retweets": false,
                              "withheld_in_countries": []
                            },
                            "tipjar_settings": {}
                          }
                        },
                        "userDisplayType": "User"
                      },
                      "clientEventInfo": {
                        "component": "FollowersSgs",
                        "element": "user"
                      }
                    }
                  },
                  {
                    "entryId": "user-1156923380920020992",
                    "sortIndex": "1811053341308878840",
                    "content": {
                      "entryType": "TimelineTimelineItem",
                      "__typename": "TimelineTimelineItem",
                      "itemContent": {
                        "itemType": "TimelineUser",
                        "__typename": "TimelineUser",
                        "user_results": {
                          "result": {
                            "__typename": "User",
                            "id": "VXNlcjoxMTU2OTIzMzgwOTIwMDIwOTky",
                            "rest_id": "1156923380920020992",
                            "affiliates_highlighted_label": {},
                            "has_graduated_access": true,
                            "is_blue_verified": false,
                            "profile_image_shape": "Circle",
                            "legacy": {
                              "followed_by": true,
                              "can_dm": true,
                              "can_media_tag": true,
                              "created_at": "Thu Aug 01 13:43:23 +0000 2019",
                              "default_profile": true,
                              "default_profile_image": false,
                              "description": "",
                              "entities": {
                                "description": {
                                  "urls": []
                                }
                              },
                              "fast_followers_count": 0,
                              "favourites_count": 79,
                              "followers_count": 131,
                              "friends_count": 889,
                              "has_custom_timelines": false,
                              "is_translator": false,
                              "listed_count": 0,
                              "location": "",
                              "media_count": 2,
                              "name": "老胡",
                              "normal_followers_count": 131,
                              "pinned_tweet_ids_str": [],
                              "possibly_sensitive": true,
                              "profile_image_url_https": "https://pbs.twimg.com/profile_images/1795000654655852544/S5Ho1t3Q_x96.jpg",
                              "profile_interstitial_type": "",
                              "screen_name": "ForeverTime6",
                              "statuses_count": 237,
                              "translator_type": "none",
                              "verified": false,
                              "want_retweets": false,
                              "withheld_in_countries": []
                            },
                            "tipjar_settings": {}
                          }
                        },
                        "userDisplayType": "User"
                      },
                      "clientEventInfo": {
                        "component": "FollowersSgs",
                        "element": "user"
                      }
                    }
                  },
                  {
                    "entryId": "user-1130628715",
                    "sortIndex": "1811053341308878839",
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
                        "component": "FollowersSgs",
                        "element": "user"
                      }
                    }
                  },
                  {
                    "entryId": "user-96131545",
                    "sortIndex": "1811053341308878838",
                    "content": {
                      "entryType": "TimelineTimelineItem",
                      "__typename": "TimelineTimelineItem",
                      "itemContent": {
                        "itemType": "TimelineUser",
                        "__typename": "TimelineUser",
                        "user_results": {
                          "result": {
                            "__typename": "User",
                            "id": "VXNlcjo5NjEzMTU0NQ==",
                            "rest_id": "96131545",
                            "affiliates_highlighted_label": {},
                            "has_graduated_access": true,
                            "is_blue_verified": false,
                            "profile_image_shape": "Circle",
                            "legacy": {
                              "followed_by": true,
                              "can_dm": true,
                              "can_media_tag": true,
                              "created_at": "Fri Dec 11 14:02:43 +0000 2009",
                              "default_profile": false,
                              "default_profile_image": false,
                              "description": "Programador, emprendedor y mucho mas...\nProgrammer, entrepreneur, and much more...",
                              "entities": {
                                "description": {
                                  "urls": []
                                },
                                "url": {
                                  "urls": [
                                    {
                                      "display_url": "cafecito.app/damiankleiman",
                                      "expanded_url": "https://cafecito.app/damiankleiman",
                                      "url": "https://t.co/4L9tqZozzU",
                                      "indices": [0, 23]
                                    }
                                  ]
                                }
                              },
                              "fast_followers_count": 0,
                              "favourites_count": 1012,
                              "followers_count": 451,
                              "friends_count": 2681,
                              "has_custom_timelines": false,
                              "is_translator": false,
                              "listed_count": 4,
                              "location": "Rosario, Argentina",
                              "media_count": 63,
                              "name": "Damian Kleiman",
                              "normal_followers_count": 451,
                              "pinned_tweet_ids_str": ["1808540585747161190"],
                              "possibly_sensitive": false,
                              "profile_banner_url": "https://pbs.twimg.com/profile_banners/96131545/1524004236",
                              "profile_image_url_https": "https://pbs.twimg.com/profile_images/1807592087707070464/9Xc45JEb_x96.jpg",
                              "profile_interstitial_type": "",
                              "screen_name": "damiankleiman",
                              "statuses_count": 2056,
                              "translator_type": "none",
                              "url": "https://t.co/4L9tqZozzU",
                              "verified": false,
                              "want_retweets": false,
                              "withheld_in_countries": []
                            },
                            "professional": {
                              "rest_id": "1621504889741520897",
                              "professional_type": "Creator",
                              "category": [
                                {
                                  "id": 477,
                                  "name": "Professional Services",
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
                        "component": "FollowersSgs",
                        "element": "user"
                      }
                    }
                  },
                  {
                    "entryId": "user-1788519482589364224",
                    "sortIndex": "1811053341308878837",
                    "content": {
                      "entryType": "TimelineTimelineItem",
                      "__typename": "TimelineTimelineItem",
                      "itemContent": {
                        "itemType": "TimelineUser",
                        "__typename": "TimelineUser",
                        "user_results": {
                          "result": {
                            "__typename": "User",
                            "id": "VXNlcjoxNzg4NTE5NDgyNTg5MzY0MjI0",
                            "rest_id": "1788519482589364224",
                            "affiliates_highlighted_label": {},
                            "has_graduated_access": true,
                            "is_blue_verified": false,
                            "profile_image_shape": "Circle",
                            "legacy": {
                              "followed_by": true,
                              "can_dm": true,
                              "can_media_tag": true,
                              "created_at": "Thu May 09 10:41:12 +0000 2024",
                              "default_profile": true,
                              "default_profile_image": false,
                              "description": "",
                              "entities": {
                                "description": {
                                  "urls": []
                                }
                              },
                              "fast_followers_count": 0,
                              "favourites_count": 1028,
                              "followers_count": 92,
                              "friends_count": 616,
                              "has_custom_timelines": false,
                              "is_translator": false,
                              "listed_count": 0,
                              "location": "",
                              "media_count": 0,
                              "name": "老牛啃嫩草",
                              "normal_followers_count": 92,
                              "pinned_tweet_ids_str": [],
                              "possibly_sensitive": false,
                              "profile_image_url_https": "https://pbs.twimg.com/profile_images/1794940726771605504/wIJ7CWol_x96.jpg",
                              "profile_interstitial_type": "",
                              "screen_name": "xiaomage52013",
                              "statuses_count": 59,
                              "translator_type": "none",
                              "verified": false,
                              "want_retweets": false,
                              "withheld_in_countries": []
                            },
                            "tipjar_settings": {}
                          }
                        },
                        "userDisplayType": "User"
                      },
                      "clientEventInfo": {
                        "component": "FollowersSgs",
                        "element": "user"
                      }
                    }
                  },
                  {
                    "entryId": "user-170283339",
                    "sortIndex": "1811053341308878836",
                    "content": {
                      "entryType": "TimelineTimelineItem",
                      "__typename": "TimelineTimelineItem",
                      "itemContent": {
                        "itemType": "TimelineUser",
                        "__typename": "TimelineUser",
                        "user_results": {
                          "result": {
                            "__typename": "User",
                            "id": "VXNlcjoxNzAyODMzMzk=",
                            "rest_id": "170283339",
                            "affiliates_highlighted_label": {},
                            "has_graduated_access": true,
                            "is_blue_verified": false,
                            "profile_image_shape": "Circle",
                            "legacy": {
                              "followed_by": true,
                              "can_dm": true,
                              "can_media_tag": false,
                              "created_at": "Sat Jul 24 12:06:06 +0000 2010",
                              "default_profile": true,
                              "default_profile_image": false,
                              "description": "Hello, big big world!",
                              "entities": {
                                "description": {
                                  "urls": []
                                }
                              },
                              "fast_followers_count": 0,
                              "favourites_count": 14,
                              "followers_count": 25,
                              "friends_count": 177,
                              "has_custom_timelines": true,
                              "is_translator": false,
                              "listed_count": 0,
                              "location": "SAR",
                              "media_count": 31,
                              "name": "\uD835\uDD38\uD835\uDD4B\uD835\uDD46\uD835\uDD44",
                              "normal_followers_count": 25,
                              "pinned_tweet_ids_str": [],
                              "possibly_sensitive": false,
                              "profile_banner_url": "https://pbs.twimg.com/profile_banners/170283339/1359107554",
                              "profile_image_url_https": "https://pbs.twimg.com/profile_images/1640654092254191616/mulhuaqT_x96.jpg",
                              "profile_interstitial_type": "",
                              "screen_name": "mengyingchina",
                              "statuses_count": 144,
                              "translator_type": "none",
                              "verified": false,
                              "want_retweets": false,
                              "withheld_in_countries": []
                            },
                            "tipjar_settings": {}
                          }
                        },
                        "userDisplayType": "User"
                      },
                      "clientEventInfo": {
                        "component": "FollowersSgs",
                        "element": "user"
                      }
                    }
                  },
                  {
                    "entryId": "user-1572897163725918209",
                    "sortIndex": "1811053341308878835",
                    "content": {
                      "entryType": "TimelineTimelineItem",
                      "__typename": "TimelineTimelineItem",
                      "itemContent": {
                        "itemType": "TimelineUser",
                        "__typename": "TimelineUser",
                        "user_results": {
                          "result": {
                            "__typename": "User",
                            "id": "VXNlcjoxNTcyODk3MTYzNzI1OTE4MjA5",
                            "rest_id": "1572897163725918209",
                            "affiliates_highlighted_label": {},
                            "has_graduated_access": true,
                            "is_blue_verified": false,
                            "profile_image_shape": "Circle",
                            "legacy": {
                              "followed_by": true,
                              "protected": true,
                              "can_dm": true,
                              "can_media_tag": false,
                              "created_at": "Thu Sep 22 10:34:48 +0000 2022",
                              "default_profile": true,
                              "default_profile_image": false,
                              "description": "A Cver who focuses on the scientific study of circulating tumor cells",
                              "entities": {
                                "description": {
                                  "urls": []
                                }
                              },
                              "fast_followers_count": 0,
                              "favourites_count": 1258,
                              "followers_count": 95,
                              "friends_count": 564,
                              "has_custom_timelines": true,
                              "is_translator": false,
                              "listed_count": 0,
                              "location": "China",
                              "media_count": 59,
                              "name": "Guangpeng",
                              "normal_followers_count": 95,
                              "pinned_tweet_ids_str": ["1770115372987167203"],
                              "possibly_sensitive": false,
                              "profile_banner_url": "https://pbs.twimg.com/profile_banners/1572897163725918209/1665535712",
                              "profile_image_url_https": "https://pbs.twimg.com/profile_images/1740570210275651584/VB6MUVQV_x96.jpg",
                              "profile_interstitial_type": "",
                              "screen_name": "guangpengwgp",
                              "statuses_count": 383,
                              "translator_type": "none",
                              "verified": false,
                              "want_retweets": false,
                              "withheld_in_countries": []
                            },
                            "professional": {
                              "rest_id": "1645810078141026306",
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
                        "component": "FollowersSgs",
                        "element": "user"
                      }
                    }
                  },
                  {
                    "entryId": "user-735752370747904001",
                    "sortIndex": "1811053341308878834",
                    "content": {
                      "entryType": "TimelineTimelineItem",
                      "__typename": "TimelineTimelineItem",
                      "itemContent": {
                        "itemType": "TimelineUser",
                        "__typename": "TimelineUser",
                        "user_results": {
                          "result": {
                            "__typename": "User",
                            "id": "VXNlcjo3MzU3NTIzNzA3NDc5MDQwMDE=",
                            "rest_id": "735752370747904001",
                            "affiliates_highlighted_label": {},
                            "has_graduated_access": true,
                            "is_blue_verified": false,
                            "profile_image_shape": "Circle",
                            "legacy": {
                              "followed_by": true,
                              "can_dm": true,
                              "can_media_tag": true,
                              "created_at": "Thu May 26 08:40:09 +0000 2016",
                              "default_profile": false,
                              "default_profile_image": false,
                              "description": "网络安全和机器学习开发人员  富贵险中求",
                              "entities": {
                                "description": {
                                  "urls": []
                                }
                              },
                              "fast_followers_count": 0,
                              "favourites_count": 2595,
                              "followers_count": 142,
                              "friends_count": 2603,
                              "has_custom_timelines": true,
                              "is_translator": false,
                              "listed_count": 1,
                              "location": "\uD83E\uDEE5",
                              "media_count": 47,
                              "name": "YCheng",
                              "normal_followers_count": 142,
                              "pinned_tweet_ids_str": ["1688370615324155904"],
                              "possibly_sensitive": false,
                              "profile_banner_url": "https://pbs.twimg.com/profile_banners/735752370747904001/1717723848",
                              "profile_image_url_https": "https://pbs.twimg.com/profile_images/1688385930338684929/SsH_xOyk_x96.jpg",
                              "profile_interstitial_type": "",
                              "screen_name": "YCheng_Ho",
                              "statuses_count": 673,
                              "translator_type": "none",
                              "verified": false,
                              "want_retweets": false,
                              "withheld_in_countries": []
                            },
                            "professional": {
                              "rest_id": "1584956434500169729",
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
                        "component": "FollowersSgs",
                        "element": "user"
                      }
                    }
                  },
                  {
                    "entryId": "user-1644270543867359233",
                    "sortIndex": "1811053341308878833",
                    "content": {
                      "entryType": "TimelineTimelineItem",
                      "__typename": "TimelineTimelineItem",
                      "itemContent": {
                        "itemType": "TimelineUser",
                        "__typename": "TimelineUser",
                        "user_results": {
                          "result": {
                            "__typename": "User",
                            "id": "VXNlcjoxNjQ0MjcwNTQzODY3MzU5MjMz",
                            "rest_id": "1644270543867359233",
                            "affiliates_highlighted_label": {},
                            "has_graduated_access": true,
                            "is_blue_verified": false,
                            "profile_image_shape": "Circle",
                            "legacy": {
                              "followed_by": true,
                              "can_dm": true,
                              "can_media_tag": true,
                              "created_at": "Fri Apr 07 09:27:11 +0000 2023",
                              "default_profile": true,
                              "default_profile_image": false,
                              "description": "",
                              "entities": {
                                "description": {
                                  "urls": []
                                }
                              },
                              "fast_followers_count": 0,
                              "favourites_count": 40,
                              "followers_count": 160,
                              "friends_count": 360,
                              "has_custom_timelines": false,
                              "is_translator": false,
                              "listed_count": 0,
                              "location": "",
                              "media_count": 0,
                              "name": "JoeDean",
                              "normal_followers_count": 160,
                              "pinned_tweet_ids_str": [],
                              "possibly_sensitive": false,
                              "profile_image_url_https": "https://pbs.twimg.com/profile_images/1759474327651782656/X1rsS8XQ_x96.jpg",
                              "profile_interstitial_type": "",
                              "screen_name": "_JoeDean",
                              "statuses_count": 276,
                              "translator_type": "none",
                              "verified": false,
                              "want_retweets": false,
                              "withheld_in_countries": []
                            },
                            "tipjar_settings": {}
                          }
                        },
                        "userDisplayType": "User"
                      },
                      "clientEventInfo": {
                        "component": "FollowersSgs",
                        "element": "user"
                      }
                    }
                  },
                  {
                    "entryId": "user-987876884284231680",
                    "sortIndex": "1811053341308878832",
                    "content": {
                      "entryType": "TimelineTimelineItem",
                      "__typename": "TimelineTimelineItem",
                      "itemContent": {
                        "itemType": "TimelineUser",
                        "__typename": "TimelineUser",
                        "user_results": {
                          "result": {
                            "__typename": "User",
                            "id": "VXNlcjo5ODc4NzY4ODQyODQyMzE2ODA=",
                            "rest_id": "987876884284231680",
                            "affiliates_highlighted_label": {},
                            "has_graduated_access": true,
                            "is_blue_verified": false,
                            "profile_image_shape": "Circle",
                            "legacy": {
                              "followed_by": true,
                              "can_dm": true,
                              "can_media_tag": true,
                              "created_at": "Sun Apr 22 02:12:57 +0000 2018",
                              "default_profile": true,
                              "default_profile_image": false,
                              "description": "「蛙以口鸣，方致蛇祸。」\ndebu大学生 | 大户爱单推人 | 东方众 | 膜法师 | 社恐 | ADHD | INFJ-T \n不键政 | 想认识优秀的人、变得更可爱 | 有时会说怪话 | 随缘回fo | 欢迎关注~",
                              "entities": {
                                "description": {
                                  "urls": []
                                },
                                "url": {
                                  "urls": [
                                    {
                                      "display_url": "hanamiyuushimo.github.io",
                                      "expanded_url": "https://hanamiyuushimo.github.io",
                                      "url": "https://t.co/hiN2s5kOd5",
                                      "indices": [0, 23]
                                    }
                                  ]
                                }
                              },
                              "fast_followers_count": 0,
                              "favourites_count": 126466,
                              "followers_count": 1166,
                              "friends_count": 2348,
                              "has_custom_timelines": false,
                              "is_translator": false,
                              "listed_count": 12,
                              "location": "中国",
                              "media_count": 742,
                              "name": "幽霜若灼",
                              "normal_followers_count": 1166,
                              "pinned_tweet_ids_str": ["1675378006561533953"],
                              "possibly_sensitive": false,
                              "profile_banner_url": "https://pbs.twimg.com/profile_banners/987876884284231680/1707182550",
                              "profile_image_url_https": "https://pbs.twimg.com/profile_images/1751636345448247296/sPmkoDXr_x96.jpg",
                              "profile_interstitial_type": "",
                              "screen_name": "Yuushimo2333",
                              "statuses_count": 6652,
                              "translator_type": "none",
                              "url": "https://t.co/hiN2s5kOd5",
                              "verified": false,
                              "want_retweets": false,
                              "withheld_in_countries": []
                            },
                            "tipjar_settings": {}
                          }
                        },
                        "userDisplayType": "User"
                      },
                      "clientEventInfo": {
                        "component": "FollowersSgs",
                        "element": "user"
                      }
                    }
                  },
                  {
                    "entryId": "user-975236429008613376",
                    "sortIndex": "1811053341308878831",
                    "content": {
                      "entryType": "TimelineTimelineItem",
                      "__typename": "TimelineTimelineItem",
                      "itemContent": {
                        "itemType": "TimelineUser",
                        "__typename": "TimelineUser",
                        "user_results": {
                          "result": {
                            "__typename": "User",
                            "id": "VXNlcjo5NzUyMzY0MjkwMDg2MTMzNzY=",
                            "rest_id": "975236429008613376",
                            "affiliates_highlighted_label": {},
                            "has_graduated_access": true,
                            "is_blue_verified": false,
                            "profile_image_shape": "Circle",
                            "legacy": {
                              "followed_by": true,
                              "can_dm": true,
                              "can_media_tag": false,
                              "created_at": "Sun Mar 18 05:04:18 +0000 2018",
                              "default_profile": true,
                              "default_profile_image": false,
                              "description": "Father / Bike / Value Investment / Dog",
                              "entities": {
                                "description": {
                                  "urls": []
                                }
                              },
                              "fast_followers_count": 0,
                              "favourites_count": 5041,
                              "followers_count": 12,
                              "friends_count": 2327,
                              "has_custom_timelines": true,
                              "is_translator": false,
                              "listed_count": 0,
                              "location": "",
                              "media_count": 5,
                              "name": "TrustyInvestorPup",
                              "normal_followers_count": 12,
                              "pinned_tweet_ids_str": [],
                              "possibly_sensitive": false,
                              "profile_banner_url": "https://pbs.twimg.com/profile_banners/975236429008613376/1667721711",
                              "profile_image_url_https": "https://pbs.twimg.com/profile_images/1752010554225635328/VMl2-hNr_x96.jpg",
                              "profile_interstitial_type": "",
                              "screen_name": "PupFanFun",
                              "statuses_count": 84,
                              "translator_type": "none",
                              "verified": false,
                              "want_retweets": false,
                              "withheld_in_countries": []
                            },
                            "tipjar_settings": {}
                          }
                        },
                        "userDisplayType": "User"
                      },
                      "clientEventInfo": {
                        "component": "FollowersSgs",
                        "element": "user"
                      }
                    }
                  },
                  {
                    "entryId": "user-3707442923",
                    "sortIndex": "1811053341308878830",
                    "content": {
                      "entryType": "TimelineTimelineItem",
                      "__typename": "TimelineTimelineItem",
                      "itemContent": {
                        "itemType": "TimelineUser",
                        "__typename": "TimelineUser",
                        "user_results": {
                          "result": {
                            "__typename": "User",
                            "id": "VXNlcjozNzA3NDQyOTIz",
                            "rest_id": "3707442923",
                            "affiliates_highlighted_label": {},
                            "has_graduated_access": true,
                            "is_blue_verified": false,
                            "profile_image_shape": "Circle",
                            "legacy": {
                              "followed_by": true,
                              "can_dm": true,
                              "can_media_tag": true,
                              "created_at": "Sat Sep 19 13:27:08 +0000 2015",
                              "default_profile": false,
                              "default_profile_image": false,
                              "description": "",
                              "entities": {
                                "description": {
                                  "urls": []
                                }
                              },
                              "fast_followers_count": 0,
                              "favourites_count": 6,
                              "followers_count": 7,
                              "friends_count": 1017,
                              "has_custom_timelines": false,
                              "is_translator": false,
                              "listed_count": 0,
                              "location": "",
                              "media_count": 1,
                              "name": "vistab",
                              "normal_followers_count": 7,
                              "pinned_tweet_ids_str": [],
                              "possibly_sensitive": false,
                              "profile_banner_url": "https://pbs.twimg.com/profile_banners/3707442923/1718370008",
                              "profile_image_url_https": "https://pbs.twimg.com/profile_images/1801601120982470660/Wn3iAxPP_x96.jpg",
                              "profile_interstitial_type": "",
                              "screen_name": "vistab88",
                              "statuses_count": 6,
                              "translator_type": "none",
                              "verified": false,
                              "want_retweets": false,
                              "withheld_in_countries": []
                            },
                            "tipjar_settings": {}
                          }
                        },
                        "userDisplayType": "User"
                      },
                      "clientEventInfo": {
                        "component": "FollowersSgs",
                        "element": "user"
                      }
                    }
                  },
                  {
                    "entryId": "user-63661117",
                    "sortIndex": "1811053341308878829",
                    "content": {
                      "entryType": "TimelineTimelineItem",
                      "__typename": "TimelineTimelineItem",
                      "itemContent": {
                        "itemType": "TimelineUser",
                        "__typename": "TimelineUser",
                        "user_results": {
                          "result": {
                            "__typename": "User",
                            "id": "VXNlcjo2MzY2MTExNw==",
                            "rest_id": "63661117",
                            "affiliates_highlighted_label": {},
                            "has_graduated_access": true,
                            "is_blue_verified": false,
                            "profile_image_shape": "Circle",
                            "legacy": {
                              "followed_by": true,
                              "can_dm": true,
                              "can_media_tag": true,
                              "created_at": "Fri Aug 07 06:45:11 +0000 2009",
                              "default_profile": true,
                              "default_profile_image": false,
                              "description": "编程，跑步，吉他\nSwiftUI, Go",
                              "entities": {
                                "description": {
                                  "urls": []
                                }
                              },
                              "fast_followers_count": 0,
                              "favourites_count": 29,
                              "followers_count": 77,
                              "friends_count": 880,
                              "has_custom_timelines": true,
                              "is_translator": false,
                              "listed_count": 5,
                              "location": "",
                              "media_count": 0,
                              "name": "su3",
                              "normal_followers_count": 77,
                              "pinned_tweet_ids_str": [],
                              "possibly_sensitive": true,
                              "profile_banner_url": "https://pbs.twimg.com/profile_banners/63661117/1716344188",
                              "profile_image_url_https": "https://pbs.twimg.com/profile_images/1793098781589647361/jKOWydbM_x96.jpg",
                              "profile_interstitial_type": "",
                              "screen_name": "suxiaozhou",
                              "statuses_count": 42,
                              "translator_type": "none",
                              "verified": false,
                              "want_retweets": false,
                              "withheld_in_countries": []
                            },
                            "tipjar_settings": {}
                          }
                        },
                        "userDisplayType": "User"
                      },
                      "clientEventInfo": {
                        "component": "FollowersSgs",
                        "element": "user"
                      }
                    }
                  },
                  {
                    "entryId": "user-741932473353801728",
                    "sortIndex": "1811053341308878828",
                    "content": {
                      "entryType": "TimelineTimelineItem",
                      "__typename": "TimelineTimelineItem",
                      "itemContent": {
                        "itemType": "TimelineUser",
                        "__typename": "TimelineUser",
                        "user_results": {
                          "result": {
                            "__typename": "User",
                            "id": "VXNlcjo3NDE5MzI0NzMzNTM4MDE3Mjg=",
                            "rest_id": "741932473353801728",
                            "affiliates_highlighted_label": {},
                            "has_graduated_access": true,
                            "is_blue_verified": false,
                            "profile_image_shape": "Circle",
                            "legacy": {
                              "followed_by": true,
                              "protected": true,
                              "can_dm": true,
                              "can_media_tag": false,
                              "created_at": "Sun Jun 12 09:57:40 +0000 2016",
                              "default_profile": true,
                              "default_profile_image": false,
                              "description": "所有的酒都不如你",
                              "entities": {
                                "description": {
                                  "urls": []
                                }
                              },
                              "fast_followers_count": 0,
                              "favourites_count": 346,
                              "followers_count": 40,
                              "friends_count": 2702,
                              "has_custom_timelines": true,
                              "is_translator": false,
                              "listed_count": 0,
                              "location": "Beijing China",
                              "media_count": 7,
                              "name": "银桑",
                              "normal_followers_count": 40,
                              "pinned_tweet_ids_str": [],
                              "possibly_sensitive": false,
                              "profile_image_url_https": "https://pbs.twimg.com/profile_images/746338314215530496/B_ndrKXs_x96.jpg",
                              "profile_interstitial_type": "",
                              "screen_name": "jiawei322",
                              "statuses_count": 309,
                              "translator_type": "none",
                              "verified": false,
                              "want_retweets": false,
                              "withheld_in_countries": []
                            },
                            "professional": {
                              "rest_id": "1464280153136238623",
                              "professional_type": "Business",
                              "category": [
                                {
                                  "id": 962,
                                  "name": "Mobile Application",
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
                        "component": "FollowersSgs",
                        "element": "user"
                      }
                    }
                  },
                  {
                    "entryId": "user-426425493",
                    "sortIndex": "1811053341308878827",
                    "content": {
                      "entryType": "TimelineTimelineItem",
                      "__typename": "TimelineTimelineItem",
                      "itemContent": {
                        "itemType": "TimelineUser",
                        "__typename": "TimelineUser",
                        "user_results": {
                          "result": {
                            "__typename": "User",
                            "id": "VXNlcjo0MjY0MjU0OTM=",
                            "rest_id": "426425493",
                            "affiliates_highlighted_label": {},
                            "has_graduated_access": true,
                            "is_blue_verified": false,
                            "profile_image_shape": "Circle",
                            "legacy": {
                              "followed_by": true,
                              "can_dm": true,
                              "can_media_tag": true,
                              "created_at": "Fri Dec 02 06:51:07 +0000 2011",
                              "default_profile": true,
                              "default_profile_image": false,
                              "description": "这是简介",
                              "entities": {
                                "description": {
                                  "urls": []
                                },
                                "url": {
                                  "urls": [
                                    {
                                      "display_url": "tool.al",
                                      "expanded_url": "https://tool.al",
                                      "url": "https://t.co/8tEhh2ndEo",
                                      "indices": [0, 23]
                                    }
                                  ]
                                }
                              },
                              "fast_followers_count": 0,
                              "favourites_count": 92,
                              "followers_count": 70,
                              "friends_count": 2009,
                              "has_custom_timelines": true,
                              "is_translator": false,
                              "listed_count": 3,
                              "location": "Hong Kong",
                              "media_count": 2,
                              "name": "邪恶的小猫咪 Tool.AL",
                              "normal_followers_count": 70,
                              "pinned_tweet_ids_str": ["1598680881887318016"],
                              "possibly_sensitive": false,
                              "profile_banner_url": "https://pbs.twimg.com/profile_banners/426425493/1688198987",
                              "profile_image_url_https": "https://pbs.twimg.com/profile_images/1553375310007377920/L8grV2TV_x96.jpg",
                              "profile_interstitial_type": "",
                              "screen_name": "TOOL_dot_AL",
                              "statuses_count": 118,
                              "translator_type": "none",
                              "url": "https://t.co/8tEhh2ndEo",
                              "verified": false,
                              "want_retweets": false,
                              "withheld_in_countries": []
                            },
                            "professional": {
                              "rest_id": "1586594864028086273",
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
                        "component": "FollowersSgs",
                        "element": "user"
                      }
                    }
                  },
                  {
                    "entryId": "user-1774025963333992448",
                    "sortIndex": "1811053341308878826",
                    "content": {
                      "entryType": "TimelineTimelineItem",
                      "__typename": "TimelineTimelineItem",
                      "itemContent": {
                        "itemType": "TimelineUser",
                        "__typename": "TimelineUser",
                        "user_results": {
                          "result": {
                            "__typename": "User",
                            "id": "VXNlcjoxNzc0MDI1OTYzMzMzOTkyNDQ4",
                            "rest_id": "1774025963333992448",
                            "affiliates_highlighted_label": {},
                            "has_graduated_access": true,
                            "is_blue_verified": false,
                            "profile_image_shape": "Circle",
                            "legacy": {
                              "followed_by": true,
                              "can_dm": true,
                              "can_media_tag": true,
                              "created_at": "Sat Mar 30 10:48:55 +0000 2024",
                              "default_profile": true,
                              "default_profile_image": false,
                              "description": "解放思想，拥抱自由",
                              "entities": {
                                "description": {
                                  "urls": []
                                }
                              },
                              "fast_followers_count": 0,
                              "favourites_count": 331,
                              "followers_count": 27,
                              "friends_count": 185,
                              "has_custom_timelines": false,
                              "is_translator": false,
                              "listed_count": 0,
                              "location": "",
                              "media_count": 0,
                              "name": "Wild",
                              "normal_followers_count": 27,
                              "pinned_tweet_ids_str": [],
                              "possibly_sensitive": false,
                              "profile_image_url_https": "https://pbs.twimg.com/profile_images/1774026011778093056/-xWVcZEj_x96.png",
                              "profile_interstitial_type": "",
                              "screen_name": "Mark2407745181",
                              "statuses_count": 16,
                              "translator_type": "none",
                              "verified": false,
                              "want_retweets": false,
                              "withheld_in_countries": []
                            },
                            "tipjar_settings": {}
                          }
                        },
                        "userDisplayType": "User"
                      },
                      "clientEventInfo": {
                        "component": "FollowersSgs",
                        "element": "user"
                      }
                    }
                  },
                  {
                    "entryId": "user-1341893566734295040",
                    "sortIndex": "1811053341308878825",
                    "content": {
                      "entryType": "TimelineTimelineItem",
                      "__typename": "TimelineTimelineItem",
                      "itemContent": {
                        "itemType": "TimelineUser",
                        "__typename": "TimelineUser",
                        "user_results": {
                          "result": {
                            "__typename": "User",
                            "id": "VXNlcjoxMzQxODkzNTY2NzM0Mjk1MDQw",
                            "rest_id": "1341893566734295040",
                            "affiliates_highlighted_label": {},
                            "has_graduated_access": true,
                            "is_blue_verified": false,
                            "profile_image_shape": "Circle",
                            "legacy": {
                              "followed_by": true,
                              "can_dm": true,
                              "can_media_tag": false,
                              "created_at": "Wed Dec 23 23:49:07 +0000 2020",
                              "default_profile": true,
                              "default_profile_image": false,
                              "description": "Ctrl+C & Ctrl+V",
                              "entities": {
                                "description": {
                                  "urls": []
                                }
                              },
                              "fast_followers_count": 0,
                              "favourites_count": 23,
                              "followers_count": 58,
                              "friends_count": 107,
                              "has_custom_timelines": false,
                              "is_translator": false,
                              "listed_count": 0,
                              "location": "",
                              "media_count": 23,
                              "name": "cvengineer",
                              "normal_followers_count": 58,
                              "pinned_tweet_ids_str": [],
                              "possibly_sensitive": false,
                              "profile_banner_url": "https://pbs.twimg.com/profile_banners/1341893566734295040/1709894181",
                              "profile_image_url_https": "https://pbs.twimg.com/profile_images/1766050011266322432/ZlRCLLPb_x96.jpg",
                              "profile_interstitial_type": "",
                              "screen_name": "ttt36538104",
                              "statuses_count": 446,
                              "translator_type": "none",
                              "verified": false,
                              "want_retweets": false,
                              "withheld_in_countries": []
                            },
                            "tipjar_settings": {}
                          }
                        },
                        "userDisplayType": "User"
                      },
                      "clientEventInfo": {
                        "component": "FollowersSgs",
                        "element": "user"
                      }
                    }
                  },
                  {
                    "entryId": "user-576835308",
                    "sortIndex": "1811053341308878824",
                    "content": {
                      "entryType": "TimelineTimelineItem",
                      "__typename": "TimelineTimelineItem",
                      "itemContent": {
                        "itemType": "TimelineUser",
                        "__typename": "TimelineUser",
                        "user_results": {
                          "result": {
                            "__typename": "User",
                            "id": "VXNlcjo1NzY4MzUzMDg=",
                            "rest_id": "576835308",
                            "affiliates_highlighted_label": {},
                            "has_graduated_access": true,
                            "is_blue_verified": false,
                            "profile_image_shape": "Circle",
                            "legacy": {
                              "followed_by": true,
                              "can_dm": true,
                              "can_media_tag": true,
                              "created_at": "Fri May 11 02:07:27 +0000 2012",
                              "default_profile": true,
                              "default_profile_image": false,
                              "description": "iii",
                              "entities": {
                                "description": {
                                  "urls": []
                                }
                              },
                              "fast_followers_count": 0,
                              "favourites_count": 12,
                              "followers_count": 25,
                              "friends_count": 613,
                              "has_custom_timelines": true,
                              "is_translator": false,
                              "listed_count": 0,
                              "location": "Yau Tsim Mong District",
                              "media_count": 1,
                              "name": "Seven",
                              "normal_followers_count": 25,
                              "pinned_tweet_ids_str": [],
                              "possibly_sensitive": false,
                              "profile_image_url_https": "https://pbs.twimg.com/profile_images/1761892431728160768/BaUIsJwK_x96.jpg",
                              "profile_interstitial_type": "",
                              "screen_name": "csshexxfd",
                              "statuses_count": 12,
                              "translator_type": "none",
                              "verified": false,
                              "want_retweets": false,
                              "withheld_in_countries": []
                            },
                            "tipjar_settings": {}
                          }
                        },
                        "userDisplayType": "User"
                      },
                      "clientEventInfo": {
                        "component": "FollowersSgs",
                        "element": "user"
                      }
                    }
                  },
                  {
                    "entryId": "user-1475441174777249794",
                    "sortIndex": "1811053341308878823",
                    "content": {
                      "entryType": "TimelineTimelineItem",
                      "__typename": "TimelineTimelineItem",
                      "itemContent": {
                        "itemType": "TimelineUser",
                        "__typename": "TimelineUser",
                        "user_results": {
                          "result": {
                            "__typename": "User",
                            "id": "VXNlcjoxNDc1NDQxMTc0Nzc3MjQ5Nzk0",
                            "rest_id": "1475441174777249794",
                            "affiliates_highlighted_label": {},
                            "has_graduated_access": true,
                            "is_blue_verified": false,
                            "profile_image_shape": "Circle",
                            "legacy": {
                              "followed_by": true,
                              "protected": true,
                              "can_dm": true,
                              "can_media_tag": false,
                              "created_at": "Mon Dec 27 12:19:41 +0000 2021",
                              "default_profile": true,
                              "default_profile_image": false,
                              "description": "",
                              "entities": {
                                "description": {
                                  "urls": []
                                }
                              },
                              "fast_followers_count": 0,
                              "favourites_count": 30,
                              "followers_count": 4,
                              "friends_count": 2080,
                              "has_custom_timelines": true,
                              "is_translator": false,
                              "listed_count": 0,
                              "location": "",
                              "media_count": 1,
                              "name": "kim",
                              "normal_followers_count": 4,
                              "pinned_tweet_ids_str": [],
                              "possibly_sensitive": false,
                              "profile_image_url_https": "https://pbs.twimg.com/profile_images/1643538804144488449/A4-3GSwz_x96.jpg",
                              "profile_interstitial_type": "",
                              "screen_name": "Oqswdw1",
                              "statuses_count": 30,
                              "translator_type": "none",
                              "verified": false,
                              "want_retweets": false,
                              "withheld_in_countries": []
                            },
                            "tipjar_settings": {}
                          }
                        },
                        "userDisplayType": "User"
                      },
                      "clientEventInfo": {
                        "component": "FollowersSgs",
                        "element": "user"
                      }
                    }
                  },
                  {
                    "entryId": "user-1155463603643809793",
                    "sortIndex": "1811053341308878822",
                    "content": {
                      "entryType": "TimelineTimelineItem",
                      "__typename": "TimelineTimelineItem",
                      "itemContent": {
                        "itemType": "TimelineUser",
                        "__typename": "TimelineUser",
                        "user_results": {
                          "result": {
                            "__typename": "User",
                            "id": "VXNlcjoxMTU1NDYzNjAzNjQzODA5Nzkz",
                            "rest_id": "1155463603643809793",
                            "affiliates_highlighted_label": {},
                            "has_graduated_access": true,
                            "is_blue_verified": false,
                            "profile_image_shape": "Circle",
                            "legacy": {
                              "followed_by": true,
                              "protected": true,
                              "can_dm": true,
                              "can_media_tag": false,
                              "created_at": "Sun Jul 28 13:02:45 +0000 2019",
                              "default_profile": true,
                              "default_profile_image": false,
                              "description": "",
                              "entities": {
                                "description": {
                                  "urls": []
                                }
                              },
                              "fast_followers_count": 0,
                              "favourites_count": 1749,
                              "followers_count": 2,
                              "friends_count": 582,
                              "has_custom_timelines": true,
                              "is_translator": false,
                              "listed_count": 0,
                              "location": "",
                              "media_count": 0,
                              "name": "NeverFindU",
                              "normal_followers_count": 2,
                              "pinned_tweet_ids_str": [],
                              "possibly_sensitive": false,
                              "profile_image_url_https": "https://pbs.twimg.com/profile_images/1776692310107164672/jWYSz55O_x96.jpg",
                              "profile_interstitial_type": "",
                              "screen_name": "NeverFindU1",
                              "statuses_count": 8,
                              "translator_type": "none",
                              "verified": false,
                              "want_retweets": false,
                              "withheld_in_countries": []
                            },
                            "tipjar_settings": {}
                          }
                        },
                        "userDisplayType": "User"
                      },
                      "clientEventInfo": {
                        "component": "FollowersSgs",
                        "element": "user"
                      }
                    }
                  },
                  {
                    "entryId": "user-855391717532475395",
                    "sortIndex": "1811053341308878821",
                    "content": {
                      "entryType": "TimelineTimelineItem",
                      "__typename": "TimelineTimelineItem",
                      "itemContent": {
                        "itemType": "TimelineUser",
                        "__typename": "TimelineUser",
                        "user_results": {
                          "result": {
                            "__typename": "User",
                            "id": "VXNlcjo4NTUzOTE3MTc1MzI0NzUzOTU=",
                            "rest_id": "855391717532475395",
                            "affiliates_highlighted_label": {},
                            "has_graduated_access": true,
                            "is_blue_verified": false,
                            "profile_image_shape": "Circle",
                            "legacy": {
                              "followed_by": true,
                              "protected": true,
                              "can_dm": true,
                              "can_media_tag": false,
                              "created_at": "Fri Apr 21 12:04:12 +0000 2017",
                              "default_profile": true,
                              "default_profile_image": false,
                              "description": "",
                              "entities": {
                                "description": {
                                  "urls": []
                                },
                                "url": {
                                  "urls": [
                                    {
                                      "display_url": "google.com",
                                      "expanded_url": "http://www.google.com",
                                      "url": "https://t.co/twxHxOtlG0",
                                      "indices": [0, 23]
                                    }
                                  ]
                                }
                              },
                              "fast_followers_count": 0,
                              "favourites_count": 975,
                              "followers_count": 11,
                              "friends_count": 557,
                              "has_custom_timelines": true,
                              "is_translator": false,
                              "listed_count": 0,
                              "location": "Kettering, MD",
                              "media_count": 7,
                              "name": "v",
                              "normal_followers_count": 11,
                              "pinned_tweet_ids_str": [],
                              "possibly_sensitive": false,
                              "profile_banner_url": "https://pbs.twimg.com/profile_banners/855391717532475395/1578884726",
                              "profile_image_url_https": "https://pbs.twimg.com/profile_images/913845101243387904/P6W_H6pC_x96.jpg",
                              "profile_interstitial_type": "",
                              "screen_name": "ShadowAdmin",
                              "statuses_count": 127,
                              "translator_type": "none",
                              "url": "https://t.co/twxHxOtlG0",
                              "verified": false,
                              "want_retweets": false,
                              "withheld_in_countries": []
                            },
                            "tipjar_settings": {}
                          }
                        },
                        "userDisplayType": "User"
                      },
                      "clientEventInfo": {
                        "component": "FollowersSgs",
                        "element": "user"
                      }
                    }
                  },
                  {
                    "entryId": "user-974696640824016901",
                    "sortIndex": "1811053341308878820",
                    "content": {
                      "entryType": "TimelineTimelineItem",
                      "__typename": "TimelineTimelineItem",
                      "itemContent": {
                        "itemType": "TimelineUser",
                        "__typename": "TimelineUser",
                        "user_results": {
                          "result": {
                            "__typename": "User",
                            "id": "VXNlcjo5NzQ2OTY2NDA4MjQwMTY5MDE=",
                            "rest_id": "974696640824016901",
                            "affiliates_highlighted_label": {},
                            "has_graduated_access": true,
                            "is_blue_verified": false,
                            "profile_image_shape": "Circle",
                            "legacy": {
                              "followed_by": true,
                              "can_dm": true,
                              "can_media_tag": true,
                              "created_at": "Fri Mar 16 17:19:22 +0000 2018",
                              "default_profile": true,
                              "default_profile_image": false,
                              "description": "前端开发者",
                              "entities": {
                                "description": {
                                  "urls": []
                                },
                                "url": {
                                  "urls": [
                                    {
                                      "display_url": "bento.me/xvoy",
                                      "expanded_url": "https://bento.me/xvoy",
                                      "url": "https://t.co/I1KnCkE2Bl",
                                      "indices": [0, 23]
                                    }
                                  ]
                                }
                              },
                              "fast_followers_count": 0,
                              "favourites_count": 334,
                              "followers_count": 28,
                              "friends_count": 244,
                              "has_custom_timelines": true,
                              "is_translator": false,
                              "listed_count": 0,
                              "location": "",
                              "media_count": 29,
                              "name": "XVoy",
                              "normal_followers_count": 28,
                              "pinned_tweet_ids_str": [],
                              "possibly_sensitive": false,
                              "profile_banner_url": "https://pbs.twimg.com/profile_banners/974696640824016901/1690858549",
                              "profile_image_url_https": "https://pbs.twimg.com/profile_images/1685814295328927744/w-g9KYQX_x96.jpg",
                              "profile_interstitial_type": "",
                              "screen_name": "leslie_kais",
                              "statuses_count": 112,
                              "translator_type": "none",
                              "url": "https://t.co/I1KnCkE2Bl",
                              "verified": false,
                              "want_retweets": false,
                              "withheld_in_countries": []
                            },
                            "professional": {
                              "rest_id": "1686232635478315009",
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
                        "component": "FollowersSgs",
                        "element": "user"
                      }
                    }
                  },
                  {
                    "entryId": "user-1594260560962457600",
                    "sortIndex": "1811053341308878819",
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
                              "followers_count": 2568,
                              "friends_count": 39,
                              "has_custom_timelines": false,
                              "is_translator": false,
                              "listed_count": 18,
                              "location": "Seattle, WA",
                              "media_count": 76,
                              "name": "独立开发者William",
                              "normal_followers_count": 2568,
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
                        "component": "FollowersSgs",
                        "element": "user"
                      }
                    }
                  },
                  {
                    "entryId": "user-1723728506700623872",
                    "sortIndex": "1811053341308878818",
                    "content": {
                      "entryType": "TimelineTimelineItem",
                      "__typename": "TimelineTimelineItem",
                      "itemContent": {
                        "itemType": "TimelineUser",
                        "__typename": "TimelineUser",
                        "user_results": {
                          "result": {
                            "__typename": "User",
                            "id": "VXNlcjoxNzIzNzI4NTA2NzAwNjIzODcy",
                            "rest_id": "1723728506700623872",
                            "affiliates_highlighted_label": {},
                            "has_graduated_access": false,
                            "is_blue_verified": false,
                            "profile_image_shape": "Circle",
                            "legacy": {
                              "followed_by": true,
                              "can_dm": true,
                              "can_media_tag": true,
                              "created_at": "Sun Nov 12 15:46:17 +0000 2023",
                              "default_profile": true,
                              "default_profile_image": false,
                              "description": "",
                              "entities": {
                                "description": {
                                  "urls": []
                                }
                              },
                              "fast_followers_count": 0,
                              "favourites_count": 115,
                              "followers_count": 23,
                              "friends_count": 31,
                              "has_custom_timelines": false,
                              "is_translator": false,
                              "listed_count": 0,
                              "location": "",
                              "media_count": 0,
                              "name": "overlord",
                              "normal_followers_count": 23,
                              "pinned_tweet_ids_str": [],
                              "possibly_sensitive": false,
                              "profile_image_url_https": "https://pbs.twimg.com/profile_images/1808498878964232192/MKrSVYBU_x96.jpg",
                              "profile_interstitial_type": "",
                              "screen_name": "is7515437284845",
                              "statuses_count": 13,
                              "translator_type": "none",
                              "verified": false,
                              "want_retweets": false,
                              "withheld_in_countries": []
                            },
                            "tipjar_settings": {}
                          }
                        },
                        "userDisplayType": "User"
                      },
                      "clientEventInfo": {
                        "component": "FollowersSgs",
                        "element": "user"
                      }
                    }
                  },
                  {
                    "entryId": "user-2240105430",
                    "sortIndex": "1811053341308878817",
                    "content": {
                      "entryType": "TimelineTimelineItem",
                      "__typename": "TimelineTimelineItem",
                      "itemContent": {
                        "itemType": "TimelineUser",
                        "__typename": "TimelineUser",
                        "user_results": {
                          "result": {
                            "__typename": "User",
                            "id": "VXNlcjoyMjQwMTA1NDMw",
                            "rest_id": "2240105430",
                            "affiliates_highlighted_label": {},
                            "has_graduated_access": true,
                            "is_blue_verified": false,
                            "profile_image_shape": "Circle",
                            "legacy": {
                              "followed_by": true,
                              "can_dm": true,
                              "can_media_tag": false,
                              "created_at": "Wed Dec 11 03:11:49 +0000 2013",
                              "default_profile": false,
                              "default_profile_image": false,
                              "description": "",
                              "entities": {
                                "description": {
                                  "urls": []
                                }
                              },
                              "fast_followers_count": 0,
                              "favourites_count": 2616,
                              "followers_count": 28,
                              "friends_count": 1023,
                              "has_custom_timelines": false,
                              "is_translator": false,
                              "listed_count": 0,
                              "location": "",
                              "media_count": 0,
                              "name": "시시포스",
                              "normal_followers_count": 28,
                              "pinned_tweet_ids_str": [],
                              "possibly_sensitive": true,
                              "profile_banner_url": "https://pbs.twimg.com/profile_banners/2240105430/1662097437",
                              "profile_image_url_https": "https://pbs.twimg.com/profile_images/1565575883531792384/egBDeQt3_x96.jpg",
                              "profile_interstitial_type": "",
                              "screen_name": "0IlIN0IliIliR0l",
                              "statuses_count": 0,
                              "translator_type": "regular",
                              "verified": false,
                              "want_retweets": false,
                              "withheld_in_countries": []
                            },
                            "tipjar_settings": {}
                          }
                        },
                        "userDisplayType": "User"
                      },
                      "clientEventInfo": {
                        "component": "FollowersSgs",
                        "element": "user"
                      }
                    }
                  },
                  {
                    "entryId": "user-11765952",
                    "sortIndex": "1811053341308878816",
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
                              "media_count": 730,
                              "name": "Justin",
                              "normal_followers_count": 6842,
                              "pinned_tweet_ids_str": ["1795763123179450503"],
                              "possibly_sensitive": false,
                              "profile_banner_url": "https://pbs.twimg.com/profile_banners/11765952/1712804144",
                              "profile_image_url_https": "https://pbs.twimg.com/profile_images/1791761180610211840/JrLnAGtF_x96.jpg",
                              "profile_interstitial_type": "",
                              "screen_name": "interjc",
                              "statuses_count": 9223,
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
                        "component": "FollowersSgs",
                        "element": "user"
                      }
                    }
                  },
                  {
                    "entryId": "user-1142360594315542529",
                    "sortIndex": "1811053341308878815",
                    "content": {
                      "entryType": "TimelineTimelineItem",
                      "__typename": "TimelineTimelineItem",
                      "itemContent": {
                        "itemType": "TimelineUser",
                        "__typename": "TimelineUser",
                        "user_results": {
                          "result": {
                            "__typename": "User",
                            "id": "VXNlcjoxMTQyMzYwNTk0MzE1NTQyNTI5",
                            "rest_id": "1142360594315542529",
                            "affiliates_highlighted_label": {},
                            "has_graduated_access": true,
                            "is_blue_verified": false,
                            "profile_image_shape": "Circle",
                            "legacy": {
                              "followed_by": true,
                              "can_dm": true,
                              "can_media_tag": true,
                              "created_at": "Sat Jun 22 09:16:04 +0000 2019",
                              "default_profile": false,
                              "default_profile_image": false,
                              "description": "run",
                              "entities": {
                                "description": {
                                  "urls": []
                                }
                              },
                              "fast_followers_count": 0,
                              "favourites_count": 1238,
                              "followers_count": 89,
                              "friends_count": 799,
                              "has_custom_timelines": true,
                              "is_translator": false,
                              "listed_count": 1,
                              "location": "earth",
                              "media_count": 3,
                              "name": "Hehoku",
                              "normal_followers_count": 89,
                              "pinned_tweet_ids_str": [],
                              "possibly_sensitive": false,
                              "profile_banner_url": "https://pbs.twimg.com/profile_banners/1142360594315542529/1683726873",
                              "profile_image_url_https": "https://pbs.twimg.com/profile_images/1709572001504100352/pcXe30H5_x96.jpg",
                              "profile_interstitial_type": "",
                              "screen_name": "0xHehoku",
                              "statuses_count": 15,
                              "translator_type": "none",
                              "verified": false,
                              "want_retweets": false,
                              "withheld_in_countries": []
                            },
                            "tipjar_settings": {}
                          }
                        },
                        "userDisplayType": "User"
                      },
                      "clientEventInfo": {
                        "component": "FollowersSgs",
                        "element": "user"
                      }
                    }
                  },
                  {
                    "entryId": "user-963063252425961472",
                    "sortIndex": "1811053341308878814",
                    "content": {
                      "entryType": "TimelineTimelineItem",
                      "__typename": "TimelineTimelineItem",
                      "itemContent": {
                        "itemType": "TimelineUser",
                        "__typename": "TimelineUser",
                        "user_results": {
                          "result": {
                            "__typename": "User",
                            "id": "VXNlcjo5NjMwNjMyNTI0MjU5NjE0NzI=",
                            "rest_id": "963063252425961472",
                            "affiliates_highlighted_label": {},
                            "has_graduated_access": true,
                            "is_blue_verified": false,
                            "profile_image_shape": "Circle",
                            "legacy": {
                              "followed_by": true,
                              "can_dm": true,
                              "can_media_tag": true,
                              "created_at": "Mon Feb 12 14:52:27 +0000 2018",
                              "default_profile": true,
                              "default_profile_image": false,
                              "description": "",
                              "entities": {
                                "description": {
                                  "urls": []
                                }
                              },
                              "fast_followers_count": 0,
                              "favourites_count": 39,
                              "followers_count": 133,
                              "friends_count": 967,
                              "has_custom_timelines": false,
                              "is_translator": false,
                              "listed_count": 0,
                              "location": "",
                              "media_count": 0,
                              "name": "bingo2018",
                              "normal_followers_count": 133,
                              "pinned_tweet_ids_str": [],
                              "possibly_sensitive": false,
                              "profile_banner_url": "https://pbs.twimg.com/profile_banners/963063252425961472/1662270485",
                              "profile_image_url_https": "https://pbs.twimg.com/profile_images/1566302001868472321/fc-OVEe3_x96.jpg",
                              "profile_interstitial_type": "",
                              "screen_name": "bingo201802",
                              "statuses_count": 5,
                              "translator_type": "none",
                              "verified": false,
                              "want_retweets": false,
                              "withheld_in_countries": []
                            },
                            "tipjar_settings": {}
                          }
                        },
                        "userDisplayType": "User"
                      },
                      "clientEventInfo": {
                        "component": "FollowersSgs",
                        "element": "user"
                      }
                    }
                  },
                  {
                    "entryId": "user-1773194789061574656",
                    "sortIndex": "1811053341308878813",
                    "content": {
                      "entryType": "TimelineTimelineItem",
                      "__typename": "TimelineTimelineItem",
                      "itemContent": {
                        "itemType": "TimelineUser",
                        "__typename": "TimelineUser",
                        "user_results": {
                          "result": {
                            "__typename": "User",
                            "id": "VXNlcjoxNzczMTk0Nzg5MDYxNTc0NjU2",
                            "rest_id": "1773194789061574656",
                            "affiliates_highlighted_label": {},
                            "has_graduated_access": false,
                            "is_blue_verified": false,
                            "profile_image_shape": "Circle",
                            "legacy": {
                              "followed_by": true,
                              "can_dm": true,
                              "can_media_tag": true,
                              "created_at": "Thu Mar 28 03:46:25 +0000 2024",
                              "default_profile": true,
                              "default_profile_image": false,
                              "description": "Free stock investing teaching from the team of a mature company\nProfit exceeds 500%\nGrupo do WhatsApp:https://t.co/ZhFzYvXZxg",
                              "entities": {
                                "description": {
                                  "urls": [
                                    {
                                      "display_url": "chat.whatsapp.com/CeD9MQeUTO1CsK…",
                                      "expanded_url": "http://chat.whatsapp.com/CeD9MQeUTO1CsKbipZfBLL",
                                      "url": "https://t.co/ZhFzYvXZxg",
                                      "indices": [102, 125]
                                    }
                                  ]
                                }
                              },
                              "fast_followers_count": 0,
                              "favourites_count": 0,
                              "followers_count": 6,
                              "friends_count": 176,
                              "has_custom_timelines": false,
                              "is_translator": false,
                              "listed_count": 0,
                              "location": "Brasileira",
                              "media_count": 0,
                              "name": "Ações brasileiras",
                              "normal_followers_count": 6,
                              "pinned_tweet_ids_str": [],
                              "possibly_sensitive": false,
                              "profile_image_url_https": "https://pbs.twimg.com/profile_images/1809667664371167232/7oFKNFjc_x96.jpg",
                              "profile_interstitial_type": "",
                              "screen_name": "0ilk7q63nxr5",
                              "statuses_count": 0,
                              "translator_type": "none",
                              "verified": false,
                              "want_retweets": false,
                              "withheld_in_countries": []
                            },
                            "tipjar_settings": {}
                          }
                        },
                        "userDisplayType": "User"
                      },
                      "clientEventInfo": {
                        "component": "FollowersSgs",
                        "element": "user"
                      }
                    }
                  },
                  {
                    "entryId": "user-1460156162",
                    "sortIndex": "1811053341308878812",
                    "content": {
                      "entryType": "TimelineTimelineItem",
                      "__typename": "TimelineTimelineItem",
                      "itemContent": {
                        "itemType": "TimelineUser",
                        "__typename": "TimelineUser",
                        "user_results": {
                          "result": {
                            "__typename": "User",
                            "id": "VXNlcjoxNDYwMTU2MTYy",
                            "rest_id": "1460156162",
                            "affiliates_highlighted_label": {},
                            "has_graduated_access": true,
                            "is_blue_verified": false,
                            "profile_image_shape": "Circle",
                            "legacy": {
                              "followed_by": true,
                              "can_dm": true,
                              "can_media_tag": false,
                              "created_at": "Sun May 26 17:06:49 +0000 2013",
                              "default_profile": false,
                              "default_profile_image": false,
                              "description": "南墙不怕撞，死猪不怕烫",
                              "entities": {
                                "description": {
                                  "urls": []
                                }
                              },
                              "fast_followers_count": 0,
                              "favourites_count": 31,
                              "followers_count": 23,
                              "friends_count": 485,
                              "has_custom_timelines": true,
                              "is_translator": false,
                              "listed_count": 1,
                              "location": "California, USA",
                              "media_count": 0,
                              "name": "猪怕壮",
                              "normal_followers_count": 23,
                              "pinned_tweet_ids_str": [],
                              "possibly_sensitive": false,
                              "profile_banner_url": "https://pbs.twimg.com/profile_banners/1460156162/1693663391",
                              "profile_image_url_https": "https://pbs.twimg.com/profile_images/3721161316/8bef93d2d633ff81feb8ce6b40167f76_x96.jpeg",
                              "profile_interstitial_type": "",
                              "screen_name": "zhupazhuang",
                              "statuses_count": 4,
                              "translator_type": "none",
                              "verified": false,
                              "want_retweets": false,
                              "withheld_in_countries": []
                            },
                            "professional": {
                              "rest_id": "1455945828518940756",
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
                        "component": "FollowersSgs",
                        "element": "user"
                      }
                    }
                  },
                  {
                    "entryId": "user-1362432932581838859",
                    "sortIndex": "1811053341308878811",
                    "content": {
                      "entryType": "TimelineTimelineItem",
                      "__typename": "TimelineTimelineItem",
                      "itemContent": {
                        "itemType": "TimelineUser",
                        "__typename": "TimelineUser",
                        "user_results": {
                          "result": {
                            "__typename": "User",
                            "id": "VXNlcjoxMzYyNDMyOTMyNTgxODM4ODU5",
                            "rest_id": "1362432932581838859",
                            "affiliates_highlighted_label": {},
                            "has_graduated_access": true,
                            "is_blue_verified": false,
                            "profile_image_shape": "Circle",
                            "legacy": {
                              "followed_by": true,
                              "can_dm": true,
                              "can_media_tag": true,
                              "created_at": "Thu Feb 18 16:05:13 +0000 2021",
                              "default_profile": true,
                              "default_profile_image": false,
                              "description": "",
                              "entities": {
                                "description": {
                                  "urls": []
                                }
                              },
                              "fast_followers_count": 0,
                              "favourites_count": 1054,
                              "followers_count": 75,
                              "friends_count": 993,
                              "has_custom_timelines": true,
                              "is_translator": false,
                              "listed_count": 2,
                              "location": "",
                              "media_count": 4,
                              "name": "Conan",
                              "normal_followers_count": 75,
                              "pinned_tweet_ids_str": [],
                              "possibly_sensitive": false,
                              "profile_image_url_https": "https://pbs.twimg.com/profile_images/1583137535693590529/zHmgSu_S_x96.jpg",
                              "profile_interstitial_type": "",
                              "screen_name": "c59485128",
                              "statuses_count": 265,
                              "translator_type": "none",
                              "verified": false,
                              "want_retweets": false,
                              "withheld_in_countries": []
                            },
                            "tipjar_settings": {}
                          }
                        },
                        "userDisplayType": "User"
                      },
                      "clientEventInfo": {
                        "component": "FollowersSgs",
                        "element": "user"
                      }
                    }
                  },
                  {
                    "entryId": "user-1689843361476431872",
                    "sortIndex": "1811053341308878810",
                    "content": {
                      "entryType": "TimelineTimelineItem",
                      "__typename": "TimelineTimelineItem",
                      "itemContent": {
                        "itemType": "TimelineUser",
                        "__typename": "TimelineUser",
                        "user_results": {
                          "result": {
                            "__typename": "User",
                            "id": "VXNlcjoxNjg5ODQzMzYxNDc2NDMxODcy",
                            "rest_id": "1689843361476431872",
                            "affiliates_highlighted_label": {},
                            "has_graduated_access": false,
                            "is_blue_verified": false,
                            "profile_image_shape": "Circle",
                            "legacy": {
                              "followed_by": true,
                              "can_dm": true,
                              "can_media_tag": false,
                              "created_at": "Fri Aug 11 03:37:29 +0000 2023",
                              "default_profile": true,
                              "default_profile_image": false,
                              "description": "ceXey",
                              "entities": {
                                "description": {
                                  "urls": []
                                }
                              },
                              "fast_followers_count": 0,
                              "favourites_count": 162,
                              "followers_count": 163,
                              "friends_count": 657,
                              "has_custom_timelines": false,
                              "is_translator": false,
                              "listed_count": 0,
                              "location": "",
                              "media_count": 1,
                              "name": "ZXL",
                              "normal_followers_count": 163,
                              "pinned_tweet_ids_str": [],
                              "possibly_sensitive": true,
                              "profile_banner_url": "https://pbs.twimg.com/profile_banners/1689843361476431872/1695232389",
                              "profile_image_url_https": "https://pbs.twimg.com/profile_images/1689843668902170624/8xgH7E6d_x96.jpg",
                              "profile_interstitial_type": "",
                              "screen_name": "A_FakeStudio",
                              "statuses_count": 31,
                              "translator_type": "none",
                              "verified": false,
                              "want_retweets": false,
                              "withheld_in_countries": []
                            },
                            "professional": {
                              "rest_id": "1689845062291931454",
                              "professional_type": "Creator",
                              "category": [
                                {
                                  "id": 477,
                                  "name": "Professional Services",
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
                        "component": "FollowersSgs",
                        "element": "user"
                      }
                    }
                  },
                  {
                    "entryId": "user-1679635511089180672",
                    "sortIndex": "1811053341308878809",
                    "content": {
                      "entryType": "TimelineTimelineItem",
                      "__typename": "TimelineTimelineItem",
                      "itemContent": {
                        "itemType": "TimelineUser",
                        "__typename": "TimelineUser",
                        "user_results": {
                          "result": {
                            "__typename": "User",
                            "id": "VXNlcjoxNjc5NjM1NTExMDg5MTgwNjcy",
                            "rest_id": "1679635511089180672",
                            "affiliates_highlighted_label": {},
                            "has_graduated_access": true,
                            "is_blue_verified": false,
                            "profile_image_shape": "Circle",
                            "legacy": {
                              "followed_by": true,
                              "can_dm": true,
                              "can_media_tag": true,
                              "created_at": "Thu Jul 13 23:35:01 +0000 2023",
                              "default_profile": true,
                              "default_profile_image": true,
                              "description": "",
                              "entities": {
                                "description": {
                                  "urls": []
                                }
                              },
                              "fast_followers_count": 0,
                              "favourites_count": 5,
                              "followers_count": 17,
                              "friends_count": 139,
                              "has_custom_timelines": false,
                              "is_translator": false,
                              "listed_count": 0,
                              "location": "",
                              "media_count": 0,
                              "name": "wk-lau",
                              "normal_followers_count": 17,
                              "pinned_tweet_ids_str": [],
                              "possibly_sensitive": false,
                              "profile_image_url_https": "https://abs.twimg.com/sticky/default_profile_images/default_profile_x96.png",
                              "profile_interstitial_type": "",
                              "screen_name": "wk_lau930113",
                              "statuses_count": 35,
                              "translator_type": "none",
                              "verified": false,
                              "want_retweets": false,
                              "withheld_in_countries": []
                            },
                            "tipjar_settings": {}
                          }
                        },
                        "userDisplayType": "User"
                      },
                      "clientEventInfo": {
                        "component": "FollowersSgs",
                        "element": "user"
                      }
                    }
                  },
                  {
                    "entryId": "user-1135186306085019649",
                    "sortIndex": "1811053341308878808",
                    "content": {
                      "entryType": "TimelineTimelineItem",
                      "__typename": "TimelineTimelineItem",
                      "itemContent": {
                        "itemType": "TimelineUser",
                        "__typename": "TimelineUser",
                        "user_results": {
                          "result": {
                            "__typename": "User",
                            "id": "VXNlcjoxMTM1MTg2MzA2MDg1MDE5NjQ5",
                            "rest_id": "1135186306085019649",
                            "affiliates_highlighted_label": {},
                            "has_graduated_access": true,
                            "is_blue_verified": false,
                            "profile_image_shape": "Circle",
                            "legacy": {
                              "followed_by": true,
                              "can_dm": true,
                              "can_media_tag": true,
                              "created_at": "Sun Jun 02 14:08:00 +0000 2019",
                              "default_profile": true,
                              "default_profile_image": false,
                              "description": "",
                              "entities": {
                                "description": {
                                  "urls": []
                                }
                              },
                              "fast_followers_count": 0,
                              "favourites_count": 22144,
                              "followers_count": 266,
                              "friends_count": 2537,
                              "has_custom_timelines": true,
                              "is_translator": false,
                              "listed_count": 2,
                              "location": "",
                              "media_count": 8,
                              "name": "小鱼儿",
                              "normal_followers_count": 266,
                              "pinned_tweet_ids_str": [],
                              "possibly_sensitive": false,
                              "profile_image_url_https": "https://pbs.twimg.com/profile_images/1319802319626670080/ngrHfcgZ_x96.jpg",
                              "profile_interstitial_type": "",
                              "screen_name": "xiaoyuer6688",
                              "statuses_count": 7199,
                              "translator_type": "none",
                              "verified": false,
                              "want_retweets": false,
                              "withheld_in_countries": []
                            },
                            "tipjar_settings": {}
                          }
                        },
                        "userDisplayType": "User"
                      },
                      "clientEventInfo": {
                        "component": "FollowersSgs",
                        "element": "user"
                      }
                    }
                  },
                  {
                    "entryId": "user-1276184938220380160",
                    "sortIndex": "1811053341308878807",
                    "content": {
                      "entryType": "TimelineTimelineItem",
                      "__typename": "TimelineTimelineItem",
                      "itemContent": {
                        "itemType": "TimelineUser",
                        "__typename": "TimelineUser",
                        "user_results": {
                          "result": {
                            "__typename": "User",
                            "id": "VXNlcjoxMjc2MTg0OTM4MjIwMzgwMTYw",
                            "rest_id": "1276184938220380160",
                            "affiliates_highlighted_label": {},
                            "has_graduated_access": true,
                            "is_blue_verified": false,
                            "profile_image_shape": "Circle",
                            "legacy": {
                              "followed_by": true,
                              "can_dm": true,
                              "can_media_tag": true,
                              "created_at": "Thu Jun 25 16:07:02 +0000 2020",
                              "default_profile": true,
                              "default_profile_image": false,
                              "description": "",
                              "entities": {
                                "description": {
                                  "urls": []
                                }
                              },
                              "fast_followers_count": 0,
                              "favourites_count": 536,
                              "followers_count": 27,
                              "friends_count": 351,
                              "has_custom_timelines": false,
                              "is_translator": false,
                              "listed_count": 0,
                              "location": "Japan",
                              "media_count": 6,
                              "name": "Beautiful feet",
                              "normal_followers_count": 27,
                              "pinned_tweet_ids_str": [],
                              "possibly_sensitive": false,
                              "profile_image_url_https": "https://pbs.twimg.com/profile_images/1276187276389711872/Ws06BSJt_x96.jpg",
                              "profile_interstitial_type": "",
                              "screen_name": "Beautif79475049",
                              "statuses_count": 6,
                              "translator_type": "none",
                              "verified": false,
                              "want_retweets": false,
                              "withheld_in_countries": []
                            },
                            "tipjar_settings": {}
                          }
                        },
                        "userDisplayType": "User"
                      },
                      "clientEventInfo": {
                        "component": "FollowersSgs",
                        "element": "user"
                      }
                    }
                  },
                  {
                    "entryId": "user-1212718869187420160",
                    "sortIndex": "1811053341308878806",
                    "content": {
                      "entryType": "TimelineTimelineItem",
                      "__typename": "TimelineTimelineItem",
                      "itemContent": {
                        "itemType": "TimelineUser",
                        "__typename": "TimelineUser",
                        "user_results": {
                          "result": {
                            "__typename": "User",
                            "id": "VXNlcjoxMjEyNzE4ODY5MTg3NDIwMTYw",
                            "rest_id": "1212718869187420160",
                            "affiliates_highlighted_label": {},
                            "has_graduated_access": true,
                            "is_blue_verified": false,
                            "profile_image_shape": "Circle",
                            "legacy": {
                              "followed_by": true,
                              "can_dm": true,
                              "can_media_tag": true,
                              "created_at": "Thu Jan 02 12:54:53 +0000 2020",
                              "default_profile": true,
                              "default_profile_image": false,
                              "description": "",
                              "entities": {
                                "description": {
                                  "urls": []
                                }
                              },
                              "fast_followers_count": 0,
                              "favourites_count": 1829,
                              "followers_count": 166,
                              "friends_count": 762,
                              "has_custom_timelines": true,
                              "is_translator": false,
                              "listed_count": 0,
                              "location": "",
                              "media_count": 36,
                              "name": "leo",
                              "normal_followers_count": 166,
                              "pinned_tweet_ids_str": [],
                              "possibly_sensitive": false,
                              "profile_banner_url": "https://pbs.twimg.com/profile_banners/1212718869187420160/1668347860",
                              "profile_image_url_https": "https://pbs.twimg.com/profile_images/1592460478705332224/a5urC8FS_x96.jpg",
                              "profile_interstitial_type": "",
                              "screen_name": "leo48591510",
                              "statuses_count": 1838,
                              "translator_type": "none",
                              "verified": false,
                              "want_retweets": false,
                              "withheld_in_countries": []
                            },
                            "tipjar_settings": {}
                          }
                        },
                        "userDisplayType": "User"
                      },
                      "clientEventInfo": {
                        "component": "FollowersSgs",
                        "element": "user"
                      }
                    }
                  },
                  {
                    "entryId": "user-1721112666016792576",
                    "sortIndex": "1811053341308878805",
                    "content": {
                      "entryType": "TimelineTimelineItem",
                      "__typename": "TimelineTimelineItem",
                      "itemContent": {
                        "itemType": "TimelineUser",
                        "__typename": "TimelineUser",
                        "user_results": {
                          "result": {
                            "__typename": "User",
                            "id": "VXNlcjoxNzIxMTEyNjY2MDE2NzkyNTc2",
                            "rest_id": "1721112666016792576",
                            "affiliates_highlighted_label": {},
                            "has_graduated_access": true,
                            "is_blue_verified": false,
                            "profile_image_shape": "Circle",
                            "legacy": {
                              "followed_by": true,
                              "can_dm": true,
                              "can_media_tag": true,
                              "created_at": "Sun Nov 05 10:30:28 +0000 2023",
                              "default_profile": true,
                              "default_profile_image": false,
                              "description": "",
                              "entities": {
                                "description": {
                                  "urls": []
                                }
                              },
                              "fast_followers_count": 0,
                              "favourites_count": 40,
                              "followers_count": 22,
                              "friends_count": 101,
                              "has_custom_timelines": false,
                              "is_translator": false,
                              "listed_count": 0,
                              "location": "Taiwan",
                              "media_count": 5,
                              "name": "Garrix龍\uD83D\uDC32",
                              "normal_followers_count": 22,
                              "pinned_tweet_ids_str": [],
                              "possibly_sensitive": false,
                              "profile_banner_url": "https://pbs.twimg.com/profile_banners/1721112666016792576/1702752787",
                              "profile_image_url_https": "https://pbs.twimg.com/profile_images/1791784756067414016/xXUqqCxq_x96.jpg",
                              "profile_interstitial_type": "",
                              "screen_name": "Martin334611459",
                              "statuses_count": 27,
                              "translator_type": "none",
                              "verified": false,
                              "want_retweets": false,
                              "withheld_in_countries": []
                            },
                            "tipjar_settings": {}
                          }
                        },
                        "userDisplayType": "User"
                      },
                      "clientEventInfo": {
                        "component": "FollowersSgs",
                        "element": "user"
                      }
                    }
                  },
                  {
                    "entryId": "user-1761999468931747840",
                    "sortIndex": "1811053341308878804",
                    "content": {
                      "entryType": "TimelineTimelineItem",
                      "__typename": "TimelineTimelineItem",
                      "itemContent": {
                        "itemType": "TimelineUser",
                        "__typename": "TimelineUser",
                        "user_results": {
                          "result": {
                            "__typename": "User",
                            "id": "VXNlcjoxNzYxOTk5NDY4OTMxNzQ3ODQw",
                            "rest_id": "1761999468931747840",
                            "affiliates_highlighted_label": {},
                            "has_graduated_access": true,
                            "is_blue_verified": false,
                            "profile_image_shape": "Circle",
                            "legacy": {
                              "followed_by": true,
                              "can_dm": true,
                              "can_media_tag": true,
                              "created_at": "Mon Feb 26 06:19:54 +0000 2024",
                              "default_profile": true,
                              "default_profile_image": false,
                              "description": "web3游泳\uD83C\uDFCA   ，永亏玩家 ，想赚钱",
                              "entities": {
                                "description": {
                                  "urls": []
                                }
                              },
                              "fast_followers_count": 0,
                              "favourites_count": 9,
                              "followers_count": 50,
                              "friends_count": 129,
                              "has_custom_timelines": false,
                              "is_translator": false,
                              "listed_count": 0,
                              "location": "",
                              "media_count": 2,
                              "name": "按时吃饭",
                              "normal_followers_count": 50,
                              "pinned_tweet_ids_str": ["1768806042316796269"],
                              "possibly_sensitive": false,
                              "profile_banner_url": "https://pbs.twimg.com/profile_banners/1761999468931747840/1719070295",
                              "profile_image_url_https": "https://pbs.twimg.com/profile_images/1804537676646715392/8gWpWktG_x96.jpg",
                              "profile_interstitial_type": "",
                              "screen_name": "jjyyoii",
                              "statuses_count": 61,
                              "translator_type": "none",
                              "verified": false,
                              "want_retweets": false,
                              "withheld_in_countries": []
                            },
                            "professional": {
                              "rest_id": "1762345753845080468",
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
                              "is_enabled": true,
                              "ethereum_handle": "0xe1267C7C0285518c1D9BF6Ac4C5017b110a698cc"
                            }
                          }
                        },
                        "userDisplayType": "User"
                      },
                      "clientEventInfo": {
                        "component": "FollowersSgs",
                        "element": "user"
                      }
                    }
                  },
                  {
                    "entryId": "user-1648944372489023488",
                    "sortIndex": "1811053341308878803",
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
                        "component": "FollowersSgs",
                        "element": "user"
                      }
                    }
                  },
                  {
                    "entryId": "user-1805397147648712704",
                    "sortIndex": "1811053341308878802",
                    "content": {
                      "entryType": "TimelineTimelineItem",
                      "__typename": "TimelineTimelineItem",
                      "itemContent": {
                        "itemType": "TimelineUser",
                        "__typename": "TimelineUser",
                        "user_results": {
                          "result": {
                            "__typename": "User",
                            "id": "VXNlcjoxODA1Mzk3MTQ3NjQ4NzEyNzA0",
                            "rest_id": "1805397147648712704",
                            "affiliates_highlighted_label": {},
                            "has_graduated_access": false,
                            "is_blue_verified": false,
                            "profile_image_shape": "Circle",
                            "legacy": {
                              "followed_by": true,
                              "can_dm": true,
                              "can_media_tag": true,
                              "created_at": "Tue Jun 25 00:27:24 +0000 2024",
                              "default_profile": true,
                              "default_profile_image": false,
                              "description": "古今多少事，都付笑谈中",
                              "entities": {
                                "description": {
                                  "urls": []
                                }
                              },
                              "fast_followers_count": 0,
                              "favourites_count": 11,
                              "followers_count": 56,
                              "friends_count": 85,
                              "has_custom_timelines": false,
                              "is_translator": false,
                              "listed_count": 0,
                              "location": "",
                              "media_count": 2,
                              "name": "Brandie Aleo",
                              "normal_followers_count": 56,
                              "pinned_tweet_ids_str": [],
                              "possibly_sensitive": false,
                              "profile_banner_url": "https://pbs.twimg.com/profile_banners/1805397147648712704/1719275563",
                              "profile_image_url_https": "https://pbs.twimg.com/profile_images/1805398684181708803/8eXK94gF_x96.jpg",
                              "profile_interstitial_type": "",
                              "screen_name": "liuyidao1234",
                              "statuses_count": 4,
                              "translator_type": "none",
                              "verified": false,
                              "want_retweets": false,
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
                        "component": "FollowersSgs",
                        "element": "user"
                      }
                    }
                  },
                  {
                    "entryId": "user-1155756485739028480",
                    "sortIndex": "1811053341308878801",
                    "content": {
                      "entryType": "TimelineTimelineItem",
                      "__typename": "TimelineTimelineItem",
                      "itemContent": {
                        "itemType": "TimelineUser",
                        "__typename": "TimelineUser",
                        "user_results": {
                          "result": {
                            "__typename": "User",
                            "id": "VXNlcjoxMTU1NzU2NDg1NzM5MDI4NDgw",
                            "rest_id": "1155756485739028480",
                            "affiliates_highlighted_label": {},
                            "has_graduated_access": true,
                            "is_blue_verified": false,
                            "profile_image_shape": "Circle",
                            "legacy": {
                              "followed_by": true,
                              "can_dm": true,
                              "can_media_tag": true,
                              "created_at": "Mon Jul 29 08:26:33 +0000 2019",
                              "default_profile": true,
                              "default_profile_image": false,
                              "description": "",
                              "entities": {
                                "description": {
                                  "urls": []
                                }
                              },
                              "fast_followers_count": 0,
                              "favourites_count": 9555,
                              "followers_count": 121,
                              "friends_count": 1666,
                              "has_custom_timelines": true,
                              "is_translator": false,
                              "listed_count": 1,
                              "location": "",
                              "media_count": 14,
                              "name": "Francis Lee",
                              "normal_followers_count": 121,
                              "pinned_tweet_ids_str": [],
                              "possibly_sensitive": false,
                              "profile_banner_url": "https://pbs.twimg.com/profile_banners/1155756485739028480/1603866533",
                              "profile_image_url_https": "https://pbs.twimg.com/profile_images/1798647462896504832/i768MGWg_x96.jpg",
                              "profile_interstitial_type": "",
                              "screen_name": "Francis41671803",
                              "statuses_count": 4574,
                              "translator_type": "none",
                              "verified": false,
                              "want_retweets": false,
                              "withheld_in_countries": []
                            },
                            "tipjar_settings": {}
                          }
                        },
                        "userDisplayType": "User"
                      },
                      "clientEventInfo": {
                        "component": "FollowersSgs",
                        "element": "user"
                      }
                    }
                  },
                  {
                    "entryId": "user-1799131784493539329",
                    "sortIndex": "1811053341308878800",
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
                        "component": "FollowersSgs",
                        "element": "user"
                      }
                    }
                  },
                  {
                    "entryId": "user-1734078991747932160",
                    "sortIndex": "1811053341308878799",
                    "content": {
                      "entryType": "TimelineTimelineItem",
                      "__typename": "TimelineTimelineItem",
                      "itemContent": {
                        "itemType": "TimelineUser",
                        "__typename": "TimelineUser",
                        "user_results": {
                          "result": {
                            "__typename": "User",
                            "id": "VXNlcjoxNzM0MDc4OTkxNzQ3OTMyMTYw",
                            "rest_id": "1734078991747932160",
                            "affiliates_highlighted_label": {},
                            "has_graduated_access": true,
                            "is_blue_verified": false,
                            "profile_image_shape": "Circle",
                            "legacy": {
                              "followed_by": true,
                              "can_dm": true,
                              "can_media_tag": true,
                              "created_at": "Mon Dec 11 05:14:07 +0000 2023",
                              "default_profile": true,
                              "default_profile_image": false,
                              "description": "",
                              "entities": {
                                "description": {
                                  "urls": []
                                }
                              },
                              "fast_followers_count": 0,
                              "favourites_count": 4,
                              "followers_count": 118,
                              "friends_count": 347,
                              "has_custom_timelines": false,
                              "is_translator": false,
                              "listed_count": 0,
                              "location": "",
                              "media_count": 0,
                              "name": "chang 258",
                              "normal_followers_count": 118,
                              "pinned_tweet_ids_str": [],
                              "possibly_sensitive": false,
                              "profile_image_url_https": "https://pbs.twimg.com/profile_images/1734079093426327552/k7DwpAQU_x96.png",
                              "profile_interstitial_type": "",
                              "screen_name": "258Chang53016",
                              "statuses_count": 0,
                              "translator_type": "none",
                              "verified": false,
                              "want_retweets": false,
                              "withheld_in_countries": []
                            },
                            "tipjar_settings": {}
                          }
                        },
                        "userDisplayType": "User"
                      },
                      "clientEventInfo": {
                        "component": "FollowersSgs",
                        "element": "user"
                      }
                    }
                  },
                  {
                    "entryId": "cursor-bottom-1811053341308878798",
                    "sortIndex": "1811053341308878798",
                    "content": {
                      "entryType": "TimelineTimelineCursor",
                      "__typename": "TimelineTimelineCursor",
                      "value": "1803721296253803383|1811053341308878796",
                      "cursorType": "Bottom"
                    }
                  },
                  {
                    "entryId": "cursor-top-1811053341308878849",
                    "sortIndex": "1811053341308878849",
                    "content": {
                      "entryType": "TimelineTimelineCursor",
                      "__typename": "TimelineTimelineCursor",
                      "value": "-1|1811053341308878849",
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
