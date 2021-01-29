function changeObjCoord(obj, index, coord) {
    obj.vertices[index] = coord[0];
    obj.vertices[index + 1] = coord[1];
    obj.vertices[index + 2] = coord[2];
    if (index === 0) {
        obj.vertices[obj.vertices.length - 3] = coord[0];
        obj.vertices[obj.vertices.length - 2] = coord[1];
        obj.vertices[obj.vertices.length - 1] = coord[2];
    }
}

export { changeObjCoord };