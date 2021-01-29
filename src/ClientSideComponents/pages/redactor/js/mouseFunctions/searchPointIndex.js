function searchPointIndex (obj, pos) {
  let index = -1;
  for (let i=0; i<obj.vertices.length; i+=3) {
    if (obj.vertices[i] === pos[0]) {
      if (obj.vertices[i+1] === pos[1]) {
        // if (obj.vertices[i+2] === pos[2]) {
          index = i;
          break;
        // }
      }
    }
  }
  return index;
}
export default searchPointIndex;