import { searchBookmark } from './bookmark'
import { getLocalItem } from './browser'
import { mem as memApi } from './api'
import { countRecords } from './db'

export async function* mem() {
  const key = await getLocalItem('MEM_API_KEY')
  if (!key) {
    throw new Error('MEM_API_KEY not found')
  }

  const total = await countRecords()
  const totalPage = Math.ceil(total / 10)
  for (let i = 0; i < totalPage; i++) {
    const tweets = await searchBookmark('', i + 1, 10)
    if (tweets.length === 0) {
      break
    }

    await memApi({
      datalist: tweets.map((t) => ({
        content: `${t.full_text}\n\nSource: ${`https://x.com/${t.screen_name}/status/${t.tweet_id}`}`,
      })),
      key,
    })

    yield { total: totalPage, current: i + 1 }
  }
}
