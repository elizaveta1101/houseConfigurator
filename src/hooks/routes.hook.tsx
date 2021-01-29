import React from 'react'
import { Switch, Route, Redirect } from 'react-router-dom'

import { MenuLinkPaths } from '../data'

import HomePage from '../AdminSide/pages/home-page/home-page'
import AuthPage from '../AdminSide/pages/auth-page/auth-page'
import AdminsPage from '../AdminSide/pages/admins-page/admins-page'
import HousesPage from '../AdminSide/pages/houses-page/houses-page'
import InfoPollPage from '../AdminSide/pages/info-page/info-page'
import OrdersPage from '../AdminSide/pages/orders-page/orders-page'
import MainPage from '../AdminSide/pages/main-page/main-page'
import PollPage from '../AdminSide/pages/poll-page/poll-page'
import ProfilePage from '../AdminSide/pages/profile-page/profile-page'
import ClientDataPage from '../AdminSide/pages/clients-page/clients-page'
import ProjectFinishPage from '../AdminSide/pages/projects-page/projects-page'
import ProjectInvestPage from '../AdminSide/pages/invests-page/invests-page'
import ThroughElementsPage from '../AdminSide/pages/throughs-page/throughs-page'

export const useRoutes: React.FC<boolean> = (isAuth: boolean) =>
  isAuth ? (
    <Switch>
      <Route path={MenuLinkPaths.homePath} exact component={HomePage} />
      <Route path={MenuLinkPaths.throughElementsPath} component={ThroughElementsPage} />
      <Route path={MenuLinkPaths.housesFinishPath} component={HousesPage} />
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
