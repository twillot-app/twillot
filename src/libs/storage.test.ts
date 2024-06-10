import browser from 'webextension-polyfill'
import 'fake-indexeddb/auto'
import { describe, it, expect, beforeEach, vi } from 'vitest'
import { getUserId, getStorageKey, setLocal, getLocal, clearCurrentLocal, onLocalChanged } from './storage'

vi.mock('webextension-polyfill', () => ({
  storage: {
    local: {
      get: vi.fn(),
      set: vi.fn(),
      remove: vi.fn(),
      clear: vi.fn(),
      onChanged: {
        addListener: vi.fn(),
      },
    },
  },
}))

describe('Storage Module', () => {
  beforeEach(() => {
    global.chrome = browser
    browser.reset()
  })

  it('getUserId should return the current user id', async () => {
    browser.storage.local.get.mockResolvedValue({ current_user_id: '123' })
    const userId = await getUserId()
    expect(userId).toBe('123')
  })

  it('getStorageKey should return the correct storage key', () => {
    const key = getStorageKey('testKey', '123')
    expect(key).toBe('user:123:testKey')
  })

  it('setLocal should set items in local storage', async () => {
    browser.storage.local.get.mockResolvedValue({ current_user_id: '123' })
    await setLocal({ testKey: 'testValue' })
    expect(browser.storage.local.set).toHaveBeenCalledWith({ 'user:123:testKey': 'testValue' })
  })

  it('getLocal should get items from local storage', async () => {
    browser.storage.local.get.mockResolvedValue({ 'user:123:testKey': 'testValue' })
    const result = await getLocal('testKey')
    expect(result).toEqual({ testKey: 'testValue' })
  })

  it('clearCurrentLocal should clear current user local storage', async () => {
    browser.storage.local.get.mockResolvedValue({ 'user:123:testKey': 'testValue' })
    await clearCurrentLocal()
    expect(browser.storage.local.remove).toHaveBeenCalledWith(['user:123:testKey'])
  })

  it('onLocalChanged should call callback when local storage changes', async () => {
    const callback = vi.fn()
    onLocalChanged('testKey', callback)
    const changes = { 'user:123:testKey': { newValue: 'newValue' } }
    const listener = browser.storage.local.onChanged.addListener.mock.calls[0][0]
    await listener(changes)
    expect(callback).toHaveBeenCalledWith('newValue')
  })
})
