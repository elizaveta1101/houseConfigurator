import React from 'react';
import initScene from '../../../js/threeJsFunctions/initScene.js';
// import drawHouse from '../../js/threeJsFunctions/drawHouse.js';
import canvasClick from '../../../js/mouseFunctions/canvasClick.js';
import canvasMove from '../../../js/mouseFunctions/canvasMove.js';
import {setPickPosition} from '../../../js/mouseFunctions/mouseFunctions.js';
import pick from '../../../js/mouseFunctions/pickHelper.js'
import searchPointIndex from '../../../js/mouseFunctions/searchPointIndex.js';
import {changeObjCoord} from '../../../js/mouseFunctions/changeObjCoord.js';
import appState, {} from '../../../js/appState.js';
import {getCoord, chooseMouseFunction} from '../../../js/mouseFunctions/mouseFunctions.js'

import classes from './Canvas.module.css';
import stages from '../../../js/stagesStructure.js';

class Canvas extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            objectsCount: 0,
            mount: false,
            linePoints: [],
            pickPoint: {
                position: [],
                index: -1
            },
            continueCreation: false,
            curveNumber: 0
        }

        this.handleMove = this.handleMove.bind(this);
        this.handleMouseDown = this.handleMouseDown.bind(this);
        this.handleMouseUp = this.handleMouseUp.bind(this);
    }

    componentDidMount() {
        initScene();    //инициализация сцены
        this.setState({
            objectsCount: appState.scene.children.length,
            mount: true
        });

        let labelRenderer = document.getElementById('labelRenderer');
        labelRenderer.addEventListener('pointerdown', this.handleMouseDown);
        labelRenderer.addEventListener('pointerup', this.handleMouseUp);
        labelRenderer.addEventListener('pointermove', this.handleMove);
        //----нужны ли????------
        // labelRenderer.addEventListener('touchstart', this.handleMouseDown);
        // labelRenderer.addEventListener('touchend', this.handleMouseUp);
        // labelRenderer.addEventListener('touchmove', this.handleMove);
    }

    handleMouseDown(e) {
        const stageName = stages[this.props.stageId].name;
        let data = chooseMouseFunction(e,
                            appState.editMode, 
                            'down', 
                            {
                                position: this.state.pickPoint.position,
                                index: this.state.pickPoint.index,
                                continueCreation: this.state.continueCreation, 
                                curveNumber: this.state.curveNumber,
                                stageName: stageName
                            }
                        );
        if (data) {
            if (data.continueCreation !== undefined) {
                this.setState({
                    continueCreation: data.continueCreation,
                    curveNumber: data.curveNumber
                });  
            }
            if (data.position) {
                this.setState({
                    pickPoint: {
                        position: data.position,
                        index: data.index
                    }
                });
            }
            if (data.curveNumber !== undefined) {
                this.setState({
                    curveNumber: data.curveNumber
                });
            }
        }
    }

    handleMove(e) {

        const stageName = stages[this.props.stageId].name;
        chooseMouseFunction(e, 
                            appState.editMode, 
                            'move', 
                            {
                                position: this.state.pickPoint.position,
                                index: this.state.pickPoint.index,
                                continueCreation: this.state.continueCreation, 
                                curveNumber: this.state.curveNumber,
                                stageName: stageName
                            }
                        );
    
    }

    handleMouseUp (e) {
        const stageName = stages[this.props.stageId].name;
        let data = chooseMouseFunction(e, 
                            appState.editMode, 
                            'up', 
                            {
                                position: this.state.pickPoint.position,
                                index: this.state.pickPoint.index,
                                continueCreation: this.state.continueCreation, 
                                curveNumber: this.state.curveNumber,
                                stageName: stageName
                            }
        );
        if (data) {
            this.setState({
                pickPoint: {
                    position: data.position,
                    index: data.index
                }
            });
        }
    }
    render() {
        return (
            <canvas
                className={classes.canvas}
                draggable='true'
            ></canvas>
        );
    }
}

export { Canvas };