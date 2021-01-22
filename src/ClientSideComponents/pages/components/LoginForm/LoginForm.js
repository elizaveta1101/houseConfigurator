import React from 'react';
import { Form, Input, Button, Checkbox } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';

import './LoginForm.css'
import axios from "axios";
import {setPostInfo} from "../../../redux/actions/houses";
import {useDispatch} from "react-redux";

const LoginForm= () => {
    const dispatch = useDispatch()

    const onFinish = (values) => {
        axios
            .post(
                'http://127.0.0.1:5000/auth',
                { login: values.username, password: values.password },
                { headers: { 'Content-Type': 'application/json' } }
            )
            .then(({ data }) => {
                dispatch(setPostInfo(data))
            })
    };

    return (
        <Form
            name="normal_login"
            className="login-form"
            initialValues={{
                remember: true,
            }}
            onFinish={onFinish}
        >
            <Form.Item
                name="username"
                rules={[
                    {
                        required: true,
                        message: 'Пожалуйста, введите логин!',
                    },
                ]}
            >
                <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="Логин" />
            </Form.Item>
            <Form.Item
                name="password"
                rules={[
                    {
                        required: true,
                        message: 'Пожалуйста, введите пароль!',
                    },
                ]}
            >
                <Input
                    prefix={<LockOutlined className="site-form-item-icon" />}
                    type="password"
                    placeholder="Пароль"
                />
            </Form.Item>
            <Form.Item>
                <Form.Item name="remember" valuePropName="checked" noStyle>
                    <Checkbox>Запомнить</Checkbox>
                </Form.Item>

                <div className="login-forgot">
                    <a className="login-form-forgot" href="">Забыли пароль?</a>
                </div>
            </Form.Item>

            <Form.Item>
                <Button type="primary" htmlType="submit" className="login-form-button">
                    Войти
                </Button>
            </Form.Item>
        </Form>
    );
};

export default LoginForm