import sceneObject from './sceneObject.js';
import stages from './stagesStructure.js';
import basementShapes from './basementDrafts.js';
import verandaBasementShapes from './verandaBasementDrafts.js';
import {convertToCoor, getPolygonCenter, getPolygons} from './extraFunctions.js';
import appState from './appState.js';
import { drawObject, drawWideLine, drawLine, drawDot, drawRoof, drawPolygon } from './threeJsFunctions/drawFunctions.js';
import * as THREE from 'three';
import { createDimensions, removeDimensions } from './threeJsFunctions/dimensions.js';
import { redrawObject } from './threeJsFunctions/redrawObject.js';
import eventEmitter from './eventEmitter.js';
import getVectors from './threeJsFunctions/getVectors.js';

import {loadTexture} from '../assets/Textures/textureLoader.js';
import houseTextures from '../assets/Textures/houseTextures.js';
import {calcTextureCoord} from './threeJsFunctions/calcTextureCoord.js';
import floorObject from './floorObject.js';

import { loadModel } from '../assets/Models/modelLoader.js';
import houseModels from '../assets/Models/houseModels.js';


class HouseObject {
    constructor() {
        this.basement = new sceneObject();
        this.outerWalls = new sceneObject();
        this.ceiling = new sceneObject();
        this.roof = new sceneObject();
        this.innerWalls = null; //массив объектов floorObject
        this.activeFloor = '1'; //название этажа, который надо показать
        this.floors = 1; //количество этажей в доме
        this.floorNames = ['Подвал', '1', '2', '3', '4', '5', 'Мансарда'];
        this.floorsModel = new THREE.Group();
        this.floorHeight = 0;
        this.cellar = null; //коробка подвал
        this.cellarExistence = false; //наличие подвала
        this.mansard = null; //блок перекрытие для мансарды
        this.mansardExistence = false; //наличие мансарды 
        this.mansardLiving = false; //мансарда жилая?
        this.veranda = new THREE.Group(); //веранда
        this.veranda.basementVerticeIndex = new Array
        this.verandaBasement = new sceneObject();
        this.verandaWalls = new sceneObject();
        this.verandaRoof = new sceneObject();
        this.verandaExistence = false;  //наличие веранды
        this.plan = undefined;
        this.points = undefined;
        this.house2d = new THREE.Group();
        this.house3d = new THREE.Group();
        this.stages2D = ['basement', 'outerWalls', 'innerWalls'];
        this.testObject = new floorObject();
        this.models = null;
        //модели
        this.windowModels = [];
        this.doorModels = [];
        this.stairsModels = [];
        //текстуры
        this.basementTextures=[];
        this.outerWallsTextures=[];
        this.roofTextures=[];
    }
    setAllParametrs() {
        this.setBasementParametrs();
        this.setOuterWallsParametrs();
        this.setCeilingParametrs();
        this.setFloorsParametrs();
        this.setRoofParametrs();
        this.setCellarParametrs();
        this.setMansardParametrs();
        this.setFloorPlanParametrs();
        this.setVerandaParametrs();
        // this.setTestParametrs();
    }
    setTestParametrs() {
        // const box = new THREE.Mesh(new THREE.BoxGeometry(20, 20, 20));
        // box.material = new THREE.MeshPhongMaterial({ color: 0xff0000});
        // box.rotation.x = Math.PI/4;
        // const sphere = new THREE.Mesh(new THREE.SphereGeometry(10, 32, 32));
        // sphere.material = new THREE.MeshPhongMaterial({ color: 0x00ff00});
        // sphere.position.y = 10;
        // const sBSP = new ThreeBSP(sphere);
        // const bBSP = new ThreeBSP(box);
        
        // // appState.scene.add(box);
        // // appState.scene.add(sphere);

        // const sub = bBSP.subtract(sBSP);
        // const newMesh = sub.toMesh();

        // newMesh.material = new THREE.MeshPhongMaterial({ color: 0xdddddd, specular: 0x1a1a1a, shininess: 30, shading: THREE.FlatShading  });
        // appState.scene.add(newMesh);

    }
    setParametrs(stageName, vertices) {
        switch(stageName) {
            case 'basement':
                this.setBasementParametrs(vertices);
                break;
            case 'outerWalls':
                this.setOuterWallsParametrs();
                this.setCeilingParametrs();
                break;
            case 'floors':
                this.setFloorsParametrs();
                break;
            case 'roof':
                this.setRoofParametrs();
                break;
            case 'cellar':
                this.setCellarParametrs();
                break;
            case 'mansard':
                this.setMansardParametrs();
                break;
            case 'innerWalls':
                this.setFloorPlanParametrs();
                break;
            case 'veranda':
                this.setVerandaParametrs(vertices);
                break;
        }
    }
    setBasementParametrs(verticesCoords) {
        let basement = this.basement;

        let basementStage = stages.filter((el) => el.name === 'basement')[0];

        let basementShapeSelect = basementStage.fields.filter((el) => el.fieldId === 'basementShape')[0];
        if (Number(basementShapeSelect.value) <= basementShapes.length) {
            basement.vertices = [...basementShapes.filter((el, i) => i === basementShapeSelect.value - 1)[0]];
        } else if (verticesCoords) {
            basement.vertices = verticesCoords;
        }

        let basementHeight = basementStage.fields.filter((el) => el.fieldId === 'basementHeight')[0].value;
        basement.height = convertToCoor(Number(basementHeight));

        basement.upVertices=basement.getUpVertices();
        basement.color = '';
        basement.texCoord = [];
        //------------борьба с мерцанием--------------------
        let materialIndex = basementStage.fields.filter((el) => el.fieldId === 'basementMaterial')[0].value;
        basement.texture = this.basementTextures[materialIndex].texture;
        basement.textureSize =  this.basementTextures[materialIndex].size;    //задание размера текстуры
        //-------------------------------
        // basement.texture = loadTexture(houseTextures.getTexture('basement'));
        // basement.textureSize = houseTextures.getTextureSize('basement');    //задание размера текстуры
        //-----тест!!!!!!!!!!!!!!!!!!!!!!!!!
        // basement.polygons=getPolygons(basement.vertices);
    }
    setOuterWallsParametrs(){
        let outerWalls = this.outerWalls;
        let outerWallsStage = stages.filter((el) => el.name === 'outerWalls')[0];

        outerWalls.vertices = this.basement.vertices;
         
        let outerWallsHeight = outerWallsStage.fields.filter((el) => el.fieldId === 'wallHeight')[0].value;
        outerWalls.height = convertToCoor(Number(outerWallsHeight));
        // outerWalls.height=3;
        outerWalls.width = 0.25;
        outerWalls.innerVertices=outerWalls.getInnerVertices(outerWalls.width);
        outerWalls.upVertices=outerWalls.getUpVertices();
        outerWalls.color=''; //0xFF0000
        outerWalls.texCoord=[];
        // outerWalls.texture = loadTexture(houseTextures.getTexture('outerWalls'));
        // outerWalls.textureSize = houseTextures.getTextureSize('outerWalls');
        //----------борьба с мерцанием------------------
        let materialIndex = outerWallsStage.fields.filter((el) => el.fieldId === 'outerWallsMaterial')[0].value;
        outerWalls.texture = this.outerWallsTextures[materialIndex].texture;
        outerWalls.textureSize =  this.outerWallsTextures[materialIndex].size; 
        //-----------------------------

        outerWalls.translation=[0,0,this.basement.height];
    }
    setCeilingParametrs(){
        let ceiling = this.ceiling;
        ceiling.vertices = this.basement.vertices;
        ceiling.height = this.outerWalls.height * 0.15;
        ceiling.upVertices=ceiling.getUpVertices();
        ceiling.color=''; //0xFF0000
        ceiling.texCoord=[];
        // ceiling.texture = loadTexture(houseTextures.getTexture('basement'));
        // ceiling.textureSize = houseTextures.getTextureSize('basement');    //задание размера текстуры
        ceiling.texture = this.outerWalls.texture;
        ceiling.textureSize = this.outerWalls.textureSize;
        ceiling.translation=[0,0,0];
    }
    setRoofParametrs() {
        let roof = this.roof;
        
        let roofStage = stages.filter((el) => el.name === 'roof')[0];
        let roofShapeSelect = roofStage.fields.filter((el) => el.fieldId === 'roofShape')[0];
        roof.type=Number(roofShapeSelect.value);
        
        roof.vertices=this.basement.vertices;
        roof.width=0.5;
        roof.height=2;
        roof.color = '';
        roof.texCoord = [];
        roof.texture = loadTexture(houseTextures.getTexture('roof'));
        roof.textureSize = houseTextures.getTextureSize('roof');
        //----------борьба с мерцанием------------------
        let materialIndex = roofStage.fields.filter((el) => el.fieldId === 'roofMaterial')[0].value;
        roof.texture = this.roofTextures[materialIndex].texture;
        roof.textureSize =  this.roofTextures[materialIndex].size; 
        //-----------------------------
        roof.translation=[0,0, this.basement.height+this.outerWalls.height+(this.floors-1)*this.floorHeight];
    }
    setFloorsParametrs(){
        let floorsStage = stages.filter((el) => el.name === 'floors')[0];
        let floorsSelect = floorsStage.fields.filter((el) => el.fieldId === 'floors')[0];

        this.floors = Number(floorsSelect.value);
        this.floorHeight = this.ceiling.height + this.outerWalls.height;
    }
    setCellarParametrs() {
        let cellar = this.cellar;
        if (this.cellarExistence) {
            if (!cellar) {
                cellar = new sceneObject();
            }
            // cellar.vertices = this.outerWalls.innerVertices;
            cellar.vertices = this.outerWalls.getInnerVertices(0.15);
            cellar.height = -this.outerWalls.height;
            cellar.upVertices = cellar.getUpVertices();
            cellar.texture = this.basement.texture;
            cellar.textureSize = this.basement.textureSize;
            cellar.translation = [0,0,0];
        } else {
            cellar = null;
        }
        this.cellar = cellar;
    }
    setMansardParametrs() {
        let mansard = this.mansard;
        if (this.mansardExistence) {
            if (!mansard) {
                mansard = new sceneObject();
            }
            mansard.vertices = this.basement.vertices;
            mansard.height = this.ceiling.height;
            mansard.upVertices = mansard.getUpVertices();
            mansard.texture = this.outerWalls.texture;
            mansard.textureSize = this.outerWalls.textureSize;
            mansard.translation = [0,0, this.roofModel.position.z];
        } else {
            mansard = null;
        }
        this.mansard = mansard;
    }
    setFloorPlanParametrs() {
        if (!this.innerWalls) {
            this.innerWalls = {};
            this.floorNames.map(floor => {
                this.innerWalls[floor] = null;
                // this.windows[floor] = null;
                // this.models[floor] = null;
            });
        }
        if (!this.innerWalls['Подвал'] ) {
            this.innerWalls['Подвал'] = new floorObject();
        }
        for (let i=1; i<=this.floors; i++) {
            if (!this.innerWalls[String(i)] ) {
                this.innerWalls[String(i)] = new floorObject();
            }
        }
        if (!this.innerWalls['Мансарда'] ) {
            this.innerWalls['Мансарда'] = new floorObject();
        }
    }

