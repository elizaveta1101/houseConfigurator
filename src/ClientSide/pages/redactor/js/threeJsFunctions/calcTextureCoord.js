import * as THREE from 'three';

function calcTextureCoord (geometry, obj, surface) {
  // let length = obj.vertices.length;
  let xTexSize = obj.textureSize[0];
  let yTexSize = obj.textureSize[1];
  let roofAngle = obj.height;  //компенсация наклона крыши при наложении текстур. Сжимает тектуру по оси Y

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
  else if (surface === 'не используется') { // заменено на roof1
    let vertices = [];
    roofAngle = roofAngle * 0.45;
    for (let i = 0; i < geometry.faces.length; i++) {
      vertices.push(geometry.vertices[geometry.faces[i].a]);
      vertices.push(geometry.vertices[geometry.faces[i].b]);
      vertices.push(geometry.vertices[geometry.faces[i].c]);
    }
    for (let i = 0; i < vertices.length - 2; i += 3) {
      let texScale = textureRoofScale(i, vertices);
      if (texScale.coord === 'x') {
        geometry.faceVertexUvs[0].push(
        [ new THREE.Vector2((vertices[i].x + texScale.xOffset) / xTexSize, (vertices[i].z + texScale.zOffset) / (yTexSize - roofAngle)), new THREE.Vector2((vertices[i + 1].x + texScale.xOffset) / xTexSize, (vertices[i + 1].z + texScale.zOffset) / (yTexSize - roofAngle)), new THREE.Vector2((vertices[i + 2].x + texScale.xOffset) / xTexSize, (vertices[i + 2].z + texScale.zOffset) / (yTexSize - roofAngle)), ],
        );
      }
      else {
        if (texScale.coord === 'y') {
          geometry.faceVertexUvs[0].push(
          [ new THREE.Vector2((vertices[i].y + texScale.yOffset) / xTexSize, (vertices[i].z + texScale.zOffset) / (yTexSize - roofAngle)), new THREE.Vector2((vertices[i + 1].y + texScale.yOffset) / xTexSize, (vertices[i + 1].z + texScale.zOffset) / (yTexSize - roofAngle)), new THREE.Vector2((vertices[i + 2].y + texScale.yOffset) / xTexSize, (vertices[i + 2].z + texScale.zOffset) / (yTexSize - roofAngle)), ],
          );
        }
      }
    }
  }
  else if (surface === 'roof2') {
    let vertices = [];
    roofAngle = roofAngle * 0.2;
    for (let i = 0; i < geometry.faces.length; i++) {
      vertices.push(geometry.vertices[geometry.faces[i].a]);
      vertices.push(geometry.vertices[geometry.faces[i].b]);
      vertices.push(geometry.vertices[geometry.faces[i].c]);
    }
    for (let i = 0; i < vertices.length - 3; i += 6) {
      let texScale = textureRoofScale(i, vertices);
      if (texScale.coord === 'x') {
        geometry.faceVertexUvs[0].push(
        [ new THREE.Vector2((vertices[i].x + texScale.xOffset) / xTexSize, (vertices[i].z + texScale.zOffset) / (yTexSize - roofAngle)), new THREE.Vector2((vertices[i + 1].x + texScale.xOffset) / xTexSize, (vertices[i + 1].z + texScale.zOffset) / (yTexSize - roofAngle)), new THREE.Vector2((vertices[i + 2].x + texScale.xOffset) / xTexSize, (vertices[i + 2].z + texScale.zOffset) / (yTexSize - roofAngle)), ],
        [ new THREE.Vector2((vertices[i + 3].x + texScale.xOffset) / xTexSize, (vertices[i + 3].z + texScale.zOffset) / (yTexSize - roofAngle)), new THREE.Vector2((vertices[i + 4].x + texScale.xOffset) / xTexSize, (vertices[i + 4].z + texScale.zOffset) / (yTexSize - roofAngle)), new THREE.Vector2((vertices[i + 5].x + texScale.xOffset) / xTexSize, (vertices[i + 5].z + texScale.zOffset) / (yTexSize - roofAngle)), ]
        );
      }
      else {
        if (texScale.coord === 'y') {
          geometry.faceVertexUvs[0].push(
          [ new THREE.Vector2((vertices[i].y + texScale.yOffset) / xTexSize, (vertices[i].z + texScale.zOffset) / (yTexSize - roofAngle)), new THREE.Vector2((vertices[i + 1].y + texScale.yOffset) / xTexSize, (vertices[i + 1].z + texScale.zOffset) / (yTexSize - roofAngle)), new THREE.Vector2((vertices[i + 2].y + texScale.yOffset) / xTexSize, (vertices[i + 2].z + texScale.zOffset) / (yTexSize - roofAngle)), ],
          [ new THREE.Vector2((vertices[i + 3].y + texScale.yOffset) / xTexSize, (vertices[i + 3].z + texScale.zOffset) / (yTexSize - roofAngle)), new THREE.Vector2((vertices[i + 4].y + texScale.yOffset) / xTexSize, (vertices[i + 4].z + texScale.zOffset) / (yTexSize - roofAngle)), new THREE.Vector2((vertices[i + 5].y + texScale.yOffset) / xTexSize, (vertices[i + 5].z + texScale.zOffset) / (yTexSize - roofAngle)), ]
          );
        }
      }
    }
  }
  else if (surface === 'roof1') {
    let vertices = [];
    roofAngle = roofAngle * 0.2;
    for (let i = 0; i < geometry.faces.length; i++) {
      vertices.push(geometry.vertices[geometry.faces[i].a]);
      vertices.push(geometry.vertices[geometry.faces[i].b]);
      vertices.push(geometry.vertices[geometry.faces[i].c]);
    }
    // 2_____1
    //  \   /
    //   \ /
    //    3

    for (let i = 0; i < vertices.length; i += 3) {
      let texScale = textureRoof1Scale(i, vertices)
      geometry.faceVertexUvs[0].push(
        [ new THREE.Vector2(texScale.scaleX/xTexSize, texScale.scaleY/yTexSize), new THREE.Vector2(0, texScale.scaleY/yTexSize), new THREE.Vector2(texScale.scaleZ/xTexSize, 0) ],
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

function textureRoofScale(i, vertices) {
    let xMax = -1000;
    let xMin = 1000;
    let yMax = -1000;
    let yMin = 1000;
    let zMax = -1000;
    let zMin = 1000;
    let xOffset = 0;
    let yOffset = 0;
    let zOffset = 0;
    let coord = '';
    for (let j=i; j < i + 3; j++) {
        if (vertices[j].x > xMax) {xMax = vertices[j].x;}
        if (vertices[j].x < xMin) {xMin = vertices[j].x;}
        if (vertices[j].y > yMax) {yMax = vertices[j].y;}
        if (vertices[j].y < yMin) {yMin = vertices[j].y;}
        if (vertices[j].z > zMax) {zMax = vertices[j].z;}
        if (vertices[j].z < zMin) {zMin = vertices[j].z;}
    }
    xOffset = -xMin;
    yOffset = -yMin;
    zOffset = -zMin;
    if ((vertices[i].x === vertices[i + 1].x) || (vertices[i].x === vertices[i + 2].x) || (vertices[i + 1].x === vertices[i + 2].x)) {coord = 'y';}
    else {coord = 'x';}

    return{xOffset: xOffset, yOffset: yOffset, zOffset: zOffset, coord: coord};
}

function textureRoof1Scale(i, vertices) {
  const x1 = vertices[i].x;
  const y1 = vertices[i].y;
  const x2 = vertices[i + 1].x;
  const y2 = vertices[i + 1].y;
  const x3 = vertices[i + 2].x;
  const y3 = vertices[i + 2].y;
  const height = vertices[i + 2].z;
  const scaleX = Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2));
  const length = Math.abs((y2 - y1) * x3 - (x2 - x1) * y3 + x2 * y1 - y2 * x1)/Math.sqrt(Math.pow(y2 - y1,2) + Math.pow(x2 - x1, 2));
  const scaleY = Math.sqrt(Math.pow(length, 2) + Math.pow(height, 2));
  const length13 = Math.sqrt(Math.pow(x1 - x3, 2) + Math.pow(y1 - y3, 2));
  const length23 = Math.sqrt(Math.pow(x2 - x3, 2) + Math.pow(y2 - y3, 2));
  const plan13 = Math.sqrt(Math.pow(length13, 2) - Math.pow(length, 2));
  const plan23 = Math.sqrt(Math.pow(length23, 2) - Math.pow(length, 2));
  let scaleZ = plan23;
  if (plan23 < plan13 && plan13 > scaleX) {
    scaleZ = -plan23;
  }
  console.log(scaleX, scaleY, scaleZ);
  return {scaleX: scaleX, scaleY: scaleY, scaleZ: scaleZ};
}

export { calcTextureCoord };