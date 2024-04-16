import { onMount, For } from 'solid-js'
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
          Top 10 Twitter Authors you loved
        </h2>
        <div class="flex">
          <TopN users={store.topUsers} stageSize={480} />
          <ul class="flex-1 flex flex-col">
            <For each={store.topUsers}>
              {(user) => {
                return (
                  <li class="flex mt-2 justify-between items-center">
                    <img src={user.avatar_url} class="w-10 h-10 rounded-full" />
                    <span
                      class="text-xs mx-2 max-w-28 overflow-hidden text-ellipsis whitespace-nowrap inline-block h-4 leading-4"
                      title={user.username}
                    >
                      {user.username}
                    </span>
                    <span class="italic font-medium">{user.count}</span>
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
