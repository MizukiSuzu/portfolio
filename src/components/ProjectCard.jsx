import { useState } from "react";

const STATUS_COLOR = {
  live: "var(--green)",
  active: "var(--amber)",
  shipped: "var(--text-dim)",
};

export default function ProjectCard({ project }) {
  const [open, setOpen] = useState(false);
  const accent = STATUS_COLOR[project.status] || "var(--teal)";

  return (
    <div
      style={{
        background: "var(--panel)",
        borderLeft: `2px solid ${accent}`,
        borderRadius: "0 6px 6px 0",
        marginBottom: "10px",
      }}
    >
      <button
        onClick={() => setOpen(!open)}
        aria-expanded={open}
        style={{
          all: "unset",
          cursor: "pointer",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          width: "100%",
          padding: "12px 14px",
          boxSizing: "border-box",
        }}
      >
        <span
          style={{
            fontFamily: "var(--font-mono)",
            fontSize: "14px",
            color: "var(--text)",
          }}
        >
          {project.name}
        </span>
        <span style={{ display: "flex", alignItems: "center", gap: "12px" }}>
          <span
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: "11px",
              color: accent,
            }}
          >
            {project.status}
          </span>
          <span
            style={{
              color: "var(--text-dim)",
              fontFamily: "var(--font-mono)",
              fontSize: "12px",
              transform: open ? "rotate(90deg)" : "none",
              display: "inline-block",
              transition: "transform 150ms ease",
            }}
          >
            &gt;
          </span>
        </span>
      </button>

      {open && (
        <div style={{ padding: "0 14px 16px" }}>
          <p
            style={{
              fontSize: "14px",
              lineHeight: 1.6,
              color: "var(--text)",
              margin: "0 0 10px",
            }}
          >
            {project.summary}
          </p>

          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              gap: "6px",
              marginBottom: "12px",
            }}
          >
            {project.stack.map((tech) => (
              <span
                key={tech}
                style={{
                  fontFamily: "var(--font-mono)",
                  fontSize: "11px",
                  color: "var(--teal)",
                  border: "1px solid var(--border)",
                  borderRadius: "4px",
                  padding: "2px 7px",
                }}
              >
                {tech}
              </span>
            ))}
          </div>

          <ul style={{ margin: 0, paddingLeft: "18px" }}>
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

          <div
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: "11px",
              color: "var(--text-dim)",
              marginTop: "10px",
            }}
          >
            {project.role} · {project.period}
          </div>
        </div>
      )}
    </div>
  );
}
