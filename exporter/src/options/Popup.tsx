import { onMount, Show } from 'solid-js'

import { getCurrentUserId } from 'utils/storage'
import useAuth from 'utils/hooks/useAuth'
import {
  getFollowers,
  getLikes,
  getMedia,
  getPosts,
  getReplies,
} from 'utils/api/twitter-user'
import { getLevel, LICENSE_KEY, MemberLevel } from 'utils/license'
import { Endpoint } from 'utils/types'
import { FetchError } from 'utils/xfetch'

import { Button } from '~/components/ui/button'
import { Separator } from '~/components/ui/separator'
import { Toaster } from '~/components/ui/toast'
import CategoryCard from './CategoryCard'
import { PRICING_URL } from './member'
import DialogLicense from './License'
import store from './store'
import { initDb, startSyncAll, startSyncRecent, summary } from './sync'

const [state, setState] = store
const level = () => getLevel(state[LICENSE_KEY])

function syncAll(uid: string) {
  startSyncAll(uid, 'posts', getPosts, Endpoint.USER_TWEETS)
  startSyncAll(uid, 'replies', getReplies, Endpoint.USER_TWEETS_AND_REPLIES)
  startSyncAll(uid, 'likes', getLikes, Endpoint.USER_LIKES)
  startSyncAll(uid, 'media', getMedia, Endpoint.USER_MEDIA)
  startSyncAll(uid, 'followers', getFollowers, Endpoint.FOLLOWERS)
}

export default function App() {
  const { isAuthFailed, startAuth, isAuthenicating, setIsAuthFailed } =
    useAuth()

  onMount(async () => {
    await initDb()
    const uid = await getCurrentUserId()

    try {
      await summary(uid)
    } catch (e) {
      console.error(e)
      if (e.name === FetchError.IdentityError) {
        setIsAuthFailed(true)
        return
      }
    }

    await Promise.all([
      startSyncRecent(uid, 'posts', getPosts, Endpoint.USER_TWEETS),
      startSyncRecent(
        uid,
        'replies',
        getReplies,
        Endpoint.USER_TWEETS_AND_REPLIES,
      ),
      startSyncRecent(uid, 'likes', getLikes, Endpoint.USER_LIKES),
      startSyncRecent(uid, 'media', getMedia, Endpoint.USER_MEDIA),
      startSyncRecent(uid, 'followers', getFollowers, Endpoint.FOLLOWERS),
    ])

    await summary(uid)

    syncAll(uid)
  })
  return (
    <div class="mx-auto my-4 w-full space-y-8 text-base lg:w-[1024px]">
      <h1 class="my-6 text-center text-xl font-bold">
        Twillot Exporter for X/Twitter
      </h1>
      <Show when={isAuthFailed()}>
        <p class="text-muted-foreground text-center text-lg">
          <Show
            when={isAuthenicating()}
            fallback={
              <Button variant="link" class="text-lg" onClick={startAuth}>
                Click here to authenticate
              </Button>
            }
          >
            Authenticating, please wait...
          </Show>
        </p>
      </Show>
      <div class="mx-4 flex flex-col flex-wrap justify-center gap-5 lg:mx-0 lg:flex-row">
        <CategoryCard
          title="Posts"
          desc="这里的数字可能不准确"
          category="posts"
        />
        <CategoryCard
          title="Replies"
          desc="这里的数字可能不准确"
          category="replies"
        />
        <CategoryCard title="Media" desc="包含图片和视频" category="media" />
        <CategoryCard
          title="Likes"
          desc="这里的数字可能不准确"
          category="likes"
        />
        <CategoryCard
          title="Followers"
          desc="这里的数字可能随时变化"
          category="followers"
        />
        <CategoryCard
          title="Bookmarks"
          desc="导出书签请使用 Twillot Bookmarks for X"
          category="bookmarks"
        />
      </div>
      <Show when={level() === MemberLevel.Free}>
        <div class="text-muted-foreground flex items-center justify-center space-x-4 text-base">
          <a
            href={PRICING_URL}
            target="_blank"
            class="text-muted-foreground underline underline-offset-4"
          >
            Upgrade
          </a>
          <Separator orientation="vertical" />
          <span
            class="cursor-pointer underline underline-offset-4"
            onClick={() => setState({ is_dialog_open: true })}
          >
            Activate
          </span>
          <DialogLicense />
          <Separator orientation="vertical" />
          <a
            href="https://s.twillot.com/organize-x-bookmarks"
            target="_blank"
            class="text-muted-foreground underline underline-offset-4"
          >
            Export X Bookmarks
          </a>
        </div>
      </Show>
      <Toaster />
    </div>
  )
}
