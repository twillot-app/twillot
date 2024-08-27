import { LICENSE_KEY, MemberLevel } from 'utils/license'

import dataStore from '../options/store'

const [store] = dataStore

export function useMemberLevel() {
  return () => store[LICENSE_KEY]?.level || MemberLevel.Free
}
