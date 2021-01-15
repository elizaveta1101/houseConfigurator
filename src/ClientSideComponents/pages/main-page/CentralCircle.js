import React from 'react'
import classNames from 'class-names'
import { Link } from 'react-router-dom'

import RegistrationForm from '../components/RegistrationForm'
import CentralButton from './CentralBtn'

import GifVideo from '../../../assets/video/main-gif.gif'

import './CentralCircle.css'
import axios from "axios";
import { setUserInfo } from "../../redux/actions/houses";
import {useDispatch, useSelector} from "react-redux";


function CentralCircle() {
  const [visibleMainPopup, setVisibleMainPopup] = React.useState(false)
  const [visibleUserPopup, setVisibleUserPopup] = React.useState(false)
  const [visiblePhonePopup, setVisiblePhonePopup] = React.useState(false)
  const [visibleRegistrationPopup, setVisibleRegistrationPopup] = React.useState(false)
  const mainBtnRef = React.useRef()
  const mainPopupRef = React.useRef()
  const userBtnRef = React.useRef()
  const userPopupRef = React.useRef()
  const phoneBtnRef = React.useRef()
  const phonePopupRef = React.useRef()
  const registerFormRef = React.useRef()
  const closeForm = React.useRef()

  const mainVisiblePopup = () => {
    setVisibleMainPopup(!visibleMainPopup)
  }
  const userVisiblePopup = () => {
    setVisibleUserPopup(!visibleUserPopup)
  }
  const phoneVisiblePopup = () => {
    setVisiblePhonePopup(!visiblePhonePopup)
  }
  const registrationVisiblePopup = () => {
    setVisibleRegistrationPopup(!visibleRegistrationPopup)
  }

  const userBoth = () => {
    setVisibleUserPopup(!visibleUserPopup)
    if (visibleRegistrationPopup) {
      setVisibleRegistrationPopup(!visibleRegistrationPopup)
    }
  }

  const both = () => {
    setVisibleUserPopup(visibleUserPopup)
    setVisibleRegistrationPopup(!visibleRegistrationPopup)
  }

  const handleOutsideClick = (e) => {
    if (!e.path.includes(mainBtnRef.current) && !e.path.includes(mainPopupRef.current))
      setVisibleMainPopup(false)
  }

  const userOutsideClick = (e) => {
    if (
      !e.path.includes(userBtnRef.current) &&
      !e.path.includes(registerFormRef.current) &&
      !e.path.includes(userPopupRef.current)
    )
      setVisibleUserPopup(false)
  }

  const registrOutsideClick = (e) => {
    if (
      !e.path.includes(userBtnRef.current) &&
      !e.path.includes(registerFormRef.current) &&
      !e.path.includes(userPopupRef.current)
    )
      setVisibleRegistrationPopup(false)
  }

  const phoneOutsideClick = (e) => {
    if (!e.path.includes(phoneBtnRef.current) && !e.path.includes(phonePopupRef.current))
      setVisiblePhonePopup(false)
  }

  const closeFormRegistr = (e) => {
    if (e.path.includes(closeForm.current)) setVisibleRegistrationPopup(false)
  }

  React.useEffect(() => {
    setTimeout(() => {
      document.body.addEventListener('click', handleOutsideClick)
      document.body.addEventListener('click', userOutsideClick)
      document.body.addEventListener('click', registrOutsideClick)
      document.body.addEventListener('click', phoneOutsideClick)
      document.body.addEventListener('click', closeFormRegistr)
    }, 500)
  }, [])


  return (
    <>
      <div className="main-circle">
        <div className="pre-circles">
          {/*---------------------------------Pre-Main-Circles---------------------------------------*/}
          <svg
            className="pre-circle-1"
            width="110"
            height="110"
            viewBox="0 0 120 120"
            strokeWidth="2.5"
          >
            <circle
              className="pre-circle-1-preload"
              cx="60"
              cy="60"
              r="59.2"
              fill="none"
              stroke="#325FFF"
              strokeWidth="2"
              strokeDasharray="0 400"
            />
          </svg>
          <svg
            className="pre-circle-2"
            width="110"
            height="110"
            viewBox="0 0 120 120"
            strokeWidth="2.5"
          >
            <circle
              className="pre-circle-2-preload"
              cx="60"
              cy="60"
              r="59.2"
              fill="none"
              stroke="#325FFF"
              strokeWidth="1.5"
              strokeDasharray="0 400"
            />
          </svg>
          <svg
            className="pre-circle-3"
            width="110"
            height="110"
            viewBox="0 0 120 120"
            strokeWidth="2.5"
          >
            <circle
              className="pre-circle-3-preload"
              cx="60"
              cy="60"
              r="59.2"
              fill="none"
              stroke="#325FFF"
              strokeWidth="2"
              strokeDasharray="0 400"
            />
          </svg>

          {/*---------------------------------Pre-Menu-Circles---------------------------------------*/}
          <svg className="pre-menu-line-1" width="230" height="140">
            <rect
              className="pre-menu-line-1-preload"
              x="5"
              y="5"
              width="0"
              height="30"
              fill="#325FFF"
            />
          </svg>
          <svg
            className="pre-menu-line-2"
            width="110"
            height="110"
            viewBox="0 0 120 120"
            strokeWidth="2.5"
          >
            <circle
              className="pre-menu-line-2-preload"
              cx="60"
              cy="60"
              r="59.2"
              fill="none"
              stroke="#325FFF"
              strokeWidth="0.4"
              strokeDasharray="0 400"
            />
          </svg>
          <svg className="pre-menu-line-3" width="230" height="140">
            <rect
              className="pre-menu-line-3-preload"
              x="5"
              y="5"
              width="0"
              height="160"
              fill="#325FFF"
            />
          </svg>
          <svg
            className="pre-menu-line-4"
            width="110"
            height="110"
            viewBox="0 0 120 120"
            strokeWidth="2.5"
          >
            <circle
              className="pre-menu-line-4-preload"
              cx="60"
              cy="60"
              r="59.2"
              fill="none"
              stroke="#325FFF"
              strokeWidth="1.3"
              strokeDasharray="0 400"
            />
          </svg>

          {/*---------------------------Inside Main Circles-----------------------------*/}
          <svg
            className="inside-main-circle-1"
            width="110"
            height="110"
            viewBox="0 0 120 120"
            strokeWidth="2.5"
          >
            <circle
              className="inside-main-circle-1-preload"
              cx="60"
              cy="60"
              r="59.2"
              fill="none"
              stroke="#325FFF"
              strokeWidth="0.8"
              strokeDasharray="0 400"
            />
          </svg>

          <svg
            className="inside-main-circle-2"
            width="110"
            height="110"
            viewBox="0 0 120 120"
            strokeWidth="2.5"
          >
            <circle
              className="inside-main-circle-2-preload"
              cx="60"
              cy="60"
              r="59.2"
              fill="none"
              stroke="#325FFF"
              strokeWidth="1.5"
              strokeDasharray="0 400"
            />
          </svg>
        </div>

        <div className="circle-bg">
          <img src={GifVideo} alt="main-gif" />
        </div>

        <CentralButton />

        {/*-------------------------------Menu Buttons--------------------------------*/}
        <div
          ref={mainBtnRef}
          onClick={mainVisiblePopup}
          className={classNames('main-menu-btn', { 'main-menu-btn-active': visibleMainPopup })}
        >
          <svg
            className="menu-icon"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M3 12H21"
              stroke="#444444"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M3 6H21"
              stroke="#444444"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M9 18L21 18"
              stroke="#444444"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>
        {visibleMainPopup && (
          <div ref={mainPopupRef} className="main-menu-popup">
            <ul>
              <li>
                <Link to="/catalog">Каталог</Link>
              </li>
              <li>
                <Link to="/redactor_page">Конструктор</Link>
              </li>
              <li>
                <Link to="/">О нас</Link>
              </li>
              <li>
                <Link to="/">Контакты</Link>
              </li>
            </ul>
          </div>
        )}
        {visibleMainPopup && <div className="black-screen" />}

        <div
          ref={userBtnRef}
          onClick={userBoth}
          className={classNames('user-menu-btn', { 'user-menu-btn-active': visibleUserPopup })}
        >
          <svg
            className="user-icon"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M20 21V19C20 17.9391 19.5786 16.9217 18.8284 16.1716C18.0783 15.4214 17.0609 15 16 15H8C6.93913 15 5.92172 15.4214 5.17157 16.1716C4.42143 16.9217 4 17.9391 4 19"
              stroke="#444444"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M12 11C14.2091 11 16 9.20914 16 7C16 4.79086 14.2091 3 12 3C9.79086 3 8 4.79086 8 7C8 9.20914 9.79086 11 12 11Z"
              stroke="#444444"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>
        {visibleUserPopup && (
          <div ref={userPopupRef} className="user-menu-popup">
            <h1>Вход/регистрация</h1>
            <form>
              <label htmlFor="phone-label">Телефон или почта</label>
              <input
                type="text"
                id="phone-label"
                placeholder="sample@mail.ru"
                name="email"
                required
              />
              <div className="password-box">
                <label htmlFor="password-label">Пароль</label>
                <input
                  type="password"
                  id="password-label"
                  placeholder="Password"
                  name="psw"
                  required
                />
              </div>
            </form>
            <button type="submit" className="registerbtn">
              Войти
            </button>
            <div className="registration">
              <a onClick={both}>Регистрация</a>
            </div>
            <div className="forgot-passwd">
              <a>Забыли пароль?</a>
            </div>
          </div>
        )}

        {visibleRegistrationPopup && (
          <div ref={registerFormRef} className="regist-form">
            <div ref={closeForm} className="registr-form__p">
              <p>Уже есть аккаунт? Войти</p>
            </div>
            <RegistrationForm />
          </div>
        )}

        {visibleUserPopup && <div className="black-screen" />}

        <div
          ref={phoneBtnRef}
          onClick={phoneVisiblePopup}
          className={classNames('phone-menu-btn', { 'phone-menu-btn-active': visiblePhonePopup })}
        >
          <svg
            className="phone-icon"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M23.9973 19.3384C23.9639 18.4101 23.5771 17.5437 22.9085 16.899C21.5992 15.6365 20.5023 14.9077 19.4563 14.6054C18.0152 14.1889 16.6802 14.5676 15.4888 15.7312C15.4871 15.7329 15.4853 15.7347 15.4835 15.7365L14.216 16.9945C13.4239 16.548 11.8836 15.5675 10.2194 13.9034L10.0961 13.7801C8.43166 12.1157 7.45128 10.5751 7.00518 9.78382L8.26329 8.51627C8.26507 8.51449 8.26685 8.5127 8.26863 8.51088C9.4321 7.31959 9.81084 5.98468 9.39437 4.54331C9.09207 3.49738 8.36332 2.40041 7.1008 1.09114C6.45609 0.422557 5.58981 0.0358359 4.66146 0.00236703C3.73255 -0.0311488 2.84119 0.292197 2.14988 0.912731L2.12298 0.936919C2.11051 0.948122 2.09832 0.9597 2.08642 0.971559C0.710231 2.34777 -0.0111661 4.27439 0.000130666 6.5432C0.019396 10.3974 2.1376 14.805 5.66626 18.3336C6.33164 18.999 7.08786 19.6575 7.91389 20.2909C8.32474 20.6059 8.9132 20.5283 9.22824 20.1174C9.54333 19.7065 9.46561 19.118 9.05471 18.8029C8.29371 18.2194 7.59973 17.6155 6.99205 17.0079C3.80478 13.8206 1.89189 9.90509 1.87506 6.53387C1.86639 4.78655 2.39199 3.32812 3.39524 2.31439L3.40241 2.30793C4.08383 1.69625 5.11548 1.73347 5.75119 2.39268C8.1783 4.90978 8.00257 6.09812 6.93009 7.1979L5.19226 8.94879C4.91974 9.22338 4.84385 9.6372 5.0012 9.99063C5.04531 10.0897 6.1126 12.4482 8.77061 15.1062L8.89403 15.2295C11.5517 17.8872 13.9101 18.9545 14.0092 18.9986C14.3626 19.1561 14.7765 19.0801 15.051 18.8076L16.8019 17.0697C17.9018 15.9971 19.0901 15.8215 21.6071 18.2486C22.2663 18.8843 22.3035 19.916 21.692 20.5973L21.6853 20.6047C20.6799 21.5998 19.237 22.125 17.5087 22.125C17.4945 22.125 17.4802 22.125 17.4659 22.1249C16.0845 22.118 14.4848 21.7393 12.84 21.0298C12.3647 20.8247 11.8129 21.0439 11.6079 21.5193C11.4028 21.9948 11.6219 22.5464 12.0974 22.7515C13.9987 23.5716 15.8018 23.9916 17.4566 23.9999C17.4742 24 17.4916 24 17.5092 24C19.7551 24 21.6626 23.2791 23.0282 21.9136C23.04 21.9017 23.0515 21.8895 23.0627 21.877L23.0871 21.85C23.7076 21.1587 24.0308 20.2668 23.9973 19.3384Z"
              fill="#444444"
            />
          </svg>
        </div>
        {visiblePhonePopup && (
          <div ref={phonePopupRef} className="phone-menu-popup">
            <h1>Позвоните нам</h1>
            <h2>+7(495)-333-22-11</h2>
            <h3>Или наш менеджер свяжется с вами</h3>
            <button type="submit" className="registerbtn">
              Обратный звонок
            </button>
          </div>
        )}
        {visiblePhonePopup && <div className="black-screen" />}

        {/*-------------------------------Left Buttons--------------------------------*/}
        <div className="left-btns">
          <Link to="/catalog_comp_houses">
            <div className="prepared-block">
              <svg
                className="prepared-houses"
                opacity={0.3}
                width="214"
                height="88"
                viewBox="0 0 214 88"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <g filter="url(#filter0_d)">
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M177.112 0H84H44L4 40V80H210V79.5561C195.87 54.444 184.83 27.7301 177.112 0Z"
                    fill="#325FFF"
                  />
                </g>
                <defs>
                  <filter
                    id="filter0_d"
                    x="0"
                    y="0"
                    width="294"
                    height="88"
                    filterUnits="userSpaceOnUse"
                    colorInterpolationFilters="sRGB"
                  >
                    <feFlood floodOpacity="0" result="BackgroundImageFix" />
                    <feColorMatrix
                      in="SourceAlpha"
                      type="matrix"
                      values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                    />
                    <feOffset dy="4" />
                    <feGaussianBlur stdDeviation="2" />
                    <feColorMatrix
                      type="matrix"
                      values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0"
                    />
                    <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow" />
                    <feBlend
                      mode="normal"
                      in="SourceGraphic"
                      in2="effect1_dropShadow"
                      result="shape"
                    />
                  </filter>
                </defs>
              </svg>

              <svg
                className="prepared-icon"
                width="36"
                height="36"
                viewBox="0 0 36 36"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M17.0592 8.37199L7.67665 17.5813H10.2355C11.1777 17.5813 11.9415 18.3309 11.9415 19.2557V22.6045V30.9766H15.3533C16.2955 30.9766 17.0592 31.7263 17.0592 32.6511V34.3255C17.0592 35.2503 16.2955 35.9999 15.3533 35.9999H10.2355H8.52961C7.58744 35.9999 6.82369 35.2503 6.82369 34.3255V32.6511V22.6045H1.70592C0.763755 22.6045 0 21.8549 0 20.9301V19.2557C0 17.5813 0.652571 16.9408 1.70592 15.9069C5.97073 11.7208 17.0593 0 17.0593 0L29.5004 12.2114C30.1665 12.8652 30.1665 13.9255 29.5004 14.5793L27.648 16.3974C26.9818 17.0513 25.9017 17.0513 25.2355 16.3974L17.0592 8.37199Z"
                  fill="#444444"
                />
                <path
                  className="check"
                  d="M25.2291 32.4752C25.0625 32.6371 24.8352 32.7274 24.599 32.7274C24.3629 32.7274 24.1356 32.6371 23.969 32.4752L18.9371 27.6142C18.4149 27.1098 18.4149 26.2919 18.9371 25.7884L19.5671 25.1797C20.0895 24.6753 20.9353 24.6753 21.4575 25.1797L24.599 28.2142L33.0879 20.0148C33.6102 19.5104 34.4569 19.5104 34.9782 20.0148L35.6083 20.6235C36.1305 21.1279 36.1305 21.9456 35.6083 22.4492L25.2291 32.4752Z"
                  fill="#325FFF"
                />
              </svg>
              <p>Готовые</p>
              <h1>Дома</h1>
            </div>
          </Link>

          <Link to="/catalog_investors_houses">
            <div className="investors-block">
              <svg
                className="for-investors-houses"
                width="285"
                height="88"
                opacity={0.3}
                viewBox="0 0 298 88"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <g opacity="1" filter="url(#filter0_d)">
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M273.991 80C254.241 57.0748 242.113 30.1002 222.42 0H4V40L49.0883 80H94.1767H293.991Z"
                    fill="#325FFF"
                  />
                </g>
                <defs>
                  <filter
                    id="filter0_d"
                    x="0"
                    y="0"
                    width="197.991"
                    height="88"
                    filterUnits="userSpaceOnUse"
                    colorInterpolationFilters="sRGB"
                  >
                    <feFlood floodOpacity="0" result="BackgroundImageFix" />
                    <feColorMatrix
                      in="SourceAlpha"
                      type="matrix"
                      values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                    />
                    <feOffset dy="4" />
                    <feGaussianBlur stdDeviation="2" />
                    <feColorMatrix
                      type="matrix"
                      values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0"
                    />
                    <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow" />
                    <feBlend
                      mode="normal"
                      in="SourceGraphic"
                      in2="effect1_dropShadow"
                      result="shape"
                    />
                  </filter>
                </defs>
              </svg>
              <svg
                className="for-investors-icon"
                width="36"
                height="36"
                viewBox="0 0 36 36"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M17.0592 8.37199L7.67665 17.5813H10.2355C11.1777 17.5813 11.9415 18.3309 11.9415 19.2557V22.6045V30.9766H15.3533C16.2955 30.9766 17.0592 31.7263 17.0592 32.6511V34.3255C17.0592 35.2503 16.2955 35.9999 15.3533 35.9999H10.2355H8.52961C7.58744 35.9999 6.82369 35.2503 6.82369 34.3255V32.6511V22.6045H1.70592C0.763755 22.6045 0 21.8549 0 20.9301V19.2557C0 17.5813 0.652571 16.9408 1.70592 15.9069C5.97073 11.7208 17.0593 0 17.0593 0L29.5004 12.2114C30.1665 12.8652 30.1665 13.9255 29.5004 14.5793L27.648 16.3974C26.9818 17.0513 25.9017 17.0513 25.2355 16.3974L17.0592 8.37199Z"
                  fill="#444444"
                />
                <path
                  className="percent-circle2"
                  d="M25.091 22.3636C25.091 24.4723 23.3815 26.1818 21.2728 26.1818C19.164 26.1818 17.4546 24.4723 17.4546 22.3636C17.4546 20.2549 19.164 18.5454 21.2728 18.5454C23.3815 18.5454 25.091 20.2549 25.091 22.3636ZM19.7258 22.3636C19.7258 23.218 20.4184 23.9106 21.2728 23.9106C22.1272 23.9106 22.8198 23.218 22.8198 22.3636C22.8198 21.5092 22.1272 20.8166 21.2728 20.8166C20.4184 20.8166 19.7258 21.5092 19.7258 22.3636Z"
                  fill="#325FFF"
                />
                <path
                  className="percent-circle1"
                  d="M36.0001 31.0909C36.0001 33.1996 34.2907 34.9091 32.182 34.9091C30.0732 34.9091 28.3638 33.1996 28.3638 31.0909C28.3638 28.9822 30.0732 27.2727 32.182 27.2727C34.2907 27.2727 36.0001 28.9822 36.0001 31.0909ZM30.6695 31.0909C30.6695 31.9262 31.3467 32.6033 32.182 32.6033C33.0172 32.6033 33.6944 31.9262 33.6944 31.0909C33.6944 30.2556 33.0172 29.5785 32.182 29.5785C31.3467 29.5785 30.6695 30.2556 30.6695 31.0909Z"
                  fill="#325FFF"
                />
                <rect
                  className="percent-stick"
                  x="30.4756"
                  y="17.4546"
                  width="2.98246"
                  height="19.4964"
                  rx="1.49123"
                  transform="rotate(30 30.4756 17.4546)"
                  fill="#325FFF"
                />
              </svg>
              <p>Проекты</p>
              <h1>Для инвесторов</h1>
            </div>
          </Link>
        </div>

        {/*-------------------------------Create House Button--------------------------------*/}
        <div className="create-house-btn">
          <svg
            width="293"
            height="80"
            viewBox="0 0 293 80"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              opacity="0.6"
              fillRule="evenodd"
              clipRule="evenodd"
              d="M0 0H117L153 36H293V80H36L3.14722e-06 44L0 80V0Z"
              fill="white"
            />
          </svg>
          <p>Создать дом</p>
          <h1>Своей мечты</h1>

          <div className="i-circle">
            <span>i</span>
          </div>
        </div>

        <div className="in-circle-logo"/>

        {/*-------------------------------Left Text--------------------------------*/}
        <div className="left-text-block">
          <h1>Название компании</h1>
          <p>Компания реализации уникальных проектов загородных домов </p>
        </div>
        <div className="right-text-block">
          <div className="right-text-block__item first-right-text">
            <h1>120</h1>
            <p>Разработанных проектов</p>
          </div>
          <div className="right-text-block__item second-right-text">
            <h1>100+</h1>
            <p>Довольных клиентов</p>
          </div>
          <div className="right-text-block__item third-right-text">
            <h1>13</h1>
            <p>
              Ответственных <br />
              подрядчиков - партнеров
            </p>
          </div>
        </div>
      </div>
    </>
  )
}

export default CentralCircle
