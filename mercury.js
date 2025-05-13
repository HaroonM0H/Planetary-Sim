import * as THREE from 'three';

export function createMercury(scene, loader, AU) {
    const mercuryObj = new THREE.Object3D();
    mercuryObj.position.set(0, 0, 0);
    const mercuryGeometry = new THREE.IcosahedronGeometry(0.38, 3);
    const mercuryMaterial = new THREE.MeshStandardMaterial({
        map: loader.load('mercurymap.jpg'),
    });
    const mercuryMesh = new THREE.Mesh(mercuryGeometry, mercuryMaterial);
    
    mercuryMesh.position.set(0, 0, 0.8 * AU);
    // Mercury's radius is about 0.38 times Earth's radius
    // but i made it more visible
    mercuryMesh.scale.set(1.5, 1.5, 1.5);
    mercuryObj.add(mercuryMesh);
    scene.add(mercuryObj);
    
    return { mercuryObj, mercuryMesh };
}