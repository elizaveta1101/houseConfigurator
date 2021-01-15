import React from 'react'
import { Button } from 'antd'
import cx from 'classnames'

import './styles.scss'

interface IButtonProps {
  type?: 'primary' | 'default' | 'text'
  text?: string | React.ReactElement
  htmlType?: 'button' | 'submit'
  clickHandler?: () => void
  disabled?: boolean
  modifier?: string
  loading?: boolean
  danger?: boolean
}

const CustomButton: React.FC<IButtonProps> = ({
  htmlType = 'button',
  type = 'primary',
  disabled = false,
  loading = false,
  text = 'кнопка',
  danger = false,
  clickHandler,
  modifier,
}) => (
  <Button
    className={cx('custom-button', `custom-button_${type}`, {
      [modifier as string]: modifier,
    })}
    onClick={clickHandler}
    htmlType={htmlType}
    disabled={disabled}
    loading={loading}
    danger={danger}
    type={type}
  >
    {text}
  </Button>
)

export default CustomButton
