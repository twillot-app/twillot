import { createStore } from 'solid-js/store'

import { Tweet } from '../types'

export default createStore({
  tweets: new Array<Tweet>(),
  isSyncing: false,
})
