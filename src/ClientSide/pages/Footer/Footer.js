import React from 'react';
import {Link} from 'react-router-dom'

import CheckoutButton from "../components/Buttons/CheckoutButton";

import './Footer.css';


function Footer() {
    return (
        <div className="footer-wrapper-bg">
            <div className="footer-header"/>
            <div className="footer-wrapper">
                <div className="main-links">
                    <h1><Link to="/">Главная</Link></h1>
                    <h1 className="h1-after">О нас</h1>
                    <p>Как мы работаем</p>
                    <p>Документы</p>
                    <p>Инвестиционные проекты</p>
                </div>
                <div className="secondary-links">
                    <Link to="/redactor_page"><h1>Конструктор проекта</h1></Link>
                    <h1 className="h1-after"><Link to="/cat_comp_proj">Каталог</Link></h1>
                    <p><Link to="/catalog">Готовые проекты</Link></p>
                    <p><Link to="/catalog_comp_houses">Готовые дома</Link></p>
                    <p><Link to="/catalog_investors_houses">Инвестиционные проекты</Link></p>
                    <h1 className="h1-after"><Link to="/catalog_investors_houses">Инвесторам</Link></h1>
                </div>
                <div className="footer-contacts">
                    <h1>Контакты</h1>
                    <span>Звонок бесплатный</span>
                    <h2>+7 (495) 000-00-00</h2>
                    <h3>Москва, Ул Орджоникидзе, д.5</h3>

                    <button>Обратный звонок</button>
                </div>
            </div>
            <div className="footer-wrapper-768">
                <div className="main-links-768">
                    <h1><Link to="/">Главная</Link></h1>
                    <h1>Конструктор проекта</h1>
                    <h1><Link to="/cat_comp_proj">Каталог</Link></h1>

                    <p><Link to="/cat_comp_proj">Готовые проекты</Link></p>
                    <p><Link to="/cat_comp_houses">Готовые дома</Link></p>
                    <p><Link to="/cat_for_investors">Инвестиционные проекты</Link></p>

                    <h1>Инвесторам</h1>
                </div>
                <div className="contacts-768">
                    <h1>О нас</h1>
                    <p>Как мы работаем</p>
                    <p>Документы</p>
                    <p>Инвестиционные проекты</p>

                    <h1>Контакты</h1>

                    <span>Звонок бесплатный</span>

                    <h2>+7 (495) 000-00-00</h2>
                    <h2>Москва, Ул Орджоникидзе, д.5</h2>

                    <div className="footer-btn">
                        <CheckoutButton className="map-btn" children={'Открыть на карте'} active={true}/>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Footer;
