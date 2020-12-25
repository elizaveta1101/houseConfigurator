import React, { useState } from 'react'
import { Input } from 'antd'

import ContentContainer from '../../content-container/content-container'
import CustomButton from '../../button/button'
import CreatingLayout from '../../creating-layout/creating-layout'
import UploadComponent from '../../upload-component/upload-component'
import { inputsData } from './data'

import './styles.scss'

const ProjectInvestPage: React.FC = () => {
  const [mainImage, setMainImage] = useState([])
  const [imagesData, setImagesData] = useState([])
  const [houseMode, setHouseMode] = useState<'disable' | 'edit' | 'create'>('disable')

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
    <ContentContainer>
      <CustomButton text={'Создать новый проект'} clickHandler={() => modeHandler('create')} />
      <h3 className="house-finish-page__subtitle">Поиск проекта по id</h3>
      <div className="house-finish-page__search-wrapper">
        <Input placeholder="id проекта" onChange={onSearch} />
        <CustomButton
          modifier={'house-finish-page__search-button'}
          text={'Найти'}
          clickHandler={() => modeHandler('create')}
        />
      </div>

      <h3 className="house-finish-page__subtitle">Результат поиска:</h3>
      <CreatingLayout data={inputsData} mode={houseMode} />

      <div className="house-finish-page__upload-wrapper">
        <h4 className="house-finish-page__subtitle">Главное изабражение</h4>
        <UploadComponent
          disabled={houseMode === 'disable'}
          data={mainImage}
          type="main-img"
          uploadHandler={mainImagesHandler}
        />

        <h4 className="house-finish-page__subtitle">Дополнительные изабражения</h4>
        <UploadComponent
          disabled={houseMode === 'disable'}
          data={imagesData}
          uploadHandler={imagesHandler}
        />
      </div>

      <div className="house-finish-page__buttons-wrapper">
        <CustomButton
          disabled={houseMode === 'disable'}
          text={'Редактировать данные проекта'}
          clickHandler={() => modeHandler('edit')}
        />
        <CustomButton
          disabled={houseMode === 'disable'}
          danger
          modifier={'custom-button_delete'}
          text={'Удалить проект'}
          type="default"
          clickHandler={() => modeHandler('edit')}
        />
      </div>
    </ContentContainer>
  )
}

export default ProjectInvestPage
