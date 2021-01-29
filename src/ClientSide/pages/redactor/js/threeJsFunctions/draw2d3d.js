// // Не используется

// import drawScene from './drawScene.js'
// import sceneTexture from '../../assets/cubeMap/cubeMapImages.js';

// function draw2d3d(isInit, canvasObjects, view, hatching, hatchCellsize) {
//   let objectsOut;
//   let background;
//   let bckgdColor;
//   let rotate;
//   let zoom;
//   let camPos;
//   let camNear;
//   let camFar;

//   if (isInit) {
//     objectsOut = drawScene(isInit, canvasObjects, hatching, hatchCellsize);
//     return objectsOut;
//   } 
//   else {
//     if (view ==='2D') {
//       background = 0;
//       bckgdColor = 0xFFFFFF;
//       canvasObjects[3].enabled = false;
//       // rotate = false;
//       // zoom = false;
//       camPos = [0, -0.001, 1];
//       camNear = 0.99;
//       camFar = 1.5;
//     }
//     if (view === '3D') {
//       background = sceneTexture;
//       canvasObjects[3].enabled = true;
//       rotate = true;
//       zoom = true;
//       camPos = [1, 1, 0.5];
//       camNear = 0.1;
//       camFar = 100;
//     }
//     objectsOut = drawScene(isInit, canvasObjects, hatching, hatchCellsize, background, bckgdColor, camPos, rotate, zoom, camNear, camFar);
//     return objectsOut;
//   }
// };
// export default draw2d3d;