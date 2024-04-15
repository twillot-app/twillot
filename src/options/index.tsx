/* @refresh reload */
import { render } from 'solid-js/web'
import { HashRouter, Route } from '@solidjs/router'

import { Home } from './Home'
import Layout from './Layout'
import Export from './Export'
import '../assets/main.css'

render(
  () => (
    <HashRouter root={Layout}>
      <Route path="/" component={Home} />
      <Route path="/export-and-sync" component={Export} />
    </HashRouter>
  ),
  document.getElementById('app') ?? document.body,
)
