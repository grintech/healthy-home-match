import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import CTA from '../components/CTA';
import Footer from '../components/Footer';
import PricingPlans from '../components/PricingPlans';



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

           <PricingPlans />
        </div>

        <CTA />
     </div>

     <Footer />

    </>
  );
};

export default PricingPage;
