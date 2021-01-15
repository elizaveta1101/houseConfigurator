import React, { useContext, useEffect, useState } from 'react'
import { Input } from 'antd'

import { useHttp, useStore } from '../../../hooks'
import { AuthContext } from '../../../context'
import { ActionTypes } from '../../../store'
import { alertData } from '../../alert/data'
import { IHouse } from '../../../data/types'
import { formData } from './data'

import Container from '../../container/container'
import Upload from '../../upload/upload'
import Button from '../../button/button'
import Form from '../../form/form'

import './styles.scss'

const HousesPage: React.FC = () => {
  const { token, userId } = useContext(AuthContext)
  const { setItem, getItem } = useStore()
  const { request, loading } = useHttp()

  const refForm = getItem(ActionTypes.REF_FORM)

  const [isDisableButton, setIsDisableButton] = useState(true)
  const [imagesData, setImagesData] = useState([])
  const [mainImage, setMainImage] = useState([])
  const [house, setHouse] = useState<IHouse>()
  const [mode, setMode] = useState('disable')

  const imagesHandler = ({ fileList }: any) => {
    setImagesData(fileList)
  }

  const mainImagesHandler = ({ fileList }: any) => {
    setMainImage(fileList)
  }

  const createHandelr = () => {
    setIsDisableButton(false)
    setMode('create')
  }

  const leftButtonHandler = () => {
    if (mode === 'disable') {
      setMode('edite')
    } else if (mode === 'edite') {
      refForm.current.setFieldsValue(house)
      setMode('disable')
    } else if (mode === 'create') {
      refForm.current.resetFields()
      setIsDisableButton(true)
      setMode('disable')
    }
  }

  const rightButtonHandler = async () => {
    const url = '/api/house'
    const houseData = refForm.current.getFieldValue()

    if (mode === 'disable') {
      request(
        url,
        'POST',
        { id: house?.id },
        {
          ['Authorization']: token,
        }
      )
        .then(({ success }) => {
          if (success) {
            setItem(ActionTypes.ALERT, alertData.deleteUp)
            refForm.current.resetFields()
            setIsDisableButton(true)
            setMode('disable')
          }
        })
        .catch((e) => setItem(ActionTypes.ALERT, alertData.error))
    } else if (mode === 'edite') {
      request(
        url,
        'POST',
        { id: house?.id, data: houseData },
        {
          ['Authorization']: token,
        }
      )
        .then(({ success }) => {
          if (success) {
            setItem(ActionTypes.ALERT, alertData.changeUp)
            setIsDisableButton(true)
            setMode('disable')
          }
        })
        .catch((e) => setItem(ActionTypes.ALERT, alertData.error))
    } else if (mode === 'create') {
      request(url, 'POST', JSON.stringify(houseData), {
        ['Authorization']: token,
      })
        .then(({ success }) => {
          if (success) {
            setItem(ActionTypes.ALERT, alertData.addUp)
            refForm.current.resetFields()
            setIsDisableButton(true)
            setHouse(undefined)
            setMode('disable')
          }
        })
        .catch((e) => setItem(ActionTypes.ALERT, alertData.error))
    }
  }

  const onSearch = async (value: string) => {
    const url = `/api/codename?type=house&codename=${value}`
    request(url)
      .then(({ data, success }) => {
        if (success) {
          console.log(data)

          setIsDisableButton(false)
          setHouse(data)
        } else setItem(ActionTypes.ALERT, alertData.noSearch)
      })
      .catch((e) => setItem(ActionTypes.ALERT, alertData.error))
  }

  useEffect(() => {
    const url = '/api/styles'
    request(url)
      .then(({ data, success }) => success && setItem(ActionTypes.HOUSE_STYLES, data))
      .catch((e) => setItem(ActionTypes.ALERT, alertData.error))
  }, [])

  return (
    <Container>
      {mode === 'create' ? (
        <h3 className="houses-page__subtitle">Создание нового дома</h3>
      ) : (
        <>
          <Button text={'Создать новый дом'} clickHandler={createHandelr} />
          <h3 className="houses-page__subtitle">Поиск проекта по id</h3>
          <Input.Search
            placeholder="Id проекта"
            className="houses-page__search"
            enterButton="Найти"
            onSearch={onSearch}
            loading={loading}
            // allowClear
          />
        </>
      )}

      <h3 className="houses-page__subtitle">Результат поиска:</h3>
      <Form data={formData} values={house} mode={mode} type={'house'} />

      <div className="houses-page__upload-wrapper">
        <h4 className="houses-page__subtitle">Главное изабражение</h4>
        <Upload
          disabled={mode === 'disable'}
          data={mainImage}
          type="main-img"
          uploadHandler={mainImagesHandler}
        />

        <h4 className="houses-page__subtitle">Дополнительные изабражения</h4>
        <Upload disabled={mode === 'disable'} data={imagesData} uploadHandler={imagesHandler} />
      </div>

      <div className="houses-page__buttons-wrapper">
        <Button
          disabled={isDisableButton}
          text={mode === 'disable' ? 'Редактировать данные дома' : 'Отменить'}
          type={mode === 'disable' ? 'primary' : 'default'}
          clickHandler={leftButtonHandler}
        />
        <Button
          disabled={isDisableButton}
          danger={mode === 'disable'}
          text={mode === 'disable' ? 'Удалить дом' : 'Сохранить'}
          type={mode === 'disable' ? 'text' : 'primary'}
          clickHandler={rightButtonHandler}
        />
      </div>
    </Container>
  )
}

export default HousesPage