    setVerandaParametrs(vertices) {
        // let veranda = this.veranda;
        if (!vertices) {vertices = this.verandaBasement.vertices;}
        if (this.verandaExistence) {
            // if (!veranda) {
            //     veranda = new THREE.Group();
            // }
            // if (this.verandaBasement.vertices.length === 0) {
            // // this.verandaBasement.vertices = [];
            //     for (let i = 0; i < this.basement.vertices.length; i += 3) {
            //         this.verandaBasement.vertices.push(this.basement.vertices[i] + 10, this.basement.vertices[i + 1] + 10, this.basement.vertices[i + 2]);
            //     }
            // }
            this.setVerandaBasementParametrs(vertices);
            this.setVerandaWallsParametrs();
            this.setVerandaRoofParametrs();
        }
        // else {
        //     veranda = null;
        // }
        // this.veranda = veranda;
    }
    
    setVerandaBasementParametrs(verticesCoords) {
        let verandaBasement = this.verandaBasement;
        
        let verandaBasementStage = stages.filter((el) => el.name === 'basement')[0];
        
        let verandaBasementShapeSelect = verandaBasementStage.fields.filter((el) => el.fieldId === 'basementShape')[0];
        if (verticesCoords.length > 2 || verandaBasementShapeSelect > 3) {
            verandaBasement.vertices = verticesCoords;
        } else {
            // if (Number(verandaBasementShapeSelect.value) <= verandaBasementShapes.length) {
                verandaBasement.vertices = [...verandaBasementShapes.filter((el, i) => i === verandaBasementShapeSelect.value - 1)[0]];
            // } else if (verticesCoords) {
            //     verandaBasement.vertices = verticesCoords;
            // }
        }
        let verandaBasementHeight = verandaBasementStage.fields.filter((el) => el.fieldId === 'basementHeight')[0].value;
        verandaBasement.height = convertToCoor(Number(verandaBasementHeight));

        verandaBasement.upVertices=verandaBasement.getUpVertices();
        verandaBasement.color = '';
        verandaBasement.texCoord = [];
        // verandaBasement.texture = loadTexture(houseTextures.getTexture('basement'));
        // verandaBasement.textureSize = houseTextures.getTextureSize('basement');    //задание размера текстуры
        verandaBasement.texture = this.basement.texture;
        verandaBasement.textureSize = this.basement.textureSize;    //задание размера текстуры
    }
    
    dislpayConsoleHouse() {
        console.log(this);
    }

    setVerandaWallsParametrs() {
        let verandaWalls = this.verandaWalls;
        let verandaWallsStage = stages.filter((el) => el.name === 'outerWalls')[0];

        verandaWalls.vertices = this.verandaBasement.vertices;
         
        let verandaWallsHeight = verandaWallsStage.fields.filter((el) => el.fieldId === 'wallHeight')[0].value;
        verandaWalls.height = convertToCoor(Number(verandaWallsHeight));
        // outerWalls.height=3;
        verandaWalls.width = 0.25;
        verandaWalls.innerVertices=verandaWalls.getInnerVertices(verandaWalls.width);
        verandaWalls.upVertices=verandaWalls.getUpVertices();
        verandaWalls.color=''; //0xFF0000
        verandaWalls.texCoord=[];
        // verandaWalls.texture = loadTexture(houseTextures.getTexture('outerWalls'));
        // verandaWalls.textureSize = houseTextures.getTextureSize('outerWalls');
        verandaWalls.texture = this.outerWalls.texture;
        verandaWalls.textureSize = this.outerWalls.textureSize;

        verandaWalls.translation=[0,0,this.verandaBasement.height];
    }

