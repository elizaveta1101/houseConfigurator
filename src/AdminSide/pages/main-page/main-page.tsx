import React, { useState } from 'react'
import { Input, Upload } from 'antd'

import { textareasData } from './data'

import Container from '../../container/container'
import Overlay from '../../overlay/overlay'
import Button from '../../button/button'
import Popup from '../../popup/popup'

import './styles.scss'

type State = {
  [key: string]: string
}

const MainPage: React.FC = () => {
  const [isOpenPopup, setIsOpenPopup] = useState(false)
  const [videoItem, setVideoItem] = useState<any[]>([])
  const [state, setState] = useState<State>({})

  const uploadVideoHandler = (e: any) => {
    setVideoItem(e.fileList)
  }

  const onMessageHandler = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const inputName = e.target.name
    const value = e.target.value

    setState({ ...state, [inputName]: value })
  }

  const popupHandler = () => {
    setIsOpenPopup(!isOpenPopup)
  }

  return (
    <Container>
      <h3 className="main-page__title">Видео</h3>
      <Upload
        className="main-page__upload"
        onChange={uploadVideoHandler}
        fileList={videoItem}
        accept="video/*"
        name="video"
        listType="picture"
      >
        <span className="main-page__upload-label">Видео не выбрано</span>
        <Button
          disabled={Boolean(videoItem.length)}
          text={'Загрузить'}
          type={'default'}
          modifier={'main-page__upload-button'}
        />
      </Upload>

      <div className="main-page__description-service">
        <h3 className="main-page__description-service-title">Описание услуг сервиса</h3>
        {textareasData.map(({ id, subtitle, name }) => (
          <div className="main-page__description-service-wrapper" key={id}>
            <h4 className="main-page__description-service-subtitle">{subtitle}</h4>
            <Input.TextArea
              onChange={onMessageHandler}
              placeholder="Текст"
              value={state[name]}
              name={name}
              rows={4}
            />
          </div>
        ))}
      </div>

      <Button text={'Применить изменения'} clickHandler={popupHandler} />

      <Overlay isOpen={isOpenPopup} overlayHandler={popupHandler}>
        <Popup type={'saveData'} negativeHandler={popupHandler} />
      </Overlay>
    </Container>
  )
}

export default MainPage
