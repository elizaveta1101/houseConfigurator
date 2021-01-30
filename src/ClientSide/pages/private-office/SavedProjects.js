import React from 'react';

import CheckoutButton from "../components/Buttons/CheckoutButton";
import SavedCard from "./SavedCard";

import './SavedProjects.css';
import '../housepage/HouseProjectPage.css'

function SavedProjects() {
    return (
        <div className="house-project-page-wrapper">
            <div className="saved-projects">
                <h1 className="saved-projects-header">Сохранённые проекты</h1>
                <div className="saved-projects-line">
                    <SavedCard />
                    <SavedCard />
                    <SavedCard />
                </div>
                <div className="look-all-saved-btn-box">
                    <CheckoutButton className="look-all-saved-btn" children={'Посмотреть все сохраненные проекты'} active={true}/>
                </div>
            </div>
        </div>
    );
}

export default SavedProjects;
