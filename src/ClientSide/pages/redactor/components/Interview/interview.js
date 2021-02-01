import React from 'react';
import {CurrentStage} from './CurrentStage/CurrentStage.js';
import {NextStageBtn, PrevStageBtn} from './StageBtn/StageBtn.js';
import classes from './Interview.module.css';

function Interview (props) {
    return (
        // <div className={classes.interviewdiv}>
            <div className={classes.interview}>
                <CurrentStage
                    stageInfo={props.stageInfo}
                    onchange={props.onchange}
                    drawBtnVisibility = {props.drawBtnVisibility}
                    clearBtnClicked={props.clearBtnClicked}
                    editBtnClicked={props.editBtnClicked}
                    editBtn={props.editBtn}
                    clearBtn={props.clearBtn}
                    showList={props.showList}
                    materialListVisiblity={props.materialListVisiblity}
                />
                <PrevStageBtn
                    disabled={props.prevDisabled}
                    onClick={props.prevOnClick}
                />
                <NextStageBtn
                    disabled={props.nextDisabled}
                    onClick={props.nextOnClick}
                />
            </div>
        // </div>
    );
}

export {Interview};
