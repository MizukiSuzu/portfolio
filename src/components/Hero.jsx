import { profile, stats } from "../data/resume";

export default function Hero() {
  const links = [
    ["GitHub", profile.github],
    ["LinkedIn", profile.linkedin],
    ["Resume (PDF)", profile.resume],
  ].filter(([, href]) => href);

  return (
    <section className="hero">
      <div className="hero-content">
        <h1 className="hero-name">{profile.shortName}</h1>
        <p className="hero-role">{profile.title}</p>
        <p className="hero-bio">{profile.tagline}</p>
        <p className="hero-honor">
          <strong>{stats.achievements[0].split(" — ")[0]}</strong>
          {" — " + stats.achievements[0].split(" — ")[1]}
        </p>
        <div className="hero-meta">
          <a href={`mailto:${profile.email}`}>{profile.email}</a>
          <span>{profile.location}</span>
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

      <div className="hero-graphic">
        <svg viewBox="0 0 400 340" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <linearGradient id="areaGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#E8A33D" stopOpacity="0.25" />
              <stop offset="100%" stopColor="#E8A33D" stopOpacity="0" />
            </linearGradient>
          </defs>

          <line className="grid-line" x1="0" y1="60" x2="400" y2="60" />
          <line className="grid-line" x1="0" y1="140" x2="400" y2="140" />
          <line className="grid-line" x1="0" y1="220" x2="400" y2="220" />
          <line className="grid-line" x1="0" y1="300" x2="400" y2="300" />

          <path
            className="chart-fill"
            d="M20,260 C80,240 100,200 150,190 C200,180 220,120 270,100 C310,85 340,95 380,50 L380,300 L20,300 Z"
          />
          <path
            className="chart-line"
            d="M20,260 C80,240 100,200 150,190 C200,180 220,120 270,100 C310,85 340,95 380,50"
          />

          <circle className="chart-dot" cx="20" cy="260" r="5" />
          <circle className="chart-dot" cx="150" cy="190" r="5" />
          <circle className="chart-dot" cx="270" cy="100" r="5" />
          <circle className="chart-dot" cx="340" cy="95" r="5" />
          <circle className="chart-dot" cx="380" cy="50" r="5" />
        </svg>
      </div>
    </section>
  );
}
