import { createPopup, getAuthInfo } from '../libs/browser'
import { ActionPage } from '../types'

export async function removeBookmark(tweet_id: string) {
  try {
    const { token, csrf } = await getAuthInfo()
    const payload = {
      token,
      csrf,
      tweet_id,
    }
    const url = `${ActionPage.DEL_BOOKMARK}&payload=${btoa(JSON.stringify(payload))}`
    await createPopup(url)
  } catch (err) {
    console.error(err)
  }
}
