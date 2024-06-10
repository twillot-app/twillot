export async function getCurrentUserId(): Promise<string> {
  const item = await chrome.storage.local.get('current_user_id')
  return item.current_user_id || ''
}

export function setCurrentUserId(user_id: string) {
  return chrome.storage.local.set({ current_user_id: user_id })
}

export function getStorageKey(key: string, user_id: string) {
  if (!user_id) {
    return key
  }

  return `user:${user_id}:${key}`
}

export async function setLocal(items: { [key: string]: any }) {
  const user_id = await getCurrentUserId()

  let newItems
  if (user_id) {
    newItems = {}
    for (const key in items) {
      newItems[getStorageKey(key, user_id)] = items[key]
    }
  } else {
    newItems = items
  }

  return chrome.storage.local.set(newItems)
}

export async function getLocal(key: string | string[]) {
  const user_id = await getCurrentUserId()
  let result: any = {}
  if (Array.isArray(key)) {
    result = await chrome.storage.local.get(
      key.map((i) => getStorageKey(i, user_id)),
    )
  } else {
    result = await chrome.storage.local.get(getStorageKey(key, user_id))
  }

  if (user_id) {
    for (const k in result) {
      result[k.replace(`user:${user_id}:`, '')] = result[k]
    }
  }

  return result
}

export async function clearCurrentLocal() {
  const user_id = await getCurrentUserId()
  const config = await chrome.storage.local.get()

  if (user_id) {
    return chrome.storage.local.remove(
      Object.keys(config).filter((key) => key.startsWith(`user:${user_id}:`)),
    )
  }

  return chrome.storage.local.clear()
}

export function onLocalChanged(key: string, callback: (newValue: any) => void) {
  chrome.storage.local.onChanged.addListener(async (changes) => {
    const current_user_id = await getCurrentUserId()
    if (!current_user_id) {
      console.error('current_user_id not found in storage')
      return
    }

    const realKey = getStorageKey(key, current_user_id)
    if (changes[realKey]) {
      callback(changes[realKey].newValue)
    }
  })
}