    setVerandaRoofParametrs() {
        let verandaRoof = this.verandaRoof;
        
        let verandaRoofStage = stages.filter((el) => el.name === 'roof')[0];
        let verandaRoofShapeSelect = verandaRoofStage.fields.filter((el) => el.fieldId === 'roofShape')[0];
        // verandaRoof.type = Number(verandaRoofShapeSelect.value);
        let startIndex = 3;
        let endIndex = 0;
        let verandaBasementVertices = [];
        this.verandaBasement.vertices.forEach(item => verandaBasementVertices.push(item));
        verandaRoof.vertices = [];
        if (this.floors === 1) {
            let index0;
            let index1;
            let maxIndex;
            if (typeof this.veranda.basementVerticeIndex.index1 === 'undefined') {
                index0 = 6;
                index1 = 6;
            }
            else {
                index0 = this.basement.vertices.length - (this.veranda.basementVerticeIndex.index0 + 3);
                index1 = this.basement.vertices.length - (this.veranda.basementVerticeIndex.index1 + 3);
            }
            maxIndex = index1;
            console.log(index0, index1);
            // if (index0 === index1) {
                if (typeof this.veranda.basementVerticeIndex.index1 != 'undefined') {
                    let distance = [];
                    // let i = 0;
                    // while (i < 6) {
                    //     distance[i] = Math.sqrt(Math.pow(this.basement.vertices[Number(this.veranda.basementVerticeIndex['index' + i])] - this.verandaBasement.vertices[i], 2) + Math.pow(this.basement.vertices[Number(this.veranda.basementVerticeIndex['index' + i]) + 1] - this.verandaBasement.vertices[i + 1], 2));
                    //     i += 3;
                    // }
                    let j = 0;
                    for (let i = 0; i < 6; i += 3) {
                        distance[j] = Math.sqrt(Math.pow(this.basement.vertices[Number(this.veranda.basementVerticeIndex['index' + j])] - this.verandaBasement.vertices[i], 2) + Math.pow(this.basement.vertices[Number(this.veranda.basementVerticeIndex['index' + j]) + 1] - this.verandaBasement.vertices[i + 1], 2));
                        j ++;
                    }
                    console.log(distance);
                    if (distance[0] === 0) {endIndex += 3;}
                    if (distance[1] === 0) {startIndex += 3;}
                    if ((distance[0] < distance[1] && index0 === index1) || (/*distance[1] === distance[0] &&*/ index0 > index1)) {
                        verandaBasementVertices = [];
                        for (let i = this.verandaBasement.vertices.length; i > 0; i -= 3) {
                            verandaBasementVertices.push(this.verandaBasement.vertices[i - 3], this.verandaBasement.vertices[i - 2], this.verandaBasement.vertices[i - 1]);
                        }
                        startIndex = 0;
                        endIndex = 3;
                        maxIndex = index0;
                        if (distance[0] === 0) {startIndex += 3;}
                        if (distance[1] === 0) {endIndex += 3;}
                    }
                    console.log('startIndex = '+startIndex+'; endIndex = '+endIndex);
                }
                console.log(verandaBasementVertices);
                // console.log('startIndex = '+startIndex+'; endIndex = '+endIndex);
                console.log('maxIndex = '+maxIndex);
                for (let i = 0; i < this.basement.vertices.length; i ++) {
                    verandaRoof.vertices.push(this.basement.vertices[i]);
                    if (i === (this.basement.vertices.length - maxIndex - 1)) {
                        for (let j = startIndex; j < verandaBasementVertices.length - endIndex; j ++) {
                            // this.verandaBasement.vertices.forEach(item => verandaRoof.vertices.push(item));
                            verandaRoof.vertices.push(verandaBasementVertices[j]);
                            verandaRoof.type = Number(verandaRoofShapeSelect.value);
                        }
                    }
                }
                console.log(verandaRoof.vertices);
            // }
            // else {
                
            // }
            // this.roof.vertices = [];
            // verandaRoof.vertices.forEach(item => this.roof.vertices.push(item));
            // this.roof.vertices = verandaRoof.vertices;
            // verandaRoof.vertices = [];
            // this.verandaBasement.vertices.forEach(item => verandaRoof.vertices.push(item));
        }
        else {
            verandaRoof.vertices = [];
            this.verandaBasement.vertices.forEach(item => verandaRoof.vertices.push(item));
            verandaRoof.type = 'veranda';
        }

        // verandaRoof.vertices=this.verandaBasement.vertices;
        verandaRoof.width=0.5;
        verandaRoof.height=2;
        verandaRoof.color = '';
        verandaRoof.texCoord = [];
        // verandaRoof.texture = loadTexture(houseTextures.getTexture('roof'));
        // verandaRoof.textureSize = houseTextures.getTextureSize('roof');
        verandaRoof.texture = this.roof.texture;
        verandaRoof.textureSize = this.roof.textureSize;

        verandaRoof.translation=[0,0, this.verandaBasement.height+this.verandaWalls.height];
    }

    dislpayConsoleHouse() {
        console.log(this);
    }

    build( data ) {
        if (!data) {
            appState.scene.remove(this.house2d, this.house3d);
            this.setAllParametrs();
            
            let group2d = new THREE.Group();
            let group3d = new THREE.Group();
            
            this.stages2D.map(stageName => {
                // if (stageName === 'innerWalls')
                if (stageName !== 'innerWalls' || this.innerWalls) {
                    group2d.add(this.build2d(stageName));
                }
            });
            this.house2d = group2d; 
            this.house2d.name = 'house2d';

            const stagesModels = buildStages( this );
            stagesModels.map( model => {
                this[model.name] = model;
                group3d.add(model);
            });
            
            group3d.name = 'house3d';
            this.house3d = group3d;
            // if (this.innerWalls) {
            //     this.buildInnerWalls2D();
            //     this.buildInnerWalls3D();
            // }
            appState.scene.add(this.house2d, this.house3d);
        } else if (data.stageName === 'veranda') {
            this.house3d.remove(this.verandaModel);
            this.veranda.remove(this.verandaBasementModel);
            this.veranda.remove(this.verandaWallsModel);
            this.veranda.remove(this.verandaRoofModel);
            this.verandaBasementModel = drawObject(this.verandaBasement);
            this.verandaBasementModel.name = 'verandaBasement';
            this.verandaWallsModel = drawObject(this.verandaWalls);
            this.verandaWallsModel.name = 'verandaWalls';
            this.verandaRoofModel = drawRoof(this.verandaRoof);
            this.verandaRoofModel.name = 'verandaRoof';
            this.veranda.add(this.verandaBasementModel);
            this.veranda.add(this.verandaWallsModel);
            this.veranda.add(this.verandaRoofModel);
            this.verandaModel = this.veranda;
            this.verandaModel.name = 'veranda';
            this.house3d.add(this.verandaModel);
            this.house2d.remove(this.veranda.plan);
            this.veranda.plan = this.build2d('veranda', this.verandaBasement.vertices);
            this.house2d.add(this.veranda.plan);
            console.log('билд веранды');
        }
    }

