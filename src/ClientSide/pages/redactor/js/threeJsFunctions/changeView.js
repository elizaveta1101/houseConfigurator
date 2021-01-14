import appState, {} from './../../js/appState.js';
import sceneTexture from '../../assets/cubeMap/cubeMapImages.js';

function changeView(viewMode) {
  if (viewMode === '3D') {
    appState.sceneCamera = appState.cameraPerspective;
    appState.sceneControls.enabled = false;
    appState.sceneControls = appState.view3DControls;
    appState.sceneControls.enabled = true;
    appState.scene.background = sceneTexture;
  }
  else {
    if (viewMode === '2D') {
      appState.sceneCamera = appState.cameraOrtho;
      appState.sceneControls.enabled = false;
      appState.sceneControls = appState.view2DControls;
      appState.sceneControls.enabled = true;
      appState.scene.background = null;
      appState.renderer.setClearColor(0xFFFFFF);
    }
  }
}

export default changeView;