import * as THREE from 'three';

function getCoord(event, camera) {
  const canvas = document.querySelector('canvas');
    let vec = new THREE.Vector3(); // create once and reuse
    let pos = new THREE.Vector3(); // create once and reuse
    let rect = canvas.getBoundingClientRect();
    let x,y;
    if (event.touches) {
      x=event.touches[0].clientX;
      y=event.touches[0].clientY;
    } else {
      x=event.clientX;
      y=event.clientY;
    }
    vec.set(
        ( (x - rect.left) / canvas.width ) * 2 - 1,
        - ( (y - rect.top) / canvas.height ) * 2 + 1,
        0.5 );
    vec.unproject( camera );
    // vec.sub( camera.position ).normalize();
    // let distance = - camera.position.z / vec.z;
    // pos.copy( camera.position ).add( vec.multiplyScalar( distance ) );
    pos = vec;
    let coord = [pos.x, pos.y, 0];
    return coord;
}

function getCanvasRelativePosition(event, canvas) {
  const rect = canvas.getBoundingClientRect();
  let x,y;
  if (event.touches) {
    x=event.touches[0].clientX;
    y=event.touches[0].clientY;
  } else {
    x=event.clientX;
    y=event.clientY;
  }
  return {
    x: (x - rect.left) * canvas.width  / rect.width,
    y: (y - rect.top ) * canvas.height / rect.height,
  };
}
 
function setPickPosition(event, renderer) {
  let pickPosition = new THREE.Vector3();
  const canvas = renderer.domElement;
  const pos = getCanvasRelativePosition(event, canvas);
  pickPosition.x = (pos.x / canvas.width ) *  2 - 1;
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

export {getCoord, setPickPosition, clearPickPosition};
