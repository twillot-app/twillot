import { MemberLevel } from 'utils/license'

export const PRICING_URL = 'https://s.twillot.com/exporter-pricing'

export const MEMBER_LEVELS = {
  [MemberLevel.Free]: {
    exportLimit: 1000,
  },
  [MemberLevel.Basic]: {
    exportLimit: 5000,
  },
  [MemberLevel.Pro]: {
    exportLimit: Number.MAX_SAFE_INTEGER,
    multiAccount: true,
  },
}
