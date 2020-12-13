import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import cx from 'classnames'

import { data } from './data'
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
        {data.map(({ id, text, icon, link }) => (
          <Link
            to={link}
            className={cx('menu__link-wrapper', {
              'menu__link-wrapper_active': link === activeLink,
            })}
            key={id}
            data-link={link}
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
