import Checked from './Checked'

export default function SupportUs() {
  return (
    <section class="bg-white dark:bg-black">
      <div class="py-4 mx-auto max-w-screen-xl lg:py-16">
        <div class="mx-auto max-w-screen-md text-center mb-8 lg:mb-12">
          <h2 class="mb-4 text-4xl tracking-tight font-extrabold text-gray-900 dark:text-white">
            See how you can support us
          </h2>
          <p class="mb-5 font-normal text-gray-500 sm:text-xl dark:text-gray-400">
            Choose your best option and support us to make twillot better.
          </p>
        </div>
        <div class="space-y-8 lg:grid lg:grid-cols-2 sm:gap-6 xl:gap-10 lg:space-y-0">
          <div class="flex flex-col p-6 mx-auto max-w-lg text-center text-gray-900 bg-white rounded-lg border border-blue-500 shadow  xl:p-8 dark:bg-gray-800 dark:text-white">
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
            <button
              data-text=""
              class="text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:ring-primary-200 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:text-white  dark:focus:ring-primary-900"
            >
              Share a Post on X
            </button>
          </div>

          <div class="flex flex-col p-6 mx-auto max-w-lg text-center text-gray-900 bg-white rounded-lg border border-gray-100 shadow dark:border-gray-600 xl:p-8 dark:bg-gray-800 dark:text-white">
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
            <button
              data-text=""
              class="text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:ring-primary-200 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:text-white  dark:focus:ring-primary-900"
            >
              <a href="https://ko-fi.com/N4N5TP4BZ" target="_blank">
                <img
                  height="36"
                  style="border:0px;height:36px;"
                  src="https://storage.ko-fi.com/cdn/kofi1.png?v=3"
                  alt="Buy Me a Coffee at ko-fi.com"
                />
              </a>
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}
