import { IndexedDbIndexItem } from '../../types'
import { getCurrentUserId } from '../storage'

export const DB_VERSION = 13

export const DB_NAME = 'twillot'

export const TWEETS_TABLE_NAME = 'tweets'

export const CONFIGS_TABLE_NAME = 'configs'

export const TWEETS_TABLE_NAME_V2 = 'posts'

export const CONFIGS_TABLE_NAME_V2 = 'settings'

const indexFields =
  'full_text,sort_index,screen_name,created_at,has_image,has_video,has_link,has_quote,is_long_text,folder'
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

function createSchema(
  db: IDBDatabase,
  transaction: IDBTransaction | null,
  realTbName: string,
  keyPath: string,
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

function upgradeDb(db: IDBDatabase, transaction: IDBTransaction) {
  createSchema(db, transaction, TWEETS_TABLE_NAME_V2, 'id', indexFields)
  createSchema(db, transaction, CONFIGS_TABLE_NAME_V2, 'id', [])
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

export async function migrateDb() {
  console.log('Starting database migration...')
  const db = await openDb()
  console.log('current user id:', user_id)
  // TODO mark by created_by
  console.log('Database migration complete.')
}
