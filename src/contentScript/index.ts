console.info('Twillot - your personal Twitter copilot is running')

document.addEventListener('DOMContentLoaded', () => {
  const payload = JSON.parse(location.href.split('payload=')[1])
  console.log('content script loaded')
  console.log(payload)
})
