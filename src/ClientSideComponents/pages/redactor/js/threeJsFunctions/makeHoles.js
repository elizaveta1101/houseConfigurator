import { get } from 'http';
import * as THREE from 'three';
import {ThreeBSP} from 'three-js-csg-es6';
import appState from '../appState.js';
import { getArea, getInnerVertices, vectorAngle, pointToLineAttachment } from '../extraFunctions.js';

function checkModelPosition(model, modelType) {
    let currentPosition = [model.position.x, model.position.y, 0];
    if (modelType === 'window') {
        let limitModel = appState.house.outerWalls;
        // let vertices = [];
        // vertices.push(...limitModel.vertices);
        // for (let i=vertices.length-3; i>=0; i-=3) {
        //     vertices.push(limitModel.innerVertices[i], limitModel.innerVertices[i+1],limitModel.innerVertices[i+2]);
        // }
        // let data = checkPolygonAttachment(currentPosition, vertices);
        let line = getInnerVertices(limitModel.vertices, limitModel.width/2);
        let data = pointToLineAttachment (line, currentPosition, 0.2);
        let position, rotation;
        
        if (data.minPointX && data.minPointY) {
            position = [data.minPointX, data.minPointY, 0];
            let i=data.firstIndex;
            let point1 = [line[i], line[i+1], line[i+2]];
            let point2 = [line[i+3], line[i+4], line[i+5]];
            let vector = [point2[0]-point1[0], point2[1]-point1[1], point2[2]-point1[2]];
            let angle = Math.acos(vectorAngle(vector, [1,0,0]));
            if (vector[1]<0) {
                angle = Math.PI - angle;
                //возможны проблемы, если окно будет не симметричным (лицевая и задняя сторона окна разные)
            }
            rotation=angle;
        }
        // if (data) {
        if (position) {
            return {position, rotation};
        } else {
            return null;
        }
    } else if (modelType === 'door') {
        let limitModel1 = appState.house.outerWallsModel;
        let limitModel2 = appState.house.innerWallsModel;
    }
}
function checkPolygonAttachment(point, vertices) {
    let count = vertices.length/3;
    for (let i=0; i< (count-2)/2; i++) {
        let k = count-1-i;
        let point1 = [vertices[i*3], vertices[i*3+1], vertices[i*3+2]];
        let point2 = [vertices[(i+1)*3], vertices[(i+1)*3+1], vertices[(i+1)*3+2]];
        let point3 = [vertices[(k-1)*3], vertices[(k-1)*3+1], vertices[(k-1)*3+2]];
        let point4 = [vertices[k*3], vertices[k*3+1], vertices[k*3+2]];

        let S = getArea([...point1, ...point2, ...point3, ...point4, ...point1]);
        let S1 = getArea([...point1, ...point2, ...point3, ...point, ...point1]);
        let S2 = getArea([...point1, ...point, ...point3, ...point4, ...point1]);

        if (Math.abs(S) === (Math.abs(S1) + Math.abs(S2))) {
            //модель внутри 
            let vector = [point2[0]-point1[0], point2[1]-point1[1], point2[2]-point1[2]];
            let angle = Math.acos(vectorAngle(vector, [1,0,0]));
            if (vector[1]<0) {
                angle = Math.PI - angle;
                //возможны проблемы, если окно будет не симметричным (лицевая и задняя сторона окна разные)
            }

            // let angle = Number(Math.acos(vectorAngle(vector, [1,0,0])).toFixed(3));

            let A = [(point4[0]+point1[0])/2, (point4[1]+point1[1])/2, 0];
            let B = [(point3[0]+point2[0])/2, (point3[1]+point2[1])/2, 0];

            //если горизонтальная,
            //если вертикальная
            let posX, posY;
            if (A[0]===B[0]) {
                posX = A[0];
                posY = point[1];
            } else if (A[1]===B[1]) {
                posX = point[0];
                posY = A[1];
            } else {
                posX = point[0];
                posY = point[0]*(B[1]-A[1])/(B[0]-A[0]) - (A[0]*B[1]-B[0]*A[1])/(B[0]-A[0]);
            }
            posX.toFixed(3);
            posY.toFixed(3);
            let position = [Number(posX), Number(posY)];
            // let position = [posX, posY];
            return {rotation: angle , position};

        }
    }
    return null;
}

function getBoxPosition(models, modelType) {
    if (modelType === 'window') {

    }

}

function getBoxSizes(modelType) {
    if (modelType === 'window' || modelType === 'door') {
        return [null, appState.house.outerWalls.width, null];
    } else if (modelType === 'stairs') {
        if (appState.house.activeFloor === 'Подвал') {
            return [null, null, appState.house.basement.height];
        } else {
            return [null, null, appState.house.ceiling.height];
        }
    }
}


