import * as THREE from 'three';

export function createMars(scene, loader, AU) {
    const marsObj = new THREE.Object3D();
    marsObj.position.set(0, 0, 0);
    const marsGeometry = new THREE.IcosahedronGeometry(0.76, 3);
    const marsMaterial = new THREE.MeshStandardMaterial({
        map: loader.load('mars_1k_color.jpg'),
    });
    const marsMesh = new THREE.Mesh(marsGeometry, marsMaterial);
    // Mars is at 1.5 AU from the Sun
    marsMesh.position.set(0, 0, 4.8 * AU);
    // Increase Mars's scale for better visibility
    marsMesh.scale.set(4, 4, 4);
    marsObj.add(marsMesh);
    scene.add(marsObj);
    
    return { marsObj, marsMesh };
}