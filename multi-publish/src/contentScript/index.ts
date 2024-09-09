import { PublishTask } from '~/types'
import { waitForElement } from '~/utils'

// 创建一个发布按钮
function createPublishButton() {
  const button = document.createElement('button')
  button.textContent = '发布到多个平台'
  button.style.cssText =
    'position: fixed; top: 10px; left: 10px; z-index: 1000; background-color: red; color: #FFF; padding: 10px 20px; border: none; border-radius: 5px; cursor: pointer;'
  button.addEventListener('click', async () => {
    const platforms = ['medium']

    for (const platform of platforms) {
      const task: PublishTask = {
        platform,
        title: 'How to use twillot',
        content: 'test ' + new Date().toISOString(),
      }

      await chrome.runtime.sendMessage({ type: 'PUBLISH_TASK', task })
    }
  })

  document.body.appendChild(button)
}

setTimeout(() => {
  createPublishButton()
}, 1000)

// @ts-ignore
window.waitForElement = waitForElement
