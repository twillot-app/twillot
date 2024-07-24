import { createSignal, createEffect, Show } from 'solid-js'
import { setLocal } from 'utils/storage'

import { Button } from '~/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '~/components/ui/card'
import { Label } from '~/components/ui/label'
import { Switch, SwitchControl, SwitchThumb } from '~/components/ui/switch'

export default function App() {
  const [saved, setSaved] = createSignal(false)
  createEffect(() => {
    if (saved()) {
      setTimeout(() => {
        setSaved(false)
      }, 3000)
    }
  })

  return (
    <Card class="m-4 w-96">
      <form
        onSubmit={(e) => {
          e.preventDefault()
          const { like, repost, reply } = e.target as HTMLFormElement
          setLocal({
            like: like.checked,
            repost: repost.checked,
            reply: reply.checked,
          })
          setSaved(true)
        }}
      >
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
            <Switch defaultChecked name="like">
              <SwitchControl>
                <SwitchThumb />
              </SwitchControl>
            </Switch>
          </div>
          <div class="flex items-center justify-between space-x-2">
            <Label class="flex flex-col space-y-1">
              <span>Repost</span>
              <span class="text-muted-foreground font-normal leading-snug">
                Repost the tweet when I bookmark it
              </span>
            </Label>
            <Switch defaultChecked name="repost">
              <SwitchControl>
                <SwitchThumb />
              </SwitchControl>
            </Switch>
          </div>
          <div class="flex items-center justify-between space-x-2">
            <Label class="flex flex-col space-y-1">
              <span>Reply</span>
              <span class="text-muted-foreground font-normal leading-snug">
                Reply to the tweet when I bookmark it
              </span>
            </Label>
            <Switch name="reply">
              <SwitchControl>
                <SwitchThumb />
              </SwitchControl>
            </Switch>
          </div>
          <div class="flex items-center justify-between space-x-2">
            <Label class="flex flex-col space-y-1">
              <span>Webhook</span>
              <span class="text-muted-foreground font-normal leading-snug">
                转发该推文到一个 Webhook 接口
              </span>
            </Label>
            <Switch name="reply">
              <SwitchControl>
                <SwitchThumb />
              </SwitchControl>
            </Switch>
          </div>
        </CardContent>
        <CardFooter>
          <Button variant="outline" class="w-full" type="submit">
            Save preferences
          </Button>
        </CardFooter>
        <Show when={saved()}>
          <p class="-mt-4 mb-4 block text-center text-green-600">
            Your changes have been saved successfully
          </p>
        </Show>
      </form>
    </Card>
  )
}
