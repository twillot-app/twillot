import { MediumPublishTask } from '~/types'

export default async function submitMediumPost(content: MediumPublishTask) {
  // @ts-ignore
  const waitForElement = window.waitForElement
  try {
    await waitForElement(content.titleSelector)
    const titleElement = document.querySelector(content.titleSelector)
    const bodyElement = document.querySelector(content.bodySelector)
    titleElement.textContent = content.title
    bodyElement.textContent = content.content
    console.log('title and body set')

    await waitForElement(content.previewButtonSelector)
    const previewButton = document.querySelector(
      content.previewButtonSelector,
    ) as HTMLButtonElement
    previewButton.click()
    console.log('click preview button')

    await waitForElement(content.publishButtonSelector)
    const publishButton = document.querySelector(
      content.publishButtonSelector,
    ) as HTMLButtonElement
    publishButton.click()
    console.log('click publish button')

    await waitForElement(content.successSelector)
    return true
  } catch (error) {
    console.error('Error submitting medium post', error)
    return false
  }
}
