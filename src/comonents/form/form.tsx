import React, { useEffect, useRef, useState } from 'react'
import { Form, Input, Select } from 'antd'

import { IFormData } from '../../data/types'
import { ActionTypes } from '../../store'
import { useStore } from '../../hooks'

import FormLabel from './form.label'

import './styles.scss'

interface IFormProps {
  data: IFormData[]
  mode?: string
  type?: string
  values?: any
}

const FormLayout: React.FC<IFormProps> = ({ mode = 'disable', values, data, type }) => {
  const { getItem, setItem } = useStore()

  const inputEl = useRef<any>(null)
  const refForm = useRef<any>(null)

  const [isDisableInput, setIsDisableInput] = useState(true)

  const formHandler = (values: any) => {
    if (type === 'admin') {
      const [name, surname, otchestvo] = values.fio.split(' ')
      const code = getItem(ActionTypes.RIGHTS_CODE)
      values.rights = code
      values['name'] = name
      values['surname'] = surname
      values['otchestvo'] = otchestvo
      setItem(ActionTypes.NEW_ADMIN, values)
    }
  }

  useEffect(() => {
    if (values && type === 'admin')
      values['fio'] = `${values.name} ${values.surname} ${values.otchestvo}`
    values && refForm.current.setFieldsValue(values)
  }, [values])

  useEffect(() => {
    setItem(ActionTypes.REF_FORM, refForm)
  }, [])

  return (
    <Form className="form-layout" onFinish={formHandler} layout="vertical" ref={refForm}>
      {data.map(({ id, inputsGroup }) => (
        <div className="form-layout__inputs-group" key={id}>
          {inputsGroup.map(({ id, type, size, name, className, label, copyMode, required }) => (
            <div
              className={`form-layout__input-wrapper form-layout__input-wrapper_${size}`}
              key={id}
            >
              <FormLabel
                labelHandler={setIsDisableInput}
                copyMode={Boolean(copyMode)}
                element={inputEl}
                label={label}
              />

              <Form.Item
                key={id}
                name={name}
                rules={
                  name === 'email'
                    ? [
                        {
                          type: 'email',
                          message: 'Введите корректрный email example@example.com',
                        },
                        { required: required, message: `Пожалуйста, заполните поле!` },
                      ]
                    : [{ required: required, message: `Пожалуйста, заполните поле!` }]
                }
              >
                {type === 'select' ? (
                  <Select
                    className={`form-layout__input form-layout__input_${className}`}
                    disabled={mode === 'disable'}
                    key={id}
                  >
                    <Select.Option value="demo">Demo</Select.Option>
                  </Select>
                ) : type === 'textarea' ? (
                  <Input.TextArea
                    className={`form-layout__input form-layout__input_${className}`}
                    disabled={mode === 'disable'}
                    key={id}
                    rows={4}
                  />
                ) : (
                  <Input
                    className={`form-layout__input form-layout__input_${className}`}
                    disabled={
                      name === 'id'
                        ? true
                        : mode === 'create'
                        ? false
                        : copyMode
                        ? isDisableInput
                        : mode === 'disable'
                    }
                    ref={copyMode ? inputEl : null}
                  />
                )}
              </Form.Item>
            </div>
          ))}
        </div>
      ))}
    </Form>
  )
}

export default FormLayout