    build2d(stageName, vertices) {
        if (!vertices) {
            vertices = this.basement.vertices;
        }

        if (stageName === 'basement') {
            this.basement.plan = drawLine(vertices);   
            this.basement.plan.name = 'basement2d'     
            this.basement.plan.visible = true;
            this.basement.points = makePointsGroup( vertices );
            this.basement.points.visible = false;
            this.basement.plan.add( this.basement.points );
        } else if (stageName === 'outerWalls'){
            this.outerWalls.plan = drawPolygon(this.outerWalls, [0,0,-this.outerWalls.height]);
            const material2D = new THREE.MeshPhongMaterial({color: new THREE.Color('rgb(45,45,45)')});
            this.outerWalls.plan.position.z = 0;
            this.outerWalls.plan.material = material2D;
            this.outerWalls.plan.name = 'outerWalls2d';
            this.outerWalls.plan.visible=false;
        } else if (stageName ==='innerWalls') {
            this.buildInnerWalls2D();
        } else if (stageName === 'veranda') {
            this.veranda.plan = drawLine(vertices);   
            this.veranda.plan.name = 'veranda2d'     
            this.veranda.plan.visible = true;
            this.veranda.points = makePointsGroup( vertices );
            this.veranda.points.visible = false;
            this.veranda.plan.add( this.veranda.points );
        }

        return this[stageName].plan;
    }

    //------------регулировка видимости----------------
    changeVisability(viewMode) {
        this.viewMode = viewMode;
        if( viewMode === '2D'){
            putDimensions( this.basement.plan, this.basement.vertices, 'basement' );
            if (this.verandaExistence) {putDimensions( this.veranda.plan, this.verandaBasement.vertices, 'veranda' );}
            this.house2d.visible=true;
            this.house3d.visible=false;
        } else
        if( viewMode === '3D'){
            deleteDimensions( this.basement.plan, 'basement' );
            if (this.verandaExistence) {deleteDimensions(this.veranda.plan, 'veranda');}
            this.house2d.visible = false;
            this.house3d.visible = true;         
        }
        this.showInnerWalls(this.activeFloor, viewMode);
        if (this.models) this.showModels(this.activeFloor, viewMode);

    }

    changeStageVisability(data) {
        let currentStage = data.newStageId;
        if( this.viewMode === '2D') {
            this.house3d.visible=false;
            this.house2d.visible=true;
            this.showModels(this.activeFloor, this.viewMode);
        } else {
            for ( let index = 0; index < stages.length; index++ ) {
                const name = stages[ index ].name;
                if ( this[ name + 'Model' ] ) {
                    if ( index <= currentStage ){
                        this[ name + 'Model' ].visible = true;
                        // if (this.verandaExistence) {this.verandaRoofModel.visible = true;}
                    } else {
                        this[ name + 'Model' ].visible = false;
                    }
                }
                if (!this.cellarExistence && this.cellarModel) {this.cellarModel.visible = false;}
                if (!this.verandaExistence && this.verandaModel) {this.verandaModel.visible = false;}
                if (stages[ currentStage ].name === 'veranda' && this.verandaExistence) {
                    if (this.floors === 1) {
                        this.roofModel.visible = false;
                        // this.verandaRoofModel.visible = true;
                    }
                    this.verandaRoofModel.visible = true;
                }
                if (name === 'interior' && index <=currentStage) {
                    if (index === currentStage) {
                        this.roofModel.visible = false;
                        // if (this.verandaExistence && this.verandaBasementModel) {
                        //     this.verandaBasementModel.visible = true; this.verandaRoof.visible = false;
                        // }
                        // if (this.verandaRoofModel) this.verandaRoofModel.visible = false;
                    } else {
                        this.roofModel.visible = true;
                        if (this.verandaExistence) this.verandaRoofModel.visible = true;
                    }
                    if (this.models) this.showModels(this.activeFloor, this.viewMode);
                } else {
                    if (this.models) {
                        this.floorNames.map(floorName => {
                            if (this.models[floorName]) {
                                this.models[floorName].visible = false;
                                appState.scene.children.map(child => {if (child.name==='hole'+floorName) child.visible = false;});
                                let index = Number(floorName) - 2;
                                if (index>=0) {
                                    this.floorsModel.children[index].children[1].children[0].visible = true;
                                    this.floorsModel.children[index].children[1].children[2].visible = true;
                                }
                            }
                        });
                        this.outerWallsModel.children[0].visible = true;
                        this.outerWallsModel.children[2].visible = true;
                    }
                }
            }
            if( currentStage < 2) {
                this.hideFloors();
            } else if( currentStage === 2 || (currentStage > 2 && currentStage != 6)) {
                this.showFloors();
            }
        }
        if (currentStage>0) {
            //видимость внешних стен на плане
            this.house2d.children[1].visible=true;
        } else {
            //видимость внешних стен на плане
            this.house2d.children[1].visible=false;
        }
    }

    changePointsVisability( data ) {
        let mode = data.mode;
        let stageName = data.stageName;
        if (stageName === 'basement' || stageName === 'veranda') {
            this.basement.points.visible = mode === 'T' ? true : false;
            if (this.veranda.points) {this.veranda.points.visible = mode === 'veranda' ? true : false;}
        }
        else if (stageName === 'innerWalls') {
            this.floorNames.map(floorName => {
                if (this.innerWalls[floorName] && this.innerWalls[floorName].points) {
                    this.innerWalls[floorName].points.visible = (floorName === this.activeFloor && mode === 'T') ? true : false;
                    
                }
            });
        }   
    }
    //------------конец регулировка видимости----------------

    // rebuild( data ) {
    //     this.setAllParametrs();
    //     // this.redrawPlan( data );
    //     let pointIndex = data.index/3;
    //     this.rebuildAllStages( pointIndex );
    // }

    // rebuildAllStages( pointIndex ){
    //     stages.map( (stage, stageNumber ) => this.rebuildStage( {
    //         currentStage: stageNumber,
    //         stageName: stage.name,
    //         pointIndex: pointIndex
    //     } ));
    // }

