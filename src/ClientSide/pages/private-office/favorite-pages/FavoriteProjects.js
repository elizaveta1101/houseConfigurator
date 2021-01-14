import React from 'react';

import '../SavedProjects.css';
import '../../housepage/HouseProjectPage.css'
import FavoriteHousesSelect from "./FavoriteHousesSelect";
import './FavoriteHouses.css'
import {useSelector} from "react-redux";
import HouseCard from "../../catalog/HouseCards/HouseCard";


function FavoriteProjects() {
    const items = useSelector(({cart}) => cart.compprojects)

    const addedHouses = Object.keys(items).map(key => {
        return items[key][0]
    });

    return (
        <div className="favorite-wrapper">
            <FavoriteHousesSelect />
            <div className="favorite-catalog">
                {
                    addedHouses.map(obj => <HouseCard {...obj} />)
                }
            </div>
        </div>
    );
}

export default FavoriteProjects;