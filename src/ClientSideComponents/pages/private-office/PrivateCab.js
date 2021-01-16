import React from 'react';
import {Link} from 'react-router-dom'

import CheckoutButton from "../components/CheckoutButton";
import SavedProjects from "./SavedProjects";
import Favorites from "./Favorites";

import '../housepage/HouseProjectPage.css'
import './PrivateCab.css';


function PrivateCab() {
    return (
        <div className="house-project-page-wrapper">
            <div className="lk-first-block">
                <div className="private-cab-circles">
                    <svg width="453" height="533" viewBox="0 0 453 533" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path opacity="0.1" d="M79.4907 510.572C123.769 529.985 172.494 536.987 220.447 530.829C268.399 524.671 313.774 505.584 351.71 475.612C389.646 445.641 418.714 405.915 435.801 360.688C452.888 315.462 457.35 266.439 448.709 218.87C440.069 171.302 418.651 126.98 386.75 90.6524C354.848 54.3244 313.666 27.3588 267.613 12.6438C221.56 -2.07115 172.371 -3.98113 125.316 7.11846C78.2608 18.2181 35.1112 41.9091 0.489136 75.654L15.9701 91.5373C47.7107 60.6008 87.2691 38.8815 130.408 28.7057C173.547 18.5299 218.642 20.2809 260.862 33.7712C303.082 47.2615 340.837 71.9829 370.084 105.287C399.33 138.592 418.965 179.225 426.887 222.835C434.808 266.444 430.717 311.387 415.052 352.849C399.387 394.312 372.739 430.732 337.96 458.209C303.181 485.686 261.583 503.184 217.621 508.83C173.659 514.476 128.99 508.056 88.3967 490.259L79.4907 510.572Z" fill="#325FFF"/>
                    </svg>
                    <svg className="private-cab-circle-2" width="470" height="473" viewBox="0 0 470 473" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path opacity="0.1" d="M469.667 196.935C461.647 149.672 439.454 105.962 406.029 71.5991C372.603 37.2359 329.525 13.8416 282.502 4.5171C235.479 -4.80745 186.733 0.378004 142.725 19.3862C98.7159 38.3943 61.5226 70.3276 36.0746 110.954C10.6265 151.58 -1.87485 198.98 0.22755 246.872C2.32995 294.764 18.9368 340.887 47.847 379.126C76.7572 417.366 116.606 445.917 162.111 460.996C207.616 476.075 256.629 476.969 302.653 463.559L300.931 457.647C256.105 470.707 208.368 469.836 164.048 455.15C119.728 440.464 80.917 412.656 52.7596 375.412C24.6023 338.168 8.42791 293.247 6.38025 246.602C4.3326 199.957 16.5084 153.791 41.2938 114.223C66.0792 74.6549 102.304 43.5531 145.167 25.04C188.029 6.52679 235.506 1.47637 281.304 10.5581C327.102 19.6398 369.059 42.4249 401.614 75.8933C434.169 109.362 455.784 151.933 463.595 197.965L469.667 196.935Z" fill="#325FFF"/>
                    </svg>
                </div>
                <div className="private-cab-block">
                    <div className="private-cab-info">
                        <div className="personal-info">
                            <h1>Персональная информация</h1>
                            <div className="info-left-block">
                                <ul className="info-name">
                                    <li>Имя</li>
                                    <li>Фамилия</li>
                                    <li>Почта</li>
                                    <li>Телефон</li>
                                </ul>
                                <ul className="info-person">
                                    <li>Георг</li>
                                    <li>Мишутин</li>
                                    <li>GeorMish@gmail.com</li>
                                    <li>+7 (999) 999-99-99</li>
                                </ul>
                            </div>
                        </div>
                        <div className="orders">
                            <h1>Заказы</h1>
                            <div className="info-right-block">
                                <div className="order">
                                    <div className="order-num">
                                        <p>№ 131234</p>
                                        <span>Заказ создан</span>
                                    </div>
                                    <div className="order-date">
                                        <p>от 08.09.2020</p>
                                    </div>
                                </div>
                                <div className="order">
                                    <div className="order-num">
                                        <p>№ 131234</p>
                                        <span>Заказ создан</span>
                                    </div>
                                    <div className="order-date">
                                        <p>от 08.09.2020</p>
                                    </div>
                                </div>
                                <div className="order">
                                    <div className="order-num">
                                        <p>№ 131234</p>
                                        <span>Заказ создан</span>
                                    </div>
                                    <div className="order-date">
                                        <p>от 08.09.2020</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="lk-btns">
                        <div className="lk-btns__left">
                            <CheckoutButton className="lk-btn" children={'Редактировать данные'} active={true}/>
                            <CheckoutButton className="lk-btn" children={'Сменить пароль'} active={true}/>
                        </div>
                        <div className="lk-btns__right">
                            <CheckoutButton className="lk-btn" children={'Все заказы'} active={true}/>
                        </div>
                    </div>
                </div>
                <div className="house-page__open-project-btn-block">
                    <Link to="/redactor_page"><CheckoutButton className="house-page__open-project-btn" children={'Создать новый проект'} active={true}/></Link>
                </div>
            </div>
            <SavedProjects />
            <Favorites />
        </div>
    );
}

export default PrivateCab;
