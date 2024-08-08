import { produce, createStore } from 'solid-js/store'
import { type License, LICENSE_KEY } from 'utils/license'

export enum TaskState {
  unstarted,
  started,
  paused,
  finished,
  errored,
}

export const TASK_STATE_TEXT = [
  'Unstarted',
  'Syncing',
  'Paused',
  'Finished',
  'Errored',
]

const initialState = {
  total: 0,
  done: 0,
  state: TaskState.unstarted,
  // 429 后预计重试时间
  reset: 0,
}

export const defaultState = () => ({
  posts: { ...initialState },
  replies: { ...initialState },
  media: { ...initialState },
  likes: { ...initialState },
  followers: { ...initialState },
  // 占位
  bookmarks: { ...initialState },
  is_dialog_open: false,
  [LICENSE_KEY]: null as License | null,
})

const store = createStore(defaultState())

const [state, setStore] = store

type StoreType = typeof state

export const mutateStore = (fn: (state: StoreType) => void) =>
  setStore(produce(fn))

export default store
