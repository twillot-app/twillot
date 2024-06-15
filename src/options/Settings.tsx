import { onMount } from 'solid-js'
import { getTemplates } from '../libs/workflow/store'
import SettingsPanel from '../components/SettingsPanel'

const Settings = () => {
  onMount(async () => {
    getTemplates('COMMENT_TEMPLATE')
    getTemplates('SIGNATURE_TEMPLATE')
  })

  return (
    <div class="container mx-auto p-4 text-base">
      <div class="flex items-center gap-8">
        <h1 class="mb-4 flex-1 text-2xl font-bold">Workflows / Settings</h1>
      </div>

      <SettingsPanel
        option_name="COMMENT_TEMPLATE"
        title="Reply Template"
        placeholder="Add a reply template"
      />
      <SettingsPanel
        option_name="SIGNATURE_TEMPLATE"
        title="Signature Template"
        placeholder="Add a signature template"
      />
    </div>
  )
}

export default Settings
