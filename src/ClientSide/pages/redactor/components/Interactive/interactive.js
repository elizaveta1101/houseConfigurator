import React from 'react';
import {ViewButtons} from './ViewBtn/ViewBtn.js';
import {Canvas} from './Canvas/Canvas.js';
import {SettingsBtn} from './SettingsBtn/SettingsBtn.js';

import classes from './Interactive.module.css';

function Interactive(props) {
    return (
        <div className={classes.interactive}>
            <Canvas 
                stageId={props.stageId}
                viewMode={props.viewMode}
                editMode={props.editMode}
                endAddVertices={props.endAddVertices}
            />
            <ViewButtons
                onClick2d={props.handleClick2d}
                onClick3d={props.handleClick3d}
                viewBtnsDisable={props.viewBtnsDisable}
            />
            <SettingsBtn />
        </div>
    );
}

export {Interactive};