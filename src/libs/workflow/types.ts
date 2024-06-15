import { Action, ActionKey, ClientActionKey } from './actions'
import { type Trigger } from './trigger.type'

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
  name: ActionKey | ClientActionKey
  inputs?: string[]
  tweetId?: string
}

export interface Message {
  type: MessageType
  payload: any
}

export enum MessageType {
  ClientPageProxyRequest = 'client_page_request',
  ClientPageLicense = 'client_page_license',
  ClientPageWorkflows = 'get_client_workflows',
  GetTriggerResponse = 'get_trigger_response',
}

export enum ClientPageStorageKey {
  Workflows = 'twillot_workflows',
  License = 'twillot_license',
}

export interface Template {
  id: string
  name: string
  content: string
  createdAt: number
}
