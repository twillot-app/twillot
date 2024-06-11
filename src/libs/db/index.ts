import { IndexedDbIndexItem } from '../../types'
import { getCurrentUserId } from '../storage'

export const DB_VERSION = 13

export const DB_NAME = 'twillot'

export const TWEETS_TABLE_NAME = 'tweets'

export const CONFIGS_TABLE_NAME = 'configs'

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

function getTableName(tbName: string) {
  if (!user_id) {
    return tbName
  }

  if (tbName.includes(user_id)) {
    return tbName
  }

  return `${tbName}_${user_id}`
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
  transaction: IDBTransaction | null,
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

export function upgradeDb(db: IDBDatabase, transaction: IDBTransaction) {
  createSchema(
    db,
    transaction,
    getTableName(TWEETS_TABLE_NAME),
    'tweet_id',
    indexFields,
  )
  createSchema(
    db,
    transaction,
    getTableName(CONFIGS_TABLE_NAME),
    'option_name',
    [],
  )
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

function isTableMigrationNeeded(db: IDBDatabase, oldTableName: string) {
  return user_id && !db.objectStoreNames.contains(getTableName(oldTableName))
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
  console.log('Starting database migration...')
  const db = await openDb()
  console.log('current user id:', user_id)
  if (isTableMigrationNeeded(db, TWEETS_TABLE_NAME)) {
    await migrateTable(db, TWEETS_TABLE_NAME, getTableName(TWEETS_TABLE_NAME))
  }
  if (isTableMigrationNeeded(db, CONFIGS_TABLE_NAME)) {
    await migrateTable(db, CONFIGS_TABLE_NAME, getTableName(CONFIGS_TABLE_NAME))
  }
  console.log('Database migration complete.')
}
