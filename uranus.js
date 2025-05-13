import * as THREE from 'three';

export function createUranus(scene, loader, AU) {
    const uranusObj = new THREE.Object3D();
    uranusObj.position.set(0, 0, 0);
    const uranusGeometry = new THREE.IcosahedronGeometry(1, 12);
    const uranusMaterial = new THREE.MeshStandardMaterial({
        map: loader.load('uranusmap.jpg'),
    });
    const uranusMesh = new THREE.Mesh(uranusGeometry, uranusMaterial);
    // Uranus is at 19.2 AU from the Sun
    uranusMesh.position.set(0, 0, 19.2 * AU);
    // Uranus is about 4 times Earth's radius, scaled for visibility
    uranusMesh.scale.set(4, 4, 4);
    
    // Create Uranus's rings (they're very faint in reality)
    const ringGeometry = new THREE.RingGeometry(1.4, 2, 64);
    
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
        const v = (Math.sqrt(v3.x * v3.x + v3.y * v3.y) - 1.4) / (2 - 1.4);
        
        uv.setXY(i, u, v);
    }
    
    const ringMaterial = new THREE.MeshBasicMaterial({
        map: loader.load('uranusringtrans.gif'),
        side: THREE.DoubleSide,
        transparent: true,
        opacity: 0.7
    });
    const ringMesh = new THREE.Mesh(ringGeometry, ringMaterial);
    
    // Uranus has a unique feature - its axis is tilted almost 98 degrees
    // This means its rings and rotation are nearly perpendicular to its orbital plane
    ringMesh.rotation.x = Math.PI / 2;
    uranusMesh.rotation.z = 98 * Math.PI / 180;
    
    uranusMesh.add(ringMesh);
    uranusObj.add(uranusMesh);
    scene.add(uranusObj);
    
    return { uranusObj, uranusMesh, ringMesh };
}