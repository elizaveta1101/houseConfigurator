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



function FavoriteProjects() {
    const posts = useSelector(({ houses }) => houses.postinfo)
    const dispatch = useDispatch()
    const favoriteProjects = useSelector(({ cart }) => cart.compprojects)
    const favoriteProjectsTotal = useSelector(({ cart }) => cart.projects_total)

    const onSelectCategory = React.useCallback((id) => {
        axios.post('http://127.0.0.1:5000/favorites', {
            id: id,
            category: 'project'
        }, {headers: {'Content-Type': 'application/json', Authorization: posts}})
    }, [])

    const handleChange = (value) => {
        axios
            .get('http://127.0.0.1:5000/favorites',
                {params: {pagination: true, page: value, per_page: 9, category: 'project'},
                    headers: {Authorization: posts}})
            .then(({data}) => {
                dispatch(addHouseToCart(data))
            })
    };

    React.useEffect(() => {
        async function FetchPosts() {
            axios
                .get('http://127.0.0.1:5000/favorites',
                    {params: {pagination: true, page: 1, per_page: 9, category: 'project'},
                        headers: {Authorization: posts}})
                .then(({data}) => {
                    dispatch(addHouseToCart(data))
                })
        }
        FetchPosts()
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