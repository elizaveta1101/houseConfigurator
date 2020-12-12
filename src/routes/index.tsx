import React from 'react'
import { Switch, Route, Redirect } from 'react-router-dom'

import HomePage from '../comonents/pages/home-page/home-page'
import AuthPage from '../comonents/pages/auth-page/auth-page'
import AdminsSitePage from '../comonents/pages/admins-site-page/admins-site-page'
import HousesFinishPage from '../comonents/pages/houses-finish-page/houses-finish-page'
import InfoPollPage from '../comonents/pages/info-poll-page/info-poll-page'
import OrdersPage from '../comonents/pages/orders-page/orders-page'
import MainPage from '../comonents/pages/main-page/main-page'
import PollPage from '../comonents/pages/poll-page/poll-page'
import ProfilePage from '../comonents/pages/profile-page/profile-page'
import ProjectFinishPage from '../comonents/pages/project-finish-page/project-finish-page'
import ProjectInvestPage from '../comonents/pages/project-invest-page/project-invest-page'
import ThroughElementsPage from '../comonents/pages/through-elements-page/through-elements-page'

export const useRoutes: React.FC<boolean> = (isAuth: boolean) =>
  isAuth ? (
    <Switch>
      <Route path={'/'} exact component={HomePage} />
      <Route path={'/through-elements'} component={ThroughElementsPage} />
      <Route path={'/houses-finish'} component={HousesFinishPage} />
      <Route path={'/project-finish'} component={ProjectFinishPage} />
      <Route path={'/main-page'} component={MainPage} />
      <Route path={'/project-invest'} component={ProjectInvestPage} />
      <Route path={'/info-poll'} component={InfoPollPage} />
      <Route path={'/poll'} component={PollPage} />
      <Route path={'/orders'} component={OrdersPage} />
      <Route path={'/profile'} component={ProfilePage} />
      <Route path={'/admins-site'} component={AdminsSitePage} />
    </Switch>
  ) : (
    <Switch>
      <Route path={'/auth'} exact component={AuthPage} />
      <Redirect to={'/auth'} />
    </Switch>
  )
