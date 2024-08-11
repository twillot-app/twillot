import { onCleanup, createSignal } from 'solid-js'

import { openNewTab } from '../browser'
import { ActionPage } from '../types'
import { getAuthInfo, getCurrentUserId, logout } from '../storage'

export default function useAuth() {
  const [isAuthenicating, setIsAuthenicating] = createSignal(false)
  const [isAuthFailed, setIsAuthFailed] = createSignal(false)

  let timerId, tab: chrome.tabs.Tab
  const checkAuth = async () => {
    const user_id = await getCurrentUserId()
    if (!user_id) return false

    const auth = await getAuthInfo()

    const authenticated = !!(auth && auth.token)
    setIsAuthFailed(!authenticated)
    if (authenticated) {
      clearInterval(timerId)
      if (tab) chrome.tabs.remove(tab.id)
      location.reload()
    }

    return authenticated
  }
  const startAuth = async () => {
    await logout(await getCurrentUserId())
    const authed = await checkAuth()
    if (authed) return
    setIsAuthenicating(true)
    // 个人猜测大部份用户 twitter 已经登录，所以不需要聚焦到这个窗口
    tab = await openNewTab(ActionPage.AUTHENTICATE, false)
    timerId = setInterval(checkAuth, 3000)
  }

  onCleanup(() => clearInterval(timerId))

  return {
    isAuthenicating,
    isAuthFailed,
    setIsAuthFailed,
    startAuth,
  }
}
