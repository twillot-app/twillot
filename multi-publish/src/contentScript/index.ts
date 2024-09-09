import { MediumPublishTask } from '~/types'
import { waitForElement } from '~/utils'

// 创建一个发布按钮
function createPublishButton() {
  const button = document.createElement('button')
  button.textContent = '发布'
  button.style.cssText =
    'position: fixed; top: 10px; left: 10px; z-index: 1000; background-color: red; color: #FFF; padding: 10px 20px; border: none; border-radius: 5px; cursor: pointer;'
  button.addEventListener('click', async () => {
    const task: MediumPublishTask = {
      url: 'https://medium.com/new-story',
      platform: 'medium',
      title: 'How to use twillot',
      content: 'test ' + new Date().toISOString(),
      titleSelector: '.graf--title',
      bodySelector: '.graf--p',
      previewButtonSelector: 'button[data-action="show-prepublish"]',
      publishButtonSelector: 'button[data-action="publish"]',
      successSelector: 'h3[data-testid="publishSuccessTitleText"]',
    }

    await chrome.runtime.sendMessage({ type: 'PUBLISH_TASK', task })
  })

  document.body.appendChild(button)
}

setTimeout(() => {
  createPublishButton()
}, 1000)

// @ts-ignore
window.waitForElement = waitForElement
