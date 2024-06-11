import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'

import fetchWithTimeout, { FetchError } from './xfetch'

const fetch = vi.fn()

global.fetch = fetch

describe('fetchWithTimeout', () => {
  beforeEach(() => {
    vi.useFakeTimers()
  })

  afterEach(() => {
    vi.useRealTimers()
  })

  it('should fetch data successfully', async () => {
    const mockResponse = new Response(JSON.stringify({ data: 'test' }))
    fetch.mockResolvedValueOnce(mockResponse)

    const response = await fetchWithTimeout('https://api.example.com/data', {})
    const data = await response.json()

    expect(data).toEqual({ data: 'test' })
  })

  it('should throw a timeout error if the request takes too long', async () => {
    fetch.mockImplementationOnce(
      () =>
        new Promise((resolve) =>
          setTimeout(() => resolve(new Response()), 20000),
        ),
    )

    try {
      await fetchWithTimeout('https://api.example.com/data', {}, 1000)
    } catch (error) {
      expect(error.name).toBe(FetchError.TimeoutError)
    }
  }, 10000)
  it('should throw a timeout error if the request takes too long', async () => {
    fetch.mockImplementationOnce(
      () =>
        new Promise((resolve) =>
          setTimeout(() => resolve(new Response()), 20000),
        ),
    )

    try {
      await fetchWithTimeout('https://api.example.com/data', {}, 1000)
    } catch (error) {
      expect(error.name).toBe(FetchError.TimeoutError)
    }
  }, 10000)

  it('should throw a network error if the fetch fails', async () => {
    fetch.mockRejectedValueOnce(new Error('Network error'))

    await expect(
      fetchWithTimeout('https://api.example.com/data', {}),
    ).rejects.toThrow('Network error')
  })
})
