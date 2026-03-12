import { Link, useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";

const NAV_LINKS = [
  { label: "Home", path: "/" },
  { label: "Login", path: "/login" },
  { label: "Signup", path: "/signup" },
  { label: "Dashboard", path: "/dashboard" },
];

function Navbar() {
  const location = useLocation();
  const navigate = useNavigate();
  const [hovered, setHovered] = useState(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const isLoggedIn = !!localStorage.getItem("token");

  const logout = () => {
    localStorage.removeItem("token");
    navigate("/login");
    setMenuOpen(false);
  };

  const visibleLinks = NAV_LINKS.filter(link => {
    if (isLoggedIn && (link.path === "/login" || link.path === "/signup")) return false;
    return true;
  });

  return (
    <>
      <nav style={{
        position: "sticky", top: 0, zIndex: 100,
        background: "rgba(0,0,0,0.85)",
        backdropFilter: "blur(16px)",
        borderBottom: "1px solid #1a1a1a",
        fontFamily: "'Segoe UI', system-ui, sans-serif",
      }}>
        <div style={{
          maxWidth: "1200px", margin: "0 auto",
          padding: "0 20px", height: "64px",
          display: "flex", alignItems: "center", justifyContent: "space-between",
        }}>

          {/* Logo */}
          <Link to="/" style={{ textDecoration: "none", display: "flex", alignItems: "center", gap: "10px" }}>
            <div style={{
              width: "32px", height: "32px",
              background: "linear-gradient(135deg, #22c55e, #16a34a)",
              borderRadius: "8px",
              display: "flex", alignItems: "center", justifyContent: "center",
              fontWeight: "800", fontSize: "16px", color: "#000",
            }}>N</div>
            <span style={{ fontSize: "18px", fontWeight: "700", color: "#22c55e", letterSpacing: "-0.5px" }}>
              NEET Vision
            </span>
          </Link>

          {/* Desktop Links */}
          <div style={{ display: "flex", alignItems: "center", gap: "4px" }} className="desktop-nav">
            {visibleLinks.map((link) => {
              const isActive = location.pathname === link.path;
              return (
                <Link key={link.label} to={link.path}
                  onMouseEnter={() => setHovered(link.label)}
                  onMouseLeave={() => setHovered(null)}
                  style={{
                    textDecoration: "none", padding: "8px 16px", borderRadius: "8px",
                    fontSize: "14px", fontWeight: isActive ? "600" : "400",
                    color: isActive ? "#22c55e" : hovered === link.label ? "#e5e7eb" : "#6b7280",
                    background: isActive ? "#14532d22" : hovered === link.label ? "#ffffff08" : "transparent",
                    border: isActive ? "1px solid #14532d" : "1px solid transparent",
                    transition: "all 0.15s ease",
                  }}
                >{link.label}</Link>
              );
            })}

            {isLoggedIn && (
              <>
                <Link to="/ai-doubt"
                  style={{
                    textDecoration: "none", padding: "8px 16px", borderRadius: "8px",
                    fontSize: "14px", fontWeight: "600",
                    color: "#22c55e", background: "#14532d44",
                    border: "1px solid #166534", marginLeft: "4px",
                    transition: "all 0.15s ease",
                  }}
                >🤖 AI Solver</Link>
                <button onClick={logout}
                  style={{
                    padding: "8px 16px", borderRadius: "8px", fontSize: "14px",
                    color: "#ef4444", background: "transparent",
                    border: "1px solid transparent", cursor: "pointer", marginLeft: "4px",
                  }}
                >Logout</button>
              </>
            )}

            {!isLoggedIn && (
              <Link to="/signup" style={{
                textDecoration: "none", padding: "8px 20px", borderRadius: "8px",
                fontSize: "14px", fontWeight: "600", color: "#000",
                background: "linear-gradient(135deg, #22c55e, #16a34a)", marginLeft: "8px",
              }}>Get Started</Link>
            )}
          </div>

          {/* Hamburger */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="mobile-menu-btn"
            style={{
              background: "transparent", border: "1px solid #1f1f1f",
              borderRadius: "8px", padding: "8px 10px",
              color: "#9ca3af", cursor: "pointer", fontSize: "18px",
              display: "none",
            }}
          >{menuOpen ? "✕" : "☰"}</button>
        </div>

        {/* Mobile Menu */}
        {menuOpen && (
          <div style={{
            background: "#0a0a0a", borderTop: "1px solid #1a1a1a",
            padding: "16px 20px", display: "flex", flexDirection: "column", gap: "8px",
          }}>
            {visibleLinks.map((link) => (
              <Link key={link.label} to={link.path}
                onClick={() => setMenuOpen(false)}
                style={{
                  textDecoration: "none", padding: "12px 16px", borderRadius: "8px",
                  fontSize: "15px", color: location.pathname === link.path ? "#22c55e" : "#9ca3af",
                  background: location.pathname === link.path ? "#14532d22" : "transparent",
                  border: location.pathname === link.path ? "1px solid #14532d" : "1px solid transparent",
                }}
              >{link.label}</Link>
            ))}
            {isLoggedIn && (
              <>
                <Link to="/ai-doubt" onClick={() => setMenuOpen(false)}
                  style={{
                    textDecoration: "none", padding: "12px 16px", borderRadius: "8px",
                    fontSize: "15px", color: "#22c55e", background: "#14532d44",
                    border: "1px solid #166534",
                  }}
                >🤖 AI Solver</Link>
                <button onClick={logout}
                  style={{
                    padding: "12px 16px", borderRadius: "8px", fontSize: "15px",
                    color: "#ef4444", background: "transparent",
                    border: "1px solid #1f1f1f", cursor: "pointer", textAlign: "left",
                  }}
                >Logout</button>
              </>
            )}
            {!isLoggedIn && (
              <Link to="/signup" onClick={() => setMenuOpen(false)}
                style={{
                  textDecoration: "none", padding: "12px 16px", borderRadius: "8px",
                  fontSize: "15px", fontWeight: "600", color: "#000",
                  background: "linear-gradient(135deg, #22c55e, #16a34a)", textAlign: "center",
                }}
              >Get Started</Link>
            )}
          </div>
        )}
      </nav>

      <style>{`
        @media (max-width: 768px) {
          .desktop-nav { display: none !important; }
          .mobile-menu-btn { display: block !important; }
        }
      `}</style>
    </>
  );
}

export default Navbar;