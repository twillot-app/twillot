import { openPage } from '../libs/dom'
import Checked from '../components/Checked'
import { Host } from '../types'

const share_text = encodeURIComponent(
  'Check out this awesome tool for searching and exporting twitter bookmarks! #twillot #buildinpublic https://dub.sh/7ubLVdF',
)

export default function SupportUs() {
  return (
    <section class="mt-4 w-[48rem] bg-white dark:bg-black">
      <div class="py-8">
        <div class="mx-auto mb-8 text-center">
          <p class="mb-2 font-normal text-gray-500 sm:text-xl dark:text-gray-400">
            Together, we can do more. Choose your best option to engage with us.
          </p>
        </div>
        <div class="space-y-8 sm:gap-6 lg:grid lg:grid-cols-2 lg:space-y-0 xl:gap-10">
          <div class="mx-auto flex flex-col rounded-lg  border  bg-white p-6 text-center text-gray-900 shadow  xl:p-8 dark:bg-gray-800 dark:text-white">
            <h3 class="mb-2 text-2xl font-semibold">Social Media Support</h3>
            <p class="font-normal text-gray-500 sm:text-lg dark:text-gray-400">
              Show your love and share your excitement, help twillot grow
              faster.
            </p>
            <div class="my-8 flex items-baseline justify-center"></div>
            <ul role="list" class="mb-8 space-y-4 text-left">
              <li class="flex items-center space-x-3">
                <Checked />
                <span>Help others discover a valuable tool</span>
              </li>
              <li class="flex items-center space-x-3">
                <Checked />
                <span>Support our efforts to continue improving</span>
              </li>
              <li class="flex items-center space-x-3">
                <Checked />
                <span>
                  Your voice is powerful, especially for a{' '}
                  <strong class="font-semibold">lonely</strong> developer
                </span>
              </li>
            </ul>
            <div
              class="mx-auto mb-2 flex cursor-pointer items-center rounded-[28px] bg-blue-500 px-6 py-2.5 font-medium leading-normal text-white shadow-md transition duration-150 ease-in-out"
              data-text={`${Host}/intent/tweet?text=${share_text}`}
              onClick={openPage}
            >
              <span class="pointer-events-none [&>svg]:h-5 [&>svg]:w-5 [&>svg]:fill-black">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="currentColor"
                  viewBox="0 0 512 512"
                >
                  <path d="M389.2 48h70.6L305.6 224.2 487 464H345L233.7 318.6 106.5 464H35.8L200.7 275.5 26.8 48H172.4L272.9 180.9 389.2 48zM364.4 421.8h39.1L151.1 88h-42L364.4 421.8z" />
                </svg>
              </span>
              <span class="pointer-events-none ml-2 text-lg">
                Help Twillot Grow
              </span>
            </div>
          </div>

          <div class="mx-auto flex flex-col rounded-lg  border border-gray-100 bg-white p-6 text-center text-gray-900 shadow xl:p-8 dark:border-gray-600 dark:bg-gray-800 dark:text-white">
            <h3 class="mb-2 text-2xl font-semibold">Financial Support</h3>
            <p class="font-normal text-gray-500 sm:text-lg dark:text-gray-400">
              A small donation makes a big difference, the behind magician is
              YOU.
            </p>
            <div class="my-8 flex items-baseline justify-center"></div>
            <ul role="list" class="mb-8 space-y-4 text-left">
              <li class="flex items-center space-x-3">
                <Checked />
                <span>Feel free to request features and report bugs</span>
              </li>
              <li class="flex items-center space-x-3">
                <Checked />
                <span>Your gift directly fuels improvements</span>
              </li>
              <li class="flex items-center space-x-3">
                <Checked />
                <span>
                  Early access to new features and updates, join the waitlist
                </span>
              </li>
            </ul>

            <div
              class="flex cursor-pointer justify-center"
              onClick={openPage}
              data-text="https://ko-fi.com/N4N5TP4BZ"
            >
              <img
                class="pointer-events-none h-12"
                src="https://storage.ko-fi.com/cdn/kofi1.png?v=3"
                alt="Buy Me a Coffee at ko-fi.com"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
