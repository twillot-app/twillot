import { describe, it, expect, afterEach, beforeEach } from 'vitest'
import browser from 'webextension-polyfill'
import 'fake-indexeddb/auto'

import { deleteConfig, readConfig, upsertConfig } from './configs'
import { Config, OptionName } from '../../types'

import { openDb } from './index'

describe('configManager', () => {
  beforeEach(async () => {
    await openDb()
  })
  afterEach(() => {
    indexedDB = new IDBFactory()
    global.chrome = browser
  })

  it('should be able to upsert, read, and delete config successfully', async () => {
    const config = {
      option_name: OptionName.FOLDER,
      option_value: 'folder1',
    } as Config
    await upsertConfig(config)
    const readResult = await readConfig(OptionName.FOLDER)
    expect(readResult).toEqual(config)
    await deleteConfig(OptionName.FOLDER)
    const deletedResult = await readConfig(OptionName.FOLDER)
    expect(deletedResult).toBeUndefined()
  })
})
