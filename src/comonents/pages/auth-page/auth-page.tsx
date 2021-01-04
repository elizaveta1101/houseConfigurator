import React, { useContext } from 'react'
import { Form, Input } from 'antd'

import { AuthContext } from '../../../context'
import { useHttp, useStore } from '../../../hooks'
import { ActionTypes } from '../../../store'
import { storageKeys } from '../../../data'

import ContentContainer from '../../content-container/content-container'
import CustomButton from '../../button/button'

import './styles.scss'

interface IAuthValues {
  login: string
  password: string
}

const AuthPage: React.FC = () => {
  const { setItem } = useStore()
  const { login } = useContext(AuthContext)
  const { request, loading } = useHttp()

  const onFinish = async (values: IAuthValues) => {
    const url = '/api/auth'
    try {
      const { data, success } = await request(url, 'POST', { ...values })

      login(data.token, data.id, data.admin)
      success
        ? sessionStorage.setItem(storageKeys.USER_DATA, JSON.stringify(data))
        : setItem(ActionTypes.ALERT, {
            visible: true,
            type: 'error',
            message: 'Неверный логин или пароль',
          })
    } catch (e) {
      setItem(ActionTypes.ALERT, {
        visible: true,
        type: 'error',
        message: 'Что-то пошло не так',
      })
    }
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
          <CustomButton text="Войти" htmlType="submit" loading={loading} />
        </Form.Item>
      </Form>
    </ContentContainer>
  )
}

export default AuthPage
