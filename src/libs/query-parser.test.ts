import { describe, it, expect } from 'vitest'
import { parseTwitterQuery } from './query-parser'

describe('parseTwitterQuery', () => {
  it('should parse fromUser correctly', () => {
    const query = 'from:username'
    const result = parseTwitterQuery(query)
    expect(result.fromUser).toBe('username')
  })

  it('should parse since and until dates correctly', () => {
    const query = 'since:2021-01-01 until:2021-12-31'
    const result = parseTwitterQuery(query)
    expect(result.since).toBe('2021-01-01')
    expect(result.until).toBe('2021-12-31')
  })

  it('should parse keyword correctly', () => {
    const query = 'from:username keyword'
    const result = parseTwitterQuery(query)
    expect(result.keyword).toBe('keyword')
  })

  it('should handle complex queries', () => {
    const query = 'from:username since:2021-01-01 until:2021-12-31 keyword'
    const result = parseTwitterQuery(query)
    expect(result.fromUser).toBe('username')
    expect(result.since).toBe('2021-01-01')
    expect(result.until).toBe('2021-12-31')
    expect(result.keyword).toBe('keyword')
  })
})
