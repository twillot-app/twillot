```js
fetch('https://x.com/i/api/graphql/oB-5XsHNAbjvARJEc8CZFw/CreateTweet', {
  body: '{"variables":{"tweet_text":"我这图能看懂吗？#twillot","dark_request":false,"media":{"media_entities":[{"media_id":"1795764824208818176","tagged_users":[]}],"possibly_sensitive":false},"semantic_annotation_ids":[]},"features":{"communities_web_enable_tweet_community_results_fetch":true,"c9s_tweet_anatomy_moderator_badge_enabled":true,"tweetypie_unmention_optimization_enabled":true,"responsive_web_edit_tweet_api_enabled":true,"graphql_is_translatable_rweb_tweet_is_translatable_enabled":true,"view_counts_everywhere_api_enabled":true,"longform_notetweets_consumption_enabled":true,"responsive_web_twitter_article_tweet_consumption_enabled":true,"tweet_awards_web_tipping_enabled":false,"creator_subscriptions_quote_tweet_preview_enabled":false,"longform_notetweets_rich_text_read_enabled":true,"longform_notetweets_inline_media_enabled":true,"articles_preview_enabled":true,"rweb_video_timestamps_enabled":true,"rweb_tipjar_consumption_enabled":true,"responsive_web_graphql_exclude_directive_enabled":true,"verified_phone_label_enabled":false,"freedom_of_speech_not_reach_fetch_enabled":true,"standardized_nudges_misinfo":true,"tweet_with_visibility_results_prefer_gql_limited_actions_policy_enabled":true,"responsive_web_graphql_skip_user_profile_image_extensions_enabled":false,"responsive_web_graphql_timeline_navigation_enabled":true,"responsive_web_enhance_cards_enabled":false},"queryId":"oB-5XsHNAbjvARJEc8CZFw"}',
})
```

```json
{
  "data": {
    "create_tweet": {
      "tweet_results": {
        "result": {
          "rest_id": "1795765436682039468",
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
                          "indices": [39, 62]
                        },
                        {
                          "display_url": "millionairecalculator.org",
                          "expanded_url": "https://millionairecalculator.org",
                          "url": "https://t.co/cD4zMnl2Sn",
                          "indices": [89, 112]
                        }
                      ]
                    },
                    "url": {
                      "urls": [
                        {
                          "display_url": "twillot.com",
                          "expanded_url": "https://twillot.com/",
                          "url": "https://t.co/4jBXyW6cep",
                          "indices": [0, 23]
                        }
                      ]
                    }
                  },
                  "fast_followers_count": 0,
                  "favourites_count": 981,
                  "followers_count": 421,
                  "friends_count": 2088,
                  "has_custom_timelines": true,
                  "is_translator": false,
                  "listed_count": 17,
                  "location": "",
                  "media_count": 56,
                  "name": "饭特稀",
                  "needs_phone_verification": false,
                  "normal_followers_count": 421,
                  "pinned_tweet_ids_str": ["1777325561947549814"],
                  "possibly_sensitive": false,
                  "profile_image_url_https": "https://pbs.twimg.com/profile_images/1789982655100194816/eznb-5Di_normal.png",
                  "profile_interstitial_type": "",
                  "screen_name": "SiZapPaaiGwat",
                  "statuses_count": 1475,
                  "translator_type": "none",
                  "url": "https://t.co/4jBXyW6cep",
                  "verified": false,
                  "want_retweets": false,
                  "withheld_in_countries": []
                },
                "tipjar_settings": {
                  "is_enabled": true,
                  "patreon_handle": "Twillot"
                }
              }
            }
          },
          "unmention_data": {},
          "edit_control": {
            "edit_tweet_ids": ["1795765436682039468"],
            "editable_until_msecs": "1716982418000",
            "is_edit_eligible": true,
            "edits_remaining": "5"
          },
          "is_translatable": true,
          "views": {
            "state": "Enabled"
          },
          "source": "<a href=\"https://mobile.twitter.com\" rel=\"nofollow\">Twitter Web App</a>",
          "legacy": {
            "bookmark_count": 0,
            "bookmarked": false,
            "created_at": "Wed May 29 10:33:38 +0000 2024",
            "conversation_id_str": "1795765436682039468",
            "display_text_range": [0, 16],
            "entities": {
              "hashtags": [
                {
                  "indices": [8, 16],
                  "text": "twillot"
                }
              ],
              "media": [
                {
                  "display_url": "pic.twitter.com/g4xezr9Sfn",
                  "expanded_url": "https://twitter.com/SiZapPaaiGwat/status/1795765436682039468/photo/1",
                  "id_str": "1795764824208818176",
                  "indices": [17, 40],
                  "media_url_https": "https://pbs.twimg.com/media/GOvWl98bwAAHmEK.png",
                  "type": "photo",
                  "url": "https://t.co/g4xezr9Sfn",
                  "features": {},
                  "sizes": {
                    "large": {
                      "h": 830,
                      "w": 1607,
                      "resize": "fit"
                    },
                    "medium": {
                      "h": 620,
                      "w": 1200,
                      "resize": "fit"
                    },
                    "small": {
                      "h": 351,
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
                    "height": 830,
                    "width": 1607
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
                  "display_url": "pic.twitter.com/g4xezr9Sfn",
                  "expanded_url": "https://twitter.com/SiZapPaaiGwat/status/1795765436682039468/photo/1",
                  "ext_alt_text": "Workflow for twillot",
                  "id_str": "1795764824208818176",
                  "indices": [17, 40],
                  "media_key": "3_1795764824208818176",
                  "media_url_https": "https://pbs.twimg.com/media/GOvWl98bwAAHmEK.png",
                  "type": "photo",
                  "url": "https://t.co/g4xezr9Sfn",
                  "features": {},
                  "sizes": {
                    "large": {
                      "h": 830,
                      "w": 1607,
                      "resize": "fit"
                    },
                    "medium": {
                      "h": 620,
                      "w": 1200,
                      "resize": "fit"
                    },
                    "small": {
                      "h": 351,
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
                    "height": 830,
                    "width": 1607
                  }
                }
              ]
            },
            "favorite_count": 0,
            "favorited": false,
            "full_text": "我这图能看懂吗？#twillot https://t.co/g4xezr9Sfn",
            "is_quote_status": false,
            "lang": "zh",
            "possibly_sensitive": false,
            "possibly_sensitive_editable": true,
            "quote_count": 0,
            "reply_count": 0,
            "retweet_count": 0,
            "retweeted": false,
            "user_id_str": "2751923820",
            "id_str": "1795765436682039468"
          },
          "unmention_info": {}
        }
      }
    }
  }
}
```
