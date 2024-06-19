```js
fetch(
  'https://x.com/i/api/graphql/i78YDd0Tza-dV4SYs58kRg/BookmarkFoldersSlice?variables=%7B%7D',
  {
    body: null,
  },
)
```

```json
{
  "data": {
    "viewer": {
      "user_results": {
        "result": {
          "__typename": "User",
          "bookmark_collections_slice": {
            "items": [
              {
                "id": "1794418757911433313",
                "media": {
                  "id": "QXBpTWVkaWE6DAABCgABEx/eb/8VEAEKAAIQF4A+eBQgAAAA",
                  "media_key": "3_1378064583600967681",
                  "media_id": "1378064583600967681",
                  "media_info": {
                    "__typename": "ApiImage",
                    "original_img_height": 480,
                    "original_img_width": 480,
                    "original_img_url": "https://pbs.twimg.com/media/Ex_eb_8VEAEyVq2.png",
                    "color_info": {
                      "palette": [
                        {
                          "percentage": 88.9,
                          "rgb": {
                            "blue": 158,
                            "green": 197,
                            "red": 35
                          }
                        },
                        {
                          "percentage": 11.0,
                          "rgb": {
                            "blue": 255,
                            "green": 255,
                            "red": 255
                          }
                        }
                      ]
                    }
                  }
                },
                "name": "社会科学"
              },
              {
                "id": "1794165526627033447",
                "media": {
                  "id": "QXBpTWVkaWE6DAABCgABEx/epqdUYAAKAAIQF4A+eBQgAAAA",
                  "media_key": "3_1378064818351923200",
                  "media_id": "1378064818351923200",
                  "media_info": {
                    "__typename": "ApiImage",
                    "original_img_height": 480,
                    "original_img_width": 480,
                    "original_img_url": "https://pbs.twimg.com/media/Ex_epqdUYAAnVHr.png",
                    "color_info": {
                      "palette": [
                        {
                          "percentage": 100.0,
                          "rgb": {
                            "blue": 195,
                            "green": 181,
                            "red": 159
                          }
                        }
                      ]
                    }
                  }
                },
                "name": "邮件营销"
              },
              {
                "id": "1794004218426319192",
                "media": {
                  "id": "QXBpTWVkaWE6DAABCgABEx/fW5JVEAAKAAIQF4A+eBQgAAAA",
                  "media_key": "3_1378065595388727296",
                  "media_id": "1378065595388727296",
                  "media_info": {
                    "__typename": "ApiImage",
                    "original_img_height": 480,
                    "original_img_width": 480,
                    "original_img_url": "https://pbs.twimg.com/media/Ex_fW5JVEAAqRZ-.png",
                    "color_info": {
                      "palette": [
                        {
                          "percentage": 89.03,
                          "rgb": {
                            "blue": 162,
                            "green": 175,
                            "red": 255
                          }
                        },
                        {
                          "percentage": 10.97,
                          "rgb": {
                            "blue": 255,
                            "green": 255,
                            "red": 255
                          }
                        }
                      ]
                    }
                  }
                },
                "name": "GitHub"
              }
            ],
            "slice_info": {}
          }
        }
      }
    }
  }
}
```

```js
fetch(
  'https://x.com/i/api/graphql/e1T8IKkMr-8iQk7tNOyD_g/BookmarkFolderTimeline?variables=%7B%22bookmark_collection_id%22%3A%221794418757911433313%22%2C%22includePromotedContent%22%3Atrue%7D&features=%7B%22rweb_tipjar_consumption_enabled%22%3Atrue%2C%22responsive_web_graphql_exclude_directive_enabled%22%3Atrue%2C%22verified_phone_label_enabled%22%3Afalse%2C%22creator_subscriptions_tweet_preview_api_enabled%22%3Atrue%2C%22responsive_web_graphql_timeline_navigation_enabled%22%3Atrue%2C%22responsive_web_graphql_skip_user_profile_image_extensions_enabled%22%3Afalse%2C%22communities_web_enable_tweet_community_results_fetch%22%3Atrue%2C%22c9s_tweet_anatomy_moderator_badge_enabled%22%3Atrue%2C%22articles_preview_enabled%22%3Atrue%2C%22tweetypie_unmention_optimization_enabled%22%3Atrue%2C%22responsive_web_edit_tweet_api_enabled%22%3Atrue%2C%22graphql_is_translatable_rweb_tweet_is_translatable_enabled%22%3Atrue%2C%22view_counts_everywhere_api_enabled%22%3Atrue%2C%22longform_notetweets_consumption_enabled%22%3Atrue%2C%22responsive_web_twitter_article_tweet_consumption_enabled%22%3Atrue%2C%22tweet_awards_web_tipping_enabled%22%3Afalse%2C%22creator_subscriptions_quote_tweet_preview_enabled%22%3Afalse%2C%22freedom_of_speech_not_reach_fetch_enabled%22%3Atrue%2C%22standardized_nudges_misinfo%22%3Atrue%2C%22tweet_with_visibility_results_prefer_gql_limited_actions_policy_enabled%22%3Atrue%2C%22rweb_video_timestamps_enabled%22%3Atrue%2C%22longform_notetweets_rich_text_read_enabled%22%3Atrue%2C%22longform_notetweets_inline_media_enabled%22%3Atrue%2C%22responsive_web_enhance_cards_enabled%22%3Afalse%7D',
  {
    body: null,
    method: 'GET',
  },
)
```

