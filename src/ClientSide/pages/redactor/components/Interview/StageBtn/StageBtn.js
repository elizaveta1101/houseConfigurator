import React from 'react';
import classes from './StageBtn.module.css';

function NextStageBtn (props) {
    return (
        <>
        {props.disabled ?
            <button
                className={classes.nextStageBtnDisabled}
                disabled={props.disabled}
                onClick={props.onClick}>Далее
            </button> :
            <button
                className={classes.nextStageBtn}
                disabled={props.disabled}
                onClick={props.onClick}>Далее
            </button>
        }
        </>
    );
}

function PrevStageBtn (props) {
    return (
        <>
            {props.disabled ?
                <button
                    className={classes.prevStageBtnDisabled}
                    disabled={props.disabled}
                    onClick={props.onClick}>Назад
                </button> :
                <button
                    className={classes.prevStageBtn}
                    disabled={props.disabled}
                    onClick={props.onClick}>Назад
                </button>
            }
            </>
    );
}

export {NextStageBtn, PrevStageBtn};