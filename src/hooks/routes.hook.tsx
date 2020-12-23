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
import ClientDataPage from '../comonents/pages/client-data-page/client-data-page'
import ProjectFinishPage from '../comonents/pages/project-finish-page/project-finish-page'
import ProjectInvestPage from '../comonents/pages/project-invest-page/project-invest-page'
import ThroughElementsPage from '../comonents/pages/through-elements-page/through-elements-page'
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
      <Route path={MenuLinkPaths.adminsSitePath} component={AdminsSitePage} />
    </Switch>
  ) : (
    <Switch>
      <Route path={MenuLinkPaths.authPath} exact component={AuthPage} />
      <Redirect to={MenuLinkPaths.authPath} />
    </Switch>
  )
