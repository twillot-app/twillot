import { createStore } from 'solid-js/store'

import type { Tweet, TweetWithPosition, User } from '../types'
import { DAYS } from '../libs/date'

export default createStore({
  keyword: '',
  category: '',
  page: 1,
  pageSize: 100,
  totalCount: 0,
  tweets: new Array<Tweet>(),
  selectedTweet: null as Tweet | null,
  action: '',
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
