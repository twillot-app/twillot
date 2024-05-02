import { onCleanup, onMount } from 'solid-js'

export default function useClickOutside(ref, callback) {
  const handleClick = (e) => {
    const el = ref && ref()
    if (el && !el.contains(e.target)) {
      callback()
    }
  }

  onMount(() => {
    document.addEventListener('mousedown', handleClick)
  })
  onCleanup(() => document.removeEventListener('mousedown', handleClick))
}
