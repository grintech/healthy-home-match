import { Link, useNavigate } from 'react-router-dom';


const plans = [
  {
    userType: 'Real Estate Agent',
    planName: 'Property Listing (For Sale)',
    price: '$299',
    unit: '/per listing',
    description: 'Post properties for sale and gain maximum exposure.',
    features: [
      "List unlimited properties for sale",
      "Upload up to 50 high-resolution images",
      "Add detailed floor plans & brochures",
      "SEO optimized property pages",
      "Priority placement in search results",
      "Lead capture with instant notifications",
      "Promote properties on homepage spotlight",
      "Customizable inquiry form",
      "Analytics dashboard for performance tracking",
      "Integration with CRM systems"
    ],
  },
  {
    userType: 'Real Estate Agent',
    planName: 'Property Listing (For Rent)',
    price: '$199',
    unit: '/per listing',
    description: 'List rental properties and attract the right tenants.',
    features: [
      "Unlimited rental property listings",
      "Tenant inquiry management system",
      "Featured listing in rental search",
      "Upload rental agreements & terms",
      "Automated rent estimate tool",
      "Option to highlight urgent rentals",
      "Integration with payment gateways",
      "Advanced tenant screening tools",
      "24/7 support for rental agents",
      "Rental analytics & reporting"
    ],
  },
  {
    userType: 'Builder',
    planName: 'Register as a Builder',
    price: '$299',
    unit: '/per year',
    description:'Showcase your projects, upcoming developments, and gain credibility.',
    features: [
      "Verified builder badge for trust",
      "Dedicated builder profile page",
      "Showcase unlimited past projects",
      "Highlight ongoing & upcoming projects",
      "Priority placement in builder directory",
      "Direct buyer & investor inquiries",
      "Project brochures & video uploads",
      "Marketing tools for project launches",
      "Monthly performance & lead reports",
      "Custom branding with your company logo"
    ],
  },
];



const PricingPlans = () => {
 const navigate = useNavigate();

  const handleSubscribe = (plan) => {
    navigate("/checkout", { state: { plan } });
  };

  return (
    <>
      <div className="plans_cards">
        <div className="row agency-details">
          {plans.map((plan, index) => (
            <div className="col-lg-4 col-md-6 mb-lg-0 mb-4" key={index}>
              <div className="card h-100 border-0 text-center">
                <h5 className="text-muted mb-3">{plan.userType}</h5>
                <h4 className="card-title mb-3 text-green">{plan.planName}</h4>
                <h3 className="text-theme mb-4">
                  <span>{plan.price}</span> {plan.unit}
                </h3>
                <p className="card-text">{plan.description}</p>
                <button
                  className="btn ud-btn btn-white search_home_btn mt-4"
                  onClick={() => handleSubscribe(plan)}
                >
                  Subscribe Now <i className="fas fa-arrow-right-long"></i>
                </button>
              </div>
            </div>
          ))}
        </div>
      </div> 
    </>
  );
};

export default PricingPlans;
