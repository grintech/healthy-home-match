import HeroBanner from '../components/HeroBanner.jsx'
import PopularProperties from '../components/PopularProperties.jsx'
import EducationSection from '../components/EducationSection.jsx'
import Events from '../components/Events.jsx'
import CallToAction from '../components/CallToAction.jsx'
import Footer from '../components/Footer.jsx'
import Topbar from '../components/Navbar.jsx'
import Blogs from '../components/Blogs.jsx'
import { Link } from 'react-router-dom'

const Homepage = () => {
  return (
    <>
      <Topbar />
      <HeroBanner />
      <PopularProperties />

      <div className="main_display_cards py-5 bg-light mb-5">
        <div className="container py-4">
          <div className="row">
            <div className="col-lg-4 col-md-6 mb-4 mb-lg-0">
              <div className="card h-100 shadow d-flex flex-column justify-content-center align-items-center">
                 <img src="/images/buy.png" className='mb-4' alt="buy property" />
                  <h4>Buy a home</h4>
                  <p>Discover a wide range of properties tailored to your needs. Whether you're looking for your first home, a family upgrade, or an investment property, we make buying process smooth and easy.</p>
                  <Link to='/agents' className="th-btn sm style3 pill position-relative"> Find an agent</Link>
              </div>
            </div>
            <div className="col-lg-4 col-md-6 mb-4 mb-lg-0">
              <div className="card h-100 shadow d-flex flex-column justify-content-center align-items-center">
                 <img src="/images/rent.png" className='mb-4' alt="buy property" />
                  <h4>Rent a home</h4>
                  <p>From short-term leases to long-term rentals, we connect you with safe, affordable, and well-maintained properties. Experience a seamless renting process with guidance on every step.</p>
                  <Link to='/homes?rent' className="th-btn sm style3 pill position-relative"> Find Rentals</Link>
              </div>
            </div>
            <div className="col-lg-4 col-md-6 mb-4 mb-lg-0">
              <div className="card h-100 shadow d-flex flex-column justify-content-center align-items-center">
                 <img src="/images/sell.png" className='mb-4' alt="buy property" />
                  <h4>Sell a home</h4>
                  <p>Selling your home doesn’t have to be overwhelming. With expert market analysis, strategic pricing, and professional marketing, we help you sell quickly while maximizing your return.</p>
                  <Link className="th-btn sm style3 pill position-relative"> View options</Link>
              </div>
            </div>
          </div>
        </div>
      </div>
      <EducationSection />
      <Events />
      <Blogs />
      <CallToAction />

      <Footer />
    </>
  )
}

export default Homepage