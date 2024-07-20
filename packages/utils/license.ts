import { API_HOST } from './types'
import { getCurrentUserId, getLocal, setLocal } from './storage'

export const LICENSE_KEY = 'twillot_license'

export enum MemberLevel {
  Free,
  Basic,
  Pro,
}

export const Level_Names = ['free', 'basic', 'pro']

export interface License {
  license_code: string
  level: MemberLevel
  token: string
  activated_at: number
  expires_at: number
}

export async function getLicense() {
  const userId = await getCurrentUserId()
  if (!userId) {
    return null
  }

  const item = await getLocal(LICENSE_KEY)
  return item[LICENSE_KEY] as License | null
}

export function getLevel(license: License | null) {
  if (!license) {
    return MemberLevel.Free
  }

  return license.level
}

export function isFreeLicense(license: License | null) {
  if (!license) {
    return true
  }

  const now = Math.floor(new Date().getTime() / 1000)
  return now > license.expires_at
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
    if (typeof profile.level === 'string') {
      profile.level = Level_Names.indexOf(profile.level) as MemberLevel
    }
    await setLocal({ [LICENSE_KEY]: profile })
    return profile
  }

  throw new Error(json.message)
}
