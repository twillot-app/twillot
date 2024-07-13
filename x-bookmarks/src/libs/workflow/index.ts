import { getLocal } from '../storage'
import { ClientActions } from './actions'
import { ClientPageStorageKey, Workflow } from './types'

export async function getWorkflows(): Promise<Workflow[]> {
  const item = await getLocal(ClientPageStorageKey.Workflows)
  let workflows: Workflow[] = item[ClientPageStorageKey.Workflows] || []
  return workflows
}

export async function getClientWorkflows(): Promise<Workflow[]> {
  const workflows = await getWorkflows()
  return workflows.filter((w) =>
    w.thenList.some((t) => ClientActions.includes(t.name)),
  )
}
