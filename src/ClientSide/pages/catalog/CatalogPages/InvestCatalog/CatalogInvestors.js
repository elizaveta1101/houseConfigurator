import React from 'react';
import axios from "axios";
import {Pagination} from "antd";

import { useDispatch, useSelector } from "react-redux";
import {setHeartsArray, setInvestHeartsArray, setInvestorsHouses} from "../../../../redux/actions/houses";

import '../CatalogCompletedProjects.css';
import CatalogInvestHeader from "../../CatalogHeader/CatalogInvestHeader";
import { setCurrentPageInvest } from "../../../../redux/actions/filters";

import InvestorsCard from "../../HouseCards/InvestorsCard/InvestorsCard";



function CatalogInvestors() {

    const dispatch = useDispatch();
    const investorshouses = useSelector(({houses}) => houses.investorshouses);
    const heart_ids = useSelector(({ houses }) => houses.invest_hearts_arr)
    const totalCount = useSelector(({ houses }) => houses.totalCountInvest)
    const currentPage = useSelector(({filters}) => filters.currentPageInvest)
    const cost = useSelector(({houses}) => houses.costArrInvest);
    const square = useSelector(({houses}) => houses.squareArrInvest);
    const categorySelected = useSelector(({ filters }) => filters.categoryInvest)


    const handleChange = (value) => {
        dispatch(setCurrentPageInvest(value))
    };

    const onSelectCategory = React.useCallback((id) => {
        axios.post('http://127.0.0.1:5000/favorites', {
            id: id,
            category: 'invest'
        }, {headers: {'Content-Type': 'application/json', Authorization: localStorage.token}})
    }, [])


    React.useEffect(() => {
        let stringedFloors = categorySelected.join()

        if(cost === '' || square === ''){
            axios.get('http://127.0.0.1:5000/invest', {
                params: {
                    pagination: true,
                    page: currentPage,
                }, headers: {Authorization: localStorage.token}
            }).then(({data}) => {
                dispatch(setInvestorsHouses(data))
            })
        }
        else if(stringedFloors === ''){
            axios.get('http://127.0.0.1:5000/invest', {
                params: {
                    pagination: true,
                    page: currentPage,
                    cost_filter: cost,
                    square_filter: square
                }, headers: {Authorization: localStorage.token}
            }).then(({data}) => {
                dispatch(setInvestorsHouses(data))
            })
        }
        else {
            axios.get('http://127.0.0.1:5000/invest', {
                params: {
                    pagination: true,
                    page: currentPage,
                    floor_filter: stringedFloors,
                    cost_filter: cost,
                    square_filter: square
                }, headers: {Authorization: localStorage.token}
            }).then(({data}) => {
                dispatch(setInvestorsHouses(data))
            })
        }

        if(localStorage.getItem('token') !== null && localStorage.getItem('token') !== "undefined"){
            axios
                .get('http://127.0.0.1:5000/favorites/main_page',
                    {params: {category: 'invest'},
                        headers: {Authorization: localStorage.token}})
                .then(({data}) => {
                    dispatch(setInvestHeartsArray(data))
                })
        }

    }, [currentPage])

    return (
        <div className="catalog">
            {cost !== '' && square !== '' && <CatalogInvestHeader/>}
            <div className="cards-wrapper">
                {investorshouses && heart_ids && investorshouses.map((obj) =>
                    (<InvestorsCard
                        onClickItem={onSelectCategory}
                    key={obj.id}
                    {...obj}/>))}
            </div>
            <div className="pages">
                {totalCount !== 0 && <Pagination
                    simple
                    defaultCurrent={currentPage}
                    defaultPageSize={9}
                    total={totalCount}
                    onChange={handleChange}
                />}
            </div>
        </div>
    );
}

export default CatalogInvestors;