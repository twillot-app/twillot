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
import {
  TextField,
  TextFieldInput,
  TextFieldTextArea,
} from '~/components/ui/text-field'
import { Separator } from '~/components/ui/separator'

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

const UpgradeLink = (props) => {
  return (
    <a
      class="flex underline underline-offset-4"
      href="https://twillot.com/x-bookmarks-automation/pricing?utm_source=ext"
      target="_blank"
    >
      <span class="mr-1 text-yellow-400">
        <svg class="h-5 w-5" viewBox="0 0 24 24">
          <path
            fill="currentColor"
            d="M5 16L3 5l5.5 5L12 4l3.5 6L21 5l-2 11zm14 3c0 .6-.4 1-1 1H6c-.6 0-1-.4-1-1v-1h14z"
          />
        </svg>
      </span>
      {props.text}
    </a>
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
    console.log({ local })
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
    <Card class="m-4 w-96 text-sm">
      <CardHeader>
        <CardTitle>Twillot X Bookmark Automation</CardTitle>
        <CardDescription>
          Manage your bookmark automation settings
        </CardDescription>
      </CardHeader>
      <CardContent class="grid gap-6">
        <div class="flex items-center justify-between space-x-2">
          <div class="flex items-center">
            <svg viewBox="0 0 24 24" class="text-muted-foreground mr-2 h-6 w-6">
              <g>
                <path
                  fill="currentColor"
                  d="M16.697 5.5c-1.222-.06-2.679.51-3.89 2.16l-.805 1.09-.806-1.09C9.984 6.01 8.526 5.44 7.304 5.5c-1.243.07-2.349.78-2.91 1.91-.552 1.12-.633 2.78.479 4.82 1.074 1.97 3.257 4.27 7.129 6.61 3.87-2.34 6.052-4.64 7.126-6.61 1.111-2.04 1.03-3.7.477-4.82-.561-1.13-1.666-1.84-2.908-1.91zm4.187 7.69c-1.351 2.48-4.001 5.12-8.379 7.67l-.503.3-.504-.3c-4.379-2.55-7.029-5.19-8.382-7.67-1.36-2.5-1.41-4.86-.514-6.67.887-1.79 2.647-2.91 4.601-3.01 1.651-.09 3.368.56 4.798 2.01 1.429-1.45 3.146-2.1 4.796-2.01 1.954.1 3.714 1.22 4.601 3.01.896 1.81.846 4.17-.514 6.67z"
                ></path>
              </g>
            </svg>
            <Label for="like" class="flex flex-col space-y-1">
              <span>Like</span>
              <span class="text-muted-foreground font-normal leading-snug">
                Like the tweet when I bookmark it
              </span>
            </Label>
          </div>
          <SwitchContainer name="like" />
        </div>
        <div class="flex items-center justify-between space-x-2">
          <div class="flex items-center">
            <svg viewBox="0 0 24 24" class="text-muted-foreground mr-2 h-6 w-6">
              <g>
                <path
                  fill="currentColor"
                  d="M4.5 3.88l4.432 4.14-1.364 1.46L5.5 7.55V16c0 1.1.896 2 2 2H13v2H7.5c-2.209 0-4-1.79-4-4V7.55L1.432 9.48.068 8.02 4.5 3.88zM16.5 6H11V4h5.5c2.209 0 4 1.79 4 4v8.45l2.068-1.93 1.364 1.46-4.432 4.14-4.432-4.14 1.364-1.46 2.068 1.93V8c0-1.1-.896-2-2-2z"
                ></path>
              </g>
            </svg>
            <Label class="flex flex-col space-y-1">
              <span>Repost</span>
              <span class="text-muted-foreground font-normal leading-snug">
                Repost the tweet when I bookmark it
              </span>
            </Label>
          </div>
          <SwitchContainer name="repost" />
        </div>
        <div class="flex items-center justify-between space-x-2">
          <div class="flex items-center">
            <svg viewBox="0 0 24 24" class="text-muted-foreground mr-2 h-6 w-6">
              <g>
                <path
                  fill="currentColor"
                  d="M1.751 10c0-4.42 3.584-8 8.005-8h4.366c4.49 0 8.129 3.64 8.129 8.13 0 2.96-1.607 5.68-4.196 7.11l-8.054 4.46v-3.69h-.067c-4.49.1-8.183-3.51-8.183-8.01zm8.005-6c-3.317 0-6.005 2.69-6.005 6 0 3.37 2.77 6.08 6.138 6.01l.351-.01h1.761v2.3l5.087-2.81c1.951-1.08 3.163-3.13 3.163-5.36 0-3.39-2.744-6.13-6.129-6.13H9.756z"
                ></path>
              </g>
            </svg>
            <Label class="flex flex-col space-y-1">
              <div class="flex flex-row items-center gap-2">
                Reply <UpgradeLink />
              </div>
              <span class="text-muted-foreground font-normal leading-snug">
                Reply to the tweet when I bookmark it
              </span>
            </Label>
          </div>
          <SwitchContainer name="reply" />
        </div>
        <Show when={state['reply']}>
          <div class="grid gap-2">
            <TextField name="reply_text">
              <TextFieldTextArea
                placeholder="输入回复的文本（可以包含链接，为了达到最佳效果请设置您的 Open Graph 元数据）"
                maxLength={280}
                value={state['reply_text']}
                onInput={(e) =>
                  updateField('reply_text', e.currentTarget.value)
                }
              />
            </TextField>
          </div>
        </Show>
        <div class="flex items-center justify-between space-x-2">
          <div class="flex items-center">
            <svg viewBox="0 0 24 24" class="text-muted-foreground mr-2 h-6 w-6">
              <g>
                <path
                  fill="currentColor"
                  d="M12 2.59l5.7 5.7-1.41 1.42L13 6.41V16h-2V6.41l-3.3 3.3-1.41-1.42L12 2.59zM21 15l-.02 3.51c0 1.38-1.12 2.49-2.5 2.49H5.5C4.11 21 3 19.88 3 18.5V15h2v3.5c0 .28.22.5.5.5h12.98c.28 0 .5-.22.5-.5L19 15h2z"
                ></path>
              </g>
            </svg>
            <Label class="flex flex-col space-y-1">
              <div class="flex flex-row items-center gap-2">
                Webhook <UpgradeLink />
              </div>
              <span class="text-muted-foreground font-normal leading-snug">
                转发该推文到一个 Webhook 接口
              </span>
            </Label>
          </div>
          <SwitchContainer name="webhook" />
        </div>
        <Show when={state['webhook']}>
          <div class="grid gap-2">
            <TextField name="webhook_url">
              <TextFieldInput
                type="text"
                placeholder="输入您的 Webhook 地址，例如 https://example.com/webhook"
                value={state['webhook_url']}
                onInput={(e) =>
                  updateField('webhook_url', e.currentTarget.value)
                }
              />
            </TextField>
            <TextField name="webhook_token">
              <TextFieldInput
                type="text"
                placeholder="输入您的 Token"
                value={state['webhook_token']}
                onInput={(e) =>
                  updateField('webhook_token', e.currentTarget.value)
                }
              />
            </TextField>
          </div>
        </Show>
        <div class="text-muted-foreground flex items-center justify-center space-x-4 text-xs">
          <UpgradeLink text="Upgrade" />
          <Separator orientation="vertical" />
          <a
            class="underline underline-offset-4"
            href="https://s.twillot.com/organize-x-bookmarks"
            target="_blank"
          >
            Organize Bookmarks
          </a>
          <Separator orientation="vertical" />
          <a
            class="underline underline-offset-4"
            href="https://x.com/i/communities/1796857620672008306"
            target="_blank"
          >
            Community
          </a>
        </div>
      </CardContent>
    </Card>
  )
}
