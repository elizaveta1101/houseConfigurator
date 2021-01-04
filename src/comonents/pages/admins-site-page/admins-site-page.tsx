import React, { useState } from 'react'
import { Table } from 'antd'

import { tableColumns, formData } from './data'

import ContentContainer from '../../content-container/content-container'
import RightsComponent from '../../rights-component/rights-component'
import CreatingLayout from '../../creating-layout/creating-layout'
import CustomButton from '../../button/button'

import './styles.scss'
import Overlay from '../../overlay/overlay'
import Popup from '../../popup/popup'

const AdminsSitePage: React.FC = () => {
  const [updatedFormData, setUpdatedFormData] = useState<any[]>([])
  const [isOpenPopupRights, setIsOpenPopupRights] = useState(false)
  const [isOpenPopupAddition, setIsOpenPopupAddition] = useState(false)
  const [isOpenPopupConfirm, setIsOpenPopupConfirm] = useState(false)

  const data = []
  for (let i = 0; i < 100; i++) {
    data.push({
      key: String(i),
      id: String(i),
      fio: `admin_{i} adminob adminovich`,
      login: `admin_${i}`,
      password: 'admin',
      email: 'admin@admin.admin',
    })
  }

  const adminHandler = (admin: any) => {
    const data = updateData(formData, admin)
    setUpdatedFormData(data)
  }

  const popupRightsHandler = () => {
    hideAll()
    setIsOpenPopupRights(!isOpenPopupRights)
  }
  const popupAdditionHandler = () => {
    hideAll()
    setIsOpenPopupAddition(!isOpenPopupAddition)
  }
  const popupConfirmHandler = () => {
    hideAll()
    setIsOpenPopupConfirm(!isOpenPopupConfirm)
  }

  const hideAll = () => {
    setIsOpenPopupRights(false)
    setIsOpenPopupAddition(false)
    setIsOpenPopupConfirm(false)
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
      <RightsComponent />

      <div className="admins-page__buttons-wrapper">
        <CustomButton
          type={'default'}
          text={'Редактировать доступ'}
          clickHandler={popupRightsHandler}
        />
        <CustomButton text={'Добавить администратора'} clickHandler={popupAdditionHandler} />
      </div>

      <Overlay isOpen={isOpenPopupRights}>
        <Popup
          modifier={'admins-page__popup-rights'}
          type={'rights'}
          negativeHandler={popupRightsHandler}
          positiveHandler={popupConfirmHandler}
        >
          <RightsComponent disabled={false} />
        </Popup>
      </Overlay>

      <Overlay isOpen={isOpenPopupAddition}>
        <Popup
          modifier={'admins-page__popup-addition'}
          type={'addition'}
          negativeHandler={popupAdditionHandler}
          positiveHandler={popupConfirmHandler}
        ></Popup>
      </Overlay>

      <Overlay isOpen={isOpenPopupConfirm}>
        <Popup
          modifier={'admins-page__popup-confirm'}
          type={'confirm'}
          negativeHandler={popupConfirmHandler}
          positiveHandler={() => {}}
        />
      </Overlay>
    </ContentContainer>
  )
}

export default AdminsSitePage
