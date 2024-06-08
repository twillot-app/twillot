export const TRIGGER_LIST = [
  {
    name: 'CreateBookmark',
    desc: 'Create a bookmark',
  },
  {
    name: 'DeleteBookmark',
    desc: 'Delete a bookmark',
  },
  {
    name: 'CreateTweet',
    desc: 'Post',
  },
  {
    name: 'CreateReply',
    desc: 'Reply',
  },
  {
    name: 'CreateRetweet',
    desc: 'Repost',
  },
  {
    name: 'CreateQuote',
    desc: 'Quote',
  },
] as const

export type Trigger = (typeof TRIGGER_LIST)[number]['name']

export const TriggerKeys = TRIGGER_LIST.map((t) => t.name)

export interface TriggerReuqestBody {
  variables: any
  features: any
  queryId?: string
}

export interface TriggerResponseBody {
  data: any
}

export interface TriggerContext {
  trigger: Trigger
  request: { method: string; url: string; body: string | TriggerReuqestBody }
  response: {
    status: number
    statusText: string
    body?: string | TriggerResponseBody
  }
  // 源推 id
  source: string
  // 目标推 id
  destination: string
}
