export default function Card(props) {
  const { header, label, footer } = props as any
  return (
    <div class="flex gap-4 flex-col w-[42rem] mx-auto mt-4 text-sm">
      <div class="shadow-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring justify-between p-0 rounded-xl border border-input flex flex-col">
        <div class="flex flex-col pb-0 w-full p-3 px-4">
          <h3 class="font-medium relative">{props.header}</h3>
          <div class="mt-1">{props.label}</div>
        </div>
        <div class="flex w-full justify-end border-t mt-4 border-border p-2 px-3.5 gap-4">
          {props.footer}
        </div>
      </div>
    </div>
  )
}
