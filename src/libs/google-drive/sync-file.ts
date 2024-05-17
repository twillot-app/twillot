import { AccessToken } from './get-access-token'

const pad = (number: number, length: number = 2): string => {
  return number.toString().padStart(length, '0')
}

const getCurrentTimestamp = (): string => {
  const date = new Date()
  const year = date.getFullYear()
  const month = pad(date.getMonth() + 1)
  const day = pad(date.getDate())
  const hours = pad(date.getHours())
  const minutes = pad(date.getMinutes())
  const seconds = pad(date.getSeconds())
  const milliseconds = pad(date.getMilliseconds(), 3)
  const timezoneOffset = -date.getTimezoneOffset()
  const sign = timezoneOffset >= 0 ? '+' : '-'
  const offsetHours = pad(Math.floor(Math.abs(timezoneOffset) / 60))
  const offsetMinutes = pad(Math.abs(timezoneOffset) % 60)

  return `${year}-${month}-${day}T${hours}:${minutes}:${seconds}.${milliseconds}${sign}${offsetHours}:${offsetMinutes}`
}

type GoogleDriveSyncMetadata = {
  id: string
  modifiedTime: string
  webViewLink: string
  webContentLink: string
}

const GOOGLE_DRIVE_FILE_GET_API = `https://www.googleapis.com/drive/v3/files`
const GOOGLE_DRIVE_FILE_UPLOAD_API = `https://www.googleapis.com/upload/drive/v3/files`
const GOOGLE_DRIVE_FILE_FIELDS = [
  'id',
  'webViewLink',
  'modifiedTime',
  'webContentLink',
].join(',')
const SYNC_FOLDER_NAME = 'twillot'

const getAuthorizationHeaders = (accessToken: AccessToken) =>
  new Headers({
    Authorization: `Bearer ${accessToken}`,
  })

const createBackupFolder = async (
  accessToken: AccessToken,
): Promise<string> => {
  const form = new FormData()
  const metadata = {
    name: SYNC_FOLDER_NAME,
    mimeType: 'application/vnd.google-apps.folder',
  }

  form.append(
    'metadata',
    new Blob([JSON.stringify(metadata)], { type: 'application/json' }),
  )

  const url = `${GOOGLE_DRIVE_FILE_UPLOAD_API}?uploadType=multipart&fields=${GOOGLE_DRIVE_FILE_FIELDS}`
  const response = await fetch(url, {
    method: 'POST',
    headers: getAuthorizationHeaders(accessToken),
    body: form,
  })

  const { id } = await response.json()
  return id
}

const createBackup = async (
  accessToken: AccessToken,
  blob: Blob,
  folderId: string,
): Promise<GoogleDriveSyncMetadata> => {
  const form = new FormData()
  const metadata = {
    name: `bookmarks-${getCurrentTimestamp().split('.')[0]}.json`,
    parents: [folderId],
    mimeType: 'application/json',
    modifiedTime: getCurrentTimestamp(),
  }
  const metadataBlob = new Blob([JSON.stringify(metadata)], {
    type: 'application/json',
  })

  form.append('metadata', metadataBlob)
  form.append('file', blob)

  const url = `${GOOGLE_DRIVE_FILE_UPLOAD_API}?uploadType=multipart&fields=${GOOGLE_DRIVE_FILE_FIELDS}`
  const response = await fetch(url, {
    method: 'POST',
    headers: getAuthorizationHeaders(accessToken),
    body: form,
  })

  return await response.json()
}

const searchFolder = async (
  accessToken: AccessToken,
  folderName: string,
): Promise<string | null> => {
  const query = `name = '${folderName}' and mimeType = 'application/vnd.google-apps.folder'`
  const url = `${GOOGLE_DRIVE_FILE_GET_API}?q=${encodeURIComponent(query)}&fields=files(id)`

  const response = await fetch(url, {
    method: 'GET',
    headers: getAuthorizationHeaders(accessToken),
  })

  const { files } = await response.json()
  if (!files || files.length === 0) {
    return null
  }

  return files[0].id
}

export const writeSyncFile = async (accessToken: AccessToken, blob: Blob) => {
  let folderId = await searchFolder(accessToken, SYNC_FOLDER_NAME)
  if (!folderId) {
    folderId = await createBackupFolder(accessToken)
  }
  const syncMetadata = await createBackup(accessToken, blob, folderId)

  return {
    ...syncMetadata,
    folderId,
  }
}
