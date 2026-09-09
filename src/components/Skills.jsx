import { useState } from "react";
import { skillGroups } from "../data/resume";

export default function Skills() {
  const [activeChip, setActiveChip] = useState(null);

  return (
    <section className="skills section-divider">
      <h2 className="skills-heading">What I build with</h2>

      {skillGroups.map((group) => (
        <div className="skill-group" key={group.label}>
          <p className={"skill-group-label " + group.group}>{group.label}</p>
          <div className="skill-chips">
            {group.skills.map((skill) => {
              const chipId = group.label + ":" + skill.name;
              return (
                <div
                  key={skill.name}
                  className={
                    "skill-chip " + group.group + (activeChip === chipId ? " active" : "")
                  }
                  tabIndex={0}
                  onClick={() =>
                    setActiveChip(activeChip === chipId ? null : chipId)
                  }
                >
                  {skill.name}
                  <div className="caption">{skill.caption}</div>
                </div>
              );
            })}
          </div>
        </div>
      ))}

      <p className="skills-note">Always ready to pick up whatever a project calls for next.</p>
    </section>
  );
}
