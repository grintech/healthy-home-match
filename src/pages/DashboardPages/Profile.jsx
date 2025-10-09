import { Link } from "react-router-dom";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import { useRef, useState, useEffect } from "react";
import { useAuth } from "../../context/AuthContext";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import { toast } from "react-toastify";
import DashSidebar from "./DashSidebar";

const Profile = () => {
  const fileInputRef = useRef(null);
  const { user } = useAuth();

  const [profileImage, setProfileImage] = useState("/images/default_img.png"); 
   const [showOld, setShowOld] = useState(false);
  const [showNew, setShowNew] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);


  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone_number: "",
    role: "",
    address: "",
    about_me: "",
  });

  useEffect(() => {
    if (user) {
      setFormData({
        name: user.name || "",
        email: user.email || "",
        phone_number: user.phone_number || "",
        role: user.role || "",
        address: user.address || "",
        about_me: user.about_me || "",
      });
    }
  }, [user]);


  /*--- Image upload remove functions ----*/

    const handleUploadClick = () => {
      fileInputRef.current.click();
    };

    const handleImageChange = (e) => {
      const file = e.target.files[0];
      if (file && file.type.startsWith("image/")) {
        if (file.size > 2 * 1024 * 1024) {
          toast.error("Image must be less than 2 MB.");
          return;
        }
        const imageURL = URL.createObjectURL(file);
        setProfileImage(imageURL);
      } else {
        toast.error("Please upload a valid image file (JPEG or PNG).");
      }
    };


  const handleRemoveImage = () => {
    setProfileImage("/images/default_img.png"); // reset to default or blank
    fileInputRef.current.value = null; 
  };

  /*--- Image upload remove functions ----*/


  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handlePhoneChange = (value, data) => {
    const countryCode = data.dialCode;
    const nationalNumber = value.replace(countryCode, '');
    const formattedNumber = `+${countryCode}-${nationalNumber}`;
    setFormData((prev) => ({
      ...prev,
      phone_number: formattedNumber,
    }));
  };



  return (
    <div className="user_dashboard">
      <Navbar />

      <div className="profile_page py-5">
        <div className="container">
          <div className="row ">
            <div className="col-lg-4 col-xl-3 mb-4 mb-lg-0">
              <DashSidebar />
            </div>
            <div className="col-lg-8 col-xl-9 mb-4 mb-lg-0 ">
              <h1 className="mb-0 sec-title">My Profile</h1>
              <div className="row mt-4">
                <div className="col-12 mb-4  ">
                  <div className="card border-0 h-100">
                    <h5 className="fw-semibold text_blue">Personal Details</h5>
                    <div className="d-flex align-items-end mt-3 profile_image_wrapper border-bottom pb-3">
                    <div className="profile_image position-relative me-4">
                      <img src={profileImage} className="w-100 h-100" alt="Profile Preview" />
                      {profileImage !== "/images/default_img.png" && (
                        <div
                          className="remove_profile"
                          data-bs-toggle="tooltip"
                        data-bs-placement="right"
                          data-bs-title="Delete Image"
                          onClick={handleRemoveImage}
                          style={{ cursor: "pointer" }}
                        >
                          <i className="fa-solid fa-trash"></i>
                        </div>
                      )}
                    </div>

                      <div>
                      <input
                        type="file"
                        id="upload_image"
                        ref={fileInputRef}
                        style={{ display: "none", visibility: "hidden" }}
                        onChange={handleImageChange} 
                      />

                        <button
                          className="btn ud-btn btn-white search_home_btn mb-2"
                          onClick={handleUploadClick}
                        >
                          Upload Image <i className="fas fa-upload"></i>
                        </button>
                        <p className="mb-0">
                          Image must be JPEG or PNG format and less than 2 MB.
                        </p>
                      </div>
                    </div>

                    <div className="row mt-4">
                      <div className="col-md-6 mb-4">
                        <label className=" mb-2">Full Name</label>
                        <input
                          type="text"
                          className="form-control"
                          name="name"
                          value={formData.name}
                          onChange={handleChange}
                          readOnly
                        />
                      </div>

                      <div className="col-md-6 mb-4">
                        <label className=" mb-2">Email</label>
                        <input
                          type="email"
                          className="form-control"
                          name="email"
                          value={formData.email}
                          onChange={handleChange}
                          readOnly
                        />
                      </div>

                      <div className="col-md-6 mb-4">
                        <label className=" mb-2">Phone Number</label>
                        <PhoneInput
                          country={"us"} 
                          value={formData.phone_number}
                          onChange={handlePhoneChange}
                          inputClass="form-control"
                           inputProps={{readOnly: true, }}
                        />
                      </div>

                      <div className="col-md-6 mb-4">
                        <label className=" mb-2">Role</label>
                        <input
                          type="text"
                          className="form-control"
                          name="role"
                          // value={formData.role}
                          value={formData.role === "4" ? "Buyer / Renter" : formData.role}
                          readOnly 
                        />
                      </div>

                      <div className="col-12 mb-4">
                        <label className=" mb-2">Full Address</label>
                        <input
                          type="text"
                          className="form-control"
                          name="address"
                          value={formData.address}
                          onChange={handleChange}
                          placeholder="#123 Main Street XYZ City"
                        />
                      </div>

                      <div className="col-12 mb-4">
                        <label className=" mb-2">About me</label>
                        <textarea
                          rows={5}
                          className="form-control"
                          name="about_me"
                          value={formData.about_me}
                          onChange={handleChange}
                          placeholder="Write about yourself..."
                        ></textarea>
                      </div>

                      <div className="d-flex justify-content-end">
                        <Link
                          className="btn ud-btn btn-white search_home_btn black_btn"
                          to="#"
                        >
                          Update Profile
                          <i className="fas fa-arrow-right-long"></i>
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="col-xl-6 d-flex flex-column mb-4 mb-xl-0">
                <div className="card border-0 card_height ">
                  <h5 className="fw-semibold text_blue">Social Media</h5>
                  <div className="row mt-3">
                    <div className="col-lg-6 mb-4">
                      <div>
                        <label htmlFor="" className=" mb-2">Facebook Url</label>
                        <input type="text" className="form-control" placeholder="https://facebook.com" />
                      </div>
                    </div>
                    <div className="col-lg-6 mb-4">
                      <div>
                        <label htmlFor="" className=" mb-2">Instagram Url</label>
                        <input type="text" className="form-control" placeholder="https://instagram.com" />
                      </div>
                    </div>
                    <div className="col-lg-6 mb-4">
                      <div>
                        <label htmlFor="" className=" mb-2">LinkedIn Url</label>
                        <input type="text" className="form-control"  placeholder="https://linkedin.com/in/your-profile" />
                      </div>
                    </div>
                    <div className="col-lg-6 mb-4">
                      <div>
                        <label htmlFor="" className=" mb-2">Website Url</label>
                        <input type="text" className="form-control" placeholder="https://website.com" />
                      </div>
                    </div>
                    <div className="d-flex justify-content-end">
                    <Link className="btn ud-btn btn-white search_home_btn black_btn " data-discover="true" to="#">Update Social <i className="fas fa-arrow-right-long"></i></Link>
                    </div>
                  </div>
                </div>
              </div>

               <div className="col-xl-6 d-flex flex-column mb-4 mb-xl-0">
                <div className="card border-0 card_height password_card">
                  <h5 className="fw-semibold text_blue">Change Password</h5>
                  <div className="row mt-3">
                    {/* Old Password */}
                    <div className="col-lg-6 mb-4 position-relative">
                      <label className="mb-2">Old Password</label>
                      <input
                        type={showOld ? "text" : "password"}
                        className="form-control "
                      />
                      <i
                        className={`fa ${showOld ? "fa-eye" : "fa-eye-slash"} position-absolute`}
                        onClick={() => setShowOld(!showOld)}
                      ></i>
                    </div>

                    {/* New Password */}
                    <div className="col-lg-6 mb-4 position-relative">
                      <label className="mb-2">New Password</label>
                      <input
                        type={showNew ? "text" : "password"}
                        className="form-control "
                      />
                      <i
                        className={`fa ${showNew ? "fa-eye" : "fa-eye-slash"} position-absolute`}
                        onClick={() => setShowNew(!showNew)}
                      ></i>
                    </div>

                    {/* Confirm Password */}
                    <div className="col-12 mb-4 position-relative">
                      <label className="mb-2">Confirm Password</label>
                      <input
                        type={showConfirm ? "text" : "password"}
                        className="form-control "
                      />
                      <i
                        className={`fa ${showConfirm ? "fa-eye" : "fa-eye-slash"} position-absolute`}
                        onClick={() => setShowConfirm(!showConfirm)}
                      ></i>
                    </div>

                    <div className="d-flex justify-content-end">
                      <Link className="btn ud-btn btn-white search_home_btn black_btn" to="#">
                        Update Password <i className="fas fa-arrow-right-long"></i>
                      </Link>
                    </div>
                  </div>
                </div>

               </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Profile;
