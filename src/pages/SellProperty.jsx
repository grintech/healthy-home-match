import React, { useState } from "react";
import Navbar from "../components/Navbar";
import { Link } from "react-router-dom";
import Footer from "../components/Footer";
import CTA from "../components/CTA";
import AgentsSlider from "../components/AgentsSlider";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHandshake,
  faCamera,
  faBullhorn,
  faUserCheck,
  faChartLine,
} from "@fortawesome/free-solid-svg-icons";


export default function SellPropertyPage() {

    const sellingOptions = [
    {
      title: "Sell Direct or with Support",
      icon: faHandshake,
      description:
        "Choose to sell independently or get help from trusted local agents.",
      link: "#",
    },
    {
      title: "Showcase Your Property",
      icon: faCamera,
      description:
        "Highlight your home with professional photos, videos, and floorplans.",
      link: "#",
    },
    {
      title: "Reach Verified Buyers",
      icon: faUserCheck,
      description:
        "Connect with serious buyers who are actively searching for homes like yours.",
      link: "#",
    },
    {
      title: "Flexible Selling Options",
      icon: faBullhorn,
      description:
        "Private sale, auction, or expressions of interest — you decide.",
      link: "#",
    },
    {
      title: "Market Insights",
      icon: faChartLine,
      description:
        "Stay informed with real-time data on prices and suburb performance.",
      link: "#",
    },
  ];

    return (
        <>
            <Navbar />
            <div className="sell-page">
                <div className="container py-md-4">
                    <section className="row align-items-center flex-row-reverse py-5 gy-4 hero_sell">
                        <div className="col-lg-5">
                            <img src="/images/sell.jpg" alt="hero" className="w-100 rounded" />
                        </div>
                        <div className="col-lg-7">
                            {/* <h1 className="hero_title">Sell your <span className="text-theme">home</span>, <br className="d-none d-lg-block" /> your way</h1> */}
                            <h1 className="hero_title">
                                From <span className="text-theme">homeowner</span> <br className="d-none d-lg-block" /> to happy <span className="text-theme"> seller</span>
                                </h1>

                            <p className=" text-light-opacity">
                                Healthy Home Match helps  sellers reach serious buyers
                                faster — from local families to investors. Start for free, stay
                                in control, and sell with confidence.
                            </p>

                            <div className="d-flex gap-2 flex-wrap">
                                <Link to='/login' className="btn ud-btn btn-white search_home_btn rounded-3">Start Listing — Free </Link>
                                <a href="#agents" className="btn ud-btn btn-white search_home_btn black_btn ">
                                    Find An Agent
                                </a>
                            </div>

                            <ul className="list-unstyled mt-4 d-flex flex-wrap gap-3 gap-md-4">
                                <li className="small text"><i className="fa-solid fa-user-check me-1"></i> Verified buyers</li>
                                <li className="small text"><i className="fa-solid fa-leaf me-1"></i> Green home focused</li>
                                <li className="small text"><i className="fa-solid fa-location-dot me-1"></i> Local expertise</li>
                            </ul>
                        </div>

                        
                    </section>
                </div>


                 <section id="how-it-works" className="bg-light py-5">
                    <div className="container">
                        <h2 className="sec-title text-center mb-4">How it works — a few simple steps</h2>

                        <div className="row g-4">
                        <div className="col-md-4">
                            <div className="step-card bg-white p-4 text-center rounded shadow-sm h-100">
                            <div className="icon mb-3 text-theme fs-1">
                                <i className="fa-solid fa-house-circle-check"></i>
                            </div>
                            <h6 className="mt-2">Tell us about your home</h6>
                            <p className="small text-muted">
                                Share a few details and photos — takes minutes.
                            </p>
                            </div>
                        </div>

                        <div className="col-md-4">
                            <div className="step-card bg-white p-4 text-center rounded shadow-sm h-100">
                            <div className="icon mb-3 text-theme fs-1">
                                <i className="fa-solid fa-users-viewfinder"></i>
                            </div>
                            <h6 className="mt-2">We find the best buyers</h6>
                            <p className="small text-muted">
                                Our system and team match your property to the right audience.
                            </p>
                            </div>
                        </div>

                        <div className="col-md-4">
                            <div className="step-card bg-white p-4 text-center rounded shadow-sm h-100">
                            <div className="icon mb-3 text-theme fs-1">
                                <i className="fa-solid fa-handshake"></i>
                            </div>
                            <h6 className="mt-2">Accept offers or get an agent</h6>
                            <p className="small text-muted">
                                You choose how to sell — we support the process.
                            </p>
                            </div>
                        </div>
                        </div>
                    </div>
                </section>


                <section className="education-section container about_info_card mt-5 py-5">
                    <div className="container">
                        <div className="row align-items-start">
                        {/* Left Content */}
                        <div className="col-lg-6 ">
                            <h2 className="sec-title mb-5 text-white">
                            Let’s Find The Right <span className="text-theme">Selling</span> Option For You
                            </h2>
                            <div className="d-flex flex-column gap-4">
                            {sellingOptions.map((item, index) => (
                                <div
                                    key={index}
                                    className="d-flex align-items-center wrap text-white"
                                >
                                    <div
                                    className="icon-wrapper bg-light-subtle rounded-circle d-flex align-items-center justify-content-center text-dark me-3"
                                    style={{ width: 50, height: 50 }}
                                    >
                                    <FontAwesomeIcon icon={item.icon} className="fs-5" />
                                    </div>
                                    <div>
                                    <Link>
                                        <h6 className="mb-0 fw-semibold text-white">
                                        {item.title}
                                        </h6>
                                    </Link>
                                    <p className="m-0">{item.description}</p>
                                    </div>
                                </div>
                                ))}
                            
                            </div>
                        </div>
                
                        
                        
                        </div>
                    </div>
                </section>

                <div id="agents">
                    <AgentsSlider />     
               </div>              

                <section className="testimonials py-5 bg-light">
                    <div className="container">
                        <h2 className="sec-title text-center mb-5">What Our Customers Say</h2>
                        <div className="row g-4">
                        
                        {/* Testimonial 1 */}
                        <div className="col-md-4">
                            <div className="testimonial-card position-relative bg-white shadow-sm rounded-4 p-4 h-100">
                            <i className="fa-solid fa-quote-left fa-2x text-green  position-absolute" style={{ top: "15px", left: "20px" }}></i>
                            <p className=" mb-4 mt-4">
                                “Healthy Home Match made selling my eco-friendly unit stress-free.
                                Found serious buyers within a week!”
                            </p>
                            <div className="d-flex align-items-center mt-auto">
                                <img
                                src="/images/agent4.jpg"
                                alt="client"
                                className="rounded-circle border border-3 border-white shadow"
                                style={{ width: "60px", height: "60px", objectFit: "cover", marginRight: "12px",  }}
                                />
                                <div>
                                <h6 className="fw-semibold mb-0">Emily R.</h6>
                                <small className="text-muted">Sydney, NSW</small>
                                <div className="text-warning small">
                                    <i className="fa-solid fa-star"></i>
                                    <i className="fa-solid fa-star"></i>
                                    <i className="fa-solid fa-star"></i>
                                    <i className="fa-solid fa-star"></i>
                                    <i className="fa-solid fa-star-half-stroke"></i>
                                </div>
                                </div>
                            </div>
                            </div>
                        </div>

                        {/* Testimonial 2 */}
                        <div className="col-md-4">
                            <div className="testimonial-card position-relative bg-white shadow-sm rounded-4 p-4 h-100">
                            <i className="fa-solid fa-quote-left fa-2x text-green position-absolute" style={{ top: "15px", left: "20px" }}></i>
                            <p className=" mb-4 mt-4">
                                “I loved how the platform highlighted my home’s energy efficiency.
                                The buyers were genuinely interested in green living.”
                            </p>
                            <div className="d-flex align-items-center mt-auto">
                                <img
                                src="/images/agent3.jpg"
                                alt="client"
                                className="rounded-circle border border-3 border-white shadow"
                                style={{ width: "60px", height: "60px", objectFit: "cover", marginRight: "12px",  }}
                                />
                                <div>
                                <h6 className="fw-semibold mb-0">James K.</h6>
                                <small className="text-muted">Melbourne, VIC</small>
                                <div className="text-warning small">
                                    <i className="fa-solid fa-star"></i>
                                    <i className="fa-solid fa-star"></i>
                                    <i className="fa-solid fa-star"></i>
                                    <i className="fa-solid fa-star"></i>
                                    <i className="fa-solid fa-star"></i>
                                </div>
                                </div>
                            </div>
                            </div>
                        </div>

                        {/* Testimonial 3 */}
                        <div className="col-md-4">
                            <div className="testimonial-card position-relative bg-white shadow-sm rounded-4 p-4 h-100">
                            <i className="fa-solid fa-quote-left fa-2x text-green position-absolute" style={{ top: "15px", left: "20px" }}></i>
                            <p className=" mb-4 mt-4">
                                “The process was smooth and transparent. I had multiple offers, and
                                sold above asking price — couldn’t be happier!”
                            </p>
                            <div className="d-flex align-items-center mt-auto">
                                <img
                                src="/images/agent2.jpg"
                                alt="client"
                                className="rounded-circle border border-3 border-white shadow"
                                style={{ width: "60px", height: "60px", objectFit: "cover", marginRight: "12px",  }}
                                />
                                <div>
                                <h6 className="fw-semibold mb-0">Sarah M.</h6>
                                <small className="text-muted">Brisbane, QLD</small>
                                <div className="text-warning small">
                                    <i className="fa-solid fa-star"></i>
                                    <i className="fa-solid fa-star"></i>
                                    <i className="fa-solid fa-star"></i>
                                    <i className="fa-solid fa-star"></i>
                                    <i className="fa-solid fa-star"></i>
                                </div>
                                </div>
                            </div>
                            </div>
                        </div>

                        </div>
                    </div>
                    </section>


                <div className="faq_sell py-5 ">
                    <div className="container">
                      <h3 className="sec-title text-center mb-3">Frequently Asked Questions</h3>
                      <div className="accordion-style1 ">

                    <div className="accordion" id="accordionExample">
                        <div className="accordion-item p-0">
                            <h2 className="accordion-header">
                            <button className="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne">
                                How do I list my property?
                            </button>
                            </h2>
                            <div id="collapseOne" className="accordion-collapse collapse show" data-bs-parent="#accordionExample">
                            <div className="accordion-body">
                             Log in to your account and go to your dashboard. Click on 'List Property' and fill in details such as address, property type, price, photos, and description. Once submitted, your listing will be reviewed and published within 24 hours.
                            </div>
                            </div>
                        </div>
                        <div className="accordion-item p-0">
                            <h2 className="accordion-header">
                            <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseTwo" aria-expanded="false" aria-controls="collapseTwo">
                               Are there any listing fees?
                            </button>
                            </h2>
                            <div id="collapseTwo" className="accordion-collapse collapse" data-bs-parent="#accordionExample">
                            <div className="accordion-body">
                               Basic property listings are free. However, we offer premium upgrades like featured spots, homepage banners, and video tours at a small additional cost. These increase visibility and can help sell faster.
                            </div>
                            </div>
                        </div>
                        <div className="accordion-item p-0">
                            <h2 className="accordion-header">
                            <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseThree" aria-expanded="false" aria-controls="collapseThree">
                                What documents do I need to list a home?
                            </button>
                            </h2>
                            <div id="collapseThree" className="accordion-collapse collapse" data-bs-parent="#accordionExample">
                            <div className="accordion-body">
                               You’ll typically need proof of ownership, property tax records, recent utility bills, and identification. If you’re working with an agent, they may also require a signed agreement to list on your behalf.
                            </div>
                            </div>
                        </div>
                        <div className="accordion-item p-0">
                            <h2 className="accordion-header">
                            <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseFour" aria-expanded="false" aria-controls="collapseFour">
                                How do I attract more buyers to my listing?
                            </button>
                            </h2>
                            <div id="collapseFour" className="accordion-collapse collapse" data-bs-parent="#accordionExample">
                            <div className="accordion-body">
                               Great photography, a compelling description, accurate pricing, and timely responses to inquiries help boost interest. Consider upgrading your listing to a premium package to appear at the top of search results and reach a wider audience.
                            </div>
                            </div>
                        </div>
                        <div className="accordion-item p-0">
                            <h2 className="accordion-header">
                            <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseFive" aria-expanded="false" aria-controls="collapseFive">
                                Can I edit my listing after publishing?
                            </button>
                            </h2>
                            <div id="collapseFive" className="accordion-collapse collapse" data-bs-parent="#accordionExample">
                            <div className="accordion-body">
                               Yes. Simply go to your dashboard, open the listing, and click 'Edit'. You can change photos, update the price, correct descriptions, or mark it as sold or under contract anytime.
                            </div>
                            </div>
                        </div>
                    </div>
                      </div>
                    </div>
                </div>

                <CTA />
               


            </div>
            <Footer />

        </>
    );
}
