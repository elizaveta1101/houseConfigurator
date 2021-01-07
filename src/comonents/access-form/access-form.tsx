import React, { useMemo, useState } from 'react'
import { Checkbox } from 'antd'

import { getRightsCode, updateData } from './utils'
import { ActionTypes } from '../../store'
import { useStore } from '../../hooks'
import { data } from './data'

import './styles.scss'

interface IAccessFormProps {
  disabled?: boolean
  rightsCode: number
}

const AccessForm: React.FC<IAccessFormProps> = ({ disabled = true, rightsCode }) => {
  const { setItem } = useStore()
  const [updatedData, setUpdatedData] = useState(data)

  const onChange = (e: any) => {
    const checkbox = e.target.value
    const newData = updateData(0, updatedData, checkbox)
    const code = getRightsCode(newData)

    setUpdatedData(newData)
    setItem(ActionTypes.RIGHTS_CODE, code)
  }

  useMemo(() => {
    const newData = updateData(rightsCode, updatedData)
    setUpdatedData(newData)
  }, [rightsCode])

  return (
    <div className="rights-wrapper">
      {updatedData.map(({ id, label, value, checked }) => (
        <Checkbox
          className="rights-checkbox"
          onChange={onChange}
          disabled={disabled}
          checked={checked}
          value={value}
          key={id}
        >
          {label}
        </Checkbox>
      ))}
    </div>
  )
}

export default AccessForm
