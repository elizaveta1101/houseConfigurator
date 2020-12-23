import React from 'react'
import ReactDOM from 'react-dom'
import { createHashHistory, History } from 'history'
import { BrowserRouter, Router } from 'react-router-dom'
import { Provider } from 'react-redux'

import App from './App'
import store from './store'

const history: History = createHashHistory()

ReactDOM.render(
  <Router history={history}>
    <BrowserRouter>
      <Provider store={store}>
        <App />
      </Provider>
    </BrowserRouter>
  </Router>,
  document.getElementById('root')
)
