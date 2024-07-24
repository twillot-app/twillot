import { onMount } from 'solid-js'
import { createStore } from 'solid-js/store'
import { getLocal, setLocal } from 'utils/storage'

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '~/components/ui/card'
import { Label } from '~/components/ui/label'
import { Switch, SwitchControl, SwitchThumb } from '~/components/ui/switch'

const defaultState = () => ({
  like: true,
  repost: true,
  reply: false,
  webhook: false,
  saved: false,
})
const [state, setState] = createStore(defaultState)

const SwitchContainer = (props) => {
  return (
    <Switch
      checked={state[props.name]}
      name={props.name}
      onChange={() => {
        const updates = { [props.name]: !state[props.name] }
        setLocal(updates)
        setState(updates)
      }}
    >
      <SwitchControl>
        <SwitchThumb />
      </SwitchControl>
    </Switch>
  )
}

export default function App() {
  onMount(async () => {
    const local = await getLocal(['like', 'repost', 'reply', 'webhook'])
    const defaults = defaultState()
    setState({
      like: local.like === undefined ? defaults.like : local.like,
      repost: local.repost === undefined ? defaults.repost : local.repost,
      reply: local.reply === undefined ? defaults.reply : local.reply,
      webhook: local.webhook === undefined ? defaults.webhook : local.webhook,
    })
  })

  return (
    <Card class="m-4 w-96">
      <CardHeader>
        <CardTitle>Twillot Bookmark Automation</CardTitle>
        <CardDescription>
          Manage your bookmark automation settings
        </CardDescription>
      </CardHeader>
      <CardContent class="grid gap-6">
        <div class="flex items-center justify-between space-x-2">
          <Label for="like" class="flex flex-col space-y-1">
            <span>Like</span>
            <span class="text-muted-foreground font-normal leading-snug">
              Like the tweet when I bookmark it
            </span>
          </Label>
          <SwitchContainer name="like" />
        </div>
        <div class="flex items-center justify-between space-x-2">
          <Label class="flex flex-col space-y-1">
            <span>Repost</span>
            <span class="text-muted-foreground font-normal leading-snug">
              Repost the tweet when I bookmark it
            </span>
          </Label>
          <SwitchContainer name="repost" />
        </div>
        <div class="flex items-center justify-between space-x-2">
          <Label class="flex flex-col space-y-1">
            <span>Reply</span>
            <span class="text-muted-foreground font-normal leading-snug">
              Reply to the tweet when I bookmark it
            </span>
          </Label>
          <SwitchContainer name="reply" />
        </div>
        <div class="flex items-center justify-between space-x-2">
          <Label class="flex flex-col space-y-1">
            <span>Webhook</span>
            <span class="text-muted-foreground font-normal leading-snug">
              转发该推文到一个 Webhook 接口
            </span>
          </Label>
          <SwitchContainer name="webhook" />
        </div>
      </CardContent>
    </Card>
  )
}
