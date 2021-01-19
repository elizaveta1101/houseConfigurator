import React from 'react';
import axios from "axios";
import { Pagination } from "antd";

import { useDispatch, useSelector } from "react-redux";
import { addHouseHeartId, setCompletedHouses, setHousesPage } from "../../../redux/actions/houses";
import { addCompletedHouseToCart } from "../../../redux/actions/cart";

import CompletedCard from "../HouseCards/HouseCard/CompletedCard";
import CatalogHeader from "../CatalogHeader";

import './CatalogCompletedProjects.css';


let heart_indices = [];

function CatalogCompletedHouses() {

    const dispatch = useDispatch();
    const comphouses = useSelector(({houses}) => houses.comphouses);
    const posts = useSelector(({houses}) => houses.postinfo)

    const handleAddHouseToCart = (obj) => {
        dispatch(addCompletedHouseToCart(obj))

        if(!heart_indices.includes(obj.id)){
            heart_indices.push(obj.id)
        }
        else{
            const arrIndex = heart_indices.indexOf(obj.id)
            heart_indices.splice(arrIndex, 1)
        }
        console.log(heart_indices)
        dispatch(addHouseHeartId(heart_indices))
    }

    const handleChange = value => {
        axios.get('http://127.0.0.1:5000/house', {params: {pagination: true, page: value}, headers: {Authorization: posts}}).then(({data}) => {dispatch(setCompletedHouses(data))})
        dispatch(setHousesPage(value))
    };



    return (
        <div className="catalog">
            <CatalogHeader />
            <div className="cards-wrapper">
                {comphouses && comphouses.map((obj) =>
                    (<CompletedCard
                        onClickAddHouse={handleAddHouseToCart}
                        key={obj.id}
                        {...obj}/>))}
            </div>
            <div className="pages">
                <Pagination
                    simple
                    defaultCurrent={1}
                    defaultPageSize={9}
                    total={12}
                    onChange={handleChange}
                />
            </div>
        </div>
    );
}

export default CatalogCompletedHouses;