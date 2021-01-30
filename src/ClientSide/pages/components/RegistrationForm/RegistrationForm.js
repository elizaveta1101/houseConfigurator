import React from 'react';
import axios from "axios";
import {Form, Input, Button} from 'antd';

import {setUserInfo} from "../../../redux/actions/houses";
import {useDispatch} from "react-redux";

import './RegistrationForm.css';


const formItemLayout = {
    labelCol: {
        xs: {
            span: 24,
        },
        sm: {
            span: 8,
        },
    },
    wrapperCol: {
        xs: {
            span: 24,
        },
        sm: {
            span: 16,
        },
    },
};
const tailFormItemLayout = {
    wrapperCol: {
        xs: {
            span: 24,
            offset: 0,
        },
        sm: {
            span: 16,
            offset: 8,
        },
    },
};


const RegistrationForm = () => {
    const [form] = Form.useForm();
    const dispatch = useDispatch()

    const onFinish = (values) => {
        console.log('Received values of form: ', values);

        axios
            .post(
                'http://127.0.0.1:5000/register',
                { login: values.email, password: values.password },
                { headers: { 'Content-Type': 'application/json' } }
            )
            .then(({ data }) => {
                dispatch(setUserInfo(data))
            })
    };

    return (
        <div className="registration-form">
            <div className="registration-form__header">
                <h1>Регистрация</h1>
            </div>

            <div className="form">
                <Form {...formItemLayout} form={form} name="register" onFinish={onFinish} initialValues={{residence: ['zhejiang', 'hangzhou', 'xihu'], prefix: '86',}} scrollToFirstError>

                    <p>Телефон или почта</p>
                    <Form.Item className="data__to-register" name="email" rules={[{type: 'email', message: 'Пожалуйста введите корректный E-mail адрес!',}, {required: true, message: 'Пожалуйста введите E-mail адрес!',},]}>
                        <Input/>
                    </Form.Item>

                    <p>Пароль</p>
                    <Form.Item className="password__to-register" name="password" rules={[{required: true, message: 'Пожалуйста введите пароль!',},]} hasFeedback>
                        <Input.Password />
                    </Form.Item>

                    <p>Подтверждение пароля</p>
                    <Form.Item className="password__to-register" name="confirm" dependencies={['password']} hasFeedback rules={[{required: true, message: 'Пожалуйста подтвердите пароль!',},
                            ({ getFieldValue }) => ({
                                validator(_, value) {
                                    if (!value || getFieldValue('password') === value) {
                                        return Promise.resolve();
                                    }

                                    return Promise.reject('Пароли не совпадают!');
                                },
                            }),
                        ]}
                    >
                        <Input.Password />
                    </Form.Item>

                    <Form.Item {...tailFormItemLayout}>
                        <Button className="btn__to-register" type="primary" htmlType="submit">Зарегистрироваться</Button>
                    </Form.Item>
                </Form>
            </div>
        </div>
    );
};

export default RegistrationForm;