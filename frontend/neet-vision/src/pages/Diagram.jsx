import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import * as THREE from "three";

// ─── DIAGRAM DATA ───
const DIAGRAMS = [
  { id: "cell", label: "Human Cell", icon: "🔬", color: "#22c55e" },
  { id: "heart", label: "Human Heart", icon: "❤️", color: "#ef4444" },
  { id: "dna", label: "DNA Double Helix", icon: "🧬", color: "#a855f7" },
  { id: "brain", label: "Human Brain", icon: "🧠", color: "#3b82f6" },
];

const CELL_PARTS = [
  { id: "nucleus", label: "Nucleus", color: 0x3b82f6, pos: [0, 0, 0], size: 0.7, info: "Controls cell activities. Contains DNA and directs protein synthesis." },
  { id: "mitochondria", label: "Mitochondria", color: 0xf59e0b, pos: [1.4, 0.5, 0.3], size: 0.35, info: "Powerhouse of the cell. Produces ATP through cellular respiration." },
  { id: "ribosome1", label: "Ribosome", color: 0xec4899, pos: [-1.2, 0.8, 0.2], size: 0.18, info: "Site of protein synthesis. Translates mRNA into proteins." },
  { id: "er", label: "Endoplasmic Reticulum", color: 0x14b8a6, pos: [-1.0, -0.5, 0.4], size: 0.4, info: "Network of membranes. Rough ER has ribosomes; Smooth ER synthesizes lipids." },
  { id: "golgi", label: "Golgi Apparatus", color: 0xf97316, pos: [1.0, -0.8, 0.2], size: 0.35, info: "Modifies and packages proteins. Known as the post office of the cell." },
  { id: "lysosome", label: "Lysosome", color: 0x8b5cf6, pos: [-0.3, 1.3, 0.3], size: 0.22, info: "Contains digestive enzymes. Breaks down waste materials and cellular debris." },
  { id: "vacuole", label: "Vacuole", color: 0x06b6d4, pos: [0.5, 1.1, -0.2], size: 0.28, info: "Storage organelle. Maintains cell turgor pressure and stores nutrients." },
  { id: "cytoplasm", label: "Cytoplasm", color: 0x22c55e, pos: [-0.6, -1.1, 0.1], size: 0.3, info: "Jelly-like fluid filling the cell. Suspends organelles and allows transport." },
];

const HEART_PARTS = [
  { id: "left_ventricle", label: "Left Ventricle", color: 0xef4444, pos: [-0.5, -0.6, 0], size: 0.55, info: "Pumps oxygenated blood to the entire body through the aorta." },
  { id: "right_ventricle", label: "Right Ventricle", color: 0xf87171, pos: [0.6, -0.5, 0], size: 0.5, info: "Pumps deoxygenated blood to the lungs through the pulmonary artery." },
  { id: "left_atrium", label: "Left Atrium", color: 0xdc2626, pos: [-0.5, 0.6, 0], size: 0.42, info: "Receives oxygenated blood from pulmonary veins (lungs)." },
  { id: "right_atrium", label: "Right Atrium", color: 0xfca5a5, pos: [0.6, 0.6, 0], size: 0.4, info: "Receives deoxygenated blood from the body via vena cava." },
  { id: "aorta", label: "Aorta", color: 0xf59e0b, pos: [-0.2, 1.2, 0], size: 0.25, info: "Largest artery. Carries oxygenated blood from left ventricle to body." },
  { id: "pulmonary", label: "Pulmonary Artery", color: 0x60a5fa, pos: [0.4, 1.1, 0.2], size: 0.22, info: "Carries deoxygenated blood from right ventricle to lungs." },
  { id: "vena_cava", label: "Vena Cava", color: 0x818cf8, pos: [1.1, 0.2, 0], size: 0.2, info: "Large vein returning deoxygenated blood from body to right atrium." },
  { id: "valves", label: "Heart Valves", color: 0xfbbf24, pos: [0, 0, 0.3], size: 0.2, info: "Prevent backflow of blood. Include mitral, tricuspid, aortic, and pulmonary valves." },
];

