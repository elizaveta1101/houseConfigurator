import React from 'react'
import { Upload } from 'antd'
import { PlusOutlined } from '@ant-design/icons'

import Button from '../button/button'

import './styles.scss'

interface IUploadComponentProps {
  type?: 'image' | 'video' | 'main-img'
  uploadHandler: (e: any) => void
  disabled?: boolean
  data: any[]
}

const UploadComponent: React.FC<IUploadComponentProps> = ({
  disabled = false,
  type = 'image',
  uploadHandler,
  data,
}) => {
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
        <Button
          disabled={Boolean(data.length)}
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
