import React from 'react'
import cx from 'classnames'

import './styles.scss'

interface IButtonProps {
  clickHandler: () => void
  modifier?: string
  disable?: boolean
  text: string
}

const Button: React.FC<IButtonProps> = ({
  clickHandler,
  modifier,
  disable,
  text,
}: IButtonProps) => (
  <button
    className={cx('button', {
      [modifier as string]: modifier,
      inactive: disable,
    })}
    onClick={clickHandler}
  >
    <span>{text}</span>
  </button>
)

export default Button
