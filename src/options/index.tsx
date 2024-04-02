/* @refresh reload */
import { render } from 'solid-js/web'

import { Options } from './Options'
import '../assets/main.css'

render(() => <Options />, document.getElementById('app') ?? document.body)
