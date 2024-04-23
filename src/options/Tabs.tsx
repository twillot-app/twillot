import { A } from '@solidjs/router'

const tabs = [
  {
    url: '/',
    label: 'Home',
  },
  {
    url: '/graph',
    label: 'Graph',
  },
  {
    url: '/export-and-sync',
    label: 'Export & Sync',
  },
  {
    url: '/support-us',
    label: 'Support',
  },
]

export default function Tabs() {
  return (
    <ul class="fixed left-[calc(50vw-36rem)] top-[102px] mt-4 flex w-40 flex-col flex-wrap text-center text-lg font-medium text-black dark:text-white">
      {tabs.map((tab) => (
        <li class="me-2 flex w-full">
          <A
            href={tab.url}
            class="block w-full px-4 py-2"
            inactiveClass="hover:text-gray-600 hover:bg-gray-50 dark:hover:bg-gray-800 dark:hover:text-gray-300"
            activeClass="text-blue-500 active"
            end
          >
            {tab.label}
          </A>
        </li>
      ))}
    </ul>
  )
}
