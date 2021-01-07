import React, { useEffect, useState } from 'react'
import { Input } from 'antd'

import { adminAddForm } from './data'

import AccessForm from '../../access-form/access-form'
import Form from '../../form/form'
import Overlay from '../../overlay/overlay'
import Popup from '../../popup/popup'

interface IAdminsPopupsProps {
  passwordHandler: (e: React.ChangeEvent<HTMLInputElement>) => void
  confirmHandler: () => void
  disableConfirm: boolean
  popupType?: string
  loading: boolean
  code: number
}

const AdminsPopups: React.FC<IAdminsPopupsProps> = ({
  passwordHandler,
  confirmHandler,
  disableConfirm,
  popupType,
  loading,
  code,
}) => {
  const [popup, setPopup] = useState({
    addition: false,
    confirm: false,
    overlay: false,
    rights: false,
    current: '',
  })

  const popupHandler = (type?: string) => {
    if (type === 'rights')
      setPopup({
        ...popup,
        overlay: true,
        rights: true,
        addition: false,
        confirm: false,
        current: type,
      })
    else if (type === 'addition')
      setPopup({
        ...popup,
        overlay: true,
        rights: false,
        addition: true,
        confirm: false,
        current: type,
      })
    else if (type === 'confirm')
      setPopup({
        ...popup,
        overlay: true,
        rights: false,
        addition: false,
        confirm: true,
      })
    else
      setPopup({
        ...popup,
        overlay: false,
        rights: false,
        addition: false,
        confirm: false,
        current: '',
      })
  }

  useEffect(() => {
    popupHandler(popupType)
  }, [popupType])

  return (
    <Overlay isOpen={popup.overlay}>
      <Popup
        positiveHandler={() => popupHandler('confirm')}
        modifier={'admins-page__popup-rights'}
        negativeHandler={popupHandler}
        visible={popup.rights}
        type={'rights'}
      >
        <AccessForm disabled={false} rightsCode={code} />
      </Popup>

      <Popup visible={popup.addition} modifier={'admins-page__popup-addition'} type={'addition'}>
        <Form
          positiveHandler={() => popupHandler('confirm')}
          negativeHandler={popupHandler}
          data={adminAddForm}
          mode="create"
        />
      </Popup>

      <Popup
        modifier={'admins-page__popup-confirm'}
        positiveHandler={confirmHandler}
        disableButton={disableConfirm}
        negativeHandler={popupHandler}
        visible={popup.confirm}
        loading={loading}
        type={'confirm'}
      >
        <Input.Password placeholder="Введите пароль" onChange={passwordHandler} />
      </Popup>
    </Overlay>
  )
}

export default AdminsPopups
