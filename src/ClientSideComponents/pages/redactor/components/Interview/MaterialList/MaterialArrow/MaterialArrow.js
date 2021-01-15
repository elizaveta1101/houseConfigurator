import React from 'react';
import classes from './MaterialArrow.module.css';

function NextMaterial (props) {
    return (
        <button
            className={classes.next}
            disabled={props.disabled}
            onClick={props.onClick}
        > {'>'} </button>
    );
}

function PrevMaterial (props) {
    return (
        <button
            className={classes.prev}
            disabled={props.disabled}
            onClick={props.onClick}
        > {'<'} </button>
    );
}

export {NextMaterial, PrevMaterial};