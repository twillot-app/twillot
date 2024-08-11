import { onMount, Show } from 'solid-js'
import { Button } from '~/components/ui/button'
import { getCurrentUserId } from 'utils/storage'
import useAuth from 'utils/hooks/useAuth'
import {
  getFollowers,
  getLikes,
  getMedia,
  getPosts,
  getReplies,
} from 'utils/api/twitter-user'
import {
  getLevel,
  isFreeLicense,
  LICENSE_KEY,
  MemberLevel,
} from 'utils/license'

import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '~/components/ui/card'
import { Separator } from '~/components/ui/separator'
import { PRICING_URL } from './member'
import DialogLicense from './License'
import store, { TASK_STATE_TEXT } from './store'
import { ProgressCircle } from '~/components/ui/progress-circle'
import { Badge } from '~/components/ui/badge'
import { Endpoint } from 'utils/types'
import { startSyncAll, startSyncRecent, summary } from './sync'
import { FetchError } from 'utils/xfetch'

const [state, setState] = store
const level = () => getLevel(state[LICENSE_KEY])
const handler = (format: 'csv' | 'json', category: string) => {
  if (format === 'json' && level() === MemberLevel.Free) {
    chrome.tabs.create({ url: PRICING_URL })
    return
  }
}

function syncAll(uid: string) {
  startSyncAll(uid, 'posts', getPosts, Endpoint.USER_TWEETS)
  startSyncAll(uid, 'replies', getReplies, Endpoint.USER_TWEETS_AND_REPLIES)
  startSyncAll(uid, 'likes', getLikes, Endpoint.USER_LIKES)
  startSyncAll(uid, 'media', getMedia, Endpoint.USER_MEDIA)
  startSyncAll(uid, 'followers', getFollowers, Endpoint.FOLLOWERS)
}

const ExportCard = (props: {
  category: string
  title: string
  desc: string
}) => {
  const field = () => state[props.category]
  const progress = () => Math.ceil((100 * field().done) / field().total)
  const status = () => TASK_STATE_TEXT[state[props.category].state]
  const req_time = () =>
    field().reset
      ? 'Continues at ' + new Date(field().reset * 1000).toLocaleTimeString()
      : props.desc

  return (
    <Card class="min-w-[360px]">
      <CardHeader>
        <CardTitle class="flex">
          <div class="flex-1">{props.title}</div>
          <Badge variant="secondary">{status()}</Badge>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div class="flex items-center justify-start space-x-5">
          <ProgressCircle value={progress()} />
          <div>
            <p class="text-tremor-default text-tremor-content-strong dark:text-dark-tremor-content-strong font-medium">
              {field().done} / {field().total}
            </p>
            <p class="text-tremor-default text-tremor-content dark:text-dark-tremor-content text-xs">
              {req_time()}
            </p>
          </div>
        </div>
      </CardContent>
      <CardFooter class="gap-6">
        <Button
          variant="outline"
          class="w-1/2"
          onClick={() => handler('csv', props.category)}
        >
          Export CSV
        </Button>
        <Button
          variant="outline"
          class="w-1/2"
          onClick={() => handler('json', props.category)}
        >
          Export JSON
        </Button>
      </CardFooter>
    </Card>
  )
}

export default function App() {
  const { isAuthFailed, startAuth, isAuthenicating, setIsAuthFailed } =
    useAuth()

  onMount(async () => {
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
        <ExportCard
          title="Posts"
          desc="这里的数字可能不准确"
          category="posts"
        />
        <ExportCard
          title="Replies"
          desc="这里的数字可能不准确"
          category="replies"
        />
        <ExportCard title="Media" desc="包含图片和视频" category="media" />
        <ExportCard
          title="Likes"
          desc="这里的数字可能不准确"
          category="likes"
        />
        <ExportCard
          title="Followers"
          desc="这里的数字可能随时变化"
          category="followers"
        />
        <ExportCard
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
    </div>
  )
}
