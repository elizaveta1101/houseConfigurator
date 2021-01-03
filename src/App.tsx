import React, { useState, SyntheticEvent } from 'react'
import axios from 'axios'
import 'antd/dist/antd.css'

import { AppContext, AuthContext } from './context'
import { useAuth, useRoutes } from './hooks'
import { HeaderPayloads } from './data'

import Header from './comonents/header/header'
import Menu from './comonents/menu/menu'
import Overlay from './comonents/overlay/overlay'
import CustomAlert from './comonents/alert/alert'

import './styles/fonts.scss'
import './styles/animation.scss'
import './styles/index.scss'

const currentPage = window.location.pathname

interface IAlert {
  modifier?: string
  type: 'success' | 'info' | 'warning' | 'error'
  message: string
  visible: boolean
}

const App: React.FC = ({}) => {
  const { token, login, logout, userId, ready } = useAuth()
  const [isNavMenuOpen, setIsNavMenuOpen] = useState(false)
  const [isAuthMenuOpen, setIsAuthMenuOpen] = useState(false)
  const [isOverlayOpen, setIsOverlayOpen] = useState(false)
  const [activeLink, setActiveLink] = useState(currentPage)
  const [alert, setAlert] = useState<IAlert>({
    visible: false,
    type: 'success',
    message: '',
  })

  const isAuth = !!token

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

  const alertHandler = (values: any) => {
    setAlert(values)

    setTimeout(() => {
      setAlert({ ...alert, visible: false })
    }, 2500)
  }

  return (
    <AuthContext.Provider value={{ token, login, logout, userId, isAuth }}>
      <AppContext.Provider
        value={{
          isAuth,
          isNavMenuOpen,
          isAuthMenuOpen,
          isOverlayOpen,
          activeLink,
          hideAll,
          headerHandler,
          alertHandler,
        }}
      >
        <div className="app">
          <Overlay isOpen={isOverlayOpen} overlayHandler={hideAll} />
          <CustomAlert {...alert} />
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
