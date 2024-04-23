import { createEffect, createSignal, For } from 'solid-js'
import { useNavigate } from '@solidjs/router'

import { getRencentTweets } from '../libs/db'

const disabledColor = '#ebedf0'
const DAYS = 52 * 7

function formatDate(date: string) {
  const d = new Date(date)
  let month = '' + (d.getMonth() + 1)
  let day = '' + d.getDate()
  const year = d.getFullYear()

  return [year, month.padStart(2, '0'), day.padStart(2, '0')].join('-')
}

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
    return disabledColor
  }

  let level

  if (favorites <= 10) {
    level = Math.ceil(favorites / 5)
  } else {
    level = Math.ceil((favorites - 10) / 45) + 2 // 以11为起点，每45个收藏增加一个级别，加2是因为1-10已经用了2个级别
  }

  level = Math.min(level, 4) // 总共4个级别
  const startColor = { r: 155, g: 233, b: 168 }
  const endColor = { r: 33, g: 110, b: 57 }
  let fraction = (level - 1) / 3

  // 线性插值计算颜色
  const r = Math.round(startColor.r + fraction * (endColor.r - startColor.r))
  const g = Math.round(startColor.g + fraction * (endColor.g - startColor.g))
  const b = Math.round(startColor.b + fraction * (endColor.b - startColor.b))

  return `#${r.toString(16).padStart(2, '0')}${g.toString(16).padStart(2, '0')}${b.toString(16).padStart(2, '0')}`
}

export default function Contribution() {
  const [list, setList] = createSignal(new Array(DAYS).fill(0))
  const [total, setTotal] = createSignal(0)
  const navigate = useNavigate()

  createEffect(async () => {
    const days = getLastNDaysDates(DAYS)
    const { total, data: items } = await getRencentTweets(DAYS)
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
    setTotal(total)
  })

  return (
    <>
      <h3 class="mb-2 text-lg font-medium">
        {total()} bookmarks in the last year
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
          <For each={list()}>
            {(cell) => {
              const color = getColorForFavorites(cell.count || 0)
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