    rebuildStage( stageInfo ) { 
        const stageName = stageInfo.stageName;
        const viewMode = stageInfo.viewMode;
        this.setParametrs(stageName);
        if (stageName !== 'innerWalls') {
            this.activeFloor = null;
        }
        switch (stageInfo.name) {
            case 'basementShape':
                appState.scene.remove(this.house2d, this.house3d);
                this.build();
                appState.scene.add(this.house2d, this.house3d);
                this.changeVisability(viewMode);
                break;
            case 'basementHeight':
                this.outerWallsModel.position.set(...this.outerWalls.translation);
                break;
            case 'roofShape':
                this['roofModel'] = drawRoof(this.roof);
                //обращение по номеру (плохо)
                this.house3d.children[3]=this['roofModel'];
                break;
            case 'cellarExistence':
                if (this.cellarExistence) {
                    if (this.cellarModel) {
                        this.cellarModel.visible = true;
                    } else {
                        appState.scene.remove( this.house3d );
                        this.cellarModel = drawObject(this.cellar);
                        this.cellarModel.name = 'cellar';
                        this.house3d.add(this.cellarModel);
                        appState.scene.add( this.house3d );
                    }
                } else {
                    if (this.cellarModel) {
                        this.cellarModel.visible = false;
                    }
                }
                break;
            case 'mansardExistence':
                if (this.mansardExistence) {
                    if (!this.mansardDraftModel) {
                        this.mansardDraftModel = drawObject(this.mansard);
                        this.mansardDraftModel.name = 'mansard';
                    }
                    this.roofModel.position.z+=this.mansard.height;
                    this.roofModel.children.push(this.mansardDraftModel);
                } else {
                    this.roofModel.children.pop();
                    this.roofModel.position.z=this.basement.height+this.outerWalls.height+(this.floors-1)*this.floorHeight;
                }
                break;
            case 'floors': 
                this.roofModel.position.z=this.basement.height+this.outerWalls.height+(this.floors-1)*this.floorHeight;
                this.showFloors();
                break;
            case 'editableFloor':
                break;
            case 'verandaExistence' :
                if (this.verandaExistence) {
                    if (this.verandaModel) {
                        this.verandaModel.visible = true;
                    } else {
                        this.build( {stageName: 'veranda'});
                        console.log('ребилд веранды');
                    }
                    if (this.floors === 1) {
                        this.roofModel.visible = false;
                        this.verandaRoofModel.visible = true;
                    }
                } else {
                    if (this.verandaModel) {
                        this.verandaModel.visible = false;
                        // this.verandaRoofModel.visible = false; console.log('невидимая веранда');
                        this.roofModel.visible = true;
                    }
                }
                break;
            default: 
                // if (stageName === 'roof') {
                    // this['roofModel'] = drawRoof(this.roof);
                    // //обращение по номеру (плохо)
                    // this.house3d.children[3]=this['roofModel'];
                // } else if (stageName === 'innerWalls') {
                    // this.buildInnerWalls2D();
                    // this.buildInnerWalls3D();
                // } else 
                if (stageName === 'veranda') {
                    this.house3d.remove(this.verandaModel);
                    this.veranda.remove(this.verandaRoofModel);
                    redrawObject(this.verandaBasementModel, this.verandaBasement, this.verandaBasement.vertices, stageInfo.pointIndex);
                    redrawObject(this.verandaWallsModel, this.verandaWalls, this.verandaWalls.vertices, stageInfo.pointIndex);
                    if (this.floors === 1) {
                        this.roofModel.visible = false;
                        this.verandaRoofModel.visible = true;
                    }
                    this.verandaRoofModel = drawRoof(this.verandaRoof);
                    this.verandaRoofModel.name = 'verandaRoof';
                    this.veranda.add(this.verandaRoofModel);
                    this.verandaModel = this.veranda;
                    this.house3d.add(this.verandaModel);
                    console.log('редрав веранды');
                } else 
                // if (stageName === 'floors') {
                //     //есть в cases
                //     break;
                // } else 
                if ( this[stageName + 'Model'] ) {
                    redrawObject( this[stageName + 'Model'],
                        this[stageName],
                        this[stageName].vertices,
                        stageInfo.pointIndex
                    );
                }
                break;
        }
    }

    //------------------работа с этажами---------------
    buildFloors() {
        const ceiling = drawObject(this.ceiling);
        const walls = drawObject(this.outerWalls, [0,0,this.ceiling.height]);
        
        let floor = new THREE.Group();
        floor.name='floor';
        floor.add(ceiling);
        floor.add(walls); 
        this.floorDraft = floor;
       
        let posZ = this.basement.height + this.outerWalls.height;
        this.floorsModel.position.z = posZ;
        posZ=0;
        this.floorsModel.children = [];
        for (let i = 0; i < 4; i++) {
            let floor = this.floorDraft.clone();
            floor.position.z = posZ;
            floor.name = 'floor' + (i+2);
            this.floorsModel.add(floor);
            posZ+=this.floorHeight;
        }
        return this.floorsModel;
    }

    hideFloors() {
        this.floorsModel.children.forEach( floor => floor.visible = false );
    }

    showFloors() {
        for (let i=0; i< this.floors-1; i++) {
            this.floorsModel.children[i].visible=true;
        }
        for (let i=this.floors-1; i<4; i++) {
            this.floorsModel.children[i].visible=false;
        }
        this.roofModel.position.z = this.basement.height+this.outerWalls.height+(this.floors-1)*this.floorHeight;
        if (this.mansardExistence) {
            this.roofModel.position.z += this.mansard.height;
        }
    }

    showCurrentFloor(floorName) {
        if (this.verandaModel) {this.verandaModel.visible = false;}
        this.activeFloor = floorName;
        switch (floorName) {
            case 'Подвал':
                this.hideFloors();
                this.basementModel.visible = false;
                this.outerWallsModel.visible = false;
                this.roofModel.visible=false;
                break;
            case '1':
                this.hideFloors();
                this.basementModel.visible = true;
                this.outerWallsModel.visible = true;
                this.roofModel.visible=false;
                if (this.verandaExistence) {
                    this.verandaModel.visible = true;
                    this.verandaRoofModel.visible = false; console.log('невидимая веранда');
                }
                break;
            case '2':
                this.hideFloors();
                this.floorsModel.children[0].visible = true;
                this.basementModel.visible = true;
                this.outerWallsModel.visible = true;
                this.roofModel.visible=false;
                break;
            case '3': 
                this.hideFloors();
                this.floorsModel.children[0].visible = true;
                this.floorsModel.children[1].visible = true;
                this.basementModel.visible = true;
                this.outerWallsModel.visible = true;
                this.roofModel.visible=false;
                break;
            case '4':
                this.hideFloors();
                this.floorsModel.children[0].visible = true;
                this.floorsModel.children[1].visible = true;
                this.floorsModel.children[2].visible = true;
                this.basementModel.visible = true;
                this.outerWallsModel.visible = true;
                this.roofModel.visible=false;
                break;
            case '5':
                this.showFloors();
                this.basementModel.visible = true;
                this.outerWallsModel.visible = true;
                this.roofModel.visible=false;
                break;
            case 'Мансарда':
                this.showFloors();
                this.basementModel.visible = true;
                this.outerWallsModel.visible = true;
                this.roofModel.visible = true;
                break;
            default:
                this.showFloors();
                this.basementModel.visible = true;
                if (this.outerWallsModel) this.outerWallsModel.visible = true;
                if (this.roofModel) this.roofModel.visible = true;
                break;
            
        }
        this.showInnerWalls(floorName, this.viewMode);
        if (this.models) this.showModels(floorName, this.viewMode);
    }

    showInnerWalls(floorName, viewMode) {
        this.innerWallsModel.visible = true;
        this.floorNames.map(floor => {
            if (this.innerWalls[floor] && this.innerWalls[floor]['model'+viewMode]) {
                if (floor === floorName) {
                    this.innerWalls[floor]['model'+viewMode].visible = true;
                } else {
                    this.innerWalls[floor]['model'+viewMode].visible = false;
                }
            }
        });
    }

    showModels(floorName, viewMode) {
        let floorIndex = this.floorNames.indexOf(floorName);
        if (viewMode === '2D') {
            appState.scene.children.map(child => {
                if (child.name === 'hole'+floorName) {
                    child.visible = false;
                }
            });
            this.floorNames.map((floor, i) => {
                if (floor===floorName) {
                    if (this.models[floor]) this.models[floor].visible = true;
                } else {
                    if (this.models[floor]) this.models[floor].visible = false;
                }
            });
        } else if (viewMode === '3D') {
            this.floorNames.map((floor, i) => {
                if (i<=floorIndex) {
                    appState.scene.children.map(child => {
                        if (child.name === 'hole'+floor) {
                            child.visible = true;
                        }
                    });
                    if (this.models[floor]) this.models[floor].visible = true;
                } else {
                    appState.scene.children.map(child => {
                        if (child.name === 'hole'+floor) {
                            child.visible = false;
                        }
                    });
                    if (this.models[floor]) this.models[floor].visible = false;
                }
            });
        }
        
        
    }
    //------------------конец работа с этажами---------------

