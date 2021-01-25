import * as THREE from 'three';
import sceneTexture from '../../assets/cubeMap/cubeMapImages.js';
import { TrackballControls } from 'three/examples/jsm/controls/TrackballControls.js';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { resizeRendererToDisplaySize } from './adaptiveWindow.js'
import { drawHatch } from './drawFunctions.js';
import { CSS2DRenderer } from "three/examples/jsm/renderers/CSS2DRenderer.js";
import appState from './../appState.js';
import { HouseObject } from '../HouseObject.js';


//-----test
// import {loadModel} from '../../assets/Models/modelLoader.js';
//---------

import interactiveClasses from '../../components/Interactive/Interactive.module.css';

function addLight(color, intensity, position) {
  const light = new THREE.DirectionalLight(color, intensity);
  light.position.set(position[0], position[1], position[2]);
  appState.scene.add(light);
}

function initScene() {
  let canvas = document.querySelector('canvas');
  let scene = new THREE.Scene();
  appState.scene = scene;

  let cameraPerspective = new THREE.PerspectiveCamera(
    95,
    canvas.clientWidth / canvas.clientHeight,
    0.1,
    100
  );
  cameraPerspective.position.set(-7, -7, 7);
  cameraPerspective.lookAt(0, 0, 0);
  cameraPerspective.updateProjectionMatrix();
  appState.cameraPerspective = cameraPerspective;

  let cameraOrtho = new THREE.OrthographicCamera(
    canvas.clientWidth / -1000,
    canvas.clientWidth / 1000,
    canvas.clientHeight / 1000,
    canvas.clientHeight / -1000,
    0.1,
    100
  );
  cameraOrtho.position.set(0, -0.001, 50);
  cameraOrtho.zoom = 0.1;
  cameraOrtho.lookAt(0, 0, 0);
  cameraOrtho.updateProjectionMatrix();
  appState.cameraOrtho = cameraOrtho;

  appState.sceneCamera = cameraPerspective;

  let renderer = new THREE.WebGLRenderer({ canvas, alpha: true });
  renderer.setClearColor(0xEEEEEE);
  renderer.setSize(canvas.clientWidth, canvas.clientHeight, false);
  appState.renderer = renderer;

  let labelRenderer = new CSS2DRenderer();
  labelRenderer.domElement.style.position = 'absolute';
  labelRenderer.domElement.style.top = 0;
  labelRenderer.domElement.style.width = '100%';
  labelRenderer.domElement.id = 'labelRenderer';
  labelRenderer.domElement.className = 'labelRenderer';
  labelRenderer.setSize(canvas.clientWidth, canvas.clientHeight);
  // let interactive = document.getElementsByClassName("interactive");
  let interactive = document.getElementsByClassName(interactiveClasses.interactive);
  interactive[0].append( labelRenderer.domElement );
  labelRenderer.render(appState.scene, appState.sceneCamera);
  appState.labelRenderer = labelRenderer;

  addLight(0xFFFFFF, 0.5, [-5, 5, 5]);
  addLight(0xFFFFFF, 1, [-5, -5, 5]);
  addLight(0xFFFFFF, 0.5, [5, 5, 5]);

  appState.scene.background = sceneTexture;

  // loadModel('../Models/window/1/scene.gltf');
  // console.log(scene); 

  appState.renderer.render(appState.scene, appState.sceneCamera);

  // управление камерой с помощью мыши
  let view3DControls = new TrackballControls(appState.cameraPerspective, labelRenderer.domElement);
  view3DControls.target.set(0, 0, 0);
  view3DControls.noPan = true;
  view3DControls.rotateSpeed = 2;
  appState.view3DControls = view3DControls;

  let view2DControls = new OrbitControls(appState.cameraOrtho, labelRenderer.domElement);
  view2DControls.target.set(0, 0, 0);
  // view2DControls.noPan = true;
  view2DControls.enableRotate = false;
  // view2DControls.noZoom = true;
  // view2DControls.panSpeed = 50;
  view2DControls.enabled = false;
  appState.view2DControls = view2DControls;

  appState.sceneControls = view3DControls;

  drawHatch(appState.hatchProp.size, appState.hatchProp.cellSize, appState.hatchProp.colorCenterLine, appState.hatchProp.colorGrid);
  appState.sceneHatch.visible = appState.hatchProp.visible;
  appState.scene.add(appState.sceneHatch);

  const axes = new THREE.AxesHelper(50);
  appState.scene.add(axes);

  //инициализировать хаус
  appState.house = new HouseObject();
  appState.house.build();
  appState.house.changeVisability('3D');

  appState.house.preloadModels();

  appState.scene.add(appState.house.house2d, appState.house.house3d);


  animate();
}

// анимация сцены
function animate() {
  requestAnimationFrame(animate);

  // если изменен размер холста, то
  if (resizeRendererToDisplaySize(appState.renderer, appState.labelRenderer)) {
    // обновление соотношения сторон холста в зависимости от сторон окна просмотра
    const canvas = appState.renderer.domElement;
    appState.cameraPerspective.aspect = canvas.clientWidth / canvas.clientHeight;
    appState.cameraOrtho.left = canvas.clientWidth / -1000;
    appState.cameraOrtho.right = canvas.clientWidth / 1000;
    appState.cameraOrtho.top = canvas.clientHeight / 1000;
    appState.cameraOrtho.bottom = canvas.clientHeight / -1000;
    appState.cameraPerspective.updateProjectionMatrix();
    appState.cameraOrtho.updateProjectionMatrix();
  }

  appState.sceneControls.update();
  // ограничения передвижения камеры
  appState.sceneCamera.up.set(0, 0, 1);
  if (appState.sceneCamera.rotation.x > (Math.PI / 2)) { appState.sceneCamera.rotation.x = Math.PI / 2; }
  if (appState.sceneCamera.position.z < 0) { appState.sceneCamera.position.z = 0; }

  appState.renderer.render(appState.scene, appState.sceneCamera);
  appState.labelRenderer.render(appState.scene, appState.sceneCamera);

}

export default initScene;