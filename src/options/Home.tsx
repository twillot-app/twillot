import { createEffect, For } from 'solid-js'
import { A } from '@solidjs/router'

import dataStore from './store'
import { Text } from '../components/Tweet'
import { openPage } from '../libs/dom'
import { IconBookmark } from '../components/IconBookmark'

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
      class="my-4 flex-1 overflow-y-auto w-[42rem] mx-auto text-black dark:text-white"
      onClick={openPage}
      ref={listRef!}
    >
      <div class="text-gray-900 bg-black bg-opacity-5 dark:bg-gray-800 dark:text-white dark:bg-opacity-100 p-4 rounded-md relative">
        <h2 class="text-lg font-bold">Top 10 Authors from your bookmarks</h2>
        <A
          href="/graph"
          class="flex absolute top-4 right-4 text-sm text-blue-500 hover:text-blue-700"
        >
          Details
        </A>
        <div class="flex mt-4 justify-between">
          <For each={store.topUsers}>
            {(user) => (
              <A
                href="/graph"
                class="flex flex-col items-center cursor-pointer"
                title={`You bookmarked ${user.count} tweets from ${user.username}`}
              >
                <img
                  class="inline-block h-14 w-14 rounded-full"
                  src={user.avatar_url.replace('_normal', '_x96')}
                  alt="avatar"
                />
              </A>
            )}
          </For>
        </div>
      </div>

      <div class="my-2 h-[1px]"></div>

      <For each={store.tweets}>
        {(tweet) => (
          <div class="hover:bg-black hover:bg-opacity-5 p-2 rounded-md">
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
            <div class="text-blue-500 pl-12 mt-4 -ml-1 cursor-pointer">
              <IconBookmark />
            </div>
          </div>
        )}
      </For>
    </div>
  )
}

export default Home
