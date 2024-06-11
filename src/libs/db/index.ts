import { IndexedDbIndexItem } from '../../types'
import { getCurrentUserId } from '../storage'

export const DB_VERSION = 10

export const DB_NAME = 'twillot'

export const TWEETS_TABLE_NAME = 'tweets'

export const CONFIGS_TABLE_NAME = 'configs'

let user_id = ''

function getTableName(tbName: string) {
  if (user_id) return `${tbName}_${user_id}`
  else return tbName
}

export function getObjectStore(db: IDBDatabase, tableName: string) {
  const realTbName = getTableName(tableName)
  const transaction = db.transaction([realTbName], 'readwrite')
  return {
    transaction,
    objectStore: transaction.objectStore(realTbName),
  }
}

export function createSchema(
  db: IDBDatabase,
  transaction: IDBTransaction,
  tableName: string,
  keyPath: string,
  indexes: IndexedDbIndexItem[],
) {
  const realTbName = getTableName(tableName)
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
    request.onupgradeneeded = async (event: IDBVersionChangeEvent) => {
      const target = event.target as IDBOpenDBRequest
      const db = target.result
      // DO NOT create a new transaction here
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
      createSchema(
        db,
        target.transaction,
        getTableName(TWEETS_TABLE_NAME),
        'tweet_id',
        indexFields,
      )
      createSchema(
        db,
        target.transaction,
        getTableName(CONFIGS_TABLE_NAME),
        'option_name',
        [],
      )
    }

    request.onsuccess = (event: Event) => {
      const db = (event.target as IDBOpenDBRequest).result
      resolve(db)
    }
  })
}

async function isTableMigrationNeeded(db: IDBDatabase, oldTableName: string) {
  return db.objectStoreNames.contains(oldTableName)
}

async function migrateTable(
  db: IDBDatabase,
  oldTableName: string,
  newTableName: string,
) {
  return new Promise<void>((resolve, reject) => {
    if (!db.objectStoreNames.contains(oldTableName)) {
      console.log(`Table ${oldTableName} does not exist. Skipping migration.`)
      resolve()
      return
    }

    const transaction = db.transaction(
      [oldTableName, newTableName],
      'readwrite',
    )
    const oldStore = transaction.objectStore(oldTableName)
    const newStore = transaction.objectStore(newTableName)

    const request = oldStore.openCursor()
    request.onsuccess = (event) => {
      const cursor = (event.target as IDBRequest<IDBCursorWithValue>).result
      if (cursor) {
        newStore.put(cursor.value).onsuccess = () => {
          cursor.continue()
        }
      } else {
        // Remove the old table after migration
        db.deleteObjectStore(oldTableName)
        resolve()
      }
    }
    request.onerror = (event) => {
      reject(
        new Error(
          'Migration error: ' + (event.target as IDBRequest).error?.toString(),
        ),
      )
    }
  })
}

export async function isDBMigrationNeeded() {
  const db = await openDb()
  return [TWEETS_TABLE_NAME, CONFIGS_TABLE_NAME].some((name) =>
    isTableMigrationNeeded(db, name),
  )
}

export async function migrateDb() {
  const db = await openDb()
  if (await isTableMigrationNeeded(db, TWEETS_TABLE_NAME)) {
    await migrateTable(db, TWEETS_TABLE_NAME, getTableName(TWEETS_TABLE_NAME))
  }
  if (await isTableMigrationNeeded(db, CONFIGS_TABLE_NAME)) {
    await migrateTable(db, CONFIGS_TABLE_NAME, getTableName(CONFIGS_TABLE_NAME))
  }
}
