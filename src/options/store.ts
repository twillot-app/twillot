import { createStore } from 'solid-js/store'

import type { Tweet, User } from '../types'

export default createStore({
  keyword: '',
  page: 1,
  pageSize: 100,
  totalCount: 0,
  tweets: new Array<Tweet>(),
  topUsers: new Array<User>(),
  syncTime: 0,
  searchTime: 0,
  isAuthenicating: false,
  isAuthFailed: false,
  isAutoSyncing: false,
  isForceSyncing: false,
  isForceSyncTimedout: false,
  memApiKey: '',
})