//model - модель, под которую вырезаем
//modelType - что вырезаем: окно, дверь, лестницу?
//boxSizes - размеры бокса, который будем вырезать, зависящие от внешних параметров (толщина стен, высота перекрытия)
//boxPosition - координаты мест, где вырезаем
function makeHoles(models, index, modelType, boxSizes, boxPosition) {

    //----------временно
    let activeFloor = appState.house.activeFloor;
    let walls,  wallPosition;
    if (activeFloor === 'Подвал') {

    } else if (activeFloor === 'Мансарда') {

    } else if (activeFloor === '1') {
        walls = appState.house.outerWallsModel.clone();
        wallPosition = walls.position;
        appState.house.outerWallsModel.children[0].visible = false;
        appState.house.outerWallsModel.children[2].visible = false;
    } else {
        let index = Number(activeFloor) - 2;
        console.log(appState.house.floorsModel);
        walls = appState.house.floorsModel.children[index].children[1].clone();
        wallPosition = appState.house.floorsModel.children[index].clone().position;
        wallPosition.z += appState.house.ceiling.height;
        appState.house.floorsModel.children[index].children[1].children[0].visible = false;
        appState.house.floorsModel.children[index].children[1].children[2].visible = false;
    }
    
    // let wallWidth = appState.house.outerWalls.width;
    // let wallPosition = walls.position;
    
    
    //----------конец временно-------------------
    
    let divBSP = [];
    models.children.map((model, i) => {
        if (model.name === 'window') {//временное условие
            let winClone = model.clone();
            let divObject;
            let scale = winClone.scale;
            let position = winClone.position;
            let rotation = winClone.rotation;
            while (true) {
                if (winClone.children[0].type === 'Mesh') {
                    let geometry = winClone.children[1].geometry;
                    if (geometry === 'BufferGeometry') {
                        geometry = new THREE.Geometry().fromBufferGeometry(geometry);
                    }
                    geometry.computeBoundingBox();
                    let bb = geometry.boundingBox;
                    let Width  = bb.max.x - bb.min.x;
                    let Height  = bb.max.y - bb.min.y;
                    let Depth  = bb.max.z - bb.min.z;
                    divObject = new THREE.Mesh(new THREE.BoxGeometry(boxSizes[0] ? boxSizes[0]: Width,
                                                                    boxSizes[1] ? boxSizes[1]: Height, 
                                                                    boxSizes[2] ? boxSizes[2]: Depth), 
                                                new THREE.MeshPhongMaterial({color: 0xff00000}));
                    break;
                }
                winClone = winClone.children[0];
            }
            //position x & y лжны получаться в результате выполнения функции, которая еще не написана

            if (i===index && boxPosition) {
                position.x = boxPosition[0];
                position.y = boxPosition[1];
                position.z = boxPosition[2];
                divObject.position.x = boxPosition[0];
                divObject.position.y = boxPosition[1];
                divObject.position.z = boxPosition[2]-wallPosition.z;
            } else {
                divObject.position.x = position.x;
                divObject.position.y = position.y;
                divObject.position.z = position.z-wallPosition.z;
            }
            
            if (!boxSizes[0]) {
                divObject.scale.x = scale.x;
            }
            if (!boxSizes[1]) {
                divObject.scale.y = scale.y;
            }
            if (!boxSizes[2]) {
                divObject.scale.z = scale.z;
            }

            divObject.rotation.x = rotation.x;
            divObject.rotation.y = rotation.y;
            divObject.rotation.z = rotation.z;
            divBSP.push(new ThreeBSP(divObject));
    
        }
    });
    
    
    // let walls = appState.house.outerWallsModel.clone();
    // let wallWidth = appState.house.outerWalls.width;
    // let wallPosition = walls.position;
    // appState.house.outerWallsModel.children[0].visible = false;
    // appState.house.outerWallsModel.children[2].visible = false;
    // appState.house.outerWallsModel.visible = false;

    // let wallClone = walls.children[0].clone();
    // let geometry = wallClone.geometry;
    // if (geometry === 'BufferGeometry') {
    //     geometry = new THREE.Geometry().fromBufferGeometry(geometry);
    // }
    // wallClone.geometry = geometry;
    // console.log(wallClone);
    // let wallBSP = new ThreeBSP(wallClone);
    
    if (divBSP.length>0) {
        appState.scene.children.map(child => {
            if (child.name === 'hole'+activeFloor) {
            appState.scene.remove(child);
            }
        });

        let outer = walls.children[0];
        let outerBSP = new ThreeBSP(outer);

        let inner = walls.children[2];
        let innerBSP = new ThreeBSP(inner); 

        let material = outer.material;
        divBSP.map(bsp => {
            outerBSP = outerBSP.subtract(bsp);
        });
        let inter = innerBSP.intersect(outerBSP);
        let result = outerBSP.subtract(inter).toMesh();
        result.name = 'hole'+activeFloor;
        result.material = material  ;
        result.material.side = THREE.DoubleSide;
        result.position.x = wallPosition.x; 
        result.position.y = wallPosition.y; 
        result.position.z = wallPosition.z; 
        console.log(result);
        appState.scene.add(result); 
    }
       
}

export {makeHoles, getBoxSizes, checkModelPosition};