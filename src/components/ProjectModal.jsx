import { useEffect } from "react";
import { STATUS_COLOR } from "../data/statusColor";


export default function ProjectModal({ project, onClose }) {
  const accent = STATUS_COLOR[project.status] || "var(--teal)";

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
        background: "rgba(10,14,18,0.75)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "20px",
        zIndex: 100,
      }}
    >
      <div
        style={{
          background: "var(--panel)",
          border: "1px solid var(--border)",
          borderLeft: `2px solid ${accent}`,
          borderRadius: "0 8px 8px 0",
          maxWidth: "440px",
          width: "100%",
          maxHeight: "82vh",
          overflowY: "auto",
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-start",
            padding: "16px 16px 0 16px",
          }}
        >
          <span
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: "17px",
              color: "var(--text)",
            }}
          >
            {project.name}
          </span>
          <button
            onClick={onClose}
            aria-label="Close"
            style={{
              all: "unset",
              cursor: "pointer",
              fontFamily: "var(--font-mono)",
              fontSize: "16px",
              color: "var(--text-dim)",
              lineHeight: 1,
              padding: "2px 4px",
            }}
          >
            &times;
          </button>
        </div>

        <div style={{ padding: "10px 16px 20px" }}>
          <div
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: "11px",
              color: accent,
              marginBottom: "10px",
            }}
          >
            {project.status} &middot; {project.role} &middot; {project.period}
          </div>

          <p
            style={{
              fontSize: "14px",
              lineHeight: 1.6,
              color: "var(--text)",
              margin: "0 0 14px",
            }}
          >
            {project.summary}
          </p>

          <p
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: "11px",
              color: "var(--text-dim)",
              margin: "0 0 8px",
              letterSpacing: "0.02em",
            }}
          >
            highlights
          </p>
          <ul style={{ margin: "0 0 16px", paddingLeft: "18px" }}>
            {project.details.map((d, i) => (
              <li
                key={i}
                style={{
                  fontSize: "13px",
                  lineHeight: 1.6,
                  color: "var(--text-dim)",
                  marginBottom: "6px",
                }}
              >
                {d}
              </li>
            ))}
          </ul>

          <p
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: "11px",
              color: "var(--text-dim)",
              margin: "0 0 8px",
              letterSpacing: "0.02em",
            }}
          >
            stack
          </p>
          <div style={{ display: "flex", flexWrap: "wrap", gap: "6px" }}>
            {project.stack.map((t) => (
              <span
                key={t}
                style={{
                  fontFamily: "var(--font-mono)",
                  fontSize: "11px",
                  color: "var(--teal)",
                  border: "1px solid var(--border)",
                  borderRadius: "4px",
                  padding: "2px 7px",
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
