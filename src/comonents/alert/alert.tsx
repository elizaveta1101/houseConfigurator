import React, { useEffect, useState } from 'react'
import { Alert } from 'antd'
import cx from 'classnames'

import './styles.scss'

interface ICustomAlertProps {
  modifier?: string
  type: 'success' | 'info' | 'warning' | 'error'
  message: string
  visible: boolean
}

const CustomAlert: React.FC<ICustomAlertProps> = ({
  modifier,
  type = 'success',
  message,
  visible,
}: ICustomAlertProps) => (
  <Alert
    className={cx('custom-alert', {
      'custom-alert_show': visible,
      [modifier as string]: modifier,
    })}
    message={message}
    type={type}
    showIcon
  />
)

export default CustomAlert
