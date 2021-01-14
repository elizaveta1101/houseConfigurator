import sceneObject from './sceneObject.js';
import stages from './stagesStructure.js';
import basementShapes from './basementDrafts.js';
import {convertToCoor} from './extraFunctions.js';
import { concreteTexture } from '../assets/Textures/textureLoader.js';
import appState from './appState.js';
import { drawObject, drawLine, drawDot } from './threeJsFunctions/drawFunctions.js';
import * as THREE from 'three';
import { createDimensions, removeDimensions } from './threeJsFunctions/dimensions.js';
import { redrawObject } from './threeJsFunctions/redrawObject.js';
import eventEmitter from './eventEmitter.js';
import getVectors from './threeJsFunctions/getVectors.js';

import {loadTexture} from '../assets/Textures/textureLoader.js';
import houseTextures from '../assets/Textures/houseTextures.js';
import {calcTextureCoord} from './threeJsFunctions/calcTextureCoord.js';


class HouseObject {
    constructor() {
        this.basement = new sceneObject();
        this.outerWalls = new sceneObject();
        this.ceiling = new sceneObject();
        this.roomWalls = {}; //будет заполняться объектами sceneObject (одна линия - один объект)
        this.floors = 1;
        this.houseInScene = undefined;
        this.plan = undefined;
        this.points = undefined;
        this.floorsModels = [];
    }
    setAllParametrs() {
        this.setBasementParametrs();
        this.setOuterWallsParametrs();
        this.setCeilingParametrs();
        this.setFloorsParametr();
    }
    setBasementParametrs(verticesCoords) {
        let basement = this.basement;

        let basementStage = stages.filter((el) => el.name === 'basement')[0];

        let basementShapeSelect = basementStage.fields.filter((el) => el.fieldId === 'basementShape')[0];
        if (Number(basementShapeSelect.value) <= basementShapes.length) {
            basement.vertices = [...basementShapes.filter((el, i) => i === basementShapeSelect.value - 1)[0]];
        } else {
            let vertCoord = verticesCoords;
            if(typeof vertCoord == "undefined") {vertCoord = basement.vertices;}
            basement.vertices = vertCoord;
        }

        let basementHeight = basementStage.fields.filter((el) => el.fieldId === 'basementHeight')[0].value;
        basement.height = convertToCoor(Number(basementHeight));

        basement.getUpVertices();
        basement.color = '';
        basement.texCoord = [];
        basement.texture = loadTexture(houseTextures.getTexture('basement'));
        basement.textureSize = houseTextures.getTextureSize('basement');    //задание размера текстуры
    }

    setOuterWallsParametrs(){
        let outerWalls = this.outerWalls;
        let outerWallsStage = stages.filter((el) => el.name === 'outerWalls')[0];

        outerWalls.vertices = this.basement.vertices;
         
        let outerWallsHeight = outerWallsStage.fields.filter((el) => el.fieldId === 'wallHeight')[0].value;
        // outerWalls.height = convertToCoor(Number(outerWallsHeight));
        outerWalls.height=3;

        outerWalls.width = 0.25;
        outerWalls.getInnerVertices();
        outerWalls.getUpVertices();

        outerWalls.color=''; //0xFF0000
        outerWalls.texCoord=[];
        outerWalls.texture = loadTexture(houseTextures.getTexture('outerWalls'));
        outerWalls.textureSize = houseTextures.getTextureSize('outerWalls');;

        outerWalls.translation=[0,0,this.basement.height];
    }

    setCeilingParametrs(){
        let ceiling = this.ceiling;
        ceiling.vertices = this.basement.vertices;
        ceiling.getUpVertices();
        ceiling.height = this.outerWalls.height * 0.15;
        ceiling.color=''; //0xFF0000
        ceiling.texCoord=[];
        ceiling.texture = loadTexture(houseTextures.getTexture('basement'));
        ceiling.textureSize = houseTextures.getTextureSize('basement');    //задание размера текстуры
        // ceiling.texture = loadTexture(houseTextures.getTexture('outerWalls'));
        // ceiling.textureSize = houseTextures.getTextureSize('outerWalls');
        ceiling.translation=[0,0,this.basement.height+this.outerWalls.height];
    }

    setFloorsParametr(){
        let floorsStage = stages.filter((el) => el.name === 'floors')[0];
        let floorsSelect = floorsStage.fields.filter((el) => el.fieldId === 'floors')[0];

        this.floors = Number(floorsSelect.value);
    }

    dislpayConsoleHouse(){
        console.log(this);
    }

    build() {

        this.setAllParametrs();
        let group = new THREE.Group();
        let vertices = this.basement.vertices;
        this.plan = drawLine(vertices);
        if (this.basement.innerVertices) {
            let basementInner = drawLine(this.basement.innerVertices);
            // group.add( basementInner );
        }
        group.add( this.plan );
        
        this.plan.visible = false;

        this.points = makePointsGroup( vertices );
        this.points.visible = false;
        this.plan.add( this.points );

        // if(this.plan.visible) putDimensions( this.plan, vertices );

        const stagesModels = buildStages( this );
        stagesModels.map( model => {
            this[model.name] = model;
            group.add(model);
        } )

        group.name = 'house';
        this.houseInScene = group;
    }

