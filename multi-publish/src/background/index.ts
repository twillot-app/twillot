import submitPost from '~/contentScript/publish'
import { PublishTask } from '~/types'

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.type === 'PUBLISH_TASK') {
    handlePublishTask(message.task)
  }
})

async function handlePublishTask(task: PublishTask) {
  try {
    const result = await publishArticle(task)
    updateTaskStatus(task.platform, result)
  } catch (error) {
    console.error(`发布到 ${task.platform} 失败:`, error)
    updateTaskStatus(task.platform, false)
  }
}

// 更新任务状态
function updateTaskStatus(platform: string, result: boolean | number) {
  // TODO 这里可以使用 Firebase Realtime Database 或其他方式更新状态
  console.log(`更新 ${platform} 的发布状态: ${result}`)
}

async function publishArticle(task: PublishTask) {
  const tab = await chrome.tabs.create({
    url: task.url,
    active: false,
  })

  const result = await chrome.scripting.executeScript({
    target: { tabId: tab.id },
    func: submitPost,
    args: [task],
  })
  await chrome.tabs.remove(tab.id!)
  return result[0].result
}
