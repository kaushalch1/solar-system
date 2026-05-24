import * as THREE from 'three';
import {OrbitControls} from 'three/examples/jsm/controls/OrbitControls.js';

import starsTexture from '../three.j/img/stars.jpg';
import sunTexture from '../three.j/img/sun.jpg' ;
import mercuryTexture from '../three.j/img/mercury.jpg';
import venusTexture from '../three.j/img/venus.jpg';
import earthTexture from '../three.j/img/earth.jpg';
import marsTexture from '../three.j/img/mars.jpg';
import jupiterTexture from '../three.j/img/jupiter.jpg';
import { PointerLockControls } from 'three/examples/jsm/Addons.js';
//import { createElement } from 'react';

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
sun.name = 'sun';
function createplanet(radius, texture, dist, name){
    const geo = new THREE.SphereGeometry(radius,30,30);
    const mat = new THREE.MeshStandardMaterial({
        map: textureLoader.load(texture)
    });
    const planet = new THREE.Mesh(geo, mat);
    if (name) planet.name = name;
    const planetobj = new THREE.Object3D();
    planetobj.add(planet);
    scene.add(planetobj);
    planet.position.x = dist;
    return {planet,planetobj};
}
const mercury = createplanet(3.2, mercuryTexture, 28, 'mercury');
const venus =createplanet(5.8,venusTexture,42,'venus');
const earth =createplanet(6,earthTexture,62,'earth');
const mars =createplanet(4,marsTexture,78,'mars');
const jupiter =createplanet(12,jupiterTexture,100,'jupiter');

const clickableMeshes = [sun, mercury.planet, venus.planet, earth.planet, mars.planet, jupiter.planet];

const raycaster = new THREE.Raycaster();
const pointer = new THREE.Vector2();
renderer.domElement.addEventListener('pointerdown', (event) => {
    const rect = renderer.domElement.getBoundingClientRect();
    pointer.x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
    pointer.y = -((event.clientY - rect.top) / rect.height) * 2 + 1;
    raycaster.setFromCamera(pointer, camera);
    raycaster.style.cursor="pointer";
    const hits = raycaster.intersectObjects(clickableMeshes, true);
    if (hits.length > 0) {
        console.log(hits[0].object.name);
    }
});

const div = document.createElement("div");
div.textContent = 'Info / Controls';
div.style.position = 'absolute';
div.style.top = '250px';
div.style.left = '12px';
div.style.width = '220px';
div.style.height = '120px';
div.style.padding = '8px';
div.style.backgroundColor = 'white';
div.style.color = '#000';
document.body.appendChild(div);

const pointLight = new THREE.PointLight(0xFFFFFF, 10000, 3000);
pointLight.position.set(25, 0, 0);
scene.add(pointLight);

function animate(){
    sun.rotateY(0.004);
    mercury.planet.rotateY(0.004);
    venus.planet.rotateY(0.002);
    earth.planet.rotateY(0.02);
    mars.planet.rotateY(0.018);
    jupiter.planet.rotateY(0.04);
    
    mercury.planetobj.rotateY(0.04);
    venus.planetobj.rotateY(0.015);
    earth.planetobj.rotateY(0.01);
    mars.planetobj.rotateY(0.008);
    jupiter.planetobj.rotateY(0.002);
    orbit.update();

    renderer.render(scene,camera);
}

renderer.setAnimationLoop(animate);

window.addEventListener('resize',()=>{
    camera.aspect= window.innerWidth/window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth,window.innerHeight);
})
