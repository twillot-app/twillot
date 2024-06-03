import { type Trigger, type TriggerContext } from './trigger'

export { type Trigger } from './trigger'

export enum ActionNames {
  UnrollThread = 'Unroll this thread',
  DeleteBookmark = 'Delete from local',
  AutoComment = 'Auto comment',
  DownloadVideo = 'Download video',
}

export type ActionKey = keyof typeof ActionNames

export type Action = {
  // NOTE 默认值 source，暂时不支持自定义
  target?: 'source' | 'destination'
  name: ActionKey
  inputs?: string[]
}

export interface ActionContext extends TriggerContext {
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
