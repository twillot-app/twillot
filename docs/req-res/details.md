```js
fetch(
  'https://x.com/i/api/graphql/VwKJcAd7zqlBOitPLUrB8A/TweetDetail?variables=%7B%22focalTweetId%22%3A%221799214756353716335%22%2C%22with_rux_injections%22%3Afalse%2C%22includePromotedContent%22%3Atrue%2C%22withCommunity%22%3Atrue%2C%22withQuickPromoteEligibilityTweetFields%22%3Atrue%2C%22withBirdwatchNotes%22%3Atrue%2C%22withVoice%22%3Atrue%2C%22withV2Timeline%22%3Atrue%7D&features=%7B%22rweb_tipjar_consumption_enabled%22%3Atrue%2C%22responsive_web_graphql_exclude_directive_enabled%22%3Atrue%2C%22verified_phone_label_enabled%22%3Afalse%2C%22creator_subscriptions_tweet_preview_api_enabled%22%3Atrue%2C%22responsive_web_graphql_timeline_navigation_enabled%22%3Atrue%2C%22responsive_web_graphql_skip_user_profile_image_extensions_enabled%22%3Afalse%2C%22communities_web_enable_tweet_community_results_fetch%22%3Atrue%2C%22c9s_tweet_anatomy_moderator_badge_enabled%22%3Atrue%2C%22articles_preview_enabled%22%3Atrue%2C%22tweetypie_unmention_optimization_enabled%22%3Atrue%2C%22responsive_web_edit_tweet_api_enabled%22%3Atrue%2C%22graphql_is_translatable_rweb_tweet_is_translatable_enabled%22%3Atrue%2C%22view_counts_everywhere_api_enabled%22%3Atrue%2C%22longform_notetweets_consumption_enabled%22%3Atrue%2C%22responsive_web_twitter_article_tweet_consumption_enabled%22%3Atrue%2C%22tweet_awards_web_tipping_enabled%22%3Afalse%2C%22creator_subscriptions_quote_tweet_preview_enabled%22%3Afalse%2C%22freedom_of_speech_not_reach_fetch_enabled%22%3Atrue%2C%22standardized_nudges_misinfo%22%3Atrue%2C%22tweet_with_visibility_results_prefer_gql_limited_actions_policy_enabled%22%3Atrue%2C%22rweb_video_timestamps_enabled%22%3Atrue%2C%22longform_notetweets_rich_text_read_enabled%22%3Atrue%2C%22longform_notetweets_inline_media_enabled%22%3Atrue%2C%22responsive_web_enhance_cards_enabled%22%3Afalse%7D&fieldToggles=%7B%22withArticleRichContentState%22%3Atrue%2C%22withArticlePlainText%22%3Afalse%2C%22withGrokAnalyze%22%3Afalse%7D',
  {
    body: null,
    method: 'GET',
  },
)
```

