import * as THREE from 'three';
import appState from '../appState.js';
import * as extraFunctions from '../extraFunctions.js';
import {
    initGridHelper,
    redrawGridHelper
} from './CustomGridHelper.js';
import {
    calcTextureCoord
} from './calcTextureCoord.js';
import * as earcut from 'earcut';
import { BackSide, RGBA_ASTC_10x5_Format } from 'three';



//отрисовка 3д-объекта
function drawObject(obj, translation) {
    if (obj) {
        const vertices = obj.vertices,
            upVertices = obj.upVertices,
            color = obj.color,
            texture = obj.texture;

        // const scaleCoef = 5;
        const translate = translation ? translation : obj.translation;
        const surface = new THREE.Group();
        const geometry = new THREE.Geometry();

        // const material = new THREE.MeshPhongMaterial({ color,  });
        const material = new THREE.MeshPhongMaterial({
            color,
            map: texture,
        });
        material.side = THREE.DoubleSide;
        let upPolygon;
        let length = vertices.length;
        //добавляем вершины
        for (let i = 0; i < length; i += 3) {
            geometry.vertices.push(new THREE.Vector3(vertices[i], vertices[i + 1], vertices[i + 2]));
            if (obj.innerVertices.length === 0) {
                geometry.vertices.push(new THREE.Vector3(upVertices[i], upVertices[i + 1], upVertices[i + 2]));
            } else {
                geometry.vertices.push(new THREE.Vector3(vertices[i], vertices[i + 1], obj.height));
            }
        }

        //определяем боковые грани
        for (let i = 0; i < length * 2 / 3 - 3; i += 2) {
            geometry.faces.push(
                new THREE.Face3(i, i + 1, i + 3),
                new THREE.Face3(i, i + 3, i + 2)
            );
        }

        //добавление текстурных координат
        if (texture) {
            calcTextureCoord(geometry, obj);
        }

        //расчет нормалей
        geometry.computeFaceNormals();

        if (obj.innerVertices.length === 0) {
            const sideSurface = new THREE.Mesh(geometry, material);
            upPolygon = drawPolygon(obj, 'fun');

            surface.add(sideSurface, upPolygon);

        } else {
            const outerSurface = new THREE.Mesh(geometry, material);
            const innerGeometry = new THREE.Geometry();
            const innerVertices = obj.innerVertices;

            for (let i = 0; i < length - 2; i += 3) {
                innerGeometry.vertices.push(new THREE.Vector3(innerVertices[i], innerVertices[i + 1], innerVertices[i + 2]));
                innerGeometry.vertices.push(new THREE.Vector3(innerVertices[i], innerVertices[i + 1], obj.height));
            }

            //определяем боковые грани
            for (let i = 0; i < length * 2 / 3 - 3; i += 2) {
                innerGeometry.faces.push(
                    new THREE.Face3(i, i + 1, i + 3),
                    new THREE.Face3(i, i + 3, i + 2)
                );
            }

            //добавление текстурных координат
            if (texture) {
                calcTextureCoord(innerGeometry, obj);
            }

            innerGeometry.computeFaceNormals();
            const innerSurface = new THREE.Mesh(innerGeometry, material);
            upPolygon = drawPolygon(obj, 'strip');

            surface.add(outerSurface, upPolygon, innerSurface);

        }
        surface.position.set(translate[0], translate[1], translate[2]);
        return surface;
    } else {
        return null;
    }

}

