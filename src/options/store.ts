import { createStore } from 'solid-js/store'

import { type Tweet, type TweetWithPosition, type User } from '../types'
import { DAYS } from '../libs/date'

export default createStore({
  keyword: '',
  category: '',
  pageSize: 100,
  hasMore: true,
  totalCount: 0,
  tweets: new Array<Tweet>(),
  selectedTweet: null as Tweet | null,
  topUsers: new Array<User>(),
  folders: new Array<string>(),
  folderInfo: new Map<string, number>(),
  history: new Array<{ date: string; count: number }>(DAYS).fill({
    date: '',
    count: 0,
  }),
  historySize: 0,
  searchTime: 0,
  isAuthenicating: false,
  isAuthFailed: false,
  isAutoSyncing: false,
  isForceSyncing: false,
  isForceSyncTimedout: false,
  memApiKey: '',
  timeline: new Array<TweetWithPosition>(),
})
