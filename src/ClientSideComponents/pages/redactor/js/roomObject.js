//класс для описания комнаты (какие материалы должны быть использованы, какое название имеет, какие координаты)
//описывает "коробку" с текстурами внутри 
class roomObject {
    constructor() {
        this.name='';
        this.vertices = []; //записывать 3 координаты (точки для 2D-вида)
        this.upVertices = []; //записывать 3 координаты (точки для 2D-вида)
        this.height = 0;
        this.wallTexture = {
            size: [0,0],
            texture: '',
        }
        this.floorTexture = {
            size: [0,0],
            texture: '',
        }
        this.ceilingTexture = {
            size: [0,0],
            texture: '',
        }
        this.translation = [0, 0, 0];
        this.model=null;
    }
    getModel() {
        //получить комнату по имеющимся параметрам
        //this.model=result;
    }
    updateModel() {
        //обновить модель при несущественных изменениях (изменили фундамент или положение межкомнатных стен)
    }
    updateTexture() {
        //обновить текстуры при изменении
    }
    getUpVertices() {
        if (this.vertices.length !== 0) {
            let upVertices = [];
            for (let i = 0; i < this.vertices.length; i += 3) {
                upVertices.push(this.vertices[i], this.vertices[i + 1], this.height);
            }
            return upVertices;
        } else {
            console.error('Нельзя определить верхние вершины, так как не определены основные вершины!');
            return [];
        }
    }
}

export default roomObject;