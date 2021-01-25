import * as THREE from 'three';
import {ThreeBSP} from 'three-js-csg-es6';
import appState from '../appState.js';
import { changeObjCoord } from './changeObjCoord.js';
import pick from './pickHelper.js';
import searchPointIndex from './searchPointIndex.js';
import {makeHoles, getBoxSizes, checkModelPosition} from '../threeJsFunctions/makeHoles.js';
import {pointToLineAttachment} from '../extraFunctions.js';

function getCoord(event, camera) {
  const canvas = document.querySelector('canvas');
  let vec = new THREE.Vector3(); // create once and reuse
  let pos = new THREE.Vector3(); // create once and reuse
  let rect = canvas.getBoundingClientRect();
  let x, y;
  if (event.touches) {
    x = event.touches[0].clientX;
    y = event.touches[0].clientY;
  } else {
    x = event.clientX;
    y = event.clientY;
  }
  vec.set(
    ((x - rect.left) / canvas.width) * 2 - 1,
    - ((y - rect.top) / canvas.height) * 2 + 1,
    0.5);
  vec.unproject(camera);
  // vec.sub( camera.position ).normalize();
  // let distance = - camera.position.z / vec.z;
  // pos.copy( camera.position ).add( vec.multiplyScalar( distance ) );
  pos = vec;
  let coord = [pos.x, pos.y, 0];
  return coord;
}

function getCanvasRelativePosition(event, canvas) {
  const rect = canvas.getBoundingClientRect();
  let x, y;
  if (event.touches) {
    x = event.touches[0].clientX;
    y = event.touches[0].clientY;
  } else {
    x = event.clientX;
    y = event.clientY;
  }
  return {
    x: (x - rect.left) * canvas.width / rect.width,
    y: (y - rect.top) * canvas.height / rect.height,
  };
}

function setPickPosition(event, renderer) {
  let pickPosition = new THREE.Vector3();
  const canvas = renderer.domElement;
  const pos = getCanvasRelativePosition(event, canvas);
  pickPosition.x = (pos.x / canvas.width) * 2 - 1;
  pickPosition.y = (pos.y / canvas.height) * -2 + 1;  // note we flip Y
  return pickPosition;
}

function clearPickPosition() {
  // unlike the mouse which always has a position
  // if the user stops touching the screen we want
  // to stop picking. For now we just pick a value
  // unlikely to pick something
  let pickPosition = new THREE.Vector3();
  pickPosition.x = -100000;
  pickPosition.y = -100000;
  return pickPosition;
}

