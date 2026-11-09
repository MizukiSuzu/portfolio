import { stats } from "../data/resume";

export default function Honors() {
  return (
    <section className="honors section-divider reveal" id="record">
      <p className="section-label"><span>01</span> / Record</p>
      <h2>Track record</h2>
      <div className="tiles">
        {stats.tiles.map((t) => (
          <div className="tile" key={t.label}>
            <p className="tile-value">{t.value}</p>
            <p className="tile-label">{t.label}</p>
            <p className="tile-detail">{t.detail}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
