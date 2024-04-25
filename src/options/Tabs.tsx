import { A } from '@solidjs/router'

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
    url: '/graph',
    label: 'Graph',
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
          d="M3 15v4m6-6v6m6-4v4m6-6v6M3 11l6-5 6 5 5.5-5.5"
        />
      </svg>
    ),
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
