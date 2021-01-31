import React from 'react';
import axios from "axios";
import {Pagination} from "antd";

import {useDispatch, useSelector} from "react-redux";
import {addHouseToCart} from "../../../redux/actions/cart";

import HouseCard from "../../catalog/HouseCards/ProjectCard/HouseCard";
import FavoriteHousesSelect from "./FavoriteHousesSelect";

import './FavoriteHouses.css'
import '../SavedProjects.css';
import '../../housepage/HouseProjectPage.css'
import {HostURL} from "../../../data/constants";



function FavoriteProjects() {
    const dispatch = useDispatch()
    const favoriteProjects = useSelector(({ cart }) => cart.compprojects)
    const favoriteProjectsTotal = useSelector(({ cart }) => cart.projects_total)

    const onSelectCategory = React.useCallback((id) => {
        axios.post(`${HostURL}favorites`, {
            id: id,
            category: 'project'
        }, {headers: {'Content-Type': 'application/json', Authorization: localStorage.token}})
    }, [])

    const handleChange = (value) => {
        axios
            .get(`${HostURL}favorites`,
                {params: {pagination: true, page: value, per_page: 9, category: 'project'},
                    headers: {Authorization: localStorage.token}})
            .then(({data}) => {
                dispatch(addHouseToCart(data))
            })
    };

    React.useEffect(() => {
            axios
                .get(`${HostURL}favorites`,
                    {params: {pagination: true, page: 1, per_page: 9, category: 'project'},
                        headers: {Authorization: localStorage.token}})
                .then(({data}) => {
                    dispatch(addHouseToCart(data))
                })
    }, [])

    return (
        <div className="favorite-wrapper">
            <FavoriteHousesSelect />
            <div className="favorite-catalog">
                {favoriteProjects && favoriteProjects.map((obj) =>
                    (<HouseCard
                        onClickItem={onSelectCategory}
                        key={obj.id}
                        {...obj} />))}
            </div>
            <div className="pages">
                {favoriteProjectsTotal !== 0 &&<Pagination
                    simple
                    defaultCurrent={1}
                    defaultPageSize={9}
                    total={favoriteProjectsTotal}
                    onChange={handleChange}
                />}
            </div>
        </div>
    );
}

export default FavoriteProjects;