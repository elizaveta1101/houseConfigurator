import * as THREE from 'three';

function pick(normalizedPosition, points, camera) {

  let raycaster = new THREE.Raycaster();
  raycaster.setFromCamera(normalizedPosition, camera);
  let position = [];
  let object = {};
  const intersectedObjects = raycaster.intersectObjects(points.children);
  if (intersectedObjects.length) {
    position = [intersectedObjects[0].object.position.x, intersectedObjects[0].object.position.y, intersectedObjects[0].object.position.z];
    object = intersectedObjects[0].object;
    return { object, position };
  }
}
export default pick;