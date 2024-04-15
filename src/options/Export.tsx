import { exportBookmarks } from '../libs/bookmark'
import { openPage } from '../libs/dom'
import { EXPORT_FORMAT } from '../libs/export'
import Card from '../components/Card'
import Button from '../components/Button'
import { addLocalItem } from '../libs/browser'
import dataStore from './store'
import { mem } from '../libs/sync'

export default function Export() {
  const [store, addStore] = dataStore
  return (
    <div class="flex gap-4 flex-col w-[42rem] mx-auto mt-4 text-base">
      <Card
        header="Export / Local file"
        label={
          <>
            {' '}
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
          </>
        }
        footer={
          <>
            <Button onClick={() => exportBookmarks(EXPORT_FORMAT.CSV)}>
              CSV
            </Button>
            <Button onClick={() => exportBookmarks(EXPORT_FORMAT.JSON)}>
              JSON
            </Button>
          </>
        }
      />
      <Card
        header="Sync / Mem"
        label={
          <>
            <input
              class="w-full border rounded-md px-3 py-2 mt-2 focus:outline-none"
              type="password"
              placeholder="Sync all all tweets to Mem via API"
              value={store.memApiKey}
              onBlur={async (e) => {
                const key = await addLocalItem('MEM_API_KEY', e.target.value)
                if (key) {
                  addStore('memApiKey', key)
                }
              }}
            />
            <div
              data-text="https://mem.ai/sources/api"
              class="cursor-pointer text-blue-500 mt-2 ml-3 text-sm"
              onClick={openPage}
            >
              Get my Mem API key
            </div>
          </>
        }
        footer={
          <Button
            onClick={async () => {
              for await (const tweet of mem()) {
                console.log(tweet)
              }
            }}
          >
            Sync Now
          </Button>
        }
      />
    </div>
  )
}
