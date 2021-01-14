import React from 'react';

import '../SavedProjects.css';
import '../../housepage/HouseProjectPage.css'
import FavoriteHousesSelect from "./FavoriteHousesSelect";
import './FavoriteHouses.css'
import {useSelector} from "react-redux";
import InvestorsCard from "../../catalog/HouseCards/InvestorsCard";


function FavoriteInvestors() {
    const investhouses = useSelector(({cart}) => cart.investhouses)
    const addedInvestHouses = Object.keys(investhouses).map(key => {
        return investhouses[key][0]
    });

    return (
        <div className="favorite-wrapper">
            <FavoriteHousesSelect />
            <div className="favorite-catalog">
                {
                    addedInvestHouses.map(obj => <InvestorsCard {...obj} />)
                }
            </div>
        </div>
    );
}

export default FavoriteInvestors;