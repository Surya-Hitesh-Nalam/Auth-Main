import Header from "./pages/Header"
import Hero from "./pages/Hero"
import CourseCards from "./pages/CourseCards"
import AboutMe from "./pages/About"
import Footer from "./pages/Footer"
import Connections from "./pages/Connections"
import HowItWorks from "./pages/HowItWorks"

function DashBoardPage() {
  return (
    <div >
      <Header />
      <Hero />
      <CourseCards />
      <Connections />
      <HowItWorks />
      <AboutMe />
      <Footer />
    </div>
  )
}

export default DashBoardPage