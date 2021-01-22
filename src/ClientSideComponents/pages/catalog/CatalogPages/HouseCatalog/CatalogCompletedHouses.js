import React from 'react';
import axios from "axios";
import { Pagination } from "antd";

import { useDispatch, useSelector } from "react-redux";
import {setCompletedHouses, setCompletedProjects, setHouseHeartsArray, setHousesPage} from "../../../../redux/actions/houses";


import CompletedCard from "../../HouseCards/HouseCard/CompletedCard";
import CatalogHeader from "../../CatalogHeader/CatalogHeader";

import '../CatalogCompletedProjects.css';


function CatalogCompletedHouses() {
    const dispatch = useDispatch();
    const comphouses = useSelector(({houses}) => houses.comphouses);
    const house_heart_ids = useSelector(({ houses }) => houses.hearts_arr)
    const posts = useSelector(({houses}) => houses.postinfo)


    const handleChange = value => {
        axios.get('http://127.0.0.1:5000/house', {params: {pagination: true, page: value}, headers: {Authorization: posts}}).then(({data}) => {dispatch(setCompletedHouses(data))})
        dispatch(setHousesPage(value))
    };

    const onSelectCategory = React.useCallback((id) => {
        axios.post('http://127.0.0.1:5000/favorites', {
            id: id,
            category: 'house'
        }, {headers: {'Content-Type': 'application/json', Authorization: posts}})
    }, [])


    React.useEffect(() => {
        axios
            .get('http://127.0.0.1:5000/house',
                {params: {pagination: true, page: 1},
                    headers: {Authorization: posts}})
            .then(({data}) => {
                dispatch(setCompletedHouses(data))
            })

        axios
            .get('http://127.0.0.1:5000/favorites/main_page',
                {params: {category: 'house'},
                    headers: {Authorization: posts}})
            .then(({data}) => {
                dispatch(setHouseHeartsArray(data))
            })
    }, [])


    return (
        <div className="catalog">
            <CatalogHeader />
            <div className="cards-wrapper">
                {comphouses && house_heart_ids && comphouses.map((obj) =>
                    (<CompletedCard
                        onClickItem={onSelectCategory}
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