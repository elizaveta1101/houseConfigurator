import React from 'react'
import cx from 'classnames'

import Button from '../button/button'
import { data } from './data'

import './styles.scss'
interface IPopupProps {
  negativeHandler?: () => void
  positiveHandler?: () => void
  children?: React.ReactNode
  disableButton?: boolean
  modifier?: string
  visible?: boolean
  loading?: boolean
  type: string
}

const Popup: React.FC<IPopupProps> = ({
  negativeHandler,
  positiveHandler,
  visible = true,
  disableButton,
  children,
  modifier,
  loading,
  type,
}) => (
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
            disabled={disableButton}
            modifier={'button_popup'}
            text={data[type].rightButtonText}
            clickHandler={positiveHandler}
            loading={loading}
          />
        </div>
      )}
    </div>
  </div>
)

export default Popup
