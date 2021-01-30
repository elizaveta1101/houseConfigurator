import React from 'react';
import classNames from 'class-names'
import axios from "axios";
import FloorSortHouses from "../../components/FloorSort/FloorSortHouses";

import { Link, useLocation } from 'react-router-dom'
import { setCategoryHouses, setCurrentPage } from '../../../redux/actions/filters'
import { useDispatch, useSelector } from "react-redux";
import { setCompletedHouses } from "../../../redux/actions/houses";

import {catalogHouses, catalogInvests, catalogProjects, HostURL} from "../../../data/constants";
import HousesCostSlider from "../../components/CostSlider/HousesCostSlider";
import HousesSquareSlider from "../../components/SquareSlider/HousesSquareSlider";

import './CatalogHeader.css';

const floors = ['1', '2', '3+', 'С мансардой'];

function CatalogHousesHeader({page}){
    const completedProjectsActive = useLocation().pathname !== catalogProjects;
    const completedHousesActive = useLocation().pathname !== catalogHouses;
    const investorsHousesActive = useLocation().pathname !== catalogInvests;
    const posts = useSelector(({houses}) => houses.postinfo)
    const category = useSelector(({filters}) => filters.categoryHouses);
    const cost = useSelector(({houses}) => houses.costArrHouses);
    const square = useSelector(({houses}) => houses.squareArrHouses);
    const dispatch = useDispatch();

    const GetSorted = () => {
        let stringed = category.join()

        if(stringed === '') {
            axios.get(`${HostURL}house`, {
                params: {
                    pagination: true,
                    page: 1,
                    cost_filter: cost,
                    square_filter: square
                }, headers: {Authorization: posts}
            }).then(({data}) => {
                dispatch(setCompletedHouses(data))
            })
        }
        else {
            axios.get(`${HostURL}house`, {
                params: {
                    pagination: true,
                    page: 1,
                    floor_filter: stringed,
                    cost_filter: cost,
                    square_filter: square
                }, headers: {Authorization: posts}
            }).then(({data}) => {
                dispatch(setCompletedHouses(data))
            })
        }
        dispatch(setCurrentPage(1))
    }

    const onSelectCategory = React.useCallback((index) => {
        dispatch(setCategoryHouses(index))
    }, [])

    return (
        <>
            <div className="catalog-header-wrapper">
                <div className="choose-catalog">
                    <h1>Выбор каталога</h1>
                    <div className="choose-catalog__buttons" >
                        <Link to={catalogProjects}><div className={classNames('completed-projects', 'catalog-header__active' , {'catalog-header__active-active': !completedProjectsActive})}>
                            <p>Готовые проекты</p>
                        </div></Link>
                        <Link to={catalogHouses}><div className={classNames('completed-homes', 'catalog-header__active' , {'catalog-header__active-active': !completedHousesActive})}>
                            <p>Готовые дома</p>
                        </div></Link>
                        <Link to={catalogInvests}><div className={classNames('for-investors', 'catalog-header__active' , {'catalog-header__active-active': !investorsHousesActive})}>
                            <p>Инвесторам</p>
                        </div></Link>
                    </div>
                </div>

                <div className="sorter-inputs">
                    <div className="project-value">
                        <HousesCostSlider symbol={'₽'}/>
                    </div>
                    <div className="house-area">
                        <HousesSquareSlider symbol={'кв м'} />
                    </div>
                </div>

                <FloorSortHouses onClickItem={onSelectCategory} items={floors}/>

                <div className="find-project">
                    <button onClick={GetSorted} type="submit">Найти проект</button>
                </div>

                <div className="more-parameters">
                    <p>
                        <svg width="14" height="8" viewBox="0 0 14 8" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M1 1L7 7L13 1" stroke="#444444" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                        Больше параметров
                    </p>
                </div>
            </div>
        </>
    );
}

export default CatalogHousesHeader;
