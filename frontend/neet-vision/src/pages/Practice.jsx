import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";

function Practice() {
  const { subject } = useParams();
  const navigate = useNavigate();

  const [questions, setQuestions] = useState([]);
  const [current, setCurrent] = useState(0);
  const [answers, setAnswers] = useState({});
  const [time, setTime] = useState(600);
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(true);
  const [loaded, setLoaded] = useState(false);
  const [hoveredOption, setHoveredOption] = useState(null);
  const [showConfirm, setShowConfirm] = useState(false);
  const [showSidebar, setShowSidebar] = useState(false);

  const SUBJECT_COLOR = {
    physics: { main: "#22c55e", bg: "#14532d", border: "#166534" },
    chemistry: { main: "#3b82f6", bg: "#1e3a5f", border: "#1d4ed8" },
    biology: { main: "#a855f7", bg: "#3b1f5e", border: "#7e22ce" },
  };
  const color = SUBJECT_COLOR[subject?.toLowerCase()] || SUBJECT_COLOR.physics;

  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const res = await axios.get(`https://neet-visual-learning.onrender.com/questions/${subject}`);
        setQuestions(res.data);
        setLoading(false);
        setTimeout(() => setLoaded(true), 100);
      } catch (err) {
        console.log(err);
        setLoading(false);
      }
    };
    fetchQuestions();
  }, [subject]);

  useEffect(() => {
    if (time > 0 && !submitted) {
      const timer = setTimeout(() => setTime(time - 1), 1000);
      return () => clearTimeout(timer);
    } else if (time === 0 && !submitted) {
      setSubmitted(true);
    }
  }, [time, submitted]);

  const selectOption = (i) => {
    if (!submitted) setAnswers({ ...answers, [current]: i });
  };

  const calculateScore = () => {
    let score = 0;
    questions.forEach((q, i) => {
      if (answers[i] === q.correctAnswer) score += 4;
      else if (answers[i] !== undefined) score -= 1;
    });
    return score;
  };

  const minutes = Math.floor(time / 60);
  const seconds = time % 60;
  const answered = Object.keys(answers).length;
  const timerColor = time < 60 ? "#ef4444" : time < 180 ? "#f59e0b" : "#22c55e";

  if (loading) return (
    <div style={{ background: "#000", minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center" }}>
      <div style={{ textAlign: "center", color: "#6b7280" }}>
        <div style={{ fontSize: "40px", marginBottom: "16px", animation: "spin 1s linear infinite", display: "inline-block" }}>⟳</div>
        <p style={{ fontSize: "16px" }}>Loading questions...</p>
      </div>
      <style>{`@keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }`}</style>
    </div>
  );

  if (questions.length === 0) return (
    <div style={{ background: "#000", minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", color: "#fff", padding: "20px" }}>
      <div style={{ textAlign: "center" }}>
        <div style={{ fontSize: "48px", marginBottom: "16px" }}>😕</div>
        <p style={{ fontSize: "18px", color: "#6b7280" }}>No questions found for <span style={{ color: color.main }}>{subject}</span></p>
        <button onClick={() => navigate("/dashboard")} style={{ marginTop: "20px", background: color.bg, border: `1px solid ${color.border}`, color: color.main, padding: "10px 20px", borderRadius: "10px", cursor: "pointer", fontSize: "14px" }}>
          ← Back to Dashboard
        </button>
      </div>
    </div>
  );

  const score = calculateScore();
  const maxScore = questions.length * 4;

  return (
    <div style={{ display: "flex", minHeight: "100vh", background: "#000", color: "#fff", fontFamily: "'Segoe UI', system-ui, sans-serif", position: "relative" }}>

      {/* Mobile Sidebar Overlay */}
      {showSidebar && (
        <div onClick={() => setShowSidebar(false)}
          style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.7)", zIndex: 100 }}
        />
      )}

      {/* LEFT MAIN */}
      <div style={{ flex: 1, padding: "20px", overflowY: "auto", minWidth: 0 }} className="main-area">

        {/* Header */}
        <div style={{
          display: "flex", alignItems: "center", justifyContent: "space-between",
          marginBottom: "20px", gap: "12px", flexWrap: "wrap",
          opacity: loaded ? 1 : 0, transform: loaded ? "translateY(0)" : "translateY(12px)",
          transition: "all 0.4s ease",
        }}>
          <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
            <button onClick={() => navigate("/dashboard")}
              style={{ background: "#111", border: "1px solid #1f2937", color: "#6b7280", padding: "8px 12px", borderRadius: "8px", cursor: "pointer", fontSize: "13px" }}>
              ←
            </button>
            <div>
              <h1 style={{ margin: 0, fontSize: "clamp(16px, 3vw, 22px)", fontWeight: "700", textTransform: "capitalize" }}>
                <span style={{ color: color.main }}>{subject}</span> Practice
              </h1>
              <p style={{ margin: 0, color: "#6b7280", fontSize: "12px" }}>
                Q {current + 1} / {questions.length}
              </p>
            </div>
          </div>

          <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
            {/* Timer */}
            <div style={{
              background: "#0f0f0f", border: `1px solid ${timerColor}44`,
              borderRadius: "10px", padding: "8px 14px", textAlign: "center",
            }}>
              <p style={{ margin: "0 0 1px", fontSize: "10px", color: "#6b7280", textTransform: "uppercase" }}>Time</p>
              <p style={{ margin: 0, fontSize: "clamp(16px, 3vw, 22px)", fontWeight: "700", color: timerColor, fontVariantNumeric: "tabular-nums" }}>
                {minutes}:{seconds < 10 ? `0${seconds}` : seconds}
              </p>
            </div>

            {/* Mobile Q Panel Toggle */}
            <button onClick={() => setShowSidebar(!showSidebar)}
              className="sidebar-toggle"
              style={{
                background: color.bg, border: `1px solid ${color.border}`,
                color: color.main, padding: "8px 12px",
                borderRadius: "8px", cursor: "pointer", fontSize: "13px",
                fontWeight: "600", display: "none",
              }}
            >
              📋 {answered}/{questions.length}
            </button>
          </div>
        </div>

        {/* Progress Bar */}
        <div style={{ height: "3px", background: "#1a1a1a", borderRadius: "2px", marginBottom: "20px", overflow: "hidden" }}>
          <div style={{
            height: "100%",
            width: `${((current + 1) / questions.length) * 100}%`,
            background: `linear-gradient(90deg, ${color.main}, ${color.main}99)`,
            borderRadius: "2px", transition: "width 0.3s ease",
          }} />
        </div>

        {!submitted ? (
          <>
            {/* Question Card */}
            <div style={{
              background: "#0f0f0f", border: "1px solid #1a1a1a",
              borderRadius: "14px", padding: "20px", marginBottom: "16px",
              opacity: loaded ? 1 : 0, transform: loaded ? "translateY(0)" : "translateY(16px)",
              transition: "all 0.4s ease 0.1s",
            }}>
              <div style={{ display: "flex", gap: "10px", alignItems: "flex-start" }}>
                <span style={{
                  background: color.bg, color: color.main, border: `1px solid ${color.border}`,
                  borderRadius: "8px", padding: "3px 8px", fontSize: "12px", fontWeight: "700", whiteSpace: "nowrap",
                }}>Q{current + 1}</span>
                <p style={{ margin: 0, fontSize: "clamp(14px, 2vw, 16px)", lineHeight: "1.7", color: "#e5e7eb" }}>
                  {questions[current]?.question}
                </p>
              </div>
            </div>

            {/* Options */}
            <div style={{ display: "flex", flexDirection: "column", gap: "8px", marginBottom: "20px" }}>
              {questions[current]?.options?.map((opt, i) => {
                const isSelected = answers[current] === i;
                const isHovered = hoveredOption === i;
                return (
                  <button key={i} onClick={() => selectOption(i)}
                    onMouseEnter={() => setHoveredOption(i)}
                    onMouseLeave={() => setHoveredOption(null)}
                    style={{
                      background: isSelected ? color.bg : isHovered ? "#111" : "#0f0f0f",
                      border: `1px solid ${isSelected ? color.border : isHovered ? "#374151" : "#1a1a1a"}`,
                      borderRadius: "10px", padding: "12px 16px", textAlign: "left",
                      cursor: "pointer", color: isSelected ? color.main : "#d1d5db",
                      fontSize: "clamp(13px, 2vw, 14px)",
                      display: "flex", alignItems: "center", gap: "10px",
                      transition: "all 0.15s ease",
                      transform: isSelected ? "translateX(4px)" : "translateX(0)",
                    }}
                  >
                    <span style={{
                      width: "26px", height: "26px", borderRadius: "50%", flexShrink: 0,
                      border: `2px solid ${isSelected ? color.main : "#374151"}`,
                      display: "flex", alignItems: "center", justifyContent: "center",
                      fontSize: "12px", fontWeight: "700",
                      background: isSelected ? color.bg : "transparent",
                      color: isSelected ? color.main : "#6b7280",
                    }}>
                      {["A", "B", "C", "D"][i]}
                    </span>
                    <span style={{ flex: 1 }}>{opt}</span>
                    {isSelected && <span style={{ color: color.main, marginLeft: "auto" }}>✓</span>}
                  </button>
                );
              })}
            </div>

            {/* Nav Buttons */}
            <div style={{ display: "flex", gap: "8px", alignItems: "center", flexWrap: "wrap" }}>
              <button onClick={() => setCurrent(current - 1)} disabled={current === 0}
                style={{
                  background: "#0f0f0f", border: "1px solid #1f2937",
                  color: current === 0 ? "#374151" : "#9ca3af",
                  padding: "10px 18px", borderRadius: "10px",
                  cursor: current === 0 ? "not-allowed" : "pointer", fontSize: "14px",
                }}
              >← Prev</button>

              <button onClick={() => setCurrent(current + 1)} disabled={current === questions.length - 1}
                style={{
                  background: current === questions.length - 1 ? "#0f0f0f" : color.bg,
                  border: `1px solid ${current === questions.length - 1 ? "#1f2937" : color.border}`,
                  color: current === questions.length - 1 ? "#374151" : color.main,
                  padding: "10px 18px", borderRadius: "10px",
                  cursor: current === questions.length - 1 ? "not-allowed" : "pointer", fontSize: "14px",
                }}
              >Next →</button>

              <button onClick={() => setShowConfirm(true)}
                style={{
                  marginLeft: "auto", background: "#1f0000", border: "1px solid #7f1d1d",
                  color: "#ef4444", padding: "10px 20px", borderRadius: "10px",
                  cursor: "pointer", fontSize: "14px", fontWeight: "600",
                }}
              >Submit</button>
            </div>

            {/* Confirm Modal */}
            {showConfirm && (
              <div style={{ position: "fixed", inset: 0, background: "#000000cc", backdropFilter: "blur(4px)", display: "flex", alignItems: "center", justifyContent: "center", zIndex: 999, padding: "20px" }}>
                <div style={{ background: "#0f0f0f", border: "1px solid #1f2937", borderRadius: "16px", padding: "28px", maxWidth: "340px", width: "100%", textAlign: "center" }}>
                  <div style={{ fontSize: "36px", marginBottom: "12px" }}>⚠️</div>
                  <h3 style={{ margin: "0 0 8px", fontSize: "18px" }}>Submit Test?</h3>
                  <p style={{ color: "#6b7280", fontSize: "14px", margin: "0 0 20px" }}>
                    {answered}/{questions.length} questions answered. Sure karna chahte ho?
                  </p>
                  <div style={{ display: "flex", gap: "10px", justifyContent: "center" }}>
                    <button onClick={() => setShowConfirm(false)}
                      style={{ background: "#1f2937", border: "none", color: "#9ca3af", padding: "10px 20px", borderRadius: "8px", cursor: "pointer" }}>Cancel</button>
                    <button onClick={() => { setSubmitted(true); setShowConfirm(false); }}
                      style={{ background: "#7f1d1d", border: "1px solid #991b1b", color: "#ef4444", padding: "10px 20px", borderRadius: "8px", cursor: "pointer", fontWeight: "600" }}>Yes, Submit</button>
                  </div>
                </div>
              </div>
            )}
          </>
        ) : (
          /* RESULT VIEW */
          <div>
            <div style={{ background: "#0f0f0f", border: `1px solid ${color.border}`, borderRadius: "16px", padding: "24px", marginBottom: "24px", textAlign: "center" }}>
              <p style={{ color: "#6b7280", fontSize: "13px", margin: "0 0 8px", textTransform: "uppercase", letterSpacing: "0.5px" }}>Final Score</p>
              <p style={{ fontSize: "clamp(36px, 8vw, 52px)", fontWeight: "800", margin: "0 0 4px", color: score >= 0 ? color.main : "#ef4444" }}>{score}</p>
              <p style={{ color: "#6b7280", fontSize: "14px", margin: "0 0 20px" }}>out of {maxScore}</p>
              <div style={{ display: "flex", gap: "20px", justifyContent: "center", flexWrap: "wrap" }}>
                {[
                  { label: "Correct", value: questions.filter((q, i) => answers[i] === q.correctAnswer).length, color: "#22c55e" },
                  { label: "Wrong", value: questions.filter((q, i) => answers[i] !== undefined && answers[i] !== q.correctAnswer).length, color: "#ef4444" },
                  { label: "Skipped", value: questions.filter((q, i) => answers[i] === undefined).length, color: "#f59e0b" },
                ].map((s) => (
                  <div key={s.label} style={{ textAlign: "center" }}>
                    <p style={{ color: s.color, fontWeight: "700", fontSize: "20px", margin: "0 0 2px" }}>{s.value}</p>
                    <p style={{ color: "#6b7280", fontSize: "12px", margin: 0 }}>{s.label}</p>
                  </div>
                ))}
              </div>
            </div>

            <h2 style={{ fontSize: "15px", fontWeight: "600", margin: "0 0 14px", color: "#e5e7eb" }}>Answer Review</h2>
            {questions.map((q, i) => {
              const isCorrect = answers[i] === q.correctAnswer;
              const isWrong = answers[i] !== undefined && !isCorrect;
              return (
                <div key={i} style={{
                  background: "#0f0f0f",
                  border: `1px solid ${isCorrect ? "#166534" : isWrong ? "#7f1d1d" : "#1f2937"}`,
                  borderRadius: "12px", padding: "16px", marginBottom: "10px",
                }}>
                  <div style={{ display: "flex", gap: "8px", alignItems: "flex-start", marginBottom: "8px", flexWrap: "wrap" }}>
                    <span style={{
                      background: isCorrect ? "#14532d" : isWrong ? "#1f0000" : "#1f2937",
                      color: isCorrect ? "#22c55e" : isWrong ? "#ef4444" : "#6b7280",
                      padding: "2px 8px", borderRadius: "6px", fontSize: "11px", fontWeight: "700", whiteSpace: "nowrap",
                    }}>
                      {isCorrect ? "✓ Correct" : isWrong ? "✗ Wrong" : "— Skipped"}
                    </span>
                    <p style={{ margin: 0, fontSize: "13px", color: "#e5e7eb", lineHeight: "1.6" }}>Q{i + 1}. {q.question}</p>
                  </div>
                  <p style={{ margin: "0 0 4px", fontSize: "13px", color: "#22c55e" }}>✓ Correct: {q.options[q.correctAnswer]}</p>
                  {isWrong && <p style={{ margin: "0 0 4px", fontSize: "13px", color: "#ef4444" }}>✗ Yours: {q.options[answers[i]]}</p>}
                  {q.explanation && (
                    <p style={{ margin: "8px 0 0", fontSize: "13px", color: "#6b7280", borderTop: "1px solid #1a1a1a", paddingTop: "8px" }}>
                      💡 {q.explanation}
                    </p>
                  )}
                </div>
              );
            })}

            <div style={{ display: "flex", gap: "10px", marginTop: "16px", flexWrap: "wrap" }}>
              <button onClick={() => navigate("/dashboard")}
                style={{ background: "#0f0f0f", border: "1px solid #1f2937", color: "#9ca3af", padding: "11px 20px", borderRadius: "10px", cursor: "pointer", fontSize: "14px" }}>
                ← Dashboard
              </button>
              <button onClick={() => { setAnswers({}); setCurrent(0); setTime(600); setSubmitted(false); }}
                style={{ background: color.bg, border: `1px solid ${color.border}`, color: color.main, padding: "11px 20px", borderRadius: "10px", cursor: "pointer", fontSize: "14px", fontWeight: "600" }}>
                Retry ↺
              </button>
            </div>
          </div>
        )}
      </div>

      {/* RIGHT SIDEBAR — Desktop fixed, Mobile slide-in */}
      <div className="question-panel" style={{
        width: "200px", background: "#0a0a0a",
        borderLeft: "1px solid #1a1a1a",
        padding: "24px 14px",
        position: "sticky", top: 0, height: "100vh", overflowY: "auto",
      }}>
        <SidebarPanel
          questions={questions} answers={answers} current={current}
          setCurrent={setCurrent} answered={answered} color={color}
        />
      </div>

      {/* Mobile Slide-in Panel */}
      <div className="mobile-panel" style={{
        position: "fixed", top: 0, right: showSidebar ? 0 : "-220px",
        width: "210px", height: "100vh",
        background: "#0a0a0a", borderLeft: "1px solid #1a1a1a",
        padding: "24px 14px", overflowY: "auto",
        zIndex: 101, transition: "right 0.3s ease",
      }}>
        <button onClick={() => setShowSidebar(false)}
          style={{ background: "transparent", border: "none", color: "#6b7280", cursor: "pointer", fontSize: "18px", marginBottom: "16px" }}>✕</button>
        <SidebarPanel
          questions={questions} answers={answers} current={current}
          setCurrent={(i) => { setCurrent(i); setShowSidebar(false); }}
          answered={answered} color={color}
        />
      </div>

      <style>{`
        * { box-sizing: border-box; }
        ::-webkit-scrollbar { width: 4px; }
        ::-webkit-scrollbar-track { background: #000; }
        ::-webkit-scrollbar-thumb { background: #1f2937; border-radius: 2px; }

        @media (max-width: 768px) {
          .question-panel { display: none !important; }
          .sidebar-toggle { display: block !important; }
          .main-area { padding: 16px !important; }
        }
        @media (min-width: 769px) {
          .mobile-panel { display: none !important; }
          .sidebar-toggle { display: none !important; }
          .main-area { padding: 36px 48px !important; }
        }
      `}</style>
    </div>
  );
}

function SidebarPanel({ questions, answers, current, setCurrent, answered, color }) {
  return (
    <>
      <h2 style={{ fontSize: "12px", fontWeight: "600", color: "#6b7280", textTransform: "uppercase", letterSpacing: "0.5px", margin: "0 0 14px" }}>Questions</h2>
      <div style={{ display: "flex", gap: "6px", marginBottom: "14px" }}>
        <div style={{ flex: 1, background: "#14532d", borderRadius: "8px", padding: "8px", textAlign: "center" }}>
          <p style={{ margin: 0, color: "#22c55e", fontWeight: "700", fontSize: "15px" }}>{answered}</p>
          <p style={{ margin: 0, color: "#6b7280", fontSize: "10px" }}>Done</p>
        </div>
        <div style={{ flex: 1, background: "#1f2937", borderRadius: "8px", padding: "8px", textAlign: "center" }}>
          <p style={{ margin: 0, color: "#9ca3af", fontWeight: "700", fontSize: "15px" }}>{questions.length - answered}</p>
          <p style={{ margin: 0, color: "#6b7280", fontSize: "10px" }}>Left</p>
        </div>
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "5px" }}>
        {questions.map((q, i) => {
          const isAnswered = answers[i] !== undefined;
          const isCurrent = current === i;
          return (
            <button key={i} onClick={() => setCurrent(i)}
              style={{
                aspectRatio: "1", borderRadius: "7px",
                border: isCurrent ? `2px solid ${color.main}` : "1px solid transparent",
                background: isAnswered ? color.bg : "#1f2937",
                color: isAnswered ? color.main : "#6b7280",
                fontSize: "11px", fontWeight: "600", cursor: "pointer",
                transition: "all 0.15s ease",
              }}
            >{i + 1}</button>
          );
        })}
      </div>
      <div style={{ marginTop: "16px", display: "flex", flexDirection: "column", gap: "6px" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
          <div style={{ width: "10px", height: "10px", background: color.bg, borderRadius: "3px" }} />
          <span style={{ fontSize: "11px", color: "#6b7280" }}>Answered</span>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
          <div style={{ width: "10px", height: "10px", background: "#1f2937", borderRadius: "3px" }} />
          <span style={{ fontSize: "11px", color: "#6b7280" }}>Not Answered</span>
        </div>
      </div>
    </>
  );
}

export default Practice;