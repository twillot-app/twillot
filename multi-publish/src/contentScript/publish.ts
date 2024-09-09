/**
 * These functions are used to submit posts
 * They are injected into the page and executed in the page context
 */

import { PublishTask } from '~/types'

export default async function submitPost(content: PublishTask) {
  // @ts-ignore
  const { waitForElement, fillInputField, wait } = window
  try {
    if (content.initSelector) {
      await waitForElement(content.initSelector)
    }

    const titleElement = await waitForElement(content.titleSelector)
    fillInputField(titleElement, content.title)
    console.log('title set')

    const bodyElement = await waitForElement(content.bodySelector)
    fillInputField(bodyElement, content.content)
    console.log('body set')

    if (content.previewButtonSelector) {
      const previewButton = (await waitForElement(
        content.previewButtonSelector,
      )) as HTMLButtonElement
      previewButton.click()
      console.log('click preview button')
    }

    const publishButton = (await waitForElement(
      content.publishButtonSelector,
    )) as HTMLButtonElement
    publishButton.click()
    console.log('click publish button')

    if (content.successSelector) {
      await waitForElement(content.successSelector)
      return true
    }
    if (content.errorSelector) {
      await waitForElement(content.errorSelector)
      return false
    }

    return 0
  } catch (error) {
    console.error('Error submitting medium post', error)
    return false
  }
}
