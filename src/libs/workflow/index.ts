/**
 * bg 任务
 * 通常 bg 只是记录任务，并不执行具体的操作
 * 实际执行在 options 页面
 */

import { ClientActions } from './actions'
import { Workflow } from './types'

export async function getWorkflows(): Promise<Workflow[]> {
  const item = await chrome.storage.local.get('workflows')
  let workflows: Workflow[] = item.workflows || []
  return workflows
}

export async function getClientWorkflows(): Promise<Workflow[]> {
  const workflows = await getWorkflows()
  return workflows.filter((w) =>
    w.thenList.some((t) => ClientActions.includes(t.name)),
  )
}
