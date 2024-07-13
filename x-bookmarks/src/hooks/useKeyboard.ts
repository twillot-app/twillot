import { onCleanup } from 'solid-js'

function useKeyboard(options) {
  const handleKeyDown = (event: KeyboardEvent) => {
    switch (event.key) {
      case 'ArrowLeft':
        options.onLeft && options.onLeft()
        break
      case 'ArrowRight':
        options.onRight && options.onRight()
        break
      case 'Escape':
        options.onEscape && options.onEscape()
        break
      default:
        break
    }
  }

  document.addEventListener('keydown', handleKeyDown)

  // 清理函数，组件卸载时调用
  onCleanup(() => {
    document.removeEventListener('keydown', handleKeyDown)
  })
}

export default useKeyboard
