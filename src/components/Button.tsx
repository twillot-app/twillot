export default function Button(props) {
  return (
    <button
      onClick={props.onClick}
      class="min-w-16 inline-flex items-center justify-center whitespace-nowrap rounded-md disabled:pointer-events-none disabled:opacity-50 border border-gray-200 dark:border-gray-500 h-10 py-2 px-3 gap-2 font-normal"
      disabled={props.disabled}
    >
      {props.children}
    </button>
  )
}
