import { PublishTask } from '~/types'
import { fillInputField, waitForElement, wait } from '~/utils'

// 定义平台任务
const platformTasks: Record<string, PublishTask> = {
  medium: {
    url: 'https://medium.com/new-story',
    platform: 'medium',
    title: 'How to use twillot',
    content: 'test ' + new Date().toISOString(),
    titleSelector: '.graf--title',
    bodySelector: '.graf--p',
    previewButtonSelector: 'button[data-action="show-prepublish"]',
    publishButtonSelector: 'button[data-action="publish"]',
    successSelector: 'h3[data-testid="publishSuccessTitleText"]',
  },
  devto: {
    url: 'https://dev.to/new',
    platform: 'devto',
    title: 'How to use twillot',
    content: 'test ' + new Date().toISOString(),
    initSelector: '#editor-actions',
    titleSelector: '#article-form-title',
    bodySelector: '#article_body_markdown',
    publishButtonSelector: '#editor-actions button:nth-child(1)',
    errorSelector: 'div[data-testid="error-message"]',
  },
  github: {
    url: 'https://github.com/twillot-app/twillot/issues/new',
    platform: 'github',
    title: 'How to use twillot',
    content: 'test ' + new Date().toISOString(),
    titleSelector: '#issue_title',
    bodySelector: '#issue_body',
    publishButtonSelector: '#new_issue button[type="submit"]:not([disabled])',
  },
}

// 创建发布按钮
function createPublishButton(platform: string, task: PublishTask) {
  const button = document.createElement('button')
  button.textContent = `发布到 ${platform}`
  button.style.cssText = `
    position: fixed;
    top: ${10 + Object.keys(platformTasks).indexOf(platform) * 50}px;
    left: 10px;
    z-index: 1000;
    background-color: ${platform === 'medium' ? 'green' : 'blue'};
    color: #FFF;
    padding: 10px 20px;
    border: none;
    border-radius: 5px;
    cursor: pointer;
  `
  button.addEventListener('click', async () => {
    await chrome.runtime.sendMessage({ type: 'PUBLISH_TASK', task })
  })

  document.body.appendChild(button)
}

setTimeout(() => {
  Object.entries(platformTasks).forEach(([platform, task]) => {
    createPublishButton(platform, task)
  })
}, 1000)

// @ts-ignore
window.waitForElement = waitForElement
// @ts-ignore
window.fillInputField = fillInputField
// @ts-ignore
window.wait = wait
