
import * as THREE from "three";

export interface Location {
  lat: number;
  lng: number;
  name: string;
}

export interface Marker {
  marker: THREE.Mesh;
  pulse: THREE.Mesh;
}

export const addLocationMarker = (
  scene: THREE.Scene,
  lat: number,
  lng: number,
  size = 0.5,
  color = 0x1EAEDB
): Marker => {
  // Convert latitude and longitude to 3D coordinates
  const phi = (90 - lat) * (Math.PI / 180);
  const theta = (lng + 180) * (Math.PI / 180);
  
  const radius = 51;
  const x = -(radius * Math.sin(phi) * Math.cos(theta));
  const y = radius * Math.cos(phi);
  const z = radius * Math.sin(phi) * Math.sin(theta);
  
  // Create marker
  const markerGeometry = new THREE.SphereGeometry(size, 16, 16);
  const markerMaterial = new THREE.MeshBasicMaterial({ 
    color: color,
    transparent: true,
    opacity: 0.8
  });
  const marker = new THREE.Mesh(markerGeometry, markerMaterial);
  
  // Position the marker
  marker.position.set(x, y, z);
  
  // Create pulse effect
  const pulseGeometry = new THREE.SphereGeometry(size * 2, 16, 16);
  const pulseMaterial = new THREE.MeshBasicMaterial({
    color: color,
    transparent: true,
    opacity: 0.3
  });
  const pulse = new THREE.Mesh(pulseGeometry, pulseMaterial);
  pulse.position.set(x, y, z);
  pulse.scale.set(1, 1, 1);
  
  scene.add(marker);
  scene.add(pulse);
  
  return { marker, pulse };
};

export const animateMarkers = (markers: Marker[]) => {
  markers.forEach(({ pulse }, index) => {
    const scale = 1 + 0.5 * Math.sin(Date.now() * 0.001 + index * 0.5);
    pulse.scale.set(scale, scale, scale);
    
    // Update pulse opacity
    const material = pulse.material as THREE.MeshBasicMaterial;
    material.opacity = 0.3 * (1.5 - scale * 0.3);
  });
};

// Key locations in India and globally
export const locations: Location[] = [
  { lat: 28.6139, lng: 77.2090, name: "Delhi" },
  { lat: 19.0760, lng: 72.8777, name: "Mumbai" },
  { lat: 12.9716, lng: 77.5946, name: "Bangalore" },
  { lat: 17.3850, lng: 78.4867, name: "Hyderabad" },
  { lat: 13.0827, lng: 80.2707, name: "Chennai" },
  { lat: 22.5726, lng: 88.3639, name: "Kolkata" },
  { lat: 26.9124, lng: 75.7873, name: "Jaipur" },
  { lat: 23.0225, lng: 72.5714, name: "Ahmedabad" },
  { lat: 25.5941, lng: 85.1376, name: "Patna" },
  { lat: 30.7333, lng: 76.7794, name: "Chandigarh" },
  // International connections
  { lat: 40.7128, lng: -74.0060, name: "New York" },
  { lat: 51.5074, lng: -0.1278, name: "London" },
  { lat: 35.6762, lng: 139.6503, name: "Tokyo" },
];
