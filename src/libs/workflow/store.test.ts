import browser from 'webextension-polyfill'
import 'fake-indexeddb/auto'
import { describe, it, expect, beforeEach, vi } from 'vitest'

import {
  addThen,
  addWorkflow,
  getUnusedWhen,
  renameWorkflow,
  saveWorkflow,
} from './store'
import dataStore, { defaultState, mutateStore } from '../../options/store'
import { readConfig } from '../db/configs'
import { Action } from './types'

const [store, setStore] = dataStore

describe('Workflow Store Module', () => {
  beforeEach(() => {
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
    expect(store.workflows[0].thenList.length).toBe(1)
    await saveWorkflow(0)
    expect(store.workflows[0].name).toBe('Test')
  })
})
