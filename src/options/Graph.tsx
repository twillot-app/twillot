import { For, Show } from 'solid-js'
import { A } from '@solidjs/router'
import TopN from '../components/TopN'
import dataStore from './store'

export default function Graph() {
  const [store] = dataStore

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
            <TopN users={store.topUsers} stageSize={480} />
          </Show>
          <ul class="flex-1 flex flex-col ml-12">
            <For each={store.topUsers}>
              {(user, index) => {
                return (
                  <li class="flex mt-2 items-center" title={user.username}>
                    <span class="italic w-8 font-medium">#{index() + 1}</span>
                    <A href={`/?q=from:${user.screen_name}`}>
                      <img
                        src={user.avatar_url}
                        class="w-10 h-10 rounded-full ml-2"
                      />
                    </A>
                    <p class="flex flex-1 flex-col text-right">
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
