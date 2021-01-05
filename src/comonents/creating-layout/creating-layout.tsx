import React, { useRef, useState } from 'react'
import { Form, Input, Select } from 'antd'

import RightsComponent from '../rights-component/rights-component'
import CustomButton from '../button/button'

import './styles.scss'

interface ICreatingLayoutProps {
  formHandler?: (values: any) => void
  negativeHandler?: () => void
  data: {
    id: string
    inputsGroup: {
      id: string
      type: string
      size: string
      name: string
      className: string
      label: string
      value?: string
      copyMode?: boolean
      required?: boolean
    }[]
  }[]
  mode: 'disable' | 'edit' | 'create'
}

const CreatingLayout: React.FC<ICreatingLayoutProps> = ({
  formHandler,
  negativeHandler,
  data,
  mode = 'disable',
}: ICreatingLayoutProps) => {
  const [isDisableInput, setIsDisableInput] = useState(true)
  const [code, setCode] = useState(0)
  const inputEl = useRef<any>(null)

  const onFinish = (values: any) => {
    values['rights'] = code
    console.log('Received values of form: ', values)
    formHandler && formHandler(values)
  }

  const codeHandler = (code: number) => setCode(code)

  const copyHandler = () => {
    setIsDisableInput(false)
    setTimeout(() => {
      inputEl.current.select()
      document.execCommand('copy')
      setIsDisableInput(true)
    }, 100)
  }

  return (
    <Form className="creating-layout" layout="vertical" onFinish={onFinish}>
      {data.map(({ id, inputsGroup }) => (
        <div className="creating-layout__inputs-group" key={id}>
          {inputsGroup.map(
            ({ id, type, size, name, className, label, copyMode, value, required }) => (
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
                      name={name}
                      disabled={copyMode ? isDisableInput : mode === 'disable'}
                      value={value}
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
            )
          )}
        </div>
      ))}
      {mode === 'create' && (
        <>
          <RightsComponent disabled={false} rightsCode={0} codeHandler={codeHandler} />
          <div className="popup__buttons-wrapper">
            <CustomButton
              type="default"
              modifier={'button_popup'}
              text={'Отменить'}
              clickHandler={negativeHandler}
            />
            <CustomButton modifier={'button_popup'} text={'Добавить'} htmlType="submit" />
          </div>
        </>
      )}
    </Form>
  )
}

export default CreatingLayout
