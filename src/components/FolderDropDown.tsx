import dataStore from '../options/store'
import { upsertConfig } from '../libs/db/configs'
import { OptionName } from '../types'

export const FolderForm = () => {
  const [store, setStore] = dataStore
  const addFolder = async (e) => {
    e.preventDefault()
    const folderName = e.target.folder.value.trim()
    if (folderName && store.folders.includes(folderName) === false) {
      const newFolders = [...store.folders, folderName]
      setStore('folders', newFolders)
      e.target.folder.value = ''
      await upsertConfig({
        option_name: OptionName.FOLDER,
        option_value: newFolders,
      })
    }
  }

  return (
    <form class="flex items-center" onSubmit={addFolder}>
      <input
        type="text"
        name="folder"
        class="block w-full border-b border-gray-300 py-2 text-sm text-gray-900 outline-none focus:border-blue-500  dark:border-gray-600  dark:bg-[#121212] dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 "
        placeholder="Add a folder"
      />
    </form>
  )
}
