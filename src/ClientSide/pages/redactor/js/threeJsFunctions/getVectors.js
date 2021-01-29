import * as THREE from 'three';

function getVectors( vertices) {
    let vectors = [];
    for (let index = 0; index < vertices.length; index += 3) {
        vectors.push( new THREE.Vector3( vertices[ index ], vertices[ index + 1 ], vertices[ index + 2 ] ));
    }
return vectors;
}

export default getVectors 