import { useNavigate } from '@solidjs/router'
import dataStore from './store'

export default function Search() {
  const [store, setStore] = dataStore
  const navigate = useNavigate()
  const onSubmit = async (e) => {
    try {
      e.preventDefault()
      const keyword = e.target.keyword.value.trim()
      setStore('keyword', keyword)
      navigate('/')
    } catch (err) {}
  }

  return (
    <form onSubmit={onSubmit} class="flex w-full">
      <div class="flex w-10 items-center justify-center rounded-tl-lg rounded-bl-lg border border-gray-200 bg-white p-5">
        <svg
          viewBox="0 0 20 20"
          aria-hidden="true"
          class="pointer-events-none absolute w-5 fill-gray-500 transition"
        >
          <path d="M16.72 17.78a.75.75 0 1 0 1.06-1.06l-1.06 1.06ZM9 14.5A5.5 5.5 0 0 1 3.5 9H2a7 7 0 0 0 7 7v-1.5ZM3.5 9A5.5 5.5 0 0 1 9 3.5V2a7 7 0 0 0-7 7h1.5ZM9 3.5A5.5 5.5 0 0 1 14.5 9H16a7 7 0 0 0-7-7v1.5Zm3.89 10.45 3.83 3.83 1.06-1.06-3.83-3.83-1.06 1.06ZM14.5 9a5.48 5.48 0 0 1-1.61 3.89l1.06 1.06A6.98 6.98 0 0 0 16 9h-1.5Zm-1.61 3.89A5.48 5.48 0 0 1 9 14.5V16a6.98 6.98 0 0 0 4.95-2.05l-1.06-1.06Z"></path>
        </svg>
      </div>
      <input
        type="text"
        class="flex-1 bg-white pl-2 text-base font-semibold outline-0 border-y border-gray-200"
        placeholder={`Search ${store.totalCount} tweets, last synced at ${new Date(store.syncTime * 1000).toLocaleString()}`}
        name="keyword"
        value={store.keyword}
      />
      <input
        type="submit"
        value="Search"
        class="bg-blue-500 p-2 rounded-tr-lg rounded-br-lg text-white font-semibold hover:bg-blue-700 transition-colors cursor-pointer"
      />
    </form>
  )
}
