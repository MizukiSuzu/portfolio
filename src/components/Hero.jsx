import { useEffect, useState } from "react";
import { profile } from "../data/resume";

const LINES = [
  { prompt: "> whoami", after: profile.name },
  { prompt: "> cat title.txt", after: profile.title },
];

export default function Hero() {
  const [visibleLines, setVisibleLines] = useState(0);
  const [showSummary, setShowSummary] = useState(false);

  useEffect(() => {
    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    if (reduceMotion) {
      setVisibleLines(LINES.length);
      setShowSummary(true);
      return;
    }

    let index = 0;
    const interval = setInterval(() => {
      index += 1;
      setVisibleLines(index);
      if (index >= LINES.length) {
        clearInterval(interval);
        setTimeout(() => setShowSummary(true), 300);
      }
    }, 550);

    return () => clearInterval(interval);
  }, []);

  return (
    <section style={{ paddingTop: "48px", paddingBottom: "8px" }}>
      <div style={{ fontFamily: "var(--font-mono)", fontSize: "13px" }}>
        {LINES.slice(0, visibleLines).map((line, i) => (
          <div key={i} style={{ marginBottom: "6px" }}>
            <div style={{ color: "var(--teal)" }}>{line.prompt}</div>
            <div
              style={{
                color: i === 0 ? "var(--text)" : "var(--text-dim)",
                fontSize: i === 0 ? "22px" : "14px",
                fontFamily: i === 0 ? "var(--font-sans)" : "var(--font-mono)",
                margin: "2px 0 10px",
              }}
            >
              {line.after}
            </div>
          </div>
        ))}
      </div>

      {showSummary && (
        <p
          style={{
            fontSize: "15px",
            lineHeight: 1.7,
            color: "var(--text)",
            maxWidth: "62ch",
            margin: "12px 0 0",
          }}
        >
          {profile.summary}
        </p>
      )}

      {showSummary && (
        <div
          style={{
            marginTop: "20px",
            fontFamily: "var(--font-mono)",
            fontSize: "13px",
            color: "var(--text-dim)",
          }}
        >
          <a href={`mailto:${profile.email}`} style={{ marginRight: "16px" }}>
            {profile.email}
          </a>
          <span>{profile.location}</span>
        </div>
      )}
    </section>
  );
}
