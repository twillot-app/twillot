import { PublishTask } from '~/types'

export default async function submitMediumPost(content: PublishTask) {
  // @ts-ignore
  const waitForElement = window.waitForElement
  try {
    await waitForElement('.graf--title')
    const titleElement = document.querySelector('.graf--title')
    const bodyElement = document.querySelector('.graf--p')
    titleElement.textContent = content.title
    bodyElement.textContent = content.content
    console.log('title and body set')

    await waitForElement('button[data-action="show-prepublish"]')
    const previewButton = document.querySelector(
      'button[data-action="show-prepublish"]',
    ) as HTMLButtonElement
    previewButton.click()
    console.log('click preview button')

    await waitForElement('button[data-action="publish"]')
    const publishButton = document.querySelector(
      'button[data-action="publish"]',
    ) as HTMLButtonElement
    publishButton.click()
    console.log('click publish button')

    await waitForElement('h3[data-testid="publishSuccessTitleText"]')
    return true
  } catch (error) {
    console.error('Error submitting medium post', error)
    return false
  }
}
