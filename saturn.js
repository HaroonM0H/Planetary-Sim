import * as THREE from 'three';

export function createSaturn(scene, loader, AU) {
    const saturnObj = new THREE.Object3D();
    saturnObj.position.set(0, 0, 0);
    const saturnGeometry = new THREE.IcosahedronGeometry(1, 12);
    const saturnMaterial = new THREE.MeshStandardMaterial({
        map: loader.load('saturnmap.jpg'),
    });
    const saturnMesh = new THREE.Mesh(saturnGeometry, saturnMaterial);
    // Saturn is at 9.5 AU from the Sun
    saturnMesh.position.set(0, 0, 9.5 * AU);
    // Saturn is about 9.5 times Earth's radius, scaled for visibility
    saturnMesh.scale.set(5.5, 5.5, 5.5);
    
    // Create Saturn's rings with proper UV mapping
    const ringGeometry = new THREE.RingGeometry(1.8, 3, 64);
    
    // Fix the UV mapping for the ring texture
    const pos = ringGeometry.attributes.position;
    const v3 = new THREE.Vector3();
    const uv = ringGeometry.attributes.uv;
    
    for (let i = 0; i < pos.count; i++) {
        v3.fromBufferAttribute(pos, i);
        
        // Calculate the angle around the ring (0 to 2π)
        const angle = Math.atan2(v3.y, v3.x);
        const u = (angle + Math.PI) / (Math.PI * 2);
        
        // Calculate the distance from the center (normalized between inner and outer radius)
        const v = (Math.sqrt(v3.x * v3.x + v3.y * v3.y) - 1.8) / (3 - 1.8);
        
        uv.setXY(i, u, v);
    }
    
    const ringMaterial = new THREE.MeshBasicMaterial({
        map: loader.load('saturnringcolor.jpg'),
        side: THREE.DoubleSide,
        transparent: true,
        opacity: 0.9
    });
    const ringMesh = new THREE.Mesh(ringGeometry, ringMaterial);
    ringMesh.rotation.x = Math.PI / 2;
    saturnMesh.add(ringMesh);
    
    saturnObj.add(saturnMesh);
    scene.add(saturnObj);
    
    return { saturnObj, saturnMesh, ringMesh };
}