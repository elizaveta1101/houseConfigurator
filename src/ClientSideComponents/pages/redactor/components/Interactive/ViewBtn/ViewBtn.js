import React from 'react';
import classes from './ViewBtn.module.css';

function ViewButtons (props) {
    return (
        <div 
            className={classes.viewBtns}
            hidden={props.viewBtnsDisable}    
        >
            <button 
                className={classes.viewBtn + " view2d"}
                onClick={props.onClick2d}
            >
                2D
            </button>
            <button
                className={classes.viewBtn + " view3d"} //"viewBtn view3d"
                onClick={props.onClick3d}    
            >
                3D
            </button>
        </div>
    );
}

export {ViewButtons};
