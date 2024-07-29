import { createStore } from 'solid-js/store'
import { type License, LICENSE_KEY } from 'utils/license'

export const defaultState = () => ({
  like: true,
  repost: true,
  reply: false,
  reply_text: '',
  webhook: false,
  webhook_url: '',
  webhook_token: '',
  saved: false,
  [LICENSE_KEY]: null as License | null,
})

export default createStore(defaultState)
