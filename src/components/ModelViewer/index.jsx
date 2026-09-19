import { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { OBJLoader } from 'three/examples/jsm/loaders/OBJLoader.js';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import './style.css';

/**
 * 3D Model Viewer for Resident Evil Archive
 * Supports:
 * - Real .obj file loading via OBJLoader
 * - OrbitControls (drag to rotate, scroll to zoom, right-click pan)
 * - Auto-rotation toggle
 * - Wireframe / Solid mode toggle
 * - Holographic HUD overlay & scanlines
 * - High-tech procedural 3D fallback if .obj file is not yet downloaded
 */
export default function ModelViewer({ modelId, objPath, modelName, fallbackImage, initialRotation = { x: 0, y: 0, z: 0 }, initialPosition = { x: 0, y: 0, z: 0 } }) {
    const mountRef = useRef(null);
    const [loading, setLoading] = useState(true);
    const [hasRealModel, setHasRealModel] = useState(false);
    const [autoRotate, setAutoRotate] = useState(true);
    const [wireframe, setWireframe] = useState(false);
    const [viewMode, setViewMode] = useState('3d'); // '3d' | 'image'

    const controlsRef = useRef(null);
    const currentMaterialsRef = useRef([]);

    useEffect(() => {
        const container = mountRef.current;
        if (!container || viewMode !== '3d') return;

        let isMounted = true;
        let animationFrameId;

        // Scene, Camera, Renderer
        const scene = new THREE.Scene();
        scene.fog = new THREE.FogExp2(0x050508, 0.04);

        const width = container.clientWidth || 300;
        const height = container.clientHeight || 260;

        const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 1000);
        camera.position.set(0, 0, 4.5);

        const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
        renderer.setSize(width, height);
        renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
        renderer.outputColorSpace = THREE.SRGBColorSpace;
        renderer.toneMapping = THREE.ACESFilmicToneMapping;
        renderer.toneMappingExposure = 1.3;
        renderer.setClearColor(0x000000, 0);

        // Remove any previous canvas
        while (container.firstChild) {
            container.removeChild(container.firstChild);
        }
        container.appendChild(renderer.domElement);

        // OrbitControls
        const controls = new OrbitControls(camera, renderer.domElement);
        controls.enableDamping = true;
        controls.dampingFactor = 0.05;
        controls.autoRotate = autoRotate;
        controls.autoRotateSpeed = 1.8;
        controls.maxDistance = 12;
        controls.minDistance = 1.2;
        controlsRef.current = controls;

        // Lighting (Sci-Fi Umbrella Laboratory Aesthetic)
        const ambientLight = new THREE.AmbientLight(0x223344, 1.6);
        scene.add(ambientLight);

        const keyLight = new THREE.DirectionalLight(0x00ff88, 2.5);
        keyLight.position.set(4, 5, 3);
        scene.add(keyLight);

        const rimLight = new THREE.DirectionalLight(0xff0033, 2.2);
        rimLight.position.set(-4, -2, -3);
        scene.add(rimLight);

        const topSpot = new THREE.SpotLight(0xffffff, 3.5, 20, Math.PI / 4, 0.5);
        topSpot.position.set(0, 6, 2);
        scene.add(topSpot);

        // Holographic Grid Floor
        const gridHelper = new THREE.GridHelper(10, 20, 0x00ff88, 0x112211);
        gridHelper.position.y = -1.2;
        gridHelper.material.opacity = 0.35;
        gridHelper.material.transparent = true;
        scene.add(gridHelper);

        // Holographic Target Rings
        const ringGeo = new THREE.RingGeometry(1.6, 1.65, 32);
        const ringMat = new THREE.MeshBasicMaterial({
            color: 0x00ff88,
            side: THREE.DoubleSide,
            transparent: true,
            opacity: 0.3
        });
        const ring = new THREE.Mesh(ringGeo, ringMat);
        ring.rotation.x = Math.PI / 2;
        ring.position.y = -1.18;
        scene.add(ring);

        // Target group for the loaded / procedural 3D model
        const modelGroup = new THREE.Group();
        scene.add(modelGroup);

        currentMaterialsRef.current = [];

        // Helper to center and scale mesh
        const centerAndScale = (obj) => {
            const box = new THREE.Box3().setFromObject(obj);
            const center = box.getCenter(new THREE.Vector3());
            const size = box.getSize(new THREE.Vector3());
            const maxDim = Math.max(size.x, size.y, size.z) || 1;
            const targetScale = 2.2 / maxDim;

            obj.position.x = -center.x * targetScale;
            obj.position.y = -center.y * targetScale;
            obj.position.z = -center.z * targetScale;
            obj.scale.set(targetScale, targetScale, targetScale);
        };

        // Try loading OBJ file if provided
        const targetObj = objPath || `/models/${modelId}.obj`;

        const loader = new OBJLoader();
        loader.load(
            targetObj,
            (loadedObj) => {
                if (!isMounted) return;
                setLoading(false);
                setHasRealModel(true);

                const materials = [];
                loadedObj.traverse((child) => {
                    if (child.isMesh) {
                        const mat = new THREE.MeshStandardMaterial({
                            color: 0xd0d8e0,
                            metalness: 0.65,
                            roughness: 0.35,
                            wireframe: wireframe,
                            side: THREE.DoubleSide
                        });
                        child.material = mat;
                        materials.push(mat);
                    }
                });
                currentMaterialsRef.current = materials;

                centerAndScale(loadedObj);
                // Apply initial rotation if specified
                loadedObj.rotation.x = initialRotation.x;
                loadedObj.rotation.y = initialRotation.y;
                loadedObj.rotation.z = initialRotation.z;
                // Apply initial position if specified
                loadedObj.position.x = initialPosition.x;
                loadedObj.position.y = initialPosition.y;
                loadedObj.position.z = initialPosition.z;
                modelGroup.add(loadedObj);
            },
            undefined,
            () => {
                // Fallback procedural geometry if OBJ not yet added to /public/models/
                if (!isMounted) return;
                setLoading(false);
                setHasRealModel(false);

                // Create a distinct procedural 3D hologram asset for each model type
                let fallbackMesh;
                const mat = new THREE.MeshStandardMaterial({
                    color: modelId.includes('virus') ? 0x00ff88 : modelId.includes('edge') ? 0x3388ff : 0xff3344,
                    metalness: 0.7,
                    roughness: 0.3,
                    wireframe: wireframe,
                    transparent: true,
                    opacity: 0.88,
                    emissive: modelId.includes('virus') ? 0x003311 : 0x220000,
                    emissiveIntensity: 0.4
                });
                currentMaterialsRef.current = [mat];

                if (modelId.includes('virus')) {
                    // Double Helix / Capsule structure
                    const capsuleGroup = new THREE.Group();
                    const cylinderGeo = new THREE.CylinderGeometry(0.4, 0.4, 1.8, 24);
                    const cap = new THREE.Mesh(cylinderGeo, mat);
                    capsuleGroup.add(cap);

                    const torusGeo = new THREE.TorusGeometry(0.55, 0.05, 16, 32);
                    const ring1 = new THREE.Mesh(torusGeo, mat);
                    ring1.rotation.x = Math.PI / 2;
                    capsuleGroup.add(ring1);

                    fallbackMesh = capsuleGroup;
                } else if (modelId.includes('samurai') || modelId.includes('gun')) {
                    // Futuristic weapon geometry
                    const gunGroup = new THREE.Group();
                    const slide = new THREE.Mesh(new THREE.BoxGeometry(0.3, 0.4, 1.8), mat);
                    slide.position.set(0, 0.3, 0);
                    const grip = new THREE.Mesh(new THREE.BoxGeometry(0.28, 0.9, 0.4), mat);
                    grip.position.set(0, -0.3, -0.4);
                    grip.rotation.x = -0.2;
                    gunGroup.add(slide);
                    gunGroup.add(grip);
                    fallbackMesh = gunGroup;
                } else if (modelId.includes('typewriter')) {
                    // Typewriter block
                    const typeGroup = new THREE.Group();
                    const base = new THREE.Mesh(new THREE.BoxGeometry(1.4, 0.35, 1.2), mat);
                    const roller = new THREE.Mesh(new THREE.CylinderGeometry(0.18, 0.18, 1.2, 16), mat);
                    roller.rotation.z = Math.PI / 2;
                    roller.position.set(0, 0.3, -0.2);
                    typeGroup.add(base);
                    typeGroup.add(roller);
                    fallbackMesh = typeGroup;
                } else {
                    // High-tech B.O.W. Octahedron / Hologram core
                    const octaGeo = new THREE.OctahedronGeometry(1.1, 1);
                    fallbackMesh = new THREE.Mesh(octaGeo, mat);
                }

                centerAndScale(fallbackMesh);
                // Apply initial rotation if specified
                fallbackMesh.rotation.x = initialRotation.x;
                fallbackMesh.rotation.y = initialRotation.y;
                fallbackMesh.rotation.z = initialRotation.z;
                // Apply initial position if specified
                fallbackMesh.position.x = initialPosition.x;
                fallbackMesh.position.y = initialPosition.y;
                fallbackMesh.position.z = initialPosition.z;
                modelGroup.add(fallbackMesh);
            }
        );

        // Resize handler
        const handleResize = () => {
            if (!container) return;
            const w = container.clientWidth;
            const h = container.clientHeight;
            camera.aspect = w / h;
            camera.updateProjectionMatrix();
            renderer.setSize(w, h);
        };
        window.addEventListener('resize', handleResize);

        // Animation Loop
        const animate = () => {
            animationFrameId = requestAnimationFrame(animate);
            controls.autoRotate = autoRotate;
            controls.update();

            // Subtle ring pulsation
            ring.rotation.z += 0.005;

            renderer.render(scene, camera);
        };
        animate();

        return () => {
            isMounted = false;
            window.removeEventListener('resize', handleResize);
            cancelAnimationFrame(animationFrameId);
            renderer.dispose();
            if (container.contains(renderer.domElement)) {
                container.removeChild(renderer.domElement);
            }
        };
    }, [modelId, objPath, autoRotate, viewMode, initialRotation, initialPosition]);

    // Update wireframe dynamically
    useEffect(() => {
        if (currentMaterialsRef.current) {
            currentMaterialsRef.current.forEach((m) => {
                m.wireframe = wireframe;
                m.needsUpdate = true;
            });
        }
    }, [wireframe]);

    return (
        <div className="model-viewer-box">
            {/* Holographic Header Bar */}
            <div className="model-viewer-hud-bar">
                <span className="hud-badge">
                    <span className="hud-dot" />
                    {hasRealModel ? 'OBJ LOADED' : '3D PROJECTION'}
                </span>
                <span className="hud-id">{modelId.toUpperCase()}</span>
            </div>

            {/* View Mode Toggle Bar */}
            <div className="model-viewer-toolbar">
                <button
                    className={`hud-btn ${viewMode === '3d' ? 'active' : ''}`}
                    onClick={() => setViewMode('3d')}
                    title="Switch to Interactive 3D"
                >
                    ⬡ 3D VIEW
                </button>
                {fallbackImage && (
                    <button
                        className={`hud-btn ${viewMode === 'image' ? 'active' : ''}`}
                        onClick={() => setViewMode('image')}
                        title="Switch to Photo View"
                    >
                        🖼 PHOTO
                    </button>
                )}
                {viewMode === '3d' && (
                    <>
                        <button
                            className={`hud-btn ${autoRotate ? 'active' : ''}`}
                            onClick={() => setAutoRotate(!autoRotate)}
                            title="Toggle Auto Rotation"
                        >
                            ↻ ROTATE
                        </button>
                        <button
                            className={`hud-btn ${wireframe ? 'active' : ''}`}
                            onClick={() => setWireframe(!wireframe)}
                            title="Toggle Wireframe Mesh"
                        >
                            🕸 WIRE
                        </button>
                        <button
                            className="hud-btn"
                            onClick={() => controlsRef.current?.reset()}
                            title="Reset Camera"
                        >
                            ⌖ RESET
                        </button>
                    </>
                )}
            </div>

            {/* 3D Viewport or 2D Image */}
            <div className="model-viewer-stage">
                {viewMode === '3d' ? (
                    <>
                        <div ref={mountRef} className="model-viewer-canvas-wrap" />
                        <div className="model-viewer-scanlines" />
                        <div className="model-viewer-reticle" />

                        {loading && (
                            <div className="model-viewer-status-msg">
                                <span className="spinner-hud" />
                                <span>INITIALIZING HOLOGRAPHIC PROJECTION...</span>
                            </div>
                        )}

                        {!hasRealModel && !loading && (
                            <div className="model-viewer-notice">
                                <span className="notice-icon">⚠</span>
                                <span>AWAITING <strong>/public{objPath || `/models/${modelId}.obj`}</strong></span>
                                <small>Interactive 3D preview active. Drag to rotate / Scroll to zoom.</small>
                            </div>
                        )}
                    </>
                ) : (
                    <div className="model-viewer-photo-wrap">
                        <img src={fallbackImage} alt={modelName} className="model-viewer-photo" />
                    </div>
                )}
            </div>

            <div className="model-viewer-footer-hint">
                <span>DRAG TO ORBIT</span> • <span>SCROLL TO ZOOM</span> • <span>RIGHT-CLICK TO PAN</span>
            </div>
        </div>
    );
}
