import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter, Route, Router, Switch } from 'react-router-dom'
import { createHashHistory } from 'history'
import { Provider } from 'react-redux'
import 'antd/dist/antd.css'

import store from './store'
import ClientSideStore from './ClientSide/redux/store'

import AdminSide from './AdminSide/App'
import ClientSide from './ClientSide/App'

import './styles/animation.scss'
import './styles/fonts.scss'
import './styles/index.scss'

export const history = createHashHistory()

ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>
      <Router history={history}>
        <Switch>
          <Route path={'/admin'} component={AdminSide} />
          <Provider store={ClientSideStore}>
            <Route path={'/'} component={ClientSide} />
          </Provider>
        </Switch>
      </Router>
    </BrowserRouter>
  </Provider>,
  document.getElementById('root')
)
