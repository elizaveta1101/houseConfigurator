import React from 'react';
import axios from "axios";
import {Pagination} from "antd";

import { useDispatch, useSelector } from "react-redux";
import {setInvestHeartsArray, setInvestorsHouses, setInvestPage} from "../../../../redux/actions/houses";


import InvestorsCard from "../../HouseCards/InvestorsCard/InvestorsCard";
import CatalogHeader from "../../CatalogHeader/CatalogHeader";

import '../CatalogCompletedProjects.css';



function CatalogInvestors() {

    const dispatch = useDispatch();
    const investorshouses = useSelector(({houses}) => houses.investorshouses);
    const heart_ids = useSelector(({ houses }) => houses.invest_hearts_arr)
    const posts = useSelector(({houses}) => houses.postinfo)


    const handleChange = value => {
        axios.get('http://127.0.0.1:5000/invest', {params: {pagination: true, page: value}, headers: {Authorization: posts}}).then(({data}) => {dispatch(setInvestorsHouses(data))})
        dispatch(setInvestPage(value))
    };

    const onSelectCategory = React.useCallback((id) => {
        axios.post('http://127.0.0.1:5000/favorites', {
            id: id,
            category: 'invest'
        }, {headers: {'Content-Type': 'application/json', Authorization: posts}})
    }, [])


    React.useEffect(() => {
        axios
            .get('http://127.0.0.1:5000/invest',
                {params: {pagination: true, page: 1},
                    headers: {Authorization: posts}})
            .then(({data}) => {
                dispatch(setInvestorsHouses(data))
            })

        axios
            .get('http://127.0.0.1:5000/favorites/main_page',
                {params: {category: 'invest'},
                    headers: {Authorization: posts}})
            .then(({data}) => {
                dispatch(setInvestHeartsArray(data))
            })
    }, [])

    return (
        <div className="catalog">
            <CatalogHeader />
            <div className="cards-wrapper">
                {investorshouses && heart_ids && investorshouses.map((obj) =>
                    (<InvestorsCard
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

export default CatalogInvestors;