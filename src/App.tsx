import React, { useState } from 'react'
import 'antd/dist/antd.css'

import Header from './comonents/header/header'
import Menu from './comonents/menu/menu'
import Overlay from './comonents/overlay/overlay'
import { AppContext } from './context'
import { useRoutes } from './routes'

import './styles/animation.scss'
import './styles/fonts.scss'
import './styles/index.scss'

const App: React.FC = () => {
  const [isNavMenuOpen, setIsNavMenuOpen] = useState(false)
  const [isAuthMenuOpen, setIsAuthMenuOpen] = useState(false)
  const [isOverlayOpen, setIsOverlayOpen] = useState(false)

  const isAuth = false
  const routes = useRoutes(isAuth)

  const authHandler = (): void => setIsAuthMenuOpen(!isAuthMenuOpen)

  const navMenuHandler = (): void => {
    setIsNavMenuOpen(!isNavMenuOpen)
    setIsOverlayOpen(!isOverlayOpen)
  }

  const allHideHandler = (): void => {
    setIsNavMenuOpen(false)
    setIsAuthMenuOpen(false)
    setIsOverlayOpen(false)
  }

  return (
    <AppContext.Provider
      value={{
        isAuth,
        isNavMenuOpen,
        isAuthMenuOpen,
        isOverlayOpen,
        authHandler,
        navMenuHandler,
        allHideHandler,
      }}
    >
      <div className="app">
        <Overlay isOpen={isOverlayOpen} overlayHandler={allHideHandler} />
        <Header />
        <div className="content">
          <Menu modifier={'menu_content'} isOpen={isAuth} />
          {routes}
        </div>
      </div>
    </AppContext.Provider>
  )
}

export default App
