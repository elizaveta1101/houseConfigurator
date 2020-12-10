import React from 'react'
import ReactDOM from 'react-dom'
import { createHashHistory, History } from 'history'
import { BrowserRouter, Router } from 'react-router-dom'

import App from './App'

const history: History = createHashHistory()

ReactDOM.render(
  <Router history={history}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Router>,
  document.getElementById('root')
)
