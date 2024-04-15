export interface Tweet {
  tweet_id: string
  user_id: string
  username: string
  screen_name: string
  avatar_url: string
  full_text: string
  lang: string
  sort_index: string
  created_at: number
  possibly_sensitive: boolean
  media: {
    alt_text: string[]
    url: string[]
    type: string[]
  }
}

export interface Header {
  url: string
  token: string
  csrf: string
  cookie: string
}

export enum AuthStatus {
  AUTH_PENDING = 'AUTH_PENDING',
  AUTH_SUCCESS = 'AUTH_SUCCESS',
  AUTH_FAILED = 'AUTH_FAILED',
}

export interface User {
  screen_name: string
  username: string
  avatar_url: string
  count: number
}
