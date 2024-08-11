import { Config, IndexedDbIndexItem, Tweet } from '../types'
import { getCurrentUserId } from '../storage'
import { getConfigId } from './configs'
import { getPostId } from './tweets'

export const DB_VERSION = 20

export const DB_NAME = 'twillot'

export const TWEETS_TABLE_NAME = 'tweets'

export const CONFIGS_TABLE_NAME = 'configs'

export const TWEETS_TABLE_NAME_V2 = 'posts'

export const CONFIGS_TABLE_NAME_V2 = 'settings'

export const indexFields: IndexedDbIndexItem[] =
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

export async function migrateData(userId: string) {
  if (!userId) {
    console.error('Migration failed: user_id is not set.')
    return
  }

  console.log('Starting database migration for user ' + userId)
  const db = await openDb()
  let transaction = db.transaction(
    [
      TWEETS_TABLE_NAME,
      CONFIGS_TABLE_NAME,
      TWEETS_TABLE_NAME_V2,
      CONFIGS_TABLE_NAME_V2,
    ],
    'readwrite',
  )

  transaction.oncomplete = () => {
    console.log('Database migration complete.')
    location.reload()
  }

  transaction.onerror = (event) => {
    console.error('Transaction error:', event)
  }

  let migrationPromises: Promise<void>[] = []

  if (db.objectStoreNames.contains(TWEETS_TABLE_NAME)) {
    migrationPromises.push(
      new Promise((resolve, reject) => {
        const oldStore = transaction.objectStore(TWEETS_TABLE_NAME)
        const newStore = transaction.objectStore(TWEETS_TABLE_NAME_V2)

        const request = oldStore.openCursor()
        request.onsuccess = (event) => {
          const cursor = (event.target as IDBRequest<IDBCursorWithValue>).result
          if (cursor) {
            const record = { ...cursor.value } as Tweet
            record.id = getPostId(userId, record.tweet_id)
            record.owner_id = userId
            newStore.put(record).onsuccess = () => {
              cursor.continue()
            }
          } else {
            resolve()
          }
        }
        request.onerror = (event) => {
          console.error('Cursor error:', event)
          reject(new Error(`${TWEETS_TABLE_NAME} migrating error`))
        }
      }),
    )
  }

  if (db.objectStoreNames.contains(CONFIGS_TABLE_NAME)) {
    migrationPromises.push(
      new Promise((resolve, reject) => {
        const oldStore = transaction.objectStore(CONFIGS_TABLE_NAME)
        const newStore = transaction.objectStore(CONFIGS_TABLE_NAME_V2)

        const request = oldStore.openCursor()
        request.onsuccess = (event) => {
          const cursor = (event.target as IDBRequest<IDBCursorWithValue>).result
          if (cursor) {
            const record = { ...cursor.value } as Config
            record.id = getConfigId(userId, record.option_name)
            record.owner_id = userId
            record.updated_at = Math.floor(Date.now() / 1000)
            newStore.put(record).onsuccess = () => {
              cursor.continue()
            }
          } else {
            resolve()
          }
        }
        request.onerror = (event) => {
          console.error('Cursor error:', event)
          reject(new Error(`${CONFIGS_TABLE_NAME} migrating error`))
        }
      }),
    )
  }

  try {
    await Promise.all(migrationPromises)
    console.log('All migrations completed successfully.')
  } catch (error) {
    console.error('Migration failed:', error)
  }
}

export function createSchema(
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
      objectStore.createIndex(
        index.name,
        index.keyPath || index.name,
        index.options,
      )
    }
  })
}

function upgradeDb(db: IDBDatabase, transaction: IDBTransaction) {
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
}

export function getObjectStore(db: IDBDatabase, realTbName: string) {
  const transaction = db.transaction([realTbName], 'readwrite')
  return {
    transaction,
    objectStore: transaction.objectStore(realTbName),
  }
}

export async function openDb(
  dbName = DB_NAME,
  dbVersion = DB_VERSION,
  onUpgrade = upgradeDb,
): Promise<IDBDatabase> {
  if (!user_id) {
    user_id = await getCurrentUserId()
  }

  return new Promise((resolve, reject) => {
    if (!window.indexedDB) {
      reject('IndexedDB is not supported by this browser.')
      return
    }

    const request = window.indexedDB.open(dbName, dbVersion)
    request.onerror = (event: Event) => {
      reject(
        'Database error: ' +
          (event.target as IDBOpenDBRequest).error?.toString(),
      )
    }
    request.onupgradeneeded = async (event: IDBVersionChangeEvent) => {
      const target = event.target as IDBOpenDBRequest
      // DO NOT create a new transaction here
      const db = target.result
      const transaction = target.transaction
      if (transaction) {
        onUpgrade(db, transaction)
      }
    }

    request.onsuccess = (event: Event) => {
      const db = (event.target as IDBOpenDBRequest).result
      resolve(db)
    }
  })
}
