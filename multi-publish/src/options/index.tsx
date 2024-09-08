/* @refresh reload */
import { render } from 'solid-js/web'

import '../assets/main.css'
import Popup from './Options'

render(() => <Popup />, document.getElementById('app') ?? document.body)
