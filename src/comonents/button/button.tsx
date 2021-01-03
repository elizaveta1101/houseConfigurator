import React from 'react'
import { Button } from 'antd'
import cx from 'classnames'

import './styles.scss'

interface ICustomButtonProps {
  clickHandler?: () => void
  modifier?: string
  disabled?: boolean
  type?: 'primary' | 'default'
  htmlType?: 'button' | 'submit'
  danger?: boolean
  text?: string | React.ReactElement
  loading?: boolean
}

const CustomButton: React.FC<ICustomButtonProps> = ({
  clickHandler,
  modifier,
  danger = false,
  disabled = false,
  htmlType = 'button',
  type = 'primary',
  text = 'кнопка',
  loading = false,
}: ICustomButtonProps) => (
  <Button
    className={cx('custom-button', `custom-button_${type}`, {
      [modifier as string]: modifier,
    })}
    type={type}
    htmlType={htmlType}
    disabled={disabled}
    danger={danger}
    onClick={clickHandler}
    loading={loading}
  >
    {text}
  </Button>
)

export default CustomButton
