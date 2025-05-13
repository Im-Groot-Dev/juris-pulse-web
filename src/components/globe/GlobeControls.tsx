
import React from 'react';
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import { Location } from './GlobeMarkers';

interface GlobeControlsProps {
  containerRef: React.RefObject<HTMLDivElement>;
  interactive: boolean;
  controlsRef: React.RefObject<OrbitControls | null>;
  camera: THREE.Camera;
}

export const setupControls = (
  camera: THREE.PerspectiveCamera,
  renderer: THREE.WebGLRenderer,
  interactive: boolean
): OrbitControls => {
  // Controls setup with smoother damping
  const controls = new OrbitControls(camera, renderer.domElement);
  controls.enableDamping = true;
  controls.dampingFactor = 0.05;
  controls.rotateSpeed = 0.5;
  controls.enableZoom = interactive;
  controls.enablePan = interactive;
  controls.autoRotate = !interactive; // Only auto-rotate if not interactive
  controls.autoRotateSpeed = 0.2; // Slower rotation for more professional look
  
  return controls;
};

export const createUIControls = (
  containerRef: HTMLDivElement,
  controlsRef: React.RefObject<OrbitControls | null>,
  camera: THREE.Camera
): void => {
  const uiContainer = document.createElement('div');
  uiContainer.className = 'absolute bottom-4 right-4 flex flex-col space-y-2 bg-black/20 backdrop-blur-sm p-2 rounded-lg';
  
  // Reset view button
  const resetButton = document.createElement('button');
  resetButton.className = 'p-2 bg-white/10 hover:bg-white/20 rounded-md text-white text-sm';
  resetButton.innerHTML = 'Reset View';
  resetButton.addEventListener('click', () => {
    if (controlsRef.current) {
      camera.position.set(0, 0, 200);
      controlsRef.current.reset();
    }
  });
  
  // Toggle rotation button
  const toggleRotationButton = document.createElement('button');
  toggleRotationButton.className = 'p-2 bg-white/10 hover:bg-white/20 rounded-md text-white text-sm';
  toggleRotationButton.innerHTML = 'Toggle Rotation';
  toggleRotationButton.addEventListener('click', () => {
    if (controlsRef.current) {
      controlsRef.current.autoRotate = !controlsRef.current.autoRotate;
    }
  });
  
  uiContainer.appendChild(resetButton);
  uiContainer.appendChild(toggleRotationButton);
  containerRef.appendChild(uiContainer);
};

export const createInstructions = (containerRef: HTMLDivElement): void => {
  const instructions = document.createElement('div');
  instructions.className = 'absolute top-4 left-4 bg-black/40 text-white p-3 rounded-lg backdrop-blur-sm max-w-sm text-sm';
  instructions.innerHTML = `
    <p class="mb-2"><strong>Interact with the Globe:</strong></p>
    <ul class="list-disc pl-5 space-y-1">
      <li>Click and drag to rotate the globe</li>
      <li>Scroll to zoom in/out</li>
      <li>Hover over highlighted cities to see their names</li>
    </ul>
  `;
  
  // Add fade-out after 8 seconds
  setTimeout(() => {
    instructions.style.transition = 'opacity 1s ease-out';
    instructions.style.opacity = '0';
    setTimeout(() => {
      instructions.remove();
    }, 1000);
  }, 8000);
  
  containerRef.appendChild(instructions);
};

export const createTooltip = (containerRef: HTMLDivElement): HTMLDivElement => {
  const tooltip = document.createElement('div');
  tooltip.className = 'absolute hidden bg-black/70 text-white p-2 rounded pointer-events-none';
  containerRef.appendChild(tooltip);
  return tooltip;
};

export const setupRaycasting = (
  containerRef: HTMLDivElement,
  tooltip: HTMLDivElement,
  markers: THREE.Mesh[],
  locations: Location[],
  camera: THREE.Camera
): (event: MouseEvent) => void => {
  // Raycast to detect mouse over markers
  const raycaster = new THREE.Raycaster();
  const mouse = new THREE.Vector2();
  
  const handleMouseMove = (event: MouseEvent) => {
    if (!containerRef || !tooltip) return;
    
    // Calculate mouse position in normalized device coordinates
    const rect = containerRef.getBoundingClientRect();
    mouse.x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
    mouse.y = -((event.clientY - rect.top) / rect.height) * 2 + 1;
    
    // Update raycaster
    raycaster.setFromCamera(mouse, camera);
    
    // Check for intersections with markers
    const intersects = raycaster.intersectObjects(markers);
    
    if (intersects.length > 0) {
      const index = markers.indexOf(intersects[0].object as THREE.Mesh);
      if (index !== -1) {
        tooltip.innerHTML = locations[index].name;
        tooltip.style.left = `${event.clientX - rect.left + 10}px`;
        tooltip.style.top = `${event.clientY - rect.top + 10}px`;
        tooltip.style.display = 'block';
      }
    } else {
      tooltip.style.display = 'none';
    }
  };
  
  return handleMouseMove;
};
