import { createEffect, For, Show } from 'solid-js'
import { A } from '@solidjs/router'

import dataStore from './store'
import { Content } from '../components/Tweet'
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
      class="my-4 w-[48rem] flex-1 overflow-y-auto overflow-x-hidden text-base text-black dark:text-white"
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
        <h3 class="mb-4 text-lg font-medium">
          {store.keyword || store.category
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
                    <A href={`/?q=from:${tweet.screen_name}`}>
                      <img
                        class="inline-block h-10 w-10 rounded-full"
                        src={tweet.avatar_url.replace('_normal', '_x96')}
                        alt="avatar"
                      />
                    </A>
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
              <div class="-mt-2 pl-12 text-[rgb(15,20,25)] dark:text-white">
                <Content tweet={tweet} keyword={store.keyword} />
                <Show when={tweet.quoted_tweet}>
                  <div class="relative inline-flex w-full items-center justify-center">
                    <hr class="my-8 h-1 w-64 rounded border-0 bg-gray-200 dark:bg-gray-700" />
                    <div class="absolute left-1/2 -translate-x-1/2 px-4">
                      <svg
                        class="h-4 w-4 text-gray-500 dark:text-gray-300"
                        aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="currentColor"
                        viewBox="0 0 18 14"
                      >
                        <path d="M6 0H2a2 2 0 0 0-2 2v4a2 2 0 0 0 2 2h4v1a3 3 0 0 1-3 3H2a1 1 0 0 0 0 2h1a5.006 5.006 0 0 0 5-5V2a2 2 0 0 0-2-2Zm10 0h-4a2 2 0 0 0-2 2v4a2 2 0 0 0 2 2h4v1a3 3 0 0 1-3 3h-1a1 1 0 0 0 0 2h1a5.006 5.006 0 0 0 5-5V2a2 2 0 0 0-2-2Z" />
                      </svg>
                    </div>
                  </div>
                  <Content tweet={tweet.quoted_tweet} isQuoted={true} />
                </Show>
              </div>
            </div>
          )}
        </For>
      </div>
    </div>
  )
}

export default Home
