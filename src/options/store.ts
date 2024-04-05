import { createStore } from 'solid-js/store'

import { Tweet } from '../types'

export default createStore({
  keyword: '',
  page: 1,
  pageSize: 100,
  totalCount: 0,
  tweets: new Array<Tweet>(),
  syncTime: 0,
  isAuthFailed: false,
  isAutoSyncing: false,
  isForceSyncing: false,
})
