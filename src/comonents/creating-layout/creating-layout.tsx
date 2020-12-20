import React from 'react'
import { Input, Select } from 'antd'

import './styles.scss'

interface ICreatingLayoutProps {
  data: {
    id: string
    inputsGroup: {
      id: string
      type: string
      size: string
      name: string
      className: string
      label: string
    }[]
  }[]
  mode: 'disable' | 'edit' | 'create'
}

const CreatingLayout: React.FC<ICreatingLayoutProps> = ({
  data,
  mode = 'disable',
}: ICreatingLayoutProps) => {
  return (
    <div className="creating-layout">
      {data.map(({ id, inputsGroup }) => (
        <div className="creating-layout__inputs-group" key={id}>
          {inputsGroup.map(({ id, type, size, name, className, label }) => (
            <div
              className={`creating-layout__input-wrapper creating-layout__input-wrapper_${size}`}
              key={id}
            >
              <h4 className="creating-layout__input-label">{label}</h4>
              {type === 'input' && (
                <Input
                  disabled={mode === 'disable'}
                  key={id}
                  name={name}
                  className={`creating-layout__input creating-layout__input_${className}`}
                />
              )}
              {type === 'select' && (
                <Select
                  disabled={mode === 'disable'}
                  key={id}
                  className={`creating-layout__input creating-layout__input_${className}`}
                >
                  <Select.Option value="demo">Demo</Select.Option>
                </Select>
              )}
              {type === 'textarea' && (
                <Input.TextArea
                  disabled={mode === 'disable'}
                  key={id}
                  rows={4}
                  name={name}
                  className={`creating-layout__input creating-layout__input_${className}`}
                />
              )}
            </div>
          ))}
        </div>
      ))}
    </div>
  )
}

export default CreatingLayout