    //построение 2д моделей стен
    buildInnerWalls2D() {
        this.house2d.remove(this.innerWalls.plan);
        let wallsGroup = new THREE.Group();
        this.floorNames.map(floor => {
            if (this.innerWalls[floor] && this.innerWalls[floor].wallsVertices.length>6) {
                
                this.innerWalls[floor].getWideWallsVertices();
                wallsGroup.add(this.buildWallsPlan(floor));
            }
        });
        wallsGroup.name = 'innerWallsPlan';
        this.innerWalls.plan = wallsGroup;
        this.house2d.add(this.innerWalls.plan);
    }
    buildWallsPlan(floorName, opacity) {
        let obj={};
        obj.color = new THREE.Color('rgb(100,100,100)');
        obj.texture = '';
        obj.innerVertices = [];
        let group = new THREE.Group();
        let pointsGroup = new THREE.Group();
        this.innerWalls[floorName].wideWallsVertices.map((vertices, index) => {
            obj.upVertices = vertices;
            let wall = drawWideLine(vertices);
            wall.name = 'Line' + index;
            group.add(wall);
            let pointVertices = this.innerWalls[floorName].wallsVertices[index];
            let points = makePointsGroup(pointVertices);
            let point = drawDot( [pointVertices[pointVertices.length-3], pointVertices[pointVertices.length-2], pointVertices[pointVertices.length-1]], opacity );
            points.add(point);
            points.visible = true;
            points.name = 'Points' + index;
            pointsGroup.add(points);
            pointsGroup.name = 'allFloorPoints';
        });

        group.name=floorName+'Walls';
        this.innerWalls[floorName].points = pointsGroup;
        group.add(pointsGroup);
        this.innerWalls[floorName].model2D = group;

        return this.innerWalls[floorName].model2D;
    }
    //построение 3д моделей стен
    buildInnerWalls3D() {
        let group = new THREE.Group();
        if (this.cellarExistence) {
            group.add(this.buildWalls('Подвал'));
        }
        for (let i=1; i<=this.floors; i++) {
            if (this.innerWalls[String(i)]) {
                group.add(this.buildWalls(String(i)));
            }
        }
        if (this.mansardLiving) {
            group.add(this.buildWalls('Мансарда'));
        }
        return group;
    }
    
    buildWalls(floor){ //, obj
        let group = new THREE.Group();
        let obj = this.setObjParametrs(floor);
        this.innerWalls[floor].wideWallsVertices.map(vertices => {
            obj.vertices = vertices;
            obj.upVertices = obj.getUpVertices();
            console.log(obj);
            group.add(drawObject(obj));
        });
        group.name=floor+'Walls';
        this.innerWalls[floor].model3D = group;
        return group;
    }
    //второстепенная функция для создания лже-sceneObjectдля межкомнатных стен
    setObjParametrs(floor) {
        let obj = new sceneObject();
        obj.height = this.outerWalls.height-0.001;
        obj.color = new THREE.Color('rgb(100,100,100)');
        obj.translation = [...this.basement.translation];
        if (floor === 'Подвал') {
            obj.height = -this.cellar.height+0.001;
            obj.translation[2] = -obj.height;
        } else if (floor === 'Мансарда') {
            obj.translation[2] += this.floors * this.floorHeight;
        } else {
            obj.translation[2] = this.basement.height;
            obj.translation[2] += Number(floor) > 1 ? (Number(floor) - 1) * this.floorHeight : 0; 
        }
        return obj;
    }

    //--------------текстуры и материалы-----------
    changeMaterial(stageName) {
        let sceneObject = this[stageName + 'Model'],
            houseObject = this[stageName];
        this.updateTextures(stageName);
        sceneObject.children.forEach((child) => child.material.map = houseObject.texture);
        calcTextureCoord(sceneObject.children[0].geometry, houseObject);
        if (stageName === 'roof') {
            calcTextureCoord(sceneObject.children[1].geometry, houseObject, 'roof'+houseObject.type);        
        } else {
            calcTextureCoord(sceneObject.children[1].geometry, houseObject, 'up');
        }
        if (stageName === 'outerWalls') {
            this.floorDraft.children.map(surface => {
                surface.children.map(mesh => mesh.material.map = houseObject.texture);
                calcTextureCoord(surface.children[0].geometry, houseObject);
                calcTextureCoord(surface.children[1].geometry, houseObject, 'up');
            });
        }
    }
    updateTextures(stageName) {
        let currentStage = stages.filter((el) => el.name === stageName)[0];
        if (stageName === 'basement') {
            //------------борьба с мерцанием--------------------
            let materialIndex = currentStage.fields.filter((el) => el.fieldId === 'basementMaterial')[0].value;
            this.basement.texture = this.basementTextures[materialIndex].texture;
            this.basement.textureSize =  this.basementTextures[materialIndex].size;    //задание размера текстуры
            //-------------------------------
            // this.basement.texture = loadTexture(houseTextures.getTexture('basement'));
            // this.basement.textureSize = houseTextures.getTextureSize('basement');    //задание размера текстуры
            if (this.cellar) {
                this.cellar.texture = this.basement.texture;
                this.cellar.textureSize = this.basement.textureSize;
            }
            if (this.verandaExistence) {
                this.verandaBasement.texture = this.roof.texture;
                this.verandaBasement.textureSize = this.roof.textureSize;
            }
        } else if (stageName === 'outerWalls') {
            //------------борьба с мерцанием--------------------
            let materialIndex = currentStage.fields.filter((el) => el.fieldId === 'outerWallsMaterial')[0].value;
            this.outerWalls.texture = this.outerWallsTextures[materialIndex].texture;
            this.outerWalls.textureSize =  this.outerWallsTextures[materialIndex].size; 
            //-----------------------------

            // this.outerWalls.texture = loadTexture(houseTextures.getTexture('outerWalls'));
            // this.outerWalls.textureSize = houseTextures.getTextureSize('outerWalls');

            this.ceiling.texture = this.outerWalls.texture;
            this.ceiling.textureSize = this.outerWalls.textureSize;
            if (this.verandaExistence) {
                this.verandaWalls.texture = this.roof.texture;
                this.verandaWalls.textureSize = this.roof.textureSize;
            }
        } else if (stageName === 'roof') {
            //------------борьба с мерцанием--------------------
            let materialIndex = currentStage.fields.filter((el) => el.fieldId === 'roofMaterial')[0].value;
            this.roof.texture = this.roofTextures[materialIndex].texture;
            this.roof.textureSize =  this.roofTextures[materialIndex].size; 
            //-----------------------------
            if (this.verandaExistence) {
                this.verandaRoof.texture = this.roof.texture;
                this.verandaRoof.textureSize = this.roof.textureSize;
            }
            // this.roof.texture = loadTexture(houseTextures.getTexture('roof'));
            // this.roof.textureSize = houseTextures.getTextureSize('roof');
        }
    }

    clearScene( stageName ) {
        //-----------старый вариант-------------------
        if (stageName === 'basement') {
            deleteDimensions(this.basement.plan);
            appState.scene.remove(this.house2d, this.house3d);
            this.basement = new sceneObject();
            this.house2d = new THREE.Group();
            this.setAllParametrs();
        } else if (stageName === 'innerWalls') {
            appState.scene.remove(this.house2d, this.house3d);
            this.innerWalls.plan.remove(this.innerWalls[this.activeFloor].model2D);
            this.innerWallsModel.remove(this.innerWalls[this.activeFloor].model3D);
            this.innerWalls[this.activeFloor] = new floorObject();
            this.innerWalls[this.activeFloor].model2D = new THREE.Group();
            this.innerWalls[this.activeFloor].model3D = new THREE.Group();
            appState.scene.add(this.house2d, this.house3d);
        } else if (stageName === 'veranda') {
            deleteDimensions(this.veranda.plan);
            this.house2d.remove(this.veranda.plan);
            this.house3d.remove(this.verandaModel);
            this.veranda = new THREE.Group; //веранда
            this.verandaBasement = new sceneObject();
            this.verandaWalls = new sceneObject();
            this.verandaRoof = new sceneObject();
            // this.setVerandaParametrs();
        }
        //------------конец старый вариант
    }
    //--------------конец текстуры и материалы-----------
    
