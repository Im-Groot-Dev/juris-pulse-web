
import { useEffect, useRef } from "react";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import { 
  addLocationMarker, 
  animateMarkers, 
  locations, 
  Marker 
} from "./globe/GlobeMarkers";
import { createKeyConnections } from "./globe/GlobeConnections";
import { 
  setupControls, 
  createUIControls, 
  createInstructions, 
  createTooltip, 
  setupRaycasting 
} from "./globe/GlobeControls";
import { 
  animateClouds, 
  createStars, 
  createEarthAndAtmosphere, 
  setupLighting 
} from "./globe/GlobeUtils";

interface GlobeProps {
  className?: string;
  interactive?: boolean;
}

const Globe = ({ className = "", interactive = true }: GlobeProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const controlsRef = useRef<OrbitControls | null>(null);
  
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
    
    // Setup controls
    const controls = setupControls(camera, renderer, interactive);
    controlsRef.current = controls;
    
    // Add UI controls if interactive
    if (interactive && containerRef.current) {
      createUIControls(containerRef.current, controlsRef, camera);
    }
    
    // Setup earth, atmosphere, and stars
    setupLighting(scene);
    const { earth, clouds, atmosphere } = createEarthAndAtmosphere(scene);
    const stars = createStars(scene);
    
    // Add location markers
    const markers: Marker[] = locations.map(loc => 
      addLocationMarker(scene, loc.lat, loc.lng, 0.6, 0x1EAEDB)
    );
    
    // Create connections between locations
    const connections = createKeyConnections(scene);
    
    // Setup tooltip functionality if interactive
    let handleMouseMove: ((event: MouseEvent) => void) | null = null;
    
    if (interactive && containerRef.current) {
      const tooltip = createTooltip(containerRef.current);
      
      // Get all marker meshes for raycasting
      const markerObjects = markers.map(m => m.marker);
      
      // Setup raycasting for tooltips
      handleMouseMove = setupRaycasting(
        containerRef.current,
        tooltip,
        markerObjects,
        locations,
        camera
      );
      
      containerRef.current.addEventListener('mousemove', handleMouseMove);
      
      // Add instructions
      createInstructions(containerRef.current);
    }
    
    // Animation loop
    const animate = () => {
      requestAnimationFrame(animate);
      
      // Update controls
      if (controlsRef.current) {
        controlsRef.current.update();
      }
      
      // Animate elements
      animateMarkers(markers);
      animateClouds(clouds);
      
      // Render scene
      renderer.render(scene, camera);
    };
    
    // Handle window resize
    const onWindowResize = () => {
      if (!containerRef.current) return;
      
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
        // Remove event listeners if interactive
        if (interactive && containerRef.current && handleMouseMove) {
          containerRef.current.removeEventListener('mousemove', handleMouseMove);
        }
        
        containerRef.current.removeChild(rendererRef.current.domElement);
        
        // Remove UI elements
        const elementsToRemove = containerRef.current.querySelectorAll('div');
        elementsToRemove.forEach(el => {
          try {
            containerRef.current?.removeChild(el);
          } catch(e) {
            // Ignore failures
          }
        });
      }
      
      // Dispose of resources
      const { earth, clouds, atmosphere } = createEarthAndAtmosphere(scene);
      earth.geometry.dispose();
      (earth.material as THREE.Material).dispose();
      clouds.geometry.dispose();
      (clouds.material as THREE.Material).dispose();
      atmosphere.geometry.dispose();
      (atmosphere.material as THREE.Material).dispose();
      
      stars.geometry.dispose();
      (stars.material as THREE.Material).dispose();
      
      scene.clear();
    };
  }, [interactive]);
  
  return <div ref={containerRef} className={`globe-container relative ${className}`} />;
};

export default Globe;
