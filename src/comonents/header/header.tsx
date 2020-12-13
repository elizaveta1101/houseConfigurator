import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import cx from 'classnames'

import logo from '../../assets/icons/logo.svg'
import authIcon from '../../assets/icons/auth-icon.svg'
import Menu from '../menu/menu'
import { AppContext } from '../../context'
import { HeaderPayloads } from '../../data/data'

import './styles.scss'

const Header: React.FC = () => {
  const { isAuth, headerHandler, isNavMenuOpen, isAuthMenuOpen } = useContext(AppContext)
  return (
    <div className="header" onClick={headerHandler}>
      <div className="header__wrapper">
        <div className="header__side-wrapper">
          <Link
            to={HeaderPayloads.homeLink}
            className="header__logo"
            data-link={HeaderPayloads.homeLink}
          >
            <img className="header__logo-image" src={logo} alt="logo" />
          </Link>
          <a href="#" className="header__link">
            Перейти на сайт
          </a>
        </div>

        <div
          className={cx('header__side-wrapper', {
            'header__side-wrapper_hide': !isAuth,
          })}
        >
          <div className="header__auth-icon" data-element={HeaderPayloads.authButton}>
            <img className="header__auth-icon-image" src={authIcon} alt="icon" />
          </div>
          <button
            className={cx('header__auth-button', {
              'header__auth-button_active': isAuthMenuOpen,
            })}
            data-element={HeaderPayloads.authButton}
          >
            Личный кабинет
          </button>
          <div
            className={cx('header__menu-burger', {
              'header__menu-burger_active': isNavMenuOpen,
            })}
            data-element={HeaderPayloads.menuBurger}
          >
            <div className="header__menu-burger-line" />
          </div>
        </div>

        <div
          className={cx('header__auth-menu', {
            'header__auth-menu_active': isAuthMenuOpen,
          })}
        >
          <Link
            to={HeaderPayloads.profileLink}
            className="header__profile-link"
            data-link={HeaderPayloads.profileLink}
          >
            Профиль
          </Link>
          <Link
            to={HeaderPayloads.authLink}
            className="header__logout-link"
            data-element={HeaderPayloads.logoutLink}
            onClick={headerHandler}
          >
            Выйти из системы
          </Link>
        </div>

        <Menu isOpen={isNavMenuOpen} modifier={'menu_header'} />
      </div>
    </div>
  )
}

export default Header
