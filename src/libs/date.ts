export const WEEKS = 54

export const DAYS = WEEKS * 7

export const MONTH_NAMES =
  'Jan,Feb,Mar,Apr,May,Jun,Jul,Aug,Sep,Oct,Nov,Dec'.split(',')

export const WEEK_NAMES = 'Sun,Mon,Tue,Wed,Thu,Fri,Sat'.split(',')

export function getLastNDaysDates(days: number) {
  const today = new Date()
  const dates = []

  today.setDate(today.getDate() + (6 - today.getDay()))

  for (let i = 0; i < days; i++) {
    const date = new Date(today)
    date.setDate(today.getDate() - i)

    const formattedDate = formatDate(date)
    dates.unshift(formattedDate)
  }

  return dates
}

export function getSpecificWeekday(date: Date, targetDay: number): Date {
  // targetDay: 目标星期几，0 是星期日，6 是星期六
  const currentDay: number = date.getDay()
  const difference: number = targetDay - currentDay
  const resultDate: Date = new Date(date.getTime())
  resultDate.setDate(resultDate.getDate() + difference)
  return resultDate
}

export function getLastSaturday(date: Date): Date {
  return getSpecificWeekday(date, 6)
}

export function formatDate(d: string | Date) {
  const date = typeof d === 'string' ? new Date(d) : d
  const year = date.getFullYear()
  const month = String(date.getUTCMonth() + 1).padStart(2, '0')
  const day = String(date.getUTCDate()).padStart(2, '0')

  return `${year}-${month}-${day}`
}

export function getGridDates(currentDate = new Date()): {
  weekWidth: number[]
  monthNames: string[]
} {
  const dates: string[] = []
  const colIndexes: number[] = []

  // 获取当前日期所在周的最后一天（星期六）
  currentDate = getLastSaturday(currentDate)
  let firstStartDate: Date

  for (let i = 0; i < DAYS; i++) {
    dates.unshift(formatDate(currentDate))

    if (currentDate.getDate() === 1) {
      const index = DAYS - i
      const colIndex = Math.floor(index / 7)
      colIndexes.unshift(colIndex - 1)
      firstStartDate = new Date(currentDate)
    }
    currentDate.setDate(currentDate.getDate() - 1)
  }

  const weekWidth = colIndexes
    .map((col, index) => {
      return (colIndexes[index + 1] || WEEKS) - col
    })
    .slice(colIndexes.length - MONTH_NAMES.length)

  const monthNames = getMonthNames(firstStartDate)

  if (colIndexes[0] !== 0) {
    monthNames.unshift('')
    weekWidth.unshift(colIndexes[0])
  }
  return { weekWidth, monthNames }
}

export function getMonthNames(date: Date) {
  const month = date.getMonth()
  return [...MONTH_NAMES.slice(month), ...MONTH_NAMES.slice(0, month)]
}
