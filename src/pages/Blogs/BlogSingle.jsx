import React from 'react'
import Navbar from '../../components/Navbar'
import Footer from '../../components/Footer'
import { Link } from 'react-router-dom'

const BlogSingle = () => {
  return (
    <> 
      <Navbar />
      
      <div className="blog_single py-5">
        <div className="container">
          <h1 className='sec-title mb-2'>What to Look for in Your First Rental Property</h1>
          <div className="d-flex align-items-center mb-4">
            <p className='m-0 border-end pe-2'>Real Estate Tips</p>
            <p className='m-0 ps-2'>August 08, 2025</p>
          </div>
        </div>

        <img src="/images/blog-single.jpg" className='w-100 rounded-0 mb-5' alt="Rental Property Overview" />

        <div className="container">
          <div className="row ">
            <div className="col-lg-8">

              <div className='mb-5'>
                <h2>1. Location is Everything</h2>
                <p>When choosing your first rental property, location should be your top priority. Look for neighborhoods with low vacancy rates, proximity to schools, shopping centers, and public transport. These areas are more likely to attract long-term tenants and higher rental income.</p>
                <img src="/images/card4.jpg" className='w-100 mt-3 rounded-3 object-fit-cover' alt="Rental Location Map" />
              </div>

              <div className='mb-5'>
                <h2>2. Understand Your Budget</h2>
                <p>Calculate all potential costs including the down payment, repairs, property taxes, insurance, and ongoing maintenance. Don’t just focus on the purchase price — factor in hidden costs like HOA fees and local taxes to avoid surprises later.</p>
              </div>

              <div className='mb-5'>
                <h2>3. Evaluate the Property Condition</h2>
                <p>Check the structural condition of the building. Look out for warning signs like cracked walls, old roofing, plumbing issues, and electrical faults. It’s best to get a certified home inspector before making any purchase decisions.</p>
                <img src="/images/blog1.jpg" className='w-100 mt-3 rounded-3 object-fit-cover' alt="Property Inspection" />
              </div>

              <div className='mb-5'>
                <h2>4. Rental Yield & Cash Flow</h2>
                <p>Calculate the expected rental income vs. monthly expenses. Positive cash flow means your rental income should exceed the cost of mortgage and other expenses. Look for properties with strong rental demand and fair rental rates.</p>
              </div>

              <div className='mb-5'>
                <h2>5. Think Long-Term</h2>
                <p>Rental property isn’t just a short-term investment. Think about appreciation potential, neighborhood development plans, and whether the property can still meet your financial goals 5–10 years from now.</p>
                <img src="/images/blog4.jpg" className='w-100 mt-3 rounded-3 object-fit-cover' alt="Long-term real estate value" />
              </div>

              <div className='mb-5'>
                <h2>6. Hire a Property Manager</h2>
                <p>If you don’t plan to manage the property yourself, a good property management company can save you time and hassle. They handle tenant screening, rent collection, maintenance, and legal issues.</p>
              </div>

              <div className='mb-5'>
                <h2>Final Thoughts</h2>
                <p>Buying your first rental property can be a rewarding investment if done right. Be patient, do your research, and consult with real estate experts before jumping in. Remember, the goal is not just to own property — it's to create consistent, long-term income.</p>
              </div>

            </div>

             <div className="col-lg-4 ">
              <div className="enquiry_section h-100">
                    <div className="card mb-0 overview_card border-0 ">
                    <h5 className="single_head mb-4">Leave A Review</h5>

                    <form className='review_form'>
                         <input
                         type="email"
                         className="form-control mb-3"
                         placeholder="Enter Email"
                         />

                         <input
                         type="text"
                         className="form-control mb-3"
                         placeholder="Enter Title"
                         />

                         <select className="form-select mb-3" aria-label="Default select example">
                            <option selected>Select Rating</option>
                            <option value="1">One Star</option>
                            <option value="2">Two Star</option>
                            <option value="3">Three Star</option>
                            <option value="4">Four Star</option>
                            <option value="5">Five Star</option>
                         </select>
                                            
                        <textarea
                          className="form-control mb-3"
                          placeholder="Write your review..."
                          rows={4}
                        ></textarea>

                        <button className="btn ud-btn btn-white search_home_btn w-100"> Submit Review <i className="fa-solid fa-arrow-right"></i></button>
                    </form>
                    </div>
                    
              </div>
            </div>

           
          </div>
        </div>
      </div>

      <Footer />
    </>
  )
}

export default BlogSingle;
