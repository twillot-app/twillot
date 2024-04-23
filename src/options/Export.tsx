import { exportBookmarks } from '../libs/bookmark'
import { openPage } from '../libs/dom'
import { EXPORT_FORMAT } from '../libs/export'
import Card from '../components/Card'
import Button from '../components/Button'
// import dataStore from './store'

export default function Export() {
  // const [store, addStore] = dataStore
  return (
    <div class="mx-auto mt-4 flex w-[48rem] flex-col gap-4 text-base">
      <Card
        header="Export / Local file"
        label={
          <>
            Media files will be exported as links. <br />
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
        header="Sync / Notion"
        label={
          <>
            This feature is under development. <br />
            Leave a comment
            <span
              data-text="https://dub.sh/PhqAQ4l"
              class="cursor-pointer text-blue-500"
              onClick={openPage}
            >
              {' '}
              here
            </span>{' '}
            to fasten the development.
            {/* <input
              class="w-full border rounded-md px-3 py-2 mt-2 focus:outline-none"
              type="password"
              placeholder="Sync all tweets to Notion"
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
            </div> */}
          </>
        }
        footer={<Button disabled>Sync Now</Button>}
      />
    </div>
  )
}
