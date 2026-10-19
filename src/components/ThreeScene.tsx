import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { RoomEnvironment } from 'three/examples/jsm/environments/RoomEnvironment.js';
import { 
  Eye, 
  Layers, 
  RotateCw, 
  Sun, 
  Moon, 
  Maximize2, 
  Minimize2, 
  Sparkles, 
  ChevronDown, 
  ChevronUp,
  Palette,
  Info
} from 'lucide-react';

interface ThreeSceneProps {
  onInquireTopic?: (topic: string) => void;
}

export const ThreeScene: React.FC<ThreeSceneProps> = ({ onInquireTopic }) => {
  const mountRef = useRef<HTMLDivElement>(null);
  
  // UI states
  const [activeView, setActiveView] = useState<'overview' | 'concrete' | 'epoxy' | 'exploded' | 'tech'>('overview');
  const [explodedProgress, setExplodedProgress] = useState<number>(0);
  const [concreteFinish, setConcreteFinish] = useState<'slate' | 'ashlar' | 'terracotta' | 'epoxy3d'>('slate');
  const [lightingMode, setLightingMode] = useState<'day' | 'dusk'>('day');
  const [autoRotate, setAutoRotate] = useState<boolean>(true);
  const [isControlsCollapsed, setIsControlsCollapsed] = useState<boolean>(false);
  const [isFullScreen, setIsFullScreen] = useState<boolean>(false);

  // Mutable refs to pass into animation loop without re-triggering useEffect
  const stateRef = useRef({
    explodedProgress: 0,
    concreteFinish: 'slate',
    lightingMode: 'day',
    autoRotate: true,
    targetCamPos: new THREE.Vector3(14, 11, 16),
    targetLookAt: new THREE.Vector3(0, 2, 0),
  });

  // Keep stateRef in sync with UI
  useEffect(() => {
    stateRef.current.explodedProgress = explodedProgress;
    stateRef.current.concreteFinish = concreteFinish;
    stateRef.current.lightingMode = lightingMode;
    stateRef.current.autoRotate = autoRotate;
  }, [explodedProgress, concreteFinish, lightingMode, autoRotate]);

  // Handle View Presets
  const handleSelectView = (view: 'overview' | 'concrete' | 'epoxy' | 'exploded' | 'tech') => {
    setActiveView(view);
    if (view === 'overview') {
      stateRef.current.targetCamPos.set(14, 10, 16);
      stateRef.current.targetLookAt.set(0, 2, 0);
      setExplodedProgress(0);
    } else if (view === 'concrete') {
      stateRef.current.targetCamPos.set(4, 2.5, 6);
      stateRef.current.targetLookAt.set(1.5, 0.4, 0);
      setExplodedProgress(0);
    } else if (view === 'epoxy') {
      stateRef.current.targetCamPos.set(4.2, 1.8, 5.0);
      stateRef.current.targetLookAt.set(2.5, 0.3, 1.0);
      setConcreteFinish('epoxy3d');
      setExplodedProgress(0);
    } else if (view === 'exploded') {
      stateRef.current.targetCamPos.set(8, 7, 10);
      stateRef.current.targetLookAt.set(-1, 2, 0);
      setExplodedProgress(75);
    } else if (view === 'tech') {
      stateRef.current.targetCamPos.set(0.5, 12, 14);
      stateRef.current.targetLookAt.set(0, 3, 0);
      setExplodedProgress(15);
    }
  };

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    // --- Procedural Textures Generation (CanvasTexture) ---
    // 1. Stamped Concrete Texture Generator
    const createStampedTexture = (pattern: 'slate' | 'ashlar' | 'terracotta') => {
      const canvas = document.createElement('canvas');
      canvas.width = 1024;
      canvas.height = 1024;
      const ctx = canvas.getContext('2d')!;

      // Background base
      if (pattern === 'slate') {
        ctx.fillStyle = '#222831';
      } else if (pattern === 'ashlar') {
        ctx.fillStyle = '#7a7062';
      } else {
        ctx.fillStyle = '#8d4c38';
      }
      ctx.fillRect(0, 0, 1024, 1024);

      // Procedural fine stone noise & flecks
      for (let i = 0; i < 40000; i++) {
        const x = Math.random() * 1024;
        const y = Math.random() * 1024;
        const radius = Math.random() * 2 + 0.5;
        const shade = Math.floor(Math.random() * 80);
        ctx.fillStyle = `rgba(${shade + 40}, ${shade + 35}, ${shade + 30}, 0.12)`;
        ctx.beginPath();
        ctx.arc(x, y, radius, 0, Math.PI * 2);
        ctx.fill();
      }

      // Stamped joint grooves
      ctx.strokeStyle = 'rgba(15, 17, 20, 0.85)';
      ctx.lineWidth = 10;
      ctx.lineCap = 'round';

      if (pattern === 'slate') {
        // Organic Italian slate polygon tiles
        const tileSize = 128;
        for (let x = 0; x <= 1024; x += tileSize) {
          for (let y = 0; y <= 1024; y += tileSize) {
            ctx.beginPath();
            ctx.moveTo(x + (Math.random() - 0.5) * 16, y);
            ctx.lineTo(x + tileSize + (Math.random() - 0.5) * 16, y);
            ctx.lineTo(x + tileSize, y + tileSize + (Math.random() - 0.5) * 16);
            ctx.stroke();
          }
        }
      } else if (pattern === 'ashlar') {
        // Ashlar rectangular interlocking stone courses
        const rowHeight = 96;
        for (let y = 0; y <= 1024; y += rowHeight) {
          ctx.beginPath();
          ctx.moveTo(0, y);
          ctx.lineTo(1024, y);
          ctx.stroke();

          const offset = (Math.floor(y / rowHeight) % 2) * 128;
          for (let x = offset; x <= 1024; x += 256) {
            ctx.beginPath();
            ctx.moveTo(x, y);
            ctx.lineTo(x, y + rowHeight);
            ctx.stroke();
          }
        }
      } else {
        // Herringbone or decorative interlocking tile
        const size = 64;
        for (let x = 0; x <= 1024; x += size) {
          ctx.beginPath();
          ctx.moveTo(x, 0);
          ctx.lineTo(x + 512, 1024);
          ctx.moveTo(x, 1024);
          ctx.lineTo(x + 512, 0);
          ctx.stroke();
        }
      }

      // Antique release powder highlights (gold & charcoal streaks)
      for (let j = 0; j < 300; j++) {
        const x = Math.random() * 1024;
        const y = Math.random() * 1024;
        ctx.fillStyle = pattern === 'slate' ? 'rgba(212, 175, 55, 0.08)' : 'rgba(240, 220, 180, 0.1)';
        ctx.fillRect(x, y, Math.random() * 40 + 10, Math.random() * 8 + 2);
      }

      const tex = new THREE.CanvasTexture(canvas);
      tex.wrapS = THREE.RepeatWrapping;
      tex.wrapT = THREE.RepeatWrapping;
      tex.repeat.set(4, 4);
      tex.colorSpace = THREE.SRGBColorSpace;
      return tex;
    };

    // Stamped normal / bump texture generator
    const createNormalTexture = () => {
      const canvas = document.createElement('canvas');
      canvas.width = 512;
      canvas.height = 512;
      const ctx = canvas.getContext('2d')!;

      // Neutral normal base (128, 128, 255)
      ctx.fillStyle = 'rgb(128, 128, 255)';
      ctx.fillRect(0, 0, 512, 512);

      // Grooves (simulate recessed joints)
      ctx.strokeStyle = 'rgb(80, 80, 210)';
      ctx.lineWidth = 8;
      const step = 64;
      for (let x = 0; x <= 512; x += step) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, 512);
        ctx.stroke();
      }
      for (let y = 0; y <= 512; y += step) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(512, y);
        ctx.stroke();
      }

      const tex = new THREE.CanvasTexture(canvas);
      tex.wrapS = THREE.RepeatWrapping;
      tex.wrapT = THREE.RepeatWrapping;
      tex.repeat.set(4, 4);
      return tex;
    };

    // 2. Solar Panel Texture Generator
    const createSolarTexture = () => {
      const canvas = document.createElement('canvas');
      canvas.width = 256;
      canvas.height = 256;
      const ctx = canvas.getContext('2d')!;
      ctx.fillStyle = '#0f1c3f';
      ctx.fillRect(0, 0, 256, 256);
      ctx.strokeStyle = 'rgba(70, 130, 220, 0.6)';
      ctx.lineWidth = 2;
      for (let x = 0; x <= 256; x += 32) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, 256);
        ctx.stroke();
      }
      for (let y = 0; y <= 256; y += 32) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(256, y);
        ctx.stroke();
      }
      const tex = new THREE.CanvasTexture(canvas);
      tex.wrapS = THREE.RepeatWrapping;
      tex.wrapT = THREE.RepeatWrapping;
      tex.repeat.set(3, 2);
      tex.colorSpace = THREE.SRGBColorSpace;
      return tex;
    };

    // 3. Rebar Mesh Texture for Exploded Layer
    const createRebarTexture = () => {
      const canvas = document.createElement('canvas');
      canvas.width = 128;
      canvas.height = 128;
      const ctx = canvas.getContext('2d')!;
      ctx.fillStyle = 'rgba(0,0,0,0)';
      ctx.clearRect(0, 0, 128, 128);
      ctx.strokeStyle = '#c07d38'; // Oxidized steel rebar tone
      ctx.lineWidth = 5;
      ctx.strokeRect(10, 10, 108, 108);
      const tex = new THREE.CanvasTexture(canvas);
      tex.wrapS = THREE.RepeatWrapping;
      tex.wrapT = THREE.RepeatWrapping;
      tex.repeat.set(8, 8);
      return tex;
    };

    // 4. Luxury 3D Metallic Optical Epoxy Texture Generator
    const createEpoxy3DTexture = () => {
      const canvas = document.createElement('canvas');
      canvas.width = 1024;
      canvas.height = 1024;
      const ctx = canvas.getContext('2d')!;

      // Deep obsidian / midnight-navy resin base
      const bgGrad = ctx.createLinearGradient(0, 0, 1024, 1024);
      bgGrad.addColorStop(0, '#060b13');
      bgGrad.addColorStop(0.3, '#0c1626');
      bgGrad.addColorStop(0.7, '#131e33');
      bgGrad.addColorStop(1, '#080d18');
      ctx.fillStyle = bgGrad;
      ctx.fillRect(0, 0, 1024, 1024);

      // Swirling liquid metallic marble veins & 3D translucent depth
      const drawVein = (startX: number, startY: number, color: string, width: number, curves: number) => {
        ctx.strokeStyle = color;
        ctx.lineWidth = width;
        ctx.lineCap = 'round';
        ctx.beginPath();
        ctx.moveTo(startX, startY);
        let cx = startX;
        let cy = startY;
        for (let i = 0; i < curves; i++) {
          const nx = cx + (Math.random() - 0.5) * 350;
          const ny = cy + Math.random() * 250;
          const cpx = cx + (Math.random() - 0.5) * 200;
          const cpy = cy + (Math.random() - 0.5) * 200;
          ctx.quadraticCurveTo(cpx, cpy, nx, ny);
          cx = nx;
          cy = ny;
        }
        ctx.stroke();
      };

      // Primary liquid gold veins
      for (let v = 0; v < 8; v++) {
        drawVein(Math.random() * 1024, Math.random() * 300, 'rgba(212, 175, 55, 0.45)', 18, 5);
        drawVein(Math.random() * 1024, Math.random() * 300, 'rgba(245, 215, 120, 0.75)', 7, 6);
        drawVein(Math.random() * 1024, Math.random() * 300, 'rgba(255, 255, 255, 0.35)', 2, 6);
      }

      // Secondary translucent pearlescent smoke / marble swirls
      for (let s = 0; s < 12; s++) {
        drawVein(Math.random() * 1024, Math.random() * 500, 'rgba(70, 110, 160, 0.25)', 24, 4);
      }

      // Metallic mica speckles
      for (let m = 0; m < 5000; m++) {
        const x = Math.random() * 1024;
        const y = Math.random() * 1024;
        ctx.fillStyle = Math.random() > 0.5 ? 'rgba(212, 175, 55, 0.6)' : 'rgba(255, 255, 255, 0.4)';
        ctx.fillRect(x, y, Math.random() * 2.5 + 0.5, Math.random() * 2.5 + 0.5);
      }

      const tex = new THREE.CanvasTexture(canvas);
      tex.wrapS = THREE.RepeatWrapping;
      tex.wrapT = THREE.RepeatWrapping;
      tex.repeat.set(2, 2);
      tex.colorSpace = THREE.SRGBColorSpace;
      return tex;
    };

    const slateTexture = createStampedTexture('slate');
    const ashlarTexture = createStampedTexture('ashlar');
    const terracottaTexture = createStampedTexture('terracotta');
    const epoxy3dTexture = createEpoxy3DTexture();
    const bumpMap = createNormalTexture();
    const solarTex = createSolarTexture();
    const rebarTex = createRebarTexture();

    // Scene setup
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0x060d17);
    scene.fog = new THREE.FogExp2(0x060d17, 0.022);

    const camera = new THREE.PerspectiveCamera(
      42,
      container.clientWidth / container.clientHeight,
      0.1,
      100
    );
    camera.position.set(14, 11, 16);

    // Renderer setup following guidelines
    const isHeadless = navigator.webdriver || /HeadlessChrome/i.test(navigator.userAgent);
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: false, powerPreference: 'high-performance' });
    renderer.setSize(container.clientWidth, container.clientHeight);
    renderer.setPixelRatio(isHeadless ? 1 : Math.min(window.devicePixelRatio, 2));
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.15;
    renderer.shadowMap.enabled = !isHeadless;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;

    container.appendChild(renderer.domElement);

    // Procedural Studio Environment Reflection (RoomEnvironment + PMREMGenerator)
    const pmremGenerator = new THREE.PMREMGenerator(renderer);
    scene.environment = pmremGenerator.fromScene(new RoomEnvironment(), 0.04).texture;
    pmremGenerator.dispose();

    // OrbitControls
    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.05;
    controls.maxPolarAngle = Math.PI / 2 - 0.02; // Prevent camera from going under ground
    controls.minDistance = 3.5;
    controls.maxDistance = 35;
    controls.target.set(0, 2, 0);

    // Studio Lighting Rig
    // 1. Hemisphere light (Warm sky / cool deep navy bounce)
    const hemiLight = new THREE.HemisphereLight(0xfffaed, 0x081b33, 1.2);
    hemiLight.position.set(0, 20, 0);
    scene.add(hemiLight);

    // 2. Key Directional Light with tight shadow frustum
    const keyLight = new THREE.DirectionalLight(0xfff5dd, 2.4);
    keyLight.position.set(16, 22, 14);
    keyLight.castShadow = true;
    keyLight.shadow.mapSize.width = 2048;
    keyLight.shadow.mapSize.height = 2048;
    keyLight.shadow.camera.near = 0.5;
    keyLight.shadow.camera.far = 45;
    const d = 12;
    keyLight.shadow.camera.left = -d;
    keyLight.shadow.camera.right = d;
    keyLight.shadow.camera.top = d;
    keyLight.shadow.camera.bottom = -d;
    keyLight.shadow.bias = -0.0004;
    keyLight.shadow.normalBias = 0.02;
    scene.add(keyLight);

    // 3. Fill Light (Cool cyan-tinted architectural fill)
    const fillLight = new THREE.DirectionalLight(0x4070a0, 0.9);
    fillLight.position.set(-14, 12, -10);
    scene.add(fillLight);

    // 4. Warm Accent Rim Light
    const rimLight = new THREE.DirectionalLight(0xd4af37, 1.1);
    rimLight.position.set(-6, 8, 12);
    scene.add(rimLight);

    // 5. Architectural In-Ground Bollard Lights (Warm Golden Point Lights)
    const bollardLight1 = new THREE.PointLight(0xffd575, 1.5, 5, 2);
    bollardLight1.position.set(4, 0.4, 3);
    scene.add(bollardLight1);

    const bollardLight2 = new THREE.PointLight(0xffd575, 1.5, 5, 2);
    bollardLight2.position.set(-4, 0.4, 3);
    scene.add(bollardLight2);

    // --- PROCEDURAL 3-12 PART PROCEDURAL MODEL ASSEMBLIES ---
    const rootGroup = new THREE.Group();
    scene.add(rootGroup);

    // 1. Ground & Perimeter Terrain Group
    const groundGroup = new THREE.Group();
    rootGroup.add(groundGroup);

    // Deep soil / sub-grade base
    const baseGeo = new THREE.BoxGeometry(26, 0.8, 22);
    baseGeo.translate(0, -0.4, 0); // bottom center flush
    const baseMat = new THREE.MeshStandardMaterial({
      color: 0x091424,
      roughness: 0.95,
      metalness: 0.05
    });
    const baseMesh = new THREE.Mesh(baseGeo, baseMat);
    baseMesh.receiveShadow = true;
    groundGroup.add(baseMesh);

    // Perimeter curbs & perimeter fence walls with gold capping
    const curbMat = new THREE.MeshStandardMaterial({
      color: 0x1f2937,
      roughness: 0.8,
      metalness: 0.2
    });
    const goldCapMat = new THREE.MeshStandardMaterial({
      color: 0xd4af37,
      roughness: 0.35,
      metalness: 0.85
    });

    // Boundary walls (North and West sides)
    const wallGeo = new THREE.BoxGeometry(24, 2.2, 0.4);
    const wallNorth = new THREE.Mesh(wallGeo, curbMat);
    wallNorth.position.set(0, 1.1, -10.5);
    wallNorth.castShadow = true;
    wallNorth.receiveShadow = true;
    groundGroup.add(wallNorth);

    const wallCapGeo = new THREE.BoxGeometry(24.2, 0.12, 0.5);
    const wallNorthCap = new THREE.Mesh(wallCapGeo, goldCapMat);
    wallNorthCap.position.set(0, 2.25, -10.5);
    groundGroup.add(wallNorthCap);

    const wallWestGeo = new THREE.BoxGeometry(0.4, 2.2, 21);
    const wallWest = new THREE.Mesh(wallWestGeo, curbMat);
    wallWest.position.set(-12, 1.1, 0);
    wallWest.castShadow = true;
    groundGroup.add(wallWest);

    // Radial Soft Contact Shadow under building & compound
    const shadowGeo = new THREE.PlaneGeometry(25, 21);
    const shadowCanvas = document.createElement('canvas');
    shadowCanvas.width = 256;
    shadowCanvas.height = 256;
    const sCtx = shadowCanvas.getContext('2d')!;
    const gradient = sCtx.createRadialGradient(128, 128, 20, 128, 128, 120);
    gradient.addColorStop(0, 'rgba(0, 0, 0, 0.7)');
    gradient.addColorStop(0.5, 'rgba(0, 0, 0, 0.35)');
    gradient.addColorStop(1, 'rgba(0, 0, 0, 0)');
    sCtx.fillStyle = gradient;
    sCtx.fillRect(0, 0, 256, 256);
    const shadowTex = new THREE.CanvasTexture(shadowCanvas);
    const shadowMat = new THREE.MeshBasicMaterial({
      map: shadowTex,
      transparent: true,
      depthWrite: false,
      opacity: 0.85
    });
    const contactShadow = new THREE.Mesh(shadowGeo, shadowMat);
    contactShadow.rotation.x = -Math.PI / 2;
    contactShadow.position.y = 0.005;
    groundGroup.add(contactShadow);

    // 2. STAMPED CONCRETE MAIN DRIVEWAY & FORECOURT SLAB
    const concreteMat = new THREE.MeshStandardMaterial({
      map: slateTexture,
      bumpMap: bumpMap,
      bumpScale: 0.035,
      roughness: 0.28, // High-gloss/satin acrylic UV sealer reflection
      metalness: 0.12,
    });
    concreteMat.polygonOffset = true;
    concreteMat.polygonOffsetFactor = -1;
    concreteMat.polygonOffsetUnits = -1;

    const concreteSlabGeo = new THREE.BoxGeometry(11, 0.14, 14);
    concreteSlabGeo.translate(0, 0.07, 0);
    const concreteDriveway = new THREE.Mesh(concreteSlabGeo, concreteMat);
    concreteDriveway.position.set(4, 0, 1);
    concreteDriveway.receiveShadow = true;
    concreteDriveway.castShadow = true;
    rootGroup.add(concreteDriveway);

    // 3. EXPLODED CUTAWAY LAYERS GROUP (Demonstrating Stamped Concrete Engineering)
    // Layer 1: Compacted Hardcore Sub-base
    // Layer 2: Heavy-Duty BRC Rebar Reinforcement Wire Mesh
    // Layer 3: Structural High-Strength Concrete Core
    // Layer 4: Pigmented Color Hardener & Stamped Impression
    // Layer 5: High-Solid Acrylic Protective UV Sealer
    const explodedGroup = new THREE.Group();
    explodedGroup.position.set(-6.5, 0, 3.5);
    rootGroup.add(explodedGroup);

    const layerSizeX = 4.2;
    const layerSizeZ = 5.2;

    // Sub-base layer
    const subBaseGeo = new THREE.BoxGeometry(layerSizeX, 0.15, layerSizeZ);
    const subBaseMat = new THREE.MeshStandardMaterial({
      color: 0x4a433a,
      roughness: 0.95,
      metalness: 0.05
    });
    const subBaseMesh = new THREE.Mesh(subBaseGeo, subBaseMat);
    subBaseMesh.castShadow = true;
    subBaseMesh.receiveShadow = true;
    explodedGroup.add(subBaseMesh);

    // Rebar mesh layer
    const rebarGeo = new THREE.PlaneGeometry(layerSizeX, layerSizeZ);
    const rebarMat = new THREE.MeshStandardMaterial({
      map: rebarTex,
      transparent: true,
      metalness: 0.9,
      roughness: 0.35,
      side: THREE.DoubleSide
    });
    const rebarMesh = new THREE.Mesh(rebarGeo, rebarMat);
    rebarMesh.rotation.x = -Math.PI / 2;
    explodedGroup.add(rebarMesh);

    // Cast Concrete Core
    const concreteCoreGeo = new THREE.BoxGeometry(layerSizeX, 0.18, layerSizeZ);
    const concreteCoreMat = new THREE.MeshStandardMaterial({
      color: 0x787d85,
      roughness: 0.85,
      metalness: 0.1
    });
    const concreteCoreMesh = new THREE.Mesh(concreteCoreGeo, concreteCoreMat);
    explodedGroup.add(concreteCoreMesh);

    // Surface Stamped Layer
    const stampedTopGeo = new THREE.BoxGeometry(layerSizeX, 0.06, layerSizeZ);
    const stampedTopMesh = new THREE.Mesh(stampedTopGeo, concreteMat);
    explodedGroup.add(stampedTopMesh);

    // Protective Acrylic Sealer
    const sealerGeo = new THREE.BoxGeometry(layerSizeX, 0.03, layerSizeZ);
    const sealerMat = new THREE.MeshPhysicalMaterial({
      color: 0xffffff,
      transmission: 0.85,
      opacity: 0.65,
      transparent: true,
      roughness: 0.08,
      metalness: 0.1,
      clearcoat: 1.0,
      clearcoatRoughness: 0.05,
      reflectivity: 0.9
    });
    const sealerMesh = new THREE.Mesh(sealerGeo, sealerMat);
    explodedGroup.add(sealerMesh);

    // 4. LUXURY ARCHITECTURAL CONTEMPORARY VILLA (3-12 Composite Parts)
    const villaGroup = new THREE.Group();
    villaGroup.position.set(-3.5, 0, -3.5);
    rootGroup.add(villaGroup);

    // Ground floor main residential wing
    const groundWingGeo = new THREE.BoxGeometry(7, 3.2, 7.5);
    groundWingGeo.translate(0, 1.6, 0);
    const wallWhiteMat = new THREE.MeshStandardMaterial({
      color: 0xf3f4f6,
      roughness: 0.75,
      metalness: 0.08
    });
    const groundWing = new THREE.Mesh(groundWingGeo, wallWhiteMat);
    groundWing.castShadow = true;
    groundWing.receiveShadow = true;
    villaGroup.add(groundWing);

    // Accent dark cladding section (Cantilever first floor wing)
    const upperWingGeo = new THREE.BoxGeometry(7.8, 3.0, 6.2);
    upperWingGeo.translate(0.6, 4.6, 0.5);
    const darkWoodMat = new THREE.MeshStandardMaterial({
      color: 0x161e2e,
      roughness: 0.45,
      metalness: 0.45
    });
    const upperWing = new THREE.Mesh(upperWingGeo, darkWoodMat);
    upperWing.castShadow = true;
    upperWing.receiveShadow = true;
    villaGroup.add(upperWing);

    // Large floor-to-ceiling tinted glass curtain windows
    const glassMat = new THREE.MeshPhysicalMaterial({
      color: 0x8eb9e5,
      transmission: 0.88,
      opacity: 0.7,
      transparent: true,
      roughness: 0.05,
      metalness: 0.2,
      clearcoat: 1.0
    });
    const windowGeo = new THREE.BoxGeometry(3.6, 2.2, 0.1);
    const groundWindow = new THREE.Mesh(windowGeo, glassMat);
    groundWindow.position.set(0.5, 1.8, 3.8);
    villaGroup.add(groundWindow);

    const upperWindowGeo = new THREE.BoxGeometry(4.2, 2.0, 0.1);
    const upperWindow = new THREE.Mesh(upperWindowGeo, glassMat);
    upperWindow.position.set(1.5, 4.6, 3.65);
    villaGroup.add(upperWindow);

    // First floor cantilever balcony terrace with glass balustrade & gold handrail
    const balconyFloorGeo = new THREE.BoxGeometry(4.6, 0.18, 1.6);
    const balconyFloor = new THREE.Mesh(balconyFloorGeo, darkWoodMat);
    balconyFloor.position.set(1.5, 3.2, 4.5);
    balconyFloor.castShadow = true;
    villaGroup.add(balconyFloor);

    const balustradeGeo = new THREE.BoxGeometry(4.6, 0.9, 0.05);
    const balustrade = new THREE.Mesh(balustradeGeo, glassMat);
    balustrade.position.set(1.5, 3.75, 5.25);
    villaGroup.add(balustrade);

    const handrailGeo = new THREE.BoxGeometry(4.64, 0.06, 0.08);
    const handrail = new THREE.Mesh(handrailGeo, goldCapMat);
    handrail.position.set(1.5, 4.22, 5.25);
    villaGroup.add(handrail);

    // Entrance Pergola with warm timber/charcoal slats
    const pergolaPostGeo = new THREE.CylinderGeometry(0.08, 0.08, 3.2, 16);
    const pergolaMat = new THREE.MeshStandardMaterial({
      color: 0x1f2937,
      metalness: 0.8,
      roughness: 0.25
    });
    const post1 = new THREE.Mesh(pergolaPostGeo, pergolaMat);
    post1.position.set(2.8, 1.6, 4.2);
    post1.castShadow = true;
    villaGroup.add(post1);

    const post2 = new THREE.Mesh(pergolaPostGeo, pergolaMat);
    post2.position.set(0.6, 1.6, 4.2);
    post2.castShadow = true;
    villaGroup.add(post2);

    // Pergola horizontal slats
    for (let s = 0; s < 6; s++) {
      const slatGeo = new THREE.BoxGeometry(2.4, 0.08, 0.12);
      const slat = new THREE.Mesh(slatGeo, goldCapMat);
      slat.position.set(1.7, 3.2, 3.4 + s * 0.22);
      slat.castShadow = true;
      villaGroup.add(slat);
    }

    // Modern architectural pivot door with gold pull bar
    const doorGeo = new THREE.BoxGeometry(1.2, 2.5, 0.08);
    const doorMat = new THREE.MeshStandardMaterial({
      color: 0x0f172a,
      roughness: 0.3,
      metalness: 0.5
    });
    const door = new THREE.Mesh(doorGeo, doorMat);
    door.position.set(-1.8, 1.3, 3.8);
    villaGroup.add(door);

    const handleGeo = new THREE.CylinderGeometry(0.02, 0.02, 1.2, 16);
    const handle = new THREE.Mesh(handleGeo, goldCapMat);
    handle.position.set(-1.4, 1.3, 3.86);
    villaGroup.add(handle);

    // Parapet roof with Solar Array (representing digital & green engineering)
    const roofBaseGeo = new THREE.BoxGeometry(7.8, 0.25, 6.2);
    const roofBase = new THREE.Mesh(roofBaseGeo, darkWoodMat);
    roofBase.position.set(0.6, 6.2, 0.5);
    villaGroup.add(roofBase);

    // Solar panels on roof
    const solarGeo = new THREE.PlaneGeometry(5.2, 3.2);
    const solarMat = new THREE.MeshStandardMaterial({
      map: solarTex,
      roughness: 0.18,
      metalness: 0.85
    });
    const solarMesh = new THREE.Mesh(solarGeo, solarMat);
    solarMesh.rotation.x = -Math.PI / 2 + 0.15; // Tilted slightly for solar absorption
    solarMesh.position.set(0.6, 6.45, 0.3);
    solarMesh.castShadow = true;
    villaGroup.add(solarMesh);

    // Architectural Planters with Procedural Tropical Shrubs
    const planterGeo = new THREE.BoxGeometry(2.6, 0.5, 0.8);
    const planterMat = new THREE.MeshStandardMaterial({
      color: 0x1f2937,
      roughness: 0.7,
      metalness: 0.2
    });
    const planter1 = new THREE.Mesh(planterGeo, planterMat);
    planter1.position.set(1.5, 0.25, 6.2);
    planter1.castShadow = true;
    groundGroup.add(planter1);

    // Procedural shrub foliage atop planter (composite spheres)
    const shrubMat = new THREE.MeshStandardMaterial({
      color: 0x1e5631,
      roughness: 0.85,
      metalness: 0.05
    });
    for (let f = 0; f < 3; f++) {
      const shrubGeo = new THREE.DodecahedronGeometry(0.35 + Math.random() * 0.1, 1);
      const shrub = new THREE.Mesh(shrubGeo, shrubMat);
      shrub.position.set(0.7 + f * 0.8, 0.65, 6.2);
      shrub.castShadow = true;
      groundGroup.add(shrub);
    }

    // 5. Tech Innovation Hub Beacon (representing AI, Digital Infrastructure)
    const techBeaconGroup = new THREE.Group();
    techBeaconGroup.position.set(8.5, 0, -6.5);
    rootGroup.add(techBeaconGroup);

    const pedestalGeo = new THREE.CylinderGeometry(0.9, 1.1, 0.5, 32);
    const pedestal = new THREE.Mesh(pedestalGeo, curbMat);
    pedestal.position.y = 0.25;
    techBeaconGroup.add(pedestal);

    // Holographic AI Core crystal
    const crystalGeo = new THREE.OctahedronGeometry(0.7, 0);
    const crystalMat = new THREE.MeshPhysicalMaterial({
      color: 0xd4af37,
      emissive: 0x3d2800,
      roughness: 0.15,
      metalness: 0.95,
      transmission: 0.4,
      clearcoat: 1.0
    });
    const crystal = new THREE.Mesh(crystalGeo, crystalMat);
    crystal.position.y = 1.3;
    techBeaconGroup.add(crystal);

    // Orbital ring around crystal
    const ringGeo = new THREE.TorusGeometry(1.1, 0.03, 16, 64);
    const ringMat = new THREE.MeshStandardMaterial({
      color: 0xd4af37,
      metalness: 0.95,
      roughness: 0.15
    });
    const orbitalRing = new THREE.Mesh(ringGeo, ringMat);
    orbitalRing.position.y = 1.3;
    orbitalRing.rotation.x = Math.PI / 3;
    techBeaconGroup.add(orbitalRing);

    // Pre-allocated scratch math vectors to prevent GC allocations
    const _targetPos = new THREE.Vector3();
    const _targetLook = new THREE.Vector3();

    // Clock for delta timing
    const clock = new THREE.Clock();
    let animationFrameId: number;

    // Render loop with exponential damping & 60fps smoothness
    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);
      const delta = clock.getDelta();
      const elapsed = clock.getElapsedTime();

      // Camera smooth damping
      _targetPos.copy(stateRef.current.targetCamPos);
      _targetLook.copy(stateRef.current.targetLookAt);

      camera.position.x = THREE.MathUtils.damp(camera.position.x, _targetPos.x, 3.5, delta);
      camera.position.y = THREE.MathUtils.damp(camera.position.y, _targetPos.y, 3.5, delta);
      camera.position.z = THREE.MathUtils.damp(camera.position.z, _targetPos.z, 3.5, delta);

      controls.target.x = THREE.MathUtils.damp(controls.target.x, _targetLook.x, 3.5, delta);
      controls.target.y = THREE.MathUtils.damp(controls.target.y, _targetLook.y, 3.5, delta);
      controls.target.z = THREE.MathUtils.damp(controls.target.z, _targetLook.z, 3.5, delta);
      controls.update();

      // Exploded Layer Kinematics (Physical Separation)
      const explodeVal = stateRef.current.explodedProgress / 100;
      subBaseMesh.position.y = THREE.MathUtils.damp(subBaseMesh.position.y, 0.08, 6.0, delta);
      rebarMesh.position.y = THREE.MathUtils.damp(rebarMesh.position.y, 0.18 + explodeVal * 0.7, 6.0, delta);
      concreteCoreMesh.position.y = THREE.MathUtils.damp(concreteCoreMesh.position.y, 0.28 + explodeVal * 1.5, 6.0, delta);
      stampedTopMesh.position.y = THREE.MathUtils.damp(stampedTopMesh.position.y, 0.42 + explodeVal * 2.3, 6.0, delta);
      sealerMesh.position.y = THREE.MathUtils.damp(sealerMesh.position.y, 0.52 + explodeVal * 3.1, 6.0, delta);

      // Tech Beacon Animation
      crystal.rotation.y += 0.015;
      crystal.position.y = 1.3 + Math.sin(elapsed * 2.5) * 0.08;
      orbitalRing.rotation.z += 0.02;

      // Concrete & 3D Epoxy finish material map update
      if (stateRef.current.concreteFinish === 'slate' && concreteMat.map !== slateTexture) {
        concreteMat.map = slateTexture;
        concreteMat.bumpMap = bumpMap;
        concreteMat.bumpScale = 0.035;
        concreteMat.roughness = 0.28;
        concreteMat.metalness = 0.12;
        concreteMat.color.setHex(0xffffff);
        concreteMat.needsUpdate = true;
      } else if (stateRef.current.concreteFinish === 'ashlar' && concreteMat.map !== ashlarTexture) {
        concreteMat.map = ashlarTexture;
        concreteMat.bumpMap = bumpMap;
        concreteMat.bumpScale = 0.035;
        concreteMat.roughness = 0.28;
        concreteMat.metalness = 0.12;
        concreteMat.color.setHex(0xffffff);
        concreteMat.needsUpdate = true;
      } else if (stateRef.current.concreteFinish === 'terracotta' && concreteMat.map !== terracottaTexture) {
        concreteMat.map = terracottaTexture;
        concreteMat.bumpMap = bumpMap;
        concreteMat.bumpScale = 0.035;
        concreteMat.roughness = 0.28;
        concreteMat.metalness = 0.12;
        concreteMat.color.setHex(0xffffff);
        concreteMat.needsUpdate = true;
      } else if (stateRef.current.concreteFinish === 'epoxy3d' && concreteMat.map !== epoxy3dTexture) {
        concreteMat.map = epoxy3dTexture;
        concreteMat.bumpMap = null;
        concreteMat.bumpScale = 0.0;
        concreteMat.roughness = 0.03;
        concreteMat.metalness = 0.45;
        concreteMat.color.setHex(0xffffff);
        concreteMat.needsUpdate = true;
      }

      // Lighting Mode Update (Day sun vs. Dusk ambient)
      if (stateRef.current.lightingMode === 'day') {
        keyLight.intensity = THREE.MathUtils.damp(keyLight.intensity, 2.4, 4.0, delta);
        keyLight.color.setHex(0xfff5dd);
        hemiLight.intensity = THREE.MathUtils.damp(hemiLight.intensity, 1.2, 4.0, delta);
        bollardLight1.intensity = THREE.MathUtils.damp(bollardLight1.intensity, 0.5, 4.0, delta);
        bollardLight2.intensity = THREE.MathUtils.damp(bollardLight2.intensity, 0.5, 4.0, delta);
        if (scene.fog) scene.fog.color.setHex(0x060d17);
        scene.background = new THREE.Color(0x060d17);
      } else {
        // Dusk/Night with glowing architectural warm lighting
        keyLight.intensity = THREE.MathUtils.damp(keyLight.intensity, 0.6, 4.0, delta);
        keyLight.color.setHex(0x406090);
        hemiLight.intensity = THREE.MathUtils.damp(hemiLight.intensity, 0.4, 4.0, delta);
        bollardLight1.intensity = THREE.MathUtils.damp(bollardLight1.intensity, 2.8, 4.0, delta);
        bollardLight2.intensity = THREE.MathUtils.damp(bollardLight2.intensity, 2.8, 4.0, delta);
        if (scene.fog) scene.fog.color.setHex(0x03070e);
        scene.background = new THREE.Color(0x03070e);
      }

      // Slow elegant auto-rotation when user is not dragging
      if (stateRef.current.autoRotate) {
        rootGroup.rotation.y += 0.003;
      }

      renderer.render(scene, camera);
    };

    // Pre-warm shader pipeline once
    renderer.compile(scene, camera);
    animate();

    // Window resize handler
    const handleResize = () => {
      if (!container) return;
      camera.aspect = container.clientWidth / container.clientHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(container.clientWidth, container.clientHeight);
    };
    window.addEventListener('resize', handleResize);

    // Keyboard shortcut 'H' to toggle controls
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'h' || e.key === 'H') {
        setIsControlsCollapsed((prev) => !prev);
      }
    };
    window.addEventListener('keydown', handleKeyDown);

    // Cleanup
    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('keydown', handleKeyDown);
      controls.dispose();
      renderer.dispose();
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
    };
  }, []);

  return (
    <div className={`relative w-full overflow-hidden transition-all duration-300 ${isFullScreen ? 'fixed inset-0 z-50 h-screen' : 'h-[620px] rounded-2xl border border-slate-800'}`}>
      
      {/* 3D WebGL Canvas Container */}
      <div ref={mountRef} className="w-full h-full cursor-grab active:cursor-grabbing bg-slate-950" />

      {/* Top Left Floating Minimal Badge */}
      <div className="absolute top-4 left-4 z-10 pointer-events-none">
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-navy-950/90 border border-slate-800 shadow-md">
          <span className="w-2.5 h-2.5 rounded-full bg-gold-400"></span>
          <span className="text-xs font-bold text-white tracking-wide">3D Interactive Architectural Model</span>
          <span className="text-[10px] text-slate-400 border-l border-slate-700 pl-2">Drag to rotate • Scroll to zoom</span>
        </div>
      </div>

      {/* Top Right Quick Actions */}
      <div className="absolute top-4 right-4 z-10 flex items-center gap-2">
        <button
          onClick={() => setAutoRotate(!autoRotate)}
          className={`p-2 rounded-lg text-xs font-semibold border transition ${
            autoRotate 
              ? 'bg-gold-500 text-navy-950 border-gold-400' 
              : 'bg-navy-900/90 text-slate-300 border-slate-700 hover:text-white'
          }`}
          title={autoRotate ? "Pause Auto-Rotation" : "Resume Auto-Rotation"}
        >
          <RotateCw className="w-4 h-4" />
        </button>

        <button
          onClick={() => setIsFullScreen(!isFullScreen)}
          className="p-2 rounded-lg bg-navy-900/90 text-slate-300 border border-slate-700 hover:text-white transition"
          title={isFullScreen ? "Exit Fullscreen" : "Fullscreen 3D View"}
        >
          {isFullScreen ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
        </button>
      </div>

      {/* Unified Bottom Control Dock (Consolidated, Zero-Occlusion, Collapsible) */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-20 w-[95%] max-w-4xl">
        
        {/* Toggle Drawer Button */}
        <div className="flex justify-center mb-1">
          <button
            onClick={() => setIsControlsCollapsed(!isControlsCollapsed)}
            className="px-3.5 py-1 rounded-t-lg bg-navy-900/95 border-t border-x border-slate-700 text-[11px] font-semibold text-slate-300 hover:text-gold-400 transition flex items-center gap-1.5 shadow-lg"
          >
            {isControlsCollapsed ? (
              <>
                <ChevronUp className="w-3.5 h-3.5" />
                <span>Show 3D Control Dock</span>
              </>
            ) : (
              <>
                <ChevronDown className="w-3.5 h-3.5" />
                <span>Hide Controls (Press H)</span>
              </>
            )}
          </button>
        </div>

        {/* Floating Dock Surface */}
        {!isControlsCollapsed && (
          <div className="rounded-xl bg-navy-900/95 border border-slate-700/90 shadow-2xl p-3.5 text-xs text-slate-200">
            <div className="flex flex-wrap items-center justify-between gap-4">
              
              {/* Preset View Pills */}
              <div className="flex items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0">
                <span className="text-[11px] font-bold text-gold-400 uppercase tracking-wider mr-1 hidden sm:inline">Views:</span>
                {[
                  { id: 'overview', label: 'Villa & Grounds', icon: Eye },
                  { id: 'concrete', label: 'Stamped Concrete', icon: Palette },
                  { id: 'exploded', label: 'Structural Layers', icon: Layers },
                  { id: 'epoxy', label: '3D Epoxy Floor', icon: Sparkles },
                  { id: 'tech', label: 'Digital Hub', icon: Sparkles },
                ].map((tab) => {
                  const Icon = tab.icon;
                  return (
                    <button
                      key={tab.id}
                      onClick={() => handleSelectView(tab.id as any)}
                      className={`px-3 py-1.5 rounded-lg font-medium transition flex items-center gap-1.5 whitespace-nowrap text-xs ${
                        activeView === tab.id
                          ? 'bg-gold-500 text-navy-950 font-bold shadow'
                          : 'bg-navy-950/80 text-slate-300 hover:text-white border border-slate-800'
                      }`}
                    >
                      <Icon className="w-3.5 h-3.5" />
                      <span>{tab.label}</span>
                    </button>
                  );
                })}
              </div>

              {/* Concrete & 3D Epoxy Finish Swatches */}
              <div className="flex items-center gap-2">
                <span className="text-[11px] font-bold text-slate-400 hidden md:inline">Finish:</span>
                <button
                  onClick={() => setConcreteFinish('epoxy3d')}
                  className={`px-2.5 py-1 rounded text-[11px] font-semibold border transition flex items-center gap-1 ${
                    concreteFinish === 'epoxy3d'
                      ? 'border-gold-400 bg-gold-500/30 text-gold-300 shadow-sm'
                      : 'border-slate-800 bg-navy-950 text-slate-400 hover:text-slate-200'
                  }`}
                  title="3D Metallic Marble Epoxy (Mirror Glass Resin)"
                >
                  <Sparkles className="w-3 h-3 text-gold-400" />
                  <span>3D Metallic Epoxy</span>
                </button>
                <button
                  onClick={() => setConcreteFinish('slate')}
                  className={`px-2.5 py-1 rounded text-[11px] font-semibold border transition ${
                    concreteFinish === 'slate'
                      ? 'border-gold-400 bg-gold-500/20 text-gold-300'
                      : 'border-slate-800 bg-navy-950 text-slate-400 hover:text-slate-200'
                  }`}
                  title="Italian Slate Paving (Charcoal Gloss)"
                >
                  Italian Slate
                </button>
                <button
                  onClick={() => setConcreteFinish('ashlar')}
                  className={`px-2.5 py-1 rounded text-[11px] font-semibold border transition ${
                    concreteFinish === 'ashlar'
                      ? 'border-gold-400 bg-gold-500/20 text-gold-300'
                      : 'border-slate-800 bg-navy-950 text-slate-400 hover:text-slate-200'
                  }`}
                  title="Ashlar Stone Course (Earthy Grey)"
                >
                  Ashlar Stone
                </button>
                <button
                  onClick={() => setConcreteFinish('terracotta')}
                  className={`px-2.5 py-1 rounded text-[11px] font-semibold border transition ${
                    concreteFinish === 'terracotta'
                      ? 'border-gold-400 bg-gold-500/20 text-gold-300'
                      : 'border-slate-800 bg-navy-950 text-slate-400 hover:text-slate-200'
                  }`}
                  title="Terracotta Interlock Blend"
                >
                  Terracotta
                </button>
              </div>

              {/* Exploded Slider & Lighting Toggle */}
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2">
                  <span className="text-[11px] text-slate-400 font-medium">Layers:</span>
                  <input
                    type="range"
                    min="0"
                    max="100"
                    value={explodedProgress}
                    onChange={(e) => setExplodedProgress(Number(e.target.value))}
                    className="w-20 accent-gold-500 cursor-pointer h-1.5 bg-slate-800 rounded-lg"
                    title="Slide to explode sub-base, rebar mesh, concrete, and UV sealer"
                  />
                  <span className="text-[10px] text-slate-400 w-6">{explodedProgress}%</span>
                </div>

                <div className="border-l border-slate-800 pl-3 flex items-center gap-1.5">
                  <button
                    onClick={() => setLightingMode(lightingMode === 'day' ? 'dusk' : 'day')}
                    className="p-1.5 rounded-lg bg-navy-950 border border-slate-800 text-slate-300 hover:text-gold-400 transition"
                    title={`Switch to ${lightingMode === 'day' ? 'Dusk' : 'Day'} Mode`}
                  >
                    {lightingMode === 'day' ? <Sun className="w-3.5 h-3.5 text-amber-400" /> : <Moon className="w-3.5 h-3.5 text-blue-300" />}
                  </button>

                  {onInquireTopic && (
                    <button
                      onClick={() => onInquireTopic("3D Villa Stamped Concrete & Architecture Consultation")}
                      className="px-2.5 py-1 rounded bg-gold-500 hover:bg-gold-400 text-navy-950 font-bold text-[11px] transition whitespace-nowrap"
                    >
                      Inquire Build
                    </button>
                  )}
                </div>

              </div>

            </div>
          </div>
        )}

      </div>

    </div>
  );
};
