import React from 'react';
import axios from "axios"
import { Pagination } from 'antd';

import {addHeartId, setCompletedProjects, setProjectsPage} from "../../../redux/actions/houses";
import {addHouseToCart} from "../../../redux/actions/cart";
import {useDispatch, useSelector} from 'react-redux'

import HouseCard from "../HouseCards/ProjectCard/HouseCard";
import CatalogHeader from "../CatalogHeader";

import './CatalogCompletedProjects.css';


let heart_indices = [];

function CatalogCompletedProjects() {

    const dispatch = useDispatch();
    const compprojects = useSelector(({houses}) => houses.compprojects)
    const posts = useSelector(({houses}) => houses.postinfo)

    const handleAddHouseToCart = (obj) => {
        dispatch(addHouseToCart(obj))

        if(!heart_indices.includes(obj.id)){
            heart_indices.push(obj.id)
        }
        else{
            const arrIndex = heart_indices.indexOf(obj.id)
            heart_indices.splice(arrIndex, 1)
        }
        console.log(heart_indices)
        dispatch(addHeartId(heart_indices))
    }

    const handleChange = value => {
        axios.get('http://127.0.0.1:5000/project', {params: {pagination: true, page: value}, headers: {Authorization: posts}}).then(({data}) => {dispatch(setCompletedProjects(data))})
        dispatch(setProjectsPage(value))
    };

    React.useEffect(() => {
        async function FetchPosts(){
            await axios.get('http://127.0.0.1:5000/project', {params: {pagination: true, page: 1}, headers: {Authorization: posts}}).then(({data}) => {dispatch(setCompletedProjects(data))})
        }
        FetchPosts()
    },[])

    return (
        <div className="catalog">
            <CatalogHeader />
            <div className="cards-wrapper">
                    {compprojects && compprojects.map((obj) =>
                        (<HouseCard
                            onClickAddHouse={handleAddHouseToCart}
                            key={obj.id}
                            {...obj}/>))
                    }
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

export default CatalogCompletedProjects;
