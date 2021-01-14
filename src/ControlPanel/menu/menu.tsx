import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import cx from 'classnames'

import { AppContext } from '../../context'
import { linksdata } from './data'

import './styles.scss'
interface IMenuProps {
  modifier?: string
  isOpen?: boolean
}

const Menu: React.FC<IMenuProps> = ({ isOpen = true, modifier }) => {
  const { activeLink, headerHandler } = useContext(AppContext)
  return (
    <div
      className={cx('menu', {
        menu_show: isOpen,
        [modifier as string]: modifier,
      })}
    >
      <div className="menu__wrapper">
        {linksdata.map(({ id, text, icon, linkPath }) => (
          <Link
            className={cx('menu__link-wrapper', {
              'menu__link-wrapper_active': linkPath === activeLink,
            })}
            onClick={headerHandler}
            data-link={linkPath}
            to={linkPath}
            key={id}
          >
            <div className="menu__link-icon">
              <img className="menu__link-icon-image" src={icon} alt={`icon-${id}`} />
            </div>
            <p className="menu__link">{text}</p>
          </Link>
        ))}
      </div>
    </div>
  )
}

export default Menu
