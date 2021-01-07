import React, { useState } from 'react'
import { Input } from 'antd'

import { inputsData } from './data'

import Container from '../../container/container'
import Upload from '../../upload/upload'
import Button from '../../button/button'
import Form from '../../form/form'

import './styles.scss'

const ProjectFinishPage: React.FC = () => {
  const [houseMode, setHouseMode] = useState<'disable' | 'edit' | 'create'>('disable')
  const [imagesData, setImagesData] = useState([])
  const [mainImage, setMainImage] = useState([])

  const imagesHandler = ({ fileList }: any) => {
    setImagesData(fileList)
  }

  const mainImagesHandler = ({ fileList }: any) => {
    setMainImage(fileList)
  }

  const modeHandler = (mode: 'disable' | 'edit' | 'create') => {
    setHouseMode(mode)
  }

  const onSearch = (e: any) => console.log(e.target.value)

  return (
    <Container>
      <Button text={'Создать новый проект'} clickHandler={() => modeHandler('create')} />
      <h3 className="house-finish-page__subtitle">Поиск проекта по id</h3>
      <div className="house-finish-page__search-wrapper">
        <Input placeholder="id проекта" onChange={onSearch} />
        <Button
          modifier={'house-finish-page__search-button'}
          text={'Найти'}
          clickHandler={() => modeHandler('create')}
        />
      </div>

      <h3 className="house-finish-page__subtitle">Результат поиска:</h3>
      <Form data={inputsData} mode={houseMode} />

      <div className="house-finish-page__upload-wrapper">
        <h4 className="house-finish-page__subtitle">Главное изабражение</h4>
        <Upload
          disabled={houseMode === 'disable'}
          data={mainImage}
          type="main-img"
          uploadHandler={mainImagesHandler}
        />

        <h4 className="house-finish-page__subtitle">Дополнительные изабражения</h4>
        <Upload
          disabled={houseMode === 'disable'}
          data={imagesData}
          uploadHandler={imagesHandler}
        />
      </div>

      <div className="house-finish-page__buttons-wrapper">
        <Button
          disabled={houseMode === 'disable'}
          text={'Редактировать данные проекта'}
          clickHandler={() => modeHandler('edit')}
        />
        <Button
          disabled={houseMode === 'disable'}
          danger
          modifier={'custom-button_delete'}
          text={'Удалить проект'}
          type="default"
          clickHandler={() => modeHandler('edit')}
        />
      </div>
    </Container>
  )
}

export default ProjectFinishPage
