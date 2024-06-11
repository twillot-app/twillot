import { describe, it, expect, beforeEach, vi } from 'vitest'

import fetchWithTimeout, { FetchError } from './xfetch'

describe('fetchWithTimeout', () => {
  beforeEach(() => {
    global.fetch = vi.fn()
  })

  it('should fetch data successfully', async () => {
    const mockResponse = new Response(JSON.stringify({ data: 'test' }))
    (global.fetch as jest.Mock).mockResolvedValueOnce(mockResponse)

    const response = await fetchWithTimeout('https://api.example.com/data', {})
    const data = await response.json()

    expect(data).toEqual({ data: 'test' })
  })

  it('should throw a timeout error if the request takes too long', async () => {
    (global.fetch as jest.Mock).mockImplementationOnce(
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
  })

  it('should throw a network error if the fetch fails', async () => {
    global.fetch.mockRejectedValueOnce(new Error('Network error'))

    await expect(
      fetchWithTimeout('https://api.example.com/data', {}),
    ).rejects.toThrow('Network error')
  })
})
