import React from 'react';

import '../SavedProjects.css';
import '../../housepage/HouseProjectPage.css'

import FavoriteHousesSelect from "./FavoriteHousesSelect";
import {useSelector} from "react-redux";
import './FavoriteHouses.css'
import CompletedCard from "../../catalog/HouseCards/CompletedCard";


function FavoriteHouses() {
    const comphouses = useSelector(({cart}) => cart.comphouses)
    const addedCompHouses = Object.keys(comphouses).map(key => {
        return comphouses[key][0]
    });

    return (
        <div className="favorite-wrapper">
            <FavoriteHousesSelect />
            <div className="favorite-catalog">
                {
                    addedCompHouses.map(obj => <CompletedCard {...obj} />)
                }
            </div>
        </div>
    );
}

export default FavoriteHouses;