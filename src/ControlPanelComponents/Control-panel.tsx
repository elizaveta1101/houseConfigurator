import React, { useState } from 'react'
import axios from 'axios'

import { HeaderPayloads, storageKeys } from '../data'
import { AppContext, AuthContext } from '../context'
import { useAuth, useRoutes } from '../hooks'

import Overlay from './overlay/overlay'
import Header from './header/header'
import Alert from './alert/alert'
import Menu from './menu/menu'

import './styles.scss'

const currentPage = window.location.pathname

const App: React.FC = ({}) => {
  const userData = sessionStorage.getItem(storageKeys.USER_DATA)
  const { token, login, logout, userId, isAuth, ready } = useAuth()
  const [isNavMenuOpen, setIsNavMenuOpen] = useState(false)
  const [isAuthMenuOpen, setIsAuthMenuOpen] = useState(false)
  const [isOverlayOpen, setIsOverlayOpen] = useState(false)
  const [activeLink, setActiveLink] = useState(currentPage)
  const routes = useRoutes(!isAuth)

  const headerHandler = (e: React.SyntheticEvent<HTMLElement>) => {
    hideAll()

    const { element, link } = (e.target as HTMLElement).dataset

    if (link) setActiveLink(link)
    if (element === HeaderPayloads.logoutLink) {
      axios.get('/api/logout')
      logout()
    }
    if (element === HeaderPayloads.authButton) setIsAuthMenuOpen(!isAuthMenuOpen)
    if (element === HeaderPayloads.menuBurger) {
      setIsNavMenuOpen(!isNavMenuOpen)
      setIsOverlayOpen(!isOverlayOpen)
    }
  }

  const hideAll = () => {
    setIsNavMenuOpen(false)
    setIsAuthMenuOpen(false)
    setIsOverlayOpen(false)
  }

  return (
    <AuthContext.Provider value={{ token, login, logout, userId, isAuth }}>
      <AppContext.Provider
        value={{
          userData: userData && JSON.parse(userData),
          isNavMenuOpen,
          isAuthMenuOpen,
          isOverlayOpen,
          activeLink,
          hideAll,
          headerHandler,
        }}
      >
        <div className="control-panel">
          <Overlay isOpen={isOverlayOpen} overlayHandler={hideAll} />
          <Alert />
          <Header />
          <div className="control-panel__content">
            <Menu modifier={'control-panel__menu_content'} isOpen={!isAuth} />
            {routes}
          </div>
        </div>
      </AppContext.Provider>
    </AuthContext.Provider>
  )
}

export default App
