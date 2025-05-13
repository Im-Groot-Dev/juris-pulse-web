
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
    
    // Renderer setup with better antialiasing for professional look
    const renderer = new THREE.WebGLRenderer({ 
      antialias: true,
      alpha: true, 
      precision: "highp"
    });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2)); // Better performance with capped pixel ratio
    containerRef.current.innerHTML = "";
    containerRef.current.appendChild(renderer.domElement);
    rendererRef.current = renderer;
    
    // Controls setup with smoother damping
    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.05;
    controls.rotateSpeed = 0.5;
    controls.enableZoom = false;
    controls.enablePan = false;
    controls.autoRotate = true;
    controls.autoRotateSpeed = 0.2; // Slower rotation for more professional look
    
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
    
    // Create stars
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
    
    // Enhanced lighting for professional appearance
    const ambientLight = new THREE.AmbientLight(0x404040, 0.5);
    scene.add(ambientLight);
    
    const directionalLight = new THREE.DirectionalLight(0xffffff, 1.5);
    directionalLight.position.set(5, 3, 5);
    scene.add(directionalLight);
    
    // Add location markers
    const addLocationMarker = (lat: number, lng: number, size = 0.5, color = 0x1EAEDB) => {
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
    
    // Add key locations in India and globally
    const locations = [
      { lat: 28.6139, lng: 77.2090, name: "Delhi" },
      { lat: 19.0760, lng: 72.8777, name: "Mumbai" },
      { lat: 12.9716, lng: 77.5946, name: "Bangalore" },
      { lat: 17.3850, lng: 78.4867, name: "Hyderabad" },
      { lat: 13.0827, lng: 80.2707, name: "Chennai" },
      { lat: 22.5726, lng: 88.3639, name: "Kolkata" },
      // International locations
      { lat: 40.7128, lng: -74.0060, name: "New York" },
      { lat: 51.5074, lng: -0.1278, name: "London" },
      { lat: 35.6762, lng: 139.6503, name: "Tokyo" },
      { lat: -33.8688, lng: 151.2093, name: "Sydney" },
      { lat: 1.3521, lng: 103.8198, name: "Singapore" },
    ];
    
    const markers = locations.map(loc => 
      addLocationMarker(loc.lat, loc.lng, 0.6, 0x1EAEDB)
    );
    
    // Create connection lines between locations
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
    
    // Create key connections
    const connections = [
      createConnectionLine(28.6139, 77.2090, 19.0760, 72.8777), // Delhi to Mumbai
      createConnectionLine(19.0760, 72.8777, 12.9716, 77.5946), // Mumbai to Bangalore
      createConnectionLine(12.9716, 77.5946, 17.3850, 78.4867), // Bangalore to Hyderabad
      createConnectionLine(17.3850, 78.4867, 13.0827, 80.2707), // Hyderabad to Chennai
      // International connections
      createConnectionLine(28.6139, 77.2090, 40.7128, -74.0060), // Delhi to New York
      createConnectionLine(19.0760, 72.8777, 51.5074, -0.1278), // Mumbai to London
      createConnectionLine(12.9716, 77.5946, 1.3521, 103.8198), // Bangalore to Singapore
    ];
    
    // Animation for markers
    const animateMarkers = () => {
      markers.forEach(({ pulse }, index) => {
        const scale = 1 + 0.5 * Math.sin(Date.now() * 0.001 + index * 0.5);
        pulse.scale.set(scale, scale, scale);
        
        // Update pulse opacity
        const material = pulse.material as THREE.MeshBasicMaterial;
        material.opacity = 0.3 * (1.5 - scale * 0.3);
      });
    };

    // Slowly rotate clouds
    const animateClouds = () => {
      clouds.rotation.y += 0.0002;
    };
    
    // Animation loop
    const animate = () => {
      requestAnimationFrame(animate);
      
      // Update controls
      controls.update();
      
      // Animate elements
      animateMarkers();
      animateClouds();
      
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
      
      // Dispose of resources
      earthMaterial.dispose();
      earthGeometry.dispose();
      cloudsGeometry.dispose();
      cloudsMaterial.dispose();
      atmosphereGeometry.dispose();
      atmosphereMaterial.dispose();
      starGeometry.dispose();
      starMaterial.dispose();
      
      scene.clear();
    };
  }, []);
  
  return <div ref={containerRef} className={`globe-container ${className}`} />;
};

export default Globe;
