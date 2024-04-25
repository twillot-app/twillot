import { For } from 'solid-js'
import { useNavigate } from '@solidjs/router'

import dataStore from '../options/store'
import { formatDate } from '../libs/date'
import { disabledColor, getColorForFavorites } from '../libs/color'

export default function Contribution() {
  const [store] = dataStore
  const navigate = useNavigate()

  return (
    <>
      <h3 class="mb-2 text-lg font-medium">
        {store.historySize} bookmarks in the last year
      </h3>
      <div class="graph mx-auto w-full text-xs">
        <ul class="months leading-3">
          <li>Jan</li>
          <li>Feb</li>
          <li>Mar</li>
          <li>Apr</li>
          <li>May</li>
          <li>Jun</li>
          <li>Jul</li>
          <li>Aug</li>
          <li>Sep</li>
          <li>Oct</li>
          <li>Nov</li>
          <li>Dec</li>
        </ul>
        <ul class="days leading-3">
          <li>Sun</li>
          <li>Mon</li>
          <li>Tue</li>
          <li>Wed</li>
          <li>Thu</li>
          <li>Fri</li>
          <li>Sat</li>
        </ul>
        <ul class="squares">
          <For each={store.history}>
            {(cell) => {
              const color = getColorForFavorites(cell.count)
              const disabled = color === disabledColor
              return (
                <li
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
