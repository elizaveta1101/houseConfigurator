import React, { ChangeEvent, useState } from 'react'
import { Form, Input, Upload } from 'antd'
import { UploadOutlined, DeleteOutlined } from '@ant-design/icons'

import ContentContainer from '../../content-container/content-container'
import CustomButton from '../../button/button'
import Overlay from '../../overlay/overlay'
import Popup from '../../popup/popup'
import { textareasData } from './data'

import './styles.scss'

interface IInputState {
  [key: string]: string
}

const MainPage: React.FC = () => {
  const [isOpenPopup, setIsOpenPopup] = useState(false)
  const [mainState, setMainState] = useState<any[]>([])
  const [inputState, setInputState] = useState<IInputState>({})

  const uploadVideoHandler = (e: any) => {
    setMainState(e.fileList)
  }
  const onChangeVideoHandler = (e: any, index: number) => {
    const arrMap = mainState.map((item: any, itemIndex: number) =>
      index === itemIndex ? e.fileList[e.fileList.length - 1] : item
    )

    setMainState(arrMap)
  }

  const removeVideoHandler = (index: number) => {
    const filtredArr = mainState.filter((item: any, i: number) => index !== i)

    setMainState(filtredArr)
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
      <div className="main-page__add-video-wrapper">
        <h3 className="main-page__add-video-title">Видео</h3>
        <span className="main-page__add-video-lable">Видео не выбрано</span>
        <Upload
          onChange={uploadVideoHandler}
          multiple
          fileList={mainState}
          accept="video/*"
          name="video"
          action="/upload.do"
          listType="text"
        >
          <CustomButton text={'Загрузить'} type={'default'} modifier={'main-page__upload-button'} />
        </Upload>
      </div>

      <div className="main-page__add-video-wrapper">
        {Boolean(mainState.length) &&
          mainState.map(({ uid, name, status }: any, index: number) => {
            return (
              <div className="main-page__video-item" key={uid}>
                <div className="main-page__video-name-wrapper">
                  <p className={`main-page__video-status-${status}`}>
                    {status === 'error' ? 'Ошибка загрузки файла' : 'Загружен файл:'}
                  </p>
                  <p className="main-page__video-name">{name}</p>
                </div>
                <div className="main-page__video-buttons-wrapper">
                  <Upload
                    onChange={(e) => onChangeVideoHandler(e, index)}
                    accept="video/*"
                    name="video"
                    action="/upload.do"
                    listType="text"
                  >
                    <CustomButton
                      danger={status === 'error'}
                      modifier={'main-page__util-button'}
                      text={<UploadOutlined />}
                      type="default"
                    />
                  </Upload>
                  <CustomButton
                    danger={status === 'error'}
                    modifier={'main-page__util-button'}
                    text={<DeleteOutlined />}
                    type="default"
                    clickHandler={() => removeVideoHandler(index)}
                  />
                </div>
              </div>
            )
          })}
      </div>

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
