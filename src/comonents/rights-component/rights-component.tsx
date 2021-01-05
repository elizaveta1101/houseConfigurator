import React, { useEffect, useMemo, useState } from 'react'
import { Checkbox } from 'antd'

import { data } from './data'

import './styles.scss'

interface IRightsComponentProps {
  disabled?: boolean
  rightsCode: number
  codeHandler?: (value: number) => void
}

const RightsComponent: React.FC<IRightsComponentProps> = ({
  disabled = true,
  rightsCode,
  codeHandler,
}: IRightsComponentProps) => {
  const [updatedData, setUpdatedData] = useState(data)

  const onChange = (e: any) => {
    const checkbox = e.target.value
    const resData = updateData(rightsCode, updatedData, checkbox)
    const code = getRightsCode(resData)

    setUpdatedData(resData)
    codeHandler && codeHandler(code)
  }

  const updateData = (code: number, data: any[], checkbox?: string) => {
    if (checkbox)
      return data.map((item) => {
        if (checkbox === item.value) {
          return { ...item, ['checked']: !item.checked }
        } else return item
      })
    else
      return data.map((item, index) => {
        let n = Math.pow(2, index)
        if (code >= n) {
          code -= n
          return { ...item, ['checked']: true }
        } else return { ...item, ['checked']: false }
      })
  }

  const getRightsCode = (data: any[]) => {
    const res = data.map(({ checked }) => {
      if (checked) return '1'
      else return '0'
    })
    const code = res.join('')
    return parseInt(code, 2)
  }

  useMemo(() => {
    const resData = updateData(rightsCode, updatedData)
    setUpdatedData(resData)
  }, [rightsCode])

  return (
    <div className="rights-wrapper">
      {updatedData.map(({ id, label, value, checked }) => (
        <Checkbox
          key={id}
          checked={checked}
          disabled={disabled}
          value={value}
          onChange={onChange}
          className="rights-checkbox"
        >
          {label}
        </Checkbox>
      ))}
    </div>
  )
}

export default RightsComponent
