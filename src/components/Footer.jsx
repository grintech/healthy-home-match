import React from 'react'
import { Link } from 'react-router-dom'

const Footer = () => {
    return (
        <>
            <footer className='footer'>
                {/* <div className="footer-top-shape animation-infinite background-image" ></div> */}
                <div className="container widget_area">
                    <div className="row">
                        <div className="col-xl-3 col-md-4 mb-5 mb-lg-0">
                           <div className="navbar-brand mb-3">
                                <img src="/images/healthy_logo.png" alt="logo" />
                            </div>
                            <p>Health Home Match helps you find reliable home healthcare professionals with ease.</p>
                            <ul className="footer_links p-0 m-0">
                                <li><i className="fa-solid fa-phone"></i> <p className='m-0'><Link to="#">+123 456 7890</Link></p></li>
                                <li><i className="fa-solid fa-envelope"></i> <p className='m-0'><Link to="#">info@example.com</Link></p></li>
                                <li><i className="fa-solid fa-location-dot"></i> <p className='m-0'>#123 Street Road XYZ City</p></li>
                            </ul>
                           
                        </div>
                        <div className="col-xl-9 col-md-8">                   
                            <div className="row ">
                                <div className="col-xl-3 col-sm-6 mb-4 mb-xl-0">
                                    <h4>Featured Houses</h4>
                                    <ul className="menu p-0 m-0">
                                        <li><Link to="/homes?villa"> Villa</Link></li>
                                        <li><Link to="/homes?house"> House</Link></li>
                                        <li><Link to="/homes?apartment"> Apartments</Link></li>
                                        <li><Link to="/homes?townhouse">Town House</Link></li>
                                    </ul>
                                </div>
                                <div className="col-xl-3 col-sm-6 mb-4 mb-xl-0">
                                    <h4>Quick Links</h4>
                                    <ul className="menu p-0 m-0">
                                        <li><Link to="/about"> About Us</Link></li>
                                        <li><Link to="/blogs"> Our Blogs</Link></li>
                                        <li><Link to="/privacy-policy"> Privacy Policy</Link></li>
                                        <li><Link to="/terms-and-conditions"> Terms & Conditions</Link></li>
                                        {/* <li><Link to="/pricing"> Pricing Plans</Link></li> */}
                                    </ul>
                                </div>
                                <div className="col-xl-2 col-sm-6 mb-4 mb-xl-0">
                                    <h4>Support</h4>
                                    <ul className="menu p-0 m-0">
                                        <li><Link to="/contact"> Contact Us</Link></li>
                                        <li><Link to="/faq"> FAQs</Link></li>
                                        <li><Link to="/help"> Help Center</Link></li>
                                        {/* <li><Link to="#"> Live Chat</Link></li> */}
                                
                                    </ul>
                                </div>
                                <div className="col-xl-4 col-sm-6 mb-4 mb-xl-0">
                                   <h4>Keep Yourself Up to Date</h4>
                                    <div className="mailchimp-style1">
                                     <input className="form-control" placeholder="Your Email" type="email" />
                                     <button type="submit"><i className="fa-solid fa-paper-plane"></i></button>
                                    </div>
                                </div>
                            </div>                                            
                        </div>

                    </div>
                </div>
                <div className="copyright-wrap position-relative">
                    {/* <div className="footer-bottom-top-shape "></div> */}
                   <div className="container">
                    <p className="copyright-text text-center m-0">
                        Copyright &copy; <i className="fal fa-copyright"></i> 2025 
                        <Link to="/" className="text-theme"> Healthy Home Match</Link>. 
                        All Rights Reserved. <br />
                    </p>
                    <p className="copyright-text text-center m-0">
                    Designed & Developed by <Link to="https://grintechwebagency.com/" target="_blank" rel="noopener noreferrer" className="text-theme ">
                        Grintech Web Agency.
                    </Link>
                    </p>
                    </div>

                </div>
            </footer>
        </>
    )
}

export default Footer