```json
{
  "data": {
    "bookmark_collection_timeline": {
      "timeline": {
        "instructions": [
          {
            "type": "TimelineAddEntries",
            "entries": [
              {
                "entryId": "tweet-1793999286788935740",
                "sortIndex": "1",
                "content": {
                  "entryType": "TimelineTimelineItem",
                  "__typename": "TimelineTimelineItem",
                  "itemContent": {
                    "itemType": "TimelineTweet",
                    "__typename": "TimelineTweet",
                    "tweet_results": {
                      "result": {
                        "__typename": "Tweet",
                        "rest_id": "1793999286788935740",
                        "core": {
                          "user_results": {
                            "result": {
                              "__typename": "User",
                              "id": "VXNlcjoyOTQ2Nzc4ODE=",
                              "rest_id": "294677881",
                              "affiliates_highlighted_label": {},
                              "has_graduated_access": true,
                              "is_blue_verified": false,
                              "profile_image_shape": "Circle",
                              "legacy": {
                                "can_dm": true,
                                "can_media_tag": false,
                                "created_at": "Sat May 07 15:32:59 +0000 2011",
                                "default_profile": true,
                                "default_profile_image": false,
                                "description": "My peculiar views on history ＆ humanity.\n奇葩异想，妄议中央",
                                "entities": {
                                  "description": {
                                    "urls": []
                                  }
                                },
                                "fast_followers_count": 0,
                                "favourites_count": 14661,
                                "followers_count": 36125,
                                "friends_count": 541,
                                "has_custom_timelines": true,
                                "is_translator": false,
                                "listed_count": 208,
                                "location": "Singapore",
                                "media_count": 7118,
                                "name": "Lens on Asia",
                                "normal_followers_count": 36125,
                                "pinned_tweet_ids_str": ["1781934398587461811"],
                                "possibly_sensitive": false,
                                "profile_banner_url": "https://pbs.twimg.com/profile_banners/294677881/1638520892",
                                "profile_image_url_https": "https://pbs.twimg.com/profile_images/1798814431750799360/kqTQJU4F_normal.jpg",
                                "profile_interstitial_type": "",
                                "screen_name": "lenscn",
                                "statuses_count": 20862,
                                "translator_type": "none",
                                "verified": false,
                                "want_retweets": false,
                                "withheld_in_countries": []
                              },
                              "professional": {
                                "rest_id": "1730475770651562471",
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
                          }
                        },
                        "unmention_data": {},
                        "edit_control": {
                          "edit_tweet_ids": ["1793999286788935740"],
                          "editable_until_msecs": "1716561335000",
                          "is_edit_eligible": false,
                          "edits_remaining": "5"
                        },
                        "is_translatable": true,
                        "views": {
                          "count": "510738",
                          "state": "EnabledWithCount"
                        },
                        "source": "<a href=\"https://mobile.twitter.com\" rel=\"nofollow\">Twitter Web App</a>",
                        "legacy": {
                          "bookmark_count": 594,
                          "bookmarked": true,
                          "created_at": "Fri May 24 13:35:35 +0000 2024",
                          "conversation_id_str": "1793999286788935740",
                          "display_text_range": [0, 148],
                          "entities": {
                            "hashtags": [],
                            "media": [
                              {
                                "display_url": "pic.x.com/k5nem3f8hp",
                                "expanded_url": "https://twitter.com/lenscn/status/1793999286788935740/photo/1",
                                "id_str": "1793998304055119872",
                                "indices": [149, 172],
                                "media_key": "3_1793998304055119872",
                                "media_url_https": "https://pbs.twimg.com/media/GOWP89jb0AA2kUk.png",
                                "type": "photo",
                                "url": "https://t.co/k5NEm3f8HP",
                                "ext_media_availability": {
                                  "status": "Available"
                                },
                                "features": {
                                  "large": {
                                    "faces": []
                                  },
                                  "medium": {
                                    "faces": []
                                  },
                                  "small": {
                                    "faces": []
                                  },
                                  "orig": {
                                    "faces": []
                                  }
                                },
                                "sizes": {
                                  "large": {
                                    "h": 828,
                                    "w": 549,
                                    "resize": "fit"
                                  },
                                  "medium": {
                                    "h": 828,
                                    "w": 549,
                                    "resize": "fit"
                                  },
                                  "small": {
                                    "h": 680,
                                    "w": 451,
                                    "resize": "fit"
                                  },
                                  "thumb": {
                                    "h": 150,
                                    "w": 150,
                                    "resize": "crop"
                                  }
                                },
                                "original_info": {
                                  "height": 828,
                                  "width": 549,
                                  "focus_rects": [
                                    {
                                      "x": 0,
                                      "y": 0,
                                      "w": 549,
                                      "h": 307
                                    },
                                    {
                                      "x": 0,
                                      "y": 0,
                                      "w": 549,
                                      "h": 549
                                    },
                                    {
                                      "x": 0,
                                      "y": 0,
                                      "w": 549,
                                      "h": 626
                                    },
                                    {
                                      "x": 0,
                                      "y": 0,
                                      "w": 414,
                                      "h": 828
                                    },
                                    {
                                      "x": 0,
                                      "y": 0,
                                      "w": 549,
                                      "h": 828
                                    }
                                  ]
                                },
                                "allow_download_status": {
                                  "allow_download": true
                                },
                                "media_results": {
                                  "result": {
                                    "media_key": "3_1793998304055119872"
                                  }
                                }
                              },
                              {
                                "display_url": "pic.x.com/k5nem3f8hp",
                                "expanded_url": "https://twitter.com/lenscn/status/1793999286788935740/photo/1",
                                "id_str": "1793998636055207936",
                                "indices": [149, 172],
                                "media_key": "3_1793998636055207936",
                                "media_url_https": "https://pbs.twimg.com/media/GOWQQSWbIAAG0bS.png",
                                "type": "photo",
                                "url": "https://t.co/k5NEm3f8HP",
                                "ext_media_availability": {
                                  "status": "Available"
                                },
                                "features": {
                                  "large": {
                                    "faces": []
                                  },
                                  "medium": {
                                    "faces": []
                                  },
                                  "small": {
                                    "faces": []
                                  },
                                  "orig": {
                                    "faces": []
                                  }
                                },
                                "sizes": {
                                  "large": {
                                    "h": 798,
                                    "w": 565,
                                    "resize": "fit"
                                  },
                                  "medium": {
                                    "h": 798,
                                    "w": 565,
                                    "resize": "fit"
                                  },
                                  "small": {
                                    "h": 680,
                                    "w": 481,
                                    "resize": "fit"
                                  },
                                  "thumb": {
                                    "h": 150,
                                    "w": 150,
                                    "resize": "crop"
                                  }
                                },
                                "original_info": {
                                  "height": 798,
                                  "width": 565,
                                  "focus_rects": [
                                    {
                                      "x": 0,
                                      "y": 0,
                                      "w": 565,
                                      "h": 316
                                    },
                                    {
                                      "x": 0,
                                      "y": 0,
                                      "w": 565,
                                      "h": 565
                                    },
                                    {
                                      "x": 0,
                                      "y": 0,
                                      "w": 565,
                                      "h": 644
                                    },
                                    {
                                      "x": 59,
                                      "y": 0,
                                      "w": 399,
                                      "h": 798
                                    },
                                    {
                                      "x": 0,
                                      "y": 0,
                                      "w": 565,
                                      "h": 798
                                    }
                                  ]
                                },
                                "allow_download_status": {
                                  "allow_download": true
                                },
                                "media_results": {
                                  "result": {
                                    "media_key": "3_1793998636055207936"
                                  }
                                }
                              }
                            ],
                            "symbols": [],
                            "timestamps": [],
                            "urls": [],
                            "user_mentions": []
                          },
                          "extended_entities": {
                            "media": [
                              {
                                "display_url": "pic.twitter.com/k5NEm3f8HP",
                                "expanded_url": "https://twitter.com/lenscn/status/1793999286788935740/photo/1",
                                "id_str": "1793998304055119872",
                                "indices": [149, 172],
                                "media_key": "3_1793998304055119872",
                                "media_url_https": "https://pbs.twimg.com/media/GOWP89jb0AA2kUk.png",
                                "type": "photo",
                                "url": "https://t.co/k5NEm3f8HP",
                                "ext_media_availability": {
                                  "status": "Available"
                                },
                                "features": {
                                  "large": {
                                    "faces": []
                                  },
                                  "medium": {
                                    "faces": []
                                  },
                                  "small": {
                                    "faces": []
                                  },
                                  "orig": {
                                    "faces": []
                                  }
                                },
                                "sizes": {
                                  "large": {
                                    "h": 828,
                                    "w": 549,
                                    "resize": "fit"
                                  },
                                  "medium": {
                                    "h": 828,
                                    "w": 549,
                                    "resize": "fit"
                                  },
                                  "small": {
                                    "h": 680,
                                    "w": 451,
                                    "resize": "fit"
                                  },
                                  "thumb": {
                                    "h": 150,
                                    "w": 150,
                                    "resize": "crop"
                                  }
                                },
                                "original_info": {
                                  "height": 828,
                                  "width": 549,
                                  "focus_rects": [
                                    {
                                      "x": 0,
                                      "y": 0,
                                      "w": 549,
                                      "h": 307
                                    },
                                    {
                                      "x": 0,
                                      "y": 0,
                                      "w": 549,
                                      "h": 549
                                    },
                                    {
                                      "x": 0,
                                      "y": 0,
                                      "w": 549,
                                      "h": 626
                                    },
                                    {
                                      "x": 0,
                                      "y": 0,
                                      "w": 414,
                                      "h": 828
                                    },
                                    {
                                      "x": 0,
                                      "y": 0,
                                      "w": 549,
                                      "h": 828
                                    }
                                  ]
                                },
                                "allow_download_status": {
                                  "allow_download": true
                                },
                                "media_results": {
                                  "result": {
                                    "media_key": "3_1793998304055119872"
                                  }
                                }
                              },
                              {
                                "display_url": "pic.twitter.com/k5NEm3f8HP",
                                "expanded_url": "https://twitter.com/lenscn/status/1793999286788935740/photo/1",
                                "id_str": "1793998636055207936",
                                "indices": [149, 172],
                                "media_key": "3_1793998636055207936",
                                "media_url_https": "https://pbs.twimg.com/media/GOWQQSWbIAAG0bS.png",
                                "type": "photo",
                                "url": "https://t.co/k5NEm3f8HP",
                                "ext_media_availability": {
                                  "status": "Available"
                                },
                                "features": {
                                  "large": {
                                    "faces": []
                                  },
                                  "medium": {
                                    "faces": []
                                  },
                                  "small": {
                                    "faces": []
                                  },
                                  "orig": {
                                    "faces": []
                                  }
                                },
                                "sizes": {
                                  "large": {
                                    "h": 798,
                                    "w": 565,
                                    "resize": "fit"
                                  },
                                  "medium": {
                                    "h": 798,
                                    "w": 565,
                                    "resize": "fit"
                                  },
                                  "small": {
                                    "h": 680,
                                    "w": 481,
                                    "resize": "fit"
                                  },
                                  "thumb": {
                                    "h": 150,
                                    "w": 150,
                                    "resize": "crop"
                                  }
                                },
                                "original_info": {
                                  "height": 798,
                                  "width": 565,
                                  "focus_rects": [
                                    {
                                      "x": 0,
                                      "y": 0,
                                      "w": 565,
                                      "h": 316
                                    },
                                    {
                                      "x": 0,
                                      "y": 0,
                                      "w": 565,
                                      "h": 565
                                    },
                                    {
                                      "x": 0,
                                      "y": 0,
                                      "w": 565,
                                      "h": 644
                                    },
                                    {
                                      "x": 59,
                                      "y": 0,
                                      "w": 399,
                                      "h": 798
                                    },
                                    {
                                      "x": 0,
                                      "y": 0,
                                      "w": 565,
                                      "h": 798
                                    }
                                  ]
                                },
                                "allow_download_status": {
                                  "allow_download": true
                                },
                                "media_results": {
                                  "result": {
                                    "media_key": "3_1793998636055207936"
                                  }
                                }
                              }
                            ]
                          },
                          "favorite_count": 1426,
                          "favorited": false,
                          "full_text": "拥有900多万人口的徐州市，单位或公司给缴纳公积金的竟然只有70万人，令人错愕的是这70万人，体制内占了45万人。\n同为江苏省的苏州市，1300万人口，有单位或公司给缴纳公积金有440万，其中体制内只有 49万人!\n大家说这个怎么解释? 下表一共列出50个城市，大家可以看看自已感兴趣的城市数据。 https://t.co/k5NEm3f8HP",
                          "is_quote_status": false,
                          "lang": "zh",
                          "possibly_sensitive": false,
                          "possibly_sensitive_editable": true,
                          "quote_count": 11,
                          "reply_count": 119,
                          "retweet_count": 389,
                          "retweeted": false,
                          "user_id_str": "294677881",
                          "id_str": "1793999286788935740"
                        }
                      }
                    },
                    "tweetDisplayType": "Tweet"
                  }
                }
              },
              {
                "entryId": "cursor-bottom--1716657745566",
                "sortIndex": "0",
                "content": {
                  "entryType": "TimelineTimelineCursor",
                  "__typename": "TimelineTimelineCursor",
                  "value": "-1716657745566",
                  "cursorType": "Bottom"
                }
              }
            ]
          }
        ]
      }
    }
  }
}
```
