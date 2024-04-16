import { For, Show } from 'solid-js'
import TopN from '../components/TopN'
import dataStore from './store'
import { useNavigate } from '@solidjs/router'

export default function Graph() {
  const [store] = dataStore
  const navigate = useNavigate()
  const searchByScreenName = (screenName: string) => {
    navigate('/?q=from:' + screenName)
  }

  return (
    <div class="w-[42rem] text-base mt-4">
      <div>
        <h2 class="text-lg font-medium text-center my-4">
          Top 10 Authors from your bookmarks
        </h2>
        <div class="flex">
          <Show
            when={store.topUsers.length > 0}
            fallback={<div class="w-[480px] h-[480px]"></div>}
          >
            <TopN
              users={store.topUsers}
              stageSize={480}
              onClick={searchByScreenName}
            />
          </Show>
          <ul class="flex-1 flex flex-col ml-4">
            <For each={store.topUsers}>
              {(user, index) => {
                return (
                  <li
                    class="flex mt-2 justify-between items-center cursor-pointer"
                    title={user.username}
                    onClick={() => searchByScreenName(user.screen_name)}
                  >
                    <span class="italic w-8 font-medium">#{index() + 1}</span>
                    <img src={user.avatar_url} class="w-10 h-10 rounded-full" />
                    <p class="flex-1 flex flex-col text-right">
                      <span class="italic">{user.count}</span>
                    </p>
                  </li>
                )
              }}
            </For>
          </ul>
        </div>
      </div>
    </div>
  )
}
