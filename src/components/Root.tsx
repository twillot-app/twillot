/* @refresh reload */
import { HashRouter, Route } from '@solidjs/router'

import { Home } from '../options/Home'
import Workflows from '../options/Workflows'
import Settings from '../options/Settings'
import License from '../options/License'
import Layout from '../options/Layout'
import '../assets/main.css'

export default function getRoot() {
  return (
    <HashRouter root={Layout}>
      <Route path="/" component={Home} />
      <Route path="/workflows" component={Workflows} />
      <Route path="/workflows/settings" component={Settings} />
      <Route path="/license" component={License} />
    </HashRouter>
  )
}
