import { useEffect } from "react";
import { PROJ_COLOR, STATUS_COLOR } from "../data/statusColor";

export default function ProjectModal({ project, onClose }) {
  const accent = PROJ_COLOR[project.id] || "var(--teal)";
  const statusColor = STATUS_COLOR[project.status] || accent;

  useEffect(() => {
    const onKey = (e) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [onClose]);

  return (
    <div
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
      style={{
        position: "fixed",
        inset: 0,
        background: "rgba(8,10,15,0.72)",
        backdropFilter: "blur(3px)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "2rem",
        zIndex: 100,
      }}
    >
      <div
        style={{
          background: "var(--panel)",
          border: "1px solid var(--border)",
          borderRadius: "12px",
          maxWidth: "460px",
          width: "100%",
          maxHeight: "85vh",
          overflowY: "auto",
          boxShadow: "0 30px 60px rgba(0,0,0,0.5)",
        }}
      >
        <div
          style={{
            height: "110px",
            background: "linear-gradient(135deg, " + accent + ", transparent)",
            backgroundColor: "rgba(255,255,255,0.03)",
            position: "relative",
            display: "flex",
            alignItems: "flex-end",
            padding: "1.1rem 1.4rem",
          }}
        >
          {project.featured && (
            <span
              style={{
                position: "absolute",
                top: "0.9rem",
                right: "3.2rem",
                fontFamily: "var(--font-sans)",
                fontSize: "0.7rem",
                background: accent,
                color: "#0a0e12",
                padding: "0.2rem 0.55rem",
                borderRadius: "4px",
                fontWeight: 600,
              }}
            >
              Featured
            </span>
          )}
          <button
            onClick={onClose}
            aria-label="Close"
            style={{
              all: "unset",
              position: "absolute",
              top: "0.8rem",
              right: "0.8rem",
              width: "32px",
              height: "32px",
              borderRadius: "50%",
              background: "rgba(10,14,18,0.55)",
              border: "1px solid var(--border)",
              color: "var(--text)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              cursor: "pointer",
              boxSizing: "border-box",
            }}
          >
            <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="18" y1="6" x2="6" y2="18"></line>
              <line x1="6" y1="6" x2="18" y2="18"></line>
            </svg>
          </button>
          <p
            style={{
              fontFamily: "'Fraunces', serif",
              fontWeight: 500,
              fontSize: "1.5rem",
              color: "var(--text)",
              margin: 0,
            }}
          >
            {project.name}
          </p>
        </div>

        <div style={{ padding: "1.3rem 1.4rem 1.5rem" }}>
          <p
            style={{
              fontFamily: "'Work Sans', sans-serif",
              fontSize: "0.8rem",
              color: statusColor,
              margin: "0 0 0.9rem",
              fontWeight: 500,
              textTransform: "capitalize",
            }}
          >
            {project.status} &middot; {project.role} &middot; {project.period}
          </p>

          <p
            style={{
              fontFamily: "'Work Sans', sans-serif",
              fontSize: "0.95rem",
              lineHeight: 1.6,
              color: "var(--text)",
              margin: "0 0 1.2rem",
            }}
          >
            {project.summary}
          </p>

          <p
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: "0.78rem",
              textTransform: "uppercase",
              letterSpacing: "0.04em",
              color: "var(--text-dim)",
              margin: "0 0 0.7rem",
            }}
          >
            Highlights
          </p>
          <ul style={{ listStyle: "none", margin: "0 0 1.3rem", padding: 0, display: "flex", flexDirection: "column", gap: "0.55rem" }}>
            {project.details.map((d, i) => (
              <li key={i} style={{ fontFamily: "'Work Sans', sans-serif", fontSize: "0.9rem", lineHeight: 1.5, color: "var(--text)", paddingLeft: "1rem", position: "relative" }}>
                <span
                  style={{
                    position: "absolute",
                    left: 0,
                    top: "0.55em",
                    width: "5px",
                    height: "5px",
                    borderRadius: "50%",
                    background: accent,
                  }}
                />
                {d}
              </li>
            ))}
          </ul>

          <p
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: "0.78rem",
              textTransform: "uppercase",
              letterSpacing: "0.04em",
              color: "var(--text-dim)",
              margin: "0 0 0.7rem",
            }}
          >
            Stack
          </p>
          <div style={{ display: "flex", flexWrap: "wrap", gap: "0.4rem" }}>
            {project.stack.map((t) => (
              <span
                key={t}
                style={{
                  fontFamily: "'Work Sans', sans-serif",
                  fontSize: "0.78rem",
                  color: "var(--text-dim)",
                  background: "rgba(255,255,255,0.05)",
                  padding: "0.25rem 0.55rem",
                  borderRadius: "4px",
                }}
              >
                {t}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
