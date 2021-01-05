import React from 'react'
import cx from 'classnames'

import Button from '../button/button'
import { data } from './data'

import './styles.scss'
interface IPopupProps {
  children?: React.ReactNode
  modifier?: string
  visible?: boolean
  type: string
  negativeHandler?: () => void
  positiveHandler?: () => void
}

const Popup: React.FC<IPopupProps> = ({
  children,
  modifier,
  visible = true,
  type,
  negativeHandler,
  positiveHandler,
}: IPopupProps) => (
  <div
    className={cx('popup', {
      [modifier as string]: modifier,
      popup_show: visible,
    })}
  >
    <div className="popup__scroll-conatiner">
      <h3 className="popup__title">{data[type].title}</h3>
      {children}
      {negativeHandler && positiveHandler && (
        <div className="popup__buttons-wrapper">
          <Button
            type="default"
            modifier={'button_popup'}
            text={data[type].leftButtonText}
            clickHandler={negativeHandler}
          />
          <Button
            modifier={'button_popup'}
            text={data[type].rightButtonText}
            clickHandler={positiveHandler}
          />
        </div>
      )}
    </div>
  </div>
)

export default Popup
