import React, { useContext, useEffect, useState } from 'react'
import { Input, Pagination, Table } from 'antd'

import { useHttp, useStore } from '../../../hooks'
import { formData, tableColumns } from './data'
import { AuthContext } from '../../../context'
import { ActionTypes } from '../../../store'
import { IAdmin } from '../../../data/types'
import { alertData } from '../../alert/data'

import AccessForm from '../../access-form/access-form'
import Container from '../../container/container'
import Overlay from '../../overlay/overlay'
import Button from '../../button/button'
import Popup from '../../popup/popup'
import Form from '../../form/form'

import refreshIcon from '../../../assets/icons/refresh.svg'
import './styles.scss'

const AdminsPage: React.FC = () => {
  const { token, userId } = useContext(AuthContext)
  const { setItem, getItem } = useStore()
  const { request, loading } = useHttp()

  const adminsData = getItem(ActionTypes.ADMINS_DATA) || []
  const refForm = getItem(ActionTypes.REF_FORM)

  const [pagination, setPagination] = useState({ total: 0, currentPage: 1 })
  const [confirmPassword, setConfirmPassword] = useState('')
  const [isOpenPopup, setIsOpenPopup] = useState(false)
  const [currAdmin, setCurrAdmin] = useState<IAdmin>()
  const [editMode, setEditMode] = useState(false)
  const [mode, setMode] = useState('disable')

  const adminHandler = (admin: IAdmin) => {
    setItem(ActionTypes.RIGHTS_CODE, admin.rights)
    setCurrAdmin(admin)
    setMode('disable')
    setEditMode(true)
  }

  const passwordHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setConfirmPassword(e.target.value.trim())
  }

  const paginationHandler = (pageNumber: number) => {
    setPagination({ ...pagination, currentPage: pageNumber })
  }

  const popupHandler = () => {
    mode === 'access' && setItem(ActionTypes.RIGHTS_CODE, currAdmin?.rights)
    mode !== 'create' && setMode('disable')
    setConfirmPassword('')
    setIsOpenPopup(false)
  }

  const leftButtonHandler = () => {
    if (mode === 'disable') setMode('access')
    else if (mode === 'access') {
      setItem(ActionTypes.RIGHTS_CODE, currAdmin?.rights)
      setMode('disable')
    } else if (mode === 'create') {
      setItem(ActionTypes.RIGHTS_CODE, 0)
      !currAdmin && setEditMode(false)
      refForm.current.resetFields()
      setMode('disable')
    }
  }
  const rightButtonHandler = () => {
    if (mode === 'disable') {
      setItem(ActionTypes.RIGHTS_CODE, 0)
      refForm.current.resetFields()
      setCurrAdmin(undefined)
      setMode('create')
      setEditMode(true)
    } else if (mode === 'create') {
      refForm.current.submit()
      setIsOpenPopup(true)
    } else if (mode === 'access') {
      setIsOpenPopup(true)
    }
  }

  const confirmHandler = async () => {
    const url = '/api/admin'
    const code: number = getItem(ActionTypes.RIGHTS_CODE)
    if (mode === 'access' && currAdmin) {
      currAdmin.rights = code

      request(url, 'POST', currAdmin, {
        ['Authorization']: token,
      })
        .then(({ success }) => {
          if (success) {
            setItem(ActionTypes.ALERT, alertData.changeUp)
            requestAdminsData()
            popupHandler()
          } else setItem(ActionTypes.ALERT, alertData.error)
        })
        .catch((e) => setItem(ActionTypes.ALERT, alertData.error))
    } else if (mode === 'create') {
      const newAdmin = getItem(ActionTypes.NEW_ADMIN)

      request(url, 'POST', newAdmin, { ['Authorization']: token })
        .then(({ success }) => {
          if (success) {
            setItem(ActionTypes.ALERT, alertData.addUp)
            setItem(ActionTypes.RIGHTS_CODE, 0)
            refForm.current.resetFields()
            requestAdminsData()
            setMode('disable')
            popupHandler()
          } else setItem(ActionTypes.ALERT, alertData.noUnic)
        })
        .catch((e) => setItem(ActionTypes.ALERT, alertData.noUnic))
    }
  }

  const requestAdminsData = async () => {
    const url = `/api/admin?pagination=true&page=${pagination.currentPage}`
    request(url)
      .then(({ data, success }) => {
        if (success) {
          data.query.forEach((item: IAdmin) => {
            item['key'] = item.id
            item['fio'] = `${item.name} ${item.surname} ${item.otchestvo}`
          })
          setPagination({ ...pagination, total: data.total })
          setItem(ActionTypes.ADMINS_DATA, data.query)
        } else setItem(ActionTypes.ALERT, alertData.error)
      })
      .catch((e) => setItem(ActionTypes.ALERT, alertData.error))
  }

  useEffect(() => {
    requestAdminsData()
  }, [pagination.currentPage])

  useEffect(() => {
    setItem(ActionTypes.RIGHTS_CODE, 0)
  }, [])

  return (
    <Container modifier={'admins-page'}>
      <Table
        onRow={(admin) => {
          return {
            onClick: () => adminHandler(admin),
          }
        }}
        pagination={{ position: ['bottomLeft'] }}
        rowClassName="admins-page__table-row"
        className="admins-page__tabel"
        scroll={{ x: '100%', y: 320 }}
        dataSource={adminsData}
        columns={tableColumns}
        loading={loading}
        size="small"
      />
      <Pagination
        style={{ marginTop: '0.5rem' }}
        onChange={paginationHandler}
        total={pagination.total}
        size="small"
      />
      <button
        className={`admins-page__refresh-button ${
          loading ? 'admins-page__refresh-button_loading' : ''
        }`}
        onClick={requestAdminsData}
      >
        <img src={refreshIcon} alt="refresh" />
      </button>

      <h3 className="admins-page__subtitle">Информация об администраторе</h3>
      <Form
        data={formData}
        values={currAdmin}
        mode={mode === 'access' ? 'disable' : mode}
        type={'admin'}
      />

      <h3 className="admins-page__subtitle">Доступ</h3>
      <AccessForm disabled={mode === 'disable'} />

      <div className="admins-page__buttons-wrapper">
        <Button
          type={'default'}
          text={mode !== 'disable' ? 'Отменить' : 'Редактировать доступ'}
          disabled={!editMode}
          clickHandler={leftButtonHandler}
        />
        <Button
          text={mode !== 'disable' ? 'Сохранить' : 'Добавить администратора'}
          clickHandler={rightButtonHandler}
        />
      </div>

      <Overlay isOpen={isOpenPopup}>
        <Popup
          disableButton={!Boolean(confirmPassword.length)}
          modifier={'admins-page__popup-confirm'}
          positiveHandler={confirmHandler}
          negativeHandler={popupHandler}
          loading={loading}
          type={'confirm'}
        >
          <Input.Password
            placeholder="Введите пароль"
            value={confirmPassword}
            onChange={passwordHandler}
          />
        </Popup>
      </Overlay>
    </Container>
  )
}

export default AdminsPage
