import React, { useState } from 'react'
import { Route, Switch } from 'react-router-dom'

import Header from './comonents/header/header'
import Menu from './comonents/menu/menu'
import Overlay from './comonents/overlay/overlay'
import HomePage from './comonents/pages/home-page/home-page'

import './styles/animation.scss'
import './styles/fonts.scss'
import './styles/index.scss'

const App: React.FC = () => {
  const [isNavMenuOpen, setIsNavMenuOpen] = useState(false)
  const [isAuthMenuOpen, setIsAuthMenuOpen] = useState(false)
  const [isOverlayOpen, setIsOverlayOpen] = useState(false)

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
    <div className="app">
      <Overlay isOpen={isOverlayOpen} overlayHandler={allHideHandler} />

      <Header
        navMenuHandler={navMenuHandler}
        authHandler={authHandler}
        allHideHandler={allHideHandler}
        isNavMenuOpen={isNavMenuOpen}
        isAuthMenuOpen={isAuthMenuOpen}
      />
      <div className="content">
        <Menu modifier={'menu_content'} />
        <Switch>
          <Route path={'/'} exact component={HomePage} />
        </Switch>
      </div>
    </div>
  )
}

export default App
