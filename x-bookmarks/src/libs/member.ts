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
  { value: 'yes', label: 'Yes', level: MemberLevel.Pro },
]
const metaDatas = [
  {
    value: 'yes',
    label: 'Likes, Views, Replies, Quotes, Bookmarks, and More',
    level: MemberLevel.Pro,
  },
  { value: 'no', label: 'None', level: MemberLevel.Free },
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
    label: 'Metadata',
    default: 'no',
  },
  {
    name: 'fast_mode',
    data: fastMode,
    label: 'Export speed',
    default: 'no',
  },
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
        level: MemberLevel.Basic,
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
      { value: 'default', label: 'Default', level: MemberLevel.Free },
      {
        value: 'folder',
        label: 'By bookmark folder',
        level: MemberLevel.Basic,
      },
      { value: 'user', label: 'By original user', level: MemberLevel.Basic },
      // {
      //   value: 'custom',
      //   label: 'Custom',
      //   level: MemberLevel.Pro,
      //   implemented: false,
      // },
    ],
    label: 'Save mode',
    default: 'default',
  },
]

export function getExportFields(
  level: MemberLevel,
  fileType?: string,
): Record<string, string> {
  const exportBaseFields = {
    owner_id: 'Owner ID',
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
    conversations: 'Threads',
    tweet_id: 'Post ID',
    user_id: 'User ID',
    username: 'Username',
    screen_name: 'Screen Name',
    avatar_url: 'Avatar',
    full_text: 'Post Text',
    lang: 'Language',
    created_at: 'Created At',
    possibly_sensitive: 'Sensitive',
    media_items: 'Media Items',
  }
  if (level !== MemberLevel.Pro) {
    delete exportBaseFields.conversations
  }

  return exportBaseFields
}
