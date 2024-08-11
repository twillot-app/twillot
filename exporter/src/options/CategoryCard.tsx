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
import { PRICING_URL } from './member'
import { getLevel, LICENSE_KEY, MemberLevel } from 'utils/license'

interface CategoryCardProps {
  category: string
  title: string
  desc: string
}

const [state, setState] = store
const level = () => getLevel(state[LICENSE_KEY])
const handler = (format: 'csv' | 'json', category: string) => {
  if (format === 'json' && level() === MemberLevel.Free) {
    showToast({
      title: 'WARNING',
      description: 'Please upgrade your account to export JSON',
      variant: 'warning',
    })
    setTimeout(() => {
      chrome.tabs.create({ url: PRICING_URL })
    }, 2000)
    return
  }
}

export default function CategoryCard(props: CategoryCardProps) {
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
