import { BrowserRouter } from "react-router-dom";
import { About, Contact, Experience, Feedbacks, Hero, Navbar, Tech, Projects, StarsCanvas, SocialMediaCard } from './components';

const App = () => {
  return (
    <BrowserRouter>
      <div className="relative z-0 bg-primary">
        <div className="bg-hero-pattern bg-cover bg-no-repeat bg-center relative z-10">
          <Navbar />
          <Hero />
          <SocialMediaCard />
        </div>
        <section id="about">
          <About />
        </section>
        <section id="work">
          <Experience />
        </section>
        <section id="tech">
          <Tech />
        </section>
        <section id="projects">
          <Projects />
        </section>
        <section id="feedbacks">
          <Feedbacks />
        </section>
        <div className="relative z-0">
          <section id="contact">
            <Contact />
          </section>
          <StarsCanvas />
        </div>
      </div>
    </BrowserRouter>
  )
}

export default App;