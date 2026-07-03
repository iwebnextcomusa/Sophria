import { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import { motion } from "motion/react";
import { Sliders, RotateCw, Sparkles, ChevronRight, Check, Play, Video, Camera, Image as ImageIcon } from "lucide-react";

interface MaterialOption {
  id: string;
  name: string;
  type: "wood" | "tile" | "pattern";
  baseColor: string;
  grainColor: string;
  roughness: number;
  metalness: number;
  grainWidth: number;
  patternType: "straight" | "herringbone" | "tile";
}

const MATERIALS: MaterialOption[] = [
  {
    id: "oak",
    name: "Natural White Oak",
    type: "wood",
    baseColor: "#e6c280",
    grainColor: "#bc9854",
    roughness: 0.45,
    metalness: 0.05,
    grainWidth: 1.5,
    patternType: "straight"
  },
  {
    id: "walnut",
    name: "Espresso Walnut",
    type: "wood",
    baseColor: "#4a3525",
    grainColor: "#291b10",
    roughness: 0.35,
    metalness: 0.1,
    grainWidth: 2.0,
    patternType: "straight"
  },
  {
    id: "charcoal-lvp",
    name: "Modern Charcoal LVP",
    type: "wood",
    baseColor: "#3e3e3e",
    grainColor: "#222222",
    roughness: 0.5,
    metalness: 0.0,
    grainWidth: 1.2,
    patternType: "straight"
  },
  {
    id: "herringbone-oak",
    name: "Herringbone Oak Premium",
    type: "wood",
    baseColor: "#d8b475",
    grainColor: "#b28d4a",
    roughness: 0.4,
    metalness: 0.05,
    grainWidth: 1.5,
    patternType: "herringbone"
  },
  {
    id: "marble-tile",
    name: "Carrara Porcelain Tile",
    type: "tile",
    baseColor: "#f3f4f6",
    grainColor: "#9ca3af",
    roughness: 0.15,
    metalness: 0.15,
    grainWidth: 0.8,
    patternType: "tile"
  },
  {
    id: "slate-tile",
    name: "Laurentian Charcoal Slate",
    type: "tile",
    baseColor: "#1e293b",
    grainColor: "#334155",
    roughness: 0.7,
    metalness: 0.05,
    grainWidth: 3.0,
    patternType: "tile"
  }
];

// Helper to generate dynamic wood and tile textures procedurally using a 2D Canvas
function generateProceduralTexture(mat: MaterialOption, gloss: number): THREE.CanvasTexture {
  const canvas = document.createElement("canvas");
  canvas.width = 1024;
  canvas.height = 1024;
  const ctx = canvas.getContext("2d");

  if (!ctx) return new THREE.CanvasTexture(canvas);

  // Clear background
  ctx.fillStyle = mat.baseColor;
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  if (mat.patternType === "tile") {
    // Generate Marble or Slate tile design
    const isMarble = mat.id === "marble-tile";
    
    if (isMarble) {
      // Draw marble veins
      ctx.strokeStyle = mat.grainColor;
      ctx.lineWidth = mat.grainWidth;
      
      for (let i = 0; i < 15; i++) {
        ctx.beginPath();
        let x = Math.random() * canvas.width;
        let y = 0;
        ctx.moveTo(x, y);
        
        while (y < canvas.height) {
          x += (Math.random() - 0.5) * 40;
          y += Math.random() * 80 + 20;
          ctx.lineTo(x, y);
        }
        ctx.shadowColor = "rgba(0,0,0,0.05)";
        ctx.shadowBlur = 8;
        ctx.stroke();
      }
    } else {
      // Slate natural texture
      ctx.fillStyle = "rgba(0,0,0,0.15)";
      for (let i = 0; i < 3000; i++) {
        const x = Math.random() * canvas.width;
        const y = Math.random() * canvas.height;
        const r = Math.random() * 4 + 1;
        ctx.beginPath();
        ctx.arc(x, y, r, 0, Math.PI * 2);
        ctx.fill();
      }
    }

    // Draw grout lines (Tiles grid 4x4)
    ctx.strokeStyle = isMarble ? "#d1d5db" : "#0f172a";
    ctx.lineWidth = 8;
    ctx.shadowBlur = 0;
    ctx.shadowColor = "transparent";

    const gridSize = 256; // 1024 / 4
    for (let x = 0; x <= canvas.width; x += gridSize) {
      ctx.beginPath();
      ctx.moveTo(x, 0);
      ctx.lineTo(x, canvas.height);
      ctx.stroke();
    }
    for (let y = 0; y <= canvas.height; y += gridSize) {
      ctx.beginPath();
      ctx.moveTo(0, y);
      ctx.lineTo(canvas.width, y);
      ctx.stroke();
    }

  } else if (mat.patternType === "herringbone") {
    // Draw herringbone layout
    const boardWidth = 128;
    const boardLength = 384;

    ctx.strokeStyle = "rgba(0,0,0,0.18)";
    ctx.lineWidth = 3;

    // Drawing individual herringbone boards
    for (let y = -boardLength; y < canvas.height + boardLength; y += boardWidth * 2) {
      for (let x = -boardLength; x < canvas.width + boardLength; x += boardLength) {
        // Draw one direction
        ctx.save();
        ctx.translate(x, y);
        ctx.rotate(Math.PI / 4); // 45 degrees
        
        // Wood grain inside this plank
        ctx.fillStyle = mat.baseColor;
        ctx.fillRect(0, 0, boardLength, boardWidth);
        
        // Grain noise
        ctx.fillStyle = "rgba(255,255,255,0.05)";
        for (let i = 0; i < 3; i++) {
          ctx.fillRect(Math.random() * boardLength, 0, Math.random() * 40, boardWidth);
        }

        ctx.strokeStyle = mat.grainColor;
        ctx.lineWidth = mat.grainWidth;
        for (let j = 0; j < 5; j++) {
          ctx.beginPath();
          ctx.moveTo(0, j * (boardWidth / 5) + Math.random() * 5);
          ctx.bezierCurveTo(
            boardLength * 0.3, j * (boardWidth / 5) + (Math.random() - 0.5) * 15,
            boardLength * 0.7, j * (boardWidth / 5) + (Math.random() - 0.5) * 15,
            boardLength, j * (boardWidth / 5) + Math.random() * 5
          );
          ctx.stroke();
        }

        // Plank border
        ctx.strokeStyle = "rgba(0,0,0,0.18)";
        ctx.lineWidth = 2;
        ctx.strokeRect(0, 0, boardLength, boardWidth);
        ctx.restore();

        // Draw matching opposite direction
        ctx.save();
        ctx.translate(x + boardLength / Math.sqrt(2), y);
        ctx.rotate(-Math.PI / 4); // -45 degrees
        
        // Fill base
        ctx.fillStyle = mat.baseColor;
        ctx.fillRect(0, 0, boardLength, boardWidth);
        
        // Grain lines
        ctx.strokeStyle = mat.grainColor;
        ctx.lineWidth = mat.grainWidth;
        for (let j = 0; j < 5; j++) {
          ctx.beginPath();
          ctx.moveTo(0, j * (boardWidth / 5) + Math.random() * 5);
          ctx.bezierCurveTo(
            boardLength * 0.3, j * (boardWidth / 5) + (Math.random() - 0.5) * 15,
            boardLength * 0.7, j * (boardWidth / 5) + (Math.random() - 0.5) * 15,
            boardLength, j * (boardWidth / 5) + Math.random() * 5
          );
          ctx.stroke();
        }

        // Plank border
        ctx.strokeStyle = "rgba(0,0,0,0.18)";
        ctx.strokeRect(0, 0, boardLength, boardWidth);
        ctx.restore();
      }
    }
  } else {
    // Standard straight wood planks
    const numPlanks = 8;
    const plankWidth = canvas.width / numPlanks;

    for (let p = 0; p < numPlanks; p++) {
      const xStart = p * plankWidth;
      
      // Plank base color with slight variations for organic look
      ctx.save();
      ctx.beginPath();
      ctx.rect(xStart, 0, plankWidth, canvas.height);
      ctx.clip();

      // Organic offset of color
      const colorVal = THREE.Color.NAMES; // unused, just using math
      const r = parseInt(mat.baseColor.slice(1, 3), 16);
      const g = parseInt(mat.baseColor.slice(3, 5), 16);
      const b = parseInt(mat.baseColor.slice(5, 7), 16);
      
      // Add random variation to plank color tone
      const tone = (Math.random() - 0.5) * 16;
      const rF = Math.min(255, Math.max(0, Math.floor(r + tone)));
      const gF = Math.min(255, Math.max(0, Math.floor(g + tone)));
      const bF = Math.min(255, Math.max(0, Math.floor(b + tone)));
      
      ctx.fillStyle = `rgb(${rF}, ${gF}, ${bF})`;
      ctx.fillRect(xStart, 0, plankWidth, canvas.height);

      // Fine wood fibers/noise
      ctx.fillStyle = "rgba(0,0,0,0.05)";
      for (let i = 0; i < 50; i++) {
        ctx.fillRect(xStart + Math.random() * plankWidth, 0, Math.random() * 2 + 0.5, canvas.height);
      }

      // Draw wood grains
      ctx.strokeStyle = mat.grainColor;
      ctx.lineWidth = mat.grainWidth;
      const numGrainLines = 6;
      for (let gIdx = 0; gIdx < numGrainLines; gIdx++) {
        ctx.beginPath();
        let gx = xStart + (gIdx + 0.5) * (plankWidth / numGrainLines) + (Math.random() - 0.5) * 8;
        ctx.moveTo(gx, 0);
        
        ctx.bezierCurveTo(
          gx + (Math.random() - 0.5) * 30, canvas.height * 0.3,
          gx + (Math.random() - 0.5) * 30, canvas.height * 0.7,
          gx + (Math.random() - 0.5) * 10, canvas.height
        );
        ctx.stroke();
      }

      // Add plank end-butt joints (staggered seams)
      ctx.strokeStyle = "rgba(0,0,0,0.22)";
      ctx.lineWidth = 3;
      const numJoints = 3;
      for (let j = 0; j < numJoints; j++) {
        const jy = (j + 1) * (canvas.height / (numJoints + 1)) + (Math.random() - 0.5) * 60;
        ctx.beginPath();
        ctx.moveTo(xStart, jy);
        ctx.lineTo(xStart + plankWidth, jy);
        ctx.stroke();
      }

      ctx.restore();
    }

    // Draw dark vertical grooves between planks
    ctx.strokeStyle = "rgba(0,0,0,0.25)";
    ctx.lineWidth = 4;
    for (let p = 1; p < numPlanks; p++) {
      ctx.beginPath();
      ctx.moveTo(p * plankWidth, 0);
      ctx.lineTo(p * plankWidth, canvas.height);
      ctx.stroke();
    }
  }

  const texture = new THREE.CanvasTexture(canvas);
  texture.wrapS = THREE.RepeatWrapping;
  texture.wrapT = THREE.RepeatWrapping;
  texture.repeat.set(2, 2);
  return texture;
}

export default function FloorVisualizer3D() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [selectedMat, setSelectedMat] = useState<MaterialOption>(MATERIALS[0]);
  const [gloss, setGloss] = useState<number>(0.5); // Gloss slider (reflectivity)
  const [rotationSpeed, setRotationSpeed] = useState<number>(0.2); // Slabs rotation speed
  const [activeTab, setActiveTab] = useState<"wood" | "tile">("wood");
  const [showWireframe, setShowWireframe] = useState<boolean>(false);
  const [showroomMode, setShowroomMode] = useState<"3d" | "photo">("3d");

  // Keep references to animate inside RequestAnimationFrame
  const sceneRef = useRef<THREE.Scene | null>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
  const floorMeshRef = useRef<THREE.Mesh | null>(null);
  const sampleSlabsGroupRef = useRef<THREE.Group | null>(null);
  const lightsGroupRef = useRef<THREE.Group | null>(null);
  
  const mouseRef = useRef<{ x: number; y: number }>({ x: 0, y: 0 });
  const scrollRef = useRef<{ y: number }>({ y: 0 });

  // Filter materials based on type
  const filteredMaterials = MATERIALS.filter((m) => {
    if (activeTab === "wood") return m.type === "wood" || m.patternType === "herringbone";
    return m.type === "tile";
  });

  // Track mouse for interactive parallax
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      const y = -((e.clientY - rect.top) / rect.height) * 2 + 1;
      mouseRef.current = { x, y };
    };

    const handleScroll = () => {
      scrollRef.current.y = window.scrollY;
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  // Set up Three.js Canvas
  useEffect(() => {
    if (!containerRef.current) return;

    // Create scene with fog for depth
    const scene = new THREE.Scene();
    scene.background = new THREE.Color("#0c0a09");
    scene.fog = new THREE.FogExp2("#0c0a09", 0.08);
    sceneRef.current = scene;

    // Load a gorgeous luxury room interior photograph as the 3D Studio backdrop matching the high-end flooring business model
    const textureLoader = new THREE.TextureLoader();
    textureLoader.load(
      "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=1600&q=80",
      (texture) => {
        if ("colorSpace" in texture) {
          (texture as any).colorSpace = (THREE as any).SRGBColorSpace || "srgb";
        } else if ("encoding" in texture) {
          (texture as any).encoding = (THREE as any).sRGBEncoding;
        }
        scene.background = texture;
      }
    );

    // Create Camera
    const camera = new THREE.PerspectiveCamera(
      45,
      containerRef.current.clientWidth / containerRef.current.clientHeight,
      0.1,
      100
    );
    camera.position.set(0, 6, 9);
    camera.lookAt(0, 0, -1);
    cameraRef.current = camera;

    // Create WebGL Renderer
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: false });
    renderer.setSize(containerRef.current.clientWidth, containerRef.current.clientHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    
    // Clear old elements and append canvas
    containerRef.current.innerHTML = "";
    containerRef.current.appendChild(renderer.domElement);
    rendererRef.current = renderer;

    // Add Ambient Light
    const ambientLight = new THREE.AmbientLight("#ffffff", 0.4);
    scene.add(ambientLight);

    // Lights group to support mouse-controlled lighting shadows
    const lightsGroup = new THREE.Group();
    scene.add(lightsGroup);
    lightsGroupRef.current = lightsGroup;

    // Main Studio Directional Spot Light
    const spotLight = new THREE.SpotLight("#ffffff", 2.5);
    spotLight.position.set(4, 12, 6);
    spotLight.angle = Math.PI / 4;
    spotLight.penumbra = 0.8;
    spotLight.castShadow = true;
    spotLight.shadow.mapSize.width = 1024;
    spotLight.shadow.mapSize.height = 1024;
    spotLight.shadow.bias = -0.001;
    lightsGroup.add(spotLight);

    // Dynamic accent gold light for high-end flooring reflections
    const goldLight = new THREE.PointLight("#c29f5b", 1.8, 15);
    goldLight.position.set(-4, 3, -1);
    lightsGroup.add(goldLight);

    // Create Floor Plane representing active visualizer
    const floorGeo = new THREE.PlaneGeometry(16, 16, 64, 64);
    const proceduralTex = generateProceduralTexture(selectedMat, gloss);
    
    const floorMat = new THREE.MeshStandardMaterial({
      map: proceduralTex,
      roughness: selectedMat.roughness * (2 - gloss), // Map gloss value to roughness
      metalness: selectedMat.metalness,
      bumpMap: proceduralTex,
      bumpScale: selectedMat.patternType === "tile" ? 0.08 : 0.04,
    });

    const floorMesh = new THREE.Mesh(floorGeo, floorMat);
    floorMesh.rotation.x = -Math.PI / 2;
    floorMesh.position.y = -1.2;
    floorMesh.receiveShadow = true;
    scene.add(floorMesh);
    floorMeshRef.current = floorMesh;

    // Create decorative floating material samples (floating slabs)
    const sampleGroup = new THREE.Group();
    scene.add(sampleGroup);
    sampleSlabsGroupRef.current = sampleGroup;

    // Generate 3 decorative rotating samples floating above the floor
    const slabGeo = new THREE.BoxGeometry(1.6, 0.15, 1.0);
    const slabMaterials = [MATERIALS[0], MATERIALS[1], MATERIALS[4]]; // Oak, Walnut, Marble

    slabMaterials.forEach((mat, idx) => {
      const slabTex = generateProceduralTexture(mat, 0.6);
      const slabMat = new THREE.MeshStandardMaterial({
        map: slabTex,
        roughness: mat.roughness * 0.8,
        metalness: mat.metalness,
        bumpMap: slabTex,
        bumpScale: 0.06,
      });

      const slabMesh = new THREE.Mesh(slabGeo, slabMat);
      slabMesh.castShadow = true;
      slabMesh.receiveShadow = true;
      
      // Position them symmetrically in a semi-circle
      const angle = (idx - 1) * 1.2; // Spacing
      slabMesh.position.set(angle * 2.2, 1.2 + Math.sin(idx * 2) * 0.2, -1.5);
      slabMesh.rotation.set(0.2, angle * 0.5, 0);
      
      sampleGroup.add(slabMesh);
    });

    // Handle Resize
    const handleResize = () => {
      if (!containerRef.current || !camera || !renderer) return;
      camera.aspect = containerRef.current.clientWidth / containerRef.current.clientHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(containerRef.current.clientWidth, containerRef.current.clientHeight);
    };
    window.addEventListener("resize", handleResize);

    // Animation Loop
    let animationId: number;
    let clock = new THREE.Clock();

    const animate = () => {
      animationId = requestAnimationFrame(animate);
      const elapsedTime = clock.getElapsedTime();

      // Gentle parallax with mouse coordinates
      const targetCamX = mouseRef.current.x * 1.5;
      const targetCamY = 6 + mouseRef.current.y * 0.8;
      
      // Smooth interpolation (lerp)
      camera.position.x += (targetCamX - camera.position.x) * 0.08;
      camera.position.y += (targetCamY - camera.position.y) * 0.08;

      // Scroll-triggered camera slide
      const scrollRatio = Math.min(scrollRef.current.y / 800, 1.0);
      // As user scrolls, lower camera angle slightly for dynamic showroom feel
      camera.position.z = 9 - scrollRatio * 2.5;
      camera.position.y -= scrollRatio * 1.2;
      camera.lookAt(0, -0.5 - scrollRatio * 0.5, -1);

      // Animate floating slabs
      if (sampleGroup) {
        sampleGroup.position.y = Math.sin(elapsedTime * 1.5) * 0.15;
        sampleGroup.children.forEach((child, i) => {
          child.rotation.y += rotationSpeed * 0.02 * (i % 2 === 0 ? 1 : -1);
          child.rotation.x = 0.2 + Math.sin(elapsedTime * 1.2 + i) * 0.08;
        });
      }

      // Slightly move lights based on mouse for shifting glares and shadows
      if (lightsGroup) {
        lightsGroup.position.x = mouseRef.current.x * 2.5;
        lightsGroup.position.z = mouseRef.current.y * 1.5;
      }

      renderer.render(scene, camera);
    };

    animate();

    // Cleanup
    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener("resize", handleResize);
      proceduralTex.dispose();
      floorGeo.dispose();
      floorMat.dispose();
      renderer.dispose();
    };
  }, [selectedMat, gloss, rotationSpeed, showWireframe]);

  // Update wireframe mode
  useEffect(() => {
    if (!floorMeshRef.current) return;
    const mat = floorMeshRef.current.material as THREE.MeshStandardMaterial;
    mat.wireframe = showWireframe;
  }, [showWireframe]);

  const handleMaterialChange = (mat: MaterialOption) => {
    setSelectedMat(mat);
  };

  return (
    <div id="visualizer-container" className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch h-full max-w-7xl mx-auto px-4 md:px-8 py-12">
      {/* 3D Render Screen */}
      <div className="lg:col-span-8 relative rounded-3xl overflow-hidden border border-luxury-gold/20 shadow-2xl min-h-[400px] md:min-h-[500px] bg-wood-charcoal">
        {/* Render Canvas Container */}
        <div 
          ref={containerRef} 
          className={`w-full h-full absolute inset-0 transition-opacity duration-500 ${
            showroomMode === "3d" ? "opacity-100" : "opacity-0 pointer-events-none"
          }`} 
        />

        {/* Showcase Image Container */}
        <div 
          className={`w-full h-full absolute inset-0 bg-wood-charcoal transition-all duration-500 overflow-hidden flex items-center justify-center ${
            showroomMode === "photo" ? "opacity-100 scale-100" : "opacity-0 scale-95 pointer-events-none"
          }`}
        >
          {showroomMode === "photo" && (
            <div className="relative w-full h-full group">
              <img
                src="https://images.unsplash.com/photo-1618219908412-a29a1bb7b86e?auto=format&fit=crop&w=1600&q=80"
                alt="Sophria Luxury Chevron Wood Flooring Installation"
                className="w-full h-full object-cover transition-transform duration-1000 ease-out group-hover:scale-105 filter brightness-[0.85] contrast-[1.05]"
                referrerPolicy="no-referrer"
              />
              {/* Elegant golden radial vignette overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-wood-charcoal via-transparent to-black/30 pointer-events-none" />
              <div className="absolute inset-0 border-[8px] border-wood-charcoal/40 pointer-events-none" />
              <div className="absolute inset-2 border border-luxury-gold/20 pointer-events-none rounded-xl" />
            </div>
          )}
        </div>

        {/* Live Reflection Overlay Info */}
        <div className="absolute top-4 left-4 z-10 bg-wood-dark/85 backdrop-blur-md px-4 py-2.5 rounded-2xl border border-luxury-gold/20 text-xs text-gold-100 flex items-center gap-2 font-mono">
          <div className={`w-2.5 h-2.5 rounded-full ${showroomMode === "3d" ? "bg-emerald-500" : "bg-luxury-gold"} animate-pulse`} />
          <span>{showroomMode === "3d" ? "THREE.JS RENDERER ACTIVE" : "ARTISAN SHOWCASE ACTIVE"}</span>
        </div>

        <div className="absolute bottom-4 left-4 z-10 bg-wood-dark/85 backdrop-blur-md p-4 rounded-2xl border border-luxury-gold/15 max-w-xs transition-all">
          <span className="text-[10px] uppercase tracking-widest text-luxury-gold block font-semibold mb-1">
            {showroomMode === "3d" ? "Active Showroom Floor" : "Artisan Showcase"}
          </span>
          <h4 className="text-sm font-semibold text-white mb-1 font-display">
            {showroomMode === "3d" ? selectedMat.name : "Premium Chevron Hardwood"}
          </h4>
          <p className="text-xs text-gray-400">
            {showroomMode === "3d" ? (
              selectedMat.patternType === "herringbone" 
                ? "Herringbone layout provides 45° angled wood alignments." 
                : selectedMat.patternType === "tile" 
                ? "Flawless large-format grids with realistic structural grains."
                : "Classic parallel straight plank joints with natural grain variations."
            ) : (
              "A real-world luxury installation demonstrating millimetric chevron grain alignments under ambient light."
            )}
          </p>
        </div>

        {/* Mode Selector Tabs (3D Showroom vs Photo Showcase) */}
        <div className="absolute top-4 right-4 z-20 flex bg-wood-dark/90 p-1 rounded-xl border border-luxury-gold/20 shadow-md">
          <button
            onClick={() => setShowroomMode("3d")}
            className={`px-3 py-1.5 rounded-lg text-[10px] tracking-wider uppercase font-semibold transition-all duration-300 flex items-center gap-1.5 cursor-pointer ${
              showroomMode === "3d"
                ? "bg-luxury-gold text-wood-dark"
                : "text-gray-400 hover:text-white"
            }`}
          >
            <Sparkles className="w-3 h-3" />
            <span>3D Studio</span>
          </button>
          <button
            onClick={() => setShowroomMode("photo")}
            className={`px-3 py-1.5 rounded-lg text-[10px] tracking-wider uppercase font-semibold transition-all duration-300 flex items-center gap-1.5 cursor-pointer ${
              showroomMode === "photo"
                ? "bg-luxury-gold text-wood-dark"
                : "text-gray-400 hover:text-white"
            }`}
          >
            <Camera className="w-3 h-3" />
            <span>Artisan Photo</span>
          </button>
        </div>

        {/* Interactive Overlay Instructions */}
        {showroomMode === "3d" && (
          <div className="absolute top-16 right-4 z-10 flex gap-2">
            <button 
              onClick={() => setShowWireframe(!showWireframe)}
              className={`px-3 py-1.5 rounded-xl border text-[10px] tracking-wider uppercase font-semibold transition-all duration-300 cursor-pointer ${
                showWireframe 
                  ? "bg-luxury-gold text-wood-dark border-luxury-gold shadow-md" 
                  : "bg-wood-dark/80 text-gray-400 border-luxury-gold/20 hover:border-luxury-gold/50"
              }`}
            >
              {showWireframe ? "Slabs Wireframe" : "Solid Mesh"}
            </button>
          </div>
        )}
      </div>

      {/* Control Panel Panel */}
      <div className="lg:col-span-4 flex flex-col justify-between bg-wood-dark/65 backdrop-blur-md p-6 md:p-8 rounded-3xl border border-luxury-gold/15 shadow-xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-48 h-48 bg-luxury-gold/5 rounded-full blur-3xl -z-10" />

        <div className="space-y-6">
          <div>
            <div className="flex items-center gap-2 text-luxury-gold mb-1">
              <Sparkles className="w-4 h-4" />
              <span className="text-xs font-semibold tracking-widest uppercase font-mono">Bespoke 3D Studio</span>
            </div>
            <h3 className="text-2xl font-bold text-white tracking-tight font-display">
              Flooring Showroom
            </h3>
            <p className="text-xs text-gray-400 mt-1">
              Select premium materials and adjust finish gloss to preview the perfect configuration under high-end studio lighting.
            </p>
          </div>

          {/* Slabs Tab Switch */}
          <div className="flex gap-2 p-1 bg-wood-charcoal rounded-xl border border-luxury-gold/10">
            <button
              onClick={() => setActiveTab("wood")}
              className={`flex-1 py-2 text-xs font-semibold rounded-lg transition-all duration-300 font-display ${
                activeTab === "wood"
                  ? "bg-luxury-gold text-wood-dark shadow-md"
                  : "text-gray-400 hover:text-white"
              }`}
            >
              Hardwood & LVP
            </button>
            <button
              onClick={() => setActiveTab("tile")}
              className={`flex-1 py-2 text-xs font-semibold rounded-lg transition-all duration-300 font-display ${
                activeTab === "tile"
                  ? "bg-luxury-gold text-wood-dark shadow-md"
                  : "text-gray-400 hover:text-white"
              }`}
            >
              Stone & Porcelain
            </button>
          </div>

          {/* Material Grid */}
          <div className="space-y-3">
            <span className="text-xs font-semibold tracking-wider text-gray-400 uppercase">
              Select Material
            </span>
            <div className="grid grid-cols-1 gap-2 max-h-[190px] overflow-y-auto pr-1">
              {filteredMaterials.map((mat) => {
                const isSelected = selectedMat.id === mat.id;
                return (
                  <button
                    key={mat.id}
                    onClick={() => handleMaterialChange(mat)}
                    className={`flex items-center justify-between p-3 rounded-xl border transition-all duration-300 text-left ${
                      isSelected
                        ? "bg-luxury-gold/10 border-luxury-gold text-white"
                        : "bg-wood-charcoal/50 border-luxury-gold/5 text-gray-300 hover:bg-wood-charcoal hover:border-luxury-gold/20"
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      {/* Color Preview circle */}
                      <span
                        className="w-4 h-4 rounded-full border border-white/20"
                        style={{ backgroundColor: mat.baseColor }}
                      />
                      <div>
                        <h5 className="text-xs font-bold text-white font-sans">{mat.name}</h5>
                        <p className="text-[10px] text-gray-400 capitalize">
                          {mat.patternType} pattern
                        </p>
                      </div>
                    </div>
                    {isSelected && <Check className="w-4 h-4 text-luxury-gold" />}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Real-time Reflection Controls */}
          <div className="space-y-4 pt-3 border-t border-luxury-gold/10">
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-semibold tracking-wider text-gray-400 uppercase flex items-center gap-1.5">
                  <Sliders className="w-3.5 h-3.5 text-luxury-gold" />
                  Finish Sheen (Gloss)
                </span>
                <span className="text-[10px] font-bold text-luxury-gold bg-luxury-gold/10 px-1.5 py-0.5 rounded font-mono">
                  {gloss === 0 ? "Matte" : gloss < 0.4 ? "Satin" : gloss < 0.75 ? "Semi-Gloss" : "High-Gloss"}
                </span>
              </div>
              <input
                type="range"
                min="0.0"
                max="1.0"
                step="0.05"
                value={gloss}
                onChange={(e) => setGloss(parseFloat(e.target.value))}
                className="w-full accent-luxury-gold bg-wood-charcoal h-1 rounded-lg appearance-none cursor-pointer"
              />
            </div>

            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-semibold tracking-wider text-gray-400 uppercase flex items-center gap-1.5">
                  <RotateCw className="w-3.5 h-3.5 text-luxury-gold animate-spin" style={{ animationDuration: `${6 - rotationSpeed * 10}s` }} />
                  Sample Floating Spin
                </span>
                <span className="text-[10px] font-bold text-luxury-gold bg-luxury-gold/10 px-1.5 py-0.5 rounded font-mono">
                  {rotationSpeed === 0 ? "Static" : `${Math.round(rotationSpeed * 10)}x`}
                </span>
              </div>
              <input
                type="range"
                min="0.0"
                max="0.5"
                step="0.05"
                value={rotationSpeed}
                onChange={(e) => setRotationSpeed(parseFloat(e.target.value))}
                className="w-full accent-luxury-gold bg-wood-charcoal h-1 rounded-lg appearance-none cursor-pointer"
              />
            </div>
          </div>
        </div>

        {/* Lead Hook */}
        <div className="mt-6 pt-4 border-t border-luxury-gold/10">
          <p className="text-[11px] text-gray-400 italic text-center mb-3">
            Want to see physical samples of this white oak or limestone in your home's actual lighting?
          </p>
          <a
            href="#estimate-form"
            className="group flex items-center justify-center gap-2 w-full py-2.5 rounded-xl bg-luxury-gold hover:bg-gold-400 text-wood-dark font-bold text-xs uppercase tracking-wider transition-all duration-300 shadow-lg shadow-luxury-gold/10 hover:shadow-luxury-gold/20"
          >
            <span>Request Sample Demonstration</span>
            <ChevronRight className="w-3.5 h-3.5 transition-transform duration-300 group-hover:translate-x-1" />
          </a>
        </div>
      </div>
    </div>
  );
}
