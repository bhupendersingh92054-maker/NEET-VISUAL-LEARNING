import { useState, useRef, useEffect } from "react";
import ReactMarkdown from "react-markdown";
import axios from "axios";
import { useNavigate, useLocation } from "react-router-dom";

const SUBJECTS = ["General", "Physics", "Chemistry", "Biology", "Mathematics"];

const NAV_ITEMS = [
  { label: "Dashboard", path: "/dashboard", icon: "⊞" },
  { label: "Practice", path: "/practice/physics", icon: "⚡" },
  { label: "Mock Tests", path: null, icon: "📝" },
  { label: "AI Doubt Solver", path: "/ai-doubt", icon: "🤖" },
  { label: "Performance", path: null, icon: "📊" },
];

export default function AIDoubtSolver() {
  const [question, setQuestion] = useState("");
  const [subject, setSubject] = useState("General");
  const [language, setLanguage] = useState("en");
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const bottomRef = useRef(null);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [history, loading]);

  const logout = () => { localStorage.removeItem("token"); navigate("/login"); };

  const handleSolve = async () => {
    if (!question.trim()) return;
    const q = question.trim();
    setQuestion(""); setError("");
    setHistory((prev) => [...prev, { type: "question", text: q, subject }]);
    setLoading(true);
    try {
      const token = localStorage.getItem("token");
      const { data } = await axios.post("https://neet-visual-learning.onrender.com/api/ai/solve-doubt",
        { question: q, subject: subject === "General" ? "" : subject, language },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setHistory((prev) => [...prev, { type: "answer", text: data.answer }]);
    } catch (err) {
      setError(err.response?.data?.error || "Something went wrong");
      setHistory((prev) => prev.slice(0, -1));
    } finally {
      setLoading(false);
    }
  };

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
            style={{ display: "flex", alignItems: "center", gap: "12px", background: isActive ? "#14532d" : "transparent", color: isActive ? "#22c55e" : "#6b7280", border: isActive ? "1px solid #166534" : "1px solid transparent", borderRadius: "10px", padding: "11px 14px", textAlign: "left", cursor: item.path ? "pointer" : "default", fontSize: "14px", fontWeight: isActive ? "600" : "400", transition: "all 0.15s ease", width: "100%" }}
          ><span style={{ fontSize: "16px" }}>{item.icon}</span>{item.label}</button>
        );
      })}
      <button onClick={logout} style={{ marginTop: "auto", display: "flex", alignItems: "center", gap: "12px", background: "transparent", border: "none", borderRadius: "10px", padding: "11px 14px", color: "#ef4444", cursor: "pointer", fontSize: "14px", width: "100%" }}>↩ Logout</button>
    </>
  );

  return (
    <div style={{ display: "flex", minHeight: "100vh", background: "#000", color: "#fff", fontFamily: "'Segoe UI', system-ui, sans-serif" }}>

      {/* Desktop Sidebar */}
      <div className="desktop-sidebar" style={{ width: "240px", background: "#0a0a0a", borderRight: "1px solid #1a1a1a", padding: "28px 16px", display: "flex", flexDirection: "column", gap: "4px", position: "fixed", top: 0, left: 0, bottom: 0 }}>
        <SidebarContent />
      </div>

      {/* Mobile Sidebar */}
      {sidebarOpen && <div onClick={() => setSidebarOpen(false)} style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.7)", zIndex: 200 }} />}
      <div className="mobile-sidebar" style={{ position: "fixed", top: 0, left: sidebarOpen ? 0 : "-260px", bottom: 0, width: "240px", background: "#0a0a0a", borderRight: "1px solid #1a1a1a", padding: "28px 16px", display: "flex", flexDirection: "column", gap: "4px", zIndex: 201, transition: "left 0.3s ease" }}>
        <SidebarContent />
      </div>

      {/* Main */}
      <div className="main-content" style={{ flex: 1, padding: "20px", display: "flex", flexDirection: "column" }}>

        {/* Mobile Top Bar */}
        <div className="mobile-topbar" style={{ display: "none", alignItems: "center", justifyContent: "space-between", marginBottom: "20px" }}>
          <button onClick={() => setSidebarOpen(true)} style={{ background: "#111", border: "1px solid #1a1a1a", borderRadius: "8px", padding: "8px 12px", color: "#9ca3af", cursor: "pointer", fontSize: "18px" }}>☰</button>
          <span style={{ fontSize: "16px", fontWeight: "700", color: "#22c55e" }}>AI Doubt Solver</span>
          <div style={{ width: "40px" }} />
        </div>

        {/* Header */}
        <div style={{ marginBottom: "20px" }}>
          <h1 style={{ fontSize: "clamp(20px, 4vw, 26px)", fontWeight: "700", margin: "0 0 4px" }}>AI Doubt Solver 🤖</h1>
          <p style={{ color: "#6b7280", margin: 0, fontSize: "14px" }}>Koi bhi NEET doubt poochho — Gemini AI solve karega</p>
        </div>

        {/* Controls */}
        <div style={{ display: "flex", gap: "10px", marginBottom: "16px", flexWrap: "wrap" }}>
          <select value={subject} onChange={(e) => setSubject(e.target.value)}
            style={{ background: "#111827", border: "1px solid #374151", color: "#fff", padding: "10px 14px", borderRadius: "8px", fontSize: "14px", cursor: "pointer", outline: "none", flex: 1, minWidth: "120px" }}
          >
            {SUBJECTS.map((s) => <option key={s} style={{ background: "#111827" }}>{s}</option>)}
          </select>

          <div style={{ display: "flex", background: "#111827", borderRadius: "8px", border: "1px solid #374151", overflow: "hidden" }}>
            {["en", "hi"].map((lang) => (
              <button key={lang} onClick={() => setLanguage(lang)}
                style={{ padding: "10px 18px", border: "none", cursor: "pointer", fontSize: "13px", fontWeight: "600", background: language === lang ? "#166534" : "transparent", color: language === lang ? "#4ade80" : "#6b7280", transition: "all 0.2s" }}
              >{lang === "en" ? "EN" : "HI"}</button>
            ))}
          </div>
        </div>

        {/* Chat Box */}
        <div style={{ flex: 1, background: "#111827", borderRadius: "16px", border: "1px solid #1f2937", padding: "20px", overflowY: "auto", minHeight: "300px", maxHeight: "55vh", marginBottom: "12px" }}>
          {history.length === 0 && (
            <div style={{ textAlign: "center", padding: "40px 16px", color: "#6b7280" }}>
              <div style={{ fontSize: "40px", marginBottom: "12px" }}>🎓</div>
              <p style={{ fontSize: "16px", fontWeight: "600", color: "#d1d5db", margin: "0 0 8px" }}>Koi bhi NEET doubt poochho!</p>
              <p style={{ fontSize: "13px", margin: "0 0 20px" }}>Physics, Chemistry, Biology — sab solve hoga</p>
              <div style={{ display: "flex", gap: "8px", justifyContent: "center", flexWrap: "wrap" }}>
                {["Newton's 2nd law?", "Photosynthesis explain karo", "DNA replication steps"].map((q) => (
                  <button key={q} onClick={() => setQuestion(q)}
                    style={{ background: "#1f2937", border: "1px solid #374151", color: "#4ade80", padding: "7px 14px", borderRadius: "20px", fontSize: "12px", cursor: "pointer" }}
                  >{q}</button>
                ))}
              </div>
            </div>
          )}

          {history.map((item, i) => (
            <div key={i} style={{ marginBottom: "16px", display: "flex", justifyContent: item.type === "question" ? "flex-end" : "flex-start" }}>
              {item.type === "question" ? (
                <div style={{ maxWidth: "80%" }}>
                  {item.subject !== "General" && (
                    <div style={{ textAlign: "right", marginBottom: "4px" }}>
                      <span style={{ background: "#14532d", color: "#4ade80", padding: "2px 10px", borderRadius: "10px", fontSize: "11px", fontWeight: "600" }}>{item.subject}</span>
                    </div>
                  )}
                  <div style={{ background: "#166534", border: "1px solid #15803d", color: "#fff", padding: "10px 14px", borderRadius: "16px 16px 4px 16px", fontSize: "14px", lineHeight: "1.5" }}>{item.text}</div>
                </div>
              ) : (
                <div style={{ background: "#1f2937", border: "1px solid #374151", borderRadius: "16px 16px 16px 4px", padding: "14px 18px", maxWidth: "90%" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: "6px", marginBottom: "8px" }}>
                    <div style={{ width: "8px", height: "8px", background: "#4ade80", borderRadius: "50%" }}></div>
                    <span style={{ fontSize: "12px", fontWeight: "600", color: "#4ade80" }}>Gemini AI</span>
                  </div>
                  <div style={{ fontSize: "14px", lineHeight: "1.7", color: "#d1d5db" }}>
                    <ReactMarkdown>{item.text}</ReactMarkdown>
                  </div>
                </div>
              )}
            </div>
          ))}

          {loading && (
            <div style={{ background: "#1f2937", border: "1px solid #374151", borderRadius: "16px", padding: "14px 18px", display: "inline-block" }}>
              <div style={{ display: "flex", alignItems: "center", gap: "6px", marginBottom: "8px" }}>
                <div style={{ width: "8px", height: "8px", background: "#4ade80", borderRadius: "50%" }}></div>
                <span style={{ fontSize: "12px", fontWeight: "600", color: "#4ade80" }}>Gemini AI</span>
              </div>
              <div style={{ display: "flex", gap: "5px" }}>
                {[0, 1, 2].map((i) => (
                  <div key={i} style={{ width: "8px", height: "8px", background: "#4ade80", borderRadius: "50%", animation: "bounce 1.2s infinite", animationDelay: `${i * 0.2}s` }} />
                ))}
              </div>
            </div>
          )}

          {error && (
            <div style={{ background: "#1f2937", border: "1px solid #7f1d1d", color: "#f87171", padding: "10px 14px", borderRadius: "10px", fontSize: "13px" }}>⚠️ {error}</div>
          )}
          <div ref={bottomRef} />
        </div>

        {/* Input */}
        <div style={{ display: "flex", gap: "8px", background: "#111827", border: "1px solid #374151", borderRadius: "12px", padding: "10px" }}>
          <textarea value={question} onChange={(e) => setQuestion(e.target.value)}
            onKeyDown={(e) => { if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); handleSolve(); } }}
            placeholder="Apna doubt likho... (Enter to send)"
            rows={2}
            style={{ flex: 1, background: "transparent", border: "none", outline: "none", color: "#fff", fontSize: "14px", resize: "none", fontFamily: "inherit" }}
          />
          <button onClick={handleSolve} disabled={loading || !question.trim()}
            style={{ background: loading || !question.trim() ? "#374151" : "#16a34a", color: loading || !question.trim() ? "#6b7280" : "#fff", border: "none", borderRadius: "8px", width: "40px", height: "40px", fontSize: "18px", cursor: loading || !question.trim() ? "not-allowed" : "pointer", alignSelf: "flex-end", transition: "all 0.2s", flexShrink: 0 }}
          >→</button>
        </div>
      </div>

      <style>{`
        @keyframes bounce { 0%, 80%, 100% { transform: translateY(0); } 40% { transform: translateY(-6px); } }
        @media (min-width: 768px) {
          .desktop-sidebar { display: flex !important; }
          .mobile-sidebar { display: none !important; }
          .mobile-topbar { display: none !important; }
          .main-content { margin-left: 240px; padding: 40px 48px !important; }
        }
        @media (max-width: 767px) {
          .desktop-sidebar { display: none !important; }
          .mobile-topbar { display: flex !important; }
        }
      `}</style>
    </div>
  );
}