import React from 'react'
import cx from 'classnames'

import Overlay from '../overlay/overlay'
import Button from '../button/button'
import { data } from './data'

import './styles.scss'

interface IPopupProps {
  modifier?: string
  type: string
  isOpen: boolean
  popupHandler: () => void
  leftHandler: () => void
  rightHandler: () => void
}

console.log(data)

const Popup: React.FC<IPopupProps> = ({
  modifier,
  type,
  isOpen,
  popupHandler,
  leftHandler,
  rightHandler,
}: IPopupProps) => (
  <Overlay isOpen={isOpen} overlayHandler={popupHandler}>
    <div
      className={cx('popup', {
        [modifier as string]: modifier,
      })}
    >
      <h3 className="popup__title">{data[type].title}</h3>
      <div className="popup__buttons-wrapper">
        <Button
          modifier={'button_popup'}
          text={data[type].leftButtonText}
          clickHandler={leftHandler}
        />
        <Button
          modifier={'button_popup'}
          text={data[type].rightButtonText}
          clickHandler={rightHandler}
        />
      </div>
    </div>
  </Overlay>
)

export default Popup
