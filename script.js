import * as THREE from 'three';
import {OrbitControls} from 'three/examples/jsm/controls/OrbitControls.js';

import starsTexture from '../three.j/img/stars.jpg';
import sunTexture from '../three.j/img/sun.jpg' ;
import mercuryTexture from '../three.j/img/mercury.jpg';

const renderer= new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth,window.innerHeight);

document.body.appendChild(renderer.domElement);
const scene= new THREE.Scene();
const camera= new THREE.PerspectiveCamera(
    45,
    window.innerWidth/window.innerHeight,
    0.1,
    1000
);

const orbit =new OrbitControls(camera,renderer.domElement);
function updateCamera() {
  camera.updateProjectionMatrix();
}
camera.position.set(-90,140,140);
orbit.update();

const ambientLight = new THREE.AmbientLight(0x333333);
scene.add(ambientLight);

const cubeTextureLoader = new THREE.CubeTextureLoader();
scene.background = cubeTextureLoader.load([
    starsTexture,
    starsTexture,
    starsTexture,
    starsTexture,
    starsTexture,
    starsTexture
]);

const textureLoader= new THREE.TextureLoader();

const sungeo=new THREE.SphereGeometry(16,30,30);
const sunMat= new THREE.MeshBasicMaterial({
    map: textureLoader.load(sunTexture)
});
const sun=new THREE.Mesh(sungeo,sunMat);
scene.add(sun);

const mercurygeo=new THREE.SphereGeometry(4,30,30);
const mercuryMat=new THREE.MeshBasicMaterial({
    map:textureLoader.load(mercuryTexture)
});
const mercury=new THREE.Mesh(mercurygeo,mercuryMat);
sun.add(mercury);
mercury.position.x=28;

function animate(){
    sun.rotateY(0.004);
    mercury.rotateY(0.004);
    orbit.update();
    renderer.render(scene,camera);
}

renderer.setAnimationLoop(animate);

window.addEventListener('resize',()=>{
    camera.aspect= window.innerWidth/window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth,window.innerHeight);
})
