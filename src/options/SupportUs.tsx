import { openPage } from '../libs/dom'
import Checked from '../components/Checked'

const share_text = encodeURIComponent(
  'Check out this awesome tool for searching and exporting twitter bookmarks! #twillot #buildinpublic https://dub.sh/7ubLVdF',
)

export default function SupportUs() {
  return (
    <section class="bg-white dark:bg-black mt-4">
      <div class="py-8 mx-auto max-w-4xl">
        <div class="mx-auto text-center mb-8">
          <p class="mb-2 font-normal text-gray-500 sm:text-xl dark:text-gray-400">
            Together, we can do more. Choose your best option to engage with us.
          </p>
        </div>
        <div class="space-y-8 lg:grid lg:grid-cols-2 sm:gap-6 xl:gap-10 lg:space-y-0">
          <div class="flex flex-col p-6 mx-auto  text-center text-gray-900 bg-white rounded-lg border border-blue-500 shadow  xl:p-8 dark:bg-gray-800 dark:text-white">
            <h3 class="mb-2 text-2xl font-semibold">Social Media Support</h3>
            <p class="font-normal text-gray-500 sm:text-lg dark:text-gray-400">
              Show your love and share your excitement, help twillot grow
              faster.
            </p>
            <div class="flex justify-center items-baseline my-8"></div>
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
              class="mx-auto cursor-pointer items-center mb-2 flex rounded-[28px] bg-blue-500 px-6 py-2.5 font-medium leading-normal text-white shadow-md transition duration-150 ease-in-out"
              data-text={`https://twitter.com/intent/tweet?text=${share_text}`}
              onClick={openPage}
            >
              <span class="[&>svg]:h-5 [&>svg]:w-5 [&>svg]:fill-black pointer-events-none">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="currentColor"
                  viewBox="0 0 512 512"
                >
                  <path d="M389.2 48h70.6L305.6 224.2 487 464H345L233.7 318.6 106.5 464H35.8L200.7 275.5 26.8 48H172.4L272.9 180.9 389.2 48zM364.4 421.8h39.1L151.1 88h-42L364.4 421.8z" />
                </svg>
              </span>
              <span class="text-lg ml-2 pointer-events-none">
                Help Twillot Grow
              </span>
            </div>
          </div>

          <div class="flex flex-col p-6 mx-auto  text-center text-gray-900 bg-white rounded-lg border border-gray-100 shadow dark:border-gray-600 xl:p-8 dark:bg-gray-800 dark:text-white">
            <h3 class="mb-2 text-2xl font-semibold">Financial Support</h3>
            <p class="font-normal text-gray-500 sm:text-lg dark:text-gray-400">
              A small donation makes a big difference, the behind magician is
              YOU.
            </p>
            <div class="flex justify-center items-baseline my-8"></div>
            <ul role="list" class="mb-8 space-y-4 text-left">
              <li class="flex items-center space-x-3">
                <Checked />
                <span>Feel free to request features</span>
              </li>
              <li class="flex items-center space-x-3">
                <Checked />
                <span>Your gift directly fuels improvements</span>
              </li>
              <li class="flex items-center space-x-3">
                <Checked />
                <span>Early access to new features and updates</span>
              </li>
            </ul>

            <div
              class="flex justify-center cursor-pointer"
              onClick={openPage}
              data-text="https://ko-fi.com/N4N5TP4BZ"
            >
              <img
                class="h-12 pointer-events-none"
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
