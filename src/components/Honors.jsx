import { useState } from "react";
import { stats, projects } from "../data/resume";
import ProjectModal from "./ProjectModal";

export default function Honors() {
  const [openId, setOpenId] = useState(null);
  const open = projects.find((p) => p.id === openId);

  return (
    <section className="honors section-divider reveal" id="record">
      <p className="section-label"><span>01</span> / Record</p>
      <h2>Track record</h2>
      <div className="tiles">
        {stats.tiles.map((t) => {
          const body = (
            <>
              <p className="tile-value">{t.value}</p>
              <p className="tile-label">{t.label}</p>
              <p className="tile-detail">{t.detail}</p>
            </>
          );
          return t.project ? (
            <button type="button" className="tile tile-link" key={t.label} onClick={() => setOpenId(t.project)}>
              {body}
              <span className="tile-more">View thesis →</span>
            </button>
          ) : (
            <div className="tile" key={t.label}>{body}</div>
          );
        })}
      </div>

      {open && <ProjectModal project={open} onClose={() => setOpenId(null)} />}
    </section>
  );
}