const BRAIN_PARTS = [
  { id: "cerebrum", label: "Cerebrum", color: 0x3b82f6, pos: [0, 0.4, 0], size: 0.85, info: "Largest part of brain. Controls thinking, memory, speech, and voluntary movements." },
  { id: "cerebellum", label: "Cerebellum", color: 0x8b5cf6, pos: [0, -0.7, -0.5], size: 0.5, info: "Coordinates balance and muscle movements. Located at the back of brain." },
  { id: "brainstem", label: "Brain Stem", color: 0x06b6d4, pos: [0, -0.9, 0.2], size: 0.3, info: "Controls vital functions like breathing, heart rate, and blood pressure." },
  { id: "frontal", label: "Frontal Lobe", color: 0x22c55e, pos: [-0.6, 0.6, 0.6], size: 0.4, info: "Controls decision making, problem solving, and personality." },
  { id: "parietal", label: "Parietal Lobe", color: 0xf59e0b, pos: [0, 0.8, -0.2], size: 0.38, info: "Processes sensory information like touch, temperature, and pain." },
  { id: "temporal", label: "Temporal Lobe", color: 0xec4899, pos: [-0.9, -0.1, 0.2], size: 0.36, info: "Processes hearing, language comprehension, and memory." },
  { id: "occipital", label: "Occipital Lobe", color: 0xf97316, pos: [0.1, 0.3, -0.8], size: 0.34, info: "Processes visual information from the eyes." },
  { id: "hypothalamus", label: "Hypothalamus", color: 0xfbbf24, pos: [0.3, -0.2, 0.3], size: 0.22, info: "Regulates body temperature, hunger, thirst, and hormone secretion." },
];

