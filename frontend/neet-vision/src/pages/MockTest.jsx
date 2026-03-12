import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const SECTIONS = ["physics", "chemistry", "biology"];
const SECTION_COLORS = {
  physics: { main: "#22c55e", bg: "#14532d22", border: "#166534" },
  chemistry: { main: "#3b82f6", bg: "#1e3a5f22", border: "#1d4ed8" },
  biology: { main: "#a855f7", bg: "#3b1f5e22", border: "#7e22ce" },
};
const SECTION_ICONS = { physics: "⚛️", chemistry: "🧪", biology: "🧬" };

export default function MockTest() {
  const navigate = useNavigate();
  const [phase, setPhase] = useState("intro"); // intro | test | result
  const [sections, setSections] = useState({});
  const [answers, setAnswers] = useState({});
  const [activeSection, setActiveSection] = useState("physics");
  const [currentQ, setCurrentQ] = useState(0);
  const [time, setTime] = useState(180 * 60); // 180 minutes
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [showConfirm, setShowConfirm] = useState(false);
  const [showPanel, setShowPanel] = useState(false);
  const [markedForReview, setMarkedForReview] = useState({});
  const startTimeRef = useRef(null);

  // Timer
  useEffect(() => {
    if (phase !== "test") return;
    if (time <= 0) { handleSubmit(true); return; }
    const t = setTimeout(() => setTime(time - 1), 1000);
    return () => clearTimeout(t);
  }, [time, phase]);

  const fetchTest = async () => {
    setLoading(true);
    try {
      const token = localStorage.getItem("token");
      const { data } = await axios.get("https://neet-visual-learning.onrender.com/api/mocktest/questions", {
        headers: { Authorization: `Bearer ${token}` }
      });
      setSections(data.sections);
      setTime(data.duration * 60);
      startTimeRef.current = Date.now();
      setPhase("test");
    } catch (err) {
      alert("Failed to load test. Try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (autoSubmit = false) => {
    setShowConfirm(false);
    setPhase("loading");
    const timeTaken = Math.floor((Date.now() - startTimeRef.current) / 1000);
    try {
      const token = localStorage.getItem("token");
      const { data } = await axios.post("https://neet-visual-learning.onrender.com/api/mocktest/submit",
        { answers, timeTaken },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setResult(data);
      setPhase("result");
    } catch (err) {
      alert("Submission failed. Try again.");
      setPhase("test");
    }
  };

  const currentQuestions = sections[activeSection] || [];
  const currentQuestion = currentQuestions[currentQ];

  const getQuestionKey = (section, idx) => {
    const q = (sections[section] || [])[idx];
    return q?.id;
  };

  const totalAnswered = Object.keys(answers).length;
  const totalQuestions = SECTIONS.reduce((acc, s) => acc + (sections[s]?.length || 0), 0);

  const minutes = Math.floor(time / 60);
  const seconds = time % 60;
  const timerColor = time < 300 ? "#ef4444" : time < 900 ? "#f59e0b" : "#22c55e";

  // ─── INTRO SCREEN ───
  if (phase === "intro") return (
    <div style={{ minHeight: "100vh", background: "#000", color: "#fff", fontFamily: "'Segoe UI', system-ui, sans-serif", display: "flex", alignItems: "center", justifyContent: "center", padding: "20px" }}>
      <div style={{ maxWidth: "560px", width: "100%" }}>
        <div style={{ textAlign: "center", marginBottom: "36px" }}>
          <div style={{ fontSize: "52px", marginBottom: "16px" }}>📝</div>
          <h1 style={{ fontSize: "clamp(24px, 4vw, 32px)", fontWeight: "800", margin: "0 0 10px", letterSpacing: "-1px" }}>
            NEET Mock Test
          </h1>
          <p style={{ color: "#6b7280", fontSize: "15px", margin: 0 }}>Full syllabus test — Real NEET pattern</p>
        </div>

        {/* Rules */}
        <div style={{ background: "#0f0f0f", border: "1px solid #1a1a1a", borderRadius: "16px", padding: "24px", marginBottom: "24px" }}>
          <h3 style={{ fontSize: "14px", fontWeight: "600", color: "#e5e7eb", margin: "0 0 16px", textTransform: "uppercase", letterSpacing: "0.5px" }}>
            Test Instructions
          </h3>
          {[
            { icon: "⏱️", text: "Duration: 180 minutes" },
            { icon: "📋", text: `Total Questions: ${Object.values({ p: 5, c: 5, b: 8 }).reduce((a, b) => a + b)} (Physics 5 + Chemistry 5 + Biology 8)` },
            { icon: "✅", text: "Correct Answer: +4 marks" },
            { icon: "❌", text: "Wrong Answer: -1 mark" },
            { icon: "⏭️", text: "Unattempted: 0 marks" },
            { icon: "🔖", text: "You can mark questions for review" },
            { icon: "🔀", text: "Switch between sections anytime" },
          ].map((rule, i) => (
            <div key={i} style={{ display: "flex", gap: "12px", alignItems: "flex-start", marginBottom: "10px" }}>
              <span style={{ fontSize: "16px", flexShrink: 0 }}>{rule.icon}</span>
              <p style={{ margin: 0, fontSize: "14px", color: "#9ca3af", lineHeight: "1.5" }}>{rule.text}</p>
            </div>
          ))}
        </div>

        {/* Section overview */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "10px", marginBottom: "24px" }}>
          {SECTIONS.map(s => {
            const c = SECTION_COLORS[s];
            return (
              <div key={s} style={{ background: c.bg, border: `1px solid ${c.border}`, borderRadius: "12px", padding: "14px", textAlign: "center" }}>
                <div style={{ fontSize: "24px", marginBottom: "6px" }}>{SECTION_ICONS[s]}</div>
                <p style={{ margin: "0 0 2px", fontSize: "13px", fontWeight: "600", color: c.main, textTransform: "capitalize" }}>{s}</p>
              </div>
            );
          })}
        </div>

        <button onClick={fetchTest} disabled={loading}
          style={{
            width: "100%", background: "linear-gradient(135deg, #22c55e, #16a34a)",
            border: "none", color: "#000", padding: "14px", borderRadius: "12px",
            fontSize: "16px", fontWeight: "700", cursor: loading ? "not-allowed" : "pointer",
            opacity: loading ? 0.7 : 1,
          }}
        >
          {loading ? "Loading..." : "Start Mock Test →"}
        </button>

        <button onClick={() => navigate("/dashboard")}
          style={{ width: "100%", background: "transparent", border: "1px solid #1f1f1f", color: "#6b7280", padding: "12px", borderRadius: "12px", fontSize: "14px", cursor: "pointer", marginTop: "10px" }}
        >← Back to Dashboard</button>
      </div>
    </div>
  );

  // ─── LOADING ───
  if (phase === "loading") return (
    <div style={{ minHeight: "100vh", background: "#000", display: "flex", alignItems: "center", justifyContent: "center", color: "#fff" }}>
      <div style={{ textAlign: "center" }}>
        <div style={{ fontSize: "40px", marginBottom: "16px", animation: "spin 1s linear infinite", display: "inline-block" }}>⟳</div>
        <p style={{ color: "#6b7280" }}>Submitting your test...</p>
      </div>
      <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
    </div>
  );

  // ─── RESULT SCREEN ───
  if (phase === "result" && result) {
    const percent = Math.round((result.score / result.maxScore) * 100);
    const grade = percent >= 80 ? { label: "Excellent! 🏆", color: "#22c55e" }
      : percent >= 60 ? { label: "Good! 👍", color: "#3b82f6" }
      : percent >= 40 ? { label: "Average 📚", color: "#f59e0b" }
      : { label: "Needs Improvement 💪", color: "#ef4444" };

    return (
      <div style={{ minHeight: "100vh", background: "#000", color: "#fff", fontFamily: "'Segoe UI', system-ui, sans-serif", padding: "20px" }}>
        <div style={{ maxWidth: "680px", margin: "0 auto" }}>

          {/* Score Card */}
          <div style={{ background: "#0f0f0f", border: "1px solid #1a1a1a", borderRadius: "20px", padding: "32px", textAlign: "center", marginBottom: "24px" }}>
            <p style={{ color: "#6b7280", fontSize: "13px", margin: "0 0 8px", textTransform: "uppercase", letterSpacing: "0.5px" }}>Your Score</p>
            <p style={{ fontSize: "clamp(48px, 10vw, 72px)", fontWeight: "800", margin: "0 0 4px", color: grade.color }}>{result.score}</p>
            <p style={{ color: "#6b7280", fontSize: "14px", margin: "0 0 16px" }}>out of {result.maxScore}</p>
            <div style={{ display: "inline-block", background: `${grade.color}22`, border: `1px solid ${grade.color}44`, borderRadius: "20px", padding: "6px 20px", marginBottom: "24px" }}>
              <span style={{ color: grade.color, fontWeight: "600", fontSize: "14px" }}>{grade.label}</span>
            </div>

            {/* Stats Grid */}
            <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: "12px" }} className="result-stats">
              {[
                { label: "Correct", value: result.correct, color: "#22c55e", icon: "✓" },
                { label: "Wrong", value: result.wrong, color: "#ef4444", icon: "✗" },
                { label: "Skipped", value: result.skipped, color: "#f59e0b", icon: "—" },
                { label: "Accuracy", value: `${result.accuracy}%`, color: "#3b82f6", icon: "🎯" },
              ].map((s) => (
                <div key={s.label} style={{ background: "#1a1a1a", borderRadius: "12px", padding: "16px", textAlign: "center" }}>
                  <p style={{ fontSize: "clamp(20px, 4vw, 28px)", fontWeight: "800", color: s.color, margin: "0 0 4px" }}>{s.value}</p>
                  <p style={{ fontSize: "12px", color: "#6b7280", margin: 0 }}>{s.label}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Percentile bar */}
          <div style={{ background: "#0f0f0f", border: "1px solid #1a1a1a", borderRadius: "14px", padding: "20px", marginBottom: "24px" }}>
            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "8px" }}>
              <span style={{ fontSize: "13px", color: "#9ca3af" }}>Score Percentile</span>
              <span style={{ fontSize: "13px", fontWeight: "700", color: "#22c55e" }}>{result.percentile}%</span>
            </div>
            <div style={{ height: "8px", background: "#1a1a1a", borderRadius: "4px", overflow: "hidden" }}>
              <div style={{ height: "100%", width: `${result.percentile}%`, background: "linear-gradient(90deg, #22c55e, #4ade80)", borderRadius: "4px", transition: "width 1s ease" }} />
            </div>
          </div>

          {/* Action buttons */}
          <div style={{ display: "flex", gap: "10px", flexWrap: "wrap" }}>
            <button onClick={() => navigate("/dashboard")}
              style={{ flex: 1, minWidth: "140px", background: "#0f0f0f", border: "1px solid #1f2937", color: "#9ca3af", padding: "12px", borderRadius: "10px", cursor: "pointer", fontSize: "14px" }}>
              ← Dashboard
            </button>
            <button onClick={() => { setPhase("intro"); setAnswers({}); setResult(null); setMarkedForReview({}); }}
              style={{ flex: 1, minWidth: "140px", background: "linear-gradient(135deg, #22c55e, #16a34a)", border: "none", color: "#000", padding: "12px", borderRadius: "10px", cursor: "pointer", fontSize: "14px", fontWeight: "700" }}>
              Retake Test ↺
            </button>
            <button onClick={() => navigate("/ai-doubt")}
              style={{ flex: 1, minWidth: "140px", background: "#14532d44", border: "1px solid #166534", color: "#22c55e", padding: "12px", borderRadius: "10px", cursor: "pointer", fontSize: "14px", fontWeight: "600" }}>
              🤖 Ask AI Doubts
            </button>
          </div>
        </div>

        <style>{`
          @media (min-width: 480px) { .result-stats { grid-template-columns: repeat(4, 1fr) !important; } }
        `}</style>
      </div>
    );
  }

  // ─── TEST SCREEN ───
  return (
    <div style={{ minHeight: "100vh", background: "#000", color: "#fff", fontFamily: "'Segoe UI', system-ui, sans-serif", display: "flex", flexDirection: "column" }}>

      {/* Top Bar */}
      <div style={{ background: "#0a0a0a", borderBottom: "1px solid #1a1a1a", padding: "10px 16px", display: "flex", alignItems: "center", justifyContent: "space-between", gap: "10px", flexWrap: "wrap", position: "sticky", top: 0, zIndex: 50 }}>

        {/* Left */}
        <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
          <div style={{ width: "28px", height: "28px", background: "linear-gradient(135deg, #22c55e, #16a34a)", borderRadius: "7px", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: "800", fontSize: "14px", color: "#000" }}>N</div>
          <span style={{ fontSize: "14px", fontWeight: "600", color: "#e5e7eb" }}>NEET Mock Test</span>
        </div>

        {/* Center — Timer */}
        <div style={{ background: "#0f0f0f", border: `1px solid ${timerColor}44`, borderRadius: "10px", padding: "6px 16px", textAlign: "center" }}>
          <p style={{ margin: 0, fontSize: "clamp(16px, 3vw, 22px)", fontWeight: "700", color: timerColor, fontVariantNumeric: "tabular-nums" }}>
            ⏱ {String(minutes).padStart(2, "0")}:{String(seconds).padStart(2, "0")}
          </p>
        </div>

        {/* Right */}
        <div style={{ display: "flex", gap: "8px", alignItems: "center" }}>
          <span style={{ fontSize: "13px", color: "#6b7280" }}>{totalAnswered}/{totalQuestions}</span>
          <button onClick={() => setShowPanel(!showPanel)}
            className="panel-toggle"
            style={{ background: "#111", border: "1px solid #1f2937", color: "#9ca3af", padding: "6px 12px", borderRadius: "8px", cursor: "pointer", fontSize: "13px", display: "none" }}
          >📋</button>
          <button onClick={() => setShowConfirm(true)}
            style={{ background: "#1f0000", border: "1px solid #7f1d1d", color: "#ef4444", padding: "6px 14px", borderRadius: "8px", cursor: "pointer", fontSize: "13px", fontWeight: "600" }}>
            Submit
          </button>
        </div>
      </div>

      <div style={{ display: "flex", flex: 1, overflow: "hidden" }}>

        {/* MAIN AREA */}
        <div style={{ flex: 1, overflowY: "auto", padding: "16px" }} className="test-main">

          {/* Section Tabs */}
          <div style={{ display: "flex", gap: "6px", marginBottom: "16px", overflowX: "auto", paddingBottom: "4px" }}>
            {SECTIONS.map(s => {
              const c = SECTION_COLORS[s];
              const sAnswered = (sections[s] || []).filter((q) => answers[q.id] !== undefined).length;
              const isActive = activeSection === s;
              return (
                <button key={s} onClick={() => { setActiveSection(s); setCurrentQ(0); }}
                  style={{
                    background: isActive ? c.bg : "#0f0f0f",
                    border: `1px solid ${isActive ? c.border : "#1a1a1a"}`,
                    color: isActive ? c.main : "#6b7280",
                    padding: "8px 16px", borderRadius: "10px", cursor: "pointer",
                    fontSize: "13px", fontWeight: isActive ? "600" : "400",
                    whiteSpace: "nowrap", transition: "all 0.15s ease",
                    display: "flex", alignItems: "center", gap: "6px",
                  }}
                >
                  {SECTION_ICONS[s]} {s.charAt(0).toUpperCase() + s.slice(1)}
                  <span style={{ background: isActive ? c.border : "#1a1a1a", color: isActive ? c.main : "#4b5563", padding: "1px 7px", borderRadius: "10px", fontSize: "11px" }}>
                    {sAnswered}/{(sections[s] || []).length}
                  </span>
                </button>
              );
            })}
          </div>

          {currentQuestion && (
            <>
              {/* Question */}
              <div style={{ background: "#0f0f0f", border: "1px solid #1a1a1a", borderRadius: "14px", padding: "20px", marginBottom: "14px" }}>
                <div style={{ display: "flex", gap: "10px", alignItems: "flex-start", marginBottom: "8px" }}>
                  <span style={{
                    background: SECTION_COLORS[activeSection].bg,
                    color: SECTION_COLORS[activeSection].main,
                    border: `1px solid ${SECTION_COLORS[activeSection].border}`,
                    borderRadius: "7px", padding: "3px 8px", fontSize: "12px", fontWeight: "700", whiteSpace: "nowrap",
                  }}>
                    Q{currentQ + 1}
                  </span>
                  {markedForReview[currentQuestion.id] && (
                    <span style={{ background: "#78350f22", color: "#f59e0b", border: "1px solid #78350f", borderRadius: "7px", padding: "3px 8px", fontSize: "11px" }}>
                      🔖 Marked
                    </span>
                  )}
                </div>
                <p style={{ margin: 0, fontSize: "clamp(14px, 2vw, 16px)", lineHeight: "1.7", color: "#e5e7eb" }}>
                  {currentQuestion.question}
                </p>
              </div>

              {/* Options */}
              <div style={{ display: "flex", flexDirection: "column", gap: "8px", marginBottom: "16px" }}>
                {currentQuestion.options?.map((opt, i) => {
                  const isSelected = answers[currentQuestion.id] === i;
                  return (
                    <button key={i}
                      onClick={() => setAnswers({ ...answers, [currentQuestion.id]: i })}
                      style={{
                        background: isSelected ? SECTION_COLORS[activeSection].bg : "#0f0f0f",
                        border: `1px solid ${isSelected ? SECTION_COLORS[activeSection].border : "#1a1a1a"}`,
                        borderRadius: "10px", padding: "12px 16px", textAlign: "left",
                        cursor: "pointer", color: isSelected ? SECTION_COLORS[activeSection].main : "#d1d5db",
                        fontSize: "clamp(13px, 2vw, 14px)",
                        display: "flex", alignItems: "center", gap: "10px",
                        transition: "all 0.15s ease",
                        transform: isSelected ? "translateX(3px)" : "translateX(0)",
                      }}
                    >
                      <span style={{
                        width: "26px", height: "26px", borderRadius: "50%", flexShrink: 0,
                        border: `2px solid ${isSelected ? SECTION_COLORS[activeSection].main : "#374151"}`,
                        display: "flex", alignItems: "center", justifyContent: "center",
                        fontSize: "12px", fontWeight: "700",
                        background: isSelected ? SECTION_COLORS[activeSection].bg : "transparent",
                        color: isSelected ? SECTION_COLORS[activeSection].main : "#6b7280",
                      }}>
                        {["A", "B", "C", "D"][i]}
                      </span>
                      <span style={{ flex: 1 }}>{opt}</span>
                      {isSelected && <span>✓</span>}
                    </button>
                  );
                })}
              </div>

              {/* Nav + Actions */}
              <div style={{ display: "flex", gap: "8px", flexWrap: "wrap", alignItems: "center" }}>
                <button onClick={() => currentQ > 0 && setCurrentQ(currentQ - 1)} disabled={currentQ === 0}
                  style={{ background: "#0f0f0f", border: "1px solid #1f2937", color: currentQ === 0 ? "#374151" : "#9ca3af", padding: "9px 16px", borderRadius: "8px", cursor: currentQ === 0 ? "not-allowed" : "pointer", fontSize: "13px" }}>
                  ← Prev
                </button>
                <button onClick={() => currentQ < currentQuestions.length - 1 && setCurrentQ(currentQ + 1)} disabled={currentQ === currentQuestions.length - 1}
                  style={{ background: SECTION_COLORS[activeSection].bg, border: `1px solid ${SECTION_COLORS[activeSection].border}`, color: SECTION_COLORS[activeSection].main, padding: "9px 16px", borderRadius: "8px", cursor: currentQ === currentQuestions.length - 1 ? "not-allowed" : "pointer", fontSize: "13px", opacity: currentQ === currentQuestions.length - 1 ? 0.4 : 1 }}>
                  Next →
                </button>
                <button
                  onClick={() => setMarkedForReview(prev => ({ ...prev, [currentQuestion.id]: !prev[currentQuestion.id] }))}
                  style={{ background: markedForReview[currentQuestion.id] ? "#78350f22" : "#0f0f0f", border: `1px solid ${markedForReview[currentQuestion.id] ? "#92400e" : "#1f2937"}`, color: markedForReview[currentQuestion.id] ? "#f59e0b" : "#6b7280", padding: "9px 16px", borderRadius: "8px", cursor: "pointer", fontSize: "13px" }}>
                  🔖 {markedForReview[currentQuestion.id] ? "Unmark" : "Mark"}
                </button>
                {answers[currentQuestion.id] !== undefined && (
                  <button onClick={() => { const a = { ...answers }; delete a[currentQuestion.id]; setAnswers(a); }}
                    style={{ background: "#0f0f0f", border: "1px solid #1f2937", color: "#ef4444", padding: "9px 16px", borderRadius: "8px", cursor: "pointer", fontSize: "13px" }}>
                    Clear
                  </button>
                )}
              </div>
            </>
          )}
        </div>

        {/* RIGHT PANEL — Desktop */}
        <div className="desktop-panel" style={{ width: "200px", background: "#0a0a0a", borderLeft: "1px solid #1a1a1a", padding: "16px", overflowY: "auto" }}>
          <QuestionPanel sections={sections} answers={answers} markedForReview={markedForReview} activeSection={activeSection} currentQ={currentQ} setActiveSection={setActiveSection} setCurrentQ={setCurrentQ} />
        </div>

        {/* Mobile Slide Panel */}
        {showPanel && <div onClick={() => setShowPanel(false)} style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.7)", zIndex: 100 }} />}
        <div className="mobile-panel" style={{ position: "fixed", top: 0, right: showPanel ? 0 : "-220px", width: "210px", height: "100vh", background: "#0a0a0a", borderLeft: "1px solid #1a1a1a", padding: "16px", overflowY: "auto", zIndex: 101, transition: "right 0.3s ease" }}>
          <button onClick={() => setShowPanel(false)} style={{ background: "transparent", border: "none", color: "#6b7280", cursor: "pointer", fontSize: "18px", marginBottom: "12px" }}>✕</button>
          <QuestionPanel sections={sections} answers={answers} markedForReview={markedForReview} activeSection={activeSection} currentQ={currentQ}
            setActiveSection={(s) => { setActiveSection(s); setCurrentQ(0); }}
            setCurrentQ={(i) => { setCurrentQ(i); setShowPanel(false); }}
          />
        </div>
      </div>

      {/* Confirm Submit Modal */}
      {showConfirm && (
        <div style={{ position: "fixed", inset: 0, background: "#000000cc", backdropFilter: "blur(4px)", display: "flex", alignItems: "center", justifyContent: "center", zIndex: 999, padding: "20px" }}>
          <div style={{ background: "#0f0f0f", border: "1px solid #1f2937", borderRadius: "16px", padding: "28px", maxWidth: "340px", width: "100%", textAlign: "center" }}>
            <div style={{ fontSize: "36px", marginBottom: "12px" }}>⚠️</div>
            <h3 style={{ margin: "0 0 8px", fontSize: "18px" }}>Submit Test?</h3>
            <p style={{ color: "#6b7280", fontSize: "14px", margin: "0 0 6px" }}>{totalAnswered}/{totalQuestions} questions answered</p>
            <p style={{ color: "#6b7280", fontSize: "14px", margin: "0 0 20px" }}>{Object.keys(markedForReview).filter(k => markedForReview[k]).length} marked for review</p>
            <div style={{ display: "flex", gap: "10px", justifyContent: "center" }}>
              <button onClick={() => setShowConfirm(false)} style={{ background: "#1f2937", border: "none", color: "#9ca3af", padding: "10px 20px", borderRadius: "8px", cursor: "pointer" }}>Cancel</button>
              <button onClick={() => handleSubmit()} style={{ background: "#16a34a", border: "none", color: "#fff", padding: "10px 20px", borderRadius: "8px", cursor: "pointer", fontWeight: "600" }}>Submit Now</button>
            </div>
          </div>
        </div>
      )}

      <style>{`
        * { box-sizing: border-box; }
        ::-webkit-scrollbar { width: 4px; }
        ::-webkit-scrollbar-track { background: #000; }
        ::-webkit-scrollbar-thumb { background: #1f2937; border-radius: 2px; }
        @media (max-width: 768px) {
          .desktop-panel { display: none !important; }
          .panel-toggle { display: block !important; }
          .test-main { padding: 12px !important; }
        }
        @media (min-width: 769px) {
          .mobile-panel { display: none !important; }
        }
      `}</style>
    </div>
  );
}

