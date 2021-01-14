import { Vector3, Group } from 'three';
import { CSS2DObject } from 'three/examples/jsm/renderers/CSS2DRenderer.js';

function lineDimensions( data ) {
    let points = getVectors( data );
    let dimensions = [];
    for(let i = 0; i < points.length; i++ ) {
        if( points[i+1] ){
            let pointA = points[ i ];
            let pointB = points[ i + 1 ];
            let dimension = {};
            let distance = pointA.distanceTo( pointB );
            let angle = findLabelAngle(pointA, pointB );
            distance = Math.round( distance * 100 ) / 100;
            dimension.distance = distance;
            let center = getCenter( pointA, pointB );
            dimension.center = center;
            dimension.label = createLabel( center, distance, angle );
            dimensions.push( dimension );
        }
    }
    return dimensions;
}

function getVectors( data ) {
    let pointsArray;
    let itemSize;
    if( data.isLine ) {
        pointsArray = data.geometry.attributes.position.array;
        itemSize = data.geometry.attributes.position.itemSize;
    } else {
        if( Array.isArray(data) ) {
            pointsArray = data.slice();
            itemSize = 3;
        } else {
            console.error( 'data must be THREE.Line of array of coordinates' );
            return [];
        }

    }

    let points = [];
    for (let i = 0; i < pointsArray.length; i += itemSize ) {
        points.push( new Vector3( pointsArray[ i ], pointsArray[ i + 1 ], pointsArray[ i + 2 ]));
    }
    return points;
}

function getCenter( pointA, pointB ) {
    let target = new Vector3();
    return target.addVectors( pointA, pointB ).multiplyScalar( 0.5 );
}

function createLabel( position, text, angle ) {
    let wrapper = document.createElement( 'div' );
    wrapper.id = 'labelDivDimensions';
    let labelDiv = document.createElement( 'div' );
    labelDiv.className = 'labelDiv';
    labelDiv.id = 'labelDiv';
    labelDiv.textContent = text;
    labelDiv.style.width = '30px';
    labelDiv.style.height = '20px';
    labelDiv.style.borderRadius = '5px';
    labelDiv.style.textAlign = 'center';

    labelDiv.style.mozTransform = "rotate(" + angle + "deg)"; 
    labelDiv.style.msTransform = "rotate(" + angle + "deg)"; 
    labelDiv.style.oTransform = "rotate(" + angle + "deg)";
    labelDiv.style.transform = "rotate(" + angle + "deg)";

    labelDiv.style.backgroundColor = '#FFDEAD';
    wrapper.appendChild(labelDiv);

    let labelobject = new CSS2DObject( wrapper );
    labelobject.position.set( position.x, position.y, position.z );
    labelobject.rotation.z = Math.PI/6;
    return labelobject;
};

function findLabelAngle(pointA, pointB ) {
    let angle;
    const xA = pointA.x;
    const xB = pointB.x;
    const yA = pointA.y;
    const yB = pointB.y;
    if (xA > xB) {
        angle = (pointA.clone().sub(pointB.clone())).normalize().angleTo( new Vector3(1, 0, 0));
        if ( yA > yB ) {
                angle = -angle;
            }
    } else {
        angle = (pointB.clone().sub(pointA.clone())).normalize().angleTo( new Vector3(1, 0, 0));
        if ( yA < yB ) {
            angle = -angle;
        }
    }
    angle = 180 * angle / Math.PI;
    angle = Math.round( angle * 100 ) / 100;
    if (angle === 90 ) angle = -90
    return angle;
}

function removeDimensions() {
    let allLabelsToDelete = document.querySelectorAll('#labelDivDimensions');
    allLabelsToDelete.forEach(element => {
        element.remove();
    });
}

function createDimensions( model ) {
    removeDimensions();
    let dimensionsGroup = new Group();
    dimensionsGroup.name = 'dimensionsGroup';
    let dimensions = lineDimensions( model );
    dimensions.map( item => {
        dimensionsGroup.add( item.label );
    })
    return dimensionsGroup;
}

export { createDimensions, removeDimensions }