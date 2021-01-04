import React, { useEffect, useState } from 'react'
import { Alert } from 'antd'
import cx from 'classnames'

import { useStore } from '../../hooks'
import { ActionTypes } from '../../store'

import './styles.scss'

interface IAlert {
  type: 'success' | 'info' | 'warning' | 'error'
  message: string
  visible: boolean
}

const CustomAlert: React.FC = () => {
  const { getItem } = useStore()
  const alertValues = getItem(ActionTypes.ALERT)
  const [alert, setAlert] = useState<IAlert>({
    visible: false,
    type: 'success',
    message: '',
  })

  useEffect(() => {
    alertValues && setAlert(alertValues)

    setTimeout(() => {
      alertValues && setAlert({ ...alert, visible: false })
    }, 2500)
  }, [alertValues])

  const { visible, message, type } = alert

  return (
    <Alert
      className={cx('custom-alert', {
        'custom-alert_show': visible,
      })}
      message={message}
      type={type}
      showIcon
    />
  )
}

export default CustomAlert
