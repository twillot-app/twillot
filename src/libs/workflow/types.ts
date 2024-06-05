import { Action, ActionKey } from './actions'
import { type Trigger } from './trigger'

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
  ClientPageEvent = 'client_page_event',
  GetWorkflows = 'get_workflows',
  GetClientWorkflows = 'get_client_workflows',
  GetTriggerResponse = 'get_trigger_response',
  SyncTasks = 'sync_tasks',
}

export interface CommentTemplate {
  id: string
  name: string
  content: string
  createdAt: number
}

export const WF_KEY_FOR_CLIET_PAGE = 'twillot_workflows'
