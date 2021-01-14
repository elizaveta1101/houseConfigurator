import React from 'react';
import {Link, useLocation} from "react-router-dom";
import classNames from "class-names";


function SavedProjectsPage() {
    const completedProjectsActive = useLocation().pathname !== '/saved_projects_page';
    const completedHousesActive = useLocation().pathname !== '/catalog_comp_houses';

    return (
        <div className="house-project-page-wrapper">
            <div className="choose-catalog__buttons" >
                <Link to="/saved_projects_page"><div className={classNames('completed-projects', 'catalog-header__active' , {'catalog-header__active-active': !completedProjectsActive})}>
                    <p>Завершенные</p>
                </div></Link>
                <Link to="/catalog_comp_houses"><div className={classNames('completed-homes', 'catalog-header__active' , {'catalog-header__active-active': !completedHousesActive})}>
                    <p>Не завершенные</p>
                </div></Link>
            </div>
        </div>
    );
}

export default SavedProjectsPage;