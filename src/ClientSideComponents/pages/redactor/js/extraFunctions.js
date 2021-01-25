import { RGBA_ASTC_10x10_Format } from "three";

function getBisectorPoint(a, b, x, y, width, round) {
    let c = [], d = [];
    let k = (round === 'left') ? -1 : 1;
    let absA = absVector(a);
    a[0] = a[0] / absA;
    a[1] = a[1] / absA;
    let absB = absVector(b);
    b[0] = b[0] / absB;
    b[1] = b[1] / absB;
    c.push(k * (a[0] + b[0]), k * (a[1] + b[1]));
    if ((-a[0] * b[1] - b[0] * (-a[1])) > 0) {
        c[0] = -c[0];
        c[1] = -c[1];
    }
    let cos2A = vectorAngle(a, b);
    d = setVectorLength(cos2A, width, c);
    d[0] = d[0] + x;
    d[1] = d[1] + y;
    return d;
}

function absVector(a) {
    return Math.sqrt(a[0] * a[0] + a[1] * a[1]);
}

function getArea(vertices) {
    let s = 0;
    for (let i = 0; i < vertices.length - 4; i += 3) {
        s += vertices[i] * vertices[i + 4] - vertices[i + 3] * vertices[i + 1]; //x1*y2-x2*y1
    }
    return s / 2;
}

function vectorAngle(v1, v2) {
    let vectorMult = v1[0] * v2[0] + v1[1] * v2[1];
    // let absV1 = Math.sqrt(v1[0] * v1[0] + v1[1] * v1[1]);
    let absV1 = absVector(v1);
    // let absV2 = Math.sqrt(v2[0] * v2[0] + v2[1] * v2[1]);
    let absV2 = absVector(v2);
    let result = vectorMult / (absV1 * absV2);
    if (result === -0) {
        return 0;
    }
    return result;
}

function setVectorLength(cos, width, vec) {
    let sinA, k, result = [];
    if (cos !== 0) {
        sinA = Math.sqrt((1 - cos) / 2);
        width = width / sinA;
    }
    k = width * Math.sqrt(2 / (Math.pow(vec[0], 2) + Math.pow(vec[1], 2)));
    result.push(k * vec[0], k * vec[1]);
    return result;
}

function convertToCoor(val) {
    return val / 1; //было 10 вместо 1
}

function getPolygonCenter(vertices) {
    let x = 0,
        y = 0;
    let s = getArea(vertices);
    for (let i = 0; i < vertices.length - 4; i += 3) {
        x += (vertices[i] + vertices[i + 3]) * (vertices[i] * vertices[i + 4] - vertices[i + 1] * vertices[i + 3]);
        y += (vertices[i + 1] + vertices[i + 4]) * (vertices[i] * vertices[i + 4] - vertices[i + 1] * vertices[i + 3]); 
    }
    x /= 6 * s;
    y /= 6 * s;
/*
    // Определение местоположения барицентра для конечного множества точек
    for (let i = 0; i < vertices.length - 3; i += 2) {
        x += (vertices[i]);
        y += (vertices[i+1]);
    }
    x /= vertices.length;
    y /= vertices.length;
*/
    return [x, y, vertices[2]];
}


function getPolygons(vertices) {
    // let result=[],
    //     count=1,
    //     number=0,
    //     length=vertices.length/3,
    //     mainTurn=getArea(vertices)>0 ? 'left' : 'right',
    //     lastTurn=mainTurn,
    //     currentTurn='',
    //     k=0, i=1,
    //     a={}, b={};
    //     result[0]=[k, i];
    // while (i<length-2) {
    //     for (let j=i+1; j<length-1; j++) {
    //         a.x=vertices[i*3]-vertices[k*3];
    //         a.y=vertices[i*3+1]-vertices[k*3+1];
    //         b.x=vertices[j*3]-vertices[i*3];
    //         b.y=vertices[j*3+1]-vertices[i*3+1];
    //         currentTurn=getTurn(a,b);
    //         if (currentTurn===0) {
    //             result[0].push(j);
    //         }
    //         if (currentTurn===mainTurn || (currentTurn===0 && lastTurn === mainTurn)) {
    //             result[0].push(j);
    //             k=i; i=j;
    //             if (number !== 0) {
    //                 number=0;
    //                 result[count].push(result[count][0]);
    //                 count++;
    //             }
    //             break;
    //         } else if (lastTurn === 0) {
    //             if (number !== 0) {
    //                 number=0;
    //                 result[count].push(result[count][0]);
    //                 count++;
    //             }
    //             k=j-1;
    //             i=j;
    //             break;
    //         } else {
    //             if (number === 0) {
    //                 result[count]=[];
    //                 // result[count].push(k);
    //                 result[count].push(i);
    //             }
    //             result[count].push(j);
    //             number++;
    //         }
            
    //         lastTurn=currentTurn;
            
    //     }
    // }
    // result[0].push(result[0][0]);
    // console.log(vertices);
    // console.log(result);
    // return result;
}

function getTurn(a,b) {
    let mult = a.x*b.y - a.y*b.x;
    if (mult > 0) {
        return 'left';
    } else if (mult === 0) {
        return 0;
    } else if (mult < 0) {
        return 'right';
    }
}

function pointToLineAttachment (lineVertices, pointCoord) {
    let minDistance = 1000;
    let minPointX;
    let minPointY;
    for (let i = 0; i < lineVertices.length - 3; i += 3) {
        let a = lineVertices[i + 1] - lineVertices[i + 4];
        let b = lineVertices[i + 3] - lineVertices[i];
        let c = lineVertices[i] * lineVertices[i + 4] - lineVertices[i + 3] * lineVertices[i + 1];
        let distance = Math.abs(a * pointCoord[0] + b * pointCoord[1] + c) / Math.sqrt(Math.pow(a, 2) + Math.pow(b, 2));
        if (distance < minDistance) {
            minDistance = distance;
            minPointX = (b * (b * pointCoord[0] - a * pointCoord[1]) - a * c) / (Math.pow(a, 2) + Math.pow(b, 2));
            minPointY = (a * (-b * pointCoord[0] + a * pointCoord[1]) - b * c) / (Math.pow(a, 2) + Math.pow(b, 2));
            if (minPointX > lineVertices[i] && minPointX > lineVertices[i + 3]) {
                if (lineVertices[i] > lineVertices[i + 3]) {
                    minPointX = lineVertices[i];
                }
                else {
                    minPointX = lineVertices[i + 3];
                }
            }
            else if (minPointX < lineVertices[i] && minPointX < lineVertices[i + 3]) {
                if (lineVertices[i] < lineVertices[i + 3]) {
                    minPointX = lineVertices[i];
                }
                else {
                    minPointX = lineVertices[i + 3];
                }
            }
            if (minPointY > lineVertices[i + 1] && minPointY > lineVertices[i + 4]) {
                if (lineVertices[i + 1] > lineVertices[i + 4]) {
                    minPointY = lineVertices[i + 1];
                }
                else {
                    minPointY = lineVertices[i + 4];
                }
            }
            else if (minPointY < lineVertices[i + 1] && minPointY < lineVertices[i + 4]) {
                if (lineVertices[i + 1] < lineVertices[i + 4]) {
                    minPointY = lineVertices[i + 1];
                }
                else {
                    minPointY = lineVertices[i + 4];
                }
            }
        }
    }
    return ({minPointX: minPointX, minPointY: minPointY});
}

export {getBisectorPoint, absVector, vectorAngle, getArea, convertToCoor, getPolygonCenter, getPolygons, pointToLineAttachment };