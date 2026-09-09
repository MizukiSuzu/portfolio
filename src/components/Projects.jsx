import ProjectCarousel from "./ProjectCarousel";

export default function Projects() {
  return (
    <section style={{ marginTop: "32px" }}>
      <div
        style={{
          fontFamily: "var(--font-mono)",
          fontSize: "13px",
          color: "var(--teal)",
          marginBottom: "12px",
        }}
      >
        &gt; ls projects/
      </div>
      <ProjectCarousel />
    </section>
  );
}
