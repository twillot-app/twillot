import { For } from 'solid-js'
import { useNavigate } from '@solidjs/router'

import dataStore from '../options/store'
import { OptionStoreField } from '../types'
import { updateAction } from '../libs/workflow/store'

const [store] = dataStore

export default function SettingsSelector(props) {
  const navigate = useNavigate()

  return (
    <select
      class="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 outline-none focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
      onChange={(e) => {
        if (e.currentTarget.value === '') {
          navigate('/workflows/settings')
          return
        }
        updateAction(
          props.workflowIndex,
          props.thenIndex,
          e.currentTarget.value,
        )
      }}
    >
      <option value="">Add a template</option>
      <For each={store[OptionStoreField[props.option_key]]}>
        {(template) => (
          <option
            value={template.content}
            selected={template.content === props.thenAction.inputs?.[0]}
          >
            {template.name}
          </option>
        )}
      </For>
    </select>
  )
}
