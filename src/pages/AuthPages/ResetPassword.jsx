import { Link, useSearchParams, useNavigate } from "react-router-dom";
import "./auth.css";
import { useState } from "react";
import axios from "axios";

const ResetPassword = () => {
  const ApiUrl = import.meta.env.VITE_API_URL;
  const [showPassword, setShowPassword] = useState(false);
  const [showPassword1, setShowPassword1] = useState(false);
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const [successMsg, setSuccessMsg] = useState("");
  const [loading, setLoading] = useState(false);

  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const token = searchParams.get("token");
  const email = searchParams.get("email");

  const togglePassword = () => {
    setShowPassword((prev) => !prev);
  };
  const togglePassword1 = () => {
    setShowPassword1((prev) => !prev);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMsg("");
    setSuccessMsg("");

    if (!token || !email) {
      setErrorMsg("Invalid or missing reset token or email.");
      return;
    }

    if (password !== confirmPassword) {
      setErrorMsg("Passwords do not match.");
      return;
    }

    try {
      setLoading(true);
      const response = await axios.post(`${ApiUrl}/reset-password`, {
        token,
        email,
        password,
        password_confirmation: confirmPassword,
      });

      setSuccessMsg(response.data.message || "Password reset successfully.");
      setTimeout(() => {
        navigate("/login");
      }, 2000);
    } catch (err) {
      const msg = err.response?.data?.message || "Something went wrong.";
      setErrorMsg(msg);
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

          <h1 className="mb-2 text-white">Reset Password</h1>
          <p className="mb-4">Enter your new password to reset.</p>

          <form onSubmit={handleSubmit}>
            <div className="mb-3 position-relative form_fields">
              <label htmlFor="password" className="form-label">New Password</label>
              <input
                type={showPassword ? "text" : "password"}
                className="form-control"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
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
              <label htmlFor="confirmpassword" className="form-label">Confirm Password</label>
              <input
                type={showPassword1 ? "text" : "password"}
                className="form-control"
                id="confirmpassword"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
                placeholder="Confirm your password"
              />
              <i
                className={`fa-solid ${showPassword1 ? "fa-eye" : "fa-eye-slash"}`}
                onClick={togglePassword1}
                style={{ cursor: "pointer", right: "10px", position: "absolute", top: "38px" }}
              ></i>
            </div>

           

            <button type="submit" className="submit_btn w-100 mt-2" disabled={loading}>
              {loading ? "Resetting..." : "Reset"}
            </button>

            <div className="py-2">
               {errorMsg && <div className="alert alert-danger py-2">{errorMsg}</div>}
               {successMsg && <div className="alert alert-success py-2">{successMsg}</div>}
            </div>

            <p className="mt-3 text-center">
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

export default ResetPassword;
