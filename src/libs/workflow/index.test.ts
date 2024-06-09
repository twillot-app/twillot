import browser from 'webextension-polyfill'
import 'fake-indexeddb/auto'
import { describe, it, expect, beforeEach, vi } from 'vitest'

import { getWorkflows, getClientWorkflows } from './index'
import { addTask, removeTask, getTasks, saveTasks } from './task'
import { Task, Workflow } from './types'
import { ACTION_LIST, CLIENT_ACTION_LIST } from './actions'

describe('Task Manager between options page and background script', () => {
  beforeEach(() => {
    global.chrome = browser
    browser.reset()
  })

  // Happy path - addTask
  it('should add a task to the list of tasks', async () => {
    const task: Task = {
      id: '123',
      name: 'UnrollThread',
      tweetId: '456',
    }

    await addTask(task)

    const tasks = await getTasks()
    expect(tasks).toContain(task)
  })

  it('shoul work when the tasks are unbookmarking and bookmarking', async () => {
    const task: Task = {
      id: '123',
      name: 'DeleteBookmark',
      tweetId: '456',
    }
    await addTask(task)
    const task1 = {
      id: '456',
      name: 'UnrollThread',
      tweetId: '456',
    }
    await addTask(task1)
    const tasks = await getTasks()
    expect(tasks).toStrictEqual([task1])
  })

  // Edge case - addTask
  it('should not add a task if it already exists in the list of tasks', async () => {
    const existingTask: Task = {
      id: '123',
      name: 'LikeTweet',
      tweetId: '456',
    }

    const initialTasks = await getTasks()
    await addTask(existingTask)
    await addTask(existingTask)

    const tasks = await getTasks()
    expect(tasks.filter((t) => t.id === '123').length).toBe(1)
    expect(tasks).toEqual(initialTasks.concat(existingTask))

    // Tasks with the same name and tweetId are considered the same task
    const task2 = {
      id: '456',
      name: 'LikeTweet',
      tweetId: '456',
    }
    await addTask(task2)
    expect(tasks.filter((t) => t.id === '123').length).toBe(1)
  })

  // Happy path - removeTask
  it('should remove a task from the list of tasks', async () => {
    const task: Task = {
      id: '123',
      name: 'LikeTweet',
      tweetId: '456',
    }

    await addTask(task)
    await removeTask('123')

    const tasks = await getTasks()
    expect(tasks).not.toContain(task)
  })

  // Edge case - removeTask
  it('should not remove a task if it does not exist in the list of tasks', async () => {
    const initialTasks = await getTasks()
    await removeTask('nonExistentId')

    const tasks = await getTasks()
    expect(tasks).toEqual(initialTasks)
  })

  // Happy path - getClientWorkflows
  it('should return client workflows based on client actions', async () => {
    const workflows: Workflow[] = [
      {
        id: 'w1',
        name: 'Workflow 1',
        when: 'CreateBookmark',
        thenList: [{ name: ACTION_LIST[0].name }],
      },
      {
        id: 'w2',
        name: 'Workflow 2',
        when: 'CreateTweet',
        thenList: [{ name: CLIENT_ACTION_LIST[0].name }],
      },
    ]

    await browser.storage.local.set({ workflows })
    const clientWorkflows = await getClientWorkflows()
    const allWorkflows = await getWorkflows()
    expect(clientWorkflows.length).toBe(1)
    expect(allWorkflows).toEqual(workflows)
  })

  // Edge case - getClientWorkflows
  it('should return an empty array if no client workflows are present', async () => {
    await saveTasks([])
    const clientWorkflows = await getClientWorkflows()
    expect(clientWorkflows).toEqual([])
  })
})
