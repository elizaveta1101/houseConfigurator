import React from 'react'
import cx from 'classnames'

import './styles.scss'

interface IOverlayProps {
  isOpen: boolean
  overlayHandler: () => void
}

const Overlay: React.FC<IOverlayProps> = ({ isOpen, overlayHandler }: IOverlayProps) => {
  return (
    <div
      className={cx('overlay', {
        overlay_show: isOpen,
      })}
      onClick={overlayHandler}
    />
  )
}

export default Overlay
