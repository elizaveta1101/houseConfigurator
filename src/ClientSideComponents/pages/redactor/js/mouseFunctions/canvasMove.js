import {getCoord} from './mouseFunctions.js'

function canvasMove (camera, canvasLinePoints, e) {
  
  let linePoints = canvasLinePoints.slice();
  // let endPoint = getMouseCoord(e, canvas);
  let endPoint = getCoord(e, camera);
  linePoints.push(endPoint[0], endPoint[1], endPoint[2]);
  return linePoints;
}
export default canvasMove;