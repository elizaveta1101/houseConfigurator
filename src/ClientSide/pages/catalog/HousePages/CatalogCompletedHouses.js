import React from 'react';
import axios from "axios";
import { Pagination } from "antd";

import { useDispatch, useSelector } from "react-redux";
import { addHouseHeartId, setCompletedHouses, setHousesPage } from "../../../redux/actions/houses";
import { addCompletedHouseToCart } from "../../../redux/actions/cart";

import CompletedCard from "../HouseCards/HouseCard/CompletedCard";
import CatalogHeader from "../CatalogHeader";

import './CatalogCompletedProjects.css';
import {setProjectPageId} from "../../../redux/actions/housePage";
import {HostURL} from "../../../data/constants";


let heart_indices = [];
let indices = [];

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
        axios.get(`${HostURL}house`, {params: {pagination: true, page: value}, headers: {Authorization: posts}}).then(({data}) => {dispatch(setCompletedHouses(data))})
        dispatch(setHousesPage(value))
    };

    React.useEffect(() => {
        async function FetchPosts(){
            await axios.get(`${HostURL}house`, {params: {pagination: true, page: 1}, headers: {Authorization: posts}}).then(({data}) => {dispatch(setCompletedHouses(data))})
        }
        FetchPosts()
    },[dispatch])

    indices = []
    for(let i = 0; i < comphouses.length; i++){
        if(!indices.includes(comphouses[i].id)){
            indices.push(comphouses[i].id)}
    }

    dispatch(setProjectPageId(indices))

    console.log(indices)


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