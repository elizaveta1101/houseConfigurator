import React from 'react';
import {Link, useLocation} from "react-router-dom";
import classNames from "class-names";
import {savedHousesPage, savedProjectsPage} from "../../../data/constants";


function SavedProjectsPage() {
    const completedProjectsActive = useLocation().pathname !== '/saved_projects_page';
    const completedHousesActive = useLocation().pathname !== '/catalog_comp_houses';

    return (
        <div className="house-project-page-wrapper">
            <div className="choose-catalog__buttons" >
                <Link to={savedProjectsPage}><div className={classNames('completed-projects', 'catalog-header__active' , {'catalog-header__active-active': !completedProjectsActive})}>
                    <p>Завершенные</p>
                </div></Link>
                <Link to={savedHousesPage}><div className={classNames('completed-homes', 'catalog-header__active' , {'catalog-header__active-active': !completedHousesActive})}>
                    <p>Не завершенные</p>
                </div></Link>
            </div>
        </div>
    );
}

export default SavedProjectsPage;