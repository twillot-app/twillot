import { exportBookmarks } from '../libs/bookmark'
import { openPage } from '../libs/dom'
import { EXPORT_FORMAT } from '../libs/export'

export default function Export() {
  return (
    <div class="flex gap-4 flex-col w-[42rem] mx-auto mt-4 text-base">
      <div class="shadow-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring justify-between  p-0 rounded-xl border border-input flex flex-col">
        <div class="flex flex-col pb-0 w-full p-3 px-4">
          <h3 class="font-medium text-base relative">Export as CSV or JSON</h3>
          <div class="mt-1 text-muted-foreground">
            Note: Media files will be exported as links. <br />
            If you want to download them, please leave a comment
            <span
              data-text="https://dub.sh/PhqAQ4l"
              class="cursor-pointer text-blue-500"
              onClick={openPage}
            >
              {' '}
              here.
            </span>
          </div>
        </div>
        <div class="flex w-full justify-end border-t mt-4 border-border p-2 px-3.5 gap-4">
          <button
            onClick={() => exportBookmarks(EXPORT_FORMAT.CSV)}
            class="inline-flex items-center justify-center whitespace-nowrap rounded-md  ring-offset-background transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-1 disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-accent hover:text-accent-foreground h-10 py-2 px-3 gap-2 font-normal"
          >
            CSV
          </button>
          <button
            onClick={() => exportBookmarks(EXPORT_FORMAT.JSON)}
            class="inline-flex items-center justify-center whitespace-nowrap rounded-md  ring-offset-background transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-1 disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-accent hover:text-accent-foreground h-10 py-2 px-3 gap-2 font-normal"
          >
            JSON
          </button>
        </div>
      </div>
    </div>
  )
}
