import { defineManifest } from '@crxjs/vite-plugin'
import packageData from '../package.json'

//@ts-ignore
const isDev = process.env.NODE_ENV == 'development'

export default defineManifest({
  name: `${packageData.displayName || packageData.name}${isDev ? ` ➡️ Dev` : ''}`,
  description: packageData.description,
  version: packageData.version,
  manifest_version: 3,
  icons: {
    16: 'img/logo-16.png',
    32: 'img/logo-32.png',
    48: 'img/logo-48.png',
    128: 'img/logo-128.png',
  },
  action: {
    // popup 优先级高
    // default_popup: 'pages/popup.html',
    // default_icon: 'img/logo-48.png',
  },
  options_ui: {
    page: 'pages/options.html',
    open_in_tab: true,
  },
  // devtools_page: 'pages/devtools.html',
  background: {
    service_worker: 'src/background/index.ts',
    type: 'module',
  },
  // content_scripts: [
  //   {
  //     matches: ['http://*/*', 'https://*/*'],
  //     js: ['src/contentScript/index.ts'],
  //   },
  // ],
  // side_panel: {
  //   default_path: 'pages/sidepanel.html',
  // },
  web_accessible_resources: [
    {
      resources: ['img/logo-16.png', 'img/logo-32.png', 'img/logo-48.png', 'img/logo-128.png'],
      matches: [],
    },
  ],
  host_permissions: ['https://twitter.com/i/bookmarks*'],
  permissions: ['sidePanel', 'storage', 'webRequest', 'cookies', 'tabs'],
  // chrome_url_overrides: {
  //   newtab: 'pages/newtab.html',
  // },
})
