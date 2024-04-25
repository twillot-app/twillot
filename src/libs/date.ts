export const DAYS = 52 * 7

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
