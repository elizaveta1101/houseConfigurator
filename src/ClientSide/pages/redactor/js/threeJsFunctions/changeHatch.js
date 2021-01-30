import appState, {} from './../../js/appState.js';
import { drawHatch } from './drawFunctions.js';

function changeHatchVisibility(hatchVisibility) {
  appState.hatchProp.visible = hatchVisibility;
  appState.sceneHatch.visible = hatchVisibility;
}

function changeHatchCellSize(hatchCellsize) {
  appState.hatchProp.cellSize = hatchCellsize;
  drawHatch(appState.hatchProp.size, hatchCellsize, appState.hatchProp.colorCenterLine, appState.hatchProp.colorGrid);
}

export {changeHatchVisibility, changeHatchCellSize};