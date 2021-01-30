import React from 'react';
import axios from "axios";
import {Pagination} from "antd";

import {useDispatch, useSelector} from "react-redux";
import {addInvestorsHouseToCart} from "../../../redux/actions/cart";

import InvestorsCard from "../../catalog/HouseCards/InvestorsCard/InvestorsCard";
import FavoriteHousesSelect from "./FavoriteHousesSelect";

import '../SavedProjects.css';
import '../../housepage/HouseProjectPage.css'
import './FavoriteHouses.css'
import {HostURL} from "../../../data/constants";


function FavoriteInvestors() {

    const posts = useSelector(({ houses }) => houses.postinfo)
    const dispatch = useDispatch()
    const favoriteInvests = useSelector(({ cart }) => cart.investhouses)
    const favoriteInvestTotal = useSelector(({ cart }) => cart.invest_total)

    const onSelectCategory = React.useCallback((id) => {
        axios.post(`${HostURL}favorites`, {
            id: id,
            category: 'invest'
        }, {headers: {'Content-Type': 'application/json', Authorization: localStorage.token}})
    }, [])

    const handleChange = (value) => {
        axios
            .get(`${HostURL}favorites`,
                {params: {pagination: true, page: value, per_page: 9, category: 'invest'},
                    headers: {Authorization: localStorage.token}})
            .then(({data}) => {
                dispatch(addInvestorsHouseToCart(data))
            })
    };

    React.useEffect(() => {
        async function FetchPosts() {
            axios
                .get(`${HostURL}favorites`,
                    {params: {pagination: true, page: 1, per_page: 9, category: 'invest'},
                        headers: {Authorization: localStorage.token}})
                .then(({data}) => {
                    dispatch(addInvestorsHouseToCart(data))
                })
        }
        FetchPosts()
    }, [])


    return (
        <div className="favorite-wrapper">
            <FavoriteHousesSelect />
            <div className="favorite-catalog">
                {favoriteInvests && favoriteInvests.map((obj) =>
                    (<InvestorsCard
                        onClickItem={onSelectCategory}
                        key={obj.id}
                        {...obj} />))}
            </div>
            <div className="pages">
                {favoriteInvestTotal !== 0 &&<Pagination
                    simple
                    defaultCurrent={1}
                    defaultPageSize={9}
                    total={favoriteInvestTotal}
                    onChange={handleChange}
                />}
            </div>
        </div>
    );
}

export default FavoriteInvestors;