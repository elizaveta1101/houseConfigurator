import React, { useContext, useEffect, useState } from 'react'
import { Form, Input } from 'antd'

import { AppContext, AuthContext } from '../../../context'
import { formaterPhoneNumber } from '../../../utils'
import { useHttp, useStore } from '../../../hooks'
import { ActionTypes } from '../../../store'
import { alertData } from '../../alert/data'
import { storageKeys } from '../../../data'
import { socialInputsData } from './data'

import Container from '../../container/container'
import Overlay from '../../overlay/overlay'
import Button from '../../button/button'
import Popup from '../../popup/popup'

import './styles.scss'

type Socials = {
  [key: string]: string
}
type InputState = {
  [key: string]: any
}

const ThroughsPage: React.FC = () => {
  const { token, userId } = useContext(AuthContext)
  const { userData } = useContext(AppContext)
  const { request, loading } = useHttp()
  const { setItem } = useStore()
  const [inputState, setInputState] = useState<InputState>({
    phone: '',
    email: '',
  })
  const [isOpenPopup, setIsOpenPopup] = useState(false)

  const { phone, email, socials } = inputState

  const validateMessages = {
    types: {
      email: 'Введите корректрный email example@example.com',
    },
  }

  const onChangeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const nameInput = e.target.name
    let value = e.target.value

    if (nameInput === 'phone') value = formaterPhoneNumber(e.target.value)

    if (nameInput !== 'phone' && nameInput !== 'email') {
      const socials = inputState.socials.map((item: Socials) => {
        if (nameInput === item.type) item.link = value
        else return item
      })

      setInputState({ ...inputState, socials })
    } else setInputState({ ...inputState, [nameInput]: value })
  }
  const popupHandler = () => setIsOpenPopup(!isOpenPopup)
  const requestHandler = async () => {
    const url = '/api/profile'
    request(url, 'POST', { id: userId, ...inputState }, { ['Authorization']: token })
      .then(({ data, success }) => {
        if (success) {
          sessionStorage.setItem(storageKeys.USER_DATA, JSON.stringify(data))
          setItem(ActionTypes.ALERT, alertData.changeUp)
        } else setItem(ActionTypes.ALERT, alertData.error)
      })
      .catch((e) => setItem(ActionTypes.ALERT, alertData.error))
  }

  useEffect(() => {
    if (userData) {
      const { phone, email, socials } = userData
      setInputState({ phone, email, socials })
    }
  }, [userData])

  return (
    <Container>
      <Form layout={'vertical'} validateMessages={validateMessages}>
        <Form.Item label="Номер телефона" className="throughs-page__phone-input">
          <Input name="phone" value={`+7 ${phone}`} onChange={onChangeInput} />
        </Form.Item>
        <Form.Item
          className="throughs-page__mail-input"
          label="Адрес электронной почты"
          rules={[{ type: 'email' }]}
        >
          <Input name="email" value={email} placeholder="Почта" onChange={onChangeInput} />
        </Form.Item>
        <Form.Item label="Ссылки на соцети">
          {socialInputsData.map(({ id, name, icon }, index) => (
            <div className="throughs-page__input-wrapper" key={id}>
              <div className="throughs-page__social-icon">
                <img className="throughs-page__social-icon-image" alt="social-icon" src={icon} />
              </div>
              <Input
                className="throughs-page__link-input"
                value={socials && socials[index].link}
                onChange={onChangeInput}
                placeholder="Ссылка"
                name={name}
              />
            </div>
          ))}
        </Form.Item>
      </Form>

      <Button text={'Применить изменения'} clickHandler={popupHandler} loading={loading} />

      <Overlay isOpen={isOpenPopup} overlayHandler={popupHandler}>
        <Popup type={'saveData'} negativeHandler={popupHandler} positiveHandler={requestHandler} />
      </Overlay>
    </Container>
  )
}

export default ThroughsPage
