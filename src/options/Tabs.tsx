import { A } from '@solidjs/router'
import { IconFolder } from '../components/Icons'

const tabs = [
  {
    url: '/',
    label: 'Home',
    icon: (
      <svg
        class="h-6 w-6"
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        fill="none"
        viewBox="0 0 24 24"
      >
        <path
          stroke="currentColor"
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="2"
          d="m4 12 8-8 8 8M6 10.5V19a1 1 0 0 0 1 1h3v-3a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v3h3a1 1 0 0 0 1-1v-8.5"
        />
      </svg>
    ),
  },
  {
    url: '/folder',
    label: 'Folder',
    icon: <IconFolder strokeWidth="2" />,
  },
  {
    url: '/export-and-sync',
    label: 'Export',
    icon: (
      <svg
        class="h-6 w-6 "
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        fill="none"
        viewBox="0 0 24 24"
      >
        <path
          stroke="currentColor"
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="2"
          d="M19 10V4a1 1 0 0 0-1-1H9.914a1 1 0 0 0-.707.293L5.293 7.207A1 1 0 0 0 5 7.914V20a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-2M10 3v4a1 1 0 0 1-1 1H5m5 6h9m0 0-2-2m2 2-2 2"
        />
      </svg>
    ),
  },
  {
    url: '/settings',
    label: 'Settings',
    icon: (
      <svg
        class="h-6 w-6"
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        fill="none"
        viewBox="0 0 24 24"
      >
        <path
          stroke="currentColor"
          stroke-linecap="square"
          stroke-linejoin="round"
          stroke-width="2"
          d="M10 19H5a1 1 0 0 1-1-1v-1a3 3 0 0 1 3-3h2m10 1a3 3 0 0 1-3 3m3-3a3 3 0 0 0-3-3m3 3h1m-4 3a3 3 0 0 1-3-3m3 3v1m-3-4a3 3 0 0 1 3-3m-3 3h-1m4-3v-1m-2.121 1.879-.707-.707m5.656 5.656-.707-.707m-4.242 0-.707.707m5.656-5.656-.707.707M12 8a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
        />
      </svg>
    ),
  },
  {
    url: '/support-us',
    label: 'Support',
    icon: (
      <svg
        class="h-6 w-6"
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        fill="none"
        viewBox="0 0 24 24"
      >
        <path
          stroke="currentColor"
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="2"
          d="M12.01 6.001C6.5 1 1 8 5.782 13.001L12.011 20l6.23-7C23 8 17.5 1 12.01 6.002Z"
        />
      </svg>
    ),
  },
]

export default function Tabs() {
  return (
    <ul class="fixed left-[calc(50vw-36rem)] top-[102px] mt-4 flex flex-col flex-wrap text-center text-lg font-medium text-black dark:text-white">
      {tabs.map((tab) => (
        <li class="flex w-full">
          <A
            href={tab.url}
            class="flex w-full items-center gap-4 pb-5"
            inactiveClass="hover:text-gray-600 dark:hover:text-gray-300"
            activeClass="text-blue-500 active"
            end
          >
            {tab.icon} {tab.label}
          </A>
        </li>
      ))}
    </ul>
  )
}
