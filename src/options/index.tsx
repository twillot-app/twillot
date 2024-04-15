/* @refresh reload */
import { render } from 'solid-js/web'
import { HashRouter, Route } from '@solidjs/router'

import { Home } from './Home'
import '../assets/main.css'
import Layout from './Layout'
import Export from './Export'

render(
  () => (
    <HashRouter root={Layout}>
      <Route path="/" component={Home} />
      <Route path="/export" component={Export} />
    </HashRouter>
  ),
  document.getElementById('app') ?? document.body,
)
