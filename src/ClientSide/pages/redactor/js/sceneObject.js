import * as extraFunctions from './extraFunctions.js';

class sceneObject {
    constructor() {
        this.vertices = []; //записывать 3 координаты (точки для 2D-вида)
        this.upVertices = []; //записывать 3 координаты (точки для 2D-вида)
        this.innerVertices = []; //записывать 3 координаты (точки для 2D-вида)
        this.height = 0;
        this.color = [0, 0, 0];
        this.texCoord = [];
        this.texture = '';
        this.textureSize = [1, 1];  //размер текстуры [x, y] относительно координатной сетки
        this.translation = [0, 0, 0];
    }

    getUpVertices() {
        if (this.vertices.length !== 0) {
            let upVertices = [];
            for (let i = 0; i < this.vertices.length; i += 3) {
                //добавляем сразу 3 координаты
                upVertices.push(this.vertices[i], this.vertices[i + 1], this.height);
            }
            if (this.innerVertices.length !== 0) {
                for (let i = 0; i < this.innerVertices.length; i += 3) {
                    upVertices.push(this.innerVertices[i], this.innerVertices[i + 1], this.height);
                }
            }
            return upVertices;
        } else {
            // console.error('Нельзя определить верхние вершины, так как не определены основные вершины!');
            return [];
        }
    }

    getInnerVertices(width) {
        if (this.vertices.length !== 0) {
            let innerVertices = [];
            let result = [];
            let s = extraFunctions.getArea(this.vertices);
            let round;
            let x1, y1, x2, y2, x3, y3;

            if (s > 0) {
                round = 'left'; //против часовой
            } else {
                round = 'right'; //по часовой
            }

            for (let i = 3; i < this.vertices.length - 3; i += 3) {
                x1 = this.vertices[i - 3]; y1 = this.vertices[i - 2];
                x2 = this.vertices[i]; y2 = this.vertices[i + 1];
                x3 = this.vertices[i + 3]; y3 = this.vertices[i + 4];
                result = extraFunctions.getBisectorPoint([x1 - x2, y1 - y2], [x3 - x2, y3 - y2], x2, y2, width, round);
                innerVertices.push(result[0], result[1], this.vertices[2]);
            }

            let len = this.vertices.length;
            x1 = this.vertices[len - 6]; y1 = this.vertices[len - 5];
            x2 = this.vertices[0]; y2 = this.vertices[1];
            x3 = this.vertices[3]; y3 = this.vertices[4];
            result = extraFunctions.getBisectorPoint([x1 - x2, y1 - y2], [x3 - x2, y3 - y2], x2, y2, width, round);
            innerVertices.unshift(result[0], result[1], this.vertices[2]);
            innerVertices.push(result[0], result[1], this.vertices[2]);
            return innerVertices;
        } else {
            // console.error('Нельзя определить внутренние вершины, так как не определены основные вершины!');
            return [];
        }
    }
}

export default sceneObject;