function drawRoof(obj) {
    const vertices = obj.vertices,
        color = obj.color,
        translate = obj.translation,
        texture = obj.texture,
        type = obj.type;

    const surface = new THREE.Group();
    const material = new THREE.MeshPhongMaterial({
        /*color,*/
        map: texture
    }); //map: texture 
    material.side = THREE.DoubleSide;

    let downSurface = new THREE.Geometry(), //плоскость выпуска
        sideSurface = new THREE.Geometry(), //сама крыша
        upSurface = new THREE.Geometry(); //верхняя плоскость (масштабируем основу)

    let roofHeight = 2; //высота крыши
    let roofUpScale = 1; // масштабирование верхней плоскости крыши
    let outerVertices = obj.getInnerVertices(-obj.width);
    let downVertices = [...outerVertices, ...vertices];
    const upVertices = obj.getInnerVertices(roofUpScale); //задание верхней плоскости крыши с масштабированием
    // Задание внутренней высоты крыши
    for (let i = 2; i < upVertices.length; i += 3) {
        upVertices[i] += roofHeight;
    }

    //доработать drawPolygon (сейчас только для верхних делает)
    //-------------------кусок из drawPolygon--------------------
    for (let i = 0; i < downVertices.length; i += 3) {
        downSurface.vertices.push(new THREE.Vector3(downVertices[i], downVertices[i + 1], downVertices[i + 2]));
    }
    let triangulation = [];
    triangulation = earcut(downVertices, [vertices.length / 3], 3);
    for (let i = 0; i < triangulation.length; i += 3) {
        downSurface.faces.push(new THREE.Face3(triangulation[i], triangulation[i + 1], triangulation[i + 2]));
    }
    downSurface.computeFaceNormals();

    //-------------------конец кусок из drawPolygon--------------------

    //соединение в одной вершине
    if (type === 1) {
        for (let i = 0; i < outerVertices.length; i += 3) {
            sideSurface.vertices.push(new THREE.Vector3(outerVertices[i], outerVertices[i + 1], outerVertices[i + 2]));
        }

        let controlPoint = extraFunctions.getPolygonCenter(outerVertices);
        controlPoint[2] = obj.height;
        sideSurface.vertices.push(new THREE.Vector3(controlPoint[0], controlPoint[1], controlPoint[2]));

        let length = outerVertices.length;
        //цикл по всем без последней, потому что у нас есть замыкающая точка, равная первой
        //у контрольной точки индекс будет равен length/3, потому что в массив вершин 
        //она не добавлялась, только в геометрию
        for (let i = 0; i < length / 3 - 1; i++) {
            sideSurface.faces.push(new THREE.Face3(i + 1, i, length / 3));
        }
        sideSurface.computeFaceNormals();
        calcTextureCoord(sideSurface, obj, 'roof' + type);
    }

    if (type === 2) {
        for (let i = 0; i < upVertices.length; i += 3) {
            upSurface.vertices.push(new THREE.Vector3(upVertices[i], upVertices[i + 1], upVertices[i + 2]));
        }
        let triangulation = [];
        triangulation = earcut(upVertices, null, 3);
        for (let i = 0; i < triangulation.length; i += 3) {
            upSurface.faces.push(new THREE.Face3(triangulation[i], triangulation[i + 1], triangulation[i + 2]));
        }
        calcTextureCoord(upSurface, obj, 'up');
        upSurface.computeFaceNormals();

        for (let i = 0; i < upVertices.length; i += 3) {
            sideSurface.vertices.push(new THREE.Vector3(outerVertices[i], outerVertices[i + 1], outerVertices[i + 2]));
            sideSurface.vertices.push(new THREE.Vector3(upVertices[i], upVertices[i + 1], upVertices[i + 2]));
        }
        for (let i = 0; i < sideSurface.vertices.length - 2; i += 2) {
            sideSurface.faces.push(
                new THREE.Face3(i, i + 1, i + 3),
                new THREE.Face3(i, i + 3, i + 2)
            );
        }
        sideSurface.computeFaceNormals();
        calcTextureCoord(sideSurface, obj, 'roof' + type);
    }

    if (type === 'veranda') {

        // for (let i = 0; i < 6; i += 3) {

        //     outerVertices[i] = vertices[i];
        // }
        // for (let i = outerVertices.length - 3; i < outerVertices.length; i ++) {outerVertices[i] = vertices[i];}
        // downVertices = [...outerVertices, ...vertices];

        // //доработать drawPolygon (сейчас только для верхних делает)
        // //-------------------кусок из drawPolygon--------------------
        // for (let i = 0; i < downVertices.length; i += 3) {
        //     downSurface.vertices.push(new THREE.Vector3(downVertices[i], downVertices[i + 1], downVertices[i + 2]));
        // }
        // let triangulation = [];
        // triangulation = earcut(downVertices, [vertices.length / 3], 3);
        // for (let i = 0; i < triangulation.length; i += 3) {
        //     downSurface.faces.push(new THREE.Face3(triangulation[i], triangulation[i + 1], triangulation[i + 2]));
        // }
        // downSurface.computeFaceNormals();

        //-------------------конец кусок из drawPolygon--------------------

        for (let i = 0; i < outerVertices.length; i += 3) {
            sideSurface.vertices.push(new THREE.Vector3(outerVertices[i], outerVertices[i + 1], outerVertices[i + 2]));
        }
        let controlPoint = [];
        controlPoint[0] = ((vertices[3] - vertices[0]) / 2) + vertices[0];
        controlPoint[1] = ((vertices[4] - vertices[1]) / 2) + vertices[1];
        // let controlPoint = extraFunctions.getPolygonCenter(outerVertices);
        controlPoint[2] = obj.height / 2;
        sideSurface.vertices.push(new THREE.Vector3(controlPoint[0], controlPoint[1], controlPoint[2]));

        let length = outerVertices.length;
        //цикл по всем без последней, потому что у нас есть замыкающая точка, равная первой
        //у контрольной точки индекс будет равен length/3, потому что в массив вершин 
        //она не добавлялась, только в геометрию
        for (let i = 0; i < length / 3 - 1; i++) {
            sideSurface.faces.push(new THREE.Face3(i + 1, i, length / 3));
        }
        sideSurface.computeFaceNormals();
        calcTextureCoord(sideSurface, obj, 'roof1');
    }

    surface.add(new THREE.Mesh(downSurface, material), new THREE.Mesh(sideSurface, material));
    if (upSurface) {
        surface.add(new THREE.Mesh(upSurface, material));
    }
    surface.name = 'roofModel';
    surface.position.set(translate[0], translate[1], translate[2]);
    return surface;
}

