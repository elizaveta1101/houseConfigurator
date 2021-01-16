import React from 'react';
import {Link} from "react-router-dom";

import CheckoutButton from "../components/CheckoutButton";

import './RedactorPage.css';
import '../housepage/HouseProjectPage.css'


function RedactorPage() {
    return (
        <div className="house-project-page-wrapper">
            <div className="redactor-wrapper">
                <div className="redactor-pre-btn-circle">
                    <svg width="525" height="478" viewBox="0 0 525 478" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path opacity="0.1" d="M103.39 0.745342C69.8379 26.7127 42.9701 60.3157 25.0216 98.7595C7.07306 137.203 -1.43737 179.377 0.198064 221.773C1.8335 264.169 13.5675 305.561 34.4243 342.508C55.281 379.455 84.6577 410.888 120.111 434.194C155.564 457.499 196.069 472.003 238.258 476.499C280.446 480.995 323.099 475.354 362.667 460.044C402.236 444.734 437.577 420.198 465.752 388.477C493.927 356.755 514.122 318.765 524.655 277.666L503.17 272.16C493.513 309.838 475 344.666 449.169 373.748C423.339 402.829 390.939 425.323 354.664 439.359C318.388 453.395 279.286 458.567 240.608 454.444C201.931 450.323 164.797 437.026 132.294 415.66C99.7916 394.294 72.8599 365.477 53.739 331.605C34.6181 297.733 23.8606 259.785 22.3613 220.918C20.862 182.05 28.6641 143.387 45.1188 108.142C61.5736 72.8981 86.2053 42.0918 116.965 18.2856L103.39 0.745342Z" fill="#325FFF"/>
                    </svg>
                    <svg className="redactor-pre-btn-abs" width="466" height="198" viewBox="0 0 466 198" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path opacity="0.1" d="M465.667 196.935C456.424 142.467 428.405 92.9529 386.47 56.9853C344.535 21.0177 291.331 0.866163 236.091 0.0272665C180.851 -0.81163 127.06 17.7151 84.0522 52.3927C41.0445 87.0703 11.5342 135.71 0.641992 189.873L6.67974 191.087C17.2883 138.335 46.0301 90.9616 87.9179 57.187C129.806 23.4124 182.196 5.36814 235.998 6.18519C289.799 7.00224 341.618 26.6291 382.46 61.66C423.303 96.6909 450.593 144.915 459.595 197.965L465.667 196.935Z" fill="#325FFF"/>
                    </svg>
                </div>
                <div className="redactor-description-header">
                    <h1>Описание редактора проектов</h1>
                </div>
                <div className="redactor-description">
                    <p>И нет сомнений, что тщательные исследования конкурентов неоднозначны и будут описаны максимально
                        подробно. Таким образом, реализация намеченных плановых заданий не оставляет шанса для модели
                        развития. Есть над чем задуматься: элементы политического процесса являются только методом
                        политического участия и обнародованы. Но тщательные исследования конкурентов набирают популярность
                        среди определенных слоев населения, а значит, должны быть объединены в целые кластеры себе подобных.
                        Идейные соображения высшего порядка, а также курс на социально-ориентированный национальный
                        проект однозначно фиксирует необходимость экономической целесообразности принимаемых решений.
                        Противоположная точка зрения подразумевает, что базовые сценарии поведения пользователей
                        своевременно верифицированы. Разнообразный и богатый опыт говорит нам, что экономическая повестка
                        сегодняшнего дня, в своём классическом представлении, допускает внедрение модели развития. Таким
                        образом, синтетическое тестирование не оставляет шанса для распределения внутренних резервов и
                        ресурсов! Современные технологии достигли такого уровня, что реализация намеченных плановых заданий
                        говорит о возможностях первоочередных требований. Повседневная практика показывает, что постоянное
                        информационно-пропагандистское обеспечение нашей деятельности говорит о.</p>
                </div>
                <Link to="/constructor"><CheckoutButton className="redactor-page-btn" children={'Создать свой уникальный проект'} active={true} /></Link>
            </div>
        </div>
    );
}

export default RedactorPage;