function QuestionPanel({ sections, answers, markedForReview, activeSection, currentQ, setActiveSection, setCurrentQ }) {
  return (
    <>
      {SECTIONS.map(s => {
        const c = SECTION_COLORS[s];
        const qs = sections[s] || [];
        const isActive = activeSection === s;
        return (
          <div key={s} style={{ marginBottom: "16px" }}>
            <p style={{ fontSize: "11px", fontWeight: "600", color: isActive ? c.main : "#6b7280", textTransform: "uppercase", letterSpacing: "0.5px", margin: "0 0 8px", display: "flex", alignItems: "center", gap: "4px" }}>
              {SECTION_ICONS[s]} {s}
            </p>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "4px" }}>
              {qs.map((q, i) => {
                const isAnswered = answers[q.id] !== undefined;
                const isMarked = markedForReview[q.id];
                const isCurrent = isActive && currentQ === i;
                return (
                  <button key={q.id}
                    onClick={() => { setActiveSection(s); setCurrentQ(i); }}
                    style={{
                      aspectRatio: "1", borderRadius: "6px",
                      border: isCurrent ? `2px solid ${c.main}` : "1px solid transparent",
                      background: isMarked ? "#78350f44" : isAnswered ? c.bg : "#1f2937",
                      color: isMarked ? "#f59e0b" : isAnswered ? c.main : "#6b7280",
                      fontSize: "10px", fontWeight: "600", cursor: "pointer",
                      transition: "all 0.1s ease",
                    }}
                  >{i + 1}</button>
                );
              })}
            </div>
          </div>
        );
      })}

      {/* Legend */}
      <div style={{ marginTop: "12px", display: "flex", flexDirection: "column", gap: "5px" }}>
        {[
          { color: "#14532d", label: "Answered" },
          { color: "#1f2937", label: "Not Answered" },
          { color: "#78350f44", label: "Marked" },
        ].map(l => (
          <div key={l.label} style={{ display: "flex", alignItems: "center", gap: "6px" }}>
            <div style={{ width: "10px", height: "10px", background: l.color, borderRadius: "3px", flexShrink: 0 }} />
            <span style={{ fontSize: "11px", color: "#6b7280" }}>{l.label}</span>
          </div>
        ))}
      </div>
    </>
  );
}