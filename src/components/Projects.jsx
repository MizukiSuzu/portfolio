import ProjectCarousel from "./ProjectCarousel";

export default function Projects() {
  return (
    <section className="section-divider reveal" id="projects" style={{ paddingBottom: "4rem" }}>
      <p className="section-label"><span>03</span> / Projects</p>
      <h2 className="projects-heading">Things I've shipped</h2>
      <ProjectCarousel />
    </section>
  );
}
