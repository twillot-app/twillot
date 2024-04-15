import { Show, createEffect, onCleanup } from 'solid-js'

import dataStore from './store'
import { getAuthInfo, openNewTab } from '../libs/browser'
import Indicator from '../components/Indicator'
import { Alert } from '../components/Alert'

export default function Authenticate() {
  const [store, setStore] = dataStore
  let timerId, tab: chrome.tabs.Tab
  const title = document.title
  const checkAuth = async () => {
    const auth = await getAuthInfo()
    const authenticated = !!(auth && auth.cookie)
    setStore('isAuthFailed', !authenticated)
    if (authenticated) {
      clearInterval(timerId)
      location.reload()
      if (tab) chrome.tabs.remove(tab.id)
    }

    return authenticated
  }
  const startAuth = async (e: Event) => {
    e.stopPropagation()
    const authed = await checkAuth()
    if (authed) return
    setStore('isAuthenicating', true)
    tab = await openNewTab('https://twitter.com/i/bookmarks?twillot=reauth')
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
    <div class="text-black dark:text-white text-center cursor-pointer mt-4">
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
