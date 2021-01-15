import React, { useEffect, useRef, useState } from 'react'
import { Form, Input, Row, Select, Tag } from 'antd'

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

  const stylesData: { id: number; info: string }[] = getItem(ActionTypes.HOUSE_STYLES)
  const materials: string[] = getItem(ActionTypes.MATERIALS)

  const inputEl = useRef<any>(null)
  const refForm = useRef<any>(null)

  const [isDisableInput, setIsDisableInput] = useState(true)
  // const [materials, setMaterials] = useState<string[]>()

  const onSubmit = (formValues: any) => {
    if (type === 'admin') {
      const [name, surname, otchestvo] = formValues.fio.split(' ')
      const code = getItem(ActionTypes.RIGHTS_CODE)
      formValues.rights = code
      formValues['name'] = name
      formValues['surname'] = surname
      formValues['otchestvo'] = otchestvo
      setItem(ActionTypes.NEW_ADMIN, formValues)
    } else if (type === 'house') {
      formValues.materials = `${materials}`
      setItem(ActionTypes.EDITED_HOUSE, formValues)
    }
  }

  const materialsHandler = (e: any, tag?: string) => {
    if (tag) {
      const data = materials?.filter((tagItem) => tag !== tagItem)
      setItem(ActionTypes.MATERIALS, data)
    } else if (e.key === 'Enter' && materials) {
      const value = e.target.value
      setItem(ActionTypes.MATERIALS, [...materials, value])
    }
  }

  useEffect(() => {
    if (values) {
      if (type === 'house' && stylesData) {
        const materials = values.materials.split(',')
        setItem(ActionTypes.MATERIALS, materials)
        values.materials = ''
      } else if (type === 'admin' && !values.fio)
        values['fio'] = `${values.name} ${values.surname} ${values.surname}`

      refForm.current.setFieldsValue(values)
    }
  }, [values, type, stylesData])

  useEffect(() => {
    if (mode === 'create') {
      refForm.current.resetFields()
      setItem(ActionTypes.MATERIALS, [])
    }
  }, [mode])

  useEffect(() => {
    setItem(ActionTypes.REF_FORM, refForm)
  }, [])

  return (
    <Form className="form-layout" onFinish={onSubmit} layout="vertical" ref={refForm}>
      {data.map(({ id, inputsGroup }) => (
        <div className="form-layout__inputs-group" key={id}>
          {inputsGroup.map(
            ({ id, type, size, name, className, label, placeholder, copyMode, required }) => (
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

                {name === 'materials' && (
                  <Row style={{ marginBottom: '0.5rem' }}>
                    {materials &&
                      materials.map((tag, index) => (
                        <Tag
                          key={index}
                          closable={mode !== 'disable'}
                          style={{ marginBottom: '0.5rem' }}
                          onClose={(e) => materialsHandler(e, tag)}
                        >
                          {tag}
                        </Tag>
                      ))}
                  </Row>
                )}

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
                      placeholder={mode === 'create' ? placeholder : ''}
                      // defaultValue={values.style}
                    >
                      {stylesData &&
                        stylesData.map(({ id, info }) => (
                          <Select.Option key={id} value={info}>
                            {info}
                          </Select.Option>
                        ))}
                    </Select>
                  ) : type === 'textarea' ? (
                    <Input.TextArea
                      className={`form-layout__input form-layout__input_${className}`}
                      disabled={mode === 'disable'}
                      key={id}
                      autoSize={{ minRows: 4 }}
                      placeholder={mode === 'create' ? placeholder : ''}
                    />
                  ) : name === 'materials' ? (
                    <Input
                      className={`form-layout__input form-layout__input_${className}`}
                      disabled={mode === 'disable'}
                      onKeyPress={materialsHandler}
                      onChange={materialsHandler}
                      placeholder={mode === 'create' ? placeholder : ''}
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
                      placeholder={mode === 'create' ? placeholder : ''}
                    />
                  )}
                </Form.Item>
              </div>
            )
          )}
        </div>
      ))}
    </Form>
  )
}

export default FormLayout
