import React from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { Link } from "react-router-dom";
import CTA from "../components/CTA";
import './page.css'


const Contact = () => {
  return (
    <>
      <Navbar />
      <div className="contact_page">
        <div className="contact_banner">
          <div className="container">
            <h1 className="text-center text-white">Contact Us</h1>
          </div>
        </div>
        <div className="py-5">
          <div className="container">
            <div className="row d-flex align-items-center">
              <div className="col-lg-6 position-relative mb-5 mb-lg-0">
                <div className="contact_page_form default-box-shadow1 bdrs12 bdr1 p30 mb30-md bgc-white">
                  <h4 className="form-title mb25">Have questions? Get in touch!</h4>
                  <form className="form-style1 position-relative mt-4">
                    <div className="row">
                      <div className="col-lg-12">
                        <div className="mb-3">
                          <label className="heading-color ff-heading fw600 mb10">
                            First Name
                          </label>
                          <input
                            className="form-control"
                            placeholder="Your Name"
                            required=""
                            type="text"
                          />
                        </div>
                      </div>
                      <div className="col-lg-12">
                        <div className="mb-3">
                          <label className="heading-color ff-heading fw600 mb10">
                            Last Name
                          </label>
                          <input
                            className="form-control"
                            placeholder="Your Name"
                            required=""
                            type="text"
                          />
                        </div>
                      </div>
                      <div className="col-md-12">
                        <div className="mb-3">
                          <label className="heading-color ff-heading fw600 mb10">
                            Email
                          </label>
                          <input
                            className="form-control"
                            placeholder="Your Name"
                            required=""
                            type="email"
                          />
                        </div>
                      </div>
                      <div className="col-md-12">
                        <div className="mb10">
                          <label className="heading-color ff-heading fw600 mb10">
                            Message
                          </label>
                          <textarea
                            cols="30"
                            rows="4"
                            placeholder="Write your message.."
                            required=""
                          ></textarea>
                        </div>
                      </div>
                      <div className="col-md-12">
                        <div className="d-grid">
                          <button type="submit" className="btn ud-btn btn-white search_home_btn mt-4">
                            Submit<i className="fal fa-arrow-right-long"></i>
                          </button>
                        </div>
                      </div>
                    </div>
                  </form>
                </div>
              </div>
              <div className="col-lg-5 offset-lg-1">
                <h2 className="mb30 text-capitalize">
                  We’d love to <span className="text-theme fw-bold">hear</span> <br className="d-none d-lg-block" />
                  from you.
                </h2>
                <p className="text">
                 At Healthy Home Match, your questions and ideas matter. Whether you're seeking the perfect home that suits your lifestyle or simply need expert advice, we’re here to help every step of the way. Reach out — your journey to a healthier, happier home starts here.
                </p>
                <iframe
                        className="position-relative w-100"
                        style={{ height: "270px" }}
                        loading="lazy"
                        src="https://maps.google.com/maps?q=10425 Tabor St&amp;t=m&amp;z=14&amp;output=embed&amp;iwloc=near"
                        title="10425 Tabor St"
                        aria-label="10425 Tabor St"
                    ></iframe>
              </div>
            </div>


             <div className="row g-4 my-5 cta justify-content-center text-center">
                <h3 className="text-center mb-4 fw-bold">Contact Details</h3>
            
                        <div className="col-md-4 col-sm-6">
                            <div className="card text-center shadow-sm h-100 border-0 p-4">
                            <div className="mb-3">
                                <i className="fas fa-home fa-2x"></i>
                            </div>
                            <h5 className="mb-2">Email Us</h5>
                            <p className="small text-muted mb-2">We usually respond within 24 hours</p>
                            <p className="card-text text-muted">
                                <Link to="mailto:contact@healthyhomematch.com" className="text-decoration-none text-muted">
                                contact@healthyhomematch.com
                                </Link>
                            </p>
                            </div>
                        </div>
            
                        <div className="col-md-4 col-sm-6">
                            <div className="card text-center shadow-sm h-100 border-0 p-4">
                            <div className="mb-3 ">
                                <i className="fas fa-user-check fa-2x"></i>
                            </div>
                             <h5 className="mb-2">Call Us</h5>
                             <p className="small text-muted mb-2">Available from 9am to 6pm</p>
                            <p className="card-text text-muted">
                                <Link to="tel:+18001234567" className="text-decoration-none text-muted">
                                +1 (800) 123-4567
                                </Link>
                            </p>
                            </div>
                        </div>
            
                        <div className="col-md-4 col-sm-6">
                            <div className="card text-center shadow-sm h-100 border-0 p-4">
                            <div className="mb-3 ">
                                <i className="fas fa-envelope-open-text fa-2x"></i>
                            </div>
                             <h5 className="mb-2">Visit Us</h5>
                              <p className="small text-muted mb-2">Walk-ins welcome during office hours</p>
                              <p className="card-text text-muted">123 Wellness Ave, Green City, NY 10001</p>
                            </div>
                        </div>
            
             </div>

            <div className="row text-center my-5 contact_infos d-none">
                <h3 className="text-center mb-4 fw-bold">Contact Details</h3>
            
                <div className="col-md-4 mb-4">
                <div className="card h-100  border-0">
                    <div className="card-body d-flex align-items-center justify-content-center flex-column">
                    <div className="icon_wrap">
                        <i className="fas fa-envelope"></i>
                    </div>
                    <h5 className="card-title">Email Us</h5>
                    <p className="small text-muted mb-2">We usually respond within 24 hours</p>
                    <p className="card-text text-muted">
            <Link to="mailto:contact@healthyhomematch.com" className="text-decoration-none text-muted">
              contact@healthyhomematch.com
            </Link>
          </p>
                    </div>
                </div>
                </div>

            
                <div className="col-md-4 mb-4">
                <div className="card h-100  border-0">
                    <div className="card-body d-flex align-items-center justify-content-center flex-column">
                     <div className="icon_wrap">
                        <i className="fas fa-phone"></i>
                    </div>
                    <h5 className="card-title">Call Us</h5>
                    <p className="small text-muted mb-2">Available from 9am to 6pm</p>
                    <p className="card-text text-muted">
            <Link to="tel:+18001234567" className="text-decoration-none text-muted">
              +1 (800) 123-4567
            </Link>
          </p>
                    </div>
                </div>
                </div>

                
                <div className="col-md-4 mb-4">
                <div className="card h-100 border-0">
                    <div className="card-body d-flex align-items-center justify-content-center flex-column">
                     <div className="icon_wrap">
                        <i className="fas fa-location-dot"></i>
                    </div>
                    <h5 className="card-title">Visit Us</h5>
                     <p className="small text-muted mb-2">Walk-ins welcome during office hours</p>
                    <p className="card-text text-muted">123 Wellness Ave, Green City, NY 10001</p>
                    </div>
                </div>
                </div>

            </div>

          </div>

             <CTA />

        </div>
      </div>
      <Footer />
    </>
  );
};

export default Contact;
