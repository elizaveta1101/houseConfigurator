import React from 'react';
import axios from "axios"
import { Pagination } from 'antd';

import { setCompletedProjects, setHeartsArray } from "../../../../redux/actions/houses";
import {useDispatch, useSelector} from 'react-redux'
import { setCurrentPage } from "../../../../redux/actions/filters";

import HouseCard from "../../HouseCards/ProjectCard/HouseCard";
import CatalogHeader from "../../CatalogHeader/CatalogHeader";

import '../CatalogCompletedProjects.css';


function CatalogCompletedProjects() {
    const dispatch = useDispatch();
    const compprojects = useSelector(({houses}) => houses.compprojects)
    const heart_ids = useSelector(({ houses }) => houses.hearts_arr)
    const posts = useSelector(({houses}) => houses.postinfo)
    const categorySelected = useSelector(({ filters }) => filters.category)
    const cost = useSelector(({houses}) => houses.costArr);
    const square = useSelector(({houses}) => houses.squareArr);
    const currentPage = useSelector(({filters}) => filters.currentPage)
    const totalCount = useSelector(({ houses }) => houses.totalCountProjects)


    const onSelectHeart = React.useCallback((id) => {
        if(posts !== ''){
            axios.post('http://127.0.0.1:5000/favorites', {
                id: id,
                category: 'project'
            }, {headers: {'Content-Type': 'application/json', Authorization: posts}})
        }
    }, [])

    const handleChange = (value) => {
        dispatch(setCurrentPage(value))
    };

    React.useEffect(() => {
        let stringedFloors = categorySelected.join()

        if(cost === '' || square === ''){
            axios.get('http://127.0.0.1:5000/project', {
                params: {
                    pagination: true,
                    page: currentPage,
                }, headers: {Authorization: posts}
            }).then(({data}) => {
                dispatch(setCompletedProjects(data))
            })
        }
        else if(stringedFloors === ''){
            axios.get('http://127.0.0.1:5000/project', {
                params: {
                    pagination: true,
                    page: currentPage,
                    cost_filter: cost,
                    square_filter: square
                }, headers: {Authorization: posts}
            }).then(({data}) => {
                dispatch(setCompletedProjects(data))
            })
        }
        else {
            axios.get('http://127.0.0.1:5000/project', {
                params: {
                    pagination: true,
                    page: currentPage,
                    floor_filter: stringedFloors,
                    cost_filter: cost,
                    square_filter: square
                }, headers: {Authorization: posts}
            }).then(({data}) => {
                dispatch(setCompletedProjects(data))
            })
        }

        if(posts !== ''){
            axios
                .get('http://127.0.0.1:5000/favorites/main_page',
                    {params: {category: 'project'},
                        headers: {Authorization: posts}})
                .then(({data}) => {
                    dispatch(setHeartsArray(data))
                })
        }

    }, [currentPage])


    return (
        <div className="catalog">
            {cost !== '' && square !== '' && <CatalogHeader/>}
            <div className="cards-wrapper">
                    {compprojects && heart_ids && compprojects.map((obj) =>
                        (<HouseCard
                            onClickItem={onSelectHeart}
                            key={obj.id}
                            {...obj}/>))
                    }
            </div>
            <div className="pages">
                {totalCount !== 0 &&<Pagination
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

export default CatalogCompletedProjects;
