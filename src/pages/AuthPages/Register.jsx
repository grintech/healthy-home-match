import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import "./auth.css";

const Register = () => {
  const ApiUrl = import.meta.env.VITE_API_URL;
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);


  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone_number: "",
    password: "",
    password_confirmation: "",
    role: "",
  });

  const [errorMsg, setErrorMsg] = useState("");
  const [successMsg, setSuccessMsg] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // const handlePhoneChange = (value) => {
  //   setFormData((prev) => ({ ...prev, phone_number: value }));
  // };

  const handlePhoneChange = (value, data) => {
    // Extract country code and national number
    const countryCode = data.dialCode; 
    const nationalNumber = value.replace(countryCode, ''); 
    
    // Format like +91-7876345533
    const formattedNumber = `+${countryCode}-${nationalNumber}`;
    
    setFormData((prev) => ({
      ...prev,
      phone_number: formattedNumber
    }));

 };


  const togglePassword = () => {
    setShowPassword((prev) => !prev);
  };

  const toggleConfirmPassword = () => {
    setShowConfirmPassword((prev) => !prev);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMsg("");
    setSuccessMsg("");
    setLoading(true); 

    const form = new FormData();
    for (let key in formData) {
      form.append(key, formData[key]);
    }

    try {
      const res = await axios.post(`${ApiUrl}/register`, form, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      const { message } = res.data;

      setSuccessMsg(message || "Registered successfully. Redirecting to login...");
      setTimeout(() => navigate("/login"), 2000);
    } catch (err) {
      const errors = err.response?.data?.errors;
      if (errors?.email) {
        setErrorMsg(errors.email[0]);
      } else if (errors?.phone_number) {
        setErrorMsg(errors.phone_number[0]);
      } else {
        setErrorMsg("Registration failed. Please try again.");
      }
    } finally {
      setLoading(false); 
    }
 };


  return (
    <div className="login-container d-flex vh-100">
      {/* Left Side */}
      <div className="login-right d-flex flex-column py-5 p-4 p-md-5 flex-grow-1">
        <div className="mx-auto w-100" style={{ maxWidth: "400px" }}>
          <div className="text-center">
            <Link to='/'>
            <img src="/images/healthy_logo.png" className="mb-5" alt="Logo" />
            </Link>
          </div>

          <h1 className=" mb-2 text-white">Register</h1>
          <p className="mb-4">Welcome! Sign up to access Healthy Home Match</p>

          <form onSubmit={handleSubmit}>
            {/* Role radio */}
            <div className="row role_checks mb-4">

              {[
                { value: "4", label: "Buyer" },
                { value: "2", label: "Property Owner" },
                { value: "3", label: "Verified Professional" },
              ].map((role, index) => (
                <div key={index} className="col-lg-4 col-6 mb-2 mb-lg-0">
                  <div className="form-check h-100">
                    <input
                      className="form-check-input"
                      type="radio"
                      name="role"
                      value={role.value}
                      onChange={handleChange}
                      required
                    />
                    <label className="form-check-label">{role.label}</label>
                  </div>
                </div>
              ))}

            </div>

            {/* Name */}
            <div className="mb-3 position-relative form_fields">
              <label className="form-label">Full Name</label>
              <input
                type="text"
                className="form-control"
                name="name"
                placeholder="Enter your name"
                onChange={handleChange}
                required
              />
              <i className="fa-regular fa-user"></i>
            </div>

            {/* Email */}
            <div className="mb-3 position-relative form_fields">
              <label className="form-label">Email address</label>
              <input
                type="email"
                className="form-control"
                name="email"
                placeholder="Enter your email"
                onChange={handleChange}
                required
              />
              <i className="fa-regular fa-envelope"></i>
            </div>

            {/* Phone */}
            <div className="mb-3 position-relative form_fields">
              <label className="form-label">Phone Number</label>
              <PhoneInput
                country={"us"}
                value={formData.phone_number}
                onChange={handlePhoneChange}
                inputClass="form-control"
              />
              <i className="fa-solid fa-phone"></i>
            </div>

            {/* Password */}
            <div className="mb-3 position-relative form_fields">
              <label className="form-label">Password</label>
              <input
                type={showPassword ? "text" : "password"}
                className="form-control"
                name="password"
                placeholder="Enter your password"
                onChange={handleChange}
                required
              />
              <i
                className={`fa-solid ${showPassword ? "fa-eye" : "fa-eye-slash"}`}
                style={{ cursor: "pointer" }}
                onClick={togglePassword}
              ></i>
            </div>

            {/* Confirm Password */}
            <div className="mb-4 position-relative form_fields">
              <label className="form-label">Confirm Password</label>
              <input
                type={showConfirmPassword ? "text" : "password"}
                className="form-control"
                name="password_confirmation"
                placeholder="Confirm password"
                onChange={handleChange}
                required
              />
              <i
                className={`fa-solid ${showConfirmPassword ? "fa-eye" : "fa-eye-slash"}`}
                style={{ cursor: "pointer" }}
                onClick={toggleConfirmPassword}
              ></i>
            </div>

            <div className="d-flex justify-content-between align-items-center mb-3">
              <p>
                By signing up, you agree to our &nbsp;
                <Link to="#" className="text-white text-semibold text-underline">Terms of Use</Link> and <Link to="#" className="text-white text-semibold text-underline">Privacy Policy</Link>.
              </p>
            </div>

            <button type="submit" className="submit_btn w-100" disabled={loading}>
              {loading ? (
                <>
                  <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                  Signing Up...
                </>
              ) : (
                "Sign Up"
              )}
            </button>


            <div className="py-2">
              {errorMsg && <div className="alert alert-danger py-2">{errorMsg}</div>}
              {successMsg && <div className="alert alert-success py-2">{successMsg}</div>}
            </div>

            <p className="mt-4">
              Already have an account?&nbsp;
              <Link to="/login" className="text-theme text-semibold">Sign In Instead</Link>
            </p>

            <p className="text-center mt-5 copyright">
               © 2025 by Healthy Home Match. All Rights Reserved.
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

export default Register;
