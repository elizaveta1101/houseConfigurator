import React from 'react';
import axios from "axios";
import { Pagination } from "antd";

import { useDispatch, useSelector } from "react-redux";
import { setCompletedHouses, setHeartsArray } from "../../../../redux/actions/houses";

import CompletedCard from "../../HouseCards/HouseCard/CompletedCard";

import '../CatalogCompletedProjects.css';
import CatalogHousesHeader from "../../CatalogHeader/CatalogHousesHeader";
import { setCurrentPageHouses } from "../../../../redux/actions/filters";


function CatalogCompletedHouses() {
    const dispatch = useDispatch();
    const comphouses = useSelector(({houses}) => houses.comphouses);
    const house_heart_ids = useSelector(({ houses }) => houses.hearts_arr)
    const posts = useSelector(({houses}) => houses.postinfo)
    const totalCount = useSelector(({ houses }) => houses.totalCountHouses)
    const categorySelected = useSelector(({ filters }) => filters.categoryHouses)
    const cost = useSelector(({houses}) => houses.costArrHouses);
    const square = useSelector(({houses}) => houses.squareArrHouses);
    const currentPage = useSelector(({filters}) => filters.currentPageHouses)

    console.log(cost)
    console.log(square)

    const handleChange = (value) => {
        dispatch(setCurrentPageHouses(value))
    };

    const onSelectCategory = React.useCallback((id) => {
        axios.post('http://127.0.0.1:5000/favorites', {
            id: id,
            category: 'house'
        }, {headers: {'Content-Type': 'application/json', Authorization: posts}})
    }, [])


    React.useEffect(() => {
        let stringedFloors = categorySelected.join()

        if(cost === '' || square === ''){
            axios.get('http://127.0.0.1:5000/house', {
                params: {
                    pagination: true,
                    page: currentPage,
                }, headers: {Authorization: posts}
            }).then(({data}) => {
                dispatch(setCompletedHouses(data))
            })
        }
        else if(stringedFloors === ''){
            axios.get('http://127.0.0.1:5000/house', {
                params: {
                    pagination: true,
                    page: currentPage,
                    cost_filter: cost,
                    square_filter: square
                }, headers: {Authorization: posts}
            }).then(({data}) => {
                dispatch(setCompletedHouses(data))
            })
        }
        else {
            axios.get('http://127.0.0.1:5000/house', {
                params: {
                    pagination: true,
                    page: currentPage,
                    floor_filter: stringedFloors,
                    cost_filter: cost,
                    square_filter: square
                }, headers: {Authorization: posts}
            }).then(({data}) => {
                dispatch(setCompletedHouses(data))
            })
        }

        if(posts !== ''){
            axios
                .get('http://127.0.0.1:5000/favorites/main_page',
                    {params: {category: 'house'},
                        headers: {Authorization: posts}})
                .then(({data}) => {
                    dispatch(setHeartsArray(data))
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