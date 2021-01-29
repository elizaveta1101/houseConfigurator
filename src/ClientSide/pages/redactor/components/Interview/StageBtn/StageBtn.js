import React from 'react';
import classes from './StageBtn.module.css';

function NextStageBtn (props) {
    return (
        <button
            className={classes.nextStageBtn}
            disabled={props.disabled}
            onClick={props.onClick}
        >Далее</button>
    );
}

function PrevStageBtn (props) {
    return (
        <button
            className={classes.prevStageBtn}
            disabled={props.disabled}
            onClick={props.onClick}
        >Назад</button>
    );
}

export {NextStageBtn, PrevStageBtn};