import { For } from 'solid-js'
import { useNavigate } from '@solidjs/router'

import dataStore from '../options/store'
import {
  WEEK_NAMES,
  formatDate,
  getGridDates,
  getMonthNames,
} from '../libs/date'
import { disabledColor, getColorForFavorites } from '../libs/color'

export default function Contribution() {
  const [store] = dataStore
  const navigate = useNavigate()
  const { dates, weekWidth } = getGridDates()
  const monthNames = getMonthNames(new Date(dates[0]))
  const gridTemplateColumns = weekWidth
    .map((w) => `calc(var(--week-width) * ${w})`)
    .join(' ')
  return (
    <>
      <h3 class="mb-4 text-lg font-medium">
        {store.historySize} bookmarks in the last year
      </h3>
      <div class="graph mx-auto w-full text-xs">
        <ul
          class="months leading-3"
          style={{ 'grid-template-columns': gridTemplateColumns }}
        >
          {monthNames.map((monthName) => (
            <li>{monthName}</li>
          ))}
        </ul>
        <ul class="days leading-3">
          {WEEK_NAMES.map((dayName) => (
            <li>{dayName}</li>
          ))}
        </ul>
        <ul class="squares">
          <For each={store.history}>
            {(cell) => {
              const color = getColorForFavorites(cell.count)
              const disabled = color === disabledColor
              return (
                <li
                  title={cell.date}
                  style={{
                    'background-color': color,
                  }}
                  class={disabled ? '' : 'cursor-pointer'}
                  onClick={
                    disabled
                      ? null
                      : () => {
                          const localDate = formatDate(cell.date)
                          navigate(`/?q=since:${localDate} until:${localDate}`)
                        }
                  }
                ></li>
              )
            }}
          </For>
        </ul>
      </div>
    </>
  )
}
