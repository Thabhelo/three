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
          <div className="min-h-screen relative z-0 bg-white dark:bg-primary transition-colors duration-200 bg-blueprint bg-symbols dark:bg-equations dark:bg-symbols-dark">
            <div className="bg-transparent dark:bg-hero-pattern bg-cover bg-no-repeat bg-center relative z-10 transition-colors duration-200">
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