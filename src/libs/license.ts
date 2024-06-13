import { API_HOST } from '../types'
import { getCurrentUserId, getLocal, setLocal } from './storage'

const LICENSE_CODE_KEY = 'license_code'

export enum MemberTier {
  Free = 'free',
  Basic = 'basic',
  Pro = 'pro',
}

export interface License {
  license_code: string
  level: MemberTier
  token: string
  activated_at: number
  expires_at: number
}

export async function getLicense() {
  const userId = await getCurrentUserId()
  if (!userId) {
    return null
  }

  const item = await getLocal(LICENSE_CODE_KEY)
  return item[LICENSE_CODE_KEY] as License | null
}

export async function activateLicense(license_code: string) {
  if (!license_code) {
    return
  }

  const userId = await getCurrentUserId()
  if (!userId) {
    throw new Error('User not logged in')
  }

  const profile = await fetch(API_HOST + '/webhook/license/activate', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      license_code,
      device_id: userId,
    }),
  })
  const json = await profile.json()
  if (json.data) {
    const profile = {
      license_code,
      ...json.data,
    } as License
    await setLocal({ license_profile: profile })
    return profile
  }

  throw new Error(json.message)
}
