import { Checkbox, Form, Input } from 'antd'
import React, { useState, useRef } from 'react'

import ContentContainer from '../../content-container/content-container'
import { radioButtonsData } from './data'
import CustomButton from '../../button/button'
import Overlay from '../../overlay/overlay'
import Popup from '../../popup/popup'

import './styles.scss'

const ProfilePage: React.FC = () => {
  const [isOpenPopup, setIsOpenPopup] = useState(false)
  const [isDisableInput, setIsDisableInput] = useState(true)
  const [state, setState] = useState({
    id: '0000',
    fio: 'Киров Тирамису Валерьевич',
    login: 'adminadminov',
    korpmail: 'kiir@house.ru',
  })

  const accesStatus = 'Полный доступ'
  const accesSubStatus = '(старший администратор)'
  const inputEl = useRef<any>(null)

  const copyHandler = () => {
    setIsDisableInput(false)
    setTimeout(() => {
      inputEl.current.select()
      document.execCommand('copy')
      setIsDisableInput(true)
    }, 100)
  }

  const popupHandler = () => {
    setIsOpenPopup(!isOpenPopup)
  }

  return (
    <ContentContainer>
      <h2 className="profile-page__title">Личный кабинет</h2>
      <h3 className="profile-page__subtitle">Персональная информация</h3>

      <div className="profile-page__wrapper">
        <div className="profile-page__inputs-wrapper">
          <div className="profile-page__input profile-page__input_id">
            <h4 className="profile-page__label">Ваш id</h4>
            <Input disabled value={state.id} />
          </div>
          <div className="profile-page__input profile-page__input_fio">
            <h4 className="profile-page__label">ФИО</h4>
            <Input disabled value={state.fio} />
          </div>
        </div>
        <div className="profile-page__input profile-page__input_login">
          <h4 className="profile-page__label">Логин</h4>
          <Input disabled value={state.login} />
        </div>
        <div className="profile-page__input profile-page__input_korpmail">
          <h4 className="profile-page__label">
            Корпоративная почта
            <button onClick={copyHandler} className="profile-page__copy-button">
              Копировать
            </button>
          </h4>
          <Input disabled={isDisableInput} value={state.korpmail} ref={inputEl} />
        </div>
      </div>

      <h3 className="profile-page__subtitle">
        Доступ
        <span className="profile-page__subtitle-status">
          {accesStatus}
          <span className="profile-page__subtitle-substatus">{accesSubStatus}</span>
        </span>
      </h3>
      <div className="profile-page__acces-wrapper">
        {radioButtonsData.map(({ id, text, checked }) => (
          <Checkbox.Group
            key={id}
            defaultValue={checked ? [text] : ['']}
            disabled
            options={[text]}
            className="profile-page__acces-checkbox"
          />
        ))}
      </div>

      <CustomButton type="default" text={'Выйти из системы'} clickHandler={popupHandler} />

      <Overlay isOpen={isOpenPopup} overlayHandler={popupHandler}>
        <Popup type={'logout'} negativeHandler={popupHandler} />
      </Overlay>
    </ContentContainer>
  )
}

export default ProfilePage
