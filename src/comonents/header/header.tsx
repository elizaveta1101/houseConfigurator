import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import cx from 'classnames'

import logo from '../../assets/icons/logo.svg'
import authIcon from '../../assets/icons/auth-icon.svg'
import './styles.scss'

const Header: React.FC = () => {
  const [isAuthMenuOpen, setIsAuthMenuOpen] = useState(false)
  const [isNavMenuOpen, setIsNavMenuOpen] = useState(false)

  const authHandler = () => setIsAuthMenuOpen(!isAuthMenuOpen)
  const navHandler = () => setIsNavMenuOpen(!isNavMenuOpen)

  return (
    <div className="header">
      <div className="header__wrapper">
        <div className="header__side-wrapper">
          <Link to={'/'} className="header__logo">
            <img className="header__logo-image" src={logo} alt="logo" />
          </Link>
          <a href="#" className="header__link">
            Перейти на сайт
          </a>
        </div>
        <div className="header__side-wrapper">
          <div className="header__auth-icon" onClick={authHandler}>
            <img className="header__auth-icon-image" src={authIcon} alt="icon" />
          </div>
          <button
            className={cx('header__auth-button', {
              'header__auth-button_active': isAuthMenuOpen,
            })}
            onClick={authHandler}
          >
            Личный кабинет
          </button>
          <div
            className={cx('header__menu-burger', {
              'header__menu-burger_active': isNavMenuOpen,
            })}
            onClick={navHandler}
          >
            <div className="header__menu-burger-line" />
          </div>
        </div>
        {isAuthMenuOpen && (
          <div className="header__auth-menu">
            <Link to={'/profile'} className="header__profile-link">
              Профиль
            </Link>
            <Link to={'/'} className="header__logout-link">
              Выйти из системы
            </Link>
          </div>
        )}
      </div>
    </div>
  )
}

export default Header
