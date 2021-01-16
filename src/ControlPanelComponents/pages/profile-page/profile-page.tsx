import React, { useState, useContext, useEffect } from 'react'
import axios from 'axios'

import { AppContext, AuthContext } from '../../../context'
import { ActionTypes } from '../../../store'
import { useStore } from '../../../hooks'
import { formData } from './data'

import AccessForm from '../../access-form/access-form'
import Container from '../../container/container'
import Overlay from '../../overlay/overlay'
import Button from '../../button/button'
import Popup from '../../popup/popup'
import Form from '../../form/form'

import './styles.scss'

const ProfilePage: React.FC = () => {
  const { userData } = useContext(AppContext)
  const { logout } = useContext(AuthContext)
  const { setItem } = useStore()
  const [isOpenPopup, setIsOpenPopup] = useState(false)
  const accesSubStatus =
    userData && userData.rights === 1023 ? '(Главный администратор)' : '(Администратор)'
  const accesStatus = userData && userData.rights === 1023 ? 'Полный доступ' : 'Частичный доступ'

  const popupHandler = () => {
    setIsOpenPopup(!isOpenPopup)
  }

  const logoutHandler = () => {
    axios.get('/api/logout')
    logout()
  }

  useEffect(() => {
    userData && setItem(ActionTypes.RIGHTS_CODE, userData.rights)
  }, [userData])

  return (
    <Container>
      <h2 className="profile-page__title">Личный кабинет</h2>
      <h3 className="profile-page__subtitle">Персональная информация</h3>

      <Form data={formData} values={userData} type={'admin'} />

      <h3 className="profile-page__subtitle">
        Доступ
        <span className="profile-page__subtitle-status">
          {accesStatus} <span className="profile-page__subtitle-substatus">{accesSubStatus}</span>
        </span>
      </h3>
      <AccessForm />

      <Button type="default" text={'Выйти из системы'} clickHandler={popupHandler} />

      <Overlay isOpen={isOpenPopup} overlayHandler={popupHandler}>
        <Popup type={'logout'} negativeHandler={popupHandler} positiveHandler={logoutHandler} />
      </Overlay>
    </Container>
  )
}

export default ProfilePage
