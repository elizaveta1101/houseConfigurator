import React from 'react'
import { Upload } from 'antd'
import { PlusOutlined } from '@ant-design/icons'

import Button from '../button/button'

import './styles.scss'

interface IUploadComponentProps {
  type?: 'image' | 'video' | 'main-img'
  uploadHandler: (e: any) => void
  removeHandler?: (e: any) => void
  disabled?: boolean
  multiple?: boolean
  data: any[]
}

const UploadComponent: React.FC<IUploadComponentProps> = ({
  disabled = false,
  multiple = false,
  type = 'image',
  uploadHandler,
  removeHandler,
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
      action="/api/house"
      multiple={multiple}
      disabled={disabled}
      customRequest={uploadHandler}
      onRemove={removeHandler}
    >
      {data.length >= 8 || (type === 'main-img' && data.length > 0) ? null : uploadButton}
    </Upload>
  )
}

export default UploadComponent
