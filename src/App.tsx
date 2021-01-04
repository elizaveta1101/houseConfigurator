import React, { useState, SyntheticEvent } from 'react'
import axios from 'axios'
import 'antd/dist/antd.css'

import { AppContext, AuthContext } from './context'
import { useAuth, useRoutes } from './hooks'
import { HeaderPayloads, storageKeys } from './data'

import Header from './comonents/header/header'
import Menu from './comonents/menu/menu'
import Overlay from './comonents/overlay/overlay'
import CustomAlert from './comonents/alert/alert'

import './styles/fonts.scss'
import './styles/animation.scss'
import './styles/index.scss'

const currentPage = window.location.pathname

const App: React.FC = ({}) => {
  const userData = sessionStorage.getItem(storageKeys.USER_DATA)
  const { token, login, logout, userId, isAdmin, isAuth, ready } = useAuth()
  const [isNavMenuOpen, setIsNavMenuOpen] = useState(false)
  const [isAuthMenuOpen, setIsAuthMenuOpen] = useState(false)
  const [isOverlayOpen, setIsOverlayOpen] = useState(false)
  const [activeLink, setActiveLink] = useState(currentPage)
  const routes = useRoutes(isAuth)

  const headerHandler = (e: SyntheticEvent) => {
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
    <AuthContext.Provider value={{ token, login, logout, userId, isAdmin, isAuth }}>
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
        <div className="app">
          <Overlay isOpen={isOverlayOpen} overlayHandler={hideAll} />
          <CustomAlert />
          <Header />
          <div className="content">
            <Menu modifier={'menu_content'} isOpen={isAuth} />
            {routes}
          </div>
        </div>
      </AppContext.Provider>
    </AuthContext.Provider>
  )
}

export default App
