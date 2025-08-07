import CountUp from "react-countup";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import AgentsSlider from "../components/AgentsSlider";
import AboutInfoCard from "../components/AboutInfoCard";
import CTA from "../components/CTA";
import CounterSection from "../components/CounterSection";
// import './page.css'
import './page.css'

const About = () => {
  return (
    <>
      <Navbar />

      <div className="about_page">
        <div className="contact_banner">
          <div className="container">
            <h1 className="text-center text-white">About Us</h1>
          </div>
         </div>



        <div className="our-about mt-5 pt-5">
          <div className="container">
            <div className="row">
              <div className="col-lg-6">
                <h2 className="mb-4 fw-bold">
                  We're on a <span className="text-theme">Mission</span> to Redefine <br className="d-none d-lg-block" />Healthy
                  <span className="text-theme"> Living </span> Through Real Estate.
                </h2>
                <p className="text mb25">
                  At <strong>Healthy Home Match</strong>, we understand that finding a home is more than just buying property — it's about choosing a space that supports your lifestyle, health, and peace of mind. Our mission is to connect individuals and families with homes that are not only beautiful but also safe, eco-conscious, and built with well-being in mind.
                </p>
                <p className="text mb55">
                  From modern villas to green-certified homes, we bring you real estate options that align with your values. Our team is dedicated to simplifying the journey by offering verified listings, secure transactions, and expert support at every step. Whether you're looking to settle in the suburbs, embrace eco-living, or upgrade your lifestyle, Healthy Home Match is here to guide you to your perfect space — a home that’s healthy for you and the planet.
                </p>
              </div>

              <div className="col-lg-5 offset-lg-1">
                <div className="row">
                  
                  {/* Card 1 */}
                  <div className="col-sm-6 mb-5">
                    <div className="why-chose-list style3">
                      <div className="list-one mb30 d-flex flex-column">
                        <div className="icon_wrapper">
                          <i className="fa-solid fa-house-user"></i>
                        </div>
                        <div className="list-content flex-grow-1 ps-3">
                          <h6 className="mb-1">Modern Villas</h6>
                          <p className="text mb-0 fz14">
                            Smartly designed spaces that blend luxury with sustainability.
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Card 2 */}
                  <div className="col-sm-6 mb-5">
                    <div className="why-chose-list style3">
                      <div className="list-one mb30 d-flex flex-column">
                        <div className="icon_wrapper">
                          <i className="fa-solid fa-credit-card"></i>
                        </div>
                        <div className="list-content flex-grow-1 ps-3">
                          <h6 className="mb-1">Secure Payments</h6>
                          <p className="text mb-0 fz14">
                            Fully encrypted transactions for peace of mind and privacy.
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Card 3 */}
                  <div className="col-sm-6 mb-5">
                    <div className="why-chose-list style3">
                      <div className="list-one mb30 d-flex flex-column">
                        <div className="icon_wrapper">
                          <i className="fa-solid fa-seedling"></i>
                        </div>
                        <div className="list-content flex-grow-1 ps-3">
                          <h6 className="mb-1">Eco-Friendly Choices</h6>
                          <p className="text mb-0 fz14">
                            Explore green homes that support a sustainable future.
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Card 4 */}
                  <div className="col-sm-6 mb-5">
                    <div className="why-chose-list style3">
                      <div className="list-one mb30 d-flex flex-column">
                        <div className="icon_wrapper">
                          <i className="fa-solid fa-user-check"></i>
                        </div>
                        <div className="list-content flex-grow-1 ps-3">
                          <h6 className="mb-1">Verified Listings</h6>
                          <p className="text mb-0 fz14">
                            Every property is personally checked for authenticity and safety.
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>

                </div>
              </div>
            </div>

           <AboutInfoCard />

           <div className="mt-4">
            <CounterSection />
           </div>
 
          </div>
        </div>


        <AgentsSlider />

        <CTA />

     </div>

      <Footer />
    </>
  );
};

export default About;
