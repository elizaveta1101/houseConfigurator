import React from 'react';
import axios from "axios";
import {Pagination} from "antd";

import {useDispatch, useSelector} from "react-redux";
import {addCompletedHouseToCart} from "../../../redux/actions/cart";

import FavoriteHousesSelect from "./FavoriteHousesSelect";
import CompletedCard from "../../catalog/HouseCards/HouseCard/CompletedCard";

import './FavoriteHouses.css'
import '../SavedProjects.css';
import '../../housepage/HouseProjectPage.css'



function FavoriteHouses() {
    const posts = useSelector(({ houses }) => houses.postinfo)
    const dispatch = useDispatch()
    const favoriteHouses = useSelector(({ cart }) => cart.comphouses)
    const favoriteHousesTotal = useSelector(({ cart }) => cart.houses_total)

    const onSelectCategory = React.useCallback((id) => {
        axios.post('http://127.0.0.1:5000/favorites', {
            id: id,
            category: 'house'
        }, {headers: {'Content-Type': 'application/json', Authorization: localStorage.token}})
    }, [])

    const handleChange = (value) => {
        axios
            .get('http://127.0.0.1:5000/favorites',
                {params: {pagination: true, page: value, per_page: 9, category: 'house'},
                    headers: {Authorization: localStorage.token}})
            .then(({data}) => {
                dispatch(addCompletedHouseToCart(data))
            })
    };


    React.useEffect(() => {
        async function FetchPosts() {
            axios
                .get('http://127.0.0.1:5000/favorites',
                    {params: {pagination: true, page: 1, per_page: 9, category: 'house'},
                        headers: {Authorization: localStorage.token}})
                .then(({data}) => {
                    dispatch(addCompletedHouseToCart(data))
                })
        }
        FetchPosts()
    }, [])

    return (
        <div className="favorite-wrapper">
            <FavoriteHousesSelect />
            <div className="favorite-catalog">
                {favoriteHouses && favoriteHouses.map((obj) =>
                    (<CompletedCard
                        onClickItem={onSelectCategory}
                        key={obj.id}
                        {...obj}
                        />)
                )}
            </div>
            <div className="pages">
                {favoriteHousesTotal !== 0 && <Pagination
                    simple
                    defaultCurrent={1}
                    defaultPageSize={9}
                    total={favoriteHousesTotal}
                    onChange={handleChange}
                />}
            </div>
        </div>
    );
}

export default FavoriteHouses;