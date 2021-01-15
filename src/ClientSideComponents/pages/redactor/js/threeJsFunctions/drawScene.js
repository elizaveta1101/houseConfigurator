// Не используется

import * as THREE from 'three';
import sceneTexture from '../../assets/cubeMap/cubeMapImages.js';
import { TrackballControls } from 'three/examples/jsm/controls/TrackballControls.js';
import { resizeRendererToDisplaySize } from './adaptiveWindow.js'
import { drawHatch } from './drawFunctions.js';
import { CSS2DRenderer } from "three/examples/jsm/renderers/CSS2DRenderer.js";
import appState from './../appState.js';
import Stats from 'three/examples/jsm/libs/stats.module.js';

function addLight(color, intensity, position, scene) {
  const light = new THREE.DirectionalLight(color, intensity);
  light.position.set(position[0], position[1], position[2]);
  scene.add(light);
}

// функция построения сцены и добавления на нее объектов
function drawScene(init, objects, hatching, hatchCellsize, bckgd, bckgdColor, camPos, rotate, zoom, camNear, camFar) {
  const canvas = document.querySelector('canvas');

  let scene = objects[0];
  // let camera = objects[1];
  let renderer = objects[2];
  let controls = objects[3];
  let hatch = objects[4];
  let labelRenderer = objects[5];
  let threeObjects = [];
 

  if (init) {                                                               // если запрос инициализации, то выставляем предустановленные значения
    scene = new THREE.Scene();
    appState.scene = scene;
    appState.stats = new Stats();
    appState.stats.dom.style.left = '220px'
    document.body.appendChild( appState.stats.dom );
    

    let cameraPerspective = new THREE.PerspectiveCamera(
      95,
      canvas.clientWidth / canvas.clientHeight,
      0.1,
      200
    );
    appState.cameraPerspective = cameraPerspective;
    appState.sceneCamera = appState.cameraPerspective;
    renderer = new THREE.WebGLRenderer({ canvas, alpha: true });
    renderer.setClearColor(0xEEEEEE);
    renderer.setSize(canvas.clientWidth, canvas.clientHeight);

    labelRenderer = new CSS2DRenderer();
    labelRenderer.domElement.style.position = 'absolute';
    labelRenderer.domElement.style.top = 0;
    labelRenderer.domElement.style.width = '100%';
    labelRenderer.domElement.id = 'labelRenderer';
    labelRenderer.domElement.className = 'labelRenderer';
    labelRenderer.setSize(canvas.clientWidth, canvas.clientHeight);
    let interactive = document.getElementsByClassName("interactive");
    interactive[0].append( labelRenderer.domElement );
    appState.labelRenderer = labelRenderer;
    labelRenderer.render(scene, appState.sceneCamera);

    addLight(0xFFFFFF, 0.5, [-5, 5, 5], scene);
    addLight(0xFFFFFF, 0.5, [-5, -5, 5], scene);
    addLight(0xFFFFFF, 1, [5, 5, 5], scene);

    const axes = new THREE.AxesHelper(20);
    scene.add(axes);

    scene.background = sceneTexture;
    
    appState.sceneCamera.position.set(1, 5, 3);
    appState.sceneCamera.lookAt(0, 0, 0);
    renderer.render(scene, appState.sceneCamera);

    // управление камерой с помощью мыши
    controls = new TrackballControls(appState.sceneCamera, labelRenderer.domElement);
    controls.target.set(0, 0, 0);
    controls.noPan = true;
    controls.rotateSpeed = 2;
    controls.update();

    if (hatching) {
      hatch = drawHatch(hatchCellsize);
    } else {
      hatch = null;
    }
  }
  else {                                                                     // иначе берем значения из переданных параметров
    if (bckgd === 0) {
      scene.background = null;
      renderer.setClearColor(bckgdColor);
    } else {
      scene.background = bckgd;
    }
    if (camPos != null) {
      appState.sceneCamera.position.set(camPos[0], camPos[1], camPos[2]);
    }
    controls.noRotate = rotate ? false : true;
    controls.noZoom = zoom ? false : true;
    if (camNear != null) { appState.sceneCamera.near = camNear; appState.sceneCamera.updateProjectionMatrix(); }
    if (camFar != null) { appState.sceneCamera.far = camFar; appState.sceneCamera.updateProjectionMatrix(); }

    if (hatching) {
      hatch = drawHatch(hatchCellsize);
    } else {
      hatch = null;
    }
    
    animate();
  }

  threeObjects.push(scene, appState.sceneCamera, renderer, controls, hatch, labelRenderer);
  return threeObjects;

  // анимация сцены
  function animate() {
    requestAnimationFrame(animate);

    // если изменен размер холста, то
    if (resizeRendererToDisplaySize(renderer)) {
      // обновление соотношения сторон холста в зависимости от сторон окна просмотра
      const canvas = renderer.domElement;
      appState.sceneCamera.aspect = canvas.clientWidth / canvas.clientHeight;
      appState.sceneCamera.updateProjectionMatrix();
      resizeRendererToDisplaySize(labelRenderer)
    }
 
    controls.update();
    // ограничения передвижения камеры
    appState.sceneCamera.up.set(0, 0, 1);
    if (appState.sceneCamera.rotation.x > (Math.pi / 2)) { appState.sceneCamera.rotation.x = Math.pi / 2; }
    if (appState.sceneCamera.position.z < 0) { appState.sceneCamera.position.z = 0; }

    renderer.render(scene, appState.sceneCamera);
    labelRenderer.render(scene, appState.sceneCamera);
    if( appState.stats) appState.stats.update();
  }
}
export default drawScene;