    //---------------работа с 2д-----------------
    redrawPlan( data ) {
        let stageName = data.stageName;
        if (stageName === 'basement' || stageName === 'veranda') {
            let vertices = this[stageName].vertices;
            if (stageName === 'veranda') {vertices = this.verandaBasement.vertices;}
            let vectors = getVectors(vertices);

            if ( data.index ) {
                let index = data.index/3;
                this[stageName].points.children[ index ].position.set( vectors[ index ].x, vectors[ index ].y, vectors[ index ].z )
            } else {
                this[stageName].points.children.map( (item, index) => {
                    if( !item.position.equals(vectors[index]) ) {
                        item.position.set( vectors[index].x, vectors[index].y, vectors[index].z )
                    }
                })
            }
            for ( let i = 0; i < vertices.length; i ++) {
                let objectCoords = this[stageName].plan.geometry.attributes.position.array
                if ( objectCoords[i] !== vertices[i] ) {
                    objectCoords[i] = vertices[i]
                }
                // this.innerWalls[this.activeFloor].model2D.children[data.curveNumber].geometry.verticesNeedUpdate = true;
            }
            this[stageName].plan.geometry.attributes.position.needsUpdate = true;
            putDimensions( this[stageName].plan, vertices, stageName );
        } else if (stageName === 'innerWalls') {
            let vertices = this.innerWalls[this.activeFloor].wallsVertices[data.curveNumber];
            let vectors = getVectors(vertices);
            if ( data.index>-1 ) {
                let index = data.index/3;
                this.innerWalls[this.activeFloor].points.children[data.curveNumber].children[ index ].position.set( vectors[ index ].x, vectors[ index ].y, vectors[ index ].z );
            } else {
                this.innerWalls[this.activeFloor].points.children[data.curveNumber].children.map( (item, i) => {
                    if( !item.position.equals(vectors[i]) ) {
                        item.position.set( vectors[i].x, vectors[i].y, vectors[i].z )
                    }
                });
            }
            this.innerWalls[this.activeFloor].getWideWallsVertices();
            vertices = this.innerWalls[this.activeFloor].wideWallsVertices[data.curveNumber];
            vectors = getVectors(vertices);
            for ( let i = 0; i < vectors.length; i ++) {
                let objectCoords = this.innerWalls[this.activeFloor].model2D.children[data.curveNumber].geometry.vertices;
               if( !objectCoords[i].equals(vectors[i]) ) {
                    objectCoords[i].set( vectors[i].x, vectors[i].y, vectors[i].z )
                }
            }
            this.innerWalls[this.activeFloor].model2D.children[data.curveNumber].geometry.verticesNeedUpdate = true;
            console.log(this);
        }
    }

    makeNewPlan(data) {
        appState.scene.remove(this.house2d);
        const vertices = data.vertices;
        let opacity;
        if (data.opacity) {opacity = data.opacity;}
        else {opacity = 1;}
        const stageName = data.stageName;
        const curveNumber = data.curveNumber;
        if (stageName === 'innerWalls' ) {
            this.innerWalls[this.activeFloor].wallsVertices[curveNumber]=vertices;
            if (vertices.length>=6) {
                this.innerWalls.plan.remove(this.innerWalls[this.activeFloor].model2D);
                this.innerWalls[this.activeFloor].wideWallsVertices=[];
                this.innerWalls[this.activeFloor].getWideWallsVertices();
                this.innerWalls.plan.add(this.buildWallsPlan(this.activeFloor, opacity));
            }

            // if (this.innerWalls[this.activeFloor].wallsVertices[curveNumber].length>=6) {
            // }
            // this.innerWalls.plan.add( this.innerWalls[this.activeFloor].model2D );

        } else if (stageName === 'veranda') {
            this.house2d.remove(this.veranda.plan);
            this.veranda.plan = drawLine(vertices);
            // this.house2d=this.verandaBasement.plan;
            this.veranda.points = makePointsGroup( vertices, opacity );
            this.veranda.plan.add( this.veranda.points );
            this.house2d.add(this.veranda.plan);
            this.veranda.points.visible=true;
            if (vertices.length > 6) {putDimensions( this.veranda.plan, vertices, stageName );}
            // putDimensions( this.veranda.plan, vertices, stageName );
        } else {
            this.basement.plan = drawLine(vertices);
            this.house2d=this.basement.plan;
            this.basement.points = makePointsGroup( vertices, opacity );
            this.basement.plan.add( this.basement.points );
            appState.scene.add( this.house2d);
            this.basement.points.visible=true;
            if (vertices.length > 6) {putDimensions( this.basement.plan, vertices, 'basement' );}
            // putDimensions( this.basement.plan, vertices, stageName );
        }
        appState.scene.add(this.house2d);

    }

    onNewPlanCreatingMouseMoving(data) {
        const stageName = data.stageName;
        let vertices = [];
        if (data.vertices) {
            vertices = data.vertices;
        }
        const length = vertices.length;
        if (stageName === 'basement' || stageName === 'veranda') {
            if((length > 6 &&
                vertices[0] !== vertices[length-3] &&
                vertices[1] !== vertices[length-2]) ||
                length <= 6) {
                vertices.push(vertices[0]);
                vertices.push(vertices[1]);
                vertices.push(vertices[2]);
            }
        } else if (stageName === 'innerWalls') {
            
        }
        this.makeNewPlan({vertices: vertices, stageName: stageName, curveNumber: data.curveNumber, opacity: 0.3});
        
    }

    onEndAddVertices( data ) {
        if (!data || typeof data.stageName == 'undefined') {
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
            appState.scene.remove( this.house2d, this.house3d);
            if(this.basement.vertices.length >= 9){
                this.build();
                appState.scene.add( this.house2d, this.house3d);
            }
        } else if (data.stageName === 'veranda') {
            let vertices = this.verandaBasement.vertices.slice();
            const length = vertices.length;

            if( vertices[0] !== vertices[length-3] &&
                vertices[1] !== vertices[length-2]) {
                vertices.push(vertices[0]);
                vertices.push(vertices[1]);
                vertices.push(vertices[2]);
            }
            this.setVerandaBasementParametrs(vertices);
            this.setVerandaParametrs();
            // appState.scene.remove( this.house2d, this.house3d);
            if(this.verandaBasement.vertices.length >= 9){
                this.build(data);
                appState.scene.add( this.house2d, this.house3d);
            }
        }
        this.changeVisability('2D');
    }
    //---------------конец работа с 2д-----------------

