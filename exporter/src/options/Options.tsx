import { onMount, Show } from 'solid-js'

import { getLocal, StorageKeys } from 'utils/storage'
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
    const [local, _] = await Promise.all([
      getLocal([StorageKeys.Current_UID, LICENSE_KEY]),
      initDb(),
    ])
    const uid = local[StorageKeys.Current_UID]
    const license = local[LICENSE_KEY]
    setState({ [LICENSE_KEY]: license })

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
          desc="Numbers might not be 100% accurate"
          category="posts"
        />
        <CategoryCard
          title="Replies"
          desc="Numbers might not be 100% accurate"
          category="replies"
        />
        <CategoryCard
          title="Media"
          desc="Includes photos and videos"
          category="media"
        />
        <CategoryCard
          title="Likes"
          desc="Numbers might not be 100% accurate"
          category="likes"
        />
        <CategoryCard
          title="Followers"
          desc="Numbers can change at any time"
          category="followers"
        />
        <CategoryCard
          title="Bookmarks"
          desc="Use Twillot Bookmarks for X to export"
          category="bookmarks"
        />
      </div>
      <div class="text-muted-foreground flex items-center justify-center space-x-4 text-base">
        <Show when={level() !== MemberLevel.Pro}>
          <a
            href={PRICING_URL}
            target="_blank"
            class="text-muted-foreground underline underline-offset-4"
          >
            Upgrade to {level() === MemberLevel.Free ? 'Basic' : 'Pro'} Plan
          </a>
        </Show>
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
      <Toaster />
    </div>
  )
}
