import { For, Show } from 'solid-js'
import { A } from '@solidjs/router'
import TopN from '../components/TopN'
import dataStore from './store'
// import Timeline from '../components/Timeline'

export default function Graph() {
  const [store] = dataStore

  return (
    <div class="mx-auto my-4 w-[48rem] flex-1 overflow-y-auto text-base text-black dark:text-white">
      <div>
        <h3 class="my-4 text-lg font-medium">
          Top 10 Authors from your bookmarks
        </h3>
        <div class="flex">
          <Show
            when={store.topUsers.length > 0}
            fallback={<div class="h-[480px] w-[480px]"></div>}
          >
            <TopN users={store.topUsers} stageSize={480} />
          </Show>
          <ul class="ml-12 flex flex-1 flex-col">
            <For each={store.topUsers}>
              {(user, index) => {
                return (
                  <li class="mt-2 flex items-center" title={user.username}>
                    <span class="w-8 font-medium italic">#{index() + 1}</span>
                    <A href={`/?q=from:${user.screen_name}`}>
                      <img
                        src={user.avatar_url}
                        class="ml-2 h-10 w-10 rounded-full"
                      />
                    </A>
                    <span class="mx-3 max-w-24 overflow-hidden text-ellipsis whitespace-nowrap text-sm">
                      {user.username}
                    </span>
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

      {/* <div class="my-4 ml-8">
        <Timeline />
      </div> */}
    </div>
  )
}
