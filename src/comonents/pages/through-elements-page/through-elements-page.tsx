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

const ThroughElementsPage: React.FC = () => {
  const [isOpenPopup, setIsOpenPopup] = useState(false)
  const [inputState, setInputState] = useState<IInputState>({
    phone: '',
    mail: '',
  })

  const onChangeInput = (e: any) => {
    const nameInput = e.target.name
    let value = ''

    if (nameInput === 'phone') {
      value = e.target.value
        .slice(3, 18)
        .replace(/\D/g, '')
        .replace(/(\d{3})(\d{3})(\d{2})(\d{2})/, '($1)-$2-$3-$4')
    } else value = e.target.value

    setInputState({ ...inputState, [nameInput]: value })
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
          <Input name="phone" value={`+7 ${phone}`} onChange={onChangeInput} />
        </Form.Item>
        <Form.Item
          className="through-elements-page__mail-input"
          label="Адрес электронной почты"
          rules={[{ type: 'email' }]}
        >
          <Input name="email" value={mail} onChange={onChangeInput} />
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
          <CustomButton text={'Применить изменения'} clickHandler={popupHandler} />
        </Form.Item>
      </Form>
      <Overlay isOpen={isOpenPopup} overlayHandler={popupHandler}>
        <Popup type={'saveData'} negativeHandler={popupHandler} />
      </Overlay>
    </ContentContainer>
  )
}

export default ThroughElementsPage
