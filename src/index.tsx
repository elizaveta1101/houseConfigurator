import React from 'react'
import ReactDOM from 'react-dom'
import { createBrowserHistory } from 'history'
import { BrowserRouter, Router } from 'react-router-dom'
import { Provider } from 'react-redux'

import store from './store'

import App from './App'

export const history = createBrowserHistory()

ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>
      <Router history={history}>
        <App />
      </Router>
    </BrowserRouter>
  </Provider>,
  document.getElementById('root')
)
