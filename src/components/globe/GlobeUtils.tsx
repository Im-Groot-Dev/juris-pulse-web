
import * as THREE from "three";

export const animateClouds = (clouds: THREE.Mesh): void => {
  clouds.rotation.y += 0.0002;
};

export const createStars = (scene: THREE.Scene): THREE.Points => {
  const starGeometry = new THREE.BufferGeometry();
  const starMaterial = new THREE.PointsMaterial({
    color: 0xffffff,
    size: 0.7,
    transparent: true,
    opacity: 0.8,
  });
  
  const starVertices = [];
  for (let i = 0; i < 10000; i++) {
    const x = (Math.random() - 0.5) * 2000;
    const y = (Math.random() - 0.5) * 2000;
    const z = (Math.random() - 0.5) * 2000;
    starVertices.push(x, y, z);
  }
  
  starGeometry.setAttribute(
    "position",
    new THREE.Float32BufferAttribute(starVertices, 3)
  );
  const stars = new THREE.Points(starGeometry, starMaterial);
  scene.add(stars);
  
  return stars;
};

export const createEarthAndAtmosphere = (scene: THREE.Scene): {
  earth: THREE.Mesh;
  clouds: THREE.Mesh;
  atmosphere: THREE.Mesh;
} => {
  // Create Earth with higher detail
  const earthGeometry = new THREE.SphereGeometry(50, 64, 64); // Increased segments for smoother sphere
  
  // Load enhanced textures
  const textureLoader = new THREE.TextureLoader();
  const earthTexture = textureLoader.load("/earth-blue-marble.jpg"); // More realistic texture
  const bumpMap = textureLoader.load("/earth-topology.jpg"); // Improved bump map
  const cloudsTexture = textureLoader.load("/earth-clouds.png");
  
  // Improved Earth material with better lighting properties
  const earthMaterial = new THREE.MeshPhongMaterial({
    map: earthTexture,
    bumpMap: bumpMap,
    bumpScale: 0.8,
    specular: new THREE.Color(0x222222),
    shininess: 15,
  });
  
  const earth = new THREE.Mesh(earthGeometry, earthMaterial);
  scene.add(earth);
  
  // Add clouds layer
  const cloudsGeometry = new THREE.SphereGeometry(51, 64, 64);
  const cloudsMaterial = new THREE.MeshPhongMaterial({
    map: cloudsTexture,
    transparent: true,
    opacity: 0.6,
    side: THREE.DoubleSide,
    depthWrite: false,
  });
  const clouds = new THREE.Mesh(cloudsGeometry, cloudsMaterial);
  scene.add(clouds);
  
  // Add atmosphere with more realistic glow
  const atmosphereGeometry = new THREE.SphereGeometry(54, 64, 64);
  const atmosphereMaterial = new THREE.MeshPhongMaterial({
    color: 0x0EA5E9,
    transparent: true,
    opacity: 0.15,
    side: THREE.BackSide,
  });
  const atmosphere = new THREE.Mesh(atmosphereGeometry, atmosphereMaterial);
  scene.add(atmosphere);
  
  return { earth, clouds, atmosphere };
};

export const setupLighting = (scene: THREE.Scene): void => {
  // Enhanced lighting for professional appearance
  const ambientLight = new THREE.AmbientLight(0x404040, 0.5);
  scene.add(ambientLight);
  
  const directionalLight = new THREE.DirectionalLight(0xffffff, 1.5);
  directionalLight.position.set(5, 3, 5);
  scene.add(directionalLight);
};
