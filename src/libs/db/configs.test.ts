import { describe, it, expect, beforeEach } from 'vitest'
import browser from 'webextension-polyfill'
import 'fake-indexeddb/auto'

import { deleteConfig, readConfig, upsertConfig } from './configs'
import { Config, OptionName } from '../../types'

import { openDb } from './index'
import { setCurrentUserId } from '../storage'

describe('configManager', () => {
  beforeEach(async () => {
    indexedDB = new IDBFactory()
    global.chrome = browser
    await setCurrentUserId('123')
    await openDb()
  })

  it('should be able to upsert, read, and delete config successfully', async () => {
    const config = {
      option_name: OptionName.FOLDER,
      option_value: 'folder1',
    }
    await upsertConfig(config)
    const readResult = await readConfig(OptionName.FOLDER)
    expect(readResult.option_name).toEqual(config.option_name)
    expect(readResult.option_value).toEqual(config.option_value)
    await deleteConfig(OptionName.FOLDER)
    const deletedResult = await readConfig(OptionName.FOLDER)
    expect(deletedResult).toBeUndefined()
  })
})
