let user_id = ''

/**
 * Set a value in local storage for the current user.
 * @param key - The key to set.
 * @param value - The value to set.
 */
export function set(key: string, value: any) {
  return chrome.storage.local.set({ [`user:${user_id}:${key}`]: value })
}

/**
 * Get a value from local storage for the current user.
 * @param key - The key to get.
 * @returns The value associated with the key.
 */
export function get(key: string) {
  return chrome.storage.local.get(`user:${user_id}:${key}`)
}
