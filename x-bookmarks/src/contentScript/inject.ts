import { TaskType } from 'utils/types'

console.log('inject.ts loaded', new Date().toLocaleString())

const origSend = XMLHttpRequest.prototype.send
const origOpen = XMLHttpRequest.prototype.open

XMLHttpRequest.prototype.open = function (method: string, url: string) {
  this._method = method
  this._url = url

  origOpen.apply(this, arguments)
}

XMLHttpRequest.prototype.send = function (data: string | FormData | null) {
  if (this._method === 'POST') {
    if (this._url.endsWith('/DeleteBookmark')) {
      window.postMessage({
        type: TaskType.DeleteBookmark,
        payload: JSON.parse(data as string),
      })
    } else if (this._url.endsWith('/CreateBookmark')) {
      window.postMessage({
        type: TaskType.CreateBookmark,
        payload: JSON.parse(data as string),
      })
    }
  }

  origSend.apply(this, [data])
}
