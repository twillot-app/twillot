import { PublishTask } from './types' // 假设我们在 types.ts 中定义了 PublishTask 接口

export function sendPublishTask(task: PublishTask): Promise<void> {
  return new Promise((resolve, reject) => {
    chrome.runtime.sendMessage({ type: 'PUBLISH_TASK', task }, (response) => {
      if (chrome.runtime.lastError) {
        reject(chrome.runtime.lastError)
      } else {
        resolve(response)
      }
    })
  })
}
