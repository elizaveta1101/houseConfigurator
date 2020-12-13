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
  text: string
}

const CustomButton: React.FC<ICustomButtonProps> = ({
  clickHandler,
  modifier,
  disabled = false,
  htmlType = 'button',
  type = 'primary',
  text,
}: ICustomButtonProps) => (
  <Button
    className={cx('custom-button', `custom-button_${type}`, {
      [modifier as string]: modifier,
    })}
    type={type}
    htmlType={htmlType}
    disabled={disabled}
    onClick={clickHandler}
  >
    {text}
  </Button>
)

export default CustomButton
