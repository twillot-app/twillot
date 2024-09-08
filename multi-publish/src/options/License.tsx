import { createSignal } from 'solid-js'
import { activateLicense, LICENSE_KEY } from 'utils/license'
import { ProductName } from 'utils/types/product'
import { Button } from '~/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
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
      const profile = await activateLicense(key(), ProductName.Exporter)
      setState({
        [LICENSE_KEY]: profile,
        is_dialog_open: false,
      })
    } catch (error) {
      console.error(error)
    }
  }
  return (
    <Dialog
      open={state['is_dialog_open']}
      onOpenChange={(isOpen) => setState({ is_dialog_open: isOpen })}
    >
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
