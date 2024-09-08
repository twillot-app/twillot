import {
  getPosts,
  getReplies,
  getMedia,
  getLikes,
  getFollowers,
} from 'utils/api/twitter-user'

export type Category =
  | 'posts'
  | 'replies'
  | 'media'
  | 'likes'
  | 'followers'
  | 'bookmarks'

export type Handler =
  | typeof getPosts
  | typeof getReplies
  | typeof getMedia
  | typeof getLikes
  | typeof getFollowers
