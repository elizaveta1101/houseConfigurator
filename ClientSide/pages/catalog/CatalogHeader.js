import React from 'react';
import './CatalogHeader.css';
import {Link, useLocation} from 'react-router-dom'
import classNames from 'class-names'
import FloorSort from "../components/FloorSort";
import {setCategory, setCostProjects} from '../../redux/actions/filters'
import {useDispatch, useSelector} from "react-redux";
import CostSlider from "../components/CostSlider";
import SquareSlider from "../components/SquareSlider";
import axios from "axios";
import {setCompletedHouses, setCompletedProjects, setInvestorsHouses} from "../../redux/actions/houses";


const floors = ['1', '2', '3+', 'С мансардой'];


function CatalogHeader(){
        const completedProjectsActive = useLocation().pathname !== '/catalog';
        const completedHousesActive = useLocation().pathname !== '/catalog_comp_houses';
        const investorsHousesActive = useLocation().pathname !== '/catalog_investors_houses';

        const dispatch = useDispatch();

        const onSelectCategory = React.useCallback((index) => {
            dispatch(setCategory(index))
        }, [])

        const posts = useSelector(({houses}) => houses.postinfo)
        const category = useSelector(({filters}) => filters.category);
        const cost = useSelector(({filters}) => filters.costArr);
        const square = useSelector(({filters}) => filters.squareArr);

        const GetSorted = () => {
            let stringed = category.join()

            if(stringed === ''){
                axios.get('http://127.0.0.1:5000/project', {params: {pagination: true, page: 1, cost_filter: cost, square_filter: square}, headers: {Authorization: posts}}).then(({data}) => {dispatch(setCompletedProjects(data))})
                axios.get('http://127.0.0.1:5000/house', {params: {pagination: true, page: 1, cost_filter: cost, square_filter: square}, headers: {Authorization: posts}}).then(({data}) => {dispatch(setCompletedHouses(data))})
                axios.get('http://127.0.0.1:5000/invest', {params: {pagination: true, page: 1, cost_filter: cost, square_filter: square}, headers: {Authorization: posts}}).then(({data}) => {dispatch(setInvestorsHouses(data))})
            }
            else{
                axios.get('http://127.0.0.1:5000/project', {params: {pagination: true, page: 1, floor_filter: stringed, cost_filter: cost, square_filter: square}, headers: {Authorization: posts}}).then(({data}) => {dispatch(setCompletedProjects(data))})
                axios.get('http://127.0.0.1:5000/house', {params: {pagination: true, page: 1, floor_filter: stringed, cost_filter: cost, square_filter: square}, headers: {Authorization: posts}}).then(({data}) => {dispatch(setCompletedHouses(data))})
                axios.get('http://127.0.0.1:5000/invest', {params: {pagination: true, page: 1, floor_filter: stringed, cost_filter: cost, square_filter: square}, headers: {Authorization: posts}}).then(({data}) => {dispatch(setInvestorsHouses(data))})
            }
        }

        return (
            <>
                <div className="catalog-header-wrapper">
                    <div className="choose-catalog">
                        <h1>Выбор каталога</h1>
                        <div className="choose-catalog__buttons" >
                            <Link to="/catalog"><div className={classNames('completed-projects', 'catalog-header__active' , {'catalog-header__active-active': !completedProjectsActive})}>
                               <p>Готовые проекты</p>
                            </div></Link>
                            <Link to="/catalog_comp_houses"><div className={classNames('completed-homes', 'catalog-header__active' , {'catalog-header__active-active': !completedHousesActive})}>
                                <p>Готовые дома</p>
                            </div></Link>
                            <Link to="/catalog_investors_houses"><div className={classNames('for-investors', 'catalog-header__active' , {'catalog-header__active-active': !investorsHousesActive})}>
                                <p>Инвесторам</p>
                            </div></Link>
                        </div>
                    </div>

                    <div className="sorter-inputs">
                        <div className="project-value">
                            <CostSlider symbol={'₽'}/>
                        </div>
                        <div className="house-area">
                            <SquareSlider symbol={'кв м'} />
                        </div>
                    </div>

                    <FloorSort onClickItem={onSelectCategory} items={floors}/>

                    <div className="find-project">
                        <button onClick={GetSorted} type="submit">Найти проект</button>
                    </div>

                    <div className="more-parameters">
                        <p>
                            <svg width="14" height="8" viewBox="0 0 14 8" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M1 1L7 7L13 1" stroke="#444444" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                            </svg>
                            Больше параметров
                        </p>
                    </div>
                </div>
            </>
        );
}

export default CatalogHeader;
