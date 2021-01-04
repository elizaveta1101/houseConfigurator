import React from 'react'
import cx from 'classnames'

import Button from '../button/button'
import { data } from './data'

import './styles.scss'
interface IPopupProps {
  children?: React.ReactNode
  modifier?: string
  type: string
  negativeHandler?: () => void
  positiveHandler?: () => void
}

const Popup: React.FC<IPopupProps> = ({
  children,
  modifier,
  type,
  negativeHandler,
  positiveHandler,
}: IPopupProps) => (
  <div
    className={cx('popup', {
      [modifier as string]: modifier,
    })}
  >
    <h3 className="popup__title">{data[type].title}</h3>
    {children}
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
  </div>
)

export default Popup
