import React, { useState, useContext, useEffect } from 'react'
import axios from 'axios'

import { AppContext, AuthContext } from '../../../context'
import { formData } from './data'

import ContentContainer from '../../content-container/content-container'
import RightsComponent from '../../rights-component/rights-component'
import CreatingLayout from '../../creating-layout/creating-layout'
import CustomButton from '../../button/button'
import Overlay from '../../overlay/overlay'
import Popup from '../../popup/popup'

import './styles.scss'

const ProfilePage: React.FC = () => {
  const { logout } = useContext(AuthContext)
  const { userData, isAdmin } = useContext(AppContext)
  const { rights } = userData
  const [updatedFormData, setUpdatedFormData] = useState<any[]>([])
  const [isOpenPopup, setIsOpenPopup] = useState(false)
  const accesStatus = isAdmin ? 'Полный доступ' : 'Частичный доступ'
  const accesSubStatus = isAdmin ? '(старший администратор)' : '(Администратор)'

  const popupHandler = () => {
    setIsOpenPopup(!isOpenPopup)
  }

  const logoutHandler = () => {
    axios.get('/api/logout')
    logout()
  }

  const updateData = (data: any, admin: any) => {
    const resData = data.map(({ id, inputsGroup }: any) => {
      const resInputsGroup = inputsGroup.map((input: any) => {
        Object.keys(admin).forEach((key: string) => {
          if (input.name === key) input['value'] = admin[key]
          if (input.name === 'fio')
            input['value'] = `${admin.name} ${admin.surname} ${admin.otchestvo}`
        })
        return input
      })
      return { id, inputsGroup: resInputsGroup }
    })
    return resData
  }

  useEffect(() => {
    const data = updateData(formData, userData)
    setUpdatedFormData(data)
  }, [userData])

  return (
    <ContentContainer>
      <h2 className="profile-page__title">Личный кабинет</h2>
      <h3 className="profile-page__subtitle">Персональная информация</h3>

      <CreatingLayout data={updatedFormData.length ? updatedFormData : formData} mode={'disable'} />

      <h3 className="profile-page__subtitle">
        Доступ
        <span className="profile-page__subtitle-status">
          {accesStatus} <span className="profile-page__subtitle-substatus">{accesSubStatus}</span>
        </span>
      </h3>
      <RightsComponent rightsCode={rights} />

      <CustomButton type="default" text={'Выйти из системы'} clickHandler={popupHandler} />

      <Overlay isOpen={isOpenPopup} overlayHandler={popupHandler}>
        <Popup type={'logout'} negativeHandler={popupHandler} positiveHandler={logoutHandler} />
      </Overlay>
    </ContentContainer>
  )
}

export default ProfilePage