function chooseMouseFunction(e, editMode, mouseAction, data) {
  let mousePosition = getCoord(e, appState.sceneCamera);
  let stageName = data.stageName;
  if (stageName === 'basement') {
    if (editMode === 'add') {
      if (mouseAction === 'down') {
        e.preventDefault();
        if (e.button === 0) {
          let vertices = appState.house[stageName].vertices.slice();
          if (mousePosition[0] < vertices[0] + 0.2 &&
            mousePosition[0] > vertices[0] - 0.2 &&
            mousePosition[1] < vertices[1] + 0.2 &&
            mousePosition[1] > vertices[1] - 0.2 &&
            vertices.length > 3
          ) {
            mousePosition = [vertices[0], vertices[1], vertices[2]];
            appState.changeState('endAddVertices', { vertices });
            appState.editMode = 'edit';
          }
          vertices.push(...mousePosition);
          appState.house.setParametrs(stageName, vertices);
          appState.changeState('pointAdded', { vertices });
        }
        return null;
      } else if (mouseAction === 'move') {
        e.preventDefault();
        let vertices = appState.house[stageName].vertices.slice();
        vertices.push(...mousePosition);
        appState.changeState('pointAdding', { vertices: vertices, stageName: stageName });
        return null;
      } else if (mouseAction === 'up') {
        return null;
      }
    } else if (editMode === 'edit') {
      if (mouseAction === 'down') {
        e.preventDefault();
        if (e.button===0) {
          let sceneGroupPoints = appState.house.basement.points;
          console.log(sceneGroupPoints);
          let pickPosition = setPickPosition(e, appState.renderer);
          let picked = pick(pickPosition, sceneGroupPoints, appState.sceneCamera);
          let pointPos = [], index = -1;
          if (picked) {
            pointPos = picked.position;
            index = searchPointIndex(appState.house[stageName], pointPos);
            if (index !== -1) {
              picked.object.material.color.set(0xFF0000);
            }
          }
          data = {
            position: pointPos,
            index: index
          }
          return data;
        }
        return null;
      } else if (mouseAction === 'move') {
        if (data.index !== -1) {
          changeObjCoord(appState.house.basement, data.index, mousePosition);
          appState.changeState('shapeChanged', { stageName: 'basement', index: data.index});
        }
        return null;
      } else if (mouseAction === 'up') {
        if (e.button === 0) {
          if (data.index !== -1) {
            appState.house.basement.points.children[data.index / 3].material.color.set(0x000000);
          }
          data = {
            position: [],
            index: -1
          }
          return data;
        }
        return null;
      }
    }
  } else if (stageName === 'innerWalls') {
    //---------добавить проверку клика и его изменение (подстраиваем под фундамент)
    //-----------------------------------------------------------------------------
    let activeFloor = appState.house.activeFloor;
    let innerWalls = appState.house.innerWalls;
    let curveNumber = data.curveNumber;
    let continueCreation = data.continueCreation;
    if (editMode === 'add') {
      if (mouseAction === 'down') {
        //правый клик | двойное касание - меняем режим редактирования
        if (e.button === 2 || (e.touches && e.touches.length === 2)) {
          appState.editMode = 'edit';
          return null;
        } else
        //левый клик - добавляем новую точку
        if (e.button === 0) {
          continueCreation = true;
          let initialCurveNumber = curveNumber;
          let vertices;
          if (innerWalls[activeFloor].wallsVertices.length === 0) {
            curveNumber = 0;
          }
          if (innerWalls[activeFloor].wallsVertices[curveNumber]){
            vertices = innerWalls[activeFloor].wallsVertices[curveNumber].slice();
          } else {
            vertices = [];
          }
          
          if (vertices.length >= 6) {
            let last = vertices.length-3;
            if (mousePosition[0] < vertices[last] + 0.2 &&
              mousePosition[0] > vertices[last] - 0.2 &&
              mousePosition[1] < vertices[last+1] + 0.2 &&
              mousePosition[1] > vertices[last+1] - 0.2 
              ) {
                continueCreation = false;
                curveNumber++;
              }
          }
          if (continueCreation) {
            vertices.push(...mousePosition);
          }
          appState.changeState('pointAdded', { vertices: vertices, stageName: 'innerWalls', curveNumber: (initialCurveNumber>curveNumber) ? curveNumber : initialCurveNumber });
          return {continueCreation: continueCreation, curveNumber: curveNumber};
        }
      } else if (mouseAction === 'move') {
        if (continueCreation) {
          e.preventDefault();
          let vertices;
          if (innerWalls[activeFloor].wallsVertices[curveNumber]){
            vertices = innerWalls[activeFloor].wallsVertices[curveNumber].slice();
          } else {
            vertices = [];
          }
          vertices.push(...mousePosition);
          appState.changeState('pointAdding', { stageName: 'innerWalls', curveNumber: curveNumber, vertices: vertices});
          innerWalls[activeFloor].wallsVertices[curveNumber].pop();
          innerWalls[activeFloor].wallsVertices[curveNumber].pop();
          innerWalls[activeFloor].wallsVertices[curveNumber].pop();
          return null;
        }
      } else if (mouseAction === 'up') {
        return null;
      }
    } else if (editMode === 'edit') {
      if (mouseAction === 'down') {
        //правый клик | двойное касание - меняем режим редактирования
        if (e.button === 2 || (e.touches && e.touches.length === 2)) {
          appState.editMode = 'add';
          curveNumber = appState.house.innerWalls[activeFloor].wallsVertices.length;
          return {curveNumber};
        } else 
        //левый клик - выбираем точку для перетаскивания
        if (e.button === 0) {
          e.preventDefault();
          appState.house.innerWalls[activeFloor].points.children.map( (points,i)  => {
            //points - точки конкретной стены, i - номер контура на данном этаже
            let sceneGroupPoints = points;
            let pickPosition = setPickPosition(e, appState.renderer);
            let picked = pick(pickPosition, sceneGroupPoints, appState.sceneCamera);
            let pointPos = [], pointIndex = -1;
            if (picked) {
              pointPos = picked.position;
              let vertices = appState.house.innerWalls[activeFloor].wallsVertices[i];
              let obj= {vertices: vertices};
              pointIndex = searchPointIndex(obj, pointPos);
              if (pointIndex !== -1) {
                picked.object.material.color.set(0xFF0000);
                data = {
                  position: pointPos,
                  index: pointIndex,
                  curveNumber: i,
                }
              }
            }
            
          });
          return data;
          
        } 
        
        /*
        innerWalls[activeFloor].points.children[i].children - path to points
        innerWalls = {
          "1": {
            model2D:
            model3D:
            points: group = {
              children: [0], [1]
                [x] -> children = [point, point]
            }
            rooms:
            wallsVertices: [0], [1]
            wideWallsVertices: [0], [1]
            width:
          },
          ...,
          "Подвал": {

          },
          plan -> (house2d)
        }
        innerWallsModel -> (house3d)
        */
      } else if (mouseAction === 'move') {
        if (data.index !== -1) {
          let index = data.index;
          let wall = appState.house.innerWalls[activeFloor].wallsVertices[data.curveNumber];
          wall[index] = mousePosition[0];
          wall[index + 1] = mousePosition[1];
          wall[index + 2] = mousePosition[2];
          appState.changeState('shapeChanged', { stageName: 'innerWalls', curveNumber: curveNumber, index: index});
        }
      } else if (mouseAction === 'up') {
        if (data.index !== -1) {
          appState.house.innerWalls[activeFloor].points.children[data.curveNumber].children[data.index / 3].material.color.set(0x000000);
        }
        data = {
          position: [],
          index: -1
        }
        return data;
      }
    }

  } else if (stageName === 'veranda') {
    if (editMode === 'add') {
      if (mouseAction === 'down') {
        e.preventDefault();
        if (e.button === 0) {
          let vertices = appState.house.verandaBasement.vertices.slice();
          console.log(vertices);
          if (mousePosition[0] < vertices[0] + 0.2 &&
            mousePosition[0] > vertices[0] - 0.2 &&
            mousePosition[1] < vertices[1] + 0.2 &&
            mousePosition[1] > vertices[1] - 0.2 &&
            vertices.length > 3
          ) {
            mousePosition = [vertices[0], vertices[1], vertices[2]];
            appState.changeState('endAddVertices', { vertices, stageName: stageName});
            appState.editMode = 'edit';
            console.log('edit');
          }
          let line = appState.house.basement.vertices;
          let pointPosition = mousePosition;
          if (vertices.length < 6) {
            let newPoint = pointToLineAttachment(line, mousePosition);
            pointPosition = [newPoint.minPointX, newPoint.minPointY, 0];
          }
          vertices.push(...pointPosition);
          appState.house.setParametrs(stageName, vertices);
          appState.changeState('pointAdded', { vertices, stageName: stageName });
        }
        return null;
      } else if (mouseAction === 'move') {
        e.preventDefault();
        let vertices = appState.house.verandaBasement.vertices.slice();
        let line = appState.house.basement.vertices;
        let pointPosition = mousePosition;
        if (vertices.length < 6) {
          let newPoint = pointToLineAttachment(line, mousePosition);
          pointPosition = [newPoint.minPointX, newPoint.minPointY, 0];
        }
        vertices.push(...pointPosition);
        appState.changeState('pointAdding', { vertices: vertices, stageName: stageName });
        return null;
      } else if (mouseAction === 'up') {
        return null;
      }
    } else if (editMode === 'edit') {
      if (mouseAction === 'down') {
        e.preventDefault();
        if (e.button===0) {
          let sceneGroupPoints = appState.house[stageName].points;
          let pickPosition = setPickPosition(e, appState.renderer);
          let picked = pick(pickPosition, sceneGroupPoints, appState.sceneCamera);
          let pointPos = [], index = -1;
          if (picked) {
            pointPos = picked.position;
            index = searchPointIndex(appState.house.verandaBasement, pointPos);
            if (index !== -1) {
              picked.object.material.color.set(0xFF0000);
            }
          }
          data = {
            position: pointPos,
            index: index
          }
          return data;
        }
        return null;
      } else if (mouseAction === 'move') {
        if (data.index !== -1) {
          changeObjCoord(appState.house.verandaBasement, data.index, mousePosition);
          appState.changeState('shapeChanged', data);
        }
        return null;
      } else if (mouseAction === 'up') {
        if (e.button === 0) {
          if (data.index !== -1) {
            appState.house[stageName].points.children[data.index / 3].material.color.set(0x000000);
          }
          data = {
            position: [],
            index: -1
          }
          return data;
        }
        return null;
      }
    }
  } else if (stageName === 'interior') {
    let activeFloor = appState.house.activeFloor;
    if (mouseAction === 'down') {
      e.preventDefault();
      if (e.button===0 && appState.house.viewMode==='2D') {
        // let sceneGroup = appState.house.windows[activeFloor];
        let sceneGroup = appState.house.models[activeFloor];
        let pickPosition = setPickPosition(e, appState.renderer);
        pickPosition.z = 100;
        let picked = pick(pickPosition, sceneGroup, appState.sceneCamera, true);
        let pointPos = [], index = -1;
        if (picked) {
          pointPos = picked.position;
          // appState.house.windows[activeFloor].children.map((model, i) => {
          appState.house.models[activeFloor].children.map((model, i) => {
            if (model.position.x === pointPos[0] &&
                model.position.y === pointPos[1] 
              ) {
                index = i;
              }
          });
        }
        data = {
          position: pointPos,
          index: index
        }
        return data;
      }
      return null;
    } else if (mouseAction === 'move') {
      if (data.index !== -1) {
        // let windows = appState.house.windows[activeFloor];
        let models = appState.house.models[activeFloor];
        let model = models.children[data.index];
        model.position.x = mousePosition[0];
        model.position.y = mousePosition[1];
        
        let boxPosition = null;
        models.children.map(model => {
          let result = checkModelPosition(model, 'window');
          if (!result) {
            model.rotation.z=0;
          } else {
            model.rotation.z=result.rotation;
            boxPosition = [result.position[0], result.position[1], model.position.z];
            model.position.x = result.position[0];
            model.position.y = result.position[1];
          }
        });
        
        let index = data.index;
        makeHoles(models, index, 'window', getBoxSizes('window'), boxPosition);

      }
      return null;
    } else if (mouseAction === 'up') {
      if (e.button === 0) {
        data = {
          position: [],
          index: -1
        }
        return data;
      }
      return null;
    }
    
  }
}

export { getCoord, setPickPosition, clearPickPosition, chooseMouseFunction };
