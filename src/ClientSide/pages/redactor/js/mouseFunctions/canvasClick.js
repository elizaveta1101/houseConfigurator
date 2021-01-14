import {getCoord} from './mouseFunctions.js'

function canvasClick (camera, canvasLinePoints, e) {
  let linePoints = canvasLinePoints.slice();
  // let startPoint = getMouseCoord(e, canvas);
  let startPoint = getCoord(e, camera);
  linePoints.push(startPoint[0], startPoint[1], startPoint[2]);
  return linePoints;
}
export default canvasClick;