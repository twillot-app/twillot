import { For } from 'solid-js'

export default function Contribution() {
  const cells = new Array(365).fill(0).map((_, i) => {
    return Math.floor(Math.random() * 3)
  })

  return (
    <div class="graph mx-auto w-full">
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
        <For each={cells}>
          {(cell) => {
            return <li data-level={`${cell}`} class="cursor-pointer"></li>
          }}
        </For>
      </ul>
    </div>
  )
}
