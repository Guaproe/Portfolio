import { Navbar } from './components/layout/Navbar'
import { CustomCursor } from './components/layout/CustomCursor'
import { Footer } from './components/layout/Footer'
import { Hero } from './components/sections/Hero'
import { About } from './components/sections/About'
import { TechStack } from './components/sections/TechStack'
import { Projects } from './components/sections/Projects'
import { Services } from './components/sections/Services'
import { Contact } from './components/sections/Contact'

export default function App() {
  return (
    <>
      <CustomCursor />
      <Navbar />
      <main>
        <Hero />
        <About />
        <TechStack />
        <Projects />
        <Services />
        <Contact />
      </main>
      <Footer />
    </>
  )
}
