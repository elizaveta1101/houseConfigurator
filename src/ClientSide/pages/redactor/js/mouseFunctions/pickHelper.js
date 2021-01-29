import * as THREE from 'three';

function pick(normalizedPosition, points, camera, complexObject) {

  let raycaster = new THREE.Raycaster();
  raycaster.setFromCamera(normalizedPosition, camera);
  let position = [];
  let object = {};
  const intersectedObjects = raycaster.intersectObjects(points.children, complexObject ? true : false);
  if (intersectedObjects.length) {
    if (complexObject) {
      let obj=intersectedObjects[0].object;
      while (true) {
        if (obj.parent.type === 'Group') {
          position = [obj.position.x, obj.position.y];
          break;
        }
        obj = obj.parent;
      }
    } else {
      position = [intersectedObjects[0].object.position.x, intersectedObjects[0].object.position.y, intersectedObjects[0].object.position.z];
    }
    object = intersectedObjects[0].object;
    return { object, position };
  }
}
export default pick;