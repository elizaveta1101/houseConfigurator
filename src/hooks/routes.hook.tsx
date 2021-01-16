import React from 'react'
import { Switch, Route, Redirect } from 'react-router-dom'

import { MenuLinkPaths } from '../data'

import HomePage from '../ControlPanelComponents/pages/home-page/home-page'
import AuthPage from '../ControlPanelComponents/pages/auth-page/auth-page'
import AdminsPage from '../ControlPanelComponents/pages/admins-page/admins-page'
import HousesPage from '../ControlPanelComponents/pages/houses-page/houses-page'
import InfoPollPage from '../ControlPanelComponents/pages/info-page/info-page'
import OrdersPage from '../ControlPanelComponents/pages/orders-page/orders-page'
import MainPage from '../ControlPanelComponents/pages/main-page/main-page'
import PollPage from '../ControlPanelComponents/pages/poll-page/poll-page'
import ProfilePage from '../ControlPanelComponents/pages/profile-page/profile-page'
import ClientDataPage from '../ControlPanelComponents/pages/clients-page/clients-page'
import ProjectFinishPage from '../ControlPanelComponents/pages/projects-page/projects-page'
import ProjectInvestPage from '../ControlPanelComponents/pages/invests-page/invests-page'
import ThroughElementsPage from '../ControlPanelComponents/pages/throughs-page/throughs-page'

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
