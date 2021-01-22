import React from 'react';
import axios from "axios"
import { Pagination } from 'antd';

import {setCompletedProjects, setHeartsArray} from "../../../../redux/actions/houses";
import {useDispatch, useSelector} from 'react-redux'

import HouseCard from "../../HouseCards/ProjectCard/HouseCard";
import CatalogHeader from "../../CatalogHeader/CatalogHeader";

import '../CatalogCompletedProjects.css';




function CatalogCompletedProjects() {
    const dispatch = useDispatch();
    const compprojects = useSelector(({houses}) => houses.compprojects)
    const heart_ids = useSelector(({ houses }) => houses.hearts_arr)
    const posts = useSelector(({houses}) => houses.postinfo)
    const projectPageId = useSelector(({ houses }) => houses.projects_page_id)
    const categorySelected = useSelector(({ filters }) => filters.category)
    const cost = useSelector(({filters}) => filters.costArr);
    const square = useSelector(({filters}) => filters.squareArr);

    const handleChange = (value) => {
        if(categorySelected.length === 0) {
            axios.get('http://127.0.0.1:5000/project',
                {
                    params: {pagination: true, page: value},
                    headers: {Authorization: posts}
                })
                .then(({data}) => {
                    dispatch(setCompletedProjects(data))
                })
        }
        if(categorySelected.length !== 0){
            axios.get('http://127.0.0.1:5000/project', {params: {pagination: true, page: 1, cost_filter: cost, square_filter: square}, headers: {Authorization: posts}}).then(({data}) => {dispatch(setCompletedProjects(data))})
        }
    };

    const onSelectCategory = React.useCallback((id) => {
        axios.post('http://127.0.0.1:5000/favorites', {
            id: id,
            category: 'project'
        }, {headers: {'Content-Type': 'application/json', Authorization: posts}})
    }, [])

    React.useEffect(() => {
        axios
            .get('http://127.0.0.1:5000/project',
                {params: {pagination: true, page: 1},
                    headers: {Authorization: posts}})
            .then(({data}) => {
                dispatch(setCompletedProjects(data))
            })

        if(posts !== ''){
            axios
                .get('http://127.0.0.1:5000/favorites/main_page',
                    {params: {category: 'project'},
                        headers: {Authorization: posts}})
                .then(({data}) => {
                    dispatch(setHeartsArray(data))
                })
        }
    }, [])


    return (
        <div className="catalog">
            <CatalogHeader />
            <div className="cards-wrapper">
                    {compprojects && heart_ids && compprojects.map((obj) =>
                        (<HouseCard
                            onClickItem={onSelectCategory}
                            key={obj.id}
                            {...obj}/>))
                    }
            </div>
            <div className="pages">
                <Pagination
                    simple
                    defaultCurrent={projectPageId}
                    defaultPageSize={9}
                    total={12}
                    onChange={handleChange}
                />
            </div>
        </div>
    );
}

export default CatalogCompletedProjects;
