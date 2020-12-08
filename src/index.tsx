import React from 'react'
import ReactDOM from 'react-dom'
import { createHashHistory, History } from 'history'
import { Router } from 'react-router-dom'

import App from './App'

const history: History = createHashHistory()

ReactDOM.render(
  <Router history={history}>
    <App />
  </Router>,
  document.getElementById('root')
)
