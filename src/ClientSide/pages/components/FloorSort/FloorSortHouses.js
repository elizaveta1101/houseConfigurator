import React from 'react';

import {useSelector} from "react-redux";

import '../../catalog/CatalogHeader/CatalogHeader.css';


let indices = [];

const FloorSortHouses = React.memo(function FloorSortHouses({items, onClickItem}) {
    const [activeOneFloor, setActiveOneFloor] = React.useState(false);
    const [activeTwoFloor, setActiveTwoFloor] = React.useState(false);
    const [activeThreeFloor, setActiveThreeFloor] = React.useState(false);
    const [activeMansard, setActiveMansard] = React.useState(false);
    const category = useSelector(({filters}) => filters.categoryHouses);

    if(category.includes(1)){
        if(!activeOneFloor){
            setActiveOneFloor(!activeOneFloor);
        }
    }
    if(category.includes(2)){
        if(!activeTwoFloor){
            setActiveTwoFloor(!activeTwoFloor);
        }
    }
    if(category.includes(3)){
        if(!activeThreeFloor){
            setActiveThreeFloor(!activeThreeFloor);
        }
    }
    if(category.includes(4)){
        if(!activeMansard){
            setActiveMansard(!activeMansard);
        }
    }


    const floorsSelected = (index) => {
        if(index === 1){
            setActiveOneFloor(!activeOneFloor);
        }
        if(index === 2){
            setActiveTwoFloor(!activeTwoFloor);
        }
        if(index === 3){
            setActiveThreeFloor(!activeThreeFloor);
        }
        if(index === 4){
            setActiveMansard(!activeMansard);
        }

        if(indices.includes(index)){
            const arrIndex = indices.indexOf(index)
            indices.splice(arrIndex, 1)
        }
        else{
            indices.push(index)
        }

        onClickItem(indices)
    }

    return (
        <div className="floors">
            <h1>Этажность</h1>
            <div className="floor-nums">
                <div onClick={() => floorsSelected(1)} className={activeOneFloor === true ? 'floor-num__active' : 'floor-num'} key={`${0}`}>
                    <p>{items[0]}</p>
                </div>
                <div onClick={() => floorsSelected(2)} className={activeTwoFloor === true ? 'floor-num__active' : 'floor-num'} key={`${1}`}>
                    <p>{items[1]}</p>
                </div>
                <div onClick={() => floorsSelected(3)} className={activeThreeFloor === true ? 'third-floor-num__active' : 'floor-num third-floor-num'} key={`${2}`}>
                    <p>{items[2]}</p>
                </div>
                <div onClick={() => floorsSelected(4)} className={activeMansard === true ? 'mansard__active' : 'floor-num mansard'} key={`${3}`}>
                    <p>{items[3]}</p>
                </div>
            </div>
        </div>
    );
})

export default FloorSortHouses;
