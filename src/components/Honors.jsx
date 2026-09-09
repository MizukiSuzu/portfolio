import { stats, education } from "../data/resume";

export default function Honors() {
  return (
    <section className="honors section-divider">
      <div className="honors-inner">
        <div className="gwa">
          <span className="gwa-number">{education.gwa}</span>
          <span className="gwa-label">GWA, {education.school}</span>
        </div>
        <div className="honors-list">
          {stats.achievements.map((a) => {
            const [title, rest] = a.split(" — ");
            return (
              <p key={a}>
                {title} <span>&mdash; {rest}</span>
              </p>
            );
          })}
        </div>
      </div>
    </section>
  );
}
