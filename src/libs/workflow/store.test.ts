import browser from 'webextension-polyfill'
import 'fake-indexeddb/auto'
import { describe, it, expect, beforeEach } from 'vitest'

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
import dataStore, { defaultState } from '../../options/store'
import { getWorkflows } from '.'
import { setCurrentUserId } from '../storage'
import { defaultTemplates } from './defaults'

const [store, setStore] = dataStore

describe('Workflow Store Module', () => {
  beforeEach(async () => {
    global.chrome = browser
    browser.reset()
    await setCurrentUserId('123')
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
    const templates = await getTemplates('COMMENT_TEMPLATE')
    expect(templates.length).toBe(1)
    expect(templates[0].name).toBe(defaultTemplates[0].name)
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
