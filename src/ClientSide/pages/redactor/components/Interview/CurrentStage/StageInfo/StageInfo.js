import React from 'react';
import appState from '../../../../js/appState.js';
import { DrawButtons } from '../../DrawBtn/DrawBtn.js';
import {MaterialBtn} from '../../MaterialBtn/MaterialBtn.js';
import classes from './StageInfo.module.css';

function StageHeading(props) {
    return (
        <h3 className={classes.heading}>
            {props.value}
        </h3>
    );
}

function StageDescription(props) {
    return (
        <div className={classes.description}>
            {props.value}
        </div>
    );
}

function StageFields(props) {
    let drawBtnVisibility = props.drawBtnVisibility,
        stageId = props.stageId;
    const fields = props.value;
    const fieldOnChange = props.onchange;
    const number = fields.length;
    const conditionObj = props.condition;
    let result;
    let condition;
    const elements = Array(number).fill(null).map((row, i) => {
        if (fields[i].show) {
            if (fields[i].fieldId.indexOf('Model')>-1) {     
                let modelType;      
                if (fields[i].label === 'Окно') {
                    modelType = 'window';
                } else if (fields[i].label === 'Дверь') {
                    modelType = 'door';
                } else if (fields[i].label === 'Лестница') {
                    modelType = 'stairs';
                }
                result=(
                    <button
                        className={classes.houseElements}
                    key={fields[i].fieldId + 'Btn'} 
                    onClick={() => appState.changeState('addModel', {modelType})}
                    >{fields[i].label}</button>
                );
            } else
            if (fields[i].fieldId.indexOf('Material')>-1) {
                result=(
                <MaterialBtn 
                    key={fields[i].fieldId + 'Btn'} 
                    showList={props.showList}
                    materialListVisiblity={props.materialListVisiblity}
                />);
            } else {
                if (conditionObj &&
                    conditionObj.fieldId === fields[i].fieldId &&
                    drawBtnVisibility
                ) {
                    condition = (<DrawButtons
                        action={stageId}
                        clearBtnClicked={props.clearBtnClicked}    
                        editBtnClicked={props.editBtnClicked}
                        editBtn={props.editBtn}
                        clearBtn={props.clearBtn}
                    />);
                } else {
                    condition = null
                }
                if (fields[i].type === 'text') {
                    result = (
                        <div className="field" key={fields[i].fieldId + i}>
                            <label className={classes.label}>{fields[i].label}
                                <input
                                    type='text'
                                    className='text'
                                    defaultValue={fields[i].value}
                                    name={fields[i].fieldId}
                                    key={fields[i].fieldId}
                                    onChange={fieldOnChange}
                                />
                            </label>
                            {condition}
                        </div>
                    );
                } else if (fields[i].type === 'select') {
                    const options = fields[i].options;
                    const numberOfOptions = options.length;
                    const selectOptions = Array(numberOfOptions).fill(null).map((row, j) =>
                        <option 
                            key={options[j] + j}
                        >
                            {options[j]}
                        </option>
                    );
                    result = (
                        <div className="field" key={fields[i].fieldId + 'select' + i}>
                            <label className={classes.label}>{fields[i].label}</label>
                            <select
                                defaultValue={fields[i].value}
                                className={classes.select}
                                name={fields[i].fieldId}
                                key={fields[i].fieldId}
                                onChange={fieldOnChange}
                            >
                                {selectOptions}
                            </select>
                            {condition}
                        </div>
                    );
                } else if (fields[i].type === 'radio' || fields[i].type === 'checkbox') {
                    const options = fields[i].options;
                    const numberOfOptions = options.length;
                    const radioOptions = Array(numberOfOptions).fill(null).map((row, j) =>
                        <div className="field" key={fields[i].fieldId + fields[i].type + j}>
                            <label className={classes.checkboxLabel}>
                                <input
                                    className={classes.checkbox}
                                    type={fields[i].type}
                                    name={fields[i].fieldId}
                                    value={options[j]}
                                    key={options[j] + j}
                                    onChange={fieldOnChange}
                                    checked={options[j] === fields[i].value}
                                />
                                {options[j]}
                            </label>
                        </div>
                    );
                    result = (
                        <div className='field' key={fields[i].fieldId + fields[i].type + 'Group'}>
                            <label className='label'>{fields[i].label}</label>
                            {radioOptions}
                            {condition}
                        </div>
                    );
                }
            }           
            return result;
        } else {return null;}
    });
    // if (typeof conditionObj !== 'boolean') {
    if (conditionObj === true) {
        condition = (
            <DrawButtons
                action={stageId}
                clearBtnClicked={props.clearBtnClicked}
                editBtnClicked={props.editBtnClicked}
                editBtn={props.editBtn}
                clearBtn={props.clearBtn}
            />);
    } else {
        condition = null;
    }
    return (
        <div className={classes.fields}>
            {elements}
            {condition}
        </div>
    );

}



export { StageHeading, StageDescription, StageFields };