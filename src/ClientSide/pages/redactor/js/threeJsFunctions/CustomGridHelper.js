import * as THREE from 'three';
import appState from './../appState.js'

function drawGridHelper (size, divisions, color1, color2) {

  size = size / 2 || 10;
  divisions = divisions / 2 || 10;
  color1 = new THREE.Color( color1 !== undefined ? color1 : 0x444444 );
  color2 = new THREE.Color( color2 !== undefined ? color2 : 0x888888 );

  const center = divisions / 2;
  const step = size / divisions;
  const halfSize = size / 2;

  const vertices = [], colors = [];

  for ( let i = 0, j = 0, k = - halfSize; i <= divisions; i ++, k += step ) {

    vertices.push( - halfSize, k, -0.001, halfSize, k, -0.001 );
    vertices.push( k, - halfSize, -0.001, k, halfSize, -0.001 );

    const color = i === center ? color1 : color2;

    color.toArray( colors, j ); j += 3;
    color.toArray( colors, j ); j += 3;
    color.toArray( colors, j ); j += 3;
    color.toArray( colors, j ); j += 3;

  }
  const geometry = new THREE.BufferGeometry();
  geometry.setAttribute( 'position', new THREE.Float32BufferAttribute( vertices, 3 ) );
  geometry.setAttribute( 'color', new THREE.Float32BufferAttribute( colors, 3 ) );

  const material = new THREE.LineBasicMaterial( { vertexColors: true, toneMapped: false } );

  const quad1GridHelper = new THREE.LineSegments( geometry, material );
  // quad1GridHelper.rotateZ(Math.PI*2);
  quad1GridHelper.position.set(halfSize, halfSize, 0);

  const quad2GridHelper = new THREE.LineSegments( geometry, material );
  quad2GridHelper.rotateZ(Math.PI/2);
  quad2GridHelper.position.set(-halfSize, halfSize, 0);

  const quad3GridHelper = new THREE.LineSegments( geometry, material );
  quad3GridHelper.rotateZ(Math.PI);
  quad3GridHelper.position.set(-halfSize, -halfSize, 0);

  const quad4GridHelper = new THREE.LineSegments( geometry, material );
  quad4GridHelper.rotateZ(Math.PI*3/2);
  quad4GridHelper.position.set(halfSize, -halfSize, 0);

  let quadGridHelpers = [quad1GridHelper, quad2GridHelper, quad3GridHelper, quad4GridHelper];
  return quadGridHelpers;
}

function initGridHelper (size, divisions, color1, color2) {
  let quadGridHelpers = drawGridHelper (size, divisions, color1, color2);

  let customGridHelper = new THREE.Group();
  customGridHelper.name = 'sceneHatch';
  for (let i=0; i<quadGridHelpers.length; i++) {
    customGridHelper.add(quadGridHelpers[i]);
  }
  appState.sceneHatch = customGridHelper;
}

function redrawGridHelper (size, divisions, color1, color2) {
  let quadGridHelpers = drawGridHelper (size, divisions, color1, color2);

  let customGridHelper = appState.sceneHatch;
  for (let i=0; i<quadGridHelpers.length; i++) {
    customGridHelper.children[i] = quadGridHelpers[i];
  }
  appState.sceneHatch = customGridHelper;
}

export {initGridHelper, redrawGridHelper}