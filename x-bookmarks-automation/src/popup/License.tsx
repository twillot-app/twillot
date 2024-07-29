import { createSignal } from 'solid-js'
import { activateLicense, LICENSE_KEY } from 'utils/license'
import { Button } from '~/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '~/components/ui/dialog'
import { TextField, TextFieldInput } from '~/components/ui/text-field'
import store from './store'

const [state, setState] = store

export default function DialogLicense() {
  const [key, setKey] = createSignal('')
  const activate = async () => {
    if (!key()) {
      return
    }

    try {
      const profile = await activateLicense(key())
      setState({
        [LICENSE_KEY]: profile,
      })
    } catch (error) {
      console.error(error)
      alert(error.message)
    }
  }
  return (
    <Dialog>
      <DialogTrigger class="underline underline-offset-4">
        Activate
      </DialogTrigger>
      <DialogContent class="w-10/12">
        <DialogHeader>
          <DialogTitle>Activate</DialogTitle>
        </DialogHeader>
        <TextField>
          <TextFieldInput
            placeholder="Enter your license key to upgrade your account"
            value={key()}
            name="license"
            type="text"
            onInput={(e) => setKey(e.currentTarget.value)}
          />
        </TextField>
        <DialogFooter>
          <Button type="button" onClick={activate}>
            Upgrade Now
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
