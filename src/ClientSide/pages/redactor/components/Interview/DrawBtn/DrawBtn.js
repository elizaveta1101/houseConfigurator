import React from 'react';

import classes from './DrawBtn.module.css';

function DrawButtons (props) {
    return (
        <div className={classes.drawBtns}>
            <button 
                className={classes.drawBtn}
                disabled={props.editBtn.disabled}
                onClick={props.editBtnClicked}
            >
                {props.editBtn.clicked ? 'Закончить' : 'Редактировать'}
            </button>
            <button 
                className={classes.drawBtn}
                disabled={props.clearBtn.disabled}
                onClick={props.clearBtnClicked}
            >
                Очистить
            </button>
        </div>
    );
}

export {DrawButtons};