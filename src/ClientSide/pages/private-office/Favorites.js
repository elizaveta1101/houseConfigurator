import React from 'react';
import {useSelector} from "react-redux";
import {Link, useLocation} from "react-router-dom";

import './Favorites.css';
import '../housepage/HouseProjectPage.css'

import HouseCard from "../catalog/HouseCards/HouseCard";
import CompletedCard from "../catalog/HouseCards/CompletedCard";
import InvestorsCard from "../catalog/HouseCards/InvestorsCard";

import CheckoutButton from "../components/CheckoutButton";


function Favorites() {
    const items = useSelector(({cart}) => cart.compprojects)
    const comphouses = useSelector(({cart}) => cart.comphouses)
    const investhouses = useSelector(({cart}) => cart.investhouses)

    const addedHouses = Object.keys(items).map(key => {
        return items[key][0]
    });
    const addedCompHouses = Object.keys(comphouses).map(key => {
        return comphouses[key][0]
    });
    const addedInvestHouses = Object.keys(investhouses).map(key => {
        return investhouses[key][0]
    });

    const added_project_length = Object.keys(items).length
    const added_houses_length = Object.keys(comphouses).length
    const added_investors_length = Object.keys(investhouses).length

    const all_added = added_project_length + added_houses_length + added_investors_length

    return (
        <div className="house-project-page-wrapper">
            <div className="favorites">
                <h2>Избранное</h2>
                <div className="favorites-cards">
                    {all_added <= 2 &&
                        addedHouses.map(obj => <HouseCard {...obj} />)
                    }
                    {all_added <= 2 &&
                        addedCompHouses.map(obj => <CompletedCard {...obj} />)
                    }
                    {all_added <= 2 &&
                        addedInvestHouses.map(obj => <InvestorsCard {...obj} />)
                    }
                </div>
            </div>
            <div className="look-all-favorites-btn-box">
                <Link to="/saved_projects"><CheckoutButton className="look-all-saved-btn" children={'Посмотреть все избранное'} active={true}/></Link>
            </div>
        </div>
    );
}

export default Favorites;
