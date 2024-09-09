export function waitForElement(selector: string) {
  return new Promise((resolve) => {
    if (document.querySelector(selector)) {
      return resolve(document.querySelector(selector))
    }

    const observer = new MutationObserver((mutations) => {
      if (document.querySelector(selector)) {
        observer.disconnect()
        resolve(document.querySelector(selector))
      }
    })

    // If you get "parameter 1 is not of type 'Node'" error, see https://stackoverflow.com/a/77855838/492336
    observer.observe(document.body, {
      childList: true,
      subtree: true,
    })
  })
}

export function fillInputField(element: HTMLElement, text: string) {
  if (element.tagName === 'INPUT' || element.tagName === 'TEXTAREA') {
    // @ts-ignore
    element.value = text
    element.dispatchEvent(new Event('input', { bubbles: true }))
  } else {
    element.textContent = text
  }
}

export function wait(time: number) {
  return new Promise((resolve) => {
    setTimeout(resolve, time)
  })
}
