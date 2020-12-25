import React, { useContext } from 'react'
import { Form, Input } from 'antd'

import ContentContainer from '../../content-container/content-container'
import CustomButton from '../../button/button'
import { AuthContext } from '../../../context'
import { useHttp } from '../../../hooks/http.hook'

import './styles.scss'

interface IAuthValues {
  login: string
  password: string
}

const AuthPage: React.FC = () => {
  const { login } = useContext(AuthContext)
  const { request } = useHttp()

  const onFinish = async (values: IAuthValues) => {
    try {
      const data = await request('http://127.0.0.1:5000/auth', 'POST', { ...values })
      console.log(data)

      login(data.token, data.id)
    } catch (e) {}
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
