import React from 'react'
import { Upload } from 'antd'
import { PlusOutlined } from '@ant-design/icons'

import CustomButton from '../button/button'
import './styles.scss'

interface IUploadComponentProps {
  data: any[]
  uploadHandler: (e: any) => void
  type?: 'image' | 'video' | 'main-img'
  disabled?: boolean
}

const UploadComponent: React.FC<IUploadComponentProps> = ({
  data,
  uploadHandler,
  type = 'image',
  disabled = false,
}: IUploadComponentProps) => {
  const uploadButton = (
    <div>
      <PlusOutlined />
      <div style={{ marginTop: 8 }}>Upload</div>
    </div>
  )

  if (type === 'video') {
    return (
      <Upload
        className="upload-video"
        onChange={uploadHandler}
        fileList={data}
        accept="video/*"
        name="video"
        action="/upload.do"
        listType="picture"
      >
        <span className="upload-video__label">Видео не выбрано</span>
        <CustomButton
          disabled={data.length > 0}
          text={'Загрузить'}
          type={'default'}
          modifier={'upload-video__button'}
        />
      </Upload>
    )
  }
  return (
    <Upload
      className="upload-image"
      listType="picture-card"
      accept="image/*"
      fileList={data}
      name="image"
      disabled={disabled}
      onChange={uploadHandler}
    >
      {data.length >= 8 || (type === 'main-img' && data.length > 0) ? null : uploadButton}
    </Upload>
  )
}

export default UploadComponent