//отрисовка сложного полигона
//fill - 'strip', 'fun'
function drawPolygon(obj, fill) {
    const upVertices = obj.upVertices;
    const length = obj.upVertices.length;
    const color = obj.color;
    const texture = obj.texture;
    // const xTexSize = obj.textureSize[0];
    // const yTexSize = obj.textureSize[1];
    const geometry = new THREE.Geometry();

    const material = new THREE.MeshPhongMaterial({
        color,
        map: texture
    });
    material.side = THREE.DoubleSide;

    //добавляем вершины
    for (let i = 0; i < length - 2; i += 3) {
        geometry.vertices.push(new THREE.Vector3(upVertices[i], upVertices[i + 1], upVertices[i + 2]));
    }

    //TODO выбрать этот способ триангуляции взамен старого  после правки текстурных координат
    let triangulation = [];
    if (obj.innerVertices.length === 0) {
        triangulation = earcut(upVertices, null, 3);
    } else {
        triangulation = earcut(obj.upVertices, [obj.vertices.length / 3], 3);
    }

    for (let i = 0; i < triangulation.length; i += 3) {
        geometry.faces.push(new THREE.Face3(triangulation[i], triangulation[i + 1], triangulation[i + 2]));
    }

    //добавление текстурных координат
    ////////////////////////////////////////////////////////////////////
    if (texture) {
        calcTextureCoord(geometry, obj, 'up');
    }

    geometry.computeVertexNormals();
    const polygon = new THREE.Mesh(geometry, material);
    polygon.userData = {
        fillMethod: fill
    };
    return polygon;
}

