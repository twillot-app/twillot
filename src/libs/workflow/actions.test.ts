import { describe, it, expect, vi, beforeEach } from 'vitest'
import browser from 'webextension-polyfill'

import { createTweet, getTweetDetails, toRecord } from '../api/twitter'
import { addTask } from './task'
import { ACTION_LIST, ActionContext, createClientAction } from './actions'

vi.mock('../api/twitter', () => ({
  createTweet: vi.fn(),
  getTweetDetails: vi.fn(),
  toRecord: vi.fn(),
}))

vi.mock('./task', () => ({
  addTask: vi.fn(),
}))

describe('Actions Module', () => {
  beforeEach(() => {
    global.chrome = browser
  })

  it('should create client actions correctly', async () => {
    const action = createClientAction(
      'TestAction',
      'Test description',
      async (text) => text + ' transformed',
    )
    const body = { variables: { tweet_text: 'Test tweet' }, features: {} }
    const result = await action.handler('CreateTweet', body, null)
    expect(result).toContain('transformed')
  })

  it('should handle UnrollThread action', async () => {
    const context = { source: '123' } as ActionContext
    await ACTION_LIST.find((a) => a.name === 'UnrollThread').handler(context)
    expect(addTask).toHaveBeenCalledWith({
      id: expect.any(String),
      name: 'UnrollThread',
      tweetId: '123',
    })
  })

  it('should handle DeleteBookmark action', async () => {
    const context = { source: '123' } as ActionContext
    await ACTION_LIST.find((a) => a.name === 'DeleteBookmark').handler(context)
    expect(addTask).toHaveBeenCalledWith({
      id: expect.any(String),
      name: 'DeleteBookmark',
      tweetId: '123',
    })
  })

  it('should handle AutoComment action', async () => {
    const context = {
      source: '123',
      trigger: 'CreateTweet',
      destination: '456',
      action: { inputs: ['Test comment'] },
    } as ActionContext
    await ACTION_LIST.find((a) => a.name === 'AutoComment').handler(context)
    expect(createTweet).toHaveBeenCalledWith({
      text: 'Test comment',
      replyTweetId: '456',
    })
  })
})
