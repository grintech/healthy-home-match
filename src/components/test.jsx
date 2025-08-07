import { Link } from "react-router-dom";
import "./auth.css";
import { useState } from "react";

const ResetPassword = () => {
  const ApiUrl = import.meta.env.VITE_API_URL;
   const [showPassword, setShowPassword] = useState(false);
   const [showPassword1, setShowPassword1] = useState(false);

  const togglePassword = () => {
    setShowPassword((prev) => !prev);
  };
  const togglePassword1 = () => {
    setShowPassword1((prev) => !prev);
  };
  
  
  return (
    <div className="login-container d-flex vh-100">
      {/* Left Side */}
      <div className="login-right d-flex flex-column align-items-center justify-content-center py-5 p-4 p-md-5 flex-grow-1">
        <div className="mx-auto w-100" style={{ maxWidth: "400px" }}>
          <div className="text-center">
            <Link to='/'><img src="/images/healthy_logo.png" className="mb-5" alt="Logo" /></Link>
          </div>

          <h1 className="mb-2 text-white">Reset Password </h1>
          <p className="mb-4">Enter your new password to reset.</p>

         

          <form >
           <div className="mb-3 position-relative form_fields">
              <label htmlFor="password" className="form-label">New Password</label>
              <input
                type={showPassword ? "text" : "password"}
                className="form-control"
                id="password"
                required
                placeholder="Enter your password"
              />
              <i
                className={`fa-solid ${showPassword ? "fa-eye" : "fa-eye-slash"}`}
                onClick={togglePassword}
                style={{ cursor: "pointer", right: "10px", position: "absolute", top: "38px" }}
              ></i>
            </div>

           <div className="mb-3 position-relative form_fields">
              <label htmlFor="password" className="form-label">Confirm Password</label>
              <input
                type={showPassword1 ? "text" : "password"}
                className="form-control"
                id="confirmpassword"
                required
                placeholder="Enter your password"
              />
              <i
                className={`fa-solid ${showPassword1 ? "fa-eye" : "fa-eye-slash"}`}
                onClick={togglePassword1}
                style={{ cursor: "pointer", right: "10px", position: "absolute", top: "38px" }}
              ></i>
            </div>

       
            <button type="submit" className=" submit_btn w-100 mt-2">Reset</button>
            

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
        <img src="/images/card3.jpg" className="w-100" alt="" />
      </div>
    </div>
  );
};

export default ResetPassword;
