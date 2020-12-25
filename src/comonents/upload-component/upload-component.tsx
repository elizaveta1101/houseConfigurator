import { Upload } from 'antd'
import React from 'react'

import CustomButton from '../button/button'

interface IUploadComponentProps {
  data: any[]
  uploadHandler: (e: any) => void
  type: 'picture' | 'video'
}

const UploadComponent: React.FC<IUploadComponentProps> = ({
  data,
  uploadHandler,
  type,
}: IUploadComponentProps) => {
  return (
    <div className="main-page__add-video-wrapper">
      <h3 className="main-page__add-video-title">Видео</h3>
      <span className="main-page__add-video-lable">Видео не выбрано</span>
      <Upload
        onChange={uploadHandler}
        multiple
        fileList={data}
        accept="video/*"
        name="video"
        action="/upload.do"
        listType="text"
      >
        <CustomButton text={'Загрузить'} type={'default'} modifier={'main-page__upload-button'} />
      </Upload>
    </div>
  )
}

export default UploadComponent
