import { createEffect, For } from 'solid-js'

import dataStore from './store'
import { Text } from '../components/Tweet'
import { openPage } from '../libs/dom'

export const Home = () => {
  let listRef: HTMLDivElement
  const [store] = dataStore

  createEffect(() => {
    if (store.tweets.length > 0) {
      listRef.scrollTo(0, 0)
    }
  })

  return (
    <div
      class="my-4 flex-1 overflow-y-auto w-[42rem] mx-auto"
      onClick={openPage}
      ref={listRef!}
    >
      <For each={store.tweets}>
        {(tweet) => (
          <div class="hover:bg-black hover:bg-opacity-5 p-2">
            <div class="flex flex-shrink-0 pb-0">
              <div class="flex items-start cursor-pointer">
                <div class="mr-2">
                  <img
                    class="inline-block h-10 w-10 rounded-full"
                    src={tweet.avatar_url.replace('_normal', '_x96')}
                    data-text={`https://twitter.com/${tweet.screen_name}/`}
                    alt="avatar"
                  />
                </div>
                <div class="cursor-pointer">
                  <p class="text-base leading-6 font-bold text-black dark:text-white">
                    <span
                      data-text={`https://twitter.com/${tweet.screen_name}/`}
                    >
                      {tweet.username}&nbsp;
                    </span>
                    <span class="text-sm leading-5 ml-1 font-normal text-[rgb(83,100,113)] dark:text-gray-500">
                      <span
                        data-text={`https://twitter.com/${tweet.screen_name}/`}
                      >
                        @{tweet.screen_name} ·{' '}
                      </span>
                      <span
                        class="dark:text-gray-500"
                        data-text={`https://twitter.com/${tweet.screen_name}/status/${tweet.tweet_id}`}
                      >
                        {new Date(tweet.created_at * 1000).toLocaleString()}
                      </span>
                    </span>
                  </p>
                </div>
              </div>
            </div>
            <div class="pl-12 -mt-2">
              <div class="text-base leading-5 width-auto font-normal text-[rgb(15,20,25)] dark:text-white flex-shrink">
                {tweet.full_text.split('\n').map((i) => (
                  <>
                    <Text text={i} keyword={store.keyword} />
                    <br />
                  </>
                ))}
              </div>
            </div>
          </div>
        )}
      </For>
    </div>
  )
}

export default Home
