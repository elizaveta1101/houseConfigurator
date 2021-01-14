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
import {getCoord} from '../../../js/mouseFunctions/mouseFunctions.js'

import classes from './Canvas.module.css';

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
            }
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
        labelRenderer.addEventListener('touchstart', this.handleMouseDown);
        labelRenderer.addEventListener('touchend', this.handleMouseUp);
        labelRenderer.addEventListener('touchmove', this.handleMove);
    }

    handleMouseDown(e) {
        e.preventDefault();
        if (e.button === 0 || (e.touches && e.touches.length === 1)) {      // клик левой кнопкой мыши
            let sceneGroupPoints = appState.house.points;
            // let linePointsCoords = canvasClick(appState.sceneCamera, this.state.linePoints, e);
            if (this.props.editMode === 'add') {
                let mousePosition = getCoord(e, appState.sceneCamera);
                let basementVertices = appState.house.basement.vertices.slice();
                basementVertices.push(...mousePosition);
                // this.setState({
                //     linePoints: linePointsCoords
                // });
                appState.house.setBasementParametrs(basementVertices);
                appState.changeState('pointAdded', { vertices: basementVertices });
            } else if (this.props.editMode === 'edit') {
                let pickPosition = setPickPosition(e, appState.renderer);

                let picked = pick(pickPosition, sceneGroupPoints, appState.sceneCamera);
                if (picked) {
                    let pointPos = picked.position;
                    let index = searchPointIndex(appState.house.basement, pointPos);

                    if (index !== -1) {
                        picked.object.material.color.set(0xFF0000);
                        this.setState({
                            pickPoint: {
                                position: pointPos,
                                index: index
                            }
                        });
                    }
                }
            }
        } // else if (e.button === 2 || (e.touches && e.touches.length === 2)) {      // клик правой кнопкой мыши
        //     let linePointsCoords = this.state.linePoints.slice();
        //     if (this.props.editMode === 'add') {
        //         linePointsCoords.push(linePointsCoords[0], linePointsCoords[1], linePointsCoords[2]);
        //         appState.house.setBasementParametrs(linePointsCoords);
        //         this.setState({
        //             linePoints: []
        //         });
        //         this.props.endAddVertices();
        //     }
        // }
    }

    handleMove(e) {
        e.preventDefault();
        // let linePointsCoords = canvasMove(appState.sceneCamera, this.state.linePoints, e);
        let mousePosition = getCoord(e, appState.sceneCamera);
        if (this.props.editMode === 'add') {
            // if (this.state.linePoints.length > 0) {
                
                // linePointsCoords.push(linePointsCoords[0], linePointsCoords[1], linePointsCoords[2]);
                // appState.house.setBasementParametrs(linePointsCoords);
                appState.changeState('pointAdding', { mousePosition });

            // }
        }
        if (this.props.editMode === 'edit') {

            if (this.state.pickPoint.index !== -1) {
                changeObjCoord(appState.house.basement, this.state.pickPoint.index, mousePosition);
                let index = this.state.pickPoint.index;
                appState.changeState('basementChanged', { index });
            }
        }
    }

    handleMouseUp (e) {
        e.preventDefault();
        if (e.button === 0 || (e.touches && e.touches.length === 1)) {
            if (this.props.editMode === 'edit') {
                let index = this.state.pickPoint.index;
                if( index !== -1) {
                    appState.changeState('basementChangeEnd', { index });
                    appState.house.points.children[index/3].material.color.set(0x000000);
                }
                this.setState({
                    pickPoint: {
                        position: [],
                        index: -1
                    }
                });
            }
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