    //-------------изменение высоты и сдвиг моделей на сцене
    changeObjHeight(stageName, height) {
        let heightDiv = height-this[stageName].height;
        this[stageName].height = height;
        if (stageName === 'cellar') {
            this[stageName].height*=-1;
        }
        this[stageName].upVertices = this[stageName].getUpVertices();
        redrawObject(this[stageName+'Model'], this[stageName], this[stageName].vertices);
        this.setAllParametrs();
        appState.scene.remove(this.house3d);


        if (stageName === 'basement') {
            this.changeObjPosition('outerWalls', heightDiv);
            this.changeObjPosition('floors', heightDiv);
            this.changeObjPosition('roof', heightDiv);
            // this.roofModel.position.z = this.basement.height+this.outerWalls.height+(this.floors-1)*this.floorHeight;
        } else       
        if (stageName === 'outerWalls') {
            this['floorsModel'] = this.buildFloors();
            this.changeObjPosition('roof', heightDiv);
            // this.roofModel.position.z = this.basement.height+this.outerWalls.height+(this.floors-1)*this.floorHeight;
        }
        console.log(this);
        appState.scene.add(this.house3d);
    }
    changeObjPosition(stageName, heightDiv) {
        if (this[stageName+'Model']) {
            this[stageName+'Model'].position.z += heightDiv;
        }
    }
    //-------------изменение высоты и сдвиг моделей на сцене

    addModel(type) {
        if (!this.models) {
            this.models = {};
        }
        if (!this.models[this.activeFloor]) {
            this.models[this.activeFloor] = new THREE.Group;
            this.models[this.activeFloor].name = this.activeFloor + 'models';
        }
        
        if (this.activeFloor==='Подвал' && type === 'window') {return;}

        appState.scene.remove(this.models[this.activeFloor]);
        let model = this[type + 'Models'][0].clone();
        if (type === 'window') {
            model.position.z = (this.basement.height + 1.5 + (this.activeFloor-1)*this.floorHeight);    
        } else if (type === 'stairs') {
            model.position.z = (this.basement.height + 1.2 + (this.activeFloor-1)*this.floorHeight); //вместо 1.5 должна прибавляться половина высоты по габаритам 
        } else if (type === 'door') {
            model.position.z = (this.basement.height + 1 + (this.activeFloor-1)*this.floorHeight); //вместо 1 должна прибавляться половина высоты 
        }

        this.models[this.activeFloor].add(model);
        appState.scene.add(this.models[this.activeFloor]);
    }

    preloadModels() {
        houseModels.window.map(window => {
            loadModel(window).then(model => {
                model.name = 'window';
                this.windowModels.push(model);
            });
        });
        houseModels.door.map(door => {
            loadModel(door).then(model => {
                model.name = 'door';
                this.doorModels.push(model);
            });
        });
        houseModels.stairs.map(stairs => {
            loadModel(stairs).then(model => {
                model.name = 'stairs';
                this.stairsModels.push(model);
            });
        });
    }

    preloadTextures() {
        houseTextures.basement.map(texture => {
            let tex = loadTexture(texture.url);
            let size = texture.size;
            this.basementTextures.push({
                texture: tex,
                size: size,
            });
        });
        houseTextures.outerWalls.map(texture => {
            let tex = loadTexture(texture.url);
            let size = texture.size;
            this.outerWallsTextures.push({
                texture: tex,
                size: size,
            });
        });
        houseTextures.roof.map(texture => {
            let tex = loadTexture(texture.url);
            let size = texture.size;
            this.roofTextures.push({
                texture: tex,
                size: size,
            });
        });
    }

    setModelsVisibility() {

    }

    
}

export { HouseObject };

function putDimensions( pointsGroup, vertices, stageName ) {
    console.log(appState);
    if (vertices.length>0) {
        if (appState['dimensions' + stageName]) pointsGroup.remove( appState['dimensions' + stageName] );
        appState['dimensions' + stageName] = createDimensions( vertices, stageName );
        pointsGroup.add( appState['dimensions' + stageName] );
    } else {
        return null;
    }
    
}

function deleteDimensions( pointsGroup, name ) {
    if (appState['dimensions' + name]) pointsGroup.remove( appState['dimensions' + name] );
    removeDimensions();
}

function makePointsGroup( vertices, opacity ) {

    let points = new THREE.Group();
    let point;
    for ( let i = 0; i < vertices.length - 6; i += 3 ) {
        point = drawDot( [vertices[i], vertices[i + 1], vertices[i + 2]] );
        points.add(point);
    }
    if (vertices.length === 6) {
        point = drawDot( [vertices[0], vertices[1], vertices[2]], opacity );
        points.add(point);
    } else {
        point = drawDot( [vertices[vertices.length - 6], vertices[vertices.length - 5], vertices[vertices.length - 4]], opacity ); //рисуем последнюю точку с заданной полупрозрачностью 
        points.add(point);
    }
    points.name = 'points';

    return points;
}

function buildStages( house ) {
    let model;
    const stagesModels = [];

    for (let i = 0; i < stages.length; i++) {
        let stageName = stages[i].name;
        if (house[stageName]) {
            if ( stageName === 'floors' ) {
                model = house.buildFloors();
            } 
            else if (stageName === 'roof') {
                model = drawRoof(house[stageName]);
            } else if (stageName === 'innerWalls') {
                // model = null;
                if (house.innerWalls) {model = house.buildInnerWalls3D();}
            } else if (stageName === 'veranda') {
                if (house.veranda) {model = house.verandaModel;}
            } else {
                model = drawObject(house[stageName]);  
            }
            
            if (model) {
                model.name = stageName + 'Model';
                if( i > 0) model.visible = false;
                stagesModels.push( model );
                console.log(stagesModels);
            }
        }
    }
    return stagesModels;
}

eventEmitter.onEvent('shapeChanged', ( data ) => appState.house.redrawPlan( data ));
eventEmitter.onEvent('shapeChangeEnd', ( data ) => appState.house.build( data ));

eventEmitter.onEvent('heightChanged', ( data ) => appState.house.changeObjHeight( data.stageName, data.height ));

// eventEmitter.onEvent('addInnerWalls', (data) => {
//     appState.house.buildInnerWalls2D();
//     appState.house.showInnerWalls(appState.house.activeFloor, '2D');
// });

//исправить
eventEmitter.onEvent('endInnerWalls', (data) => {
    // appState.house.buildInnerWalls3D()
    let floor = appState.house.activeFloor;
    let model = appState.house.innerWalls[floor].model3D;
    appState.scene.remove(appState.house.house3d);
    appState.house.innerWallsModel.remove(model);
    model = appState.house.buildWalls(floor);
    appState.house.innerWallsModel.add(model);
    appState.scene.add(appState.house.house3d);
    console.log(appState.house.house3d);
});

eventEmitter.onEvent('floorVisibility', ( data ) => appState.house.showCurrentFloor( data.value ));

eventEmitter.onEvent('stageChanged', (stageInfo) => appState.house.rebuildStage( stageInfo ));
eventEmitter.onEvent('changeView', (viewMode) => appState.house.changeVisability( viewMode ));
eventEmitter.onEvent('stageSwitched', (data) => appState.house.changeStageVisability( data ));
eventEmitter.onEvent('planEditMode', (data) => appState.house.changePointsVisability( data ));


eventEmitter.onEvent('materialChanged', (stageName) => appState.house.changeMaterial( stageName ));

eventEmitter.onEvent('clearScene', ( stageName ) => appState.house.clearScene( stageName ));
eventEmitter.onEvent('pointAdded', ( data ) => appState.house.makeNewPlan( data ));
eventEmitter.onEvent('pointAdding', ( data ) => appState.house.onNewPlanCreatingMouseMoving( data ));
eventEmitter.onEvent('endAddVertices', ( data ) => appState.house.onEndAddVertices( data ));

eventEmitter.onEvent('addModel', (data) => appState.house.addModel(data.modelType));




