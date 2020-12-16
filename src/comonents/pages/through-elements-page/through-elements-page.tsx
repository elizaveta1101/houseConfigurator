import React, { useState } from 'react'
import { Form, Input } from 'antd'

import ContentContainer from '../../content-container/content-container'
import CustomButton from '../../button/button'
import Popup from '../../popup/popup'
import Overlay from '../../overlay/overlay'
import { socialInputsData } from './data'

import './styles.scss'

interface IInputState {
  [key: string]: string
}

const getPhoneNumber = (value: string) => {
  const phoneNumber = value.replace(/\D/g, '').slice(1, 20)
  console.log(phoneNumber.substring(0, 3))

  const a = phoneNumber.substring(0, 3) || ''
  const b = phoneNumber.substring(3, 6) || ''
  const c = phoneNumber.substring(6, 8) || ''
  const d = phoneNumber.substring(8, 10) || ''

  return `+ 7 (${a})-${b}-${c}-${d}`
}

const ThroughElementsPage: React.FC = () => {
  const [isOpenPopup, setIsOpenPopup] = useState(false)
  const [inputState, setInputState] = useState<IInputState>({
    phone: '+ 7 (___)-___-__-__',
    mail: '',
  })

  const onChangeInput = (e: any) => {
    const nameInput = e.target.name
    let value = ''

    if (nameInput === 'phone') {
      value = e.target.value
      // .slice(3, 18)
      // .replace(/\D/g, '')
      // .replace(/(\d{3})(\d{3})(\d{2})(\d{2})/, '($1)-$2-$3-$4')
    } else value = e.target.value

    const phoneNumber = getPhoneNumber(value)

    setInputState({ ...inputState, [nameInput]: phoneNumber })
  }

  const popupHandler = () => {
    setIsOpenPopup(!isOpenPopup)
  }

  const validateMessages = {
    types: {
      email: 'Введите корректрный email example@example.com',
    },
  }

  const { phone, mail } = inputState

  return (
    <ContentContainer>
      <Form layout={'vertical'} validateMessages={validateMessages}>
        <Form.Item label="Номер телефона" className="through-elements-page__phone-input">
          <Input name="phone" value={`${phone}`} onChange={onChangeInput} />
        </Form.Item>
        <Form.Item
          className="through-elements-page__mail-input"
          label="Адрес электронной почты"
          rules={[{ type: 'email' }]}
        >
          <Input name="mail" value={mail} onChange={onChangeInput} />
        </Form.Item>
        <Form.Item label="Ссылки на соцети">
          {socialInputsData.map(({ id, name, icon }) => (
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
                onChange={onChangeInput}
              />
            </div>
          ))}
        </Form.Item>
        <Form.Item>
          <CustomButton type="primary" text={'Применить изменения'} clickHandler={popupHandler} />
        </Form.Item>
      </Form>
      <Overlay isOpen={isOpenPopup} overlayHandler={popupHandler}>
        <Popup type={'saveData'} negativeHandler={popupHandler} />
      </Overlay>
    </ContentContainer>
  )
}

export default ThroughElementsPage
