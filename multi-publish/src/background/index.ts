import submitMediumPost from '~/contentScript/medium'
import { MediumPublishTask, PublishTask } from '~/types'

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.type === 'PUBLISH_TASK') {
    handlePublishTask(message.task)
  }
})

async function handlePublishTask(task: PublishTask) {
  try {
    // 执行发布
    await publishArticle(task)

    // 更新任务状态
    updateTaskStatus(task.platform, 'success')
  } catch (error) {
    console.error(`发布到 ${task.platform} 失败:`, error)
    updateTaskStatus(task.platform, 'failed')
  }
}

// 更新任务状态
function updateTaskStatus(platform: string, status: 'success' | 'failed') {
  // 这里可以使用 Firebase Realtime Database 或其他方式更新状态
  console.log(`更新 ${platform} 的发布状态: ${status}`)
}

async function publishArticle(task: PublishTask) {
  switch (task.platform) {
    case 'medium':
      return await publishToMedium(task as MediumPublishTask)
    case 'devto':
      return await publishToDevTo(task)
    case 'hashnode':
      return await publishToHashnode(task)
    // 添加其他平台的处理函数
    default:
      throw new Error(`不支持的平台: ${task.platform}`)
  }
}

async function publishToMedium(task: MediumPublishTask) {
  // 打开新标签页
  const tab = await chrome.tabs.create({
    url: task.url,
    active: false,
  })

  // 注入并执行脚本
  const result = await chrome.scripting.executeScript({
    target: { tabId: tab.id },
    func: submitMediumPost,
    args: [task],
  })
  // 关闭标签页
  await chrome.tabs.remove(tab.id!)
  return result[0].result
}

// 类似地更新其他平台的发布函数
async function publishToDevTo(task: PublishTask) {
  // 实现 Dev.to 的发布逻辑，使用 task.title 和 task.content
}

async function publishToHashnode(task: PublishTask) {
  // 实现 Hashnode 的发布逻辑，使用 task.title 和 task.content
}
