import browser from 'webextension-polyfill'
import 'fake-indexeddb/auto'
import { describe, it, expect, beforeEach, vi } from 'vitest'

import {
  addThen,
  addWorkflow,
  getTemplates,
  getUnusedWhen,
  removeThen,
  removeWorkflow,
  renameWorkflow,
  saveWorkflow,
  updateAction,
  updateThen,
  updateWhen,
} from './store'
import dataStore, { defaultState, mutateStore } from '../../options/store'
import { readConfig } from '../db/configs'
import { getWorkflows } from '.'

const [store, setStore] = dataStore

describe('Workflow Store Module', () => {
  beforeEach(() => {
    global.chrome = browser
    browser.reset()
    setStore(defaultState())
  })

  it('getUnusedWhen should return the first unused trigger', () => {
    const unusedWhen = getUnusedWhen()
    expect(unusedWhen).toBe('CreateBookmark')
  })

  it('addWorkflow should add a new workflow to the store', () => {
    addWorkflow()
    expect(store.workflows.length).toBe(1)
    expect(store.workflows[0].name).toBe('')
    expect(store.workflows[0].unchanged).toBe(true)
    expect(store.workflows[0].editable).toBe(true)
    expect(store.workflows[0].when).not.toBeUndefined()
  })

  it('saveWorkflow should save the workflow to the store', async () => {
    addWorkflow()
    renameWorkflow(0, 'Test')
    expect(store.workflows[0].name).toBe('Test')
    addThen(0)
    expect(store.workflows[0].thenList.length).toBe(2)
    await saveWorkflow(0)
    expect(store.workflows[0].name).toBe('Test')
  })
  it('removeWorkflow should remove a workflow from the store', async () => {
    addWorkflow()
    expect(store.workflows.length).toBe(1)
    await saveWorkflow(0)
    await removeWorkflow(0)
    expect(store.workflows.length).toBe(0)
  })

  it('getWorkflows should return workflows from the store', async () => {
    await saveWorkflow(0)
    const workflows = await getWorkflows()
    expect(workflows.length).toBe(0)
  })

  it('getTemplates should return templates from the store', async () => {
    const templates = await getTemplates()
    expect(templates.length).toBe(1)
    expect(templates[0].name).toBe('Default - A twillot welcome post')
  })

  it('updateWhen should update the when property of a workflow', async () => {
    addWorkflow()
    updateWhen(0, 'DeleteBookmark')
    expect(store.workflows[0].when).toBe('DeleteBookmark')
  })

  it('addThen should add a new then action to a workflow', async () => {
    addWorkflow()
    addThen(0)
    expect(store.workflows[0].thenList.length).toBe(2)
  })

  it('removeThen should remove a then action from a workflow', async () => {
    addWorkflow()
    addThen(0)
    expect(store.workflows[0].thenList.length).toBe(2)
    removeThen(0, 1)
    expect(store.workflows[0].thenList.length).toBe(1)
  })

  it('updateThen should update a then action in a workflow', async () => {
    addWorkflow()
    updateThen(0, 0, 'DeleteBookmark')
    expect(store.workflows[0].thenList[0].name).toBe('DeleteBookmark')
  })

  it('updateAction should update the inputs of a then action in a workflow', async () => {
    addWorkflow()
    updateAction(0, 0, 'New Content')
    expect(store.workflows[0].thenList[0].inputs[0]).toBe('New Content')
  })
})
import { describe, it, expect, vi, beforeEach } from 'vitest'
import { readConfig, upsertConfig } from '../../libs/db/configs'
import dataStore, { mutateStore } from '../../options/store'
import { OptionName } from '../../types'
import {
  removeWorkflow,
  getWorkflows,
  getTemplates,
  updateWhen,
  addThen,
  removeThen,
  updateThen,
  updateAction,
} from './store'

vi.mock('../../libs/db/configs', () => ({
  readConfig: vi.fn(),
  upsertConfig: vi.fn(),
}))

vi.mock('../../options/store', () => ({
  default: [{ workflows: [], templates: [] }],
  mutateStore: vi.fn(),
}))

describe('Store Module', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('should remove a workflow correctly', async () => {
    const workflows = [{ id: '1' }, { id: '2' }]
    readConfig.mockResolvedValue({ option_value: workflows })
    await removeWorkflow(0)
    expect(mutateStore).toHaveBeenCalled()
    expect(upsertConfig).toHaveBeenCalled()
  })

  it('should get workflows correctly', async () => {
    const workflows = [{ id: '1' }, { id: '2' }]
    readConfig.mockResolvedValue({ option_value: workflows })
    const result = await getWorkflows()
    expect(result).toEqual(workflows)
    expect(mutateStore).toHaveBeenCalled()
  })

  it('should get templates correctly', async () => {
    const templates = [{ id: '1' }, { id: '2' }]
    readConfig.mockResolvedValue({ option_value: templates })
    const result = await getTemplates()
    expect(result).toEqual(templates)
    expect(mutateStore).toHaveBeenCalled()
  })

  it('should update the "when" of a workflow correctly', async () => {
    const workflows = [{ id: '1', when: 'CreateBookmark' }]
    dataStore[0].workflows = workflows
    await updateWhen(0, 'DeleteBookmark')
    expect(mutateStore).toHaveBeenCalled()
  })

  it('should add a "then" action to a workflow correctly', async () => {
    const workflows = [{ id: '1', thenList: [] }]
    dataStore[0].workflows = workflows
    await addThen(0)
    expect(mutateStore).toHaveBeenCalled()
  })

  it('should remove a "then" action from a workflow correctly', async () => {
    const workflows = [{ id: '1', thenList: [{ name: 'AutoComment' }] }]
    dataStore[0].workflows = workflows
    await removeThen(0, 0)
    expect(mutateStore).toHaveBeenCalled()
  })

  it('should update a "then" action in a workflow correctly', async () => {
    const workflows = [{ id: '1', thenList: [{ name: 'AutoComment' }] }]
    dataStore[0].workflows = workflows
    await updateThen(0, 0, 'DeleteBookmark')
    expect(mutateStore).toHaveBeenCalled()
  })

  it('should update the action content in a workflow correctly', async () => {
    const workflows = [{ id: '1', thenList: [{ name: 'AutoComment', inputs: [''] }] }]
    dataStore[0].workflows = workflows
    await updateAction(0, 0, 'New Content')
    expect(mutateStore).toHaveBeenCalled()
  })
})
