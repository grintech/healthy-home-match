import { useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const CheckoutPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [plan, setPlan] = useState(null);

  useEffect(() => {
  if (location.state?.plan) {
    setPlan(location.state.plan);
  } else {
    navigate("/pricing");
  }
}, [location.state, navigate]);


  return (
    <>
      <Navbar />

      <div className="checkout_page py-5">
        <div className="container">
          <h1 className="sec-title text-center mb-4">Checkout</h1>
          {plan && (
            <div className="row g-4">
              <div className="col-lg-6">
                <div className="card p-4 shadow-sm">
                  <h3 className="mb-3 sec-title">{plan.planName}</h3>
                  <h2 className="text-theme mb-3">
                    <b>{plan.price} </b><span className="text-muted fs-5">{plan.unit}</span>
                  </h2>
                  <p>{plan.description}</p>

                  <h5 className="mt-2 mb-2 fw-bold">Features:</h5>
                  <ul className="mt-3">
                    {plan?.features?.map((feat, i) => (
                      <li key={i}>{feat}</li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="col-lg-5 offset-lg-1">
                <div className="card p-4 shadow-sm">
                  <h5 className="mb-4 fw-bold">Select Payment Method</h5>
                <button className="btn btn-theme w-100 mb-3 d-flex align-items-center justify-content-center gap-2">
                  Pay with Stripe
                  <i className="fab fa-cc-stripe fs-5"></i>
                </button>

                <button className="btn btn-dark w-100 mb-3 d-flex align-items-center justify-content-center gap-2">
                  Pay with Razorpay
                  <i className="fas fa-money-check-alt fs-5"></i>
                </button>

                <button className="btn btn-dark w-100 d-flex align-items-center justify-content-center gap-2">
                  Pay with PayPal
                  <i className="fab fa-cc-paypal fs-5"></i>
                </button>

                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      <Footer />
    </>
  );
};

export default CheckoutPage;
