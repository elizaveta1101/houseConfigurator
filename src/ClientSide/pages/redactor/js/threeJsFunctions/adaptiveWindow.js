
// изменение размера холста под размер окна просмотра
function resizeRendererToDisplaySize(renderer, labelRenderer) {
    const canvas = renderer.domElement;
    const width = canvas.clientWidth;
    const height = canvas.clientHeight;
    const needResize = canvas.width !== width || canvas.height !== height;
    if (needResize) {
        renderer.setSize(width, height, false);
        labelRenderer.setSize(width, height);
    }
    return needResize;
}

export {resizeRendererToDisplaySize};