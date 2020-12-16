import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import cx from 'classnames'

import { linksdata } from './data'
import { AppContext } from '../../context'

import './styles.scss'
interface IMenuProps {
  isOpen?: boolean
  modifier?: string
}

const Menu: React.FC<IMenuProps> = ({ isOpen = true, modifier }: IMenuProps) => {
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
            to={linkPath}
            className={cx('menu__link-wrapper', {
              'menu__link-wrapper_active': linkPath === activeLink,
            })}
            key={id}
            data-link={linkPath}
            onClick={headerHandler}
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
