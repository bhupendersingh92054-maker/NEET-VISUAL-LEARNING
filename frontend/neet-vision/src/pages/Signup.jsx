import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";

function Signup() {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const [focused, setFocused] = useState(null);
  const [loaded, setLoaded] = useState(false);
  const [showPass, setShowPass] = useState(false);

  useEffect(() => {
    setTimeout(() => setLoaded(true), 100);
  }, []);

  const passwordStrength = () => {
    if (!password) return null;
    if (password.length < 6) return { label: "Weak", color: "#ef4444", width: "33%" };
    if (password.length < 10) return { label: "Medium", color: "#f59e0b", width: "66%" };
    return { label: "Strong", color: "#22c55e", width: "100%" };
  };

  const strength = passwordStrength();

  const handleSignup = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      await axios.post("http://localhost:5000/api/users/register", { name, email, password });
      setSuccess(true);
      setTimeout(() => navigate("/login"), 2000);
    } catch (err) {
      setError(err.response?.data?.message || "Signup failed. Try again.");
    } finally {
      setLoading(false);
    }
  };

  const inputStyle = (field) => ({
    width: "100%",
    background: "#111",
    border: `1px solid ${focused === field ? "#22c55e44" : "#1f1f1f"}`,
    borderRadius: "10px",
    padding: "12px 14px",
    fontSize: "14px",
    color: "#fff",
    outline: "none",
    boxSizing: "border-box",
    transition: "border-color 0.2s, box-shadow 0.2s",
    boxShadow: focused === field ? "0 0 0 3px rgba(34,197,94,0.08)" : "none",
  });

  return (
    <div style={{
      minHeight: "100vh",
      background: "#000",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      fontFamily: "'Segoe UI', system-ui, sans-serif",
      position: "relative",
      overflow: "hidden",
      padding: "24px",
    }}>

      {/* Background glows */}
      <div style={{
        position: "absolute", top: "-200px", left: "-200px",
        width: "500px", height: "500px",
        background: "radial-gradient(circle, rgba(34,197,94,0.12), transparent 70%)",
        borderRadius: "50%",
        animation: "pulse 4s ease-in-out infinite",
      }} />
      <div style={{
        position: "absolute", bottom: "-200px", right: "-200px",
        width: "500px", height: "500px",
        background: "radial-gradient(circle, rgba(59,130,246,0.08), transparent 70%)",
        borderRadius: "50%",
        animation: "pulse 4s ease-in-out infinite 2s",
      }} />

      {/* Grid */}
      <div style={{
        position: "absolute", inset: 0,
        backgroundImage: `linear-gradient(rgba(255,255,255,0.02) 1px, transparent 1px),
                          linear-gradient(90deg, rgba(255,255,255,0.02) 1px, transparent 1px)`,
        backgroundSize: "48px 48px",
        pointerEvents: "none",
      }} />

      {/* Card */}
      <div style={{
        position: "relative", zIndex: 10,
        background: "#0a0a0a",
        border: "1px solid #1a1a1a",
        borderRadius: "20px",
        padding: "40px",
        width: "100%",
        maxWidth: "420px",
        boxShadow: "0 24px 64px rgba(0,0,0,0.6)",
        opacity: loaded ? 1 : 0,
        transform: loaded ? "translateY(0) scale(1)" : "translateY(20px) scale(0.98)",
        transition: "all 0.5s ease",
      }}>

        {/* Success State */}
        {success ? (
          <div style={{ textAlign: "center", padding: "20px 0" }}>
            <div style={{
              width: "64px", height: "64px",
              background: "#14532d",
              borderRadius: "50%",
              display: "flex", alignItems: "center", justifyContent: "center",
              fontSize: "28px",
              margin: "0 auto 20px",
              border: "2px solid #22c55e",
            }}>✓</div>
            <h2 style={{ color: "#22c55e", fontSize: "22px", fontWeight: "700", margin: "0 0 8px" }}>
              Account Created!
            </h2>
            <p style={{ color: "#6b7280", fontSize: "14px", margin: 0 }}>
              Redirecting to login...
            </p>
          </div>
        ) : (
          <>
            {/* Logo */}
            <div style={{ textAlign: "center", marginBottom: "28px" }}>
              <div style={{
                width: "48px", height: "48px",
                background: "linear-gradient(135deg, #22c55e, #16a34a)",
                borderRadius: "14px",
                display: "flex", alignItems: "center", justifyContent: "center",
                fontWeight: "800", fontSize: "22px", color: "#000",
                margin: "0 auto 16px",
              }}>N</div>
              <h1 style={{ fontSize: "24px", fontWeight: "700", color: "#fff", margin: "0 0 6px", letterSpacing: "-0.5px" }}>
                Create Account
              </h1>
              <p style={{ fontSize: "14px", color: "#6b7280", margin: 0 }}>
                Join <span style={{ color: "#22c55e", fontWeight: "600" }}>NEET Vision</span> for free
              </p>
            </div>

            {/* Error */}
            {error && (
              <div style={{
                background: "#1f0000",
                border: "1px solid #7f1d1d",
                borderRadius: "10px",
                padding: "10px 14px",
                marginBottom: "16px",
                fontSize: "13px",
                color: "#f87171",
                display: "flex", alignItems: "center", gap: "8px",
              }}>
                ⚠️ {error}
              </div>
            )}

            {/* Form */}
            <div style={{ display: "flex", flexDirection: "column", gap: "14px" }}>

              {/* Name */}
              <div>
                <label style={{ fontSize: "12px", color: "#9ca3af", fontWeight: "500", display: "block", marginBottom: "6px" }}>
                  Full Name
                </label>
                <input
                  type="text"
                  placeholder="Rahul Sharma"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  onFocus={() => setFocused("name")}
                  onBlur={() => setFocused(null)}
                  style={inputStyle("name")}
                />
              </div>

              {/* Email */}
              <div>
                <label style={{ fontSize: "12px", color: "#9ca3af", fontWeight: "500", display: "block", marginBottom: "6px" }}>
                  Email Address
                </label>
                <input
                  type="email"
                  placeholder="you@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  onFocus={() => setFocused("email")}
                  onBlur={() => setFocused(null)}
                  style={inputStyle("email")}
                />
              </div>

              {/* Password */}
              <div>
                <label style={{ fontSize: "12px", color: "#9ca3af", fontWeight: "500", display: "block", marginBottom: "6px" }}>
                  Password
                </label>
                <div style={{ position: "relative" }}>
                  <input
                    type={showPass ? "text" : "password"}
                    placeholder="Min. 6 characters"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    onFocus={() => setFocused("password")}
                    onBlur={() => setFocused(null)}
                    style={{ ...inputStyle("password"), paddingRight: "44px" }}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPass(!showPass)}
                    style={{
                      position: "absolute", right: "12px", top: "50%",
                      transform: "translateY(-50%)",
                      background: "none", border: "none",
                      color: "#4b5563", cursor: "pointer", fontSize: "14px", padding: 0,
                    }}
                  >
                    {showPass ? "🙈" : "👁️"}
                  </button>
                </div>

                {/* Password strength bar */}
                {password && (
                  <div style={{ marginTop: "8px" }}>
                    <div style={{ height: "3px", background: "#1a1a1a", borderRadius: "2px", overflow: "hidden" }}>
                      <div style={{
                        height: "100%",
                        width: strength.width,
                        background: strength.color,
                        borderRadius: "2px",
                        transition: "all 0.3s ease",
                      }} />
                    </div>
                    <p style={{ fontSize: "11px", color: strength.color, margin: "4px 0 0", fontWeight: "500" }}>
                      {strength.label} password
                    </p>
                  </div>
                )}
              </div>

              {/* Submit */}
              <button
                onClick={handleSignup}
                disabled={loading || !name || !email || !password}
                style={{
                  background: loading || !name || !email || !password
                    ? "#1a1a1a"
                    : "linear-gradient(135deg, #22c55e, #16a34a)",
                  color: loading || !name || !email || !password ? "#4b5563" : "#000",
                  border: "none",
                  borderRadius: "10px",
                  padding: "13px",
                  fontSize: "15px",
                  fontWeight: "700",
                  cursor: loading || !name || !email || !password ? "not-allowed" : "pointer",
                  marginTop: "4px",
                  transition: "all 0.2s ease",
                  display: "flex", alignItems: "center", justifyContent: "center", gap: "8px",
                }}
              >
                {loading ? (
                  <>
                    <div style={{
                      width: "16px", height: "16px",
                      border: "2px solid #4b5563",
                      borderTop: "2px solid #22c55e",
                      borderRadius: "50%",
                      animation: "spin 0.8s linear infinite",
                    }} />
                    Creating account...
                  </>
                ) : "Create Account →"}
              </button>
            </div>

            {/* Divider */}
            <div style={{ display: "flex", alignItems: "center", gap: "12px", margin: "24px 0" }}>
              <div style={{ flex: 1, height: "1px", background: "#1a1a1a" }} />
              <span style={{ fontSize: "12px", color: "#4b5563" }}>Already registered?</span>
              <div style={{ flex: 1, height: "1px", background: "#1a1a1a" }} />
            </div>

            {/* Login link */}
            <Link
              to="/login"
              style={{
                display: "block",
                textAlign: "center",
                textDecoration: "none",
                background: "transparent",
                border: "1px solid #1f1f1f",
                borderRadius: "10px",
                padding: "12px",
                fontSize: "14px",
                color: "#9ca3af",
                fontWeight: "500",
                transition: "all 0.2s",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = "#22c55e44";
                e.currentTarget.style.color = "#22c55e";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = "#1f1f1f";
                e.currentTarget.style.color = "#9ca3af";
              }}
            >
              Login to existing account →
            </Link>
          </>
        )}
      </div>

      <style>{`
        @keyframes pulse {
          0%, 100% { opacity: 0.6; transform: scale(1); }
          50% { opacity: 1; transform: scale(1.05); }
        }
        @keyframes spin {
          to { transform: rotate(360deg); }
        }
        input::placeholder { color: #4b5563; }
      `}</style>
    </div>
  );
}

export default Signup;