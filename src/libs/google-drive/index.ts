import getAccessToken from './get-access-token'
import { writeSyncFile } from './sync-file'

export default async function uploadToGoogleDrive(jsonData: any[]) {
  if (!jsonData || !jsonData.length) {
    return
  }

  const token = await getAccessToken()
  const blob = new Blob([JSON.stringify(jsonData)], {
    type: 'text/plain',
  })
  await writeSyncFile(token, blob)
}
