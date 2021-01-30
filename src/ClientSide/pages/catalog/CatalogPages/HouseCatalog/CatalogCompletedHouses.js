import React from 'react';
import axios from "axios";
import { Pagination } from "antd";

import { useDispatch, useSelector } from "react-redux";
import {setCompletedHouses, setHeartsArray, setHouseHeartsArray} from "../../../../redux/actions/houses";

import CompletedCard from "../../HouseCards/HouseCard/CompletedCard";

import '../CatalogCompletedProjects.css';
import CatalogHousesHeader from "../../CatalogHeader/CatalogHousesHeader";
import { setCurrentPageHouses } from "../../../../redux/actions/filters";
import {HostURL} from "../../../../data/constants";


function CatalogCompletedHouses() {

    const dispatch = useDispatch();
    const comphouses = useSelector(({houses}) => houses.comphouses);
    const house_heart_ids = useSelector(({ houses }) => houses.hearts_arr)
    const totalCount = useSelector(({ houses }) => houses.totalCountHouses)
    const categorySelected = useSelector(({ filters }) => filters.categoryHouses)
    const cost = useSelector(({houses}) => houses.costArrHouses);
    const square = useSelector(({houses}) => houses.squareArrHouses);
    const currentPage = useSelector(({filters}) => filters.currentPageHouses)

    const handleChange = (value) => {
        dispatch(setCurrentPageHouses(value))
    };

    const onSelectCategory = React.useCallback((id) => {
        axios.post(`${HostURL}favorites`, {
            id: id,
            category: 'house'
        }, {headers: {'Content-Type': 'application/json', Authorization: localStorage.token}})
    }, [])


    React.useEffect(() => {
        let stringedFloors = categorySelected.join()

        if(cost === '' || square === ''){
            axios.get(`${HostURL}house`, {
                params: {
                    pagination: true,
                    page: currentPage,
                }, headers: {Authorization: localStorage.token}
            }).then(({data}) => {
                dispatch(setCompletedHouses(data))
            })
        }
        else if(stringedFloors === ''){
            axios.get(`${HostURL}house`, {
                params: {
                    pagination: true,
                    page: currentPage,
                    cost_filter: cost,
                    square_filter: square
                }, headers: {Authorization: localStorage.token}
            }).then(({data}) => {
                dispatch(setCompletedHouses(data))
            })
        }
        else {
            axios.get(`${HostURL}house`, {
                params: {
                    pagination: true,
                    page: currentPage,
                    floor_filter: stringedFloors,
                    cost_filter: cost,
                    square_filter: square
                }, headers: {Authorization: localStorage.token}
            }).then(({data}) => {
                dispatch(setCompletedHouses(data))
            })
        }

        if(localStorage.getItem('token') !== null && localStorage.getItem('token') !== "undefined"){
            axios
                .get(`${HostURL}favorites/main_page`,
                    {params: {category: 'house'},
                        headers: {Authorization: localStorage.token}})
                .then(({data}) => {
                    dispatch(setHouseHeartsArray(data))
                })
        }

    }, [currentPage])


    return (
        <div className="catalog">
            {cost !== '' && square !== '' &&<CatalogHousesHeader/>}
            <div className="cards-wrapper">
                {comphouses && house_heart_ids && comphouses.map((obj) =>
                    (<CompletedCard
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

export default CatalogCompletedHouses;