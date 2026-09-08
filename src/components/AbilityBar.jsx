import { abilities } from "../data/resume";

export default function AbilityBar() {
  return (
    <section style={{ marginTop: "20px" }}>
      <div
        style={{
          fontFamily: "var(--font-mono)",
          fontSize: "11px",
          color: "var(--text-dim)",
          marginBottom: "10px",
        }}
      >
        ability bar
      </div>
      <div style={{ display: "flex", flexWrap: "wrap", gap: "8px" }}>
        {abilities.map((skill) => (
          <span
            key={skill}
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: "12px",
              color: "var(--teal)",
              border: "1px solid var(--border)",
              borderRadius: "4px",
              padding: "4px 9px",
            }}
          >
            {skill}
          </span>
        ))}
      </div>
    </section>
  );
}
