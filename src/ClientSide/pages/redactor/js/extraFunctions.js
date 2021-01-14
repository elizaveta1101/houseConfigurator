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
    let absV1 = Math.sqrt(v1[0] * v1[0] + v1[1] * v1[1]);
    let absV2 = Math.sqrt(v2[0] * v2[0] + v2[1] * v2[1]);
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

export {getBisectorPoint, absVector, getArea, convertToCoor, getPolygonCenter };