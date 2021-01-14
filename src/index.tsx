import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter, Redirect, Route, Router, Switch } from 'react-router-dom'
import { createHashHistory, History } from 'history'
import { Provider } from 'react-redux'

import store from './store'
import ClientSideStore from './ClientSide/redux/store'

import ControlPanel from './App'
import ClientSide from './ClientSide/App'

const history: History = createHashHistory()

ReactDOM.render(
  <BrowserRouter>
    <Router history={history}>
      <Switch>
        {/* <Provider store={store}>
          <Route path={'/admin'} component={ControlPanel} />
        </Provider> */}
        <Provider store={ClientSideStore}>
          <Route path={'/'} component={ClientSide} />
        </Provider>
        <Redirect to={'/'} />
      </Switch>
    </Router>
  </BrowserRouter>,
  document.getElementById('root')
)
