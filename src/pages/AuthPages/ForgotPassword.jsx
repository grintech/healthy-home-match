import { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import "./auth.css";

const ForgotPassword = () => {
  const ApiUrl = import.meta.env.VITE_API_URL;

  const [email, setEmail] = useState("");
  const [successMsg, setSuccessMsg] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSuccessMsg("");
    setErrorMsg("");
    setLoading(true);

    try {
      const res = await axios.post(`${ApiUrl}/forgot-password`, { email });
      setSuccessMsg(res.data?.message || "Reset link sent to your email.");
    } catch (err) {
      const error =
        err.response?.data?.message || "Something went wrong. Please try again.";
      setErrorMsg(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-container d-flex vh-100">
      {/* Left Side */}
      <div className="login-right d-flex flex-column align-items-center justify-content-center py-5 p-4 p-md-5 flex-grow-1">
        <div className="mx-auto w-100" style={{ maxWidth: "400px" }}>
          <div className="text-center">
            <Link to="/">
              <img src="/images/healthy_logo.png" className="mb-5" alt="Logo" />
            </Link>
          </div>

          <h1 className="mb-2 text-white">Forgot Password?</h1>
          <p className="mb-4">Enter your registered email for verification.</p>

          <form onSubmit={handleSubmit}>
            <div className="mb-3 position-relative form_fields">
              <label htmlFor="email" className="form-label">Email address</label>
              <input
                type="email"
                className="form-control"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                placeholder="Enter your email"
              />
              <i className="fa-regular fa-envelope"></i>
            </div>


            <button type="submit" className="mb-2 submit_btn w-100" disabled={loading}>
              {loading ? (
                <>
                  <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                  Submitting...
                </>
              ) : (
                "Submit"
              )}
            </button>

             {/* Show messages */}
            <div className="py-2">
              {errorMsg && <div className="alert alert-danger py-2">{errorMsg}</div>}
              {successMsg && <div className="alert alert-success py-2">{successMsg}</div>}
            </div>

            <p className="mt-4 text-center">
              Return to &nbsp;
              <Link to="/login" className="text-theme text-semibold">Sign In</Link>
            </p>

            <p className="text-center mt-4 copyright">
              © 2025 Healthy Home Match. All Rights Reserved.
            </p>
          </form>
        </div>
      </div>

      {/* Right Side */}
      <div className="login-left d-md-flex flex-column justify-content-center align-items-center text-white">
        <img src="/images/card3.jpg" className="w-100" alt="property_image" />
      </div>
    </div>
  );
};

export default ForgotPassword;
