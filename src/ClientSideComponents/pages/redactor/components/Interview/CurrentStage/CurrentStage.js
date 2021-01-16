import React from 'react';
import { StageHeading, StageDescription, StageFields } from './StageInfo/StageInfo.js';
import classes from './CurrentStage.module.css';

function CurrentStage(props) {
    let currentStage = props.stageInfo;
    return (
        <div className={classes.currentStage}>
            <StageHeading
                value={currentStage.heading}
            />
            <hr />
            <StageDescription
                value={currentStage.description}
            />
            <StageFields
                stageId={currentStage.id}
                value={currentStage.fields}
                condition={currentStage.condition}
                clearBtnClicked={props.clearBtnClicked}            
                editBtnClicked={props.editBtnClicked}
                editBtn={props.editBtn}
                clearBtn={props.clearBtn}
                onchange={props.onchange}
                drawBtnVisibility = {props.drawBtnVisibility}
                showList={props.showList}
                materialListVisiblity={props.materialListVisiblity}
            />
        </div>
    );
}

export { CurrentStage };