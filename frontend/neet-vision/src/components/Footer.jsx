import { Link } from "react-router-dom";
import { useState } from "react";

const LINKS = {
  Platform: [
    { label: "Dashboard", path: "/dashboard" },
    { label: "Practice", path: "/practice/physics" },
    { label: "AI Doubt Solver", path: "/ai-doubt" },
  ],
  Subjects: [
    { label: "Physics", path: "/practice/physics" },
    { label: "Chemistry", path: "/practice/chemistry" },
    { label: "Biology", path: "/practice/biology" },
  ],
  Company: [
    { label: "About Us", path: null },
    { label: "Blog", path: null },
    { label: "Contact", path: null },
  ],
};

function Footer() {
  const [hovered, setHovered] = useState(null);
  const [emailFocused, setEmailFocused] = useState(false);

  return (
    <footer style={{ background: "#000", borderTop: "1px solid #1a1a1a", fontFamily: "'Segoe UI', system-ui, sans-serif", color: "#fff" }}>

      {/* Main */}
      <div className="footer-grid" style={{ maxWidth: "1100px", margin: "0 auto", padding: "48px 20px 32px", display: "grid", gridTemplateColumns: "1fr", gap: "36px" }}>

        {/* Brand */}
        <div>
          <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "14px" }}>
            <div style={{ width: "36px", height: "36px", background: "linear-gradient(135deg, #22c55e, #16a34a)", borderRadius: "10px", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: "800", fontSize: "18px", color: "#000" }}>N</div>
            <span style={{ fontSize: "18px", fontWeight: "700", color: "#22c55e" }}>NEET Vision</span>
          </div>
          <p style={{ color: "#6b7280", fontSize: "14px", lineHeight: "1.7", margin: "0 0 20px", maxWidth: "280px" }}>
            India's smartest NEET preparation platform. Learn visually, practice smart, crack NEET.
          </p>
          <p style={{ fontSize: "13px", color: "#9ca3af", marginBottom: "8px", fontWeight: "500" }}>Get weekly NEET tips</p>
          <div style={{ display: "flex", background: "#0f0f0f", border: `1px solid ${emailFocused ? "#22c55e44" : "#1a1a1a"}`, borderRadius: "10px", overflow: "hidden", transition: "border-color 0.2s", maxWidth: "300px" }}>
            <input type="email" placeholder="your@email.com"
              onFocus={() => setEmailFocused(true)} onBlur={() => setEmailFocused(false)}
              style={{ flex: 1, background: "transparent", border: "none", outline: "none", padding: "10px 14px", fontSize: "13px", color: "#e5e7eb" }}
            />
            <button style={{ background: "linear-gradient(135deg, #22c55e, #16a34a)", border: "none", padding: "10px 16px", color: "#000", fontWeight: "700", fontSize: "13px", cursor: "pointer" }}>→</button>
          </div>
        </div>

        {/* Links */}
        <div className="footer-links" style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "24px" }}>
          {Object.entries(LINKS).map(([section, links]) => (
            <div key={section}>
              <h4 style={{ fontSize: "12px", fontWeight: "600", color: "#e5e7eb", textTransform: "uppercase", letterSpacing: "0.8px", margin: "0 0 16px" }}>{section}</h4>
              <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
                {links.map((link) => (
                  link.path ? (
                    <Link key={link.label} to={link.path}
                      onMouseEnter={() => setHovered(link.label)}
                      onMouseLeave={() => setHovered(null)}
                      style={{ textDecoration: "none", fontSize: "14px", color: hovered === link.label ? "#22c55e" : "#6b7280", transition: "color 0.15s ease" }}
                    >{link.label}</Link>
                  ) : (
                    <span key={link.label} style={{ fontSize: "14px", color: "#4b5563" }}>{link.label}</span>
                  )
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom */}
      <div style={{ borderTop: "1px solid #1a1a1a", padding: "16px 20px" }}>
        <div style={{ maxWidth: "1100px", margin: "0 auto", display: "flex", flexWrap: "wrap", justifyContent: "space-between", alignItems: "center", gap: "12px" }}>
          <p style={{ fontSize: "13px", color: "#4b5563", margin: 0 }}>© 2026 NEET Vision. Built for NEET Aspirants 🇮🇳</p>
          <div style={{ display: "flex", gap: "20px" }}>
            {["Privacy Policy", "Terms of Use"].map((item) => (
              <span key={item}
                onMouseEnter={() => setHovered(item)} onMouseLeave={() => setHovered(null)}
                style={{ fontSize: "13px", color: hovered === item ? "#22c55e" : "#4b5563", cursor: "pointer", transition: "color 0.15s ease" }}
              >{item}</span>
            ))}
          </div>
        </div>
      </div>

      <style>{`
        @media (min-width: 768px) {
          .footer-grid { grid-template-columns: 2fr 2fr !important; }
          .stats-bar { grid-template-columns: repeat(4, 1fr) !important; }
        }
        @media (min-width: 1024px) {
          .footer-grid { grid-template-columns: 2fr 3fr !important; }
        }
      `}</style>
    </footer>
  );
}

export default Footer;