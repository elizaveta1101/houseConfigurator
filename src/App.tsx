import React, { useEffect, useState } from 'react'
import 'antd/dist/antd.css'
import axios from 'axios'

import { HeaderPayloads, storageKeys } from './data'
import { AppContext, AuthContext } from './context'
import { useAuth, useRoutes } from './hooks'
import { history } from './'

import Overlay from './comonents/overlay/overlay'
import Header from './comonents/header/header'
import Alert from './comonents/alert/alert'
import Menu from './comonents/menu/menu'

import './styles/animation.scss'
import './styles/fonts.scss'
import './styles/index.scss'

const currentPage = window.location.pathname

const App: React.FC = ({}) => {
  const userData = sessionStorage.getItem(storageKeys.USER_DATA)
  const { token, login, logout, userId, isAuth, ready } = useAuth()
  const [isNavMenuOpen, setIsNavMenuOpen] = useState(false)
  const [isAuthMenuOpen, setIsAuthMenuOpen] = useState(false)
  const [isOverlayOpen, setIsOverlayOpen] = useState(false)
  const [activeLink, setActiveLink] = useState(currentPage)
  const routes = useRoutes(isAuth)

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

  useEffect(() => {
    history.push(activeLink)
  }, [activeLink])

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
        <div className="app">
          <Overlay isOpen={isOverlayOpen} overlayHandler={hideAll} />
          <Alert />
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
