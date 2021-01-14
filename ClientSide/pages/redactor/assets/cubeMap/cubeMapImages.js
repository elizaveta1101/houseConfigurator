import px from './pos-x.jpg';
import py from './pos-y.jpg';
import pz from './pos-z.jpg';
import nx from './neg-x.jpg';
import ny from './neg-y.jpg';
import nz from './neg-z.jpg';
import * as THREE from 'three';

const loader = new THREE.CubeTextureLoader();
let sceneTexture = loader.load([
    px,
    nx,
    py,
    ny,
    pz,
    nz,
]);

export default sceneTexture;