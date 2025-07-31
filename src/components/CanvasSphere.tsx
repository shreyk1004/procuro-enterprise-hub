import { useEffect, useRef, CSSProperties } from 'react';

interface Node {
  x: number;
  y: number;
  z: number;
  connections: number[];
}

interface CanvasSphereProps {
  radius?: number;
  style?: CSSProperties;
}

interface ActiveNode {
  nodeIndex: number;
  targetNodeIndex: number;
  color: string;
  progress: number;
  startTime: number;
  text: string;
  textOpacity: number;
  fadingOut?: boolean;
  fadeStartTime?: number;
  responseText?: string;
  responseTextOpacity?: number;
  responseShown?: boolean;
  responseFadeStart?: number;
  targetNodeLit?: boolean;
}

const useCaseTexts = [
  "Chase the quote for valve V-32—need price, lead-time, shipping from the vendors.",
  "Get the commercial invoice from my supplier for container CNU123456 before demurrage hits.",
  "Request Opposing Counsel for Slack exports Jan1–Mar31 under subpoena.",
  "Check missing MRI authorization for patient #9815 from their family doctor.",
  "Get a plumber for Unit 3B ceiling leak.",
  "Remind applicants missing official transcripts from their university.",
  "Follow up on 45-day-late Invoice #11027.",
  "Clarify splice detail on RFI#22 by noon.",
  "Collect missing I-9 docs from new hire.", 
  "Close the $5k gala pledge."
];

const responseTexts = [
  "Supplier replied: $27.60/unit, 6-week lead, $85 DHL. PDF quote saved in ERP.",
  "Exporter sent it over: invoice attached, HS code 8413.30. I filed it with the broker.",
  "Opposing counsel provided a link: 1.2 GB ZIP delivered; stored in evidence folder.",
  "Payer confirmed: Approved, auth ID 542879. Faxed to radiology; EMR updated.",
  "Vendor booked: plumber arriving 2PM today. Tenant notified and confirmed access.",
  "Applicant #247 replied: transcript sent via Parchment; delivery PDF archived.",
  "ACME’s AP said: check mailed, expected ACH Friday. Status set to 'payment en-route.'",
  "Architect responded: use 4-bolt splice, sheet S-12 attached. I pushed to field app.",
  "Candidate uploaded: passport scan; I-9 now complete in HRIS.",
  "Donor confirmed: charge Visa ••4321 this Thursday. CRM and Stripe updated."
];

const colors = [
  '#ff4444', // red
  '#ffaa00', // yellow
  '#44ff44', // green
  '#4444ff', // blue
  '#ff44ff', // magenta
  '#44ffff', // cyan
  '#ff8844', // orange
  '#8844ff'  // purple
];

