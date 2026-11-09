import { useEffect, useState } from "react";
import { profile, stats } from "../data/resume";

const reducedMotion = () => window.matchMedia("(prefers-reduced-motion: reduce)").matches;

// Counts up from 0 once on mount; shows the final value straight away when motion is reduced.
function Counter({ value, decimals = 0, suffix = "" }) {
  const [n, setN] = useState(() => (reducedMotion() ? value : 0));

  useEffect(() => {
    if (reducedMotion()) return;
    let raf;
    const start = performance.now();
    const tick = (t) => {
      const p = Math.min((t - start) / 1400, 1);
      setN(value * (1 - (1 - p) ** 3));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [value]);

  return n.toFixed(decimals) + suffix;
}

const LINE = "M50,200 C90,190 100,175 130,170 C170,163 180,158 210,150 C250,140 255,100 290,90 C325,80 340,60 370,45";
const POINTS = [[50, 200], [130, 170], [210, 150], [290, 90], [370, 45]];
const YEARS = ["'22", "'23", "'24", "'25", "'26"];

export default function Hero() {
  const links = [
    ["GitHub", profile.github],
    ["LinkedIn", profile.linkedin],
    ["Resume (PDF)", profile.resume],
  ].filter(([, href]) => href);

  return (
    <section className="hero" id="top">
      <div className="hero-content">
        <p className="section-label"><span>&gt;</span> {profile.location}</p>
        <h1 className="hero-name">{profile.shortName}</h1>
        <p className="hero-role">{profile.title}</p>
        <p className="hero-bio">{profile.tagline}</p>

        <dl className="kpis">
          {stats.kpis.map((k) => (
            <div key={k.label}>
              <dt>{k.label}</dt>
              <dd>
                <Counter value={k.value} decimals={k.decimals} suffix={k.suffix} />
              </dd>
            </div>
          ))}
        </dl>

        <div className="hero-meta">
          <a href={`mailto:${profile.email}`}>{profile.email}</a>
          {links.length > 0 && (
            <div className="hero-links">
              {links.map(([label, href]) => (
                <a key={label} href={href} target="_blank" rel="noreferrer">
                  {label}
                </a>
              ))}
            </div>
          )}
        </div>
      </div>

      <div className="hero-graphic dash" aria-hidden="true">
        <div className="dash-bar">
          <i /><i /><i />
          <span>growth.csv</span>
          <span className="dash-live">● 2022–2026</span>
        </div>
        <svg viewBox="0 0 400 260" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <linearGradient id="areaGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#E8A33D" stopOpacity="0.28" />
              <stop offset="100%" stopColor="#E8A33D" stopOpacity="0" />
            </linearGradient>
          </defs>

          {[40, 100, 160, 220].map((y) => (
            <line key={y} className="grid-line" x1="40" y1={y} x2="390" y2={y} />
          ))}
          {YEARS.map((label, i) => (
            <text key={label} className="axis-label" x={POINTS[i][0]} y="244" textAnchor="middle">
              {label}
            </text>
          ))}

          <path className="chart-fill" d={LINE + " L370,220 L50,220 Z"} />
          <path className="chart-line" d={LINE} />
          {POINTS.map(([x, y]) => (
            <circle key={x} className="chart-dot" cx={x} cy={y} r="4.5" />
          ))}

          <g className="chart-note">
            <line x1="250" y1="76" x2="286" y2="88" stroke="rgba(232,163,61,0.5)" />
            <rect x="128" y="58" width="128" height="24" rx="5" />
            <text x="192" y="74" textAnchor="middle">Best Thesis · #1/12</text>
          </g>
        </svg>
      </div>
    </section>
  );
}
