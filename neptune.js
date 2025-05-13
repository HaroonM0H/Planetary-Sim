import * as THREE from 'three';

export function createNeptune(scene, loader, AU) {
    const neptuneObj = new THREE.Object3D();
    neptuneObj.position.set(0, 0, 0);
    const neptuneGeometry = new THREE.IcosahedronGeometry(1, 12);
    const neptuneMaterial = new THREE.MeshStandardMaterial({
        map: loader.load('neptunemap.jpg'),
    });
    const neptuneMesh = new THREE.Mesh(neptuneGeometry, neptuneMaterial);
    // Neptune is at 30.1 AU from the Sun
    neptuneMesh.position.set(0, 0, 30.1 * AU);
    // Neptune is about 3.9 times Earth's radius, scaled for visibility
    neptuneMesh.scale.set(3.9, 3.9, 3.9);
    
    neptuneObj.add(neptuneMesh);
    scene.add(neptuneObj);
    
    return { neptuneObj, neptuneMesh };
}