import { createSignal } from 'solid-js'
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
  return (
    <Card class="m-4 w-80">
      <form
        onSubmit={(e) => {
          e.preventDefault()
          const { like, repost, reply } = e.target as HTMLFormElement
        }}
      >
        <CardHeader>
          <CardTitle>Twillot Bookmark Automation</CardTitle>
          <CardDescription>管理你的书签收藏自动化设置</CardDescription>
        </CardHeader>
        <CardContent class="grid gap-6">
          <div class="flex items-center justify-between space-x-2">
            <Label for="necessary" class="flex flex-col space-y-1">
              <span>Like</span>
              <span class="text-muted-foreground font-normal leading-snug">
                当我收藏推文时点赞该推文
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
                当我收藏推文时转发该推文
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
                当我收藏推文时评论该推文
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
      </form>
    </Card>
  )
}
