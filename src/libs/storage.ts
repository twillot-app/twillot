export async function getUserId(): Promise<string> {
  const item = await chrome.storage.local.get('current_user_id')
  return item.current_user_id || ''
}

export function getStorageKey(key: string, user_id: string) {
  return `user:${user_id}:${key}`
}

export async function setLocal(items: { [key: string]: any }) {
  const user_id = await getUserId()

  const newItems = {}
  for (const key in items) {
    newItems[getStorageKey(key, user_id)] = items[key]
  }

  return chrome.storage.local.set(newItems)
}

export async function getLocal(key: string | string[]) {
  const user_id = await getUserId()
  let result: any = {}
  if (Array.isArray(key)) {
    result = await chrome.storage.local.get(
      key.map((i) => getStorageKey(i, user_id)),
    )
  } else {
    result = await chrome.storage.local.get(getStorageKey(key, user_id))
  }

  for (const k in result) {
    result[k.replace(`user:${user_id}:`, '')] = result[k]
  }

  return result
}

export async function clearCurrentLocal() {
  const user_id = await getUserId()
  const config = await chrome.storage.local.get()

  return chrome.storage.local.remove(
    Object.keys(config).filter((key) => key.startsWith(`user:${user_id}:`)),
  )
}

export function onLocalChanged(key: string, callback: (newValue: any) => void) {
  chrome.storage.local.onChanged.addListener(async (changes) => {
    const item = await chrome.storage.local.get('current_user_id')
    if (!item.current_user_id) {
      console.error('current_user_id not found in storage')
      return
    }

    const realKey = getStorageKey(key, item.current_user_id)
    if (changes[realKey]) {
      callback(changes[realKey].newValue)
    }
  })
}
