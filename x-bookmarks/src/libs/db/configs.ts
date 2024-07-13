import { Config, OptionName } from '../../types'
import { getCurrentUserId } from '../storage'
import { openDb, getObjectStore, CONFIGS_TABLE_NAME_V2 } from './index'

export function getConfigId(user_id: string, name: OptionName) {
  if (!user_id || !name) {
    throw new Error('Invalid user_id or name: ' + user_id + ', ' + name)
  }

  return name.includes(user_id) ? name : `${user_id}_${name}`
}

// 创建或更新配置项
export async function upsertConfig(config: {
  option_name: OptionName
  option_value: any
}) {
  const db = await openDb()
  const user_id = await getCurrentUserId()
  const { objectStore } = getObjectStore(db, CONFIGS_TABLE_NAME_V2)
  return new Promise<void>((resolve, reject) => {
    const item: Config = {
      ...config,
      updated_at: Math.floor(Date.now() / 1000),
      owner_id: user_id,
      id: getConfigId(user_id, config.option_name),
    }

    const request = objectStore.put(item)
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
    const request = objectStore.get(getConfigId(user_id, optionName))
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
    const request = objectStore.delete(getConfigId(user_id, optionName))
    request.onsuccess = () => resolve()
    request.onerror = () => reject(request.error)
  })
}
