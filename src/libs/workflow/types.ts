import { Endpoint } from '../../types'

/**
 * NOTE: 注意顺序可能影响单元测试
 */
export enum TriggerNames {
  CreateBookmark = 'Create a bookmark',
  DeleteBookmark = 'Delete a bookmark',
  CreateTweet = 'Post',
  CreateReply = 'Reply',
  CreateRetweet = 'Repost',
  CreateQuote = 'Quote',
  // CreateNoteTweet = 'Create a note tweet',
  // CreateScheduledTweet = 'Create a scheduled tweet',
  // ReplyTweet = 'Reply to a tweet',
  // FavoriteTweet = 'Favorite a tweet',
}

export enum TiggerUrls {
  CreateBookmark = Endpoint.CREATE_BOOKMARK,
  DeleteBookmark = Endpoint.DELETE_BOOKMARK,
  CreateTweet = Endpoint.CREATE_TWEET,
  CreateReply = Endpoint.CREATE_TWEET,
  CreateQuote = Endpoint.CREATE_TWEET,
  CreateRetweet = Endpoint.CREATE_RETWEET,
  // CreateNoteTweet = 'Create a note tweet',
  // CreateScheduledTweet = 'Create a scheduled tweet',
  // ReplyTweet = 'Reply to a tweet',
  // FavoriteTweet = 'Favorite a tweet',
}

export type Trigger = keyof typeof TriggerNames

export enum ActionNames {
  UnrollThread = 'Unroll this thread',
  DeleteBookmark = 'Delete from local',
  AutoComment = 'Auto comment',
  DownloadVideo = 'Download video',
}

export type ActionKey = keyof typeof ActionNames

export type Action = {
  name: ActionKey
  inputs?: string[]
}

export interface TriggerReponse {
  tweetId: string
  replyToTweetId?: string
}

export interface TriggerReuqestBody {
  variables: any
  features: any
}

export interface TriggerReponsePayload {
  trigger: Trigger
  action: Action
  request: { method: string; url: string; body: any }
  response: { status: number; statusText: string; body: TriggerReponse }
}

export interface ActionContext extends TriggerReponsePayload {
  prevActionResponse: any
}

export type ActionHandler = (context: ActionContext) => Promise<any>

export interface Workflow {
  id: string
  name?: string
  // 系统默认的工作流无法修改
  editable?: boolean
  // 修改后才能保存
  unchanged?: boolean
  when: Trigger
  thenList: Action[]
}

export interface Task {
  id: string
  name: ActionKey
  inputs?: string[]
  tweetId?: string
}

export interface Message {
  type: MessageType
  payload: any
}

export enum MessageType {
  GetWorkflows = 'get_workflows',
  GetTriggerResponse = 'get_trigger_response',
  SyncTasks = 'sync_tasks',
}

export interface CommentTemplate {
  id: string
  name: string
  content: string
  createdAt: number
}
