let user_id = ''

export function set(key: string, value) {
  return chrome.storage.local.set({ [`user:${user_id}:${key}`]: value })
}

export function get(key: string) {
  return chrome.storage.local.get(`user:${user_id}:${key}`)
}
