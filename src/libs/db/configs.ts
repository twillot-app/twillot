import { Config, OptionName } from '../../types'
import { getCurrentUserId } from '../storage'
import { openDb, getObjectStore, CONFIGS_TABLE_NAME_V2 } from './index'

export function getConfigId(name: OptionName, user_id: string) {
  return name.includes(user_id) ? name : `${name}_${user_id}`
}

// 创建或更新配置项
export async function upsertConfig(config: Config) {
  const db = await openDb()
  const user_id = await getCurrentUserId()
  const { objectStore } = getObjectStore(db, CONFIGS_TABLE_NAME_V2)
  return new Promise<void>((resolve, reject) => {
    config.updated_at = Math.floor(Date.now() / 1000)
    config.owner_id = user_id
    config.id = getConfigId(config.option_name, user_id)
    const request = objectStore.put(config)
    request.onsuccess = () => resolve()
    request.onerror = () => reject(request.error)
  })
}

// 读取配置项
export async function readConfig(optionName: OptionName) {
  const db = await openDb()
  const user_id = await getCurrentUserId()
  const { objectStore } = getObjectStore(db, CONFIGS_TABLE_NAME_V2)
  return new Promise<Config | undefined>((resolve, reject) => {
    const request = objectStore.get(getConfigId(optionName, user_id))
    request.onsuccess = () => resolve(request.result)
    request.onerror = () => reject(request.error)
  })
}

// 删除配置项
export async function deleteConfig(optionName: OptionName) {
  const db = await openDb()
  const user_id = await getCurrentUserId()
  const { objectStore } = getObjectStore(db, CONFIGS_TABLE_NAME_V2)
  return new Promise<void>((resolve, reject) => {
    const request = objectStore.delete(getConfigId(optionName, user_id))
    request.onsuccess = () => resolve()
    request.onerror = () => reject(request.error)
  })
}
