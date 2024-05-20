/* @refresh reload */
import { render } from 'solid-js/web'

import getRoot from '../components/Root'

render(getRoot, document.getElementById('app') ?? document.body)
