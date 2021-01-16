// import { drawObject, drawLine, drawDot } from './drawFunctions.js';
// import * as THREE from 'three';
// import stages from '../stagesStructure.js';
// import { createDimensions, removeDimensions } from './dimensions.js';
// import appState from '../appState.js';

// function drawHouse(viewMode, editMode, house, stageId, scene, objects, hatch, pointIndex) {
//     //TODO remove scene clearing
//     while (scene.children.length > objects) {
//         scene.remove(scene.children[scene.children.length - 1]);
// 	}
	
// 	//TODO move to scene initiation
//     if (hatch) {
//         scene.add(hatch);
//     }

//     let stageName;
//     let group = new THREE.Group();
//     let model;

//     for (let i = 0; i <= stageId; i++) {
//         stageName = stages[i].name;
//         if (house[stageName]) {

//             if (viewMode === '2D') { //отрисовка дома в виде чертежа
//                 if (house[stageName].vertices) {
//                     model = drawLine(house[stageName].vertices);
//                     group.add(model);
//                     if (editMode === 'add' || editMode === 'edit') {
//                         let vertices = house[stageName].vertices;
//                         if (!(vertices.length < 4 && vertices[0] === 0 && vertices[1] === 0 && vertices[2] === 0)) {
//                             let points = new THREE.Group();
//                             let point;
//                             for (let i = 0; i < vertices.length; i += 3) {
//                                 point = drawDot([vertices[i], vertices[i + 1], vertices[i + 2]]);
//                                 if ( i === pointIndex || ( pointIndex === 0 && i === (vertices.length-3) ) ) {
//                                     point.material.color.set(0xFF0000);
//                                 } 
//                                 points.add(point);
//                             }
//                             points.name='points';
//                             appState.pointsPlan = points;
//                             group.add(points);
//                         }
//                         scene.add( createDimensions( model ) );
//                     }
//                 }
//                 if (house[stageName].innerVertices) {
//                     model = drawLine(house[stageName].innerVertices);
//                     group.add(model);
//                 }


//             } else if (viewMode === '3D') { //отрисовка дома в 3д
//                 removeDimensions();
//                 if (stageName === 'floors') {
//                     let translation = house.outerWalls.translation;
//                     translation[2] += house.outerWalls.height;
//                     for (let j = 0; j < house[stageName] - 1; j++) {
//                         model = drawObject(house.basement, translation);
//                         translation[2] += house.basement.height;
//                         group.add(model);
//                         model = drawObject(house.outerWalls, translation);
//                         translation[2] += house.outerWalls.height;
//                         group.add(model);
//                     }
//                 } else {
//                     model = drawObject(house[stageName]);
//                 }
//             }
//             group.add(model);
//         }
//     }
//     group.name='house';
    
//     scene.add(group);
//     console.log(scene);
// }


// export default drawHouse;