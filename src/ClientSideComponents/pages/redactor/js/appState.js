import eventEmitter from './eventEmitter.js';
import changeView from './threeJsFunctions/changeView.js';
import {changeHatchVisibility, changeHatchCellSize } from './threeJsFunctions/changeHatch.js';
import {Display} from '../components/Display/Display.js';


let appState = {

    scene: undefined,
    house: undefined,
    housePrice: 0,
    houseTime: 0,
    sceneCamera: undefined,
    cameraOrtho: undefined,
    cameraPerspective: undefined,
    sceneControls: undefined,
    sceneHatch: undefined,
    hatchProp: {
        size: 100,
        cellSize: 1,
        colorCenterLine: 0xDDDDDD,
        colorGrid: 0xDDDDDD,
        visible: true,
    },
    changeState( state, data ) {
        eventEmitter.emitEvent(state, data);
        eventEmitter.emitEvent('stateChanged', {state, data} );
    }
}

eventEmitter.onEvent('changeView', (viewMode) => changeView(viewMode));
eventEmitter.onEvent('changeHatchVisibility', (hatchVisibility) => changeHatchVisibility(hatchVisibility));
eventEmitter.onEvent('changeHatchCellSize', (hatchCellsize) => changeHatchCellSize(hatchCellsize));

export default appState