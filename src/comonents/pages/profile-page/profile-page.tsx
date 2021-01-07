import React, { useState, useContext, useEffect } from 'react'
import axios from 'axios'

import { AppContext, AuthContext } from '../../../context'
import { updateData } from './utils'
import { formData } from './data'

import AccessForm from '../../access-form/access-form'
import Container from '../../container/container'
import Overlay from '../../overlay/overlay'
import Button from '../../button/button'
import Popup from '../../popup/popup'
import Form from '../../form/form'

import './styles.scss'

const ProfilePage: React.FC = () => {
  const { userData, isAdmin } = useContext(AppContext)
  const { logout } = useContext(AuthContext)
  const { rights } = userData
  const [updatedFormData, setUpdatedFormData] = useState<any[]>([])
  const [isOpenPopup, setIsOpenPopup] = useState(false)
  const accesSubStatus = isAdmin ? '(старший администратор)' : '(Администратор)'
  const accesStatus = isAdmin ? 'Полный доступ' : 'Частичный доступ'

  const popupHandler = () => {
    setIsOpenPopup(!isOpenPopup)
  }

  const logoutHandler = () => {
    axios.get('/api/logout')
    logout()
  }

  useEffect(() => {
    const data = updateData(formData, userData)
    setUpdatedFormData(data)
  }, [userData])

  return (
    <Container>
      <h2 className="profile-page__title">Личный кабинет</h2>
      <h3 className="profile-page__subtitle">Персональная информация</h3>

      <Form data={updatedFormData.length ? updatedFormData : formData} mode={'disable'} />

      <h3 className="profile-page__subtitle">
        Доступ
        <span className="profile-page__subtitle-status">
          {accesStatus} <span className="profile-page__subtitle-substatus">{accesSubStatus}</span>
        </span>
      </h3>
      <AccessForm rightsCode={rights} />

      <Button type="default" text={'Выйти из системы'} clickHandler={popupHandler} />

      <Overlay isOpen={isOpenPopup} overlayHandler={popupHandler}>
        <Popup type={'logout'} negativeHandler={popupHandler} positiveHandler={logoutHandler} />
      </Overlay>
    </Container>
  )
}

export default ProfilePage
