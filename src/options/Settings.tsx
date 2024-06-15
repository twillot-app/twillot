import { createEffect, createSignal } from 'solid-js'
import { For, onMount } from 'solid-js'
import dataStore, { mutateStore } from './store'
import { upsertConfig } from '../libs/db/configs'
import { OptionName } from '../types'
import { getTemplates } from '../libs/workflow/store'
import SettingsPanel from '../components/SettingsPanel'

const [store, setStore] = dataStore

const Settings = () => {
  const [newContent, setNewContent] = createSignal('')
  const [editingIndex, setEditingIndex] = createSignal(-1)
  const [editingName, setEditingName] = createSignal('')
  const [editingContent, setEditingContent] = createSignal('')

  onMount(async () => {
    getTemplates('COMMENT_TEMPLATE')
    getTemplates('SIGNATURE_TEMPLATE')
  })

  createEffect(async () => {
    const templates = store.templates.map((t) => ({ ...t }))
    await upsertConfig({
      option_name: OptionName.COMMENT_TEMPLATE,
      option_value: templates,
    })
  })

  const addTemplate = (e) => {
    e.preventDefault()
    const content = newContent().trim()
    if (!content || store.templates.some((t) => t.content === content)) {
      return
    }
    const newTemplate = {
      id: new Date().getTime().toString(16),
      name: `Untitled ${store.templates.length + 1}`,
      content,
      createdAt: Math.floor(new Date().getTime() / 1000),
    }
    setStore('templates', [newTemplate, ...store.templates])
    setNewContent('')
    setEditingIndex(-1)
  }

  const saveEdit = (index: number) => {
    const content = editingContent().trim()
    if (
      !content ||
      store.templates.some((t, i) => t.content === content && i !== index)
    ) {
      return
    }
    setStore('templates', index, 'name', editingName())
    setStore('templates', index, 'content', content)
    setEditingIndex(-1)
  }

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
