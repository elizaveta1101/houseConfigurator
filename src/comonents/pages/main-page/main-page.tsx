import React, { useState } from 'react'
import { Input } from 'antd'

import ContentContainer from '../../content-container/content-container'
import CustomButton from '../../button/button'
import Overlay from '../../overlay/overlay'
import Popup from '../../popup/popup'
import UploadComponent from '../../upload-component/upload-component'
import { textareasData } from './data'

import './styles.scss'

interface IInputState {
  [key: string]: string
}

const MainPage: React.FC = () => {
  const [isOpenPopup, setIsOpenPopup] = useState(false)
  const [videoItem, setVideoItem] = useState<any[]>([])
  const [inputState, setInputState] = useState<IInputState>({})

  const uploadVideoHandler = (e: any) => {
    setVideoItem(e.fileList)
  }

  const onMessageHandler = (e: any) => {
    const inputName = e.target.name
    const value = e.target.value

    setInputState({ ...inputState, [inputName]: value })
  }

  const popupHandler = () => {
    setIsOpenPopup(!isOpenPopup)
  }

  return (
    <ContentContainer>
      <h3 className="main-page__title">Видео</h3>
      <UploadComponent data={videoItem} uploadHandler={uploadVideoHandler} type="video" />

      <div className="main-page__description-service">
        <h3 className="main-page__description-service-title">Описание услуг сервиса</h3>
        {textareasData.map(({ id, subtitle, name }) => (
          <div className="main-page__description-service-wrapper" key={id}>
            <h4 className="main-page__description-service-subtitle">{subtitle}</h4>
            <Input.TextArea
              value={inputState[name]}
              name={name}
              rows={4}
              placeholder="Текст"
              onChange={onMessageHandler}
            />
          </div>
        ))}
      </div>

      <CustomButton text={'Применить изменения'} clickHandler={popupHandler} />

      <Overlay isOpen={isOpenPopup} overlayHandler={popupHandler}>
        <Popup type={'saveData'} negativeHandler={popupHandler} />
      </Overlay>
    </ContentContainer>
  )
}

export default MainPage
