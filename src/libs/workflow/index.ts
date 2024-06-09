import { getLocal } from '../storage'
import { ClientActions } from './actions'
import { Workflow } from './types'

export async function getWorkflows(): Promise<Workflow[]> {
  const item = await getLocal('workflows')
  let workflows: Workflow[] = item.workflows || []
  return workflows
}

export async function getClientWorkflows(): Promise<Workflow[]> {
  const workflows = await getWorkflows()
  return workflows.filter((w) =>
    w.thenList.some((t) => ClientActions.includes(t.name)),
  )
}
