import React from 'react';

import './CatalogCompletedProjects.css';
import InvestorsCard from "../HouseCards/InvestorsCard";
import CatalogHeader from "../CatalogHeader";
import {useDispatch, useSelector} from "react-redux";
import axios from "axios";
import {
    addInvestHeartId,
    setCompletedHouses,
    setCompletedProjects,
    setInvestorsHouses, setInvestPage
} from "../../../redux/actions/houses";
import {addInvestorsHouseToCart} from "../../../redux/actions/cart";
import {setCost, setSquare} from "../../../redux/actions/filters";
import {Pagination} from "antd";


let heart_indices = [];

function CatalogInvestors() {

    const dispatch = useDispatch();
    const investorshouses = useSelector(({houses}) => houses.investorshouses);
    const posts = useSelector(({houses}) => houses.postinfo)
    const maxcost = useSelector(({filters}) => filters.sortByCost)
    const maxsquare = useSelector(({filters}) => filters.sortBySquare)

    console.log(maxcost)
    console.log(maxsquare)

    React.useEffect(() => {
        async function FetchPosts(){
            await axios.get('http://127.0.0.1:5000/invest', {params: {pagination: true, page: 1}, headers: {Authorization: posts}}).then(({data}) => {dispatch(setInvestorsHouses(data))})
        }
        FetchPosts()
    },[dispatch])



    const handleAddHouseToCart = (obj) => {
        dispatch(addInvestorsHouseToCart(obj))

        if(!heart_indices.includes(obj.id)){
            heart_indices.push(obj.id)
        }
        else{
            const arrIndex = heart_indices.indexOf(obj.id)
            heart_indices.splice(arrIndex, 1)
        }
        console.log(heart_indices)
        dispatch(addInvestHeartId(heart_indices))
    }

    const handleChange = value => {
        axios.get('http://127.0.0.1:5000/invest', {params: {pagination: true, page: value}, headers: {Authorization: posts}}).then(({data}) => {dispatch(setInvestorsHouses(data))})
        dispatch(setInvestPage(value))
    };



    return (
        <div className="catalog">
            <CatalogHeader />
            <div className="cards-wrapper">
                {investorshouses && investorshouses.map((obj) =>
                    (<InvestorsCard
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

export default CatalogInvestors;