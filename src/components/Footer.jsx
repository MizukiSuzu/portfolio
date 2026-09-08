import { profile } from "../data/resume";

export default function Footer() {
  return (
    <footer
      style={{
        marginTop: "48px",
        paddingTop: "20px",
        borderTop: "1px solid var(--border)",
        fontFamily: "var(--font-mono)",
        fontSize: "12px",
        color: "var(--text-dim)",
        display: "flex",
        justifyContent: "space-between",
        flexWrap: "wrap",
        gap: "8px",
      }}
    >
      <span>&copy; {new Date().getFullYear()} {profile.name}</span>
      <a href={`mailto:${profile.email}`}>{profile.email}</a>
    </footer>
  );
}
