import { setCurrentUserId } from 'utils/storage'

console.log('content script loaded')

for (const item of document.cookie.split(';')) {
  const [key, value] = item.split('=')
  if (key.includes('twid')) {
    setCurrentUserId(value.replace('u%3D', ''))
    break
  }
}
