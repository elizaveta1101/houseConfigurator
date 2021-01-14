import React from 'react';
import appState from '../../js/appState.js';
import classes from './TotalData.module.css';

function TotalData() {
    return (
        <div className={classes.totalData}>
            <div className={classes.price}>
                <span>Стоимость: </span>{appState.housePrice} рублей
            </div>
            <div className={classes.time}>
                <span>Сроки: </span>{appState.houseTime} дней
            </div>
        </div>
    )
}
export {TotalData};