import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter, Redirect, Route, Router, Switch } from 'react-router-dom'
import { createHashHistory, History } from 'history'
import { Provider } from 'react-redux'
import 'antd/dist/antd.css'

import store from './store'
import ClientSideStore from './ClientSide/redux/store'

import ControlPanel from './ControlPanel/Control-panel'
import ClientSide from './ClientSide/App'

import './styles/animation.scss'
import './styles/fonts.scss'
import './styles/index.scss'

const history: History = createHashHistory()

ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>
      <Router history={history}>
        <Switch>
          <Route path={'/admin/'} component={ControlPanel} />
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
