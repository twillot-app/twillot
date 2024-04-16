import { onMount, For, Show } from 'solid-js'
import TopN from '../components/TopN'
import dataStore from './store'

export default function Graph() {
  const [store] = dataStore
  onMount(() => {
    // TODO: Implement graph
  })

  return (
    <div class="w-[42rem] text-base">
      <div>
        <h2 class="text-lg font-bold text-center my-4">
          Top 10 Authors you loved
        </h2>
        <div class="flex">
          <Show
            when={store.topUsers.length > 0}
            fallback={<div class="w-[480px] h-[480px]"></div>}
          >
            <TopN users={store.topUsers} stageSize={480} />
          </Show>
          <ul class="flex-1 flex flex-col ml-4">
            <For each={store.topUsers}>
              {(user, index) => {
                return (
                  <li
                    class="flex mt-2 justify-between items-center"
                    title={user.username}
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
