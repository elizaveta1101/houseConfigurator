import React from 'react'
import cx from 'classnames'

import './styles.scss'
interface IOverlayProps {
  overlayHandler?: () => void
  children?: React.ReactNode
  isOpen: boolean
}

const Overlay: React.FC<IOverlayProps> = ({ isOpen, overlayHandler, children }) => {
  return (
    <div
      className={cx('overlay', {
        overlay_show: isOpen,
      })}
      onClick={overlayHandler}
    >
      {children}
    </div>
  )
}

export default Overlay
