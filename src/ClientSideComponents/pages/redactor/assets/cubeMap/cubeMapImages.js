// import px from './pos-x.jpg';
// import py from './pos-y.jpg';
// import pz from './pos-z.jpg';
// import nx from './neg-x.jpg';
// import ny from './neg-y.jpg';
// import nz from './neg-z.jpg';

// import px from './1/px.jpg';
// import py from './1/py.jpg';
// import pz from './1/pz.jpg';
// import nx from './1/nx.jpg';
// import ny from './1/ny.jpg';
// import nz from './1/nz.jpg';

import px from './2/px.jpg';
import py from './2/py.jpg';
import pz from './2/pz.jpg';
import nx from './2/nx.jpg';
import ny from './2/ny.jpg';
import nz from './2/nz.jpg';
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