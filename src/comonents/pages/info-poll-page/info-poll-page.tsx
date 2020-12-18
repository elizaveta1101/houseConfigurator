import React, { useState } from 'react'
import { Editor } from '@tinymce/tinymce-react'

import ContentContainer from '../../content-container/content-container'
import CustomButton from '../../button/button'
import Overlay from '../../overlay/overlay'
import Popup from '../../popup/popup'

import './styles.scss'

const InfoPollPage: React.FC = () => {
  const [editText, setEditText] = useState('')
  const [isOpenPopup, setIsOpenPopup] = useState(false)

  const onEditTextChange = (value: string) => {
    setEditText(value)
  }

  const popupHandler = () => {
    setIsOpenPopup(!isOpenPopup)
  }

  return (
    <ContentContainer>
      <h3 className="info-pool__title">Описание опроса</h3>
      <h4 className="info-pool__subtitle">
        Общая информация и инструкция <br /> пользователю для прохождения опроса
      </h4>

      <div className="info-pool__editor-wrapper">
        <Editor
          initialValue="<p>This is the initial content of the editor</p>"
          value={editText}
          init={{
            height: 300,
            menubar: false,
            plugins: [
              'advlist autolink lists link image charmap print preview anchor',
              'searchreplace visualblocks code fullscreen',
              'insertdatetime media table paste code help wordcount',
            ],
            toolbar:
              'undo redo | formatselect | bold italic backcolor | \
             alignleft aligncenter alignright alignjustify | \
             bullist numlist outdent indent | removeformat | help',
          }}
          onEditorChange={onEditTextChange}
        />
      </div>

      <CustomButton text={'Применить изменения'} clickHandler={popupHandler} />

      <Overlay isOpen={isOpenPopup} overlayHandler={popupHandler}>
        <Popup type={'saveData'} negativeHandler={popupHandler} />
      </Overlay>
    </ContentContainer>
  )
}

export default InfoPollPage
