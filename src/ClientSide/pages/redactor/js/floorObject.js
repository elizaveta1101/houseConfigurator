import * as THREE from 'three';
import {getBisectorPoint, vectorAngle, getTurn} from './extraFunctions.js';

//класс для описания всего этажа (какие стены есть, какие комнаты)
class floorObject {
    constructor() {
        this.wallsVertices=[]; //массив с массивами координат блоков стен
        this.wideWallsVertices=[];
        this.rooms=[]; //массив объектов roomObject
        this.width = 0.25;
    }
    getWideWallsVertices() {
        let result=[];
        let x1, y1, x2, y2, x3, y3;
        this.wallsVertices.map((vertices, index) => {
            result[index] = [];
            let count = vertices.length/3;
            let wallArrayInside=[], wallArrayOuter=[];
            //переделываем наши контуры-линии в широкие полосы
            for (let i = 3; i < vertices.length - 3; i += 3) {
                x1 = vertices[i - 3]; y1 = vertices[i - 2];
                x2 = vertices[i]; y2 = vertices[i + 1];
                x3 = vertices[i + 3]; y3 = vertices[i + 4];
                let inside = getBisectorPoint([x1 - x2, y1 - y2], [x3 - x2, y3 - y2], x2, y2, this.width, 'left');
                let outer = getBisectorPoint([x1 - x2, y1 - y2], [x3 - x2, y3 - y2], x2, y2, this.width, 'right');
                wallArrayInside.push(inside[0], inside[1], vertices[2]);
                wallArrayOuter.push(outer[0], outer[1], vertices[2]);
            }
            if (vertices[0] === vertices[(count-1)*3] && 
                vertices[1] === vertices[(count-1)*3+1] && 
                vertices[2] === vertices[(count-1)*3+2]
            ) {
                let len = vertices.length;
                x1 = vertices[len - 6]; y1 = vertices[len - 5];
                x2 = vertices[0]; y2 = vertices[1];
                x3 = vertices[3]; y3 = vertices[4];
                let inside = getBisectorPoint([x1 - x2, y1 - y2], [x3 - x2, y3 - y2], x2, y2, this.width, 'left');
                let outer = getBisectorPoint([x1 - x2, y1 - y2], [x3 - x2, y3 - y2], x2, y2, this.width, 'right');
                wallArrayInside.push(inside[0], inside[1], vertices[2]);
                wallArrayOuter.push(outer[0], outer[1], vertices[2]);
            } else {
                let flag = false;
                let sinA;
                let len = vertices.length;
                x1 = vertices[0]; y1 = vertices[1];
                x2 = vertices[3]; y2 = vertices[4];
                sinA = Math.abs(x2-x1)/(Math.sqrt(Math.pow((x2-x1), 2) + Math.pow((y2-y1), 2)));
                if ((y1<y2 && x1<x2) || (x1>x2 && y1>y2)) {
                    flag=true;
                } 
                //отрицательной шириной меняем порядок добавления крайних вершин
                let start;
                if (y2<y1) {
                    start = getNeighbours(x1, y1, sinA, -this.width, flag);
                } else {
                    start = getNeighbours(x1, y1, sinA, this.width, flag);
                }
                x1 = vertices[len-6]; y1 = vertices[len-5];
                x2 = vertices[len-3]; y2 = vertices[len-2];
                sinA = Math.abs(x2-x1)/(Math.sqrt(Math.pow((x2-x1), 2) + Math.pow((y2-y1), 2)));
                flag=false;
                if ((y1<y2 && x1<x2) || (x1>x2 && y1>y2)) {
                    flag=true;
                } 
                 //отрицательной шириной меняем порядок добавления крайних вершин
                let end;
                if (y2<y1) {
                    end = getNeighbours(x2, y2, sinA, -this.width, flag);
                } else {
                    end = getNeighbours(x2, y2, sinA, this.width, flag);
                }
                wallArrayInside.unshift(start[0], start[1], vertices[2]);
                wallArrayOuter.unshift(start[2], start[3], vertices[2]);
                wallArrayInside.push(end[0], end[1], vertices[2]);
                wallArrayOuter.push(end[2], end[3], vertices[2]);            
            }
            result[index].push(...wallArrayInside);
            for (let i=count*3-3; i>=0; i-=3) {
                result[index].push(wallArrayOuter[i], wallArrayOuter[i+1],wallArrayOuter[i+2]);
            }
            result[index].push(result[index][0], result[index][1], result[index][2]);
        });
        this.wideWallsVertices = result;
    }
    makeRooms() {

    }
}

function getNeighbours(x, y, sinA, width, flag) {
    let cosA, xn, yn, vertices;
    vertices=[];

    cosA = Math.sqrt(1-Math.pow(sinA, 2));
    if (flag) {
        xn=x-cosA*width;
        yn=y+sinA*width;
        vertices.push(Number(xn.toFixed(3)), Number(yn.toFixed(3)));

        xn=x+cosA*width;
        yn=y-sinA*width;
        vertices.push(Number(xn.toFixed(3)), Number(yn.toFixed(3)));
    } else {
        xn=x-cosA*width;
        yn=y-sinA*width;
        vertices.push(Number(xn.toFixed(3)), Number(yn.toFixed(3)));

        xn=x+cosA*width;
        yn=y+sinA*width;
        vertices.push(Number(xn.toFixed(3)), Number(yn.toFixed(3)));
    }

    return vertices;
    
}


export default floorObject;