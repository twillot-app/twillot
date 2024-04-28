export const DAYS = 52 * 7

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

    const formattedDate = date.toLocaleDateString()
    dates.unshift(formattedDate)
  }

  return dates
}

export function formatDate(date: string) {
  const d = new Date(date)
  let month = '' + (d.getMonth() + 1)
  let day = '' + d.getDate()
  const year = d.getFullYear()

  return [year, month.padStart(2, '0'), day.padStart(2, '0')].join('-')
}

export function getGridDates(): {
  dates: string[]
  colIndexes: number[]
  weekWidth: number[]
} {
  const dates: string[] = []
  const colIndexes: number[] = []
  let currentDate = new Date()

  // 获取当前日期所在周的最后一天（星期六）
  currentDate = new Date(
    currentDate.setDate(currentDate.getDate() - currentDate.getDay() + 7),
  )

  for (let i = 0; i < DAYS; i++) {
    const date = new Date(currentDate.setDate(currentDate.getDate() - 1))
    dates.unshift(new Date(date).toLocaleDateString())

    if (date.getDate() === 1) {
      const monthIndex = DAYS - 1 - i
      colIndexes.unshift(Math.floor(monthIndex / 7))
    }
  }

  colIndexes.unshift(0)
  const weekWidth = colIndexes.map((col, index) => {
    return colIndexes[index + 1] - col
  })
  weekWidth.pop()
  return { dates, colIndexes, weekWidth }
}

export function getMonthNames(date: Date) {
  const month = date.getMonth()
  return [...MONTH_NAMES.slice(month), ...MONTH_NAMES.slice(0, month)]
}