    reDrawPlan( data ) {
        this.setAllParametrs();
        let vertices = this.basement.vertices;
        let vectors = getVectors(vertices);

        if ( data.index ) {
            let index = data.index/3;
            this.points.children[ index ].position.set( vectors[ index ].x, vectors[ index ].y, vectors[ index ].z )
        } else {
            this.points.children.map( (item, index) => {
                if( !item.position.equals(vectors[index]) ) {
                    item.position.set( vectors[index].x, vectors[index].y, vectors[index].z )
                }
            })
        }
        for ( let i = 0; i < vertices.length; i ++) {
            let objectCoords = this.plan.geometry.attributes.position.array
            if ( objectCoords[i] !== vertices[i] ) {
                objectCoords[i] = vertices[i]
            }
        }
        this.plan.geometry.attributes.position.needsUpdate = true;
        putDimensions( this.plan, this.basement.vertices );
    }

    changeVisability(viewMode) {
        this.viewMode = viewMode;
        if( viewMode === '2D'){
            this.hideFloors();
            this.plan.visible = true;
            if( this.planEditMode === 'edit' || this.planEditMode === 'add' ) {
                this.points.visible = true;
            } else {
                this.points.visible = false;
            }
            stages.map( stage => {
                if (this[stage.name + 'Model']) {
                    this[stage.name + 'Model'].visible = false
                }}
            );
            putDimensions( this.plan, this.basement.vertices );
        }
        if( viewMode === '3D'){
            this.plan.visible = false;
            this.points.visible = false;
            this.houseInScene.visible = true;
            if ( this.currentStage ){
                this.changeStageVisability( {newStageId: this.currentStage})
            } else {
                this['basementModel'].visible = true;
            }
            deleteDimentions( this.plan )
        }
    }

    changeStageVisability(data) {
        // console.log('stageChanged', data);

        this.currentStage = data.newStageId;
        if( this.viewMode === '2D') {
            this.hideFloors();
            return
        };
        this.setAllParametrs();
        for ( let index = 0; index < stages.length; index++ ) {
            const name = stages[ index ].name;
            if ( this[ name + 'Model' ] ){
                if ( index <= data.newStageId ){
                    this[ name + 'Model' ].visible = true;
                } else {
                    this[ name + 'Model' ].visible = false;
                }
            }
        }
        if( this.currentStage < 2) {
            this.removeFloors();
        } else if( this.currentStage = 2 ) {
            this.removeFloors();
            this.buildFloors();
        }
    }

    changePointsVisability( mode ) {
        if( mode === 'edit' ) {
            this.planEditMode = 'edit';
            this.points.visible = true;
        }
        if( mode === 'add') {
            this.planEditMode = 'add';
            this.points.visible = true;
        }
        if( mode === 'N' ) {
            this.planEditMode = 'N';
            this.points.visible = false;
        }
    }

    rebuild( data ) {
        this.setAllParametrs();
        this.reDrawPlan( data );
        let pointIndex = data.index/3;
        this.rebuildAllStages( pointIndex );
    }

    rebuildAllStages( pointIndex ){
        stages.map( (stage, stageNumber ) => this.rebuildStage( {
            currentStage: stageNumber,
            stageName: stage.name,
            pointIndex: pointIndex
        } ));
    }

    rebuildStage( stageInfo ) {
        this.setAllParametrs();
        const stageName = stageInfo.stageName;
        const viewMode = stageInfo.viewMode;
        if( stageInfo.name !== 'basementShape'){
            if ( this[stageName + 'Model'] ) {
                redrawObject( this[stageName + 'Model'],
                this[stageName],
                this.basement.vertices,
                stageInfo.pointIndex)
            }
        } else {
            appState.scene.remove( this.houseInScene );
            this.build();
            appState.scene.add( this.houseInScene );
            this.changeVisability(viewMode);
        }
        if( stageInfo.name === 'basementHeight') {
            this.outerWallsModel.position.set(...this.outerWalls.translation)
        }
        if( stageInfo.name === 'floors') {
            this.removeFloors();
            this.buildFloors();
        }
    }
    buildFloors() {
        const ceilingModel = drawObject(this.ceiling);
        for (let index = 1; index < this.floors; index++) {
            let floor = new THREE.Group();
            floor.name='floor';
            let ceiling;
            if (index>1) {
                ceiling=ceilingModel.clone();
                ceiling.position.z= ceilingModel.position.z + (index-1)*(this.outerWalls.height+this.ceiling.height);
            } else {
                ceiling=ceilingModel;
            }
            ceiling.name='ceiling';
            floor.add(ceiling);
            if (index<=this.floors-1) {
                appState.scene.add( ceiling );
                this.floorsModels.push(ceiling);
            }
            const walls = this.outerWallsModel.clone();
            walls.name = "walls";
            walls.position.z = this.outerWallsModel.position.z + index * (this.outerWalls.height+this.ceiling.height);
            floor.add(walls);
            appState.scene.add( floor );
            this.floorsModels.push(floor);
        }
    }

