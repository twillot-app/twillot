import { createEffect, createSignal, For, Index } from 'solid-js'

import { getRencentTweets } from '../libs/db'

const DAYS = 52 * 7

function getLastNDaysDates(days: number) {
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

function getColorForFavorites(favorites: number) {
  if (favorites === 0) {
    return '#ebedf0'
  }

  let level

  if (favorites <= 10) {
    level = Math.ceil(favorites / 2) // 1-10收藏，每2个一级，共5级
  } else {
    // 11-100收藏，分为5级
    level = Math.ceil((favorites - 10) / 18) + 5
  }

  level = Math.min(level, 10)
  const startColor = { r: 204, g: 235, b: 197 } // #ccebb5 (更亮的浅绿色)
  const endColor = { r: 67, g: 160, b: 71 } // #43a047 (更亮的深绿色)
  const fraction = (level - 1) / 9 // 分数比例，用于线性插值

  // 线性插值计算颜色
  const r = Math.round(startColor.r + fraction * (endColor.r - startColor.r))
  const g = Math.round(startColor.g + fraction * (endColor.g - startColor.g))
  const b = Math.round(startColor.b + fraction * (endColor.b - startColor.b))

  return `#${r.toString(16).padStart(2, '0')}${g.toString(16).padStart(2, '0')}${b.toString(16).padStart(2, '0')}`
}

export default function Contribution() {
  const [list, setList] = createSignal(new Array(DAYS).fill(0))

  createEffect(async () => {
    const days = getLastNDaysDates(DAYS)
    const items = await getRencentTweets(DAYS)
    const countMap = items.reduce((map, item) => {
      map[item.date] = item.count
      return map
    }, {})
    const history = days.map((date) => {
      return {
        date: date,
        count: countMap[date] || 0,
      }
    })
    setList(history)
  })

  return (
    <div class="graph mx-auto w-full text-xs">
      <ul class="months">
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
      <ul class="days">
        <li>Sun</li>
        <li>Mon</li>
        <li>Tue</li>
        <li>Wed</li>
        <li>Thu</li>
        <li>Fri</li>
        <li>Sat</li>
      </ul>
      <ul class="squares">
        <For each={list()}>
          {(cell) => {
            const color = getColorForFavorites(cell.count || 0)
            return (
              <li
                style={{
                  'background-color': color,
                }}
                class={color === '#ebedf0' ? '' : 'cursor-pointer'}
              ></li>
            )
          }}
        </For>
      </ul>
    </div>
  )
}
