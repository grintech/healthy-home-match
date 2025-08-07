import React from 'react'
import { Link } from 'react-router-dom'
import '../pages/OtherPages/others.css'

const CTA = () => {
  return (
    <>
        <div className="out_cta mb-5">
                <div className="container">
                    <div className="row align-items-center">
                        <div className="col-lg-7 col-xl-6 mb-4 mb-lg-0">
                            <div className="cta-style1"><h2 className="cta-title">Need help? Talk to our expert.</h2><p className="cta-text mb-0">Talk to our experts or Browse through more properties.</p></div>
                        </div>
                        <div className="col-lg-5 col-xl-6">
                            <div className="d-block d-sm-flex align-items-center justify-content-lg-end gap-3 contact_btns">
                                 <Link to="/contact" className='btn ud-btn  contact_btn_light '>Contact Us <i className="fa-solid fa-arrow-right"></i></Link>

                                 <a href="tel:+1234567890" className="btn ud-btn contact_btn_light2">
                                    <i className="fa-solid fa-phone me-1 ms-0"></i> +123 4567890
                                </a>

                            </div>
                        </div>
                    </div>
                </div>
            </div>
    </>
  )
}

export default CTA