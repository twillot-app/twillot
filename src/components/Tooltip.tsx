import { createSignal, onCleanup } from 'solid-js'

function Tooltip(props) {
  const [isVisible, setIsVisible] = createSignal(false)
  const id = 'tooltip-' + Math.random().toString(36).slice(2, 9)
  // 处理鼠标点击事件
  const handleClick = () => {
    if (props.mode === 'click') {
      setIsVisible(!isVisible())
    }
  }

  // 处理鼠标悬停事件
  const handleMouseEnter = () => {
    if (props.mode === 'hover') {
      setIsVisible(true)
    }
  }

  const handleMouseLeave = () => {
    if (props.mode === 'hover') {
      setIsVisible(false)
    }
  }

  // 在组件卸载时确保清理
  onCleanup(() => {
    setIsVisible(false)
  })

  return (
    <>
      <button
        data-tooltip-target={id}
        type="button"
        class="ms-3 rounded-lg bg-blue-700 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        onClick={handleClick}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        {props.children}
      </button>
      <div
        id={id}
        role="tooltip"
        class={`absolute z-10 inline-block rounded-lg bg-gray-900 px-3 py-2 text-sm font-medium text-white shadow-sm ${isVisible() ? 'visible opacity-100' : 'invisible opacity-0'} tooltip dark:bg-gray-700`}
      >
        {props.text}
        <div class="tooltip-arrow" data-popper-arrow></div>
      </div>
    </>
  )
}

export default Tooltip
