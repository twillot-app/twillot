import { openPage } from '../libs/dom'
import Checked from './Checked'

export default function SupportUs() {
  return (
    <section class="bg-white dark:bg-black" onClick={openPage}>
      <div class="py-4 mx-auto lg:py-16 max-w-4xl">
        <div class="mx-auto text-center mb-8 lg:mb-12">
          <h2 class="mb-4 text-4xl tracking-tight font-extrabold text-gray-900 dark:text-white">
            See how you can support us
          </h2>
          <p class="mb-5 font-normal text-gray-500 sm:text-xl dark:text-gray-400">
            Choose your best option and support us to make twillot better.
          </p>
        </div>
        <div class="space-y-8 lg:grid lg:grid-cols-2 sm:gap-6 xl:gap-10 lg:space-y-0">
          <div class="flex flex-col p-6 mx-auto  text-center text-gray-900 bg-white rounded-lg border border-blue-500 shadow  xl:p-8 dark:bg-gray-800 dark:text-white">
            <h3 class="mb-4 text-2xl font-semibold">Social Media Support</h3>
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
            <div data-text="https://twitter.com/intent/tweet?text=Check%20out%20this%20awesome%20tool%20for%20creating%20%23Twillot%20memes%20and%20more%20%F0%9F%98%8E%20https%3A%2F%2Ftwillot.vercel.app%20%23web3%20%23crypto">
              <span class="[&>svg]:h-7 [&>svg]:w-7 [&>svg]:fill-black">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="currentColor"
                  viewBox="0 0 512 512"
                >
                  <path d="M389.2 48h70.6L305.6 224.2 487 464H345L233.7 318.6 106.5 464H35.8L200.7 275.5 26.8 48H172.4L272.9 180.9 389.2 48zM364.4 421.8h39.1L151.1 88h-42L364.4 421.8z" />
                </svg>
              </span>
            </div>
          </div>

          <div class="flex flex-col p-6 mx-auto  text-center text-gray-900 bg-white rounded-lg border border-gray-100 shadow dark:border-gray-600 xl:p-8 dark:bg-gray-800 dark:text-white">
            <h3 class="mb-4 text-2xl font-semibold">Financial Support</h3>
            <p class="font-normal text-gray-500 sm:text-lg dark:text-gray-400">
              A small donation makes a big difference, the behind magician is
              YOU.
            </p>
            <div class="flex justify-center items-baseline my-8"></div>
            <ul role="list" class="mb-8 space-y-4 text-left">
              <li class="flex items-center space-x-3">
                <Checked />
                <span>Together, we can do more</span>
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
              data-text="https://ko-fi.com/N4N5TP4BZ"
              class="flex justify-center cursor-pointer"
            >
              <img
                class="h-12"
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
