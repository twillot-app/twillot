import { Show } from 'solid-js'

import { exportData } from 'utils/exporter'
import { getLevel, LICENSE_KEY, MemberLevel } from 'utils/license'
import { getCurrentUserId } from 'utils/storage'
import { Tweet, User } from 'utils/types'

import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '~/components/ui/card'
import { ProgressCircle } from '~/components/ui/progress-circle'
import { Badge } from '~/components/ui/badge'
import { Button } from '~/components/ui/button'
import { showToast } from '~/components/ui/toast'

import store, { TASK_STATE_TEXT } from './store'
import { queryByCategory } from './sync'
import { Category } from './types'
import { MEMBER_LEVELS, PRICING_URL } from './member'

function toUser(user: User) {
  return {
    id: user.rest_id,
    is_blue_verified: user.is_blue_verified,
    can_dm: user.legacy.can_dm,
    // User 不用转
    created_at: new Date(user.legacy.created_at).toISOString(),
    description: user.legacy.description,
    followed_by: user.legacy.followed_by,
    following: user.legacy.following,
    followers_count: user.legacy.followers_count,
    friends_count: user.legacy.friends_count,
    location: user.legacy.location,
    media_count: user.legacy.media_count,
    name: user.legacy.name,
    possibly_sensitive: user.legacy.possibly_sensitive,
    profile_banner_url: user.legacy.profile_banner_url,
    profile_image_url: user.legacy.profile_image_url_https,
    screen_name: user.legacy.screen_name,
    statuses_count: user.legacy.statuses_count,
    url: user.legacy.url,
  }
}

interface CategoryCardProps {
  category: Category
  title: string
  desc: string
}

const [state] = store
const level = () => getLevel(state[LICENSE_KEY])
const exportByCategory = async (format: 'csv' | 'json', category: Category) => {
  const uid = await getCurrentUserId()
  if (!uid) {
    showToast({
      description: 'Please authenticate to export',
      variant: 'warning',
    })
    return
  }

  let json: any[]

  if (category === 'followers') {
    const users = await queryByCategory<User>(uid, category)
    json = users.map(toUser)
  } else {
    const items = await queryByCategory<Tweet>(uid, category)
    json = items.map((i) => ({
      ...i,
      created_at: new Date(i.created_at * 1000).toISOString(),
    }))
  }
  const limit = MEMBER_LEVELS[level()].exportLimit
  const need_upgrade = json.length > limit
  json = json
    .slice(0, limit)
    .sort(
      (a, b) =>
        new Date(b.created_at).getTime() - new Date(a.created_at).getTime(),
    )
  if (format === 'json') {
    exportData(json, 'JSON', `twillot-export-${category}.json`)
  } else if (format === 'csv') {
    exportData(json, 'CSV', `twillot-export-${category}.csv`)
  }
  if (need_upgrade) {
    showToast({
      title: 'Export Limitation',
      description: `Current account is limited to export ${limit} items, please upgrade your account to export more items.`,
      variant: 'warning',
    })
    setTimeout(() => {
      if (level() === MemberLevel.Free) {
        chrome.tabs.create({ url: PRICING_URL })
      }
    }, 3000)
  }
}

export default function CategoryCard(props: CategoryCardProps) {
  const field = () => state[props.category]
  const is_bookmark = () => props.category === 'bookmarks'
  const progress = () =>
    is_bookmark() ? 0 : Math.ceil((100 * field().done) / field().total)
  const status = () => TASK_STATE_TEXT[state[props.category].state]
  const req_time = () =>
    field().reset
      ? 'Next request at ' + new Date(field().reset * 1000).toLocaleTimeString()
      : props.desc
  const progressText = () =>
    is_bookmark() ? '0 / 0' : `${field().done} / ${field().total}`

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
              {progressText()}
            </p>
            <p class="text-tremor-default text-tremor-content dark:text-dark-tremor-content text-xs">
              {req_time()}
            </p>
          </div>
        </div>
      </CardContent>
      <CardFooter class="gap-6">
        <Show
          when={is_bookmark()}
          fallback={
            <>
              <Button
                variant="outline"
                class="w-1/2"
                onClick={() => exportByCategory('csv', props.category)}
              >
                Export CSV
              </Button>
              <Button
                variant="outline"
                class="w-1/2"
                onClick={() => exportByCategory('json', props.category)}
              >
                Export JSON
              </Button>
            </>
          }
        >
          <Button
            variant="outline"
            class="w-full"
            onClick={() =>
              chrome.tabs.create({
                url: 'https://s.twillot.com/organize-x-bookmarks',
              })
            }
          >
            Get Twillot Bookmarks for X
          </Button>
        </Show>
      </CardFooter>
    </Card>
  )
}
