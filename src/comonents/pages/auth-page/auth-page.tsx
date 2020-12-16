import React from 'react'
import { Form, Input } from 'antd'

import ContentContainer from '../../content-container/content-container'
import CustomButton from '../../button/button'

import './styles.scss'

const AuthPage: React.FC = () => {
  const onFinish = (values: string) => {
    console.log('Success:', values)
  }

  const onFinishFailed = (errorInfo: React.ReactNode) => {
    console.log('Failed:', errorInfo)
  }

  return (
    <ContentContainer modifier={'auth-page'}>
      <h1 className="auth-page__title">Войти в систему</h1>

      <Form
        className="auth-page__form"
        name="basic"
        layout="vertical"
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
      >
        <Form.Item
          className="auth-page__input"
          label="Логин"
          name="login"
          rules={[{ required: true, message: 'Пожалуйста, введите логин!' }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          className="auth-page__input"
          label="Пароль"
          name="password"
          rules={[{ required: true, message: 'Пожалуйста, введите пароль!' }]}
        >
          <Input.Password />
        </Form.Item>

        <Form.Item>
          <CustomButton text="Войти" htmlType="submit" />
        </Form.Item>
      </Form>
    </ContentContainer>
  )
}

export default AuthPage
