import * as THREE from 'three';

export function createVenus(scene, loader, AU) {
    const venusObj = new THREE.Object3D();
    venusObj.position.set(0, 0, 0);
    const venusGeometry = new THREE.IcosahedronGeometry(0.76, 3);
    const venusMaterial = new THREE.MeshStandardMaterial({
        map: loader.load('venusmap.jpg'),
    });
    const venusMesh = new THREE.Mesh(venusGeometry, venusMaterial);
    // Venus is at 0.7 AU from the Sun
    venusMesh.position.set(0, 0, 1.4 * AU);
    // Venus's radius is about 0.95 times Earth's radius
    venusMesh.scale.set(0.95, 0.95, 0.95);
    venusObj.add(venusMesh);
    scene.add(venusObj);
    
    return { venusObj, venusMesh };
}