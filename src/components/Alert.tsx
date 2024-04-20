export enum AlertType {
  INFO = 'info',
  SUCCESS = 'success',
  WARNING = 'warning',
  ERROR = 'error',
}

const classNames = (type: AlertType) => {
  switch (type) {
    case AlertType.INFO:
      return 'bg-blue-50 text-blue-700 dark:bg-gray-800 dark:text-blue-500'

    case AlertType.SUCCESS:
      return 'bg-green-50 text-green-700 dark:bg-gray-800 dark:text-green-500'

    case AlertType.WARNING:
      return 'bg-yellow-50 text-yellow-700 dark:bg-gray-800 dark:text-yellow-500'

    case AlertType.ERROR:
      return 'bg-red-50 text-red-700 dark:bg-gray-800 dark:text-red-500'

    default:
      return 'bg-blue-50 text-blue-700 dark:bg-gray-100 dark:text-blue-500'
  }
}

export const Alert = (props) => {
  return (
    <div
      class={`flex items-center mt-4 p-4 text-base rounded-lg ${classNames(props.type)}`}
      role="alert"
    >
      <svg
        class="flex-shrink-0 inline w-4 h-4 me-3"
        aria-hidden="true"
        xmlns="http://www.w3.org/2000/svg"
        fill="currentColor"
        viewBox="0 0 20 20"
      >
        <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM12 15H8a1 1 0 0 1 0-2h1v-3H8a1 1 0 0 1 0-2h2a1 1 0 0 1 1 1v4h1a1 1 0 0 1 0 2Z" />
      </svg>
      <span class="sr-only">{props.type}</span>
      <div>{props.message}</div>
    </div>
  )
}
