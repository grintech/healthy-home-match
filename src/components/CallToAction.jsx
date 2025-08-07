import React from 'react'
import { Link } from 'react-router-dom'

const CallToAction = () => {
  return (
   <>
        <section className="cta py-5 ">
        <div className="container">
              <div className="d-flex flex-column ">
              <h2 className=" mb-4 sec-title ">Next Step Toward Greener Living</h2>
              </div>
            <div className="row g-4 justify-content-center text-center">

            <div className="col-md-4">
                <div className="card text-center shadow-sm h-100 border-0 p-4">
                <div className="mb-3">
                    <i className="fas fa-home fa-2x"></i>
                </div>
                <h5 className="mb-2">List Your Property</h5>
                <p className="text-muted ">Showcase your eco-friendly home to the right audience.</p>
               <Link to="#" className="th-btn sm style3 pill position-relative" >Get Started</Link>
                </div>
            </div>

            <div className="col-md-4">
                <div className="card text-center shadow-sm h-100 border-0 p-4">
                <div className="mb-3 ">
                    <i className="fas fa-user-check fa-2x"></i>
                </div>
                <h5 className="mb-2">Join as a Verified Professional</h5>
                <p className="text-muted ">Become part of a trusted network of green professionals.</p>
               <Link to="#" className="th-btn sm style3 pill position-relative" >Join Now</Link>
                </div>
            </div>

            <div className="col-md-4">
                <div className="card text-center shadow-sm h-100 border-0 p-4">
                <div className="mb-3 ">
                    <i className="fas fa-envelope-open-text fa-2x"></i>
                </div>
                <h5 className="mb-2">Sign Up for Updates</h5>
                <p className="text-muted ">Stay informed about events, news, and resources.</p>
                <Link to="#" className="th-btn sm style3 pill position-relative" >Subscribe</Link>
                </div>
            </div>

            </div>
        </div>
        </section>

   </>
  )
}

export default CallToAction