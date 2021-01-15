import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter, Redirect, Route, Router, Switch } from 'react-router-dom'
import { createHashHistory, History } from 'history'
import { Provider } from 'react-redux'

import store from './store'
import ClientSideStore from './ClientSideComponents/redux/store'

import ControlPanel from './ControlPanelComponents/Control-panel'
import ClientSide from './ClientSideComponents/App'

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
