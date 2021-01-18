import React from 'react';

import HousePageSlider from "./HousePageSlider";
import CheckoutButton from "../components/CheckoutButton";

import './HouseProjectPage.css';
import {useSelector} from "react-redux";


function HouseProjectPage(){
    const pageId = useSelector(({ housePage }) => housePage.pageId)
    const housesArr = useSelector(({ houses }) => houses.compprojects)
    const housesIndices = useSelector(({ housePage }) => housePage.projectPageId)
    const pageInfo = housesArr[housesIndices.indexOf(pageId)]

    return (
        <div className="house-project-page-wrapper">
            <div className="pre-btn-ellipse">
                <svg width="653" height="653" viewBox="0 0 653 653" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path opacity="0.1" d="M653 326.5C653 255.549 629.888 186.528 587.161 129.884C544.435 73.2397 484.42 32.0551 416.198 12.5629C347.977 -6.92932 275.262 -3.66824 209.06 21.8526C142.857 47.3735 86.7693 93.7651 49.2849 154.006C11.8004 214.248 -5.04051 285.06 1.31076 355.727C7.66203 426.393 36.8598 493.068 84.4853 545.66C132.111 598.252 195.572 633.899 265.264 647.206C334.957 660.513 407.087 650.756 470.74 619.412L458.735 595.034C400.38 623.77 334.253 632.715 270.361 620.515C206.468 608.315 148.289 575.635 104.627 527.42C60.9654 479.205 34.1976 418.08 28.3749 353.294C22.5522 288.509 37.9916 223.59 72.3563 168.362C106.721 113.135 158.141 70.604 218.834 47.2072C279.527 23.8103 346.189 20.8206 408.733 38.6906C471.277 56.5606 526.297 94.3175 565.468 146.247C604.638 198.177 625.827 261.454 625.827 326.5H653Z" fill="#325FFF"/>
                </svg>
                <svg className="pre-btn-ellipse-abs-2" width="290" height="560" viewBox="0 0 290 560" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path opacity="0.1" d="M0.5 560C68.1276 560 133.621 536.324 185.616 493.081C237.611 449.837 272.827 389.755 285.152 323.26C297.477 256.765 286.133 188.054 253.09 129.048C220.047 70.0431 167.389 24.4678 104.254 0.230844L101.552 7.26885C163.043 30.8747 214.33 75.2632 246.512 132.732C278.695 190.201 289.743 257.123 277.739 321.887C265.735 386.65 231.437 445.167 180.796 487.285C130.155 529.402 66.3665 552.461 0.5 552.461V560Z" fill="#325FFF"/>
                </svg>
            </div>
            <div className="house-project-page__main-block">
                <div className="house-project-page__slider">
                    <HousePageSlider />
                    <svg className="heart1" width="27" height="24" viewBox="0 0 18 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M9 16C8.74374 16 8.49669 15.9072 8.30415 15.7388C7.577 15.1035 6.87593 14.5065 6.2574 13.9799L6.25424 13.9772C4.44081 12.4332 2.87485 11.0998 1.78528 9.7863C0.567307 8.31791 0 6.92567 0 5.40473C0 3.92701 0.507156 2.56372 1.42795 1.56581C2.35973 0.556101 3.63826 0 5.02844 0C6.06747 0 7.01903 0.3282 7.8566 0.975406C8.2793 1.3021 8.66245 1.70192 9 2.16828C9.33769 1.70192 9.7207 1.3021 10.1435 0.975406C10.9811 0.3282 11.9327 0 12.9717 0C14.3617 0 15.6404 0.556101 16.5722 1.56581C17.493 2.56372 18 3.92701 18 5.40473C18 6.92567 17.4328 8.31791 16.2149 9.78616C15.1253 11.0998 13.5595 12.433 11.7463 13.9769C11.1267 14.5043 10.4245 15.1023 9.69571 15.739C9.50331 15.9072 9.25612 16 9 16ZM5.02844 1.05348C3.93626 1.05348 2.93294 1.48897 2.20303 2.27983C1.46228 3.08263 1.05428 4.19236 1.05428 5.40473C1.05428 6.68391 1.53012 7.82794 2.59703 9.11412C3.62823 10.3574 5.16206 11.6633 6.938 13.1755L6.9413 13.1782C7.56216 13.7069 8.26598 14.3062 8.99849 14.9461C9.7354 14.3049 10.4403 13.7047 11.0624 13.1752C12.8382 11.663 14.3719 10.3574 15.4031 9.11412C16.4699 7.82794 16.9457 6.68391 16.9457 5.40473C16.9457 4.19236 16.5377 3.08263 15.797 2.27983C15.0672 1.48897 14.0637 1.05348 12.9717 1.05348C12.1716 1.05348 11.437 1.30758 10.7884 1.80866C10.2104 2.25541 9.80777 2.82016 9.5717 3.21531C9.4503 3.41852 9.23662 3.53981 9 3.53981C8.76338 3.53981 8.5497 3.41852 8.4283 3.21531C8.19237 2.82016 7.78972 2.25541 7.21156 1.80866C6.56296 1.30758 5.82838 1.05348 5.02844 1.05348Z" fill="#325FFF"/>
                    </svg>
                </div>
                <div className="house-project-page__right-block">
                    <div className="house-project-page__info">
                    <div className="house-project-page__info-header" />
                    <div className="house-project-page__info-header__small" />
                    <h1>{pageInfo && pageInfo.name}</h1>
                    <div className="house-project-page__info-params">
                        <div className="info-params">
                            <p>Архитектурный стиль дома</p>
                            <span className="info-params_style"><a href="/">{pageInfo && pageInfo.style}</a></span>
                        </div>
                        <div className="info-params">
                            <p>Площадь</p>
                            <span>{pageInfo && pageInfo.square} м2</span>
                        </div>
                        <div className="info-params">
                            <p>Размеры(ДхШ)</p>
                            <span>{pageInfo && pageInfo.size} м</span>
                        </div>
                        <div className="info-params">
                            <p>Этажность</p>
                            <span>{pageInfo && pageInfo.floors} этажа</span>
                        </div>
                        <div className="info-params">
                            <p>Спальни</p>
                            <span>{pageInfo && pageInfo.bedrooms} спальни</span>
                        </div>
                        <div className="info-params">
                            <p>Санузлы</p>
                            <span className="info-params__long">{pageInfo && pageInfo.bathrooms} санузла</span>
                        </div>
                        <div className="info-params">
                            <p>Материалы</p>
                            <h2 className="info-params__long">{pageInfo && pageInfo.materials}</h2>
                        </div>
                    </div>
                </div>
                    <div className="house-project-page__pre-btn-text">
                        <div className="project-page-id">
                            <p>id проекта:<span>{pageInfo && pageInfo.id}</span></p>
                        </div>
                        <h2>Вы можете настроить данный проект для себя</h2>
                        <ul>
                            <li>моментальный расчет стоимости</li>
                            <li>фиксация цены и сроков</li>
                        </ul>
                        <CheckoutButton className="house-page__open-project-btn" children={'Открыть в редакторе'} active={true}/>
                    </div>
                </div>

            </div>
            <div className="house-card__checkout">
                <div className="house-card__checkout-price">
                    <p>Стоимость реализации проекта</p>
                    <h1><span>от</span>{pageInfo && pageInfo.cost} ₽</h1>
                </div>
                <div className="relis-date">
                    <p>Сроки реализации:</p>
                    <span>{pageInfo && pageInfo.time}</span>
                </div>
                <CheckoutButton className="house-card__checkout-btn" children={'Оформить заказ'} active={true}/>
            </div>
            <div className="project-desription">
                <h1>Описание проекта</h1>
                <p>{pageInfo && pageInfo.long_info}</p>
            </div>

        </div>
    );
}


export default HouseProjectPage;
