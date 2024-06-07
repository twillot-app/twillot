import browser from 'webextension-polyfill'
import 'fake-indexeddb/auto'
import { describe, it, expect, beforeEach, vi } from 'vitest'
import { Monitor, Emitter } from './trigger'
import { MessageType, Workflow } from './types'
import { ACTION_LIST } from './actions'

describe('Trigger Module', () => {
  beforeEach(() => {
    global.chrome = browser
    browser.reset()
  })

  it('Monitor.getRealTrigger should return the correct trigger', () => {
    const body = { variables: { attachment_url: 'http://example.com' } }
    const trigger = Monitor.getRealTrigger('CreateTweet', body)
    expect(trigger).toBe('CreateQuote')
  })

  it('Monitor.getContext should return the correct context', () => {
    const request = { variables: { tweet_id: '123' } }
    const response = { data: { create_tweet: { tweet_results: { result: { rest_id: '456' } } } } }
    const context = Monitor.getContext('CreateTweet', request, response)
    expect(context).toEqual({ destination: '456' })
  })

  it('Monitor.postContentScriptMessage should post a message to the content script', () => {
    const trigger = 'CreateTweet'
    const request = { method: 'POST', url: 'http://example.com', body: '{}' }
    const response = { status: 200, statusText: 'OK', body: '{}' }
    window.postMessage = vi.fn()
    Monitor.postContentScriptMessage(trigger, request, response)
    expect(window.postMessage).toHaveBeenCalled()
  })

  it('Emitter should register and emit actions correctly', async () => {
    const emitter = new Emitter()
    emitter.register('TestAction', async () => 'test response')
    const payload = { trigger: 'CreateTweet', source: '123', destination: '456', request: {}, response: {} }
    const response = await emitter.emit(payload)
    expect(response).toBeUndefined()
  })

  it('Emitter should start and listen to messages correctly', async () => {
    const emitter = new Emitter()
    await emitter.start()
    expect(emitter.workflows.length).toBe(0)
  })
})
