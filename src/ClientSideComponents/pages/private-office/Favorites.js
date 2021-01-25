import React from 'react';
import axios from "axios";
import {useDispatch, useSelector} from "react-redux";
import { Link } from "react-router-dom";

import {addCompletedHouseToCart, addHouseToCart, addInvestorsHouseToCart} from "../../redux/actions/cart";

import HouseCard from "../catalog/HouseCards/ProjectCard/HouseCard";
import CompletedCard from "../catalog/HouseCards/HouseCard/CompletedCard";
import InvestorsCard from "../catalog/HouseCards/InvestorsCard/InvestorsCard";
import CheckoutButton from "../components/Buttons/CheckoutButton";

import './Favorites.css';
import '../housepage/HouseProjectPage.css'



function Favorites() {
    const favoriteProjects = useSelector(({cart}) => cart.compprojects)
    const favoriteHouses = useSelector(({ cart }) => cart.comphouses)
    const favoriteInvests = useSelector(({cart}) => cart.investhouses)
    const dispatch = useDispatch()
    const posts = useSelector(({ houses }) => houses.postinfo)

    const onSelectCategory = React.useCallback((id) => {
        axios.post('http://127.0.0.1:5000/favorites', {
            id: id,
            category: 'house'
        }, {headers: {'Content-Type': 'application/json', Authorization: posts}})
    }, [])

    const onSelectCategoryProjects = React.useCallback((id) => {
        axios.post('http://127.0.0.1:5000/favorites', {
            id: id,
            category: 'project'
        }, {headers: {'Content-Type': 'application/json', Authorization: posts}})
    }, [])

    const onSelectCategoryInvests = React.useCallback((id) => {
        axios.post('http://127.0.0.1:5000/favorites', {
            id: id,
            category: 'invest'
        }, {headers: {'Content-Type': 'application/json', Authorization: posts}})
    }, [])

    React.useEffect(() => {
        async function FetchPosts() {
            axios
                .get('http://127.0.0.1:5000/favorites',
                    {params: {pagination: true, page: 1, per_page: 1, category: 'house'},
                        headers: {Authorization: posts}})
                .then(({data}) => {
                    dispatch(addCompletedHouseToCart(data))
                })
        }
        FetchPosts()
    }, [])

    React.useEffect(() => {
        async function FetchPosts() {
            axios
                .get('http://127.0.0.1:5000/favorites',
                    {params: {pagination: true, page: 1, per_page: 1, category: 'project'},
                        headers: {Authorization: posts}})
                .then(({data}) => {
                    dispatch(addHouseToCart(data))
                })
        }
        FetchPosts()
    }, [])



    React.useEffect(() => {
        async function FetchPosts() {
            axios
                .get('http://127.0.0.1:5000/favorites',
                    {params: {pagination: true, page: 1, per_page: 1, category: 'invest'},
                        headers: {Authorization: posts}})
                .then(({data}) => {
                    dispatch(addInvestorsHouseToCart(data))
                })
        }
        FetchPosts()
    }, [])

    return (
        <div className="house-project-page-wrapper">
            <div className="favorites">
                <h2>Избранное</h2>
                <div className="favorites-cards">
                    {favoriteHouses && favoriteHouses.map((obj) =>
                        (<CompletedCard
                            onClickItem={onSelectCategory}
                            key={obj.id}
                            {...obj} />))}

                    {favoriteProjects && favoriteProjects.map((obj) =>
                        (<HouseCard
                            onClickItem={onSelectCategoryProjects}
                            key={obj.id}
                            {...obj} />))}

                    {favoriteInvests && favoriteInvests.map((obj) =>
                        (<InvestorsCard
                            onClickItem={onSelectCategoryInvests}
                            key={obj.id}
                            {...obj} />))}
                </div>
                <div className="look-all-favorites-btn-box">
                    <Link to="/saved_projects"><CheckoutButton className="look-all-saved-btn" children={'Посмотреть все избранное'} active={true}/></Link>
                </div>
            </div>
        </div>
    );
}

export default Favorites;