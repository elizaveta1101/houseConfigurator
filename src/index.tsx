import React from 'react'
import ReactDOM from 'react-dom'
import { createBrowserHistory } from 'history'
import { BrowserRouter, Redirect, Route, Router, Switch } from 'react-router-dom'
import { Provider } from 'react-redux'
import 'antd/dist/antd.css'

import store from './store'
import ClientSideStore from './ClientSide/redux/store'

import ControlPanel from './AdminSide/App'
import ClientSide from './ClientSide/App'

import './styles/animation.scss'
import './styles/fonts.scss'
import './styles/index.scss'

export const history = createBrowserHistory()

ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>
      <Router history={history}>
        <Switch>
          <Route path={'/admin'} component={ControlPanel} />
          <Provider store={ClientSideStore}>
            <Route path={'/'} component={ClientSide} />
          </Provider>
          <Redirect to={'/'} />
        </Switch>
      </Router>
    </BrowserRouter>
  </Provider>,
  document.getElementById('root')
)
