import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
// import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFPromiseLoader.js';
import appState from '../../js/appState';

// function loadModel(url) {
//     const loader = new GLTFLoader();
//     loader.load( url, function ( gltf ) {
//         console.log(url);
//         let mesh = gltf.scene.children[0];
//         mesh.scale.x = 0.01;
//         mesh.scale.y = 0.01;
//         mesh.scale.z = 0.01;
//         mesh.rotation.x += (Math.PI/2);
//         return mesh;

//     }, undefined, function ( error ) {
//         console.error( error );
//     } );
// }

function modelLoader(url) {
    const loader = new GLTFLoader();
    return new Promise((resolve, reject) => {
      loader.load(url, data=> resolve(data), null, reject);
    });
}

async function loadModel(obj) {
    const gltfData = await modelLoader(obj.model);
    let mesh = gltfData.scene.children[0];

    mesh.scale.x = obj.scale[0]; //0.01;
    mesh.scale.y = obj.scale[1]; //0.05;
    mesh.scale.z = obj.scale[2]; //0.01;
    mesh.rotation.x += (Math.PI/2);
    return mesh;
}

export {loadModel};