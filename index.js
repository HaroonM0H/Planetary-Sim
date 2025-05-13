import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { createMercury } from './mercury.js';
import { createVenus } from './venus.js';
import { createMars } from './mars.js';
import { createJupiter } from './jupiter.js';
import { createSaturn } from './saturn.js';
 
const loader = new THREE.TextureLoader();

// Define astronomical units for consitent scaling
const AU = 15; 

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
const far = 1000;
const camera = new THREE.PerspectiveCamera(fov, aspect, near, far);

//all planets will be children of the sun to orbit around it
const sunGeometry = new THREE.IcosahedronGeometry(1, 12);
const sunMaterial = new THREE.MeshBasicMaterial({
    map: loader.load('sunmap.jpg'),
});
const sunMesh = new THREE.Mesh(sunGeometry, sunMaterial);
// Sun's radius is about 109 times Earth's radius, but scaled down for visualization
sunMesh.scale.set(7, 7, 7);
scene.add(sunMesh);

// Import planets from their respective files with AU
const { mercuryObj, mercuryMesh } = createMercury(scene, loader, AU);
const { venusObj, venusMesh } = createVenus(scene, loader, AU);
const { marsObj, marsMesh } = createMars(scene, loader, AU);
const { jupiterObj, jupiterMesh } = createJupiter(scene, loader, AU);
const { saturnObj, saturnMesh, ringMesh } = createSaturn(scene, loader, AU);

//make earth inherit from parent object
const earthObj = new THREE.Object3D();
earthObj.position.set(0, 0, 0);
const earthGeometry = new THREE.IcosahedronGeometry(1, 12);
const earthMaterial = new THREE.MeshStandardMaterial({
     map: loader.load('earthmap1k.jpg'),
})
const earthMesh = new THREE.Mesh(earthGeometry, earthMaterial);
//axial tilt of earth
earthMesh.rotation.y = -23.1 * Math.PI / 2;
// Earth at 0.5 AU
earthMesh.position.set(0, 0, 0.5 * AU);
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
// Moon is about 0.00257 AU from Earth (scaled for visibility)
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

camera.position.set(0, 100, 0);
controls.update();


function render(time) {
    time *= 0.001;

    const canvas = renderer.domElement;
    camera.aspect = canvas.clientWidth / canvas.clientHeight;
    camera.updateProjectionMatrix();
    controls.update();

    sunMesh.rotation.y += 0.001;

    earthMesh.rotation.y += 0.01;
    earthObj.rotation.y += 0.006;
    
    moonMesh.rotation.y += 0.02
    moonObj.rotation.y += 0.05;
    
    mercuryObj.rotation.y += 0.1;
    mercuryMesh.rotation.y += 0.01;

    venusObj.rotation.y += 0.07
    venusMesh.rotation.y += 0.01;

    marsObj.rotation.y += 0.03
    marsMesh.rotation.y += 0.01;

    jupiterObj.rotation.y += 0.02;
    jupiterMesh.rotation.y += 0.01;
    
    // Add Saturn's rotation
    saturnObj.rotation.y += 0.005;
    saturnMesh.rotation.y += 0.01;

    renderer.render(scene, camera);

    requestAnimationFrame(render);
}
requestAnimationFrame(render);