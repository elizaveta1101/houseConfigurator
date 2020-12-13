import React from 'react'
import cx from 'classnames'

import './styles.scss'
interface IOverlayProps {
  isOpen: boolean
  overlayHandler: () => void
  children?: React.ReactNode
}

const Overlay: React.FC<IOverlayProps> = ({ isOpen, overlayHandler, children }: IOverlayProps) => {
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
