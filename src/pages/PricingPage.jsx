import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import CTA from '../components/CTA';
import Footer from '../components/Footer';

const plans = [
  {
    userType: 'Real Estate Agent',
    planName: 'Property Listing (For Sale)',
    price: '$299',
    unit: '/per listing',
    description: 'Post properties for sale and gain maximum exposure.',
  },
  {
    userType: 'Real Estate Agent',
    planName: 'Property Listing (For Rent)',
    price: '$199',
    unit: '/per listing',
    description: 'List rental properties and attract the right tenants.',
  },
  {
    userType: 'Verified Professional',
    planName: 'Directory Listing',
    price: '$9.99',
    unit: '/per month',
    description: 'Appear in our directory and connect with clients.',
  },
 
];

const PricingPage = () => {
  return (
    <>
     <Navbar />

     <div className="pricing_page">
        <div className="container py-5">
            <h1 className="sec-title ">Subscription Plans</h1>
            <div className="breadcumb-list">
              <Link to="/">Home</Link>
              <span className='mx-1'>/</span>
              <Link to="/pricing">Plans</Link>
            </div>

            <div className="plans_cards mt-5">
              <div className="row agency-details">
                {plans.map((plan, index) => (
                <div className="col-lg-4 col-md-6 mb-lg-0 mb-4" key={index}>
                  <div className="card h-100 border-0">
                    <div className="text-center">
                      <h5 className="text-muted mb-3">{plan.userType}</h5>
                      <h4 className="card-title mb-3">{plan.planName}</h4>
                      <h3 className="text-theme mb-4"><span>{plan.price}</span>{plan.unit}</h3>
                      <p className="card-text">{plan.description}</p>
                      <Link className="btn ud-btn btn-white search_home_btn mt-4"  data-discover="true">Subscribe Now <i className="fas fa-arrow-right-long"></i></Link>
                    </div>
                  </div>
                </div>
                ))}
              </div>
            </div>
        </div>

        <CTA />
     </div>

     <Footer />

    </>
  );
};

export default PricingPage;
