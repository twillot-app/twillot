import { onMount, Show } from 'solid-js'
import { Button } from '~/components/ui/button'
import { getLocal, setLocal } from 'utils/storage'
import {
  getLevel,
  isFreeLicense,
  LICENSE_KEY,
  MemberLevel,
} from 'utils/license'

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '~/components/ui/card'
import { Label } from '~/components/ui/label'
import { SwitchControl, SwitchThumb, Switch } from '~/components/ui/switch'
import {
  TextField,
  TextFieldInput,
  TextFieldTextArea,
} from '~/components/ui/text-field'
import { Separator } from '~/components/ui/separator'
import { PRICING_URL } from './member'
import DialogLicense from './License'
import store, { defaultState } from './store'
import { ProgressCircle } from '~/components/ui/progress-circle'

const [state, setState] = store
const updateField = (field: string, value: boolean | string) => {
  if (
    ['webhook', 'reply'].includes(field) &&
    isFreeLicense(state[LICENSE_KEY])
  ) {
    chrome.tabs.create({ url: PRICING_URL })
    return
  }
  const updates = { [field]: value }
  setLocal(updates)
  setState(updates)
}

const ExportCard = (props) => {
  const progress = (props.done / props.total) * 100
  return (
    <Card>
      <CardHeader>
        <CardTitle>{props.title}</CardTitle>
      </CardHeader>
      <CardContent>
        <div class="flex items-center justify-start space-x-5">
          <ProgressCircle value={progress} />
          <div>
            <p class="text-tremor-default text-tremor-content-strong dark:text-dark-tremor-content-strong font-medium">
              0 / 1990 ({Math.ceil(progress)}%)
            </p>
            <p class="text-tremor-default text-tremor-content dark:text-dark-tremor-content">
              {props.desc}
            </p>
          </div>
        </div>
      </CardContent>
      <CardFooter>
        <Button variant="outline" class="w-full">
          Export {props.title}
        </Button>
      </CardFooter>
    </Card>
  )
}

export default function App() {
  const level = () => getLevel(state[LICENSE_KEY])
  onMount(async () => {})

  return (
    <div class="mx-auto my-4 w-full space-y-8 text-base lg:w-[1024px]">
      <h1 class="my-6 text-center text-xl font-bold">
        Twillot Exporter for X/Twitter
      </h1>
      <div class="mx-4 flex flex-col flex-wrap justify-center gap-5 lg:mx-0 lg:flex-row">
        <ExportCard
          title="Posts"
          desc="Export your likes to X Bookmarks"
          done={0}
          total={1990}
        />{' '}
        <ExportCard
          title="Replies"
          desc="Export your likes to X Bookmarks"
          done={0}
          total={1990}
        />{' '}
        <ExportCard
          title="Media"
          desc="Export your likes to X Bookmarks"
          done={0}
          total={1990}
        />{' '}
        <ExportCard
          title="Likes"
          desc="Export your likes to X Bookmarks"
          done={0}
          total={1990}
        />{' '}
        <ExportCard
          title="Followers"
          desc="Export your likes to X Bookmarks"
          done={0}
          total={1990}
        />
        <ExportCard
          title="Bookmarks"
          desc="Export your likes to X Bookmarks"
          done={0}
          total={1990}
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
