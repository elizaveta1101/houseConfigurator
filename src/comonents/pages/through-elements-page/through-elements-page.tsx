import React, { useContext, useEffect, useState } from 'react'
import { Form, Input } from 'antd'

import { socialInputsData } from './data'
import { useHttp, useStore } from '../../../hooks'
import { AppContext, AuthContext } from '../../../context'
import { storageKeys } from '../../../data'
import { ActionTypes } from '../../../store'

import ContentContainer from '../../content-container/content-container'
import CustomButton from '../../button/button'
import Popup from '../../popup/popup'
import Overlay from '../../overlay/overlay'

import './styles.scss'

interface ISocials {
  [key: string]: string
}
interface IInputState {
  [key: string]: any
}

const ThroughElementsPage: React.FC = () => {
  const { userData } = useContext(AppContext)
  const { token, userId } = useContext(AuthContext)
  const { request, loading } = useHttp()
  const { setItem } = useStore()
  const [isOpenPopup, setIsOpenPopup] = useState(false)
  const [inputState, setInputState] = useState<IInputState>({})

  const { phone, email, socials } = inputState

  const validateMessages = {
    types: {
      email: 'Введите корректрный email example@example.com',
    },
  }

  const onChangeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const nameInput = e.target.name
    let value = ''

    if (nameInput === 'phone') {
      value = e.target.value
        .slice(3, 18)
        .replace(/\D/g, '')
        .replace(/(\d{3})(\d{3})(\d{2})(\d{2})/, '($1)-$2-$3-$4')
    } else value = e.target.value

    if (nameInput !== 'phone' && nameInput !== 'email') {
      value = e.target.value
      const socials = inputState.socials.map((item: ISocials) => {
        if (nameInput === item.type) {
          item.link = value
        }

        return item
      })

      setInputState({ ...inputState, socials })
    } else setInputState({ ...inputState, [nameInput]: value })
  }
  const popupHandler = () => setIsOpenPopup(!isOpenPopup)
  const requestHandler = async () => {
    const url = '/api/profile'
    try {
      const { data, success } = await request(
        url,
        'POST',
        { id: userId, ...inputState },
        { ['Authorization']: token }
      )

      if (success) {
        sessionStorage.setItem(storageKeys.USER_DATA, JSON.stringify(data))
        setItem(ActionTypes.ALERT, {
          visible: true,
          type: 'success',
          message: 'Данные успешно изменены',
        })
      } else
        setItem(ActionTypes.ALERT, {
          visible: true,
          type: 'error',
          message: 'Что-то пошло не так',
        })
    } catch (e) {
      setItem(ActionTypes.ALERT, {
        visible: true,
        type: 'error',
        message: 'Что-то пошло не так',
      })
    }
  }

  useEffect(() => {
    const { phone, email, socials } = userData
    setInputState({ phone, email, socials })
  }, [userData])

  return (
    <ContentContainer>
      <Form layout={'vertical'} validateMessages={validateMessages}>
        <Form.Item label="Номер телефона" className="through-elements-page__phone-input">
          <Input name="phone" value={`+7 ${phone}`} onChange={onChangeInput} />
        </Form.Item>
        <Form.Item
          className="through-elements-page__mail-input"
          label="Адрес электронной почты"
          rules={[{ type: 'email' }]}
        >
          <Input name="email" value={email} onChange={onChangeInput} />
        </Form.Item>
        <Form.Item label="Ссылки на соцети">
          {socialInputsData.map(({ id, name, icon }, index) => (
            <div className="through-elements-page__input-wrapper" key={id}>
              <div className="through-elements-page__social-icon">
                <img
                  className="through-elements-page__social-icon-image"
                  src={icon}
                  alt="social-icon"
                />
              </div>
              <Input
                name={name}
                className="through-elements-page__link-input"
                placeholder="Ссылка"
                value={socials && socials[index].link}
                onChange={onChangeInput}
              />
            </div>
          ))}
        </Form.Item>
      </Form>

      <CustomButton text={'Применить изменения'} clickHandler={popupHandler} loading={loading} />

      <Overlay isOpen={isOpenPopup} overlayHandler={popupHandler}>
        <Popup type={'saveData'} negativeHandler={popupHandler} positiveHandler={requestHandler} />
      </Overlay>
    </ContentContainer>
  )
}

export default ThroughElementsPage
