import { stats, education } from "../data/resume";

export default function StatPanel() {
  return (
    <section
      style={{
        background: "var(--panel)",
        border: "1px solid var(--border)",
        borderRadius: "6px",
        padding: "16px 18px",
        marginTop: "32px",
      }}
    >
      <div
        style={{
          fontFamily: "var(--font-mono)",
          fontSize: "11px",
          color: "var(--text-dim)",
          marginBottom: "10px",
          letterSpacing: "0.02em",
        }}
      >
        rank
      </div>
      <div
        style={{
          fontFamily: "var(--font-mono)",
          fontSize: "14px",
          color: "var(--amber)",
          marginBottom: "8px",
        }}
      >
        {stats.rank} · {education.school}
      </div>
      {stats.achievements.map((a) => (
        <div
          key={a}
          style={{
            fontFamily: "var(--font-mono)",
            fontSize: "13px",
            color: "var(--amber)",
            opacity: 0.85,
            marginBottom: "2px",
          }}
        >
          {a}
        </div>
      ))}
    </section>
  );
}
