import { IndexedDbIndexItem } from '../../types'
import { getUserId } from '../storage'

export const DB_VERSION = 10

export const DB_NAME = 'twillot'

export const TWEETS_TABLE_NAME = 'tweets'

export const CONFIGS_TABLE_NAME = 'configs'

let user_id = ''

function getTableName(tbName: string) {
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
    user_id = await getUserId()
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
        TWEETS_TABLE_NAME,
        'tweet_id',
        indexFields,
      )
      createSchema(
        db,
        target.transaction,
        CONFIGS_TABLE_NAME,
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
