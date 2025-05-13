import * as THREE from 'three';

export function createJupiter(scene, loader, AU) {
    const jupiterObj = new THREE.Object3D();
    jupiterObj.position.set(0, 0, 0);
    const jupiterGeometry = new THREE.IcosahedronGeometry(1, 12);
    const jupiterMaterial = new THREE.MeshStandardMaterial({
        map: loader.load('jupitermap.jpg'),
    });
    const jupiterMesh = new THREE.Mesh(jupiterGeometry, jupiterMaterial);
    // Jupiter is at 5.2 AU from the Sun
    jupiterMesh.position.set(0, 0, 6 * AU);
    // Jupiter is 11 times Earth's radius, but scaled down for visibility
    jupiterMesh.scale.set(6.5, 6.5, 6.5);
    jupiterObj.add(jupiterMesh);
    scene.add(jupiterObj);
    
    return { jupiterObj, jupiterMesh };
}