import * as THREE from 'three';


function loadTexture(url) {
    const loader = new THREE.TextureLoader();
    // let texture = loader.load(url);
    // texture.wrapS = THREE.RepeatWrapping;
    // texture.wrapT = THREE.RepeatWrapping;
    // return texture;
    let texture = loader.load(url, (texture) => {
        texture.wrapS = THREE.RepeatWrapping;
        texture.wrapT = THREE.RepeatWrapping;
    });
    return texture;
}

export {loadTexture};