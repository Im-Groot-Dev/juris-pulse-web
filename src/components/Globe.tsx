
import { useEffect, useRef } from "react";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";

interface GlobeProps {
  className?: string;
}

const Globe = ({ className = "" }: GlobeProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  
  useEffect(() => {
    if (!containerRef.current) return;

    // Scene setup
    const scene = new THREE.Scene();
    
    // Camera setup
    const camera = new THREE.PerspectiveCamera(
      60,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    camera.position.z = 200;
    
    // Renderer setup
    const renderer = new THREE.WebGLRenderer({ 
      antialias: true,
      alpha: true, 
    });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(window.devicePixelRatio);
    containerRef.current.innerHTML = "";
    containerRef.current.appendChild(renderer.domElement);
    rendererRef.current = renderer;
    
    // Controls setup
    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.05;
    controls.rotateSpeed = 0.5;
    controls.enableZoom = false;
    controls.enablePan = false;
    controls.autoRotate = true;
    controls.autoRotateSpeed = 0.5;
    
    // Create Earth
    const earthGeometry = new THREE.SphereGeometry(50, 64, 64);
    
    // Load texture
    const textureLoader = new THREE.TextureLoader();
    const earthTexture = textureLoader.load("/earth-dark.jpg");
    const bumpMap = textureLoader.load("/earth-bump.jpg");
    const specularMap = textureLoader.load("/earth-specular.jpg");
    
    const earthMaterial = new THREE.MeshPhongMaterial({
      map: earthTexture,
      bumpMap: bumpMap,
      bumpScale: 1,
      specularMap: specularMap,
      specular: new THREE.Color(0x333333),
      shininess: 5,
    });
    
    const earth = new THREE.Mesh(earthGeometry, earthMaterial);
    scene.add(earth);
    
    // Add atmosphere
    const atmosphereGeometry = new THREE.SphereGeometry(52, 64, 64);
    const atmosphereMaterial = new THREE.MeshPhongMaterial({
      color: 0x93e1ea,
      transparent: true,
      opacity: 0.2,
      side: THREE.BackSide,
    });
    const atmosphere = new THREE.Mesh(atmosphereGeometry, atmosphereMaterial);
    scene.add(atmosphere);
    
    // Create stars
    const starGeometry = new THREE.BufferGeometry();
    const starMaterial = new THREE.PointsMaterial({
      color: 0xffffff,
      size: 0.7,
      transparent: true,
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
    
    // Add lighting
    const ambientLight = new THREE.AmbientLight(0x222222);
    scene.add(ambientLight);
    
    const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
    directionalLight.position.set(5, 3, 5);
    scene.add(directionalLight);
    
    // Add random dots on the globe (representing locations/lawyers)
    const addLocationMarker = (lat: number, lng: number, size = 0.5, color = 0x7efa91) => {
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
    
    // Add some random locations (approximately India's major cities)
    const locations = [
      { lat: 28.6139, lng: 77.2090, name: "Delhi" }, // Delhi
      { lat: 19.0760, lng: 72.8777, name: "Mumbai" }, // Mumbai
      { lat: 12.9716, lng: 77.5946, name: "Bangalore" }, // Bangalore
      { lat: 17.3850, lng: 78.4867, name: "Hyderabad" }, // Hyderabad
      { lat: 13.0827, lng: 80.2707, name: "Chennai" }, // Chennai
      { lat: 22.5726, lng: 88.3639, name: "Kolkata" }, // Kolkata
      { lat: 23.0225, lng: 72.5714, name: "Ahmedabad" }, // Ahmedabad
      { lat: 26.9124, lng: 75.7873, name: "Jaipur" }, // Jaipur
      { lat: 25.3176, lng: 82.9739, name: "Varanasi" }, // Varanasi
      { lat: 30.7333, lng: 76.7794, name: "Chandigarh" }, // Chandigarh
      { lat: 11.0168, lng: 76.9558, name: "Coimbatore" }, // Coimbatore
      { lat: 26.8467, lng: 80.9462, name: "Lucknow" }, // Lucknow
      { lat: 21.1458, lng: 79.0882, name: "Nagpur" }, // Nagpur
      { lat: 18.5204, lng: 73.8567, name: "Pune" }, // Pune
    ];
    
    const markers = locations.map(loc => 
      addLocationMarker(loc.lat, loc.lng, 0.5, 0x7efa91)
    );
    
    // Create 3D lines connecting some locations to simulate connections
    const createConnectionLine = (fromLat: number, fromLng: number, toLat: number, toLng: number) => {
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
      const segments = 50;
      
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
      const geometry = new THREE.TubeGeometry(curve, 64, 0.05, 8, false);
      const material = new THREE.MeshBasicMaterial({
        color: 0x7efa91,
        transparent: true,
        opacity: 0.5
      });
      
      const tube = new THREE.Mesh(geometry, material);
      scene.add(tube);
      
      return tube;
    };
    
    // Create some connections
    const connections = [
      createConnectionLine(28.6139, 77.2090, 19.0760, 72.8777), // Delhi to Mumbai
      createConnectionLine(19.0760, 72.8777, 12.9716, 77.5946), // Mumbai to Bangalore
      createConnectionLine(12.9716, 77.5946, 17.3850, 78.4867), // Bangalore to Hyderabad
      createConnectionLine(17.3850, 78.4867, 13.0827, 80.2707), // Hyderabad to Chennai
      createConnectionLine(13.0827, 80.2707, 22.5726, 88.3639), // Chennai to Kolkata
      createConnectionLine(22.5726, 88.3639, 28.6139, 77.2090), // Kolkata to Delhi
      createConnectionLine(23.0225, 72.5714, 26.9124, 75.7873), // Ahmedabad to Jaipur
      createConnectionLine(26.9124, 75.7873, 28.6139, 77.2090), // Jaipur to Delhi
      createConnectionLine(25.3176, 82.9739, 26.8467, 80.9462), // Varanasi to Lucknow
      createConnectionLine(26.8467, 80.9462, 28.6139, 77.2090), // Lucknow to Delhi
    ];
    
    // Pulse animation for markers
    const animateMarkers = () => {
      markers.forEach(({ pulse }, index) => {
        const scale = 1 + 0.5 * Math.sin(Date.now() * 0.001 + index);
        pulse.scale.set(scale, scale, scale);
        
        // Update pulse opacity
        const material = pulse.material as THREE.MeshBasicMaterial;
        material.opacity = 0.3 * (1.5 - scale * 0.3);
      });
    };
    
    // Animation loop
    const animate = () => {
      requestAnimationFrame(animate);
      
      // Update controls
      controls.update();
      
      // Animate markers
      animateMarkers();
      
      // Render scene
      renderer.render(scene, camera);
    };
    
    // Handle window resize
    const onWindowResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };
    
    window.addEventListener("resize", onWindowResize, false);
    
    // Start animation
    animate();
    
    // Cleanup function
    return () => {
      window.removeEventListener("resize", onWindowResize);
      
      if (containerRef.current && rendererRef.current) {
        containerRef.current.removeChild(rendererRef.current.domElement);
      }
      
      // Dispose of materials and geometries
      earthMaterial.dispose();
      earthGeometry.dispose();
      atmosphereGeometry.dispose();
      atmosphereMaterial.dispose();
      starGeometry.dispose();
      starMaterial.dispose();
      
      // Dispose scene
      scene.clear();
    };
  }, []);
  
  return <div ref={containerRef} className={`globe-container ${className}`} />;
};

export default Globe;
