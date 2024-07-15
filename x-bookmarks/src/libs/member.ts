export enum MemberLevel {
  Free,
  Basic,
  Pro,
}

export const MAX_EXPORT_SIZE = [1000, 5000, Number.MAX_SAFE_INTEGER]

export const MAX_MEDIA_EXPORT_SIZE = [100, 500, Number.MAX_SAFE_INTEGER]

const fileTypes = [
  { value: 'csv', label: 'CSV', level: MemberLevel.Free },
  { value: 'json', label: 'JSON', level: MemberLevel.Free },
  // { value: 'pdf', label: 'PDF', level: 1 },
  // { value: 'docx', label: 'DOCX', level: 1 },
]
const unrollThreads = [
  { value: 'no', label: 'No', level: MemberLevel.Free },
  { value: 'yes', label: 'Yes', level: MemberLevel.Basic },
]
const metaDatas = [
  { value: 'no', label: 'None', level: MemberLevel.Free },
  {
    value: 'yes',
    label: 'Include bookmark / favorite / quote / reply / repost',
    level: MemberLevel.Basic,
  },
]
const fastMode = [
  { value: 'no', label: 'Normal', level: MemberLevel.Free },
  { value: 'yes', label: 'Ultra Fast', level: MemberLevel.Pro },
]

export const EXPORT_FORM_FIELDS = [
  {
    name: 'file_format',
    data: fileTypes,
    label: 'File format',
    default: 'csv',
  },
  {
    name: 'unroll',
    data: unrollThreads,
    label: 'Unroll threads',
    default: 'no',
  },
  {
    name: 'metadata',
    data: metaDatas,
    label: 'Count metadata',
    default: 'no',
  },
  // {
  //   name: 'fast_mode',
  //   data: fastMode,
  //   label: 'Export speed',
  //   default: 'no',
  // },
]

export const EXPORT_MEDIA_FIELDS = [
  {
    name: 'action_type',
    data: [
      {
        value: 'csv',
        label: 'CSV with media file links',
        level: MemberLevel.Free,
      },
      {
        value: 'media',
        label: 'Original media files',
        level: MemberLevel.Free,
      },
    ],
    label: 'Download type',
    default: 'media',
  },
  {
    name: 'media_type',
    data: [
      { value: 'image', label: 'Image', level: MemberLevel.Free },
      {
        value: 'gif',
        label: 'Gif',
        level: MemberLevel.Free,
      },
      {
        value: 'video',
        label: 'Video',
        level: MemberLevel.Free,
      },
      {
        value: 'all',
        label: 'All',
        level: MemberLevel.Free,
      },
    ],
    label: 'Media type',
    default: 'all',
  },
  {
    name: 'save_mode',
    data: [
      {
        value: 'default',
        label: 'None (no subfolder)',
        level: MemberLevel.Free,
      },
      {
        value: 'folder',
        label: 'Organize by bookmark folder',
        level: MemberLevel.Basic,
      },
      { value: 'user', label: 'Organize by user', level: MemberLevel.Basic },
      // {
      //   value: 'custom',
      //   label: 'Custom',
      //   level: MemberLevel.Pro,
      //   implemented: false,
      // },
    ],
    label: 'Organize mode',
    default: 'default',
  },
]

export function getExportFields(
  level: MemberLevel,
  fileType?: string,
): Record<string, string> {
  const metaFields = {
    is_thread: 'Thread',
    bookmark_count: 'Bookmark Count',
    favorite_count: 'Favorite Count',
    quote_count: 'Quote Count',
    reply_count: 'Reply Count',
    retweet_count: 'Retweet Count',
  }
  const exportBaseFields = {
    owner_id: 'Owner ID',
    url: 'URL',
    sort_index: 'Sort Index',
    has_image: 'Image',
    has_video: 'Video',
    has_gif: 'GIF',
    has_link: 'Link',
    has_quote: 'Quote',
    is_long_text: 'Long Text',
    quoted_tweet: 'Quoted Post',
    // 不可以属于多个文件夹
    folder: 'Folder',
    tweet_id: 'Post ID',
    user_id: 'User ID',
    username: 'Username',
    screen_name: 'Screen Name',
    avatar_url: 'Avatar',
    full_text: 'Content',
    lang: 'Language',
    created_at: 'Created At',
    possibly_sensitive: 'Sensitive',
    media_items: 'Media Items',
  }

  if (level === MemberLevel.Free) {
    return exportBaseFields
  }

  return {
    ...exportBaseFields,
    ...metaFields,
  }
}

export function getMediaSavePath(item, mode: string) {
  // name.ext
  const originalName = item.media_url.split('/').pop().split('?')[0]
  if (mode === 'default') {
    return `twillot-media-files/${item.folder}-${item.screen_name}-${item.tweet_id}-${originalName}`
  } else if (mode === 'folder') {
    return `twillot-media-files/${item.folder}/${item.screen_name}-${item.tweet_id}-${originalName}`
  } else if (mode === 'user') {
    return `twillot-media-files/${item.screen_name}/${item.tweet_id}-${originalName}`
  }

  throw new Error('Unimplemented media save path mode')
}
