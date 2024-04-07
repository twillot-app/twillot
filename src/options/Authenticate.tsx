import { Show, onCleanup } from 'solid-js'

import dataStore from './store'
import { getAuthInfo, openNewTab } from '../libs/browser'
import Indicator from '../components/Indicator'

export default function Authenticate() {
  const [store, setStore] = dataStore
  let timerId
  const checkAuth = async () => {
    const auth = await getAuthInfo()
    const authenticated = !!(auth && auth.cookie)
    setStore('isAuthFailed', !authenticated)
    if (authenticated) {
      clearInterval(timerId)
      location.reload()
    }

    return authenticated
  }
  const startAuth = async (e: Event) => {
    e.stopPropagation()
    const authed = await checkAuth()
    if (authed) return
    setStore('isAuthenicating', true)
    openNewTab('https://twitter.com/i/bookmarks?twillot=reauth')
    timerId = setInterval(checkAuth, 5000)
  }

  onCleanup(() => clearInterval(timerId))

  return (
    <p class="text-black dark:text-white text-center cursor-pointer">
      <Show
        when={store.isAuthenicating}
        fallback={
          <span class="text-blue-500 text-lg" onClick={startAuth}>
            Click here to authenticate
          </span>
        }
      >
        <Indicator text="Authenticating, please wait..." />
      </Show>
    </p>
  )
}
