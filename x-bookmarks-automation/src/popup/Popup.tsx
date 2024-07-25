import { onMount, Show } from 'solid-js'
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
import { TextField, TextFieldTextArea } from '~/components/ui/text-field'

const defaultState = () => ({
  like: true,
  repost: true,
  reply: false,
  reply_text: '',
  webhook: false,
  webhook_url: '',
  webhook_token: '',
  saved: false,
})
const [state, setState] = createStore(defaultState)
const updateField = (field: string, value: boolean | string) => {
  const updates = { [field]: value }
  setLocal(updates)
  setState(updates)
}

const SwitchContainer = (props) => {
  return (
    <Switch
      checked={state[props.name]}
      name={props.name}
      onChange={() => {
        updateField(props.name, !state[props.name])
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
    const local = await getLocal([
      'like',
      'repost',
      'reply',
      'webhook',
      'webhook_url',
      'webhook_token',
      'reply_text',
    ])
    const defaults = defaultState()
    setState({
      like: local.like === undefined ? defaults.like : local.like,
      repost: local.repost === undefined ? defaults.repost : local.repost,
      reply: local.reply === undefined ? defaults.reply : local.reply,
      webhook: local.webhook === undefined ? defaults.webhook : local.webhook,
      reply_text: local.reply_text || '',
      webhook_url: local.webhook_url || '',
      webhook_token: local.webhook_token || '',
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
        <Show when={state['reply']}>
          <div class="grid gap-2">
            <TextField name="reply_text">
              <TextFieldTextArea
                placeholder="输入回复的文本（可以包含链接，为了达到最佳效果请设置您的 Open Graph 元数据）"
                maxLength={280}
                onInput={(e) =>
                  updateField('reply_text', e.currentTarget.value)
                }
              />
            </TextField>
          </div>
        </Show>
        <div class="flex items-center justify-between space-x-2">
          <Label class="flex flex-col space-y-1">
            <span>Webhook</span>
            <span class="text-muted-foreground font-normal leading-snug">
              转发该推文到一个 Webhook 接口
            </span>
          </Label>
          <SwitchContainer name="webhook" />
        </div>
        <Show when={state['webhook']}>
          <div class="grid gap-2">
            <TextField name="webhook_url">
              <TextFieldTextArea
                placeholder="输入您的 Webhook 地址，例如 https://example.com/webhook"
                onInput={(e) =>
                  updateField('webhook_url', e.currentTarget.value)
                }
              />
            </TextField>
            <TextField name="webhook_token">
              <TextFieldTextArea
                placeholder="输入您的 Token"
                onInput={(e) =>
                  updateField('webhook_token', e.currentTarget.value)
                }
              />
            </TextField>
          </div>
          <a href="#">Export All your bookmarks Now</a>
        </Show>
      </CardContent>
    </Card>
  )
}
