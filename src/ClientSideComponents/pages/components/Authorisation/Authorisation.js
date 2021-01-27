import React from 'react'
import {useSelector} from "react-redux";
import Attention from '../../../../assets/img/Attention.svg'

import './Authorisation.css'
import CheckoutButton from "../Buttons/CheckoutButton";
import RegistrationForm from "../RegistrationForm/RegistrationForm";
import LoginForm from "../LoginForm/LoginForm";


export default function Authorisation({closeModal}){

    const posts = useSelector(({ houses }) => houses.postinfo)

    if(posts === ''){

    }

    const [visibleRegistration, setVisibleRegistration] = React.useState(false)
    const [visibleLogin, setVisibleLogin] = React.useState(false)

    const both = () => {
        setVisibleLogin(!visibleLogin)
        setVisibleRegistration(!visibleRegistration)
    }


    return(
        <div className="authorisation-wrapper">
            <div className="to-authorise">
                <img src={Attention}/>
                <h2>Необходимо авторизироваться</h2>
                <p>Перед тем как мы продолжим, зарегистрируйтесь или войдите в систему.
                    Это позволит вам сохранять прогресс
                    и возвращаться к проектам в удобное время.
                </p>
                <div className="authorise-btns">
                    <CheckoutButton onClick={closeModal} className="canceling" children="Отмена" />
                    <CheckoutButton onClick={() => setVisibleRegistration(!visibleRegistration)} className="continue" children="Продолжить"/>
                </div>
            </div>
            {visibleRegistration && <div className="authorise-form">
                <div className="authorize-wrapper">
                    <RegistrationForm/>
                    <div className="need-to-authorise__p">
                        <p onClick={both}>Уже есть аккаунт? Войти</p>
                    </div>
                </div>
            </div>}
            {visibleLogin &&<div className="login-wrapper">
                <h1>Вход/регистрация</h1>
                <div className="login">
                    <LoginForm/>
                    <div className="registration">
                        <a onClick={both}>Регистрация</a>
                    </div>
                </div>
            </div>}
        </div>
    )
}