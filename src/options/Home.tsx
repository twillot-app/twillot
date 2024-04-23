import { createEffect, For } from 'solid-js'
import { A } from '@solidjs/router'

import dataStore from './store'
import { FullText } from '../components/Tweet'
import { openPage } from '../libs/dom'
import { Host } from '../types'
import Contribution from '../components/Contribution'

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
      class="my-4 w-[48rem] flex-1 overflow-y-auto text-base text-black dark:text-white"
      onClick={openPage}
      ref={listRef!}
    >
      <div class="mb-4">
        <Contribution />
      </div>

      <div class="relative mb-6 rounded-md py-4">
        <h3 class="text-lg font-medium">Top 10 Authors from your bookmarks</h3>
        <A
          href="/graph"
          class="absolute right-4 top-4 flex text-sm text-blue-500 hover:text-blue-700"
        >
          Details
        </A>
        <div class="mt-4 flex justify-between">
          <For
            each={store.topUsers}
            fallback={
              <div class="w-full p-4 text-center text-base text-gray-400">
                Hold on, Twillot is fetching your bookmarks ...
              </div>
            }
          >
            {(user) => (
              <A
                href={`/?q=from:${user.screen_name}`}
                class="flex cursor-pointer flex-col items-center"
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

      <div class="mb-4">
        <h3 class="mb-2 text-lg font-medium">
          {store.keyword
            ? `Search results: ${store.tweets.length} bookmarks`
            : 'Recent Bookmarks'}{' '}
          <span class="float-right text-sm font-normal text-gray-500">
            Query time: {store.searchTime} ms
          </span>
        </h3>
        <For
          each={store.tweets}
          fallback={
            <div class="my-8 text-center text-base text-gray-400">
              No bookmarks yet.
            </div>
          }
        >
          {(tweet) => (
            <div class="rounded-md p-2 hover:bg-black hover:bg-opacity-5">
              <div class="flex flex-shrink-0 pb-0">
                <div class="flex cursor-pointer items-start">
                  <div class="mr-2">
                    <img
                      class="inline-block h-10 w-10 rounded-full"
                      src={tweet.avatar_url.replace('_normal', '_x96')}
                      data-text={`${Host}/${tweet.screen_name}/`}
                      alt="avatar"
                    />
                  </div>
                  <div class="cursor-pointer">
                    <p class="text-base font-bold leading-6 text-black dark:text-white">
                      <span data-text={`${Host}/${tweet.screen_name}/`}>
                        {tweet.username}&nbsp;
                      </span>
                      <span class="ml-1 text-sm font-normal leading-5 text-[rgb(83,100,113)] dark:text-gray-500">
                        <span data-text={`${Host}/${tweet.screen_name}/`}>
                          @{tweet.screen_name} ·{' '}
                        </span>
                        <span
                          class="dark:text-gray-500"
                          data-text={`${Host}/${tweet.screen_name}/status/${tweet.tweet_id}`}
                        >
                          {new Date(tweet.created_at * 1000).toLocaleString()}
                        </span>
                      </span>
                    </p>
                  </div>
                </div>
              </div>
              <div class="-mt-2 pl-12">
                <div class="width-auto text-base font-normal leading-6 text-[rgb(15,20,25)] dark:text-white">
                  <FullText text={tweet.full_text} keyword={store.keyword} />
                </div>
              </div>
            </div>
          )}
        </For>
      </div>
    </div>
  )
}

export default Home
