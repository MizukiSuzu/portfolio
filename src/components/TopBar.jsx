import { profile } from "../data/resume";

export default function TopBar() {
  return (
    <header className="topbar">
      <a className="topbar-name" href="#top">
        {profile.shortName}<span>.</span>
      </a>
      <nav className="topbar-nav" aria-label="Sections">
        <a href="#record">Record</a>
        <a href="#skills">Skills</a>
        <a href="#projects">Projects</a>
        {profile.resume && (
          <a className="topbar-cta" href={profile.resume} target="_blank" rel="noreferrer">
            Resume
          </a>
        )}
      </nav>
    </header>
  );
}
