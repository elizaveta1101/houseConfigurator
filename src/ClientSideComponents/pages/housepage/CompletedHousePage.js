import React from 'react';

import HousePageSlider from "./HousePageSlider";
import CheckoutButton from "../components/CheckoutButton";

import './HouseProjectPage.css';


function CompletedHousePage() {
    return (
        <div className="house-project-page-wrapper">
            <div className="completed-pre-btn-ellipse">
                <svg width="525" height="478" viewBox="0 0 525 478" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path opacity="0.1" d="M103.39 0.745342C69.8379 26.7127 42.9701 60.3157 25.0216 98.7595C7.07306 137.203 -1.43737 179.377 0.198064 221.773C1.8335 264.169 13.5675 305.561 34.4243 342.508C55.281 379.455 84.6577 410.888 120.111 434.194C155.564 457.499 196.069 472.003 238.258 476.499C280.446 480.995 323.099 475.354 362.667 460.044C402.236 444.734 437.577 420.198 465.752 388.477C493.927 356.755 514.122 318.765 524.655 277.666L503.17 272.16C493.513 309.838 475 344.666 449.169 373.748C423.339 402.829 390.939 425.323 354.664 439.359C318.388 453.395 279.286 458.567 240.608 454.444C201.931 450.323 164.797 437.026 132.294 415.66C99.7916 394.294 72.8599 365.477 53.739 331.605C34.6181 297.733 23.8606 259.785 22.3613 220.918C20.862 182.05 28.6641 143.387 45.1188 108.142C61.5736 72.8981 86.2053 42.0918 116.965 18.2856L103.39 0.745342Z" fill="#325FFF"/>
                </svg>
                <svg className="pre-btn-ellipse-abs" width="466" height="198" viewBox="0 0 466 198" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path opacity="0.1" d="M465.667 196.935C456.424 142.467 428.405 92.9529 386.47 56.9853C344.535 21.0177 291.331 0.866163 236.091 0.0272665C180.851 -0.81163 127.06 17.7151 84.0522 52.3927C41.0445 87.0703 11.5342 135.71 0.641992 189.873L6.67974 191.087C17.2883 138.335 46.0301 90.9616 87.9179 57.187C129.806 23.4124 182.196 5.36814 235.998 6.18519C289.799 7.00224 341.618 26.6291 382.46 61.66C423.303 96.6909 450.593 144.915 459.595 197.965L465.667 196.935Z" fill="#325FFF"/>
                </svg>
            </div>
            <div className="house-project-page__main-block">
                <div className="house-project-page__slider">
                    <HousePageSlider />
                </div>
                <div className="house-project-page__right-block">
                    <div className="house-project-page__info">
                        <div className="house-project-page__info-header" />
                        <div className="house-project-page__info-header__small" />
                        <h1>Дом из кирпича “Дельпаче”</h1>
                        <div className="house-project-page__info-params">
                            <div className="info-params">
                                <p>Архитектурный стиль дома</p>
                                <span className="info-params_style"><a href="/">Модерн</a></span>
                            </div>
                            <div className="info-params">
                                <p>Площадь</p>
                                <span>324 м2</span>
                            </div>
                            <div className="info-params">
                                <p>Размеры(ДхШ)</p>
                                <span>10х16 м</span>
                            </div>
                            <div className="info-params">
                                <p>Этажность</p>
                                <span>2 этажа</span>
                            </div>
                            <div className="info-params">
                                <p>Спальни</p>
                                <span>4 спальни</span>
                            </div>
                            <div className="info-params">
                                <p>Санузлы</p>
                                <span className="info-params__long">2 санузла</span>
                            </div>
                            <div className="info-params">
                                <p>Материалы</p>
                                <h2 className="info-params__long">Дуб, металл, третий, четвертый, пятый, шестой, седьмой </h2>
                            </div>
                        </div>
                    </div>
                    <div className="house-project-page__pre-btn-text">
                        <p>id проекта:<span> 00000002</span></p>
                        <h2>Стоимость дома</h2>
                        <h1>4 490 000 ₽</h1>
                        <CheckoutButton className="house-page__open-project-btn" children={'Оформить заказ'} active={true}/>
                    </div>
                </div>
            </div>
            <div className="completed-page__info">
                <div className="project-desription">
                    <h1>Описание проекта</h1>
                    <p>С другой стороны, экономическая повестка сегодняшнего дня играет важную роль в формировании форм
                        воздействия. Идейные соображения высшего порядка, а также экономическая повестка сегодняшнего дня
                        не даёт нам иного выбора, кроме определения анализа существующих паттернов поведения. Лишь активно
                        развивающиеся страны третьего мира, которые представляют собой яркий пример
                        континентально-европейского типа политической культуры, будут смешаны с не уникальными данными
                        до степени совершенной неузнаваемости, из-за чего возрастает их статус бесполезности.
                        В рамках спецификации современных стандартов, непосредственные участники технического прогресса
                        формируют глобальную экономическую сеть и при этом -  преданы социально-демократической анафеме.
                        Кстати,  активно развивающиеся страны третьего мира могут быть в равной степени предоставлены сами
                        себе. Высокий уровень вовлечения представителей целевой аудитории является четким доказательством
                        простого факта: высокое качество позиционных исследований создаёт предпосылки для модели развития.
                        С другой стороны, экономическая повестка сегодняшнего дня играет важную роль в формировании форм
                        воздействия. Идейные соображения высшего порядка, а также экономическая повестка сегодняшнего дня
                        не даёт нам иного выбора, кроме определения анализа существующих паттернов поведения. Лишь активно
                        развивающиеся страны третьего мира, которые представляют собой яркий пример
                        континентально-европейского типа политической культуры, будут смешаны с не уникальными данными
                        до степени совершенной неузнаваемости, из-за чего возрастает их статус бесполезности.
                        В рамках спецификации современных стандартов, непосредственные участники технического прогресса
                        формируют глобальную экономическую сеть и при этом -  преданы социально-демократической анафеме.
                        Кстати,  активно развивающиеся страны третьего мира могут быть в равной степени предоставлены сами
                        себе. Высокий уровень вовлечения представителей целевой аудитории является четким доказательством
                        простого факта: высокое качество позиционных исследований создаёт предпосылки для модели развития.
                        С другой стороны, экономическая повестка сегодняшнего дня играет важную роль в формировании форм
                        воздействия. Идейные соображения высшего порядка, а также экономическая повестка сегодняшнего дня
                        не даёт нам иного выбора, кроме определения анализа существующих паттернов поведения. Лишь активно
                        развивающиеся страны третьего мира, которые представляют собой яркий пример
                        континентально-европейского типа политической культуры, будут смешаны с не уникальными данными
                        до степени совершенной неузнаваемости, из-за чего возрастает их статус бесполезности.
                        В рамках спецификации современных стандартов, непосредственные участники технического прогресса
                        формируют глобальную экономическую сеть и при этом -  преданы социально-демократической анафеме.
                        Кстати,  активно развивающиеся страны третьего мира могут быть в равной степени предоставлены сами
                        себе. Высокий уровень вовлечения представителей целевой аудитории является четким доказательством
                        простого факта: высокое качество позиционных исследований создаёт предпосылки для модели развития.
                        С другой стороны, экономическая повестка сегодняшнего дня играет важную роль в формировании форм
                        воздействия. Идейные соображения высшего порядка, а также экономическая повестка сегодняшнего дня
                        не даёт нам иного выбора, кроме определения анализа существующих паттернов поведения. Лишь активно
                        развивающиеся страны третьего мира, которые представляют собой яркий пример
                        континентально-европейского типа политической культуры, будут смешаны с не уникальными данными
                        до степени совершенной неузнаваемости, из-за чего возрастает их статус бесполезности.
                        В рамках спецификации современных стандартов, непосредственные участники технического прогресса
                        формируют глобальную экономическую сеть и при этом -  преданы социально-демократической анафеме.
                        Кстати,  активно развивающиеся страны третьего мира могут быть в равной степени предоставлены сами
                        себе. Высокий уровень вовлечения представителей целевой аудитории является четким доказательством
                        простого факта: высокое качество позиционных исследований создаёт предпосылки для модели развития.
                    </p>
                </div>
                <div className="project-desription__placeholder">
                    <h1>Местоположение дома</h1>
                    <p>Московская область, Деревня Глуховка, владение 25</p>
                    <div className="map">

                    </div>
                    <div className="map-btn-box">
                        <CheckoutButton className="map-btn" children={'Открыть на карте'} active={true}/>
                    </div>
                </div>
            </div>
            <div className="completed-page__ifrostructure">
                <h1>Инфраструктура</h1>
                <p>С другой стороны, экономическая повестка сегодняшнего дня играет важную роль в формировании форм
                    воздействия. Идейные соображения высшего порядка, а также экономическая повестка сегодняшнего дня
                    не даёт нам иного выбора, кроме определения анализа существующих паттернов поведения. Лишь активно
                    развивающиеся страны третьего мира, которые представляют собой яркий пример
                    континентально-европейского типа политической культуры.
                    С другой стороны, экономическая повестка сегодняшнего дня играет важную роль в формировании форм
                    воздействия. Идейные соображения высшего порядка, а также экономическая повестка сегодняшнего дня
                    не даёт нам иного выбора, кроме определения анализа существующих паттернов поведения. Лишь активно
                    развивающиеся страны третьего мира, которые представляют собой яркий пример
                    континентально-европейского типа политической культуры.С другой стороны, экономическая повестка сегодняшнего дня играет важную роль в формировании форм
                    воздействия. Идейные соображения высшего порядка, а также экономическая повестка сегодняшнего дня
                    не даёт нам иного выбора, кроме определения анализа существующих паттернов поведения. Лишь активно
                    развивающиеся страны третьего мира, которые представляют собой яркий пример
                    континентально-европейского типа политической культуры.
                    С другой стороны, экономическая повестка сегодняшнего дня играет важную роль в формировании форм
                    воздействия. Идейные соображения высшего порядка, а также экономическая повестка сегодняшнего дня
                    не даёт нам иного выбора, кроме определения анализа существующих паттернов поведения. Лишь активно
                    развивающиеся страны третьего мира, которые представляют собой яркий пример
                    континентально-европейского типа политической культуры.
                    С другой стороны, экономическая повестка сегодняшнего дня играет важную роль в формировании форм
                    воздействия. Идейные соображения высшего порядка, а также экономическая повестка сегодняшнего дня
                    не даёт нам иного выбора, кроме определения анализа существующих паттернов поведения. Лишь активно
                    развивающиеся страны третьего мира, которые представляют собой яркий пример
                    континентально-европейского типа политической культуры.
                    С другой стороны, экономическая повестка сегодняшнего дня играет важную роль в формировании форм
                    воздействия. Идейные соображения высшего порядка, а также экономическая повестка сегодняшнего дня
                    не даёт нам иного выбора, кроме определения анализа существующих паттернов поведения. Лишь активно
                    развивающиеся страны третьего мира, которые представляют собой яркий пример
                    континентально-европейского типа политической культуры, будут смешаны с не уникальными данными
                    до степени совершенной неузнаваемости, из-за чего возрастает их статус бесполезности.
                    В рамках спецификации современных стандартов, непосредственные участники технического прогресса
                    формируют глобальную экономическую сеть и при этом -  преданы социально-демократической анафеме.
                    Кстати,  активно развивающиеся страны третьего мира могут быть в равной степени предоставлены сами
                    себе. Высокий уровень вовлечения представителей целевой аудитории является четким доказательством
                    простого факта: высокое качество позиционных исследований создаёт предпосылки для модели развития.
                </p>
            </div>
        </div>
    );
}

export default CompletedHousePage;