export const CanvasSphere = ({ radius = 100, style }: CanvasSphereProps) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationRef = useRef<number | null>(null);
  const activeNodeRef = useRef<ActiveNode | null>(null);
  const lastTriggerTimeRef = useRef<number>(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Set canvas size
    const resizeCanvas = () => {
      const rect = canvas.getBoundingClientRect();
      canvas.width = rect.width * window.devicePixelRatio;
      canvas.height = rect.height * window.devicePixelRatio;
      ctx.setTransform(1, 0, 0, 1, 0, 0);
      ctx.scale(window.devicePixelRatio, window.devicePixelRatio);
    };

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    // Generate nodes on sphere surface
    const nodes: Node[] = [];
    const nodeCount = 30;

    for (let i = 0; i < nodeCount; i++) {
      const phi = Math.acos(-1 + (2 * i) / nodeCount);
      const theta = Math.sqrt(nodeCount * Math.PI) * phi;
      
      const x = radius * Math.cos(theta) * Math.sin(phi);
      const y = radius * Math.sin(theta) * Math.sin(phi);
      const z = radius * Math.cos(phi);
      
      nodes.push({
        x, y, z,
        connections: []
      });
    }

    // Create connections between nearby nodes
    nodes.forEach((node, i) => {
      nodes.forEach((otherNode, j) => {
        if (i !== j) {
          const distance = Math.sqrt(
            Math.pow(node.x - otherNode.x, 2) +
            Math.pow(node.y - otherNode.y, 2) +
            Math.pow(node.z - otherNode.z, 2)
          );
          if (distance < radius * 1.2 && !node.connections.includes(j)) {
            node.connections.push(j);
          }
        }
      });
    });

    let rotationX = 0;
    let rotationY = 0;

    const triggerNewNode = () => {
      const now = Date.now();
      if (now - lastTriggerTimeRef.current < 3000) return; // Wait3s between triggers
      
      const randomNodeIndex = Math.floor(Math.random() * nodes.length);
      const node = nodes[randomNodeIndex];
      
      if (node.connections.length > 0) {
        const randomConnectionIndex = Math.floor(Math.random() * node.connections.length);
        const targetNodeIndex = node.connections[randomConnectionIndex];
        const randomColor = colors[Math.floor(Math.random() * colors.length)];
        const randomText = useCaseTexts[Math.floor(Math.random() * useCaseTexts.length)];
        const randomResponse = responseTexts[Math.floor(Math.random() * responseTexts.length)];
        
        activeNodeRef.current = {
          nodeIndex: randomNodeIndex,
          targetNodeIndex: targetNodeIndex,
          color: randomColor,
          progress: 0,
          startTime: now,
          text: randomText,
          textOpacity: 0,
          responseText: randomResponse,
          responseTextOpacity: 0,
          responseShown: false
        };
        
        lastTriggerTimeRef.current = now;
      }
    };

    const animate = () => {
      animationRef.current = requestAnimationFrame(animate);

      // Clear canvas
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Center the canvas
      const centerX = canvas.width / (2 * window.devicePixelRatio);
      const centerY = canvas.height / (2 * window.devicePixelRatio);

      // Rotate nodes
      const rotatedNodes = nodes.map(node => {
        const cosX = Math.cos(rotationX);
        const sinX = Math.sin(rotationX);
        const cosY = Math.cos(rotationY);
        const sinY = Math.sin(rotationY);

        let x1 = node.x;
        let y1 = node.y * cosX - node.z * sinX;
        let z1 = node.y * sinX + node.z * cosX;

        let x2= x1 * cosY + z1 * sinY;
        let y2 = y1;
        let z2 = -x1 * sinY + z1 * cosY;

        return {
          x: x2,
          y: y2,
          z: z2,
          connections: node.connections
        };
      });

      // Draw regular connections
      ctx.strokeStyle = '#000000';
      ctx.lineWidth = 1;
      rotatedNodes.forEach((node, i) => {
        node.connections.forEach(connectionId => {
          const connectionNode = rotatedNodes[connectionId];
          if (connectionNode) {
            const fadeStart = -100;
            const fadeEnd = 100;
            const nodeFade = Math.max(0, Math.min(1, (node.z - fadeStart) / (fadeEnd - fadeStart)));
            const connectionFade = Math.max(0, Math.min(1, (connectionNode.z - fadeStart) / (fadeEnd - fadeStart)));
            const fade = Math.min(nodeFade, connectionFade);
            
            if (fade > 0) {
              ctx.globalAlpha = 0.3 * fade;
              ctx.beginPath();
              ctx.moveTo(
                centerX + node.x * (1 + node.z / 200),
                centerY + node.y * (1 + node.z / 200)
              );
              ctx.lineTo(
                centerX + connectionNode.x * (1 + connectionNode.z / 200),
                centerY + connectionNode.y * (1 + connectionNode.z / 200)
              );
              ctx.stroke();
            }
          }
        });
      });

      // Handle active node animation
      const now = Date.now();
      if (activeNodeRef.current) {
        const active = activeNodeRef.current;
        const elapsed = now - active.startTime;
        const duration = 4000; // 4s for the entire animation (was 2000)
        const fadeOutDuration = 2500; // ms for fade out (was 1200)

        if (!active.fadingOut) {
          // Debug log
          console.log('progress:', active.progress, 'elapsed:', elapsed, 'duration:', duration);
          if (elapsed < duration) {
            active.progress = elapsed / duration;
            active.textOpacity = Math.min(1, active.progress * 3); // Text fades in quickly
            // Show response when edge reaches target
            if ((active.progress >= 0.99 || elapsed >= duration) && !active.responseShown) {
              active.responseShown = true;
              active.responseTextOpacity = 0;
              active.responseFadeStart = now;
              active.targetNodeLit = true;
            }
            if (active.responseShown && active.responseTextOpacity !== undefined) {
              // Fade in response box quickly (200ms)
              const responseFadeElapsed = now - (active.responseFadeStart || now);
              active.responseTextOpacity = Math.min(1, responseFadeElapsed / 200);
            }
          } else {
            // Start fade out
            if (!active.responseShown) {
              active.responseShown = true;
              active.responseTextOpacity = 1;
              active.responseFadeStart = now;
              active.targetNodeLit = true;
            }
            active.fadingOut = true;
            active.fadeStartTime = now;
          }
        } else {
          // Fading out
          const fadeElapsed = now - (active.fadeStartTime || now);
          active.textOpacity = Math.max(0, 1 - fadeElapsed / fadeOutDuration);
          if (active.responseTextOpacity !== undefined) {
            active.responseTextOpacity = Math.max(0, 1 - fadeElapsed / fadeOutDuration);
          }
          if (fadeElapsed >= fadeOutDuration) {
            activeNodeRef.current = null;
            triggerNewNode();
          }
        }
      } else {
        triggerNewNode();
      }

      // Draw active connection pulse
      if (activeNodeRef.current) {
        const active = activeNodeRef.current;
        const sourceNode = rotatedNodes[active.nodeIndex];
        const targetNode = rotatedNodes[active.targetNodeIndex];
        
        if (sourceNode && targetNode) {
          const sourceX = centerX + sourceNode.x * (1 + sourceNode.z / 200);
          const sourceY = centerY + sourceNode.y * (1 + sourceNode.z / 200);
          const targetX = centerX + targetNode.x * (1 + targetNode.z / 200);
          const targetY = centerY + targetNode.y * (1 + targetNode.z / 200);
          // Draw progressive pulse
          const pulseWidth = 3;
          ctx.strokeStyle = active.color;
          ctx.lineWidth = pulseWidth;
          // Apply fade based on active nodes' Z-position
          const fadeStart = -100; // Same fade start as other elements
          const fadeEnd = 100;    // Same fade end as other elements
          const sourceNodeFade = Math.max(0, Math.min(1, (sourceNode.z - fadeStart) / (fadeEnd - fadeStart)));
          const targetNodeFade = Math.max(0, Math.min(1, (targetNode.z - fadeStart) / (fadeEnd - fadeStart)));
          const edgeFade = Math.min(sourceNodeFade, targetNodeFade);
          ctx.globalAlpha = 0.8 * edgeFade;
          
          const pulseX = sourceX + (targetX - sourceX) * active.progress;
          const pulseY = sourceY + (targetY - sourceY) * active.progress;
          
          ctx.beginPath();
          ctx.moveTo(sourceX, sourceY);
          ctx.lineTo(pulseX, pulseY);
          ctx.stroke();
        }
      }

      // Draw nodes
      rotatedNodes.forEach((node, i) => {
        const fadeStart = -100;
        const fadeEnd = 100;
        const fade = Math.max(0, Math.min(1, (node.z - fadeStart) / (fadeEnd - fadeStart)));
        
        if (fade > 0) {
          const scale = 1 + node.z / 200;
          const x = centerX + node.x * scale;
          const y = centerY + node.y * scale;
          const size = 3 + 2 * scale;

          // Check if this node is active
          const isSourceActive = activeNodeRef.current && activeNodeRef.current.nodeIndex === i;
          const isTargetActive = activeNodeRef.current && activeNodeRef.current.targetNodeIndex === i && activeNodeRef.current.targetNodeLit;
          const isActive = isSourceActive || isTargetActive;
          
          let nodeColor = '#000000';
          let glowIntensity = 1;
          let pulse = 1;
          if (isActive && activeNodeRef.current) {
            nodeColor = activeNodeRef.current.color;
            glowIntensity = 2;
            
            const active = activeNodeRef.current; // Get active node details
            const elapsed = now - active.startTime; // Calculate elapsed time
            const pulseDuration = 500; // milliseconds for the pulse effect
            if (elapsed < pulseDuration) {
              pulse = 1 + 0.2 * Math.sin(Math.PI * (elapsed / pulseDuration));
            }

            // Draw text box (request) - HIDDEN FOR NOW
            // if (activeNodeRef.current.nodeIndex === i) {
            //   ctx.save();
            //   ctx.globalAlpha = activeNodeRef.current.textOpacity * fade;
            //   // Calculate text position (outside the sphere)
            //   const textX = x + (x - centerX) * 0.3;
            //   const textY = y + (y - centerY) * 0.3;
            //   // Draw text background
            //   ctx.fillStyle = 'rgba(255, 255, 255, 1)';
            //   ctx.strokeStyle = 'rgba(0, 0, 0, 0.3)';
            //   ctx.lineWidth = 1;
            //   const textWidth = ctx.measureText(activeNodeRef.current.text).width;
            //   const textHeight = 20;
            //   const padding = 8;
            //   ctx.beginPath();
            //   ctx.roundRect(textX - textWidth/2 - padding, textY - textHeight/2 - padding, 
            //                textWidth + padding * 2, textHeight + padding * 2, 6);
            //   ctx.fill();
            //   ctx.stroke();
            //   // Draw text
            //   ctx.fillStyle = '#000000';
            //   ctx.font = '10px Arial'; // Keep the smaller font size
            //   ctx.textAlign = 'center';
            //   ctx.textBaseline = 'middle';
            //   ctx.fillText(activeNodeRef.current.text, textX, textY);
            //   ctx.restore();
            // }
            // Draw response text box at target node - HIDDEN FOR NOW
            // if (activeNodeRef.current.targetNodeIndex === i && activeNodeRef.current.responseShown) {
            //   // Log for debugging
            //   console.log('Drawing response box at node', i, 'responseShown:', activeNodeRef.current.responseShown, 'opacity:', activeNodeRef.current.responseTextOpacity);
            //   ctx.save();
            //   // DEBUG: Force opacity to 1 for testing
            //   ctx.globalAlpha = (activeNodeRef.current.responseTextOpacity || 0) * fade;
            //   // Calculate text position (outside the sphere)
            //   const textX = x + (x - centerX) * 0.3;
            //   const textY = y + (y - centerY) * 0.3;
            //   // Draw text background
            //   ctx.fillStyle = 'rgba(255, 255, 0, 1)'; // Yellow for debug
            //   ctx.strokeStyle = 'rgba(0, 0, 0, 0.8)';
            //   ctx.lineWidth = 1;
            //   const textWidth = ctx.measureText(activeNodeRef.current.responseText || '').width;
            //   const textHeight = 20;
            //   const padding = 8;
            //   ctx.beginPath();
            //   ctx.roundRect(textX - textWidth/2 - padding, textY - textHeight/2 - padding, 
            //                textWidth + padding * 2, textHeight + padding * 2, 6);
            //   ctx.fill();
            //   ctx.stroke();
            //   // Draw text
            //   ctx.fillStyle = '#000000';
            //   ctx.font = '10px Arial';
            //   ctx.textAlign = 'center';
            //   ctx.textBaseline = 'middle';
            //   ctx.fillText(activeNodeRef.current.responseText || 'DEBUG', textX, textY);
            //   ctx.restore();
            // }
          }
          const finalSize = size * pulse * glowIntensity;

          // Create gradient for glow effect
          const gradient = ctx.createRadialGradient(x, y, 0, x, y, finalSize * 1.2); // Reduced glow radius
          gradient.addColorStop(0, nodeColor);
          gradient.addColorStop(0.5, nodeColor);
          gradient.addColorStop(1, 'transparent');

          ctx.globalAlpha = fade;
          ctx.fillStyle = gradient;
          ctx.beginPath();
          ctx.arc(x, y, finalSize * 2, 0, Math.PI * 2);
          ctx.fill();

          // Draw core node
          ctx.fillStyle = nodeColor;
          ctx.beginPath();
          ctx.arc(x, y, finalSize, 0, Math.PI * 2);
          ctx.fill();
        }
      });

      // DEBUG: Draw a yellow box at every node
      // rotatedNodes.forEach((node, i) => {
      //   const fadeStart = -100;
      //   const fadeEnd = 100;
      //   const fade = Math.max(0, Math.min(1, (node.z - fadeStart) / (fadeEnd - fadeStart)));
      //   if (fade > 0) {
      //     const scale = 1 + node.z / 200;
      //     const x = centerX + node.x * scale;
      //     const y = centerY + node.y * scale;
      //     // Draw debug box
      //     ctx.save();
      //     ctx.globalAlpha = 0.5 * fade;
      //     ctx.fillStyle = 'rgba(255, 255, 0, 1)';
      //     ctx.strokeStyle = 'rgba(0, 0, 0, 0.8)';
      //     ctx.lineWidth = 1;
      //     const text = `Node ${i}`;
      //     const textWidth = ctx.measureText(text).width;
      //     const textHeight = 20;
      //     const padding = 8;
      //     ctx.beginPath();
      //     ctx.roundRect(x - textWidth/2 - padding, y - textHeight/2 - padding, textWidth + padding * 2, textHeight + padding * 2, 6);
      //     ctx.fill();
      //     ctx.stroke();
      //     ctx.fillStyle = '#000000';
      //     ctx.font = '10px Arial';
      //     ctx.textAlign = 'center';
      //     ctx.textBaseline = 'middle';
      //     ctx.fillText(text, x, y);
      //     ctx.restore();
      //   }
      // });
      // Log targetNodeIndex and responseShown
      if (activeNodeRef.current) {
        console.log('targetNodeIndex:', activeNodeRef.current.targetNodeIndex, 'responseShown:', activeNodeRef.current.responseShown);
      }

      // Update rotation (much slower)
      rotationX += 0.0005; // was 0.001
      rotationY += 0.001;  // was 0.002
    };

    animate();

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [radius]);

  return (
    <canvas
      ref={canvasRef}
      className="w-full h-full absolute inset-0"
      style={{ background: 'transparent', ...style }}
    />
  );
}; 