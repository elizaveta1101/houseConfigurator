import React, { useContext } from 'react'
import { Form, Input } from 'antd'

import { useHttp, useStore } from '../../../hooks'
import { AuthContext } from '../../../context'
import { ActionTypes } from '../../../store'
import { alertData } from '../../alert/data'
import { storageKeys } from '../../../data'

import Container from '../../container/container'
import Button from '../../button/button'

import './styles.scss'

type AuthValues = {
  password: string
  login: string
}

const AuthPage: React.FC = () => {
  const { login } = useContext(AuthContext)
  const { request, loading } = useHttp()
  const { setItem } = useStore()

  const onFinish = async (values: AuthValues) => {
    const url = '/api/auth'
    request(url, 'POST', { ...values })
      .then(({ data, success }) => {
        login(data.token, data.id, data.admin)
        success
          ? sessionStorage.setItem(storageKeys.USER_DATA, JSON.stringify(data))
          : setItem(ActionTypes.ALERT, alertData.loginError)
      })
      .catch((e) => setItem(ActionTypes.ALERT, alertData.error))
  }

  return (
    <Container modifier={'auth-page'}>
      <h1 className="auth-page__title">Войти в систему</h1>

      <Form className="auth-page__form" name="auth" layout="vertical" onFinish={onFinish}>
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
          <Button text="Войти" htmlType="submit" loading={loading} />
        </Form.Item>
      </Form>
    </Container>
  )
}

export default AuthPage
