import { iterate } from '../db/tweets'
import { Host, Tweet, TweetQuoted, Media } from '../types'

export type DownloadMediaItem = {
  tweet_id: string
  tweet_url: string
  user_id: string
  username: string
  screen_name: string
  folder: string
  created_at: string
  media_type: string
  media_url: string
  key: string
}

export type MediaType = 'all' | 'image' | 'video' | 'gif'

export function getTweetMediaImage(
  media: Media,
  format?: string,
  size?: string,
) {
  return size
    ? media.media_url_https.split('?')[0] + `?format=${format}&name=${size}`
    : media.media_url_https
}

export function getTweetMediaVideo(media: Media) {
  return media.video_info
    ? media.video_info.variants[media.video_info.variants.length - 1].url
    : null
}

export function getMediaItems(
  record: TweetQuoted,
  folder: string,
  mediaType: MediaType,
): DownloadMediaItem[] {
  if (!record || !record.media_items) {
    return []
  }

  const mediaList = []
  const mediaItem = {
    tweet_id: record.tweet_id,
    tweet_url: `${Host}/${record.screen_name}/status/${record.tweet_id}`,
    user_id: record.user_id,
    username: record.username,
    screen_name: record.screen_name,
    folder,
    created_at: new Date(record.created_at * 1000).toLocaleString(),
  }
  const containImage = mediaType === 'all' || mediaType === 'image'
  const containVideo = mediaType === 'all' || mediaType === 'video'
  const containGif = mediaType === 'all' || mediaType === 'gif'

  record.media_items.forEach((item) => {
    if (item.type === 'photo' && containImage) {
      mediaList.push({
        ...mediaItem,
        key: item.media_key,
        media_type: 'image',
        media_url: getTweetMediaImage(item, 'jpg', 'large'),
      })
    } else if (item.type === 'video' && containVideo) {
      mediaList.push({
        ...mediaItem,
        media_type: 'video',
        media_url: getTweetMediaVideo(item),
      })
    } else if (item.type === 'animated_gif' && containGif) {
      mediaList.push({
        ...mediaItem,
        media_type: 'gif',
        media_url: getTweetMediaVideo(item),
      })
    }
  })

  return mediaList
}

export function getMediaItemsIncludeQuote(record: Tweet, mediaType: MediaType) {
  const mediaList = getMediaItems(
    record,
    record.folder || 'unsorted',
    mediaType,
  )
  const mediaFromQuote = getMediaItems(
    record.quoted_tweet,
    record.folder || 'unsorted',
    mediaType,
  )
  return [...mediaList, ...mediaFromQuote]
}

export async function getTweetsContainsMedia(
  mediaType: MediaType,
  withQuote: boolean,
  limit: number,
) {
  const full_records = await iterate((tweet) => {
    const quoteHasMedia =
      withQuote && tweet.quoted_tweet?.media_items?.length > 0
    if (mediaType === 'all') {
      if (
        tweet.has_image ||
        tweet.has_video ||
        tweet.has_gif ||
        quoteHasMedia
      ) {
        return true
      }
    } else if (mediaType === 'image') {
      return tweet.has_image || quoteHasMedia
    } else if (mediaType === 'video' || mediaType === 'gif') {
      return tweet.has_video || tweet.has_gif || quoteHasMedia
    }

    return false
  }, limit)

  return full_records
}