// ─── DNA DIAGRAM (Canvas-based) ───
function DNADiagram({ onPartHover }) {
  const canvasRef = useRef(null);
  const animRef = useRef(null);
  const angleRef = useRef(0);

  const DNA_LABELS = [
    { label: "Adenine (A)", color: "#22c55e", info: "Purine base. Pairs with Thymine (T) via 2 hydrogen bonds." },
    { label: "Thymine (T)", color: "#3b82f6", info: "Pyrimidine base. Pairs with Adenine (A) via 2 hydrogen bonds." },
    { label: "Guanine (G)", color: "#f59e0b", info: "Purine base. Pairs with Cytosine (C) via 3 hydrogen bonds." },
    { label: "Cytosine (C)", color: "#ec4899", info: "Pyrimidine base. Pairs with Guanine (G) via 3 hydrogen bonds." },
    { label: "Sugar-Phosphate Backbone", color: "#a855f7", info: "Forms the structural framework of DNA. Alternating deoxyribose sugar and phosphate groups." },
    { label: "Hydrogen Bonds", color: "#14b8a6", info: "Weak bonds holding base pairs together. Allow DNA strands to separate during replication." },
  ];

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    const W = canvas.width = canvas.offsetWidth;
    const H = canvas.height = canvas.offsetHeight;
    const cx = W / 2;

    const PAIRS = 12;
    const STEP = H / (PAIRS + 2);
    const RADIUS = Math.min(W * 0.28, 80);
    const COLORS = [["#22c55e", "#3b82f6"], ["#f59e0b", "#ec4899"]];

    function draw() {
      ctx.clearRect(0, 0, W, H);
      angleRef.current += 0.012;
      const a = angleRef.current;

      for (let i = 0; i < PAIRS; i++) {
        const y = STEP * (i + 1);
        const angle = a + (i / PAIRS) * Math.PI * 2;
        const x1 = cx + Math.cos(angle) * RADIUS;
        const x2 = cx + Math.cos(angle + Math.PI) * RADIUS;
        const z1 = Math.sin(angle);
        const z2 = Math.sin(angle + Math.PI);
        const pair = COLORS[i % 2];

        // Backbone dots
        ctx.beginPath();
        ctx.arc(x1, y, 6 + z1 * 2, 0, Math.PI * 2);
        ctx.fillStyle = "#a855f7";
        ctx.globalAlpha = 0.6 + z1 * 0.4;
        ctx.fill();

        ctx.beginPath();
        ctx.arc(x2, y, 6 + z2 * 2, 0, Math.PI * 2);
        ctx.fillStyle = "#a855f7";
        ctx.globalAlpha = 0.6 + z2 * 0.4;
        ctx.fill();

        // Base pair line
        ctx.beginPath();
        ctx.moveTo(x1, y);
        ctx.lineTo(x2, y);
        ctx.strokeStyle = "#ffffff18";
        ctx.lineWidth = 1;
        ctx.globalAlpha = 1;
        ctx.stroke();

        // Base pair balls
        const midX = (x1 + x2) / 2;
        ctx.beginPath();
        ctx.arc(midX - 10, y, 7, 0, Math.PI * 2);
        ctx.fillStyle = pair[0];
        ctx.globalAlpha = 0.9;
        ctx.fill();

        ctx.beginPath();
        ctx.arc(midX + 10, y, 7, 0, Math.PI * 2);
        ctx.fillStyle = pair[1];
        ctx.globalAlpha = 0.9;
        ctx.fill();
      }

      // Backbone curves
      ctx.globalAlpha = 1;
      for (let strand = 0; strand < 2; strand++) {
        ctx.beginPath();
        for (let i = 0; i <= PAIRS + 1; i++) {
          const y = STEP * i;
          const angle = a + (i / PAIRS) * Math.PI * 2 + (strand === 1 ? Math.PI : 0);
          const x = cx + Math.cos(angle) * RADIUS;
          if (i === 0) ctx.moveTo(x, y);
          else ctx.lineTo(x, y);
        }
        ctx.strokeStyle = strand === 0 ? "#a855f7" : "#7c3aed";
        ctx.lineWidth = 3;
        ctx.globalAlpha = 0.7;
        ctx.stroke();
      }

      animRef.current = requestAnimationFrame(draw);
    }

    draw();
    return () => cancelAnimationFrame(animRef.current);
  }, []);

  return (
    <div style={{ display: "flex", gap: "16px", height: "100%", flexWrap: "wrap" }}>
      <canvas ref={canvasRef} style={{ flex: 1, minWidth: "200px", borderRadius: "12px", background: "#050505", cursor: "pointer" }} />
      <div style={{ width: "200px", display: "flex", flexDirection: "column", gap: "6px", overflowY: "auto" }}>
        {DNA_LABELS.map((item) => (
          <div key={item.label}
            onMouseEnter={() => onPartHover({ label: item.label, info: item.info, color: item.color })}
            onMouseLeave={() => onPartHover(null)}
            style={{ background: "#111", border: `1px solid ${item.color}44`, borderRadius: "8px", padding: "8px 12px", cursor: "pointer", transition: "all 0.2s" }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
              <div style={{ width: "10px", height: "10px", borderRadius: "50%", background: item.color, flexShrink: 0 }} />
              <span style={{ fontSize: "12px", color: "#d1d5db", fontWeight: "500" }}>{item.label}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ─── THREE.JS DIAGRAM ───
function ThreeDDiagram({ parts, color, onPartHover }) {
  const mountRef = useRef(null);
  const sceneRef = useRef(null);
  const rendererRef = useRef(null);
  const meshesRef = useRef([]);
  const frameRef = useRef(null);
  const mouseRef = useRef({ x: 0, y: 0 });
  const isDragging = useRef(false);
  const lastMouse = useRef({ x: 0, y: 0 });
  const rotationRef = useRef({ x: 0.3, y: 0 });

  useEffect(() => {
    const el = mountRef.current;
    const W = el.offsetWidth;
    const H = el.offsetHeight;

    // Scene
    const scene = new THREE.Scene();
    sceneRef.current = scene;

    // Camera
    const camera = new THREE.PerspectiveCamera(50, W / H, 0.1, 100);
    camera.position.set(0, 0, 5);

    // Renderer
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(W, H);
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setClearColor(0x000000, 0);
    el.appendChild(renderer.domElement);
    rendererRef.current = renderer;

    // Lights
    scene.add(new THREE.AmbientLight(0xffffff, 0.6));
    const dirLight = new THREE.DirectionalLight(0xffffff, 0.8);
    dirLight.position.set(5, 5, 5);
    scene.add(dirLight);
    const pointLight = new THREE.PointLight(0x4ade80, 0.5, 10);
    pointLight.position.set(-3, 3, 3);
    scene.add(pointLight);

    // Group
    const group = new THREE.Group();
    scene.add(group);
    meshesRef.current = [];

    // Create parts
    parts.forEach((part) => {
      const geo = new THREE.SphereGeometry(part.size, 32, 32);
      const mat = new THREE.MeshPhongMaterial({
        color: part.color,
        transparent: true,
        opacity: 0.85,
        shininess: 80,
      });
      const mesh = new THREE.Mesh(geo, mat);
      mesh.position.set(...part.pos);
      mesh.userData = { part, originalColor: part.color, originalOpacity: 0.85 };
      group.add(mesh);
      meshesRef.current.push(mesh);

      // Wireframe
      const wireMat = new THREE.MeshBasicMaterial({ color: part.color, wireframe: true, transparent: true, opacity: 0.15 });
      const wireMesh = new THREE.Mesh(new THREE.SphereGeometry(part.size * 1.05, 16, 16), wireMat);
      wireMesh.position.set(...part.pos);
      group.add(wireMesh);
    });

    // Raycaster
    const raycaster = new THREE.Raycaster();

    const onMouseMove = (e) => {
      const rect = el.getBoundingClientRect();
      mouseRef.current = {
        x: ((e.clientX - rect.left) / W) * 2 - 1,
        y: -((e.clientY - rect.top) / H) * 2 + 1,
      };

      if (isDragging.current) {
        const dx = e.clientX - lastMouse.current.x;
        const dy = e.clientY - lastMouse.current.y;
        rotationRef.current.y += dx * 0.01;
        rotationRef.current.x += dy * 0.01;
        lastMouse.current = { x: e.clientX, y: e.clientY };
      }

      // Hover detection
      raycaster.setFromCamera(mouseRef.current, camera);
      const intersects = raycaster.intersectObjects(meshesRef.current);

      meshesRef.current.forEach(m => {
        m.material.opacity = 0.85;
        m.material.emissive = new THREE.Color(0x000000);
      });

      if (intersects.length > 0) {
        const hit = intersects[0].object;
        if (hit.userData.part) {
          hit.material.opacity = 1;
          hit.material.emissive = new THREE.Color(hit.userData.originalColor).multiplyScalar(0.3);
          onPartHover(hit.userData.part);
        }
      } else {
        onPartHover(null);
      }
    };

    const onMouseDown = (e) => {
      isDragging.current = true;
      lastMouse.current = { x: e.clientX, y: e.clientY };
    };

    const onMouseUp = () => { isDragging.current = false; };

    el.addEventListener("mousemove", onMouseMove);
    el.addEventListener("mousedown", onMouseDown);
    el.addEventListener("mouseup", onMouseUp);

    // Animate
    const animate = () => {
      frameRef.current = requestAnimationFrame(animate);
      if (!isDragging.current) rotationRef.current.y += 0.004;
      group.rotation.y = rotationRef.current.y;
      group.rotation.x = rotationRef.current.x;

      // Pulse effect
      const t = Date.now() * 0.001;
      meshesRef.current.forEach((m, i) => {
        const s = 1 + Math.sin(t * 1.5 + i * 0.5) * 0.03;
        m.scale.setScalar(s);
      });

      renderer.render(scene, camera);
    };
    animate();

    // Resize
    const onResize = () => {
      const W2 = el.offsetWidth;
      const H2 = el.offsetHeight;
      camera.aspect = W2 / H2;
      camera.updateProjectionMatrix();
      renderer.setSize(W2, H2);
    };
    window.addEventListener("resize", onResize);

    return () => {
      cancelAnimationFrame(frameRef.current);
      el.removeEventListener("mousemove", onMouseMove);
      el.removeEventListener("mousedown", onMouseDown);
      el.removeEventListener("mouseup", onMouseUp);
      window.removeEventListener("resize", onResize);
      renderer.dispose();
      if (el.contains(renderer.domElement)) el.removeChild(renderer.domElement);
    };
  }, [parts]);

  return (
    <div style={{ display: "flex", gap: "16px", height: "100%", flexWrap: "wrap" }}>
      <div ref={mountRef} style={{ flex: 1, minWidth: "200px", borderRadius: "12px", overflow: "hidden", background: "#050505", cursor: "grab" }} />
      <div style={{ width: "200px", display: "flex", flexDirection: "column", gap: "6px", overflowY: "auto" }}>
        {parts.map((part) => (
          <div key={part.id}
            onMouseEnter={() => onPartHover(part)}
            onMouseLeave={() => onPartHover(null)}
            style={{ background: "#111", border: `1px solid #${part.color.toString(16).padStart(6, "0")}44`, borderRadius: "8px", padding: "8px 12px", cursor: "pointer", transition: "all 0.2s" }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
              <div style={{ width: "10px", height: "10px", borderRadius: "50%", background: `#${part.color.toString(16).padStart(6, "0")}`, flexShrink: 0 }} />
              <span style={{ fontSize: "12px", color: "#d1d5db", fontWeight: "500" }}>{part.label}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ─── MAIN COMPONENT ───
export default function Diagrams() {
  const navigate = useNavigate();
  const [active, setActive] = useState("cell");
  const [hoveredPart, setHoveredPart] = useState(null);

  const activeDiagram = DIAGRAMS.find(d => d.id === active);

  const getParts = () => {
    if (active === "cell") return CELL_PARTS;
    if (active === "heart") return HEART_PARTS;
    if (active === "brain") return BRAIN_PARTS;
    return [];
  };

  return (
    <div style={{ minHeight: "100vh", background: "#000", color: "#fff", fontFamily: "'Segoe UI', system-ui, sans-serif", padding: "20px" }}>

      {/* Header */}
      <div style={{ display: "flex", alignItems: "center", gap: "14px", marginBottom: "24px" }}>
        <button onClick={() => navigate("/dashboard")}
          style={{ background: "#111", border: "1px solid #1f2937", color: "#6b7280", padding: "8px 14px", borderRadius: "8px", cursor: "pointer", fontSize: "13px" }}>
          ← Back
        </button>
        <div>
          <h1 style={{ margin: 0, fontSize: "clamp(18px, 3vw, 24px)", fontWeight: "700" }}>
            3D Interactive Diagrams
          </h1>
          <p style={{ margin: 0, color: "#6b7280", fontSize: "13px" }}>Hover over parts to learn • Drag to rotate</p>
        </div>
      </div>

      {/* Diagram Tabs */}
      <div style={{ display: "flex", gap: "8px", marginBottom: "20px", flexWrap: "wrap" }}>
        {DIAGRAMS.map(d => (
          <button key={d.id} onClick={() => { setActive(d.id); setHoveredPart(null); }}
            style={{
              background: active === d.id ? `${d.color}22` : "#0f0f0f",
              border: `1px solid ${active === d.id ? d.color : "#1a1a1a"}`,
              color: active === d.id ? d.color : "#6b7280",
              padding: "10px 18px", borderRadius: "10px", cursor: "pointer",
              fontSize: "14px", fontWeight: active === d.id ? "600" : "400",
              display: "flex", alignItems: "center", gap: "8px",
              transition: "all 0.2s",
            }}
          >
            {d.icon} {d.label}
          </button>
        ))}
      </div>

      {/* Main View */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 280px", gap: "16px", height: "520px" }} className="diagram-layout">

        {/* 3D Canvas */}
        <div style={{ background: "#0a0a0a", border: `1px solid ${activeDiagram.color}22`, borderRadius: "16px", padding: "16px", position: "relative", overflow: "hidden" }}>

          {/* Glow */}
          <div style={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%,-50%)", width: "300px", height: "300px", background: `radial-gradient(circle, ${activeDiagram.color}10, transparent 70%)`, pointerEvents: "none" }} />

          <div style={{ height: "100%" }}>
            {active === "dna" ? (
              <DNADiagram onPartHover={setHoveredPart} />
            ) : (
              <ThreeDDiagram key={active} parts={getParts()} color={activeDiagram.color} onPartHover={setHoveredPart} />
            )}
          </div>
        </div>

        {/* Info Panel */}
        <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>

          {/* Hovered Part Info */}
          <div style={{
            background: hoveredPart ? `${typeof hoveredPart.color === "number" ? "#" + hoveredPart.color.toString(16).padStart(6, "0") : hoveredPart.color}11` : "#0a0a0a",
            border: `1px solid ${hoveredPart ? (typeof hoveredPart.color === "number" ? "#" + hoveredPart.color.toString(16).padStart(6, "0") : hoveredPart.color) + "44" : "#1a1a1a"}`,
            borderRadius: "14px", padding: "20px",
            transition: "all 0.3s ease",
            flex: 1,
          }}>
            {hoveredPart ? (
              <>
                <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "12px" }}>
                  <div style={{
                    width: "12px", height: "12px", borderRadius: "50%",
                    background: typeof hoveredPart.color === "number" ? "#" + hoveredPart.color.toString(16).padStart(6, "0") : hoveredPart.color,
                    flexShrink: 0,
                    boxShadow: `0 0 8px ${typeof hoveredPart.color === "number" ? "#" + hoveredPart.color.toString(16).padStart(6, "0") : hoveredPart.color}`,
                  }} />
                  <h3 style={{ margin: 0, fontSize: "16px", fontWeight: "700", color: "#f9fafb" }}>
                    {hoveredPart.label}
                  </h3>
                </div>
                <p style={{ margin: 0, fontSize: "14px", color: "#9ca3af", lineHeight: "1.7" }}>
                  {hoveredPart.info}
                </p>
              </>
            ) : (
              <div style={{ textAlign: "center", padding: "20px 0", color: "#4b5563" }}>
                <div style={{ fontSize: "32px", marginBottom: "10px" }}>👆</div>
                <p style={{ margin: 0, fontSize: "14px" }}>Hover over any part to see details</p>
                <p style={{ margin: "6px 0 0", fontSize: "12px" }}>Drag to rotate the diagram</p>
              </div>
            )}
          </div>

          {/* Stats */}
          <div style={{ background: "#0a0a0a", border: "1px solid #1a1a1a", borderRadius: "14px", padding: "16px" }}>
            <h4 style={{ margin: "0 0 12px", fontSize: "12px", color: "#6b7280", textTransform: "uppercase", letterSpacing: "0.5px" }}>
              {activeDiagram.label} — Quick Facts
            </h4>
            {active === "cell" && [
              "Contains 46 chromosomes",
              "~10-20 micrometers in size",
              "70-80% water content",
              "~37 trillion cells in body",
            ].map((fact, i) => (
              <p key={i} style={{ margin: "0 0 6px", fontSize: "12px", color: "#9ca3af", display: "flex", gap: "8px" }}>
                <span style={{ color: "#22c55e" }}>•</span> {fact}
              </p>
            ))}
            {active === "heart" && [
              "Beats ~100,000 times/day",
              "Pumps 5L blood/minute",
              "Size of a fist (~300g)",
              "4 chambers, 4 valves",
            ].map((fact, i) => (
              <p key={i} style={{ margin: "0 0 6px", fontSize: "12px", color: "#9ca3af", display: "flex", gap: "8px" }}>
                <span style={{ color: "#ef4444" }}>•</span> {fact}
              </p>
            ))}
            {active === "dna" && [
              "3 billion base pairs in humans",
              "~2 meters long if uncoiled",
              "4 bases: A, T, G, C",
              "Double helix discovered 1953",
            ].map((fact, i) => (
              <p key={i} style={{ margin: "0 0 6px", fontSize: "12px", color: "#9ca3af", display: "flex", gap: "8px" }}>
                <span style={{ color: "#a855f7" }}>•</span> {fact}
              </p>
            ))}
            {active === "brain" && [
              "~86 billion neurons",
              "Uses 20% of body's energy",
              "Weighs ~1.4 kg",
              "3 main parts: Cerebrum, Cerebellum, Brainstem",
            ].map((fact, i) => (
              <p key={i} style={{ margin: "0 0 6px", fontSize: "12px", color: "#9ca3af", display: "flex", gap: "8px" }}>
                <span style={{ color: "#3b82f6" }}>•</span> {fact}
              </p>
            ))}
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 768px) {
          .diagram-layout {
            grid-template-columns: 1fr !important;
            height: auto !important;
          }
          .diagram-layout > div:first-child {
            height: 360px;
          }
        }
      `}</style>
    </div>
  );
}