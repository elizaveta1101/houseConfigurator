import React from 'react'

import { IFormData } from '../../../data/types'

import AccessForm from '../../access-form/access-form'
import Form from '../../form/form'

interface IAdminsFormProps {
  data: IFormData[]
  code: number
}

const AdminsForm: React.FC<IAdminsFormProps> = ({ data, code }) => {
  return (
    <>
      <h3 className="admins-page__subtitle">Информация об администраторе</h3>
      <Form data={data} mode={'disable'} />

      <h3 className="admins-page__subtitle">Доступ</h3>
      <AccessForm rightsCode={code} />
    </>
  )
}

export default AdminsForm
