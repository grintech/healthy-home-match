import HeroBanner from '../components/HeroBanner.jsx'
import PopularProperties from '../components/PopularProperties.jsx'
import EducationSection from '../components/EducationSection.jsx'
import Events from '../components/Events.jsx'
import CallToAction from '../components/CallToAction.jsx'
import Footer from '../components/Footer.jsx'
import Topbar from '../components/Navbar.jsx'
import Blogs from '../components/Blogs.jsx'

const Homepage = () => {
  return (
    <>
      <Topbar />
      <HeroBanner />
      <PopularProperties />
      <EducationSection />
      <Events />
      <Blogs />
      <CallToAction />

      <Footer />
    </>
  )
}

export default Homepage