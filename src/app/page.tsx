import Hero from "./components/Hero";
import Skills from "./components/Skills";
import Projects from "./components/Projects";
import Education from "./components/Education";
import Experience from "./components/Experience";
import Contact from "./components/Contact";
import Navbar from "./components/Navbar";
import Reviews from "./components/Reviews";

export default function Home() {
  return (
    <main className="min-h-screen bg-dark-900">
      <Navbar />
      
      {/* Hero Section */}
      <div className="section-dark-900">
        <div className="bg-pattern"></div>
        <div className="bg-glow-1"></div>
        <Hero />
      </div>
      
      {/* Skills Section */}
      <div className="section-dark-800 section-transition-top section-transition-bottom">
        <div className="bg-pattern"></div>
        <div className="bg-glow-2"></div>
        <Skills />
      </div>
      
      {/* Projects Section */}
      <div className="section-dark-900 section-transition-top section-transition-bottom">
        <div className="bg-pattern"></div>
        <div className="bg-glow-1"></div>
        <Projects />
      </div>
      
      {/* Education Section */}
      <div className="section-dark-800 section-transition-top section-transition-bottom">
        <div className="bg-pattern"></div>
        <div className="bg-glow-2"></div>
        <Education />
      </div>
      
      {/* Experience Section */}
      <div className="section-dark-900 section-transition-top section-transition-bottom">
        <div className="bg-pattern"></div>
        <div className="bg-glow-1"></div>
        <Experience />
      </div>
      
      {/* Reviews Section */}
      <div className="section-dark-800 section-transition-top section-transition-bottom">
        <div className="bg-pattern"></div>
        <div className="bg-glow-2"></div>
        <Reviews />
      </div>
      
      {/* Contact Section */}
      <div className="section-dark-900 section-transition-top">
        <div className="bg-pattern"></div>
        <div className="bg-glow-1"></div>
        <Contact />
      </div>
    </main>
  );
}
