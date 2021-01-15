import React from 'react';
import classNames from "class-names";

import {Link, useLocation} from "react-router-dom";

import '../SavedProjects.css';
import '../../housepage/HouseProjectPage.css'


function FavoriteHousesSelect() {
    const savedProjectsActive = useLocation().pathname !== '/saved_projects';
    const savedHousesActive = useLocation().pathname !== '/saved_houses';
    const savedInvestorsActive = useLocation().pathname !== '/saved_investors';

    return (
        <div className="house-project-page-wrapper">
            <div className="choose-catalog">
                <h1>Выбор избранного</h1>
                <div className="choose-catalog__buttons" >
                    <Link to="/saved_projects"><div className={classNames('completed-projects', 'catalog-header__active' , {'catalog-header__active-active': !savedProjectsActive})}>
                        <p>Готовые проекты</p>
                    </div></Link>
                    <Link to="/saved_houses"><div className={classNames('completed-homes', 'catalog-header__active' , {'catalog-header__active-active': !savedHousesActive})}>
                        <p>Готовые дома</p>
                    </div></Link>
                    <Link to="/saved_investors"><div className={classNames('for-investors', 'catalog-header__active' , {'catalog-header__active-active': !savedInvestorsActive})}>
                        <p>Инвесторам</p>
                    </div></Link>
                </div>
            </div>

        </div>
    );
}

export default FavoriteHousesSelect;