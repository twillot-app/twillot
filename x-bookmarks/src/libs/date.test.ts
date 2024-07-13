import { describe, it, expect } from 'vitest'

import {
  getLastNDaysDates,
  getSpecificWeekday,
  getLastSaturday,
  formatDate,
  getGridDates,
  getMonthNames,
} from './date'

describe('Date Utilities', () => {
  it('should get last N days dates', () => {
    const dates = getLastNDaysDates(7)
    expect(dates.length).toBe(7)
  })

  it('should get specific weekday', () => {
    const date = new Date('2021-01-01') // Friday
    const targetDay = 0 // Sunday
    const result = getSpecificWeekday(date, targetDay)
    expect(result.getDay()).toBe(targetDay)
  })

  it('should get last Saturday', () => {
    const date = new Date('2021-01-01') // Friday
    const result = getLastSaturday(date)
    expect(result.getDay()).toBe(6) // Saturday
  })

  it('should format date correctly', () => {
    const date = '2021-01-01'
    const formatted = formatDate(date)
    expect(formatted).toBe('2021-01-01')
  })

  it('should get grid dates', () => {
    const { weekWidth, monthNames } = getGridDates(
      new Date(2024, 5, 28, 12, 0, 0, 0),
    )
    expect(weekWidth[0]).toBe(1)
    expect(weekWidth.pop()).toBe(5)
    expect(monthNames[0]).toBe('')
    expect(monthNames[1]).toBe('Jul')
  })

  it('should get month names', () => {
    const date = new Date('2021-01-01')
    const monthNames = getMonthNames(date)
    expect(monthNames.length).toBe(12)
  })
})
