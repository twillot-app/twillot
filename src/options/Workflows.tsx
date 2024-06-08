import { For, onMount, Show } from 'solid-js'

import dataStore from '../options/store'
import { IconArrow, IconPlus, IconTrash } from '../components/Icons'
import {
  addThen,
  addWorkflow,
  renameWorkflow,
  getWorkflows,
  removeThen,
  removeWorkflow,
  saveWorkflow,
  updateThen,
  updateWhen,
  getTemplates,
  updateAction,
} from '../libs/workflow/store'
import { useNavigate } from '@solidjs/router'
import { type Trigger, TRIGGER_LIST } from '../libs/workflow/trigger.type'
import {
  ACTION_LIST,
  ActionKey,
  CLIENT_ACTION_LIST,
  ClientActionKey,
} from '../libs/workflow/actions'

const [store] = dataStore

const WorkflowConfigurator = () => {
  const navigate = useNavigate()
  /**
   * 每次加载时将本地存储的工作流发送到 background
   */
  onMount(() => {
    getWorkflows()
    getTemplates()
  })

  return (
    <div class="container mx-auto p-4 text-base">
      <div class="flex items-center gap-8">
        <h1 class="mb-4 flex-1 text-2xl font-bold">Workflows</h1>
        <button
          onClick={addWorkflow}
          type="button"
          class="mb-8 me-2 min-w-24 rounded-lg bg-blue-700 px-5 py-2.5 text-sm font-medium text-white hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        >
          Add
        </button>
      </div>

      <For each={store.workflows}>
        {(workflow, workflowIndex) => (
          <div class="mb-4 rounded-md border border-gray-200 p-4 dark:border-gray-700">
            <div class="mb-4 flex items-center justify-between gap-4">
              <form class="flex w-full items-center">
                <input
                  type="text"
                  name="folder"
                  class="block w-full border-b py-2 text-lg font-bold text-gray-900 outline-none focus:border-blue-500 dark:border-gray-600  dark:border-b-[#121212]  dark:bg-[#121212] dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 "
                  placeholder="Untitled workflow (Click to edit)"
                  value={workflow.name}
                  readOnly={!workflow.editable}
                  onInput={(e) =>
                    renameWorkflow(
                      workflowIndex(),
                      e.currentTarget.value.trim(),
                    )
                  }
                />
              </form>
              <Show when={workflow.editable}>
                <button
                  type="button"
                  class="me-2 rounded-lg bg-blue-700 px-5 py-2.5 text-sm font-medium text-white hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                  onClick={() => saveWorkflow(workflowIndex())}
                  disabled={workflow.unchanged}
                >
                  Save
                </button>
              </Show>
            </div>

            <div class="mb-4 flex w-full items-stretch overflow-x-auto">
              <div class="flex w-72 flex-col rounded-lg border border-gray-200 text-sm text-gray-500 shadow-sm dark:border-gray-600 dark:bg-gray-800 dark:text-gray-400">
                <div class="group flex rounded-t-lg border-b border-gray-200 bg-gray-100 px-3 py-2 dark:border-gray-600 dark:bg-gray-700">
                  <h3 class="ml-6 flex-1 text-center font-semibold text-gray-900 dark:text-white">
                    Trigger
                  </h3>
                  <Show when={workflow.editable}>
                    <button
                      class="invisible ml-2 block text-xs text-red-600 group-hover:visible"
                      onClick={() => removeWorkflow(workflowIndex())}
                    >
                      <IconTrash />
                    </button>
                  </Show>
                </div>
                <div class="flex flex-1 items-center px-4 py-8">
                  <select
                    class="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
                    onInput={(e) =>
                      updateWhen(
                        workflowIndex(),
                        e.currentTarget.value as Trigger,
                      )
                    }
                    disabled={!workflow.editable}
                  >
                    {TRIGGER_LIST.map((trigger) => (
                      <option
                        value={trigger.name}
                        selected={trigger.name === workflow.when}
                      >
                        {trigger.desc}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <For each={workflow.thenList}>
                {(thenAction, thenIndex) => (
                  <>
                    <div class="flex items-center pt-6 text-gray-500 dark:text-gray-400">
                      <IconArrow class="w-15 h-6" />
                    </div>
                    <div class="w-72 rounded-lg border border-gray-200 text-sm text-gray-500 shadow-sm dark:border-gray-600 dark:bg-gray-800 dark:text-gray-400">
                      <div class="group flex rounded-t-lg border-b border-gray-200 bg-gray-100 px-3 py-2 dark:border-gray-600 dark:bg-gray-700">
                        <h3 class="ml-6 flex-1 text-center font-semibold text-gray-900 dark:text-white">
                          Action
                        </h3>

                        <Show when={workflow.editable}>
                          <button
                            class="invisible ml-2 block text-xs text-red-600 group-hover:visible"
                            onClick={() =>
                              removeThen(workflowIndex(), thenIndex())
                            }
                          >
                            <IconTrash />
                          </button>
                        </Show>
                      </div>
                      <div class="flex flex-col items-center justify-center space-y-4 px-4 py-8">
                        <select
                          disabled={!workflow.editable}
                          class="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
                          onChange={(e) =>
                            updateThen(
                              workflowIndex(),
                              thenIndex(),
                              e.currentTarget.value as
                                | ActionKey
                                | ClientActionKey,
                            )
                          }
                        >
                          {[...ACTION_LIST, ...CLIENT_ACTION_LIST].map(
                            (action) => (
                              <option
                                value={action.name}
                                selected={action.name === thenAction.name}
                              >
                                {action.desc}
                              </option>
                            ),
                          )}
                        </select>
                        <Show when={thenAction.name === 'AutoComment'}>
                          <select
                            class="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 outline-none focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
                            onChange={(e) => {
                              if (e.currentTarget.value === '') {
                                navigate('/workflows/settings')
                                return
                              }
                              updateAction(
                                workflowIndex(),
                                thenIndex(),
                                e.currentTarget.value,
                              )
                            }}
                          >
                            <option value="">Add a new template</option>
                            <For each={store.templates}>
                              {(template) => (
                                <option
                                  value={template.content}
                                  selected={
                                    template.content === thenAction.inputs[0]
                                  }
                                >
                                  {template.name}
                                </option>
                              )}
                            </For>
                          </select>
                        </Show>
                      </div>
                    </div>
                  </>
                )}
              </For>
              <Show when={workflow.thenList.length < 1}>
                <button class="ml-4" onClick={() => addThen(workflowIndex())}>
                  <IconPlus />
                </button>
              </Show>
            </div>
          </div>
        )}
      </For>
    </div>
  )
}

export default WorkflowConfigurator
