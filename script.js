import * as THREE from 'three';
import {OrbitControls} from 'three/examples/jsm/controls/OrbitControls.js';

import starsTexture from './img/stars.jpg';
import sunTexture from './img/sun.jpg' ;
import mercuryTexture from './img/mercury.jpg';
import venusTexture from './img/venus.jpg';
import earthTexture from './img/earth.jpg';
import marsTexture from './img/mars.jpg';
import jupiterTexture from './img/jupiter.jpg';
import saturnTexture from './img/saturn.jpg';
import saturnRingTexture from './img/saturn ring.png';
import neptuneTexture from './img/neptune.jpg';
import uranusTexture from './img/uranus.jpg';
import uranusRingTexture from './img/uranus ring.png';
// import { PointerLockControls } from 'three/examples/jsm/Addons.js';
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
function createplanet(radius, texture, dist, name,ring){
    const geo = new THREE.SphereGeometry(radius,30,30);
    const mat = new THREE.MeshStandardMaterial({
        map: textureLoader.load(texture)
    });
    const planet = new THREE.Mesh(geo, mat);
    if (name) planet.name = name;
    const planetobj = new THREE.Object3D();
    planetobj.add(planet);
    if(ring){
        const ringGeo=new THREE.RingGeometry(
            ring.innerRadius,
            ring.outerRadius,
            32);
        const ringMat=new THREE.MeshBasicMaterial({
            map:textureLoader.load(ring.Texture),
            side:THREE.DoubleSide,
        });
        const ringMesh = new THREE.Mesh(ringGeo, ringMat);
        planet.add(ringMesh);
        // ringMesh.position.x = position;
        ringMesh.rotation.x=-0.5*Math.PI;
    }
    scene.add(planetobj);
    planet.position.x = dist;
    return {planet,planetobj};
}
const mercury = createplanet(3.2, mercuryTexture, 28, 'mercury');
const venus =createplanet(5.8,venusTexture,42,'venus');
const earth =createplanet(6,earthTexture,62,'earth');
const mars =createplanet(4,marsTexture,78,'mars');
const jupiter =createplanet(12,jupiterTexture,100,'jupiter');
const saturn=createplanet(10,saturnTexture,138,'saturn',{
    innerRadius: 10,
    outerRadius: 20,
    Texture: saturnRingTexture,
});
const uranus =createplanet(7,uranusTexture,176,'uranus',{
    innerRadius:7,
    outerRadius:12,
    Texture: uranusRingTexture,
});
const neptune =createplanet(7,neptuneTexture,200,'neptune');

const clickableMeshes = [
    sun,
    mercury.planet,
    venus.planet,
    earth.planet,
    mars.planet,
    jupiter.planet,
    saturn.planet,
    uranus.planet,
    neptune.planet
];

const raycaster = new THREE.Raycaster();
const pointer = new THREE.Vector2();
renderer.domElement.addEventListener('pointerdown', (event) => {
    const rect = renderer.domElement.getBoundingClientRect();
    pointer.x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
    pointer.y = -((event.clientY - rect.top) / rect.height) * 2 + 1;
    raycaster.setFromCamera(pointer, camera);
    const hits = raycaster.intersectObjects(clickableMeshes, true);
    if (hits.length > 0) {
        console.log(hits[0].object.name);
    }
});


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
    saturn.planet.rotateY(0.038);
    uranus.planet.rotateY(0.03);
    neptune.planet.rotateY(0.032);

    mercury.planetobj.rotateY(0.04);
    venus.planetobj.rotateY(0.015);
    earth.planetobj.rotateY(0.01);
    mars.planetobj.rotateY(0.008);
    jupiter.planetobj.rotateY(0.002);
    saturn.planetobj.rotateY(0.0009);
    uranus.planetobj.rotateY(0.0004);
    neptune.planetobj.rotateY(0.0001);
    orbit.update();

    renderer.render(scene,camera);
}
renderer.setAnimationLoop(animate);

window.addEventListener('resize',()=>{
    camera.aspect= window.innerWidth/window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth,window.innerHeight);
})
