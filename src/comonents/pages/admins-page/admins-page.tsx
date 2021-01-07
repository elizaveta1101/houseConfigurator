import React, { useContext, useEffect, useState } from 'react'

import { IAdmin, IFormData } from '../../../data/types'
import { useHttp, useStore } from '../../../hooks'
import { AuthContext } from '../../../context'
import { ActionTypes } from '../../../store'
import { alertData } from '../../alert/data'
import { updateFormData } from './utils'
import { formData } from './data'

import Container from '../../container/container'
import AdminsPopups from './admins.popups'
import AdminsTable from './admins.table'
import Button from '../../button/button'
import AdminsForm from './admins.form'

import './styles.scss'

const AdminsSitePage: React.FC = () => {
  const { setItem, getItem } = useStore()
  const { request, loading } = useHttp()
  const { token, userId } = useContext(AuthContext)
  const adminsData = getItem(ActionTypes.ADMINS_DATA) || []
  const [updatedFormData, setUpdatedFormData] = useState<IFormData[]>([])
  const [currAdmin, setCurrAdmin] = useState<IAdmin>()
  const [popupType, setPopupType] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [editMode, setEditMode] = useState(false)
  const [pagination, setPagination] = useState({
    total: 0,
    currentPage: 1,
  })

  const adminHandler = (admin: IAdmin) => {
    const data = updateFormData(formData, admin)

    setEditMode(true)
    setCurrAdmin(admin)
    setUpdatedFormData(data)
  }

  const passwordHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setConfirmPassword(e.target.value.trim())
  }

  const paginationHandler = (pageNumber: number) => {
    setPagination({ ...pagination, currentPage: pageNumber })
  }

  const confirmHandler = async () => {
    const url = '/api/admin'
    const code: number = getItem(ActionTypes.RIGHTS_CODE)
    if (popupType === 'rights' && currAdmin) {
      currAdmin.rights = code
      request(url, 'POST', currAdmin, {
        ['Authorization']: token,
      })
        .then(({ data, success }) => {
          if (success) {
            requestAdminsData()
            setCurrAdmin(data)
            setItem(ActionTypes.ALERT, alertData.changeUp)
          } else setItem(ActionTypes.ALERT, alertData.error)
        })
        .catch((e) => setItem(ActionTypes.ALERT, alertData.error))
    } else if (popupType === 'addition') {
      const newAdmin = getItem(ActionTypes.NEW_ADMIN)
      request(url, 'POST', newAdmin, { ['Authorization']: token })
        .then(({ success }) => {
          if (success) {
            requestAdminsData()
            setItem(ActionTypes.ALERT, alertData.addUp)
          } else setItem(ActionTypes.ALERT, alertData.error)
        })
        .catch((e) => setItem(ActionTypes.ALERT, alertData.error))
    }
    setPopupType('')
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

  return (
    <Container modifier={'admins-page'}>
      <AdminsTable
        data={adminsData}
        adminHandler={adminHandler}
        loading={loading}
        total={pagination.total}
        paginationHandler={paginationHandler}
      />

      <AdminsForm
        data={updatedFormData.length ? updatedFormData : formData}
        code={currAdmin ? currAdmin.rights : 0}
      />

      <div className="admins-page__buttons-wrapper">
        <Button
          type={'default'}
          text={'Редактировать доступ'}
          disabled={!editMode}
          clickHandler={() => setPopupType('rights')}
        />
        <Button text={'Добавить администратора'} clickHandler={() => setPopupType('addition')} />
      </div>

      <AdminsPopups
        popupType={popupType}
        loading={loading}
        disableConfirm={!Boolean(confirmPassword.length)}
        code={currAdmin ? currAdmin.rights : 0}
        confirmHandler={confirmHandler}
        passwordHandler={passwordHandler}
      />
    </Container>
  )
}

export default AdminsSitePage
