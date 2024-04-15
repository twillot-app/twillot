export default function Card(props) {
  return (
    <div class="flex gap-4 flex-col w-full mx-auto mt-4 text-base text-black dark:text-white">
      <div class="shadow-sm focus-visible:outline-none justify-between p-0 rounded-xl border flex flex-col border-gray-200 dark:border-gray-500">
        <div class="flex flex-col pb-0 w-full p-3 px-4">
          <h3 class="font-medium relative">{props.header}</h3>
          <div class="mt-1 text-gray-400 text-sm">{props.label}</div>
        </div>
        <div class="flex w-full justify-end border-t border-gray-200 dark:border-gray-500 mt-4 p-2 px-3.5 gap-4">
          {props.footer}
        </div>
      </div>
    </div>
  )
}
