import * as THREE from 'three';

function calcTextureCoord (geometry, obj, surface) {
  // let length = obj.vertices.length;
  let xTexSize = obj.textureSize[0];
  let yTexSize = obj.textureSize[1];

  geometry.faceVertexUvs[0] = [];
  // if (fill === 'fun') {
  //   let texScale = texturePolygonScale(geometry.vertices);
  //   for (let i = 0; i < length / 3 - 1; i++) {

  //     // добавление текстурных координат. формула для расчета: координата вершины / (общая длина стороны полигона*длина стороны текстуры) + 0.5
  //     geometry.faceVertexUvs[0].push(
  //     [ new THREE.Vector2(geometry.vertices[length / 3].x / (texScale.xLength*xTexSize) + 0.5, geometry.vertices[length / 3].y / (texScale.yLength*yTexSize) + 0.5), new THREE.Vector2(geometry.vertices[i + 1].x / (texScale.xLength*xTexSize) + 0.5, geometry.vertices[i + 1].y / (texScale.yLength*yTexSize) + 0.5), new THREE.Vector2(geometry.vertices[i].x / (texScale.xLength*xTexSize) + 0.5, geometry.vertices[i].y / (texScale.yLength*yTexSize) + 0.5) ],
  //     );
  //   }
  // }
  if (surface === 'up') {
    let vertices = [];
    // for (let i = 0; i < triangulation.length; i++) {
    //   vertices.push(geometry.vertices[triangulation[i]]);
    // }
    for (let i = 0; i < geometry.faces.length; i++) {
      vertices.push(geometry.vertices[geometry.faces[i].a]);
      vertices.push(geometry.vertices[geometry.faces[i].b]);
      vertices.push(geometry.vertices[geometry.faces[i].c]);
    }
    //вычисления для масштабирования текстурных координат
    let texScale = texturePolygonScale(vertices);
    for (let i = 0; i < vertices.length; i += 3) {
      // добавление текстурных координат. формула для расчета: (координата вершины / общая длина стороны полигона + (1 - максимальная координата / общая длина стороны полигона)) * (общая длина стороны полигона / длина стороны текстуры)
      geometry.faceVertexUvs[0].push(
      [ new THREE.Vector2((vertices[i].x / texScale.xLength + texScale.xTranslation)*(texScale.xLength/xTexSize), (vertices[i].y / texScale.yLength + texScale.yTranslation)*(texScale.yLength/yTexSize)), new THREE.Vector2((vertices[i + 1].x / texScale.xLength + texScale.xTranslation)*(texScale.xLength/xTexSize), (vertices[i + 1].y / texScale.yLength + texScale.yTranslation)*(texScale.yLength/yTexSize)), new THREE.Vector2((vertices[i + 2].x / texScale.xLength + texScale.xTranslation)*(texScale.xLength/xTexSize), (vertices[i + 2].y / texScale.yLength + texScale.yTranslation)*(texScale.yLength/yTexSize)) ]
      );
    }
  }
  else {
    for (let i = 0; i < obj.vertices.length * 2 / 3 - 3; i += 2) {
      //вычисления для масштабирования текстурных координат
      let texScale = textureSurfaceScale(i, geometry.vertices);

      // добавление текстурных координат. формула для расчета: длина стороны полигона/длина стороны текстуры
      geometry.faceVertexUvs[0].push(
          [ new THREE.Vector2(texScale.xyScale/xTexSize, 0), new THREE.Vector2(texScale.xyScale/xTexSize, texScale.zScale/yTexSize), new THREE.Vector2(0, texScale.zScale/yTexSize) ],
          [ new THREE.Vector2(texScale.xyScale/xTexSize, 0), new THREE.Vector2(0, texScale.zScale/yTexSize), new THREE.Vector2(0, 0) ],
      );
    }
  }
  geometry.elementsNeedUpdate = true;
}

function textureSurfaceScale(i, vertices) {
    let xMax = -1000;
    let xMin = 1000;
    let yMax = -1000;
    let yMin = 1000;
    let zMax = -1000;
    let zMin = 1000;
    let xLength = 0;
    let yLength = 0;
    let xyScale = 1;
    let zScale = 1;
    for (let j=i; j < i + 4; j++) {
        if (vertices[j].x > xMax) {xMax = vertices[j].x;}
        else {if (vertices[j].x < xMin) {xMin = vertices[j].x;}}
        if (vertices[j].y > yMax) {yMax = vertices[j].y;}
        else {if (vertices[j].y < yMin) {yMin = vertices[j].y;}}
        if (vertices[j].z > zMax) {zMax = vertices[j].z;}
        else {if (vertices[j].z < zMin) {zMin = vertices[j].z;}}
    }
    xLength = xMax - xMin;
    yLength = yMax - yMin;
    xyScale = Math.sqrt(Math.pow(xLength, 2) + Math.pow(yLength, 2));
    zScale = zMax - zMin;

    return{xyScale : xyScale, zScale: zScale};
}

function texturePolygonScale(vertices) {
    let xMax = -1000;
    let xMin = 1000;
    let yMax = -1000;
    let yMin = 1000;
    let xLength = 1;
    let yLength = 1;
    let xTranslation = 0;
    let yTranslation = 0;
    for (let i=0; i < vertices.length; i++) {
        if (vertices[i].x > xMax) {xMax = vertices[i].x;}
        if (vertices[i].x < xMin) {xMin = vertices[i].x;}
        if (vertices[i].y > yMax) {yMax = vertices[i].y;}
        if (vertices[i].y < yMin) {yMin = vertices[i].y;}
    }
    xLength = xMax - xMin;
    yLength = yMax - yMin;
    xTranslation = 1 - (xMax/xLength);
    yTranslation = 1 - (yMax/yLength);

    // console.log(xLength, yLength, xTranslation, yTranslation);

    return {xLength : xLength, yLength: yLength, xTranslation: xTranslation, yTranslation: yTranslation};
}

export { calcTextureCoord };