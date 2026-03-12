import { useState, useEffect, useRef } from "react";
import { Brain, BarChart3, MessageCircle, Zap, Target, BookOpen } from "lucide-react";

const FEATURES = [
  { icon: Brain, label: "Interactive Diagrams", desc: "Learn biology, chemistry and physics visually with clickable, animated diagrams that make concepts stick.", color: "#22c55e", bg: "#14532d22", border: "#14532d", tag: "Visual Learning" },
  { icon: BarChart3, label: "Smart Mock Tests", desc: "NEET-pattern tests with deep performance analytics. Know exactly where you stand and what to improve.", color: "#3b82f6", bg: "#1e3a5f22", border: "#1e3a5f", tag: "Analytics" },
  { icon: Zap, label: "AI Doubt Solver", desc: "Stuck on a concept? Ask our Gemini-powered AI tutor. Get step-by-step explanations instantly.", color: "#f59e0b", bg: "#78350f22", border: "#78350f", tag: "Powered by Gemini" },
  { icon: Target, label: "Adaptive Practice", desc: "Questions that adapt to your weak areas. Focus your energy where it matters most.", color: "#a855f7", bg: "#3b1f5e22", border: "#3b1f5e", tag: "Smart Practice" },
  { icon: MessageCircle, label: "Study Groups", desc: "Join live study groups, solve doubts together and stay motivated with your peers.", color: "#ec4899", bg: "#4a044e22", border: "#4a044e", tag: "Community" },
  { icon: BookOpen, label: "Chapter Notes", desc: "Concise, exam-focused notes for every chapter. Revise faster and retain more.", color: "#14b8a6", bg: "#134e4a22", border: "#134e4a", tag: "Quick Revision" },
];

function Features() {
  const [hovered, setHovered] = useState(null);
  const [visible, setVisible] = useState(false);
  const sectionRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true); },
      { threshold: 0.1 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section ref={sectionRef} style={{
      padding: "80px 20px", background: "#000",
      fontFamily: "'Segoe UI', system-ui, sans-serif",
      position: "relative", overflow: "hidden",
    }}>
      {/* Header */}
      <div style={{
        textAlign: "center", marginBottom: "48px",
        opacity: visible ? 1 : 0, transform: visible ? "translateY(0)" : "translateY(20px)",
        transition: "all 0.5s ease",
      }}>
        <div style={{
          display: "inline-flex", alignItems: "center", gap: "8px",
          background: "#14532d22", border: "1px solid #166534",
          borderRadius: "20px", padding: "6px 16px", marginBottom: "20px",
        }}>
          <span style={{ fontSize: "12px", color: "#4ade80", fontWeight: "600", textTransform: "uppercase", letterSpacing: "1px" }}>
            Everything You Need
          </span>
        </div>
        <h2 style={{
          fontSize: "clamp(28px, 4vw, 52px)", fontWeight: "800", color: "#fff",
          margin: "0 0 16px", letterSpacing: "-1.5px", lineHeight: "1.1",
        }}>Powerful Learning Tools</h2>
        <p style={{ color: "#6b7280", fontSize: "16px", maxWidth: "480px", margin: "0 auto", lineHeight: "1.6" }}>
          Everything a NEET aspirant needs — in one platform
        </p>
      </div>

      {/* Cards */}
      <div className="features-grid" style={{
        display: "grid", gridTemplateColumns: "repeat(1, 1fr)",
        gap: "14px", maxWidth: "1100px", margin: "0 auto",
      }}>
        {FEATURES.map((f, i) => {
          const Icon = f.icon;
          const isHovered = hovered === f.label;
          return (
            <div key={f.label}
              onMouseEnter={() => setHovered(f.label)}
              onMouseLeave={() => setHovered(null)}
              style={{
                background: isHovered ? f.bg : "#0a0a0a",
                border: `1px solid ${isHovered ? f.border : "#1a1a1a"}`,
                borderRadius: "16px", padding: "24px",
                transform: isHovered ? "translateY(-4px)" : "translateY(0)",
                boxShadow: isHovered ? `0 12px 32px ${f.color}15` : "none",
                transition: "all 0.25s ease",
                opacity: visible ? 1 : 0,
                transitionDelay: `${i * 0.07}s`,
                position: "relative", overflow: "hidden",
              }}
            >
              <div style={{
                display: "inline-block", background: `${f.color}15`,
                border: `1px solid ${f.color}30`, borderRadius: "6px",
                padding: "3px 10px", fontSize: "11px", color: f.color,
                fontWeight: "600", marginBottom: "16px",
              }}>{f.tag}</div>

              <div style={{
                width: "44px", height: "44px", background: `${f.color}15`,
                borderRadius: "12px", display: "flex", alignItems: "center",
                justifyContent: "center", marginBottom: "14px",
                transform: isHovered ? "scale(1.1)" : "scale(1)", transition: "transform 0.2s ease",
              }}>
                <Icon size={22} color={f.color} />
              </div>

              <h3 style={{ fontSize: "16px", fontWeight: "700", color: "#e5e7eb", margin: "0 0 8px" }}>{f.label}</h3>
              <p style={{ fontSize: "14px", color: "#6b7280", margin: 0, lineHeight: "1.6" }}>{f.desc}</p>

              <div style={{
                marginTop: "16px", fontSize: "13px", color: f.color, fontWeight: "600",
                opacity: isHovered ? 1 : 0, transform: isHovered ? "translateX(0)" : "translateX(-6px)",
                transition: "all 0.2s ease",
              }}>Learn more →</div>
            </div>
          );
        })}
      </div>

      <style>{`
        @media (min-width: 640px) { .features-grid { grid-template-columns: repeat(2, 1fr) !important; } }
        @media (min-width: 1024px) { .features-grid { grid-template-columns: repeat(3, 1fr) !important; } }
      `}</style>
    </section>
  );
}

export default Features;