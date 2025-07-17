import { useEffect, useRef } from 'react';
import * as THREE from 'three';

interface Node {
  id: number;
  position: THREE.Vector3;
  connections: number[];
}

export const AnimatedSphere = () => {
  const mountRef = useRef<HTMLDivElement>(null);
  const sceneRef = useRef<THREE.Scene | null>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const animationRef = useRef<number | null>(null);

  useEffect(() => {
    if (!mountRef.current) return;

    // Scene setup
    const scene = new THREE.Scene();
    sceneRef.current = scene;
    
    // Camera setup
    const camera = new THREE.PerspectiveCamera(
      75,
      mountRef.current.clientWidth / mountRef.current.clientHeight,
      0.1,
      1000
    );
    camera.position.z = 5;

    // Add lighting
    const ambientLight = new THREE.AmbientLight(0x404040, 0.5);
    scene.add(ambientLight);
    
    const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
    directionalLight.position.set(5, 5, 5);
    scene.add(directionalLight);

    // Renderer setup
    const renderer = new THREE.WebGLRenderer({ 
      antialias: true,
      alpha: true 
    });
    renderer.setSize(mountRef.current.clientWidth, mountRef.current.clientHeight);
    renderer.setClearColor(0x000000, 0);
    rendererRef.current = renderer;
    mountRef.current.appendChild(renderer.domElement);

    // Create sphere geometry for node placement
    const sphereGeometry = new THREE.SphereGeometry(2, 32, 32);
    const sphereMaterial = new THREE.MeshBasicMaterial({ 
      color: 0x1a1a1a, 
      wireframe: true,
      transparent: true,
      opacity: 0.5
    });
    const sphere = new THREE.Mesh(sphereGeometry, sphereMaterial);
    scene.add(sphere);

    // Generate nodes on the sphere surface
    const nodes: Node[] = [];
    const nodeCount = 50;
    
    for (let i = 0; i < nodeCount; i++) {
      const phi = Math.acos(-1 + (2 * i) / nodeCount);
      const theta = Math.sqrt(nodeCount * Math.PI) * phi;
      
      const x = 2 * Math.cos(theta) * Math.sin(phi);
      const y = 2 * Math.sin(theta) * Math.sin(phi);
      const z = 2 * Math.cos(phi);
      
      nodes.push({
        id: i,
        position: new THREE.Vector3(x, y, z),
        connections: []
      });
    }

    // Create connections between nearby nodes
    nodes.forEach((node, i) => {
      nodes.forEach((otherNode, j) => {
        if (i !== j) {
          const distance = node.position.distanceTo(otherNode.position);
          if (distance < 1.5 && !node.connections.includes(j)) {
            node.connections.push(j);
          }
        }
      });
    });

    // Create node meshes
    const nodeGeometry = new THREE.SphereGeometry(0.05, 8, 8);
    const nodeMaterial = new THREE.MeshStandardMaterial({ 
      color: 0x00ff88,
      emissive: 0x00ff88,
      emissiveIntensity: 0.5
    });

    const nodeMeshes: THREE.Mesh[] = [];
    nodes.forEach(node => {
      const nodeMesh = new THREE.Mesh(nodeGeometry, nodeMaterial);
      nodeMesh.position.copy(node.position);
      scene.add(nodeMesh);
      nodeMeshes.push(nodeMesh);
    });

    // Create edge lines
    const edgeMaterial = new THREE.LineBasicMaterial({ 
      color: 0x00ff88,
      transparent: true,
      opacity: 0.3
    });

    const edges: THREE.Line[] = [];
    nodes.forEach(node => {
      node.connections.forEach(connectionId => {
        const connectionNode = nodes[connectionId];
        const geometry = new THREE.BufferGeometry().setFromPoints([
          node.position,
          connectionNode.position
        ]);
        const line = new THREE.Line(geometry, edgeMaterial);
        scene.add(line);
        edges.push(line);
      });
    });

    // Animation loop
    const animate = () => {
      animationRef.current = requestAnimationFrame(animate);

      // Rotate the entire sphere
      sphere.rotation.x += 0.005;
      sphere.rotation.y += 0.01;

      // Rotate individual nodes slightly
      nodeMeshes.forEach((mesh, i) => {
        mesh.rotation.x += 0.01;
        mesh.rotation.y += 0.01;
        
        // Add subtle pulsing effect
        const scale = 1 + 0.1 * Math.sin(Date.now() * 0.001 + i);
        mesh.scale.setScalar(scale);
      });

      // Update edge positions
      edges.forEach((edge, i) => {
        const nodeIndex = Math.floor(i / 3);
        const connectionIndex = nodes[nodeIndex].connections[i % nodes[nodeIndex].connections.length];
        
        if (nodes[nodeIndex] && nodes[connectionIndex]) {
          const positions = edge.geometry.attributes.position as THREE.BufferAttribute;
          positions.setXYZ(0, 
            nodes[nodeIndex].position.x, 
            nodes[nodeIndex].position.y, 
            nodes[nodeIndex].position.z
          );
          positions.setXYZ(1, 
            nodes[connectionIndex].position.x, 
            nodes[connectionIndex].position.y, 
            nodes[connectionIndex].position.z
          );
          positions.needsUpdate = true;
        }
      });

      renderer.render(scene, camera);
    };

    animate();

    // Handle resize
    const handleResize = () => {
      if (!mountRef.current || !renderer) return;
      
      const width = mountRef.current.clientWidth;
      const height = mountRef.current.clientHeight;
      
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height);
    };

    window.addEventListener('resize', handleResize);

    // Cleanup
    return () => {
      window.removeEventListener('resize', handleResize);
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
      if (mountRef.current && renderer.domElement) {
        mountRef.current.removeChild(renderer.domElement);
      }
      renderer.dispose();
    };
  }, []);

  return (
    <div 
      ref={mountRef} 
      className="w-full h-full absolute inset-0"
      style={{ background: 'transparent' }}
    />
  );
}; 