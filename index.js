import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
 
const loader = new THREE.TextureLoader();

//set up ma scene
const scene = new THREE.Scene();
scene.background = new THREE.Color('black');

//set up lights
const color = 0xFFFFFF;
const intensity = 250;
//sun is a point light source
const sunLight = new THREE.PointLight(color, intensity);
sunLight.position.set(0, 0, 0);

scene.add(sunLight);


//set up camera
const fov = 75;
const aspect = 2;
const near = 0.1;
const far = 100;
const camera = new THREE.PerspectiveCamera(fov, aspect, near, far);


const sunGeometry = new THREE.IcosahedronGeometry(1, 12);
const sunMaterial = new THREE.MeshBasicMaterial({
    map: loader.load('sunmap.jpg'),
});
const sunMesh = new THREE.Mesh(sunGeometry, sunMaterial);
scene.add(sunMesh);

//make earth inherit from parent object
const earthObj = new THREE.Object3D();
earthObj.position.set(0, 0, 0);
const earthGeometry = new THREE.IcosahedronGeometry(1, 12);
const earthMaterial = new THREE.MeshStandardMaterial({
     map: loader.load('earthmap1k.jpg'),
})
const earthMesh = new THREE.Mesh(earthGeometry, earthMaterial);
earthMesh.position.set(0, 0, 10);
earthObj.add(earthMesh);

//make moonObj
const moonObj = new THREE.Object3D();
//set position of moonObj to be the same as earth
//so that it orbits
moonObj.position.copy(earthMesh.position);
earthObj.add(moonObj);

const moonGeometry = new THREE.IcosahedronGeometry(0.27, 3);
const moonMaterial = new THREE.MeshStandardMaterial({
    map: loader.load('moonmap1k.jpg'),
});
const moonMesh = new THREE.Mesh(moonGeometry, moonMaterial);
moonMesh.position.set(2.5, 0, 0);
moonObj.add(moonMesh);

sunMesh.add(earthObj);

const hemiLight = new THREE.HemisphereLight(0xffffff, 0x444444);
hemiLight.intensity = 0.3;
scene.add(hemiLight);


const canvas = document.querySelector('#c');
const renderer = new THREE.WebGLRenderer({
    antialias: true,
    canvas,
    alpha: true,
    premultipliedAlpha: false
});
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

const controls = new OrbitControls(camera, renderer.domElement);

camera.position.set(0, 20, 0);
controls.update();


function render(time) {
    time *= 0.001;

    const canvas = renderer.domElement;
    camera.aspect = canvas.clientWidth / canvas.clientHeight;
    camera.updateProjectionMatrix();
    controls.update();

    sunMesh.rotation.y += 0.001;
    earthMesh.rotation.y += 0.01;
    earthObj.rotation.y += 0.01;
    moonObj.rotation.y += 0.05;

    renderer.render(scene, camera);

    requestAnimationFrame(render);
}
requestAnimationFrame(render);