```json
{
  "data": {
    "threaded_conversation_with_injections_v2": {
      "instructions": [
        {
          "type": "TimelineAddEntries",
          "entries": [
            {
              "entryId": "tweet-1799214756353716335",
              "sortIndex": "7424157280501059472",
              "content": {
                "entryType": "TimelineTimelineItem",
                "__typename": "TimelineTimelineItem",
                "itemContent": {
                  "itemType": "TimelineTweet",
                  "__typename": "TimelineTweet",
                  "tweet_results": {
                    "result": {
                      "__typename": "Tweet",
                      "rest_id": "1799214756353716335",
                      "has_birdwatch_notes": false,
                      "core": {
                        "user_results": {
                          "result": {
                            "__typename": "User",
                            "id": "VXNlcjoxNTE0NTczMzIyNDUyNzU4NTMy",
                            "rest_id": "1514573322452758532",
                            "affiliates_highlighted_label": {},
                            "has_graduated_access": true,
                            "is_blue_verified": true,
                            "profile_image_shape": "Circle",
                            "legacy": {
                              "can_dm": true,
                              "can_media_tag": false,
                              "created_at": "Thu Apr 14 11:56:44 +0000 2022",
                              "default_profile": true,
                              "default_profile_image": false,
                              "description": "Pronouns: Man/King\nHighlighting Alternative Lifestyles: The Good, the Bad, and the Indifferent. DM me for attribution or video removal. Love the 1980s",
                              "entities": {
                                "description": {
                                  "urls": []
                                }
                              },
                              "fast_followers_count": 0,
                              "favourites_count": 178758,
                              "followers_count": 44617,
                              "friends_count": 22564,
                              "has_custom_timelines": true,
                              "is_translator": false,
                              "listed_count": 73,
                              "location": "Somewhere in time",
                              "media_count": 17067,
                              "name": "TheRealBiffBifford™ \uD83C\uDDFA\uD83C\uDDF8",
                              "normal_followers_count": 44617,
                              "pinned_tweet_ids_str": ["1649210573987643392"],
                              "possibly_sensitive": false,
                              "profile_banner_url": "https://pbs.twimg.com/profile_banners/1514573322452758532/1699463573",
                              "profile_image_url_https": "https://pbs.twimg.com/profile_images/1701290636635414530/Z3AekVKt_normal.jpg",
                              "profile_interstitial_type": "",
                              "screen_name": "TBifford",
                              "statuses_count": 40373,
                              "translator_type": "none",
                              "verified": false,
                              "want_retweets": false,
                              "withheld_in_countries": []
                            },
                            "professional": {
                              "rest_id": "1580731921562095616",
                              "professional_type": "Creator",
                              "category": [
                                {
                                  "id": 580,
                                  "name": "Media & News Company",
                                  "icon_name": "IconBriefcaseStroke"
                                }
                              ]
                            },
                            "tipjar_settings": {
                              "is_enabled": true,
                              "bitcoin_handle": "36aQRNa8RsFRYFE9s1YXyGs6KN3JZFj7UN"
                            }
                          }
                        }
                      },
                      "unmention_data": {},
                      "edit_control": {
                        "edit_tweet_ids": ["1799214756353716335"],
                        "editable_until_msecs": "1717804800000",
                        "is_edit_eligible": true,
                        "edits_remaining": "5"
                      },
                      "is_translatable": false,
                      "views": {
                        "count": "19028175",
                        "state": "EnabledWithCount"
                      },
                      "source": "<a href=\"https://mobile.twitter.com\" rel=\"nofollow\">Twitter Web App</a>",
                      "legacy": {
                        "bookmark_count": 6544,
                        "bookmarked": false,
                        "created_at": "Fri Jun 07 23:00:00 +0000 2024",
                        "conversation_id_str": "1799214756353716335",
                        "display_text_range": [0, 56],
                        "entities": {
                          "hashtags": [],
                          "media": [
                            {
                              "display_url": "pic.x.com/j6ztgwt86b",
                              "expanded_url": "https://twitter.com/TBifford/status/1799214756353716335/video/1",
                              "id_str": "1799158369489657856",
                              "indices": [57, 80],
                              "media_key": "7_1799158369489657856",
                              "media_url_https": "https://pbs.twimg.com/ext_tw_video_thumb/1799158369489657856/pu/img/b6dnNIcA5mJUrtlE.jpg",
                              "type": "video",
                              "url": "https://t.co/j6ztGWT86b",
                              "additional_media_info": {
                                "monetizable": false
                              },
                              "ext_media_availability": {
                                "status": "Available"
                              },
                              "sizes": {
                                "large": {
                                  "h": 1280,
                                  "w": 720,
                                  "resize": "fit"
                                },
                                "medium": {
                                  "h": 1200,
                                  "w": 675,
                                  "resize": "fit"
                                },
                                "small": {
                                  "h": 680,
                                  "w": 383,
                                  "resize": "fit"
                                },
                                "thumb": {
                                  "h": 150,
                                  "w": 150,
                                  "resize": "crop"
                                }
                              },
                              "original_info": {
                                "height": 1280,
                                "width": 720,
                                "focus_rects": []
                              },
                              "allow_download_status": {
                                "allow_download": true
                              },
                              "video_info": {
                                "aspect_ratio": [9, 16],
                                "duration_millis": 16033,
                                "variants": [
                                  {
                                    "content_type": "application/x-mpegURL",
                                    "url": "https://video.twimg.com/ext_tw_video/1799158369489657856/pu/pl/bTmVEic8NenU5Gkn.m3u8?tag=12"
                                  },
                                  {
                                    "bitrate": 632000,
                                    "content_type": "video/mp4",
                                    "url": "https://video.twimg.com/ext_tw_video/1799158369489657856/pu/vid/avc1/320x568/3a7WBP3qOjBbhcor.mp4?tag=12"
                                  },
                                  {
                                    "bitrate": 950000,
                                    "content_type": "video/mp4",
                                    "url": "https://video.twimg.com/ext_tw_video/1799158369489657856/pu/vid/avc1/480x852/6P-xUil5abQ1Fq2S.mp4?tag=12"
                                  },
                                  {
                                    "bitrate": 2176000,
                                    "content_type": "video/mp4",
                                    "url": "https://video.twimg.com/ext_tw_video/1799158369489657856/pu/vid/avc1/720x1280/fylD_2bRo3Z2HBn7.mp4?tag=12"
                                  }
                                ]
                              },
                              "media_results": {
                                "result": {
                                  "media_key": "7_1799158369489657856"
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
                              "display_url": "pic.twitter.com/j6ztGWT86b",
                              "expanded_url": "https://twitter.com/TBifford/status/1799214756353716335/video/1",
                              "id_str": "1799158369489657856",
                              "indices": [57, 80],
                              "media_key": "7_1799158369489657856",
                              "media_url_https": "https://pbs.twimg.com/ext_tw_video_thumb/1799158369489657856/pu/img/b6dnNIcA5mJUrtlE.jpg",
                              "type": "video",
                              "url": "https://t.co/j6ztGWT86b",
                              "additional_media_info": {
                                "monetizable": false
                              },
                              "ext_media_availability": {
                                "status": "Available"
                              },
                              "sizes": {
                                "large": {
                                  "h": 1280,
                                  "w": 720,
                                  "resize": "fit"
                                },
                                "medium": {
                                  "h": 1200,
                                  "w": 675,
                                  "resize": "fit"
                                },
                                "small": {
                                  "h": 680,
                                  "w": 383,
                                  "resize": "fit"
                                },
                                "thumb": {
                                  "h": 150,
                                  "w": 150,
                                  "resize": "crop"
                                }
                              },
                              "original_info": {
                                "height": 1280,
                                "width": 720,
                                "focus_rects": []
                              },
                              "allow_download_status": {
                                "allow_download": true
                              },
                              "video_info": {
                                "aspect_ratio": [9, 16],
                                "duration_millis": 16033,
                                "variants": [
                                  {
                                    "content_type": "application/x-mpegURL",
                                    "url": "https://video.twimg.com/ext_tw_video/1799158369489657856/pu/pl/bTmVEic8NenU5Gkn.m3u8?tag=12"
                                  },
                                  {
                                    "bitrate": 632000,
                                    "content_type": "video/mp4",
                                    "url": "https://video.twimg.com/ext_tw_video/1799158369489657856/pu/vid/avc1/320x568/3a7WBP3qOjBbhcor.mp4?tag=12"
                                  },
                                  {
                                    "bitrate": 950000,
                                    "content_type": "video/mp4",
                                    "url": "https://video.twimg.com/ext_tw_video/1799158369489657856/pu/vid/avc1/480x852/6P-xUil5abQ1Fq2S.mp4?tag=12"
                                  },
                                  {
                                    "bitrate": 2176000,
                                    "content_type": "video/mp4",
                                    "url": "https://video.twimg.com/ext_tw_video/1799158369489657856/pu/vid/avc1/720x1280/fylD_2bRo3Z2HBn7.mp4?tag=12"
                                  }
                                ]
                              },
                              "media_results": {
                                "result": {
                                  "media_key": "7_1799158369489657856"
                                }
                              }
                            }
                          ]
                        },
                        "favorite_count": 49260,
                        "favorited": false,
                        "full_text": "Okay, so what is the proper way to make an entry?\n\uD83E\uDEE2\uD83E\uDD14\uD83D\uDE28\uD83D\uDE31\n\uD83D\uDD09 https://t.co/j6ztGWT86b",
                        "is_quote_status": false,
                        "lang": "en",
                        "possibly_sensitive": false,
                        "possibly_sensitive_editable": true,
                        "quote_count": 2078,
                        "reply_count": 8850,
                        "retweet_count": 2560,
                        "retweeted": false,
                        "user_id_str": "1514573322452758532",
                        "id_str": "1799214756353716335"
                      },
                      "quick_promote_eligibility": {
                        "eligibility": "IneligibleNotProfessional"
                      }
                    }
                  },
                  "tweetDisplayType": "Tweet",
                  "hasModeratedReplies": false,
                  "forwardPivot": {
                    "text": {
                      "text": "Related Posts",
                      "entities": []
                    },
                    "landingUrl": {
                      "url": "https://x.com/TBifford/status/1799214756353716335/similar",
                      "urlType": "ExternalUrl"
                    },
                    "displayType": "ShowSimilarPosts"
                  }
                }
              }
            },
            {
              "entryId": "conversationthread-1799215677779403251",
              "sortIndex": "7424157280501059462",
              "content": {
                "entryType": "TimelineTimelineModule",
                "__typename": "TimelineTimelineModule",
                "items": [
                  {
                    "entryId": "conversationthread-1799215677779403251-tweet-1799215677779403251",
                    "item": {
                      "itemContent": {
                        "itemType": "TimelineTweet",
                        "__typename": "TimelineTweet",
                        "tweet_results": {
                          "result": {
                            "__typename": "Tweet",
                            "rest_id": "1799215677779403251",
                            "has_birdwatch_notes": false,
                            "core": {
                              "user_results": {
                                "result": {
                                  "__typename": "User",
                                  "id": "VXNlcjo1MTI0MTA2MzI=",
                                  "rest_id": "512410632",
                                  "affiliates_highlighted_label": {},
                                  "has_graduated_access": true,
                                  "is_blue_verified": false,
                                  "profile_image_shape": "Circle",
                                  "legacy": {
                                    "can_dm": false,
                                    "can_media_tag": true,
                                    "created_at": "Fri Mar 02 20:19:32 +0000 2012",
                                    "default_profile": true,
                                    "default_profile_image": false,
                                    "description": "",
                                    "entities": {
                                      "description": {
                                        "urls": []
                                      }
                                    },
                                    "fast_followers_count": 0,
                                    "favourites_count": 15458,
                                    "followers_count": 448,
                                    "friends_count": 557,
                                    "has_custom_timelines": true,
                                    "is_translator": false,
                                    "listed_count": 1,
                                    "location": "",
                                    "media_count": 2373,
                                    "name": "Wayne",
                                    "normal_followers_count": 448,
                                    "pinned_tweet_ids_str": [],
                                    "possibly_sensitive": false,
                                    "profile_image_url_https": "https://pbs.twimg.com/profile_images/1881785593/Tweet02_normal.jpg",
                                    "profile_interstitial_type": "",
                                    "screen_name": "WVinkavich",
                                    "statuses_count": 18603,
                                    "translator_type": "none",
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
                              "edit_tweet_ids": ["1799215677779403251"],
                              "editable_until_msecs": "1717805020000",
                              "is_edit_eligible": false,
                              "edits_remaining": "5"
                            },
                            "is_translatable": false,
                            "views": {
                              "count": "658294",
                              "state": "EnabledWithCount"
                            },
                            "source": "<a href=\"http://twitter.com/download/android\" rel=\"nofollow\">Twitter for Android</a>",
                            "legacy": {
                              "bookmark_count": 60,
                              "bookmarked": false,
                              "created_at": "Fri Jun 07 23:03:40 +0000 2024",
                              "conversation_id_str": "1799214756353716335",
                              "display_text_range": [10, 27],
                              "entities": {
                                "hashtags": [],
                                "symbols": [],
                                "timestamps": [],
                                "urls": [],
                                "user_mentions": [
                                  {
                                    "id_str": "1514573322452758532",
                                    "name": "TheRealBiffBifford™ \uD83C\uDDFA\uD83C\uDDF8",
                                    "screen_name": "TBifford",
                                    "indices": [0, 9]
                                  }
                                ]
                              },
                              "favorite_count": 17385,
                              "favorited": false,
                              "full_text": "@TBifford After the grenade",
                              "in_reply_to_screen_name": "TBifford",
                              "in_reply_to_status_id_str": "1799214756353716335",
                              "in_reply_to_user_id_str": "1514573322452758532",
                              "is_quote_status": false,
                              "lang": "en",
                              "quote_count": 9,
                              "reply_count": 117,
                              "retweet_count": 145,
                              "retweeted": false,
                              "user_id_str": "512410632",
                              "id_str": "1799215677779403251"
                            },
                            "quick_promote_eligibility": {
                              "eligibility": "IneligibleNotProfessional"
                            }
                          }
                        },
                        "tweetDisplayType": "Tweet"
                      },
                      "clientEventInfo": {
                        "details": {
                          "conversationDetails": {
                            "conversationSection": "HighQuality"
                          },
                          "timelinesDetails": {
                            "controllerData": "DAACDAAEDAABCgABFIgKCGAPgBUKAAIAAAAABEBACAAAAAA="
                          }
                        }
                      }
                    }
                  },
                  {
                    "entryId": "conversationthread-1799215677779403251-tweet-1799216274012242333",
                    "item": {
                      "itemContent": {
                        "itemType": "TimelineTweet",
                        "__typename": "TimelineTweet",
                        "tweet_results": {
                          "result": {
                            "__typename": "Tweet",
                            "rest_id": "1799216274012242333",
                            "has_birdwatch_notes": false,
                            "core": {
                              "user_results": {
                                "result": {
                                  "__typename": "User",
                                  "id": "VXNlcjoxNTE0NTczMzIyNDUyNzU4NTMy",
                                  "rest_id": "1514573322452758532",
                                  "affiliates_highlighted_label": {},
                                  "has_graduated_access": true,
                                  "is_blue_verified": true,
                                  "profile_image_shape": "Circle",
                                  "legacy": {
                                    "can_dm": true,
                                    "can_media_tag": false,
                                    "created_at": "Thu Apr 14 11:56:44 +0000 2022",
                                    "default_profile": true,
                                    "default_profile_image": false,
                                    "description": "Pronouns: Man/King\nHighlighting Alternative Lifestyles: The Good, the Bad, and the Indifferent. DM me for attribution or video removal. Love the 1980s",
                                    "entities": {
                                      "description": {
                                        "urls": []
                                      }
                                    },
                                    "fast_followers_count": 0,
                                    "favourites_count": 178758,
                                    "followers_count": 44617,
                                    "friends_count": 22564,
                                    "has_custom_timelines": true,
                                    "is_translator": false,
                                    "listed_count": 73,
                                    "location": "Somewhere in time",
                                    "media_count": 17067,
                                    "name": "TheRealBiffBifford™ \uD83C\uDDFA\uD83C\uDDF8",
                                    "normal_followers_count": 44617,
                                    "pinned_tweet_ids_str": [
                                      "1649210573987643392"
                                    ],
                                    "possibly_sensitive": false,
                                    "profile_banner_url": "https://pbs.twimg.com/profile_banners/1514573322452758532/1699463573",
                                    "profile_image_url_https": "https://pbs.twimg.com/profile_images/1701290636635414530/Z3AekVKt_normal.jpg",
                                    "profile_interstitial_type": "",
                                    "screen_name": "TBifford",
                                    "statuses_count": 40373,
                                    "translator_type": "none",
                                    "verified": false,
                                    "want_retweets": false,
                                    "withheld_in_countries": []
                                  },
                                  "professional": {
                                    "rest_id": "1580731921562095616",
                                    "professional_type": "Creator",
                                    "category": [
                                      {
                                        "id": 580,
                                        "name": "Media & News Company",
                                        "icon_name": "IconBriefcaseStroke"
                                      }
                                    ]
                                  },
                                  "tipjar_settings": {
                                    "is_enabled": true,
                                    "bitcoin_handle": "36aQRNa8RsFRYFE9s1YXyGs6KN3JZFj7UN"
                                  }
                                }
                              }
                            },
                            "unmention_data": {},
                            "edit_control": {
                              "edit_tweet_ids": ["1799216274012242333"],
                              "editable_until_msecs": "1717805162000",
                              "is_edit_eligible": false,
                              "edits_remaining": "5"
                            },
                            "is_translatable": false,
                            "views": {
                              "count": "636088",
                              "state": "EnabledWithCount"
                            },
                            "source": "<a href=\"https://mobile.twitter.com\" rel=\"nofollow\">Twitter Web App</a>",
                            "legacy": {
                              "bookmark_count": 11,
                              "bookmarked": false,
                              "created_at": "Fri Jun 07 23:06:02 +0000 2024",
                              "conversation_id_str": "1799214756353716335",
                              "display_text_range": [12, 13],
                              "entities": {
                                "hashtags": [],
                                "symbols": [],
                                "timestamps": [],
                                "urls": [],
                                "user_mentions": [
                                  {
                                    "id_str": "512410632",
                                    "name": "Wayne",
                                    "screen_name": "WVinkavich",
                                    "indices": [0, 11]
                                  }
                                ]
                              },
                              "favorite_count": 945,
                              "favorited": false,
                              "full_text": "@WVinkavich \uD83D\uDC4D",
                              "in_reply_to_screen_name": "WVinkavich",
                              "in_reply_to_status_id_str": "1799215677779403251",
                              "in_reply_to_user_id_str": "512410632",
                              "is_quote_status": false,
                              "lang": "qme",
                              "quote_count": 0,
                              "reply_count": 7,
                              "retweet_count": 3,
                              "retweeted": false,
                              "user_id_str": "1514573322452758532",
                              "id_str": "1799216274012242333"
                            },
                            "quick_promote_eligibility": {
                              "eligibility": "IneligibleNotProfessional"
                            }
                          }
                        },
                        "tweetDisplayType": "Tweet"
                      },
                      "clientEventInfo": {
                        "details": {
                          "conversationDetails": {
                            "conversationSection": "HighQuality"
                          },
                          "timelinesDetails": {
                            "controllerData": "DAACDAAEDAABCgABFIgCEKILgZEKAAIAAAAAFEBACAAAAAA="
                          }
                        }
                      }
                    }
                  },
                  {
                    "entryId": "conversationthread-1799215677779403251-cursor-showmore-2144973855463798177",
                    "item": {
                      "itemContent": {
                        "itemType": "TimelineTimelineCursor",
                        "__typename": "TimelineTimelineCursor",
                        "value": "PAAAAPAtPBwcFrqG0Onk6oz4MRUCAAAYJmNvbnZlcnNhdGlvbnRocmVhZC0xNzk5MjE1Njc3Nzc5NDAzMjUxIgAA",
                        "cursorType": "ShowMore",
                        "displayTreatment": {
                          "actionText": "Show replies"
                        }
                      },
                      "clientEventInfo": {
                        "details": {
                          "conversationDetails": {
                            "conversationSection": "HighQuality"
                          }
                        }
                      }
                    }
                  }
                ],
                "displayType": "VerticalConversation",
                "clientEventInfo": {
                  "details": {
                    "conversationDetails": {
                      "conversationSection": "HighQuality"
                    }
                  }
                }
              }
            },
            {
              "entryId": "conversationthread-1799303039242666407",
              "sortIndex": "7424157280501059452",
              "content": {
                "entryType": "TimelineTimelineModule",
                "__typename": "TimelineTimelineModule",
                "items": [
                  {
                    "entryId": "conversationthread-1799303039242666407-tweet-1799303039242666407",
                    "item": {
                      "itemContent": {
                        "itemType": "TimelineTweet",
                        "__typename": "TimelineTweet",
                        "tweet_results": {
                          "result": {
                            "__typename": "Tweet",
                            "rest_id": "1799303039242666407",
                            "has_birdwatch_notes": false,
                            "core": {
                              "user_results": {
                                "result": {
                                  "__typename": "User",
                                  "id": "VXNlcjo3NzY2Njg3MDc2OTk0ODY3MjA=",
                                  "rest_id": "776668707699486720",
                                  "affiliates_highlighted_label": {},
                                  "has_graduated_access": true,
                                  "is_blue_verified": true,
                                  "profile_image_shape": "Circle",
                                  "legacy": {
                                    "can_dm": true,
                                    "can_media_tag": false,
                                    "created_at": "Fri Sep 16 06:27:04 +0000 2016",
                                    "default_profile": false,
                                    "default_profile_image": false,
                                    "description": "Man On A Dive. I Have Many Names.",
                                    "entities": {
                                      "description": {
                                        "urls": []
                                      }
                                    },
                                    "fast_followers_count": 0,
                                    "favourites_count": 15043,
                                    "followers_count": 695,
                                    "friends_count": 285,
                                    "has_custom_timelines": true,
                                    "is_translator": false,
                                    "listed_count": 3,
                                    "location": "Tu imaginación",
                                    "media_count": 1338,
                                    "name": "jumon.eth \uD83C\uDDF5\uD83C\uDDF7\uD83D\uDD77",
                                    "normal_followers_count": 695,
                                    "pinned_tweet_ids_str": [
                                      "1751608999328325870"
                                    ],
                                    "possibly_sensitive": false,
                                    "profile_banner_url": "https://pbs.twimg.com/profile_banners/776668707699486720/1707883875",
                                    "profile_image_url_https": "https://pbs.twimg.com/profile_images/1656024358911975475/xWOKCPks_normal.jpg",
                                    "profile_interstitial_type": "",
                                    "screen_name": "exJumon",
                                    "statuses_count": 20065,
                                    "translator_type": "none",
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
                              "edit_tweet_ids": ["1799303039242666407"],
                              "editable_until_msecs": "1717825848000",
                              "is_edit_eligible": false,
                              "edits_remaining": "5"
                            },
                            "is_translatable": false,
                            "views": {
                              "count": "962563",
                              "state": "EnabledWithCount"
                            },
                            "source": "<a href=\"http://twitter.com/#!/download/ipad\" rel=\"nofollow\">Twitter for iPad</a>",
                            "note_tweet": {
                              "is_expandable": true,
                              "note_tweet_results": {
                                "result": {
                                  "id": "Tm90ZVR3ZWV0OjE3OTkzMDMwMzkxNTQ1MzY0NDg=",
                                  "text": "The way we were taught is to follow a 180 degree arch *outside* of the door while scanning the whole area. If he would’ve kept going all of the way and ended in the position I have sketched in (still on the outside) he could’ve seen enough of the guy inside to identify the threat and choose a better course of action.\n\nEven if he still got shot at that point, it would’ve been a better outcome than how it went down.",
                                  "entity_set": {
                                    "hashtags": [],
                                    "symbols": [],
                                    "timestamps": [],
                                    "urls": [],
                                    "user_mentions": []
                                  }
                                }
                              }
                            },
                            "legacy": {
                              "bookmark_count": 725,
                              "bookmarked": false,
                              "created_at": "Sat Jun 08 04:50:48 +0000 2024",
                              "conversation_id_str": "1799214756353716335",
                              "display_text_range": [10, 290],
                              "entities": {
                                "hashtags": [],
                                "media": [
                                  {
                                    "display_url": "pic.x.com/acsio2twjb",
                                    "expanded_url": "https://twitter.com/exJumon/status/1799303039242666407/photo/1",
                                    "id_str": "1799303035472019456",
                                    "indices": [291, 314],
                                    "media_key": "3_1799303035472019456",
                                    "media_url_https": "https://pbs.twimg.com/media/GPhok-CXgAAcbTz.jpg",
                                    "type": "photo",
                                    "url": "https://t.co/acsiO2TwJB",
                                    "ext_media_availability": {
                                      "status": "Available"
                                    },
                                    "features": {
                                      "large": {
                                        "faces": [
                                          {
                                            "x": 1089,
                                            "y": 338,
                                            "h": 102,
                                            "w": 102
                                          },
                                          {
                                            "x": 529,
                                            "y": 1054,
                                            "h": 99,
                                            "w": 99
                                          },
                                          {
                                            "x": 929,
                                            "y": 286,
                                            "h": 148,
                                            "w": 148
                                          },
                                          {
                                            "x": 782,
                                            "y": 959,
                                            "h": 133,
                                            "w": 133
                                          }
                                        ]
                                      },
                                      "medium": {
                                        "faces": [
                                          {
                                            "x": 805,
                                            "y": 249,
                                            "h": 75,
                                            "w": 75
                                          },
                                          {
                                            "x": 391,
                                            "y": 779,
                                            "h": 73,
                                            "w": 73
                                          },
                                          {
                                            "x": 687,
                                            "y": 211,
                                            "h": 109,
                                            "w": 109
                                          },
                                          {
                                            "x": 578,
                                            "y": 709,
                                            "h": 98,
                                            "w": 98
                                          }
                                        ]
                                      },
                                      "small": {
                                        "faces": [
                                          {
                                            "x": 456,
                                            "y": 141,
                                            "h": 42,
                                            "w": 42
                                          },
                                          {
                                            "x": 221,
                                            "y": 442,
                                            "h": 41,
                                            "w": 41
                                          },
                                          {
                                            "x": 389,
                                            "y": 119,
                                            "h": 62,
                                            "w": 62
                                          },
                                          {
                                            "x": 327,
                                            "y": 402,
                                            "h": 55,
                                            "w": 55
                                          }
                                        ]
                                      },
                                      "orig": {
                                        "faces": [
                                          {
                                            "x": 1089,
                                            "y": 338,
                                            "h": 102,
                                            "w": 102
                                          },
                                          {
                                            "x": 529,
                                            "y": 1054,
                                            "h": 99,
                                            "w": 99
                                          },
                                          {
                                            "x": 929,
                                            "y": 286,
                                            "h": 148,
                                            "w": 148
                                          },
                                          {
                                            "x": 782,
                                            "y": 959,
                                            "h": 133,
                                            "w": 133
                                          }
                                        ]
                                      }
                                    },
                                    "sizes": {
                                      "large": {
                                        "h": 1622,
                                        "w": 1340,
                                        "resize": "fit"
                                      },
                                      "medium": {
                                        "h": 1200,
                                        "w": 991,
                                        "resize": "fit"
                                      },
                                      "small": {
                                        "h": 680,
                                        "w": 562,
                                        "resize": "fit"
                                      },
                                      "thumb": {
                                        "h": 150,
                                        "w": 150,
                                        "resize": "crop"
                                      }
                                    },
                                    "original_info": {
                                      "height": 1622,
                                      "width": 1340,
                                      "focus_rects": [
                                        {
                                          "x": 0,
                                          "y": 557,
                                          "w": 1340,
                                          "h": 750
                                        },
                                        {
                                          "x": 0,
                                          "y": 262,
                                          "w": 1340,
                                          "h": 1340
                                        },
                                        {
                                          "x": 0,
                                          "y": 94,
                                          "w": 1340,
                                          "h": 1528
                                        },
                                        {
                                          "x": 529,
                                          "y": 0,
                                          "w": 811,
                                          "h": 1622
                                        },
                                        {
                                          "x": 0,
                                          "y": 0,
                                          "w": 1340,
                                          "h": 1622
                                        }
                                      ]
                                    },
                                    "allow_download_status": {
                                      "allow_download": true
                                    },
                                    "media_results": {
                                      "result": {
                                        "media_key": "3_1799303035472019456"
                                      }
                                    }
                                  }
                                ],
                                "symbols": [],
                                "timestamps": [],
                                "urls": [],
                                "user_mentions": [
                                  {
                                    "id_str": "1514573322452758532",
                                    "name": "TheRealBiffBifford™ \uD83C\uDDFA\uD83C\uDDF8",
                                    "screen_name": "TBifford",
                                    "indices": [0, 9]
                                  }
                                ]
                              },
                              "extended_entities": {
                                "media": [
                                  {
                                    "display_url": "pic.twitter.com/acsiO2TwJB",
                                    "expanded_url": "https://twitter.com/exJumon/status/1799303039242666407/photo/1",
                                    "id_str": "1799303035472019456",
                                    "indices": [291, 314],
                                    "media_key": "3_1799303035472019456",
                                    "media_url_https": "https://pbs.twimg.com/media/GPhok-CXgAAcbTz.jpg",
                                    "type": "photo",
                                    "url": "https://t.co/acsiO2TwJB",
                                    "ext_media_availability": {
                                      "status": "Available"
                                    },
                                    "features": {
                                      "large": {
                                        "faces": [
                                          {
                                            "x": 1089,
                                            "y": 338,
                                            "h": 102,
                                            "w": 102
                                          },
                                          {
                                            "x": 529,
                                            "y": 1054,
                                            "h": 99,
                                            "w": 99
                                          },
                                          {
                                            "x": 929,
                                            "y": 286,
                                            "h": 148,
                                            "w": 148
                                          },
                                          {
                                            "x": 782,
                                            "y": 959,
                                            "h": 133,
                                            "w": 133
                                          }
                                        ]
                                      },
                                      "medium": {
                                        "faces": [
                                          {
                                            "x": 805,
                                            "y": 249,
                                            "h": 75,
                                            "w": 75
                                          },
                                          {
                                            "x": 391,
                                            "y": 779,
                                            "h": 73,
                                            "w": 73
                                          },
                                          {
                                            "x": 687,
                                            "y": 211,
                                            "h": 109,
                                            "w": 109
                                          },
                                          {
                                            "x": 578,
                                            "y": 709,
                                            "h": 98,
                                            "w": 98
                                          }
                                        ]
                                      },
                                      "small": {
                                        "faces": [
                                          {
                                            "x": 456,
                                            "y": 141,
                                            "h": 42,
                                            "w": 42
                                          },
                                          {
                                            "x": 221,
                                            "y": 442,
                                            "h": 41,
                                            "w": 41
                                          },
                                          {
                                            "x": 389,
                                            "y": 119,
                                            "h": 62,
                                            "w": 62
                                          },
                                          {
                                            "x": 327,
                                            "y": 402,
                                            "h": 55,
                                            "w": 55
                                          }
                                        ]
                                      },
                                      "orig": {
                                        "faces": [
                                          {
                                            "x": 1089,
                                            "y": 338,
                                            "h": 102,
                                            "w": 102
                                          },
                                          {
                                            "x": 529,
                                            "y": 1054,
                                            "h": 99,
                                            "w": 99
                                          },
                                          {
                                            "x": 929,
                                            "y": 286,
                                            "h": 148,
                                            "w": 148
                                          },
                                          {
                                            "x": 782,
                                            "y": 959,
                                            "h": 133,
                                            "w": 133
                                          }
                                        ]
                                      }
                                    },
                                    "sizes": {
                                      "large": {
                                        "h": 1622,
                                        "w": 1340,
                                        "resize": "fit"
                                      },
                                      "medium": {
                                        "h": 1200,
                                        "w": 991,
                                        "resize": "fit"
                                      },
                                      "small": {
                                        "h": 680,
                                        "w": 562,
                                        "resize": "fit"
                                      },
                                      "thumb": {
                                        "h": 150,
                                        "w": 150,
                                        "resize": "crop"
                                      }
                                    },
                                    "original_info": {
                                      "height": 1622,
                                      "width": 1340,
                                      "focus_rects": [
                                        {
                                          "x": 0,
                                          "y": 557,
                                          "w": 1340,
                                          "h": 750
                                        },
                                        {
                                          "x": 0,
                                          "y": 262,
                                          "w": 1340,
                                          "h": 1340
                                        },
                                        {
                                          "x": 0,
                                          "y": 94,
                                          "w": 1340,
                                          "h": 1528
                                        },
                                        {
                                          "x": 529,
                                          "y": 0,
                                          "w": 811,
                                          "h": 1622
                                        },
                                        {
                                          "x": 0,
                                          "y": 0,
                                          "w": 1340,
                                          "h": 1622
                                        }
                                      ]
                                    },
                                    "allow_download_status": {
                                      "allow_download": true
                                    },
                                    "media_results": {
                                      "result": {
                                        "media_key": "3_1799303035472019456"
                                      }
                                    }
                                  }
                                ]
                              },
                              "favorite_count": 7379,
                              "favorited": false,
                              "full_text": "@TBifford The way we were taught is to follow a 180 degree arch *outside* of the door while scanning the whole area. If he would’ve kept going all of the way and ended in the position I have sketched in (still on the outside) he could’ve seen enough of the guy inside to identify the threat https://t.co/acsiO2TwJB",
                              "in_reply_to_screen_name": "TBifford",
                              "in_reply_to_status_id_str": "1799214756353716335",
                              "in_reply_to_user_id_str": "1514573322452758532",
                              "is_quote_status": false,
                              "lang": "en",
                              "possibly_sensitive": false,
                              "possibly_sensitive_editable": true,
                              "quote_count": 12,
                              "reply_count": 330,
                              "retweet_count": 172,
                              "retweeted": false,
                              "user_id_str": "776668707699486720",
                              "id_str": "1799303039242666407"
                            },
                            "quick_promote_eligibility": {
                              "eligibility": "IneligibleNotProfessional"
                            }
                          }
                        },
                        "tweetDisplayType": "Tweet"
                      },
                      "clientEventInfo": {
                        "details": {
                          "conversationDetails": {
                            "conversationSection": "HighQuality"
                          },
                          "timelinesDetails": {
                            "controllerData": "DAACDAAEDAABCgABFIQKCSRrgBUKAAIAAAAAFEBACAAAAAA="
                          }
                        }
                      }
                    }
                  }
                ],
                "displayType": "VerticalConversation",
                "clientEventInfo": {
                  "details": {
                    "conversationDetails": {
                      "conversationSection": "HighQuality"
                    }
                  }
                }
              }
            },
            {
              "entryId": "conversationthread-1799384560540725634",
              "sortIndex": "7424157280501059442",
              "content": {
                "entryType": "TimelineTimelineModule",
                "__typename": "TimelineTimelineModule",
                "items": [
                  {
                    "entryId": "conversationthread-1799384560540725634-tweet-1799384560540725634",
                    "item": {
                      "itemContent": {
                        "itemType": "TimelineTweet",
                        "__typename": "TimelineTweet",
                        "tweet_results": {
                          "result": {
                            "__typename": "Tweet",
                            "rest_id": "1799384560540725634",
                            "has_birdwatch_notes": false,
                            "core": {
                              "user_results": {
                                "result": {
                                  "__typename": "User",
                                  "id": "VXNlcjoxMTczOTc2NjU=",
                                  "rest_id": "117397665",
                                  "affiliates_highlighted_label": {},
                                  "has_graduated_access": true,
                                  "is_blue_verified": true,
                                  "profile_image_shape": "Circle",
                                  "legacy": {
                                    "can_dm": true,
                                    "can_media_tag": true,
                                    "created_at": "Thu Feb 25 12:47:23 +0000 2010",
                                    "default_profile": false,
                                    "default_profile_image": false,
                                    "description": "\uD83D\uDCE9 \uD83D\uDEAB Ne rep pas aux DMs de demande d'aide audio/tech, go discord⬇️\n\uD83C\uDF1F Chirurgien AudioVisuel des Stars \uD83D\uDCAB\n\uD83D\uDC68‍\uD83D\uDC67‍\uD83D\uDC66 Père d'Empire Media Science & Avantgarde AI",
                                    "entities": {
                                      "description": {
                                        "urls": []
                                      },
                                      "url": {
                                        "urls": [
                                          {
                                            "display_url": "ems.gg/discord",
                                            "expanded_url": "http://ems.gg/discord",
                                            "url": "https://t.co/jzsT4eBJVy",
                                            "indices": [0, 23]
                                          }
                                        ]
                                      }
                                    },
                                    "fast_followers_count": 0,
                                    "favourites_count": 7797,
                                    "followers_count": 2503,
                                    "friends_count": 272,
                                    "has_custom_timelines": true,
                                    "is_translator": false,
                                    "listed_count": 7,
                                    "location": "Paris",
                                    "media_count": 421,
                                    "name": "Leo Mozoloa \uD83E\uDD89",
                                    "normal_followers_count": 2503,
                                    "pinned_tweet_ids_str": [
                                      "1781379360362057930"
                                    ],
                                    "possibly_sensitive": false,
                                    "profile_banner_url": "https://pbs.twimg.com/profile_banners/117397665/1700494148",
                                    "profile_image_url_https": "https://pbs.twimg.com/profile_images/1662368588316004353/NOKd6s1g_normal.jpg",
                                    "profile_interstitial_type": "",
                                    "screen_name": "LeoMozoloa",
                                    "statuses_count": 5298,
                                    "translator_type": "none",
                                    "url": "https://t.co/jzsT4eBJVy",
                                    "verified": false,
                                    "want_retweets": false,
                                    "withheld_in_countries": []
                                  },
                                  "professional": {
                                    "rest_id": "1590481169044365312",
                                    "professional_type": "Business",
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
                              }
                            },
                            "unmention_data": {},
                            "edit_control": {
                              "edit_tweet_ids": ["1799384560540725634"],
                              "editable_until_msecs": "1717845284000",
                              "is_edit_eligible": false,
                              "edits_remaining": "5"
                            },
                            "is_translatable": false,
                            "views": {
                              "count": "425094",
                              "state": "EnabledWithCount"
                            },
                            "source": "<a href=\"https://mobile.twitter.com\" rel=\"nofollow\">Twitter Web App</a>",
                            "legacy": {
                              "bookmark_count": 501,
                              "bookmarked": false,
                              "created_at": "Sat Jun 08 10:14:44 +0000 2024",
                              "conversation_id_str": "1799214756353716335",
                              "display_text_range": [10, 27],
                              "entities": {
                                "hashtags": [],
                                "media": [
                                  {
                                    "display_url": "pic.x.com/1dzrnhxer2",
                                    "expanded_url": "https://twitter.com/LeoMozoloa/status/1799384560540725634/photo/1",
                                    "id_str": "1799384512981266432",
                                    "indices": [28, 51],
                                    "media_key": "3_1799384512981266432",
                                    "media_url_https": "https://pbs.twimg.com/media/GPiyrlaWcAAcDk-.jpg",
                                    "type": "photo",
                                    "url": "https://t.co/1dZrNHxER2",
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
                                        "h": 824,
                                        "w": 1216,
                                        "resize": "fit"
                                      },
                                      "medium": {
                                        "h": 813,
                                        "w": 1200,
                                        "resize": "fit"
                                      },
                                      "small": {
                                        "h": 461,
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
                                      "height": 824,
                                      "width": 1216,
                                      "focus_rects": [
                                        {
                                          "x": 0,
                                          "y": 143,
                                          "w": 1216,
                                          "h": 681
                                        },
                                        {
                                          "x": 392,
                                          "y": 0,
                                          "w": 824,
                                          "h": 824
                                        },
                                        {
                                          "x": 493,
                                          "y": 0,
                                          "w": 723,
                                          "h": 824
                                        },
                                        {
                                          "x": 804,
                                          "y": 0,
                                          "w": 412,
                                          "h": 824
                                        },
                                        {
                                          "x": 0,
                                          "y": 0,
                                          "w": 1216,
                                          "h": 824
                                        }
                                      ]
                                    },
                                    "allow_download_status": {
                                      "allow_download": true
                                    },
                                    "media_results": {
                                      "result": {
                                        "media_key": "3_1799384512981266432"
                                      }
                                    }
                                  }
                                ],
                                "symbols": [],
                                "timestamps": [],
                                "urls": [],
                                "user_mentions": [
                                  {
                                    "id_str": "1514573322452758532",
                                    "name": "TheRealBiffBifford™ \uD83C\uDDFA\uD83C\uDDF8",
                                    "screen_name": "TBifford",
                                    "indices": [0, 9]
                                  }
                                ]
                              },
                              "extended_entities": {
                                "media": [
                                  {
                                    "display_url": "pic.twitter.com/1dZrNHxER2",
                                    "expanded_url": "https://twitter.com/LeoMozoloa/status/1799384560540725634/photo/1",
                                    "id_str": "1799384512981266432",
                                    "indices": [28, 51],
                                    "media_key": "3_1799384512981266432",
                                    "media_url_https": "https://pbs.twimg.com/media/GPiyrlaWcAAcDk-.jpg",
                                    "type": "photo",
                                    "url": "https://t.co/1dZrNHxER2",
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
                                        "h": 824,
                                        "w": 1216,
                                        "resize": "fit"
                                      },
                                      "medium": {
                                        "h": 813,
                                        "w": 1200,
                                        "resize": "fit"
                                      },
                                      "small": {
                                        "h": 461,
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
                                      "height": 824,
                                      "width": 1216,
                                      "focus_rects": [
                                        {
                                          "x": 0,
                                          "y": 143,
                                          "w": 1216,
                                          "h": 681
                                        },
                                        {
                                          "x": 392,
                                          "y": 0,
                                          "w": 824,
                                          "h": 824
                                        },
                                        {
                                          "x": 493,
                                          "y": 0,
                                          "w": 723,
                                          "h": 824
                                        },
                                        {
                                          "x": 804,
                                          "y": 0,
                                          "w": 412,
                                          "h": 824
                                        },
                                        {
                                          "x": 0,
                                          "y": 0,
                                          "w": 1216,
                                          "h": 824
                                        }
                                      ]
                                    },
                                    "allow_download_status": {
                                      "allow_download": true
                                    },
                                    "media_results": {
                                      "result": {
                                        "media_key": "3_1799384512981266432"
                                      }
                                    }
                                  }
                                ]
                              },
                              "favorite_count": 6843,
                              "favorited": false,
                              "full_text": "@TBifford Don't hug corners https://t.co/1dZrNHxER2",
                              "in_reply_to_screen_name": "TBifford",
                              "in_reply_to_status_id_str": "1799214756353716335",
                              "in_reply_to_user_id_str": "1514573322452758532",
                              "is_quote_status": false,
                              "lang": "en",
                              "possibly_sensitive": false,
                              "possibly_sensitive_editable": true,
                              "quote_count": 6,
                              "reply_count": 67,
                              "retweet_count": 144,
                              "retweeted": false,
                              "user_id_str": "117397665",
                              "id_str": "1799384560540725634"
                            },
                            "quick_promote_eligibility": {
                              "eligibility": "IneligibleNotProfessional"
                            }
                          }
                        },
                        "tweetDisplayType": "Tweet"
                      },
                      "clientEventInfo": {
                        "details": {
                          "conversationDetails": {
                            "conversationSection": "HighQuality"
                          },
                          "timelinesDetails": {
                            "controllerData": "DAACDAAEDAABCgABFMQKCihrgBUKAAIAAAAAFEBACAAAAAA="
                          }
                        }
                      }
                    }
                  }
                ],
                "displayType": "VerticalConversation",
                "clientEventInfo": {
                  "details": {
                    "conversationDetails": {
                      "conversationSection": "HighQuality"
                    }
                  }
                }
              }
            },
            {
              "entryId": "conversationthread-1799240579768832297",
              "sortIndex": "7424157280501059432",
              "content": {
                "entryType": "TimelineTimelineModule",
                "__typename": "TimelineTimelineModule",
                "items": [
                  {
                    "entryId": "conversationthread-1799240579768832297-tweet-1799240579768832297",
                    "item": {
                      "itemContent": {
                        "itemType": "TimelineTweet",
                        "__typename": "TimelineTweet",
                        "tweet_results": {
                          "result": {
                            "__typename": "Tweet",
                            "rest_id": "1799240579768832297",
                            "has_birdwatch_notes": false,
                            "core": {
                              "user_results": {
                                "result": {
                                  "__typename": "User",
                                  "id": "VXNlcjoxMzQ3NTg3OTk2NDM5MTIxOTIz",
                                  "rest_id": "1347587996439121923",
                                  "affiliates_highlighted_label": {},
                                  "has_graduated_access": true,
                                  "is_blue_verified": true,
                                  "profile_image_shape": "Circle",
                                  "legacy": {
                                    "can_dm": true,
                                    "can_media_tag": true,
                                    "created_at": "Fri Jan 08 16:57:02 +0000 2021",
                                    "default_profile": true,
                                    "default_profile_image": false,
                                    "description": "Father, Grandfather, Great-Grandfather. Retired. Love Space science. I support good over evil..\uD83C\uDDEE\uD83C\uDDF1 No DM's, please. \uD83C\uDDFA\uD83C\uDDF8",
                                    "entities": {
                                      "description": {
                                        "urls": []
                                      }
                                    },
                                    "fast_followers_count": 0,
                                    "favourites_count": 44988,
                                    "followers_count": 1200,
                                    "friends_count": 1237,
                                    "has_custom_timelines": false,
                                    "is_translator": false,
                                    "listed_count": 15,
                                    "location": "Indiana, USA",
                                    "media_count": 1081,
                                    "name": "Johnny Reno",
                                    "normal_followers_count": 1200,
                                    "pinned_tweet_ids_str": [],
                                    "possibly_sensitive": false,
                                    "profile_banner_url": "https://pbs.twimg.com/profile_banners/1347587996439121923/1707620548",
                                    "profile_image_url_https": "https://pbs.twimg.com/profile_images/1789488101930188801/3gZGx4zX_normal.jpg",
                                    "profile_interstitial_type": "",
                                    "screen_name": "JohnnyReno",
                                    "statuses_count": 12390,
                                    "translator_type": "none",
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
                              "edit_tweet_ids": ["1799240579768832297"],
                              "editable_until_msecs": "1717810957000",
                              "is_edit_eligible": false,
                              "edits_remaining": "5"
                            },
                            "is_translatable": false,
                            "views": {
                              "count": "563684",
                              "state": "EnabledWithCount"
                            },
                            "source": "<a href=\"http://twitter.com/download/android\" rel=\"nofollow\">Twitter for Android</a>",
                            "legacy": {
                              "bookmark_count": 11,
                              "bookmarked": false,
                              "created_at": "Sat Jun 08 00:42:37 +0000 2024",
                              "conversation_id_str": "1799214756353716335",
                              "display_text_range": [10, 55],
                              "entities": {
                                "hashtags": [],
                                "symbols": [],
                                "timestamps": [],
                                "urls": [],
                                "user_mentions": [
                                  {
                                    "id_str": "1514573322452758532",
                                    "name": "TheRealBiffBifford™ \uD83C\uDDFA\uD83C\uDDF8",
                                    "screen_name": "TBifford",
                                    "indices": [0, 9]
                                  }
                                ]
                              },
                              "favorite_count": 2225,
                              "favorited": false,
                              "full_text": "@TBifford What the hell is this, Monty Python.....? \uD83E\uDD23\uD83E\uDD23\uD83E\uDD23",
                              "in_reply_to_screen_name": "TBifford",
                              "in_reply_to_status_id_str": "1799214756353716335",
                              "in_reply_to_user_id_str": "1514573322452758532",
                              "is_quote_status": false,
                              "lang": "en",
                              "quote_count": 0,
                              "reply_count": 35,
                              "retweet_count": 11,
                              "retweeted": false,
                              "user_id_str": "1347587996439121923",
                              "id_str": "1799240579768832297"
                            },
                            "quick_promote_eligibility": {
                              "eligibility": "IneligibleNotProfessional"
                            }
                          }
                        },
                        "tweetDisplayType": "Tweet"
                      },
                      "clientEventInfo": {
                        "details": {
                          "conversationDetails": {
                            "conversationSection": "HighQuality"
                          },
                          "timelinesDetails": {
                            "controllerData": "DAACDAAEDAABCgABFIgaDDALgBUKAAIAAAAAFUBACAAAAAA="
                          }
                        }
                      }
                    }
                  }
                ],
                "displayType": "VerticalConversation",
                "clientEventInfo": {
                  "details": {
                    "conversationDetails": {
                      "conversationSection": "HighQuality"
                    }
                  }
                }
              }
            },
            {
              "entryId": "conversationthread-1799221039743803440",
              "sortIndex": "7424157280501059422",
              "content": {
                "entryType": "TimelineTimelineModule",
                "__typename": "TimelineTimelineModule",
                "items": [
                  {
                    "entryId": "conversationthread-1799221039743803440-tweet-1799221039743803440",
                    "item": {
                      "itemContent": {
                        "itemType": "TimelineTweet",
                        "__typename": "TimelineTweet",
                        "tweet_results": {
                          "result": {
                            "__typename": "Tweet",
                            "rest_id": "1799221039743803440",
                            "has_birdwatch_notes": false,
                            "core": {
                              "user_results": {
                                "result": {
                                  "__typename": "User",
                                  "id": "VXNlcjo3NjY1MjA0OTM2MjUwNDkwODg=",
                                  "rest_id": "766520493625049088",
                                  "affiliates_highlighted_label": {},
                                  "has_graduated_access": true,
                                  "is_blue_verified": true,
                                  "profile_image_shape": "Circle",
                                  "legacy": {
                                    "can_dm": false,
                                    "can_media_tag": true,
                                    "created_at": "Fri Aug 19 06:21:42 +0000 2016",
                                    "default_profile": true,
                                    "default_profile_image": false,
                                    "description": "",
                                    "entities": {
                                      "description": {
                                        "urls": []
                                      }
                                    },
                                    "fast_followers_count": 0,
                                    "favourites_count": 7202,
                                    "followers_count": 1627,
                                    "friends_count": 337,
                                    "has_custom_timelines": false,
                                    "is_translator": false,
                                    "listed_count": 26,
                                    "location": "",
                                    "media_count": 2165,
                                    "name": "Erick",
                                    "normal_followers_count": 1627,
                                    "pinned_tweet_ids_str": [
                                      "1708249440090194084"
                                    ],
                                    "possibly_sensitive": false,
                                    "profile_image_url_https": "https://pbs.twimg.com/profile_images/1706488015084818432/Tlm6jdep_normal.jpg",
                                    "profile_interstitial_type": "",
                                    "screen_name": "Erickschultz11",
                                    "statuses_count": 34523,
                                    "translator_type": "none",
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
                              "edit_tweet_ids": ["1799221039743803440"],
                              "editable_until_msecs": "1717806298000",
                              "is_edit_eligible": false,
                              "edits_remaining": "5"
                            },
                            "is_translatable": false,
                            "views": {
                              "count": "626421",
                              "state": "EnabledWithCount"
                            },
                            "source": "<a href=\"https://mobile.twitter.com\" rel=\"nofollow\">Twitter Web App</a>",
                            "legacy": {
                              "bookmark_count": 19,
                              "bookmarked": false,
                              "created_at": "Fri Jun 07 23:24:58 +0000 2024",
                              "conversation_id_str": "1799214756353716335",
                              "display_text_range": [10, 124],
                              "entities": {
                                "hashtags": [],
                                "symbols": [],
                                "timestamps": [],
                                "urls": [],
                                "user_mentions": [
                                  {
                                    "id_str": "1514573322452758532",
                                    "name": "TheRealBiffBifford™ \uD83C\uDDFA\uD83C\uDDF8",
                                    "screen_name": "TBifford",
                                    "indices": [0, 9]
                                  }
                                ]
                              },
                              "favorite_count": 4141,
                              "favorited": false,
                              "full_text": "@TBifford It seems the first guy down, should have caused the second guy to be more cautious. So, No. it's not the best way.",
                              "in_reply_to_screen_name": "TBifford",
                              "in_reply_to_status_id_str": "1799214756353716335",
                              "in_reply_to_user_id_str": "1514573322452758532",
                              "is_quote_status": false,
                              "lang": "en",
                              "quote_count": 0,
                              "reply_count": 18,
                              "retweet_count": 18,
                              "retweeted": false,
                              "user_id_str": "766520493625049088",
                              "id_str": "1799221039743803440"
                            },
                            "quick_promote_eligibility": {
                              "eligibility": "IneligibleNotProfessional"
                            }
                          }
                        },
                        "tweetDisplayType": "Tweet"
                      },
                      "clientEventInfo": {
                        "details": {
                          "conversationDetails": {
                            "conversationSection": "HighQuality"
                          },
                          "timelinesDetails": {
                            "controllerData": "DAACDAAEDAABCgABFIgKCCALgBUKAAIAAAAAFEBACAAAAAA="
                          }
                        }
                      }
                    }
                  }
                ],
                "displayType": "VerticalConversation",
                "clientEventInfo": {
                  "details": {
                    "conversationDetails": {
                      "conversationSection": "HighQuality"
                    }
                  }
                }
              }
            },
            {
              "entryId": "conversationthread-1799245499213451709",
              "sortIndex": "7424157280501059412",
              "content": {
                "entryType": "TimelineTimelineModule",
                "__typename": "TimelineTimelineModule",
                "items": [
                  {
                    "entryId": "conversationthread-1799245499213451709-tweet-1799245499213451709",
                    "item": {
                      "itemContent": {
                        "itemType": "TimelineTweet",
                        "__typename": "TimelineTweet",
                        "tweet_results": {
                          "result": {
                            "__typename": "Tweet",
                            "rest_id": "1799245499213451709",
                            "has_birdwatch_notes": false,
                            "core": {
                              "user_results": {
                                "result": {
                                  "__typename": "User",
                                  "id": "VXNlcjoxNjY2NDY4MDU0ODU3ODU5MDcz",
                                  "rest_id": "1666468054857859073",
                                  "affiliates_highlighted_label": {},
                                  "has_graduated_access": true,
                                  "is_blue_verified": true,
                                  "profile_image_shape": "Circle",
                                  "legacy": {
                                    "can_dm": false,
                                    "can_media_tag": true,
                                    "created_at": "Wed Jun 07 15:32:23 +0000 2023",
                                    "default_profile": true,
                                    "default_profile_image": false,
                                    "description": "LeFtaRDs!  LISTEN TO YOUR MASTER... when I'm done with you, you'll be drinkin my CoolAide with no icccce... \n\n TRUMP IS YOUR DADDY AND YOU LUUUVE IIIIIT!!",
                                    "entities": {
                                      "description": {
                                        "urls": []
                                      }
                                    },
                                    "fast_followers_count": 0,
                                    "favourites_count": 13963,
                                    "followers_count": 2646,
                                    "friends_count": 5649,
                                    "has_custom_timelines": false,
                                    "is_translator": false,
                                    "listed_count": 5,
                                    "location": "",
                                    "media_count": 82,
                                    "name": "JonesCoolAid",
                                    "normal_followers_count": 2646,
                                    "pinned_tweet_ids_str": [],
                                    "possibly_sensitive": false,
                                    "profile_image_url_https": "https://pbs.twimg.com/profile_images/1666468152991940610/WbGaH0-__normal.jpg",
                                    "profile_interstitial_type": "",
                                    "screen_name": "JonesCoolAid1",
                                    "statuses_count": 12290,
                                    "translator_type": "none",
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
                              "edit_tweet_ids": ["1799245499213451709"],
                              "editable_until_msecs": "1717812130000",
                              "is_edit_eligible": false,
                              "edits_remaining": "5"
                            },
                            "is_translatable": false,
                            "views": {
                              "count": "440146",
                              "state": "EnabledWithCount"
                            },
                            "source": "<a href=\"https://mobile.twitter.com\" rel=\"nofollow\">Twitter Web App</a>",
                            "legacy": {
                              "bookmark_count": 14,
                              "bookmarked": false,
                              "created_at": "Sat Jun 08 01:02:10 +0000 2024",
                              "conversation_id_str": "1799214756353716335",
                              "display_text_range": [10, 61],
                              "entities": {
                                "hashtags": [],
                                "symbols": [],
                                "timestamps": [],
                                "urls": [],
                                "user_mentions": [
                                  {
                                    "id_str": "1514573322452758532",
                                    "name": "TheRealBiffBifford™ \uD83C\uDDFA\uD83C\uDDF8",
                                    "screen_name": "TBifford",
                                    "indices": [0, 9]
                                  }
                                ]
                              },
                              "favorite_count": 1331,
                              "favorited": false,
                              "full_text": "@TBifford flash bag. or shoot through the wall. you'll get em",
                              "in_reply_to_screen_name": "TBifford",
                              "in_reply_to_status_id_str": "1799214756353716335",
                              "in_reply_to_user_id_str": "1514573322452758532",
                              "is_quote_status": false,
                              "lang": "en",
                              "quote_count": 0,
                              "reply_count": 17,
                              "retweet_count": 7,
                              "retweeted": false,
                              "user_id_str": "1666468054857859073",
                              "id_str": "1799245499213451709"
                            },
                            "quick_promote_eligibility": {
                              "eligibility": "IneligibleNotProfessional"
                            }
                          }
                        },
                        "tweetDisplayType": "Tweet"
                      },
                      "clientEventInfo": {
                        "details": {
                          "conversationDetails": {
                            "conversationSection": "HighQuality"
                          },
                          "timelinesDetails": {
                            "controllerData": "DAACDAAEDAABCgABFIg6CCALgBUKAAIAAAAAFEBACAAAAAA="
                          }
                        }
                      }
                    }
                  }
                ],
                "displayType": "VerticalConversation",
                "clientEventInfo": {
                  "details": {
                    "conversationDetails": {
                      "conversationSection": "HighQuality"
                    }
                  }
                }
              }
            },
            {
              "entryId": "conversationthread-1799352010111647759",
              "sortIndex": "7424157280501059402",
              "content": {
                "entryType": "TimelineTimelineModule",
                "__typename": "TimelineTimelineModule",
                "items": [
                  {
                    "entryId": "conversationthread-1799352010111647759-tweet-1799352010111647759",
                    "item": {
                      "itemContent": {
                        "itemType": "TimelineTweet",
                        "__typename": "TimelineTweet",
                        "tweet_results": {
                          "result": {
                            "__typename": "Tweet",
                            "rest_id": "1799352010111647759",
                            "has_birdwatch_notes": false,
                            "core": {
                              "user_results": {
                                "result": {
                                  "__typename": "User",
                                  "id": "VXNlcjo3MDM3NDc2OTI=",
                                  "rest_id": "703747692",
                                  "affiliates_highlighted_label": {},
                                  "has_graduated_access": true,
                                  "is_blue_verified": true,
                                  "profile_image_shape": "Circle",
                                  "legacy": {
                                    "can_dm": false,
                                    "can_media_tag": true,
                                    "created_at": "Wed Jul 18 20:37:13 +0000 2012",
                                    "default_profile": true,
                                    "default_profile_image": false,
                                    "description": "aka Wezus ☮️ Computer Engineer \uD83D\uDC68‍\uD83D\uDCBBCompetitive Gamer \uD83C\uDFAE Animal/Nature Enthusiast \uD83C\uDF32 Athlete \uD83C\uDFC5\nCanadian livin' in my igloo with my two boys: \uD83D\uDC3A Loki & Odin \uD83D\uDC2F",
                                    "entities": {
                                      "description": {
                                        "urls": []
                                      },
                                      "url": {
                                        "urls": [
                                          {
                                            "display_url": "twitch.tv/poisonslash",
                                            "expanded_url": "https://www.twitch.tv/poisonslash",
                                            "url": "https://t.co/XPAypxXVZr",
                                            "indices": [0, 23]
                                          }
                                        ]
                                      }
                                    },
                                    "fast_followers_count": 0,
                                    "favourites_count": 2424,
                                    "followers_count": 277,
                                    "friends_count": 1095,
                                    "has_custom_timelines": true,
                                    "is_translator": false,
                                    "listed_count": 1,
                                    "location": "",
                                    "media_count": 1264,
                                    "name": "Poisonslash",
                                    "normal_followers_count": 277,
                                    "pinned_tweet_ids_str": [
                                      "748527656568750081"
                                    ],
                                    "possibly_sensitive": false,
                                    "profile_banner_url": "https://pbs.twimg.com/profile_banners/703747692/1436435634",
                                    "profile_image_url_https": "https://pbs.twimg.com/profile_images/619080930116943872/CEi0Vd0N_normal.png",
                                    "profile_interstitial_type": "",
                                    "screen_name": "PoisonslashX",
                                    "statuses_count": 3972,
                                    "translator_type": "none",
                                    "url": "https://t.co/XPAypxXVZr",
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
                              "edit_tweet_ids": ["1799352010111647759"],
                              "editable_until_msecs": "1717837524000",
                              "is_edit_eligible": false,
                              "edits_remaining": "5"
                            },
                            "is_translatable": false,
                            "views": {
                              "count": "239608",
                              "state": "EnabledWithCount"
                            },
                            "source": "<a href=\"https://mobile.twitter.com\" rel=\"nofollow\">Twitter Web App</a>",
                            "legacy": {
                              "bookmark_count": 466,
                              "bookmarked": false,
                              "created_at": "Sat Jun 08 08:05:24 +0000 2024",
                              "conversation_id_str": "1799214756353716335",
                              "display_text_range": [10, 232],
                              "entities": {
                                "hashtags": [],
                                "media": [
                                  {
                                    "display_url": "pic.x.com/pwlrvsycad",
                                    "expanded_url": "https://twitter.com/PoisonslashX/status/1799352010111647759/video/1",
                                    "id_str": "1799351855455096832",
                                    "indices": [233, 256],
                                    "media_key": "7_1799351855455096832",
                                    "media_url_https": "https://pbs.twimg.com/ext_tw_video_thumb/1799351855455096832/pu/img/bwL_ZyshIp2tCzzB.jpg",
                                    "type": "video",
                                    "url": "https://t.co/PWlrvSyCAd",
                                    "additional_media_info": {
                                      "monetizable": false
                                    },
                                    "ext_media_availability": {
                                      "status": "Available"
                                    },
                                    "sizes": {
                                      "large": {
                                        "h": 1280,
                                        "w": 720,
                                        "resize": "fit"
                                      },
                                      "medium": {
                                        "h": 1200,
                                        "w": 675,
                                        "resize": "fit"
                                      },
                                      "small": {
                                        "h": 680,
                                        "w": 383,
                                        "resize": "fit"
                                      },
                                      "thumb": {
                                        "h": 150,
                                        "w": 150,
                                        "resize": "crop"
                                      }
                                    },
                                    "original_info": {
                                      "height": 1280,
                                      "width": 720,
                                      "focus_rects": []
                                    },
                                    "allow_download_status": {
                                      "allow_download": true
                                    },
                                    "video_info": {
                                      "aspect_ratio": [9, 16],
                                      "duration_millis": 57400,
                                      "variants": [
                                        {
                                          "content_type": "application/x-mpegURL",
                                          "url": "https://video.twimg.com/ext_tw_video/1799351855455096832/pu/pl/qb3eTfCl3Wyd8oJP.m3u8?tag=12"
                                        },
                                        {
                                          "bitrate": 632000,
                                          "content_type": "video/mp4",
                                          "url": "https://video.twimg.com/ext_tw_video/1799351855455096832/pu/vid/avc1/320x568/aEpzNkPRaaEZYnSd.mp4?tag=12"
                                        },
                                        {
                                          "bitrate": 950000,
                                          "content_type": "video/mp4",
                                          "url": "https://video.twimg.com/ext_tw_video/1799351855455096832/pu/vid/avc1/480x852/xEdAqzxT73vQo0C5.mp4?tag=12"
                                        },
                                        {
                                          "bitrate": 2176000,
                                          "content_type": "video/mp4",
                                          "url": "https://video.twimg.com/ext_tw_video/1799351855455096832/pu/vid/avc1/720x1280/KpPBEx6jPR_lfUG7.mp4?tag=12"
                                        }
                                      ]
                                    },
                                    "media_results": {
                                      "result": {
                                        "media_key": "7_1799351855455096832"
                                      }
                                    }
                                  }
                                ],
                                "symbols": [],
                                "timestamps": [],
                                "urls": [],
                                "user_mentions": [
                                  {
                                    "id_str": "1514573322452758532",
                                    "name": "TheRealBiffBifford™ \uD83C\uDDFA\uD83C\uDDF8",
                                    "screen_name": "TBifford",
                                    "indices": [0, 9]
                                  }
                                ]
                              },
                              "extended_entities": {
                                "media": [
                                  {
                                    "display_url": "pic.twitter.com/PWlrvSyCAd",
                                    "expanded_url": "https://twitter.com/PoisonslashX/status/1799352010111647759/video/1",
                                    "id_str": "1799351855455096832",
                                    "indices": [233, 256],
                                    "media_key": "7_1799351855455096832",
                                    "media_url_https": "https://pbs.twimg.com/ext_tw_video_thumb/1799351855455096832/pu/img/bwL_ZyshIp2tCzzB.jpg",
                                    "type": "video",
                                    "url": "https://t.co/PWlrvSyCAd",
                                    "additional_media_info": {
                                      "monetizable": false
                                    },
                                    "ext_media_availability": {
                                      "status": "Available"
                                    },
                                    "sizes": {
                                      "large": {
                                        "h": 1280,
                                        "w": 720,
                                        "resize": "fit"
                                      },
                                      "medium": {
                                        "h": 1200,
                                        "w": 675,
                                        "resize": "fit"
                                      },
                                      "small": {
                                        "h": 680,
                                        "w": 383,
                                        "resize": "fit"
                                      },
                                      "thumb": {
                                        "h": 150,
                                        "w": 150,
                                        "resize": "crop"
                                      }
                                    },
                                    "original_info": {
                                      "height": 1280,
                                      "width": 720,
                                      "focus_rects": []
                                    },
                                    "allow_download_status": {
                                      "allow_download": true
                                    },
                                    "video_info": {
                                      "aspect_ratio": [9, 16],
                                      "duration_millis": 57400,
                                      "variants": [
                                        {
                                          "content_type": "application/x-mpegURL",
                                          "url": "https://video.twimg.com/ext_tw_video/1799351855455096832/pu/pl/qb3eTfCl3Wyd8oJP.m3u8?tag=12"
                                        },
                                        {
                                          "bitrate": 632000,
                                          "content_type": "video/mp4",
                                          "url": "https://video.twimg.com/ext_tw_video/1799351855455096832/pu/vid/avc1/320x568/aEpzNkPRaaEZYnSd.mp4?tag=12"
                                        },
                                        {
                                          "bitrate": 950000,
                                          "content_type": "video/mp4",
                                          "url": "https://video.twimg.com/ext_tw_video/1799351855455096832/pu/vid/avc1/480x852/xEdAqzxT73vQo0C5.mp4?tag=12"
                                        },
                                        {
                                          "bitrate": 2176000,
                                          "content_type": "video/mp4",
                                          "url": "https://video.twimg.com/ext_tw_video/1799351855455096832/pu/vid/avc1/720x1280/KpPBEx6jPR_lfUG7.mp4?tag=12"
                                        }
                                      ]
                                    },
                                    "media_results": {
                                      "result": {
                                        "media_key": "7_1799351855455096832"
                                      }
                                    }
                                  }
                                ]
                              },
                              "favorite_count": 1785,
                              "favorited": false,
                              "full_text": "@TBifford Well if I just saw my buddy get taken out in front of me, instead of joining him for drinks in heaven, I'd either go for the wall bang or frag out.\n\nPeaking here is dangerous due to your opponents proximity from the angle: https://t.co/PWlrvSyCAd",
                              "in_reply_to_screen_name": "TBifford",
                              "in_reply_to_status_id_str": "1799214756353716335",
                              "in_reply_to_user_id_str": "1514573322452758532",
                              "is_quote_status": false,
                              "lang": "en",
                              "possibly_sensitive": false,
                              "possibly_sensitive_editable": true,
                              "quote_count": 9,
                              "reply_count": 28,
                              "retweet_count": 144,
                              "retweeted": false,
                              "user_id_str": "703747692",
                              "id_str": "1799352010111647759"
                            },
                            "quick_promote_eligibility": {
                              "eligibility": "IneligibleNotProfessional"
                            }
                          }
                        },
                        "tweetDisplayType": "Tweet"
                      },
                      "clientEventInfo": {
                        "details": {
                          "conversationDetails": {
                            "conversationSection": "HighQuality"
                          },
                          "timelinesDetails": {
                            "controllerData": "DAACDAAEDAABCgABFIQ6CCBbgBUKAAIAAAAAFUBACAAAAAA="
                          }
                        }
                      }
                    }
                  }
                ],
                "displayType": "VerticalConversation",
                "clientEventInfo": {
                  "details": {
                    "conversationDetails": {
                      "conversationSection": "HighQuality"
                    }
                  }
                }
              }
            },
            {
              "entryId": "conversationthread-1799323398717558858",
              "sortIndex": "7424157280501059392",
              "content": {
                "entryType": "TimelineTimelineModule",
                "__typename": "TimelineTimelineModule",
                "items": [
                  {
                    "entryId": "conversationthread-1799323398717558858-tweet-1799323398717558858",
                    "item": {
                      "itemContent": {
                        "itemType": "TimelineTweet",
                        "__typename": "TimelineTweet",
                        "tweet_results": {
                          "result": {
                            "__typename": "Tweet",
                            "rest_id": "1799323398717558858",
                            "has_birdwatch_notes": false,
                            "core": {
                              "user_results": {
                                "result": {
                                  "__typename": "User",
                                  "id": "VXNlcjo1Mzg4ODkwMzY=",
                                  "rest_id": "538889036",
                                  "affiliates_highlighted_label": {},
                                  "has_graduated_access": true,
                                  "is_blue_verified": true,
                                  "profile_image_shape": "Circle",
                                  "legacy": {
                                    "can_dm": true,
                                    "can_media_tag": true,
                                    "created_at": "Wed Mar 28 09:27:20 +0000 2012",
                                    "default_profile": false,
                                    "default_profile_image": false,
                                    "description": "",
                                    "entities": {
                                      "description": {
                                        "urls": []
                                      }
                                    },
                                    "fast_followers_count": 0,
                                    "favourites_count": 24121,
                                    "followers_count": 1726,
                                    "friends_count": 1527,
                                    "has_custom_timelines": true,
                                    "is_translator": false,
                                    "listed_count": 0,
                                    "location": "",
                                    "media_count": 2749,
                                    "name": "Mr J",
                                    "normal_followers_count": 1726,
                                    "pinned_tweet_ids_str": [
                                      "1721623040235393185"
                                    ],
                                    "possibly_sensitive": false,
                                    "profile_banner_url": "https://pbs.twimg.com/profile_banners/538889036/1707357206",
                                    "profile_image_url_https": "https://pbs.twimg.com/profile_images/1613708874296758272/DJoe7aXs_normal.jpg",
                                    "profile_interstitial_type": "",
                                    "screen_name": "warcroft",
                                    "statuses_count": 16961,
                                    "translator_type": "none",
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
                              "edit_tweet_ids": ["1799323398717558858"],
                              "editable_until_msecs": "1717830702000",
                              "is_edit_eligible": false,
                              "edits_remaining": "5"
                            },
                            "is_translatable": false,
                            "views": {
                              "count": "183017",
                              "state": "EnabledWithCount"
                            },
                            "source": "<a href=\"http://twitter.com/download/android\" rel=\"nofollow\">Twitter for Android</a>",
                            "legacy": {
                              "bookmark_count": 16,
                              "bookmarked": false,
                              "created_at": "Sat Jun 08 06:11:42 +0000 2024",
                              "conversation_id_str": "1799214756353716335",
                              "display_text_range": [10, 203],
                              "entities": {
                                "hashtags": [],
                                "symbols": [],
                                "timestamps": [],
                                "urls": [],
                                "user_mentions": [
                                  {
                                    "id_str": "1514573322452758532",
                                    "name": "TheRealBiffBifford™ \uD83C\uDDFA\uD83C\uDDF8",
                                    "screen_name": "TBifford",
                                    "indices": [0, 9]
                                  }
                                ]
                              },
                              "favorite_count": 1104,
                              "favorited": false,
                              "full_text": "@TBifford \"oh, the dude in front of me got shot. I better go in too.\"\n\n\"oh, the two dudes in front of me got shot. I better go in too.\"\n\n\"oh, the three dudes in front of me got shot. I better go in too.\"",
                              "in_reply_to_screen_name": "TBifford",
                              "in_reply_to_status_id_str": "1799214756353716335",
                              "in_reply_to_user_id_str": "1514573322452758532",
                              "is_quote_status": false,
                              "lang": "en",
                              "quote_count": 2,
                              "reply_count": 33,
                              "retweet_count": 18,
                              "retweeted": false,
                              "user_id_str": "538889036",
                              "id_str": "1799323398717558858"
                            },
                            "quick_promote_eligibility": {
                              "eligibility": "IneligibleNotProfessional"
                            }
                          }
                        },
                        "tweetDisplayType": "Tweet"
                      },
                      "clientEventInfo": {
                        "details": {
                          "conversationDetails": {
                            "conversationSection": "HighQuality"
                          },
                          "timelinesDetails": {
                            "controllerData": "DAACDAAEDAABCgABFIQKCCALgBUKAAIAAAAAFUBACAAAAAA="
                          }
                        }
                      }
                    }
                  }
                ],
                "displayType": "VerticalConversation",
                "clientEventInfo": {
                  "details": {
                    "conversationDetails": {
                      "conversationSection": "HighQuality"
                    }
                  }
                }
              }
            },
            {
              "entryId": "conversationthread-1799279883790778385",
              "sortIndex": "7424157280501059382",
              "content": {
                "entryType": "TimelineTimelineModule",
                "__typename": "TimelineTimelineModule",
                "items": [
                  {
                    "entryId": "conversationthread-1799279883790778385-tweet-1799279883790778385",
                    "item": {
                      "itemContent": {
                        "itemType": "TimelineTweet",
                        "__typename": "TimelineTweet",
                        "tweet_results": {
                          "result": {
                            "__typename": "Tweet",
                            "rest_id": "1799279883790778385",
                            "has_birdwatch_notes": false,
                            "core": {
                              "user_results": {
                                "result": {
                                  "__typename": "User",
                                  "id": "VXNlcjo1NjQ3NTQ2NA==",
                                  "rest_id": "56475464",
                                  "affiliates_highlighted_label": {},
                                  "has_graduated_access": true,
                                  "is_blue_verified": true,
                                  "profile_image_shape": "Circle",
                                  "legacy": {
                                    "can_dm": false,
                                    "can_media_tag": true,
                                    "created_at": "Mon Jul 13 19:58:30 +0000 2009",
                                    "default_profile": true,
                                    "default_profile_image": false,
                                    "description": "Born.  Took fewer naps than my brother.  Burned the grilled cheese sandwiches.  Found a girl.  Did everything I needed to do but the one thing I needed to do.",
                                    "entities": {
                                      "description": {
                                        "urls": []
                                      }
                                    },
                                    "fast_followers_count": 0,
                                    "favourites_count": 23940,
                                    "followers_count": 1648,
                                    "friends_count": 2353,
                                    "has_custom_timelines": true,
                                    "is_translator": false,
                                    "listed_count": 14,
                                    "location": "Upstate, NY, USA",
                                    "media_count": 1194,
                                    "name": "Kevin S.",
                                    "normal_followers_count": 1648,
                                    "pinned_tweet_ids_str": [
                                      "1796912434654929005"
                                    ],
                                    "possibly_sensitive": false,
                                    "profile_banner_url": "https://pbs.twimg.com/profile_banners/56475464/1479951059",
                                    "profile_image_url_https": "https://pbs.twimg.com/profile_images/789976929029988353/O73Oc408_normal.jpg",
                                    "profile_interstitial_type": "",
                                    "screen_name": "LapstrakeNYS",
                                    "statuses_count": 20811,
                                    "translator_type": "none",
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
                              "edit_tweet_ids": ["1799279883790778385"],
                              "editable_until_msecs": "1717820327000",
                              "is_edit_eligible": false,
                              "edits_remaining": "5"
                            },
                            "is_translatable": false,
                            "views": {
                              "count": "731829",
                              "state": "EnabledWithCount"
                            },
                            "source": "<a href=\"https://mobile.twitter.com\" rel=\"nofollow\">Twitter Web App</a>",
                            "legacy": {
                              "bookmark_count": 77,
                              "bookmarked": false,
                              "created_at": "Sat Jun 08 03:18:47 +0000 2024",
                              "conversation_id_str": "1799214756353716335",
                              "display_text_range": [10, 226],
                              "entities": {
                                "hashtags": [],
                                "symbols": [],
                                "timestamps": [],
                                "urls": [],
                                "user_mentions": [
                                  {
                                    "id_str": "1514573322452758532",
                                    "name": "TheRealBiffBifford™ \uD83C\uDDFA\uD83C\uDDF8",
                                    "screen_name": "TBifford",
                                    "indices": [0, 9]
                                  }
                                ]
                              },
                              "favorite_count": 8470,
                              "favorited": false,
                              "full_text": "@TBifford I'm not a soldier.  All I know is from Counter Strike Source.\n\nBut if the guy in front of you is gunned down on entry, you should probably realize that there is a shooter waiting for people to enter through the door.",
                              "in_reply_to_screen_name": "TBifford",
                              "in_reply_to_status_id_str": "1799214756353716335",
                              "in_reply_to_user_id_str": "1514573322452758532",
                              "is_quote_status": false,
                              "lang": "en",
                              "quote_count": 6,
                              "reply_count": 93,
                              "retweet_count": 90,
                              "retweeted": false,
                              "user_id_str": "56475464",
                              "id_str": "1799279883790778385"
                            },
                            "quick_promote_eligibility": {
                              "eligibility": "IneligibleNotProfessional"
                            }
                          }
                        },
                        "tweetDisplayType": "Tweet"
                      },
                      "clientEventInfo": {
                        "details": {
                          "conversationDetails": {
                            "conversationSection": "HighQuality"
                          },
                          "timelinesDetails": {
                            "controllerData": "DAACDAAEDAABCgABFIgaCCALgBUKAAIAAAAAFUBACAAAAAA="
                          }
                        }
                      }
                    }
                  }
                ],
                "displayType": "VerticalConversation",
                "clientEventInfo": {
                  "details": {
                    "conversationDetails": {
                      "conversationSection": "HighQuality"
                    }
                  }
                }
              }
            },
            {
              "entryId": "cursor-bottom-7362573119154011512",
              "sortIndex": "7424157280501059381",
              "content": {
                "entryType": "TimelineTimelineItem",
                "__typename": "TimelineTimelineItem",
                "itemContent": {
                  "itemType": "TimelineTimelineCursor",
                  "__typename": "TimelineTimelineCursor",
                  "value": "WwAAAPBMHBmWlMHeiaLGvfgxhMbRla2u2fgx0sS26cjxl_gx-sa0xfWPmvgx4IC1pZiAj_gxnoC4ydXHyvgx5ofXxYrIjPgxooDYza7hqfgxzoa4lZiltPgxJQISFQQAAA",
                  "cursorType": "Bottom"
                }
              }
            }
          ]
        },
        {
          "type": "TimelineTerminateTimeline",
          "direction": "Top"
        }
      ]
    }
  }
}
```