function drawWideLine(vertices) {
    const geometry = new THREE.Geometry();

    const material = new THREE.MeshPhongMaterial({
        color: new THREE.Color('rgb(100,100,100)'),
    });
    material.side = THREE.DoubleSide;
    let length = vertices.length;
    //добавляем вершины
    for (let i = 0; i < length - 2; i += 3) {
        geometry.vertices.push(new THREE.Vector3(vertices[i], vertices[i + 1], vertices[i + 2]));
    }

    // for (let i = 0; i < length/3-3; i += 2) {
    //     geometry.faces.push(new THREE.Face3(i, i+1, i+2));
    //     geometry.faces.push(new THREE.Face3(i+1, i+3, i+2));
    // }
    let count = length/3;
    let lastNum = count-2
    for (let i = 0; i < (count-1)/2; i ++) {
        geometry.faces.push(new THREE.Face3(i, i+1, lastNum-1-i));
        geometry.faces.push(new THREE.Face3(i, lastNum-1-i, lastNum-i));
    }

    geometry.computeVertexNormals();
    const polygon = new THREE.Mesh(geometry, material);
    return polygon;
}

function drawDot(dotPos, opacity) {
    let windowWidth = document.documentElement.clientWidth;
    let size;
    if (!opacity) {opacity = 1;}
    if (windowWidth < 1024) {
        size = 0.5;
    } else {
        size = 0.2;
    }
    let geometry = new THREE.CircleBufferGeometry(size, 100);
    let material = new THREE.MeshBasicMaterial({
        color: 0x000000,
        opacity: opacity,
        transparent: true,
        polygonOffset: true,
        polygonOffsetFactor: -1.0,
        polygonOffsetUnits: -4.0
    });
    let dot = new THREE.Mesh(geometry, material);
    dot.position.x = dotPos[0];
    dot.position.y = dotPos[1];
    dot.position.z = dotPos[2];
    return dot;
} 

function clearScene(scene, objects) {
    while (scene.children.length > objects) {
        scene.remove(scene.children[scene.children.length - 1]);
    }
}

//вывод объекта в виде контура
function drawLine(vertices, color) {
    let material;
    if (color) {
        material = new THREE.LineBasicMaterial({
            color: color
        });
    } else {
        material = new THREE.LineBasicMaterial({
            color: 0x000000
        });
    }
    const geometry = new THREE.BufferGeometry();
    // vertices = vertices.map(el => el.toFixed(3));
    geometry.setAttribute(
        'position',
        new THREE.BufferAttribute(new Float32Array(vertices), 3));
    const line = new THREE.Line(geometry, material);

    return line;
}

// function drawHatch(size) {
//     const hatch = new THREE.Group();
//     let vertices=[];
//     for (let i=0; i<=10; i+=size) {
//         vertices.push(i, 10, -0.001);
//         vertices.push(i, -10, -0.001);
//         hatch.add(drawLine(vertices, 0xDDDDDD));
//         vertices=[];

//         vertices.push(-i, 10, -0.001);
//         vertices.push(-i, -10, -0.001);
//         hatch.add(drawLine(vertices, 0xDDDDDD));
//         vertices=[];

//         vertices.push(10, i, -0.001);
//         vertices.push(-10, i, -0.001);
//         hatch.add(drawLine(vertices, 0xDDDDDD));
//         vertices=[];

//         vertices.push(10, -i, -0.001);
//         vertices.push(-10 ,-i, -0.001);
//         hatch.add(drawLine(vertices, 0xDDDDDD));
//         vertices=[];
//     }
//     hatch.name='hatch';
//     return hatch;    
// }

function drawHatch(size, cellSize, color1, color2) {
    let gridCellSize = cellSize;
    let gridSize = size;
    let gridDivisions = gridSize / gridCellSize;
    let gridHelper = undefined;
    if (!appState.sceneHatch) {
        gridHelper = initGridHelper(gridSize, gridDivisions, color1, color2);
    } else {
        gridHelper = redrawGridHelper(gridSize, gridDivisions, color1, color2);
    }
}

function drawSphere(radius) {
    const mat = new THREE.MeshBasicMaterial({
        color: "red"
    });
    const geom = new THREE.SphereBufferGeometry(radius);
    const sphere = new THREE.Mesh(geom, mat);
    return sphere;
}


export {
    drawObject,
    drawPolygon,
    drawRoof,
    drawWideLine,
    drawLine,
    drawDot,
    clearScene,
    drawSphere,
    drawHatch
};