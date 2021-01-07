import React, { useEffect, useRef, useState } from 'react'
import { Form, Input, Select } from 'antd'

import { FormValues, IAdmin, IFormData } from '../../data/types'
import { ActionTypes } from '../../store'
import { getFromValues } from './utils'
import { useStore } from '../../hooks'

import AccessForm from '../access-form/access-form'
import Button from '../button/button'

import './styles.scss'

interface IFormProps {
  mode: 'disable' | 'edit' | 'create'
  negativeHandler?: () => void
  positiveHandler?: () => void
  data: IFormData[]
}

const FormLayout: React.FC<IFormProps> = ({
  mode = 'disable',
  negativeHandler,
  positiveHandler,
  data,
}) => {
  const { getItem, setItem } = useStore()
  const [formValues, setFormValues] = useState<FormValues[]>([])
  const [isDisableInput, setIsDisableInput] = useState(true)
  const inputEl = useRef<any>(null)

  const formHandler = (values: IAdmin) => {
    const code = getItem(ActionTypes.RIGHTS_CODE)
    values['rights'] = code

    setItem(ActionTypes.NEW_ADMIN, values)
    positiveHandler && positiveHandler()
  }

  const copyHandler = () => {
    setIsDisableInput(false)
    setTimeout(() => {
      inputEl.current.select()
      document.execCommand('copy')
      setIsDisableInput(true)
    }, 100)
  }

  useEffect(() => {
    const newData = getFromValues(data)
    setFormValues(newData)
  }, [data])

  return (
    <Form
      className="creating-layout"
      onFinish={formHandler}
      fields={formValues}
      layout="vertical"
      name="add-admin"
    >
      {data.map(({ id, inputsGroup }) => (
        <div className="creating-layout__inputs-group" key={id}>
          {inputsGroup.map(({ id, type, size, name, className, label, copyMode, required }) => (
            <div
              className={`creating-layout__input-wrapper creating-layout__input-wrapper_${size}`}
              key={id}
            >
              <h4 className="creating-layout__input-label">
                {label}
                {copyMode && (
                  <button onClick={copyHandler} className="creating-layout__copy-button">
                    Копировать
                  </button>
                )}
              </h4>

              {type === 'input' && (
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
                  <Input
                    disabled={copyMode ? isDisableInput : mode === 'disable'}
                    ref={copyMode ? inputEl : null}
                    className={`creating-layout__input creating-layout__input_${className}`}
                  />
                </Form.Item>
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
      {mode === 'create' && (
        <>
          <AccessForm disabled={false} rightsCode={0} />
          <div className="popup__buttons-wrapper">
            <Button
              clickHandler={negativeHandler}
              modifier={'button_popup'}
              text={'Отменить'}
              type="default"
            />
            <Button modifier={'button_popup'} text={'Добавить'} htmlType="submit" />
          </div>
        </>
      )}
    </Form>
  )
}

export default FormLayout
