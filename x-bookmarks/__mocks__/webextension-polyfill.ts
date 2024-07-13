import { fakeBrowser } from '@webext-core/fake-browser'

console.log('webextension-polyfill.ts is mocked')

global.chrome = fakeBrowser

export default fakeBrowser
