import React from 'react'
import Navbar from '../../components/Navbar'
import Footer from '../../components/Footer'
import './others.css'
import { Link } from 'react-router-dom'

const PageNotFound = () => {
  return (
    <div>
        <Navbar />
        <div className="page_not_found">
             <div className="container">
                <h1>4<span>0</span>4</h1>
                <h4 className='text-center'>The page you're looking for isn't available. Try to search again </h4>
                <Link to="/" className='btn ud-btn btn-white search_home_btn mt-4'>Back to home <i className="fa-solid fa-arrow-right"></i></Link>
            </div>   
        </div>
        <Footer />
    </div>
  )
}

export default PageNotFound