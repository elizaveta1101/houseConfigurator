import React from 'react'
import { Switch, Route, Redirect } from 'react-router-dom'

import HomePage from '../comonents/pages/home-page/home-page'
import AuthPage from '../comonents/pages/auth-page/auth-page'
import AdminsPage from '../comonents/pages/admins-page/admins-page'
import HousesFinishPage from '../comonents/pages/houses-page/houses-page'
import InfoPollPage from '../comonents/pages/info-page/info-page'
import OrdersPage from '../comonents/pages/orders-page/orders-page'
import MainPage from '../comonents/pages/main-page/main-page'
import PollPage from '../comonents/pages/poll-page/poll-page'
import ProfilePage from '../comonents/pages/profile-page/profile-page'
import ClientDataPage from '../comonents/pages/clients-page/clients-page'
import ProjectFinishPage from '../comonents/pages/projects-page/projects-page'
import ProjectInvestPage from '../comonents/pages/invests-page/invests-page'
import ThroughElementsPage from '../comonents/pages/throughs-page/throughs-page'
import { MenuLinkPaths } from '../data'

export const useRoutes: React.FC<boolean> = (isAuth: boolean) =>
  isAuth ? (
    <Switch>
      <Route path={MenuLinkPaths.homePath} exact component={HomePage} />
      <Route path={MenuLinkPaths.throughElementsPath} component={ThroughElementsPage} />
      <Route path={MenuLinkPaths.housesFinishPath} component={HousesFinishPage} />
      <Route path={MenuLinkPaths.projectFinishPath} component={ProjectFinishPage} />
      <Route path={MenuLinkPaths.mainPagePath} component={MainPage} />
      <Route path={MenuLinkPaths.projectInvestPath} component={ProjectInvestPage} />
      <Route path={MenuLinkPaths.infoPollPath} component={InfoPollPage} />
      <Route path={MenuLinkPaths.clientDataPath} component={ClientDataPage} />
      <Route path={MenuLinkPaths.pollPath} component={PollPage} />
      <Route path={MenuLinkPaths.ordersPath} component={OrdersPage} />
      <Route path={MenuLinkPaths.profilePath} component={ProfilePage} />
      <Route path={MenuLinkPaths.adminsSitePath} component={AdminsPage} />
    </Switch>
  ) : (
    <Switch>
      <Route path={MenuLinkPaths.authPath} component={AuthPage} exact />
      <Redirect to={MenuLinkPaths.authPath} />
    </Switch>
  )
