import Background from "./components/Background";
import TopBar from "./components/TopBar";
import Hero from "./components/Hero";
import Honors from "./components/Honors";
import Skills from "./components/Skills";
import Projects from "./components/Projects";
import Footer from "./components/Footer";

export default function App() {
  return (
    <main>
      <Background />
      <TopBar />
      <Hero />
      <Honors />
      <Skills />
      <Projects />
      <Footer />
    </main>
  );
}
