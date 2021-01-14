import concrete from './basement/2.jpg';
import * as THREE from 'three';

const loader = new THREE.TextureLoader();
let concreteTexture = loader.load(concrete);

function loadTexture(url) {
    const loader = new THREE.TextureLoader();
    let texture = loader.load(url);
    texture.wrapS = THREE.RepeatWrapping;
    texture.wrapT = THREE.RepeatWrapping;
    return texture;
}

export {concreteTexture, loadTexture};