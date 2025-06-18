import { BrowserRouter, Routes, Route } from "react-router-dom";
import { About, Contact, Experience, Feedbacks, Hero, Navbar, Tech, Projects, StarsCanvas, SocialMediaCard } from './components';
import DreamSprintPage from './pages/DreamSprintPage';
import DreamSprintLanding from './pages/DreamSprintLanding';
import AdminDashboard from './pages/AdminDashboard';

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={
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
        } />
        <Route path="/dreamsprint" element={<DreamSprintLanding />} />
        <Route path="/dreamsprint/apply" element={<DreamSprintPage />} />
        <Route path="/dreamsprint/admin" element={<AdminDashboard />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App;