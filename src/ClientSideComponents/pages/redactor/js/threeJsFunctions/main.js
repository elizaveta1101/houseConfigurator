import * as THREE from 'three';
import * as images from '../../assets/cubeMap/cubeMapImages.js';
import {TrackballControls} from 'three/examples/jsm/controls/TrackballControls.js';

function main() {
    const canvas = document.querySelector('canvas');
    const scene = new THREE.Scene();

	const camera = new THREE.PerspectiveCamera(
        95,
        canvas.clientWidth / canvas.clientHeight,
        0.1,
        200
    );
	var renderer = new THREE.WebGLRenderer({canvas, alpha: true});
	renderer.setClearColor(0xEEEEEE);
    renderer.setSize(canvas.clientWidth, canvas.clientHeight);

    const axes = new THREE.AxesHelper(20);
    scene.add(axes);
    
    const loader = new THREE.CubeTextureLoader();
    let sceneTexture = loader.load([
        images.px,
        images.nx,
        images.py,
        images.ny,
        images.pz,
        images.nz,
    ]);
    scene.background = sceneTexture;

	camera.position.x = 5;
	camera.position.y = 5;
	camera.position.z = 3;
	camera.lookAt(0,0,0);
    renderer.render(scene, camera);
    
    // управление камерой с помощью мыши
    const controls = new TrackballControls(camera, canvas);
    controls.target.set(0, 0, 0);
    controls.noPan = true;
    controls.rotateSpeed = 2;
    controls.update();

    // анимация сцены
    function animate () {
        requestAnimationFrame(animate);
        controls.update();
        // ограничения передвижения камеры
        camera.up.set(0, 0, 1);
        if (camera.rotation.x > (Math.pi/2)) {camera.rotation.x = Math.pi/2;}
        if (camera.position.z < 0) {camera.position.z = 0;}
        
        renderer.render(scene, camera);
    }
    animate();

    // обработка нажатия кнопок переключения видов 2D/3D
    // document.querySelector(".view2d").onclick = draw2d;
    // document.querySelector(".view3d").onclick = draw3d;

    // функция переключения вида на 2D
    function handleClick2d () {
        scene.background = null;
        renderer.setClearColor(0xFFFFFF);
        controls.noRotate = true;
        controls.noZoom = true;
        camera.position.set(0, -0.001, 10);
        camera.near = 9.99;
        camera.far = 10.01;
        camera.updateProjectionMatrix();
    }

    // функция переключения вида на 3D
    function handleClick3d () {
        scene.background = sceneTexture;
        camera.position.set(5, 5, 3);
        controls.noRotate = false;
        controls.noZoom = false;
        camera.near = 0.1;
        camera.far = 100;
        camera.updateProjectionMatrix();
    }
}
export default main;