import * as THREE from 'three';
import {OrbitControls} from 'three/examples/jsm/controls/OrbitControls.js';

import starsTexture from '../three.j/img/stars.jpg';
import sunTexture from '../three.j/img/sun.jpg' ;
import mercuryTexture from '../three.j/img/mercury.jpg';
import venusTexture from '../three.j/img/venus.jpg';
import earthTexture from '../three.j/img/earth.jpg';
import marsTexture from '../three.j/img/mars.jpg';

const renderer= new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth,window.innerHeight);
renderer.setPixelRatio(window.devicePixelRatio);

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

const mercurygeo=new THREE.SphereGeometry(3.2,30,30);
const mercuryMat=new THREE.MeshStandardMaterial({
    map:textureLoader.load(mercuryTexture)
});
const mercury=new THREE.Mesh(mercurygeo,mercuryMat);
const mercuryobj=new THREE.Object3D();
mercuryobj.add(mercury);
scene.add(mercuryobj);
//sun.add(mercury);
mercury.position.x=28;
mercuryobj.addEventListener('click',()=>{
    console.log('mercury');
})
const venusgeo=new THREE.SphereGeometry(5.8,30,30);
const venusMat=new THREE.MeshStandardMaterial({
    map:textureLoader.load(venusTexture)
});
const venus= new THREE.Mesh(venusgeo,venusMat);
sun.add(venus);
venus.position.x=42;

const earthgeo=new THREE.SphereGeometry(6,30,30);
const earthMat=new THREE.MeshStandardMaterial({
    map:textureLoader.load(earthTexture)
});
const earth= new THREE.Mesh(earthgeo,earthMat);
sun.add(earth);
earth.position.x=60;

const pointLight = new THREE.PointLight(0xFFFFFF, 1000, 300);
pointLight.position.set(25, 0, 0);
scene.add(pointLight);

function animate(){
    sun.rotateY(0.004);
    mercuryobj.rotateY(0.004);
    venus.rotateY(0.004);
    earth.rotateY(0.004);
    orbit.update();
    renderer.render(scene,camera);
}

renderer.setAnimationLoop(animate);

window.addEventListener('resize',()=>{
    camera.aspect= window.innerWidth/window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth,window.innerHeight);
})
