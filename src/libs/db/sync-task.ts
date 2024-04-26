// 定义数据库和对象存储名称
const DB_NAME = 'SyncTasksDB'
const STORE_NAME = 'syncTasks'

// 打开或创建 IndexedDB 数据库
function openDB() {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open(DB_NAME, 1)

    request.onerror = (event: Event) => reject((<IDBRequest>event.target).error)

    request.onsuccess = (event) => {
      resolve((<IDBRequest>event.target).result)
    }

    request.onupgradeneeded = (event) => {
      const db = (<IDBRequest>event.target).result
      if (!db.objectStoreNames.contains(STORE_NAME)) {
        db.createObjectStore(STORE_NAME, { keyPath: 'id', autoIncrement: true })
      }
    }
  })
}

// 获取对象存储
function getObjectStore(db) {
  return db.transaction(STORE_NAME, 'readwrite').objectStore(STORE_NAME)
}

// 添加一条同步记录
async function addSyncTask(cloudService, recordId) {
  const db = await openDB()
  const store = getObjectStore(db)

  const task = {
    cloud_service: cloudService,
    record_id: recordId,
    record_status: 0, // 默认状态为 0
    retry_count: 0,
    created_at: new Date(),
    updated_at: new Date(),
  }

  const request = store.add(task)
  return new Promise((resolve, reject) => {
    request.onsuccess = (event) => resolve(event.target.result)
    request.onerror = (event) => reject(event.target.error)
  })
}

// 更新一条同步记录
async function updateSyncTask(id, recordStatus, retryCount) {
  const db = await openDB()
  const store = getObjectStore(db)

  const task = {
    id: id,
    record_status: recordStatus,
    retry_count: retryCount,
    updated_at: new Date(),
  }

  const request = store.put(task)
  return new Promise((resolve, reject) => {
    request.onsuccess = (event) => resolve(event.target.result)
    request.onerror = (event) => reject(event.target.error)
  })
}

// 根据 ID 查询一条同步记录
async function getSyncTaskById(id) {
  const db = await openDB()
  const store = getObjectStore(db)

  return new Promise((resolve, reject) => {
    const request = store.get(id)
    request.onsuccess = (event) => resolve(event.target.result)
    request.onerror = (event) => reject(event.target.error)
  })
}

// 查询所有同步任务
async function getAllSyncTasks() {
  const db = await openDB()
  const store = getObjectStore(db)

  return new Promise((resolve, reject) => {
    const tasks = []
    const request = store.openCursor()

    request.onsuccess = (event) => {
      const cursor = event.target.result
      if (cursor) {
        tasks.push(cursor.value)
        cursor.continue()
      } else {
        resolve(tasks)
      }
    }

    request.onerror = (event) => reject(event.target.error)
  })
}

// 根据云服务名称和记录状态查询同步记录
async function getSyncTasksByServiceAndStatus(cloudService, recordStatus) {
  const db = await openDB()
  const store = getObjectStore(db)

  return new Promise((resolve, reject) => {
    const tasks = []
    const index = store.index('cloud_service_record_status')
    const keyRange = IDBKeyRange.only([cloudService, recordStatus])

    const request = index.openCursor(keyRange)

    request.onsuccess = (event) => {
      const cursor = event.target.result
      if (cursor) {
        tasks.push(cursor.value)
        cursor.continue()
      } else {
        resolve(tasks)
      }
    }

    request.onerror = (event) => reject(event.target.error)
  })
}

// // 你可以根据需要添加更多的接口函数，例如删除记录、根据不同条件查询记录等。

// // 使用示例
// addSyncTask('OneDrive', 'record123')
//   .then((id) => console.log(`添加成功，记录 ID: ${id}`))
//   .catch((error) => console.error('添加失败:', error))

// updateSyncTask(1, 1, 2)
//   .then(() => console.log('更新成功'))
//   .catch((error) => console.error('更新失败:', error))

// getAllSyncTasks()
//   .then((tasks) => console.log('所有同步任务:', tasks))
//   .catch((error) => console.error('查询失败:', error))
