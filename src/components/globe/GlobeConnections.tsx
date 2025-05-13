
import * as THREE from "three";

export const createConnectionLine = (
  scene: THREE.Scene,
  fromLat: number,
  fromLng: number,
  toLat: number,
  toLng: number
): THREE.Mesh => {
  // Convert coordinates to 3D positions
  const fromPhi = (90 - fromLat) * (Math.PI / 180);
  const fromTheta = (fromLng + 180) * (Math.PI / 180);
  const toPhi = (90 - toLat) * (Math.PI / 180);
  const toTheta = (toLng + 180) * (Math.PI / 180);
  
  const radius = 51;
  const fromX = -(radius * Math.sin(fromPhi) * Math.cos(fromTheta));
  const fromY = radius * Math.cos(fromPhi);
  const fromZ = radius * Math.sin(fromPhi) * Math.sin(fromTheta);
  
  const toX = -(radius * Math.sin(toPhi) * Math.cos(toTheta));
  const toY = radius * Math.cos(toPhi);
  const toZ = radius * Math.sin(toPhi) * Math.sin(toTheta);
  
  // Create a curved line between the points
  const curvePoints = [];
  const segments = 40;
  
  for (let i = 0; i <= segments; i++) {
    const t = i / segments;
    
    // Linear interpolation between points
    const x = fromX + t * (toX - fromX);
    const y = fromY + t * (toY - fromY);
    const z = fromZ + t * (toZ - fromZ);
    
    // Normalize to get point on sphere
    const length = Math.sqrt(x * x + y * y + z * z);
    const normalized = new THREE.Vector3(x / length, y / length, z / length);
    
    // Push the point slightly above the globe
    const elevated = normalized.multiplyScalar(radius + 2 + Math.sin(Math.PI * t) * 5);
    curvePoints.push(elevated);
  }
  
  // Create curve from points
  const curve = new THREE.CatmullRomCurve3(curvePoints);
  const geometry = new THREE.TubeGeometry(curve, 64, 0.15, 8, false);
  const material = new THREE.MeshBasicMaterial({
    color: 0x1EAEDB,
    transparent: true,
    opacity: 0.5
  });
  
  const tube = new THREE.Mesh(geometry, material);
  scene.add(tube);
  
  return tube;
};

// Connection definitions - can be imported and used
export const createKeyConnections = (scene: THREE.Scene): THREE.Mesh[] => {
  return [
    createConnectionLine(scene, 28.6139, 77.2090, 19.0760, 72.8777), // Delhi to Mumbai
    createConnectionLine(scene, 19.0760, 72.8777, 12.9716, 77.5946), // Mumbai to Bangalore
    createConnectionLine(scene, 12.9716, 77.5946, 17.3850, 78.4867), // Bangalore to Hyderabad
    createConnectionLine(scene, 17.3850, 78.4867, 13.0827, 80.2707), // Hyderabad to Chennai
    createConnectionLine(scene, 13.0827, 80.2707, 22.5726, 88.3639), // Chennai to Kolkata
    createConnectionLine(scene, 22.5726, 88.3639, 28.6139, 77.2090), // Kolkata to Delhi
    // International connections
    createConnectionLine(scene, 28.6139, 77.2090, 40.7128, -74.0060), // Delhi to New York
    createConnectionLine(scene, 19.0760, 72.8777, 51.5074, -0.1278), // Mumbai to London
  ];
};
