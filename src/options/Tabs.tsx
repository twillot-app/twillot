import { A } from '@solidjs/router'

const tabs = [
  {
    url: '/',
    label: 'Tweets',
  },
  {
    url: '/export-and-sync',
    label: 'Export & Sync',
  },
]

export default function Tabs() {
  return (
    <ul class="w-[42rem] flex flex-wrap text-sm font-medium text-center texb-black border-b border-gray-200 dark:border-gray-500 dark:text-white mt-4">
      {tabs.map((tab) => (
        <li class="me-2">
          <A
            href={tab.url}
            class="inline-block px-4 py-2 rounded-t-lg"
            inactiveClass="hover:text-gray-600 hover:bg-gray-50 dark:hover:bg-gray-800 dark:hover:text-gray-300"
            activeClass="text-blue-500 bg-gray-100 dark:bg-gray-800 dark:text-blue-500 active"
            end
          >
            {tab.label}
          </A>
        </li>
      ))}
    </ul>
  )
}
