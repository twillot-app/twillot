import { Show, createEffect, onCleanup } from 'solid-js'

import dataStore from './store'
import { getAuthInfo, openNewTab } from '../libs/browser'
import Indicator from '../components/Indicator'
import { Alert } from '../components/Alert'
import { ActionPage } from '../types'
import { clearCurrentLocal, getCurrentUserId } from '../libs/storage'

export default function Authenticate() {
  const [store, setStore] = dataStore
  let timerId, tab: chrome.tabs.Tab
  const title = document.title
  const checkAuth = async () => {
    const user_id = await getCurrentUserId()
    if (!user_id) return false

    const auth = await getAuthInfo()
    const authenticated = !!(auth && auth.token)
    setStore('isAuthFailed', !authenticated)
    if (authenticated) {
      clearInterval(timerId)
      if (tab) chrome.tabs.remove(tab.id)
      location.reload()
    }

    return authenticated
  }
  const startAuth = async (e: Event) => {
    await clearCurrentLocal()
    e.stopPropagation()
    const authed = await checkAuth()
    if (authed) return
    setStore('isAuthenicating', true)
    // 个人猜测大部份用户 twitter 已经登录，所以不需要聚焦到这个窗口
    tab = await openNewTab(ActionPage.AUTHENTICATE, false)
    timerId = setInterval(checkAuth, 5000)
  }

  createEffect(() => {
    let progress = ''
    if (store.isAuthenicating) {
      progress = 'Authenticating... - Twillot'
    } else if (store.isAuthFailed) {
      progress = 'Authentication failed - Twillot'
    }

    document.title = progress || title
  })

  onCleanup(() => clearInterval(timerId))

  return (
    <div class="cursor-pointer text-center">
      <Show
        when={store.isAuthenicating}
        fallback={
          <p onClick={startAuth}>
            <Alert type="error" message="Click here to authenticate" />
          </p>
        }
      >
        <Indicator text="Authenticating, please wait..." />
      </Show>
    </div>
  )
}
