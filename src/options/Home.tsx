import { createEffect, For, Show } from 'solid-js'
import { A } from '@solidjs/router'

import dataStore from './store'
import { Content } from '../components/Tweet'
import { openPage } from '../libs/dom'
import { Host } from '../types'
import Contribution from '../components/Contribution'
import {
  IconChevronArrowDown,
  IconExpand,
  IconQuote,
} from '../components/Icons'
import FolderDropDown from '../components/FolderDropDown'
import TopN from '../components/TopN'
import FolderSelect from '../components/FolderSelect'
import { queryByCondition } from './handlers'

export const Home = () => {
  let listRef: HTMLDivElement
  const [store, setStore] = dataStore

  createEffect(() => {
    if (store.tweets.length > 0) {
      listRef.scrollTo(0, 0)
    }
  })

  return (
    <div
      class="mx-auto my-4 w-[48rem] flex-1 text-base text-black dark:text-white"
      onClick={openPage}
      ref={listRef!}
    >
      <div class="mb-4">
        <Contribution />
      </div>

      <div class="relative mb-6 rounded-md py-4">
        <h3 class="text-lg font-medium">Top 10 Authors from your bookmarks</h3>

        <div class="flex justify-center">
          <Show
            when={store.topUsers.length > 0}
            fallback={<div class="h-[480px] w-[480px]"></div>}
          >
            <TopN users={store.topUsers} stageSize={480} />
          </Show>
        </div>
      </div>

      <div class="mb-4">
        <h3 class="mb-4 text-lg font-medium">
          {store.keyword || store.category
            ? `Search results:`
            : 'Recent bookmarks:'}{' '}
          <div class="relative float-right pr-2">
            <FolderDropDown />
          </div>
        </h3>
        <For each={store.tweets}>
          {(tweet, index) => (
            <div class="rounded-md p-2 hover:bg-[#121212] hover:bg-opacity-5">
              <div class="flex flex-shrink-0 pb-0">
                <div class="flex w-full items-start ">
                  <div class="mr-2">
                    <A href={`/?q=from:${tweet.screen_name}`}>
                      <img
                        class="inline-block h-10 w-10 rounded-full"
                        src={tweet.avatar_url.replace('_normal', '_x96')}
                        alt="avatar"
                      />
                    </A>
                  </div>
                  <p class="cursor-pointer text-base font-bold leading-6 text-black dark:text-white">
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
                  <div class="flex flex-1 items-center justify-end gap-4 *:cursor-pointer">
                    <span>
                      <FolderSelect tweet={tweet} />
                    </span>
                    <span
                      onClick={() =>
                        setStore({
                          selectedTweet: index(),
                        })
                      }
                    >
                      <IconExpand />
                    </span>
                  </div>
                </div>
              </div>
              <div class="-mt-2 pl-12 text-[rgb(15,20,25)] dark:text-white">
                <Content tweet={tweet} keyword={store.keyword} />
                <Show when={tweet.quoted_tweet}>
                  <div class="relative inline-flex w-full items-center justify-center">
                    <hr class="my-8 h-1 w-64 rounded border-0 bg-gray-200 dark:bg-gray-700" />
                    <div class="absolute left-1/2 -translate-x-1/2 px-4">
                      <IconQuote />
                    </div>
                  </div>
                  <Content tweet={tweet.quoted_tweet} isQuoted={true} />
                </Show>
              </div>
            </div>
          )}
        </For>
        <Show
          when={store.hasMore}
          fallback={
            <p class="my-24 text-center text-gray-400">
              Total records: {store.tweets.length}
            </p>
          }
        >
          <p
            class="my-6 flex justify-center text-blue-500"
            onClick={() => queryByCondition(true)}
          >
            <IconChevronArrowDown />
          </p>
        </Show>
      </div>
    </div>
  )
}

export default Home
