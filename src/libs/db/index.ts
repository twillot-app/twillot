import { Config, IndexedDbIndexItem, Tweet } from '../../types'
import { getCurrentUserId } from '../storage'
import { getConfigId } from './configs'
import { getPostId } from './tweets'

export const DB_VERSION = 17

export const DB_NAME = 'twillot'

export const TWEETS_TABLE_NAME = 'tweets'

export const CONFIGS_TABLE_NAME = 'configs'

export const TWEETS_TABLE_NAME_V2 = 'posts'

export const CONFIGS_TABLE_NAME_V2 = 'settings'

const indexFields =
  'full_text,sort_index,screen_name,created_at,owner_id,has_image,has_video,has_link,has_quote,is_long_text,folder'
    .split(',')
    .map((field) => ({
      name: field,
      options: {
        unique: false,
        multiEntry: false,
      },
    }))
indexFields.push({
  name: 'tags',
  options: {
    unique: false,
    multiEntry: true,
  },
})

let user_id = ''

export async function migrateData(
  db: IDBDatabase,
  transaction: IDBTransaction,
) {
  const userId = await getCurrentUserId()
  if (!userId) {
    console.error('Migration failed: user_id is not set.')
    return
  }

  console.log('Starting database migration for user ' + userId)
  if (db.objectStoreNames.contains(TWEETS_TABLE_NAME)) {
    const oldStore = transaction.objectStore(TWEETS_TABLE_NAME)
    const newStore = transaction.objectStore(TWEETS_TABLE_NAME_V2)

    const request = oldStore.openCursor()
    request.onsuccess = (event) => {
      const cursor = (event.target as IDBRequest<IDBCursorWithValue>).result
      if (cursor) {
        const record = cursor.value as Tweet
        record.id = getPostId(userId, record.tweet_id)
        record.owner_id = userId
        newStore.put(record)
        cursor.continue()
      }
    }
  }

  if (db.objectStoreNames.contains(CONFIGS_TABLE_NAME)) {
    const oldStore = transaction.objectStore(CONFIGS_TABLE_NAME)
    const newStore = transaction.objectStore(CONFIGS_TABLE_NAME_V2)

    const request = oldStore.openCursor()
    request.onsuccess = (event) => {
      const cursor = (event.target as IDBRequest<IDBCursorWithValue>).result
      if (cursor) {
        const record = cursor.value as Config
        record.id = getConfigId(userId, record.option_name)
        record.owner_id = userId
        record.updated_at = Math.floor(Date.now() / 1000)
        newStore.put(record)
        cursor.continue()
      }
    }
  }
  console.log('Database migration complete.')
}

function createSchema(
  db: IDBDatabase,
  transaction: IDBTransaction | null,
  realTbName: string,
  keyPath: string | null,
  indexes: IndexedDbIndexItem[],
) {
  let objectStore = db.objectStoreNames.contains(realTbName)
    ? transaction.objectStore(realTbName)
    : db.createObjectStore(realTbName, {
        keyPath: keyPath,
      })

  indexes.forEach((index) => {
    if (!objectStore.indexNames.contains(index.name)) {
      objectStore.createIndex(index.name, index.name, index.options)
    }
  })
}

async function upgradeDb(db: IDBDatabase, transaction: IDBTransaction) {
  createSchema(
    db,
    transaction,
    TWEETS_TABLE_NAME,
    'tweet_id',
    indexFields.filter((i) => i.name !== 'owner_id'),
  )
  createSchema(db, transaction, CONFIGS_TABLE_NAME, 'option_name', [])
  createSchema(db, transaction, TWEETS_TABLE_NAME_V2, 'id', indexFields)
  createSchema(db, transaction, CONFIGS_TABLE_NAME_V2, 'id', [])
  await migrateData(db, transaction)
}

export function getObjectStore(db: IDBDatabase, realTbName: string) {
  const transaction = db.transaction([realTbName], 'readwrite')
  return {
    transaction,
    objectStore: transaction.objectStore(realTbName),
  }
}

export async function openDb(): Promise<IDBDatabase> {
  if (!user_id) {
    user_id = await getCurrentUserId()
  }

  return new Promise((resolve, reject) => {
    if (!window.indexedDB) {
      reject('IndexedDB is not supported by this browser.')
      return
    }

    const request = window.indexedDB.open(DB_NAME, DB_VERSION)
    request.onerror = (event: Event) => {
      reject(
        'Database error: ' +
          (event.target as IDBOpenDBRequest).error?.toString(),
      )
    }
    request.onupgradeneeded = (event: IDBVersionChangeEvent) => {
      const target = event.target as IDBOpenDBRequest
      // DO NOT create a new transaction here
      const db = target.result
      const transaction = target.transaction
      if (transaction) {
        upgradeDb(db, transaction)
      }
    }

    request.onsuccess = (event: Event) => {
      const db = (event.target as IDBOpenDBRequest).result
      resolve(db)
    }
  })
}
