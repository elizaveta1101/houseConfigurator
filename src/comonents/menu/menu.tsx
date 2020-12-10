import React from 'react'
import { Link } from 'react-router-dom'
import cx from 'classnames'

import { data } from './data'

import './styles.scss'

interface IMenuProps {
  isOpen?: boolean
  modifier?: string
  menuHandler?: () => void
}

const Menu: React.FC<IMenuProps> = ({ isOpen = true, modifier, menuHandler }: IMenuProps) => {
  return (
    <div
      className={cx('menu', {
        menu_show: isOpen,
        [modifier as string]: modifier,
      })}
    >
      <div className="menu__wrapper">
        {data.map(({ id, text, icon, link }) => (
          <Link to={link} className="menu__link-wrapper" key={id} onClick={menuHandler}>
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
