import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";

const STATS = [
  { value: "50,000+", label: "Students" },
  { value: "10,000+", label: "Questions" },
  { value: "95%", label: "Success Rate" },
  { value: "500+", label: "Mock Tests" },
];

const SUBJECTS = [
  { icon: "⚛️", label: "Physics" },
  { icon: "🧪", label: "Chemistry" },
  { icon: "🧬", label: "Biology" },
];

function Hero() {
  const navigate = useNavigate();
  const [loaded, setLoaded] = useState(false);
  const [hoveredBtn, setHoveredBtn] = useState(null);

  useEffect(() => { setTimeout(() => setLoaded(true), 100); }, []);

  return (
    <section style={{
      position: "relative", overflow: "hidden", background: "#000",
      minHeight: "92vh", display: "flex", flexDirection: "column",
      alignItems: "center", justifyContent: "center",
      padding: "80px 20px", fontFamily: "'Segoe UI', system-ui, sans-serif",
    }}>

      <div style={{
        position: "absolute", top: "-200px", left: "-200px",
        width: "500px", height: "500px",
        background: "radial-gradient(circle, rgba(34,197,94,0.12), transparent 70%)",
        borderRadius: "50%", animation: "pulse 4s ease-in-out infinite",
      }} />
      <div style={{
        position: "absolute", bottom: "-200px", right: "-200px",
        width: "500px", height: "500px",
        background: "radial-gradient(circle, rgba(59,130,246,0.10), transparent 70%)",
        borderRadius: "50%", animation: "pulse 4s ease-in-out infinite 2s",
      }} />
      <div style={{
        position: "absolute", inset: 0,
        backgroundImage: `linear-gradient(rgba(255,255,255,0.02) 1px, transparent 1px),
                          linear-gradient(90deg, rgba(255,255,255,0.02) 1px, transparent 1px)`,
        backgroundSize: "48px 48px", pointerEvents: "none",
      }} />

      {/* Badge */}
      <div style={{
        position: "relative", zIndex: 10,
        display: "inline-flex", alignItems: "center", gap: "8px",
        background: "#14532d44", border: "1px solid #166534",
        borderRadius: "20px", padding: "6px 16px", marginBottom: "24px",
        opacity: loaded ? 1 : 0, transform: loaded ? "translateY(0)" : "translateY(12px)",
        transition: "all 0.5s ease",
      }}>
        <span style={{ width: "6px", height: "6px", background: "#22c55e", borderRadius: "50%", display: "inline-block", animation: "blink 2s infinite" }} />
        <span style={{ fontSize: "12px", color: "#4ade80", fontWeight: "500" }}>India's #1 NEET Preparation Platform</span>
      </div>

      {/* Heading */}
      <h1 style={{
        position: "relative", zIndex: 10,
        fontSize: "clamp(32px, 6vw, 72px)",
        fontWeight: "800", textAlign: "center", lineHeight: "1.1",
        letterSpacing: "-2px", margin: "0 0 20px", maxWidth: "900px", color: "#fff",
        opacity: loaded ? 1 : 0, transform: loaded ? "translateY(0)" : "translateY(16px)",
        transition: "all 0.5s ease 0.1s",
      }}>
        Master NEET with{" "}
        <span style={{ background: "linear-gradient(135deg, #22c55e, #4ade80)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
          AI-Powered
        </span>
        <br />Visual Learning
      </h1>

      {/* Subtext */}
      <p style={{
        position: "relative", zIndex: 10,
        color: "#6b7280", fontSize: "clamp(15px, 2vw, 18px)",
        lineHeight: "1.6", maxWidth: "520px", textAlign: "center",
        margin: "0 0 36px", padding: "0 16px",
        opacity: loaded ? 1 : 0, transform: loaded ? "translateY(0)" : "translateY(16px)",
        transition: "all 0.5s ease 0.2s",
      }}>
        Interactive diagrams, AI doubt solver, mock tests — everything a NEET aspirant needs to crack the exam.
      </p>

      {/* CTA Buttons */}
      <div style={{
        position: "relative", zIndex: 10,
        display: "flex", gap: "12px", flexWrap: "wrap", justifyContent: "center",
        marginBottom: "48px", padding: "0 16px",
        opacity: loaded ? 1 : 0, transform: loaded ? "translateY(0)" : "translateY(16px)",
        transition: "all 0.5s ease 0.3s",
      }}>
        <button onClick={() => navigate("/signup")}
          onMouseEnter={() => setHoveredBtn("start")}
          onMouseLeave={() => setHoveredBtn(null)}
          style={{
            background: "linear-gradient(135deg, #22c55e, #16a34a)", color: "#000",
            border: "none", padding: "14px 28px", borderRadius: "12px",
            fontSize: "15px", fontWeight: "700", cursor: "pointer",
            transform: hoveredBtn === "start" ? "translateY(-2px)" : "translateY(0)",
            boxShadow: hoveredBtn === "start" ? "0 8px 24px rgba(34,197,94,0.3)" : "0 4px 12px rgba(34,197,94,0.15)",
            transition: "all 0.2s ease",
          }}
        >Start Learning Free →</button>

        <button onClick={() => navigate("/ai-doubt")}
          onMouseEnter={() => setHoveredBtn("explore")}
          onMouseLeave={() => setHoveredBtn(null)}
          style={{
            background: hoveredBtn === "explore" ? "#111" : "transparent",
            color: hoveredBtn === "explore" ? "#e5e7eb" : "#9ca3af",
            border: "1px solid #374151", padding: "14px 28px", borderRadius: "12px",
            fontSize: "15px", fontWeight: "600", cursor: "pointer",
            transform: hoveredBtn === "explore" ? "translateY(-2px)" : "translateY(0)",
            transition: "all 0.2s ease",
          }}
        >🤖 Try AI Doubt Solver</button>
      </div>

      {/* Subject Pills */}
      <div style={{
        position: "relative", zIndex: 10,
        display: "flex", gap: "10px", marginBottom: "48px",
        flexWrap: "wrap", justifyContent: "center", padding: "0 16px",
        opacity: loaded ? 1 : 0, transition: "all 0.5s ease 0.4s",
      }}>
        {SUBJECTS.map((s) => (
          <div key={s.label} style={{
            display: "flex", alignItems: "center", gap: "8px",
            background: "#0f0f0f", border: "1px solid #1a1a1a",
            borderRadius: "10px", padding: "10px 18px",
            fontSize: "14px", color: "#d1d5db", fontWeight: "500",
          }}>
            <span>{s.icon}</span> {s.label}
          </div>
        ))}
      </div>

      <style>{`
        @keyframes pulse { 0%, 100% { opacity: 0.6; transform: scale(1); } 50% { opacity: 1; transform: scale(1.05); } }
        @keyframes blink { 0%, 100% { opacity: 1; } 50% { opacity: 0.3; } }
        @media (min-width: 640px) {
          .stats-grid { grid-template-columns: repeat(4, 1fr) !important; }
        }
      `}</style>
    </section>
  );
}

export default Hero;