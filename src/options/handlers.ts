import { createPopup, getAuthInfo } from '../libs/browser'
import { ActionPage } from '../types'
import dataStore from './store'
import { syncAllBookmarks } from '../libs/bookmark'
import { AuthStatus, Header } from '../types'
import { countRecords, findRecords, getTopUsers } from '../libs/db'
import { FetchError } from '../libs/xfetch'
import { reconcile } from 'solid-js/store'

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

export async function query(keyword = '', category = '') {
  const [store, setStore] = dataStore
  const start = new Date().getTime()
  const tweets = await findRecords(
    keyword,
    category,
    store.page,
    store.pageSize,
  )
  setStore('tweets', () => [...tweets])
  setStore('searchTime', new Date().getTime() - start)
}

export async function initSync(keyword = '') {
  const [store, setStore] = dataStore
  try {
    /**
     * 可能之前已经同步过数据
     */
    setStore('topUsers', await getTopUsers(10))
    setStore('totalCount', await countRecords())

    const auth = await getAuthInfo()
    if (!auth || !auth.cookie) {
      throw new Error(AuthStatus.AUTH_FAILED)
    }

    if (!auth.lastForceSynced) {
      setStore('isForceSyncing', true)
      /**
       * 全量同步时展示最新的 100 条数据
       * 后续更新只更新总数
       */
      for await (const docs of syncAllBookmarks(auth as Header, true)) {
        /**
         * 已经有最新的数据展示，不对数据进行操作
         */
        if (store.tweets.length > 0) {
          setStore('totalCount', await countRecords())
        } else {
          setStore('tweets', () => [...docs])
        }
      }

      setStore('isForceSyncing', false)
      setStore('topUsers', reconcile(await getTopUsers(10)))
      const syncedTime = Math.floor(Date.now() / 1000)
      await chrome.storage.local.set({
        lastForceSynced: syncedTime,
      })
    } else {
      /**
       * 增量更新时先展示最新的 100 条
       * 后续更新同时更新总数和展示数据
       */
      setStore('isAutoSyncing', true)
      for await (const docs of syncAllBookmarks(auth as Header)) {
        setStore('totalCount', await countRecords())
        /**
         * 当前正在搜索时不更新数据
         */
        if (store.isAutoSyncing && store.keyword.trim()) {
          continue
        }
        await query(keyword)
      }
      setStore('isAutoSyncing', false)
    }

    setStore('topUsers', reconcile(await getTopUsers(10)))
  } catch (err) {
    console.error(err)
    if (
      err.name == FetchError.IdentityError ||
      err.message == AuthStatus.AUTH_FAILED
    ) {
      setStore('isAuthFailed', true)
    } else if (err.name == FetchError.TimeoutError) {
      setStore('isForceSyncTimedout', true)
      setStore('isForceSyncing', false)
    }
  }
}
