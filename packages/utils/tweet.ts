import { Media } from './types'

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