    removeFloors() {
        this.floorsModels.forEach( floor => appState.scene.remove( floor ));
        this.floorsModels = [];
    }

    hideFloors() {
        this.floorsModels.forEach( floor => floor.visible = false );
    }

    showFloors() {
        this.floorsModels.forEach( floor => floor.visible = true );
    }

    changeMaterial(stageName) {
        let sceneObject = this[stageName + 'Model'],
            houseObject = this[stageName];
        houseObject.texture = loadTexture(houseTextures.getTexture(stageName));
        houseObject.textureSize = houseTextures.getTextureSize(stageName);
        sceneObject.children.forEach((child) => child.material.map = houseObject.texture);
        calcTextureCoord(sceneObject.children[0].geometry, houseObject);
        calcTextureCoord(sceneObject.children[1].geometry, houseObject, 'up');
    }

    clearScene( data ) {

        appState.scene.remove( this.houseInScene );
        this.basement.vertices.length = 0;
    }

    makeNewPlan(data){
        this.setBasementParametrs();
        // this.setAllParametrs();
        appState.scene.remove( this.houseInScene );
        this.changeVisability('2D');
        const vertices = data.vertices;
        let group = new THREE.Group();
        this.plan = drawLine(vertices);
        group.add( this.plan );
        
        putDimensions( this.plan, vertices );
        group.name = 'house';
        this.houseInScene = group;
        appState.scene.add( this.houseInScene );

        this.points = makePointsGroup( vertices );
        this.plan.add( this.points );
    }

    onNewPlanCreatingMouseMoving(data) {
        if( this.basement.vertices.length === 0) return;
        let vertices = this.basement.vertices.slice();
        const length = vertices.length;
        vertices.push( ...data.mousePosition );

        if( vertices[0] !== vertices[length-3] &&
            vertices[1] !== vertices[length-2]) {
            vertices.push(vertices[0]);
            vertices.push(vertices[1]);
            vertices.push(vertices[2]);
        }

        this.makeNewPlan({vertices});
    }

    onEndAddVertices() {
        let vertices = this.basement.vertices.slice();
        const length = vertices.length;

        if( vertices[0] !== vertices[length-3] &&
            vertices[1] !== vertices[length-2]) {
            vertices.push(vertices[0]);
            vertices.push(vertices[1]);
            vertices.push(vertices[2]);
        }
        this.setBasementParametrs(vertices);
        this.setAllParametrs();
        appState.scene.remove( this.houseInScene );
        if(this.basement.vertices.length >= 9){
            this.build();
            this.changeVisability('3D');
            appState.scene.add( this.houseInScene );
        }
    }
}

export { HouseObject };

function putDimensions( pointsGroup, vertices ) {
    if (appState.dimensions) pointsGroup.parent.remove( appState.dimensions );
    appState.dimensions = createDimensions( vertices );
    pointsGroup.parent.add( appState.dimensions );
}

function deleteDimentions( pointsGroup ) {
    if (appState.dimensions) pointsGroup.parent.remove( appState.dimensions );
    removeDimensions();
}

function makePointsGroup( vertices ) {

    let points = new THREE.Group();
    for ( let i = 0; i < vertices.length - 3; i += 3 ) {
        let point = drawDot( [vertices[i], vertices[i + 1], vertices[i + 2]] );
        points.add(point);
    }
    points.name = 'points';

    return points
}

function buildStages( house ) {
    let model;
    const stagesModels = [];

    for (let i = 0; i < stages.length; i++) {
        let stageName = stages[i].name;
        if (house[stageName]) {
            if ( stageName !== 'floors' ) {
                model = drawObject(house[stageName]);
                model.name = stageName + 'Model';
                if( i > 0) model.visible = false;
                stagesModels.push( model )
            }
        }
    }

    return stagesModels;
}

eventEmitter.onEvent('basementChanged', ( data ) => appState.house.reDrawPlan( data ));
eventEmitter.onEvent('basementChangeEnd', ( data ) => appState.house.rebuild( data ));

eventEmitter.onEvent('changeView', (viewMode) => appState.house.changeVisability( viewMode ));
eventEmitter.onEvent('stageChanged', (stageInfo) => appState.house.rebuildStage( stageInfo ));
eventEmitter.onEvent('stageSwitched', (data) => appState.house.changeStageVisability( data ));

eventEmitter.onEvent('materialChanged', (stageName) => appState.house.changeMaterial( stageName ));
eventEmitter.onEvent('planEdiMode', (mode) => appState.house.changePointsVisability( mode ));

eventEmitter.onEvent('clearScene', ( data ) => appState.house.clearScene( data ));
eventEmitter.onEvent('pointAdded', ( data ) => appState.house.makeNewPlan( data ));
eventEmitter.onEvent('pointAdding', ( data ) => appState.house.onNewPlanCreatingMouseMoving( data ));
eventEmitter.onEvent('endAddVertices', ( data ) => appState.house.onEndAddVertices( data ));




