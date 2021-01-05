import React, { useState } from 'react'
import { Form, Input, Table } from 'antd'
import { EyeInvisibleOutlined, EyeTwoTone } from '@ant-design/icons'

import { tableColumns, formData, adminAddForm } from './data'

import ContentContainer from '../../content-container/content-container'
import RightsComponent from '../../rights-component/rights-component'
import CreatingLayout from '../../creating-layout/creating-layout'
import CustomButton from '../../button/button'
import Overlay from '../../overlay/overlay'
import Popup from '../../popup/popup'

import './styles.scss'

const AdminsSitePage: React.FC = () => {
  const [updatedFormData, setUpdatedFormData] = useState<any[]>([])
  const [confirmPassword, setConfirmPassword] = useState('')
  const [rightsCode, setRightsCode] = useState(0)
  const [popup, setPopup] = useState({
    overlay: false,
    rights: false,
    addition: false,
    confirm: false,
  })

  const data = []
  for (let i = 0; i < 100; i++) {
    if (i < 10 && i > 5) {
      data.push({
        key: String(i),
        id: String(i),
        fio: `bdmin_{i} adminob adminovich`,
        login: `bdmin_${i}`,
        password: 'admin',
        email: 'admin@admin.admin',
        rights: i * 50,
      })
    } else {
      data.push({
        key: String(i),
        id: String(i),
        fio: `admin_{i} adminob adminovich`,
        login: `admin_${i}`,
        password: 'admin',
        email: 'admin@admin.admin',
        rights: i * 50,
      })
    }
  }

  const codeHandler = (value: number) => {
    console.log(value)
  }

  const onFinish = (values: any) => {
    popupHandler('confirm')
    console.log('Received values of form: ', values)
  }

  const adminHandler = (admin: any) => {
    const data = updateData(formData, admin)

    setRightsCode(admin.rights)
    setUpdatedFormData(data)
  }

  const passwordHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setConfirmPassword(e.target.value)
  }

  const popupHandler = (popupType?: string) => {
    if (popupType === 'rights')
      setPopup({ ...popup, overlay: true, rights: true, addition: false, confirm: false })
    else if (popupType === 'addition')
      setPopup({ ...popup, overlay: true, rights: false, addition: true, confirm: false })
    else if (popupType === 'confirm')
      setPopup({ ...popup, overlay: true, rights: false, addition: false, confirm: true })
    else setPopup({ ...popup, overlay: false, rights: false, addition: false, confirm: false })
  }

  const updateData = (data: any, admin: any) => {
    const resData = data.map(({ id, inputsGroup }: any) => {
      const resInputsGroup = inputsGroup.map((input: any) => {
        Object.keys(admin).forEach((key: string) => {
          if (key === input.name) {
            input['value'] = admin[key]
          }
        })
        return input
      })
      return { id, inputsGroup: resInputsGroup }
    })
    return resData
  }

  return (
    <ContentContainer modifier={'admins-page'}>
      <Table
        className="admins-page__tabel"
        rowClassName="admins-page__table-row"
        columns={tableColumns}
        dataSource={data}
        onRow={(admin) => {
          return {
            onClick: () => adminHandler(admin),
          }
        }}
        pagination={{ position: ['bottomLeft'] }}
        scroll={{ x: '100%', y: 420 }}
        size="small"
      />

      <h3 className="admins-page__subtitle">Информация об администраторе</h3>
      <CreatingLayout data={updatedFormData.length ? updatedFormData : formData} mode={'disable'} />

      <h3 className="admins-page__subtitle">Доступ</h3>
      <RightsComponent rightsCode={rightsCode} />

      <div className="admins-page__buttons-wrapper">
        <CustomButton
          type={'default'}
          text={'Редактировать доступ'}
          clickHandler={() => popupHandler('rights')}
        />
        <CustomButton
          text={'Добавить администратора'}
          clickHandler={() => popupHandler('addition')}
        />
      </div>

      <Overlay isOpen={popup.overlay}>
        <Popup
          visible={popup.rights}
          modifier={'admins-page__popup-rights'}
          type={'rights'}
          negativeHandler={popupHandler}
          positiveHandler={() => popupHandler('confirm')}
        >
          <RightsComponent disabled={false} rightsCode={rightsCode} codeHandler={codeHandler} />
        </Popup>

        <Popup visible={popup.addition} modifier={'admins-page__popup-addition'} type={'addition'}>
          <CreatingLayout
            data={adminAddForm}
            mode="create"
            formHandler={onFinish}
            negativeHandler={popupHandler}
          />
        </Popup>

        <Popup
          visible={popup.confirm}
          modifier={'admins-page__popup-confirm'}
          type={'confirm'}
          negativeHandler={popupHandler}
          positiveHandler={() => {}}
        >
          <Input.Password
            placeholder="Введите пароль"
            onChange={passwordHandler}
            iconRender={(visible) => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />)}
          />
        </Popup>
      </Overlay>
    </ContentContainer>
  )
}

export default AdminsSitePage
