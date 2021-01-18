import React from 'react';
import classes from './MaterialBtn.module.css';
import Plus from '../../../../../../assets/img/Plus.svg'

function MaterialBtn(props) {
    return(
        <>
            <p className={classes.materialBtnP}>
                Выбрать материал
            </p>
            <button
                className={classes.materialBtn}
                onClick={props.showList}>
                <img src={Plus}/>
                {props.materialListVisiblity ? 'Закончить' : 'Выбрать материал'}
            </button>
        </>
    );
}
export {MaterialBtn};