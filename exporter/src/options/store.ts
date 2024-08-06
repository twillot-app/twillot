import { produce, createStore } from 'solid-js/store'
import { type License, LICENSE_KEY } from 'utils/license'

enum TaskState {
  unstarted,
  started,
  finished,
  errored,
}

export const TASK_STATE_TEXT = ['Unstarted', 'Syncing', 'Finished', 'Errored']

const initialState = {
  total: 10,
  done: 0,
  state: TaskState.unstarted,
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
