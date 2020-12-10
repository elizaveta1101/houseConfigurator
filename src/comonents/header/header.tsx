import React from 'react'
import { Link } from 'react-router-dom'
import cx from 'classnames'

import logo from '../../assets/icons/logo.svg'
import authIcon from '../../assets/icons/auth-icon.svg'
import Menu from '../menu/menu'

import './styles.scss'

interface IHeaderProps {
  navMenuHandler: () => void
  authHandler: () => void
  allHideHandler: () => void
  isNavMenuOpen: boolean
  isAuthMenuOpen: boolean
}

const Header: React.FC<IHeaderProps> = ({
  navMenuHandler,
  authHandler,
  allHideHandler,
  isNavMenuOpen,
  isAuthMenuOpen,
}: IHeaderProps) => (
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
          onClick={navMenuHandler}
        >
          <div className="header__menu-burger-line" />
        </div>
      </div>

      <div
        className={cx('header__auth-menu', {
          'header__auth-menu_active': isAuthMenuOpen,
        })}
      >
        <Link to={'/profile'} className="header__profile-link">
          Профиль
        </Link>
        <Link to={'/'} className="header__logout-link">
          Выйти из системы
        </Link>
      </div>

      <Menu isOpen={isNavMenuOpen} modifier={'menu_header'} menuHandler={allHideHandler} />
    </div>
  </div>
)

export default Header
