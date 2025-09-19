import { useState } from "react";
import { Link, useNavigate ,useLocation } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import "./auth.css";
import api from "../../utils/axios";

const Login = () => {
  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [showPassword, setShowPassword] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [successMsg, setSuccessMsg] = useState("");

  const [loading, setLoading] = useState(false);
  const [showResendLink, setShowResendLink] = useState(false);



  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData((prev) => ({ ...prev, [id]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMsg("");
    setSuccessMsg("");
    setLoading(true);

    try {
      const response = await api.post(`/login`, formData);
      const { token, user, message } = response.data;

      if (token && user) {
        login({ token, user });
        setSuccessMsg(message || "Login successful.");

        // get where user came from, default to home
        const from = location.state?.from?.pathname || location.state?.from ||  "/";
        console.log("Location state:", location.state);

        setTimeout(() => {
          navigate(from, { replace: true });
        }, 2000);
      } else {
        setErrorMsg("Invalid login response.");
      }
    } catch (err) {
      const resData = err.response?.data;
      const error =
        resData?.message || resData?.error || "Login failed. Please try again.";
      setErrorMsg(error);

      if (error === "Email not verified.") {
        setShowResendLink(true);
      } else {
        setShowResendLink(false);
      }
    } finally {
      setLoading(false);
    }
  };


// Resend Email API
const handleResendVerification = async () => {
  setSuccessMsg("");
  setErrorMsg("");
  try {
    const res = await api.post(`/resend-verification`, {
      email: formData.email
    });
    setSuccessMsg(res.data?.message || "Verification email resent.");
  } catch (error) {
    const errMsg = error.response?.data?.message || "Something went wrong.";
    setErrorMsg(errMsg);
  }
};



  const togglePassword = () => {
    setShowPassword((prev) => !prev);
  };

  return (
    <div className="login-container d-flex vh-100">
      {/* Left Side */}
      <div className="login-right d-flex flex-column align-items-center justify-content-center py-5 p-4 p-md-5 flex-grow-1">
        <div className="mx-auto w-100" style={{ maxWidth: "400px" }}>
          <div className="text-center">
            <Link to='/'>
             <img src="/images/healthy_logo.png" className="mb-5" alt="Logo" />
            </Link>
          </div>

          <h1 className=" mb-2 text-white">Sign in</h1>
          <p className="mb-4">Welcome back! Sign in to access Healthy Home Match</p>

         

          <form onSubmit={handleSubmit}>
            <div className="mb-3 position-relative form_fields">
              <label htmlFor="email" className="form-label">Email address</label>
              <input
                type="email"
                className="form-control"
                id="email"
                value={formData.email}
                onChange={handleChange}
                required
                placeholder="Enter your email"
              />
              <i className="fa-regular fa-envelope"></i>
            </div>

            <div className="mb-3 position-relative form_fields">
              <label htmlFor="password" className="form-label">Password</label>
              <input
                type={showPassword ? "text" : "password"}
                className="form-control"
                id="password"
                value={formData.password}
                onChange={handleChange}
                required
                placeholder="Enter your password"
              />
              <i
                className={`fa-solid ${showPassword ? "fa-eye" : "fa-eye-slash"}`}
                onClick={togglePassword}
                style={{ cursor: "pointer", right: "10px", position: "absolute", top: "38px" }}
              ></i>
            </div>

            <div className="d-flex justify-content-between align-items-center mb-4">
              <div className="form-check">
                <input type="checkbox" className="form-check-input" id="remember"  />
                <label className="form-check-label text-white remember_label"  htmlFor="remember">Remember me</label>
              </div>
              <Link to="/forgot-password" className="text-decoration-none small forget_pass text-theme text-underline">Forgot password?</Link>
            </div>

            {/* <button type="submit" className=" submit_btn w-100">Sign In</button> */}

            
             {showResendLink && (
              <div
                className="text-decoration-none small forget_pass text-theme resend_link mb-2"
                style={{ cursor: "pointer" }}
                onClick={handleResendVerification}
              >
                <small>Resend Verification Link <i className="fa-solid fa-rotate"></i></small>
              </div>
            )}


            <button type="submit" className=" submit_btn w-100 mt-2" disabled={loading}>
            {loading ? (
              <>
                <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                Signing In...
              </>
            ) : (
              "Sign In"
            )}
          </button>


            <div className="py-2">
               {errorMsg && <div className="alert alert-danger py-2">{errorMsg}</div>}
               {successMsg && <div className="alert alert-success py-2">{successMsg}</div>}
            </div>

            <p className="mt-4">
              New on our platform?&nbsp;
              <Link to="/register" className="text-theme text-semibold">Create an account.</Link>
            </p>

            <p className="text-center mt-5 copyright">
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

export default Login;
