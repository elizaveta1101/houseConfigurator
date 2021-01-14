import getVectors from './getVectors.js';
import {calcTextureCoord} from './calcTextureCoord.js';
import * as earcut from 'earcut';
import * as THREE from 'three';

function redrawObject( sceneObject, houseObject, vertices, pointIndex ) {
    let sideSurface, upSurface, innerSurface;

    sideSurface = sceneObject.children[0];
    upSurface = sceneObject.children[1];
    if ( sceneObject.children.length === 3 ) {
        innerSurface = sceneObject.children[ 2 ];
    } else {
        innerSurface = null;
    }

    let upVectors = getVectors( houseObject.upVertices );

    upVectors.map( ( vector, index ) => {
        upSurface.geometry.vertices[index] = vector.clone();
    });

    let upSurfaceArray = [];
    upSurface.geometry.vertices.map((vertex) => {
        upSurfaceArray.push(vertex.x, vertex.y, vertex.z);
    });

    let triangulation = [];
    if (innerSurface) {
        triangulation = earcut(upSurfaceArray, sideSurface.geometry.vertices.length, 3);        
    } else {
        triangulation = earcut(upSurfaceArray, null, 3);
    }
    
    upSurface.geometry.faces = [];
    for (let i = 0; i < triangulation.length; i+=3) {
        upSurface.geometry.faces.push(new THREE.Face3(triangulation[i], triangulation[i + 1], triangulation[i+2]));
    }

    upSurface.geometry.computeFaceNormals();
    calcTextureCoord(upSurface.geometry, houseObject, 'up');

    upSurface.geometry.verticesNeedUpdate = true;
    upSurface.geometry.elementsNeedUpdate = true;
    upSurface.geometry.normalsNeedUpdate = true;
    upSurface.geometry.uvsNeedUpdate = true;

    let sideSurfaceVertices = sideSurface.geometry.vertices;
    let vectors = getVectors( vertices );
    if ( pointIndex ) {
        sideSurface.geometry.vertices[ pointIndex * 2 ].x = vectors[ pointIndex ].x;
        sideSurface.geometry.vertices[ pointIndex * 2 ].y = vectors[ pointIndex ].y;
        sideSurface.geometry.vertices[ pointIndex * 2 + 1 ].x = vectors[ pointIndex ].x;
        sideSurface.geometry.vertices[ pointIndex * 2 + 1 ].y = vectors[ pointIndex ].y;
        sideSurface.geometry.vertices[ pointIndex * 2 + 1 ].z = houseObject.height;
    } else {
        for ( let i = 0, j = 0; i < sideSurfaceVertices.length; i += 2, j ++ ) {
            sideSurface.geometry.vertices[ i ].x = vectors[ j ].x;
            sideSurface.geometry.vertices[ i ].y = vectors[ j ].y;
            sideSurface.geometry.vertices[ i + 1 ].x = vectors[ j ].x;
            sideSurface.geometry.vertices[ i + 1 ].y = vectors[ j ].y;
            sideSurface.geometry.vertices[ i + 1 ].z = houseObject.height;
        }
    }

    sideSurface.geometry.computeFaceNormals();
    calcTextureCoord(sideSurface.geometry, houseObject);

    sideSurface.geometry.verticesNeedUpdate = true;
    sideSurface.geometry.elementsNeedUpdate = true;
    sideSurface.geometry.normalsNeedUpdate = true;
    sideSurface.geometry.uvsNeedUpdate = true;

    if ( innerSurface ) {

        let innerVectors = getVectors( houseObject.innerVertices );
        let innerSurfaceVertices = innerSurface.geometry.vertices;
        if ( pointIndex ) {
            innerSurface.geometry.vertices[ pointIndex * 2 ].x = innerVectors[ pointIndex ].x;
            innerSurface.geometry.vertices[ pointIndex * 2 ].y = innerVectors[ pointIndex ].y;
            innerSurface.geometry.vertices[ pointIndex * 2 + 1 ].x = innerVectors[ pointIndex ].x;
            innerSurface.geometry.vertices[ pointIndex * 2 + 1 ].y = innerVectors[ pointIndex ].y;
            innerSurface.geometry.vertices[ pointIndex * 2 + 1 ].z = houseObject.height;
        } else {
            for (let i = 0, j = 0; i < innerSurfaceVertices.length; i += 2, j ++ ) {
                innerSurface.geometry.vertices[ i ].x = innerVectors[ j ].x;
                innerSurface.geometry.vertices[ i ].y = innerVectors[ j ].y;
                innerSurface.geometry.vertices[ i + 1 ].x = innerVectors[ j ].x;
                innerSurface.geometry.vertices[ i + 1 ].y = innerVectors[ j ].y;
                innerSurface.geometry.vertices[ i + 1 ].z = houseObject.height;
            }
        }

        innerSurface.geometry.computeFaceNormals();
        
        innerSurface.geometry.verticesNeedUpdate = true;
        innerSurface.geometry.elementsNeedUpdate = true;
        innerSurface.geometry.normalsNeedUpdate = true;
        innerSurface.geometry.uvsNeedUpdate = true;
    }


}


export { redrawObject }