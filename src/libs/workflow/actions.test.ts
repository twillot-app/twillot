import { describe, it, expect, vi } from 'vitest'
import { createTweet, getTweetDetails, toRecord } from '../api/twitter'
import { addTask } from './task'
import { ACTION_LIST, CLIENT_ACTION_LIST, createClientAction } from './actions'
import { TimelineTweet } from '../../types'
import { ActionContext } from './trigger'

vi.mock('../api/twitter', () => ({
  createTweet: vi.fn(),
  getTweetDetails: vi.fn(),
  toRecord: vi.fn(),
}))

vi.mock('./task', () => ({
  addTask: vi.fn(),
}))

describe('Actions Module', () => {
  it('should create client actions correctly', async () => {
    const action = createClientAction('TestAction', 'Test description', async (text) => text + ' transformed')
    const body = { variables: { tweet_text: 'Test tweet' } }
    const result = await action.handler(body)
    expect(result).toContain('transformed')
  })

  it('should handle UnrollThread action', async () => {
    const context = { source: '123' } as ActionContext
    await ACTION_LIST.find(a => a.name === 'UnrollThread').handler(context)
    expect(addTask).toHaveBeenCalledWith({
      id: expect.any(String),
      name: 'UnrollThread',
      tweetId: '123',
    })
  })

  it('should handle DeleteBookmark action', async () => {
    const context = { source: '123' } as ActionContext
    await ACTION_LIST.find(a => a.name === 'DeleteBookmark').handler(context)
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
    await ACTION_LIST.find(a => a.name === 'AutoComment').handler(context)
    expect(createTweet).toHaveBeenCalledWith({
      text: 'Test comment',
      replyTweetId: '456',
    })
  })

  it('should handle DownloadVideo action', async () => {
    const context = { source: '123' } as ActionContext
    const tweetDetails = {
      data: {
        threaded_conversation_with_injections_v2: {
          instructions: [
            {
              entries: [
                {
                  content: {
                    itemContent: {
                      media_items: [
                        {
                          type: 'video',
                          video_info: {
                            variants: [
                              { url: 'http://example.com/video.mp4' },
                            ],
                          },
                        },
                      ],
                    },
                  },
                },
              ],
            },
          ],
        },
      },
    }
    getTweetDetails.mockResolvedValue(tweetDetails)
    toRecord.mockReturnValue(tweetDetails.data.threaded_conversation_with_injections_v2.instructions[0].entries[0].content.itemContent)

    global.chrome = {
      downloads: {
        download: vi.fn(),
      },
    }

    await ACTION_LIST.find(a => a.name === 'DownloadVideo').handler(context)
    expect(global.chrome.downloads.download).toHaveBeenCalledWith({
      url: 'http://example.com/video.mp4',
      filename: '123.mp4',
    })
  })
})
