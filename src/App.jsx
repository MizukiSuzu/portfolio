import Hero from "./components/Hero";
import StatPanel from "./components/StatPanel";
import AbilityBar from "./components/AbilityBar";
import Projects from "./components/Projects";
import Footer from "./components/Footer";

export default function App() {
  return (
    <main>
      <Hero />
      <StatPanel />
      <AbilityBar />
      <Projects />
      <Footer />
    </main>
  );
}
