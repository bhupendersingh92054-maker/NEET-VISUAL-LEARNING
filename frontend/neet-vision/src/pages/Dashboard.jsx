import { useNavigate, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

const NAV_ITEMS = [
  { label: "Dashboard", path: "/dashboard", icon: "⊞" },
  { label: "Practice", path: "/practice/physics", icon: "⚡" },
{ label: "Mock Tests", path: "/mock-test", icon: "📝" },
  { label: "AI Doubt Solver", path: "/ai-doubt", icon: "🤖" },
  { label: "Performance", path: null, icon: "📊" },
  { label: "Diagram", path: "/diagrams", icon: "🤖" },
];

const SUBJECT_CARDS = [
  { label: "Physics", path: "physics", color: "#22c55e", bg: "#14532d", border: "#166534", icon: "⚛️" },
  { label: "Chemistry", path: "chemistry", color: "#3b82f6", bg: "#1e3a5f", border: "#1d4ed8", icon: "🧪" },
  { label: "Biology", path: "biology", color: "#a855f7", bg: "#3b1f5e", border: "#7e22ce", icon: "🧬" },
];

function Dashboard() {
  const navigate = useNavigate();
  const location = useLocation();
  const [stats, setStats] = useState({ questions: 0, tests: 0, accuracy: 0, streak: 0 });
  const [user, setUser] = useState("");
  const [loaded, setLoaded] = useState(false);
  const [hoveredCard, setHoveredCard] = useState(null);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const logout = () => { localStorage.removeItem("token"); navigate("/login"); };

  useEffect(() => {
    const fetchDashboard = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) { navigate("/"); return; }
        const res = await axios.get("https://neet-visual-learning.onrender.com/api/dashboard", { headers: { Authorization: `Bearer ${token}` } });
        setUser(res.data.user || "");
        setStats(res.data.stats || { questions: 0, tests: 0, accuracy: 0, streak: 0 });
        setTimeout(() => setLoaded(true), 100);
      } catch (err) {
        if (err.response?.status === 401) navigate("/login");
      }
    };
    fetchDashboard();
  }, [navigate]);

  const STAT_CARDS = [
    { label: "Questions Solved", value: stats.questions, icon: "✓", color: "#22c55e" },
    { label: "Mock Tests", value: stats.tests, icon: "📝", color: "#3b82f6" },
    { label: "Accuracy", value: `${stats.accuracy}%`, icon: "🎯", color: "#f59e0b" },
    { label: "Streak", value: `${stats.streak} Days`, icon: "🔥", color: "#ef4444" },
  ];

  const SidebarContent = () => (
    <>
      <div style={{ marginBottom: "28px", padding: "0 8px" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
          <div style={{ width: "36px", height: "36px", background: "linear-gradient(135deg, #22c55e, #16a34a)", borderRadius: "10px", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "18px", fontWeight: "800", color: "#000" }}>N</div>
          <span style={{ fontSize: "18px", fontWeight: "700", color: "#22c55e" }}>NEET Vision</span>
        </div>
      </div>

      {NAV_ITEMS.map((item) => {
        const isActive = location.pathname === item.path;
        return (
          <button key={item.label} onClick={() => { item.path && navigate(item.path); setSidebarOpen(false); }}
            style={{
              display: "flex", alignItems: "center", gap: "12px",
              background: isActive ? "#14532d" : "transparent",
              color: isActive ? "#22c55e" : "#6b7280",
              border: isActive ? "1px solid #166534" : "1px solid transparent",
              borderRadius: "10px", padding: "11px 14px",
              textAlign: "left", cursor: item.path ? "pointer" : "default",
              fontSize: "14px", fontWeight: isActive ? "600" : "400",
              transition: "all 0.15s ease", width: "100%",
            }}
          >
            <span style={{ fontSize: "16px" }}>{item.icon}</span>
            {item.label}
          </button>
        );
      })}

      <button onClick={logout}
        style={{
          marginTop: "auto", display: "flex", alignItems: "center", gap: "12px",
          background: "transparent", border: "none", borderRadius: "10px",
          padding: "11px 14px", color: "#ef4444", cursor: "pointer",
          fontSize: "14px", width: "100%",
        }}
      >↩ Logout</button>
    </>
  );

  return (
    <div style={{ display: "flex", minHeight: "100vh", background: "#000", color: "#fff", fontFamily: "'Segoe UI', system-ui, sans-serif" }}>

      {/* Desktop Sidebar */}
      <div className="desktop-sidebar" style={{ width: "240px", background: "#0a0a0a", borderRight: "1px solid #1a1a1a", padding: "28px 16px", display: "flex", flexDirection: "column", gap: "4px", position: "fixed", top: 0, left: 0, bottom: 0 }}>
        <SidebarContent />
      </div>

      {/* Mobile Sidebar Overlay */}
      {sidebarOpen && (
        <div onClick={() => setSidebarOpen(false)}
          style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.7)", zIndex: 200 }}
        />
      )}
      <div className="mobile-sidebar" style={{
        position: "fixed", top: 0, left: sidebarOpen ? 0 : "-260px", bottom: 0,
        width: "240px", background: "#0a0a0a", borderRight: "1px solid #1a1a1a",
        padding: "28px 16px", display: "flex", flexDirection: "column", gap: "4px",
        zIndex: 201, transition: "left 0.3s ease",
      }}>
        <SidebarContent />
      </div>

      {/* Main */}
      <div className="main-content" style={{ flex: 1, padding: "24px 20px", overflowY: "auto" }}>

        {/* Mobile Top Bar */}
        <div className="mobile-topbar" style={{ display: "none", alignItems: "center", justifyContent: "space-between", marginBottom: "24px" }}>
          <button onClick={() => setSidebarOpen(true)}
            style={{ background: "#111", border: "1px solid #1a1a1a", borderRadius: "8px", padding: "8px 12px", color: "#9ca3af", cursor: "pointer", fontSize: "18px" }}
          >☰</button>
          <span style={{ fontSize: "16px", fontWeight: "700", color: "#22c55e" }}>NEET Vision</span>
          <button onClick={logout} style={{ background: "transparent", border: "none", color: "#ef4444", cursor: "pointer", fontSize: "13px" }}>Logout</button>
        </div>

        {/* Header */}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "28px", flexWrap: "wrap", gap: "16px", opacity: loaded ? 1 : 0, transform: loaded ? "translateY(0)" : "translateY(12px)", transition: "all 0.4s ease" }}>
          <div>
            <h1 style={{ fontSize: "clamp(20px, 4vw, 28px)", fontWeight: "700", margin: "0 0 6px", letterSpacing: "-0.5px" }}>
              Welcome back, <span style={{ color: "#22c55e" }}>{user || "Student"}</span> 👋
            </h1>
            <p style={{ color: "#6b7280", margin: 0, fontSize: "14px" }}>Ready for today's practice?</p>
          </div>
          <button onClick={() => navigate("/ai-doubt")}
            style={{ background: "linear-gradient(135deg, #14532d, #166534)", border: "1px solid #22c55e44", color: "#22c55e", padding: "10px 16px", borderRadius: "12px", cursor: "pointer", fontSize: "13px", fontWeight: "600", display: "flex", alignItems: "center", gap: "8px", whiteSpace: "nowrap" }}
          >🤖 Ask AI Doubt Solver</button>
        </div>

        {/* Stats */}
        <div className="stats-grid" style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: "12px", marginBottom: "28px" }}>
          {STAT_CARDS.map((card, i) => (
            <div key={card.label} style={{
              background: "#0f0f0f", border: "1px solid #1a1a1a", borderRadius: "14px", padding: "18px",
              opacity: loaded ? 1 : 0, transform: loaded ? "translateY(0)" : "translateY(16px)",
              transition: `all 0.4s ease ${i * 0.08}s`, position: "relative", overflow: "hidden",
            }}>
              <div style={{ position: "absolute", top: 0, right: 0, width: "70px", height: "70px", background: `radial-gradient(circle, ${card.color}18, transparent 70%)`, borderRadius: "0 14px 0 0" }} />
              <div style={{ fontSize: "20px", marginBottom: "10px" }}>{card.icon}</div>
              <p style={{ color: "#6b7280", fontSize: "11px", margin: "0 0 4px", textTransform: "uppercase", letterSpacing: "0.5px" }}>{card.label}</p>
              <p style={{ fontSize: "clamp(20px, 4vw, 26px)", fontWeight: "700", margin: 0, color: card.color }}>{card.value}</p>
            </div>
          ))}
        </div>

        {/* Practice */}
        <h2 style={{ fontSize: "16px", fontWeight: "600", margin: "0 0 14px", color: "#e5e7eb", opacity: loaded ? 1 : 0, transition: "all 0.4s ease 0.35s" }}>Start Practice</h2>
        <div className="subject-grid" style={{ display: "grid", gridTemplateColumns: "repeat(1, 1fr)", gap: "12px" }}>
          {SUBJECT_CARDS.map((card) => (
            <button key={card.label} onClick={() => navigate(`/practice/${card.path}`)}
              onMouseEnter={() => setHoveredCard(card.label)}
              onMouseLeave={() => setHoveredCard(null)}
              style={{
                background: hoveredCard === card.label ? card.bg : "#0f0f0f",
                border: `1px solid ${hoveredCard === card.label ? card.border : "#1a1a1a"}`,
                borderRadius: "14px", padding: "20px", cursor: "pointer", textAlign: "left",
                transition: "all 0.2s ease",
                transform: hoveredCard === card.label ? "translateY(-2px)" : "translateY(0)",
                boxShadow: hoveredCard === card.label ? `0 8px 24px ${card.color}22` : "none",
              }}
            >
              <div style={{ fontSize: "28px", marginBottom: "10px" }}>{card.icon}</div>
              <p style={{ fontSize: "16px", fontWeight: "700", margin: "0 0 4px", color: hoveredCard === card.label ? card.color : "#e5e7eb" }}>{card.label}</p>
              <p style={{ fontSize: "13px", color: "#6b7280", margin: 0 }}>Practice now →</p>
            </button>
          ))}
        </div>

        {/* AI Banner */}
        <div onClick={() => navigate("/ai-doubt")}
          style={{ marginTop: "20px", background: "linear-gradient(135deg, #0a1f12, #0f2d1a)", border: "1px solid #14532d", borderRadius: "14px", padding: "20px 24px", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "space-between", gap: "16px", opacity: loaded ? 1 : 0, transition: "all 0.4s ease 0.45s" }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: "14px" }}>
            <div style={{ width: "44px", height: "44px", background: "#14532d", borderRadius: "12px", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "22px", flexShrink: 0 }}>🤖</div>
            <div>
              <p style={{ margin: "0 0 4px", fontWeight: "600", fontSize: "15px", color: "#e5e7eb" }}>AI Doubt Solver</p>
              <p style={{ margin: 0, color: "#6b7280", fontSize: "13px" }}>Koi bhi doubt poochho — Gemini AI solve karega</p>
            </div>
          </div>
          <span style={{ color: "#22c55e", fontSize: "20px", flexShrink: 0 }}>→</span>
        </div>
      </div>

      <style>{`
        @media (min-width: 768px) {
          .desktop-sidebar { display: flex !important; }
          .mobile-sidebar { display: none !important; }
          .mobile-topbar { display: none !important; }
          .main-content { margin-left: 240px; padding: 40px 48px !important; }
          .stats-grid { grid-template-columns: repeat(4, 1fr) !important; }
          .subject-grid { grid-template-columns: repeat(3, 1fr) !important; }
        }
        @media (max-width: 767px) {
          .desktop-sidebar { display: none !important; }
          .mobile-topbar { display: flex !important; }
        }
      `}</style>
    </div>
  );
}

export default Dashboard;