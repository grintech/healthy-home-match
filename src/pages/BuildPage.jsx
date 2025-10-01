import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { Link } from "react-router-dom";
import { BiSearchAlt2 } from "react-icons/bi";
import { useAuth } from "../context/AuthContext";
import api from "../utils/axios";
import LocationSearchInput from "../components/LocationSearchInput";
import { toast } from "react-toastify";
import BuildNewHouseForm from "./BuildNewHouseForm";
import RetrofitHouseForm from "./RetrofitHouseForm";
import { width } from "@fortawesome/free-solid-svg-icons/fa0";
import CTA from "../components/CTA";

const BuildPage = () => {
  const { user } = useAuth();

  const [showNewHouseForm, setShowNewHouseForm] = useState(false);
  const [showRetrofitForm, setShowRetrofitForm] = useState(false);

  const [builderData, setBuilderData] = useState([]);
  const [selectedBuilder, setSelectedBuilder] = useState(null);

  const [searchName, setSearchName] = useState("");
  const [filterLocation, setFilterLocation] = useState({ name: "", lat: "", lng: "" });
  const [filterSpecialisation, setFilterSpecialisation] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState(""); // New state for error display

  // ================== FETCH BUILDERS WITH FILTER ==================
  
  const fetchBuilders = async () => {
    try {
      setLoading(true);
      setErrorMessage("");
      const params = new URLSearchParams();
      params.append("page", page);
      if (searchName) params.append("name", searchName);
      if (filterLocation.lat && filterLocation.lng) {
        params.append("latitude", filterLocation.lat);
        params.append("longitude", filterLocation.lng);
      }
      if (filterSpecialisation.length > 0) {
        params.append("specialization", filterSpecialisation.join(","));
      }

      const res = await api.get(`/builders/listing?${params.toString()}`);
      if (res.data.success) {
        setBuilderData(res.data.data);
        if (!res.data.data || res.data.data.length === 0) {
          setErrorMessage(res.data.message || "No builders found matching your filters.");
        }
      } else {
        setBuilderData([]);
        setErrorMessage(res.data.message || "No builders found matching your filters.");
      }
    } catch (err) {
      console.error(err);
      setBuilderData([]);
      setErrorMessage("Error fetching builders");
    } finally {
      setLoading(false);
    }
  };
  

  useEffect(() => {
    fetchBuilders();
    // eslint-disable-next-line
  }, [page]);

  // ================== RESET FILTERS ==================
  const handleResetFilters = () => {
    setSearchName("");
    setFilterLocation({ name: "", lat: "", lng: "" });
    setFilterSpecialisation([]);
    setPage(1);
    fetchBuilders();
  };

 
  return (
    <>
      <Navbar />
      <div className="build-page">
        {/* Hero Section */}
        <section className="bg-light py-5">
          <div className="container">
            <div className="row align-items-center">
              <div className="col-lg-7 mb-5 mb-lg-0 text-md-start text-center">
                <h1 className="hero_title mb-3">
                  Find Trusted <span className="text-theme">Builders</span> to build your homes
                </h1>
                <p className="text-muted mb-4">
                  Discover top-rated builders, explore custom home designs, and start your home-building journey with confidence.
                </p>
                <div className="d-flex gap-2 flex-wrap">
                  <Link
                    // to="/register?builder"
                    className="btn ud-btn btn-white search_home_btn rounded-3 d-inline-flex"
                    onClick={() => setShowNewHouseForm(true)}
                  >
                    Want to Build a New House?
                  </Link>
                  <Link 
                  onClick={() => setShowRetrofitForm(true)}
                   className="btn ud-btn btn-white search_home_btn black_btn">
                    Want to Retrofy?
                  </Link>
                </div>
              </div>

              <div className="col-lg-5 text-center">
                <img src="/images/build.jpg" alt="Build Your Home" className="img-fluid rounded shadow" />
              </div>
            </div>
          </div>
        </section>

        <section id="builders" className="bg-lgreen">
          <div className="container py-5">
            <h2 className="text-center mb-4 sec-title">Explore Builders</h2>

            {/* Filters */}
            <div className="row mb-4 all_filters">
              {/* Name Search */}
              <div className="col-md-3 mb-2">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Search by name"
                  value={searchName}
                  onChange={(e) => setSearchName(e.target.value)}
                />
              </div>

              {/* Location Search */}
              <div className="col-md-4 mb-2 location_input">
                <LocationSearchInput
                  onSelect={(loc) => {
                    if (loc) setFilterLocation({ name: loc.description, lat: loc.lat, lng: loc.lng });
                    else setFilterLocation({ name: "", lat: "", lng: "" });
                  }}
                />
              </div>

              {/* Specialisation Multi-Checkbox Dropdown */}
              <div className="col-md-3 mb-2">
                <div className="dropdown w-100">
                  <button
                    className="btn btn-light border w-100 dropdown-toggle text-start"
                    type="button"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                  >
                    {filterSpecialisation.length > 0
                      ? filterSpecialisation.join(", ")
                      : "Select Specialisation"}
                  </button>
                  <ul
                    className="dropdown-menu p-2 w-100"
                    style={{ maxHeight: "200px", overflowY: "auto" }}
                  >
                    {[
                      "Luxury",
                      "Sustainable",
                      "Custom",
                      "Affordable",
                      "Industrial",
                      "Residential",
                      "Commercial",
                      "Civil",
                    ].map((spec) => (
                      <li key={spec} className="dropdown-item">
                        <label className="w-100">
                          <input
                            type="checkbox"
                            value={spec}
                            checked={filterSpecialisation.includes(spec)}
                            onChange={() =>
                              setFilterSpecialisation((prev) =>
                                prev.includes(spec)
                                  ? prev.filter((s) => s !== spec)
                                  : [...prev, spec]
                              )
                            }
                            className="form-check-input me-2"
                          />
                          {spec}
                        </label>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Reset + Apply Buttons */}
              <div className="col-md-2 mb-2 d-flex gap-2">
                <button
                  className="btn btn-green flex-fill"
                  onClick={handleResetFilters}
                >
                  Reset
                </button>
                <button
                  className="btn btn-theme flex-fill"
                  onClick={() => {
                    setPage(1);
                    fetchBuilders();
                  }}
                >
                  Apply
                </button>
              </div>
            </div>

            {/* Builders List */}
            <div className="row g-4">
              {loading ? (
                 <div  className="d-flex flex-column justify-content-center align-items-center py-4 px-3 shadow-smrounded-3"  >
                  <i className="fa-solid fa-home text-theme fs-1 loader-icon mb-2"></i>
                  <h6 className="text-center fw-bold ">Please wait...</h6>
                </div>
              ) : builderData.length > 0 ? (
                builderData.map((builder) => {
                  const name = builder?.user?.name || "Unnamed";
                  const location = builder?.location || "Location not provided";
                  const specialization = builder?.specialization
                    ? JSON.parse(builder.specialization)
                    : [];
                  const img = builder.profile_image
                    ? `https://${builder.profile_image}`
                    : "/images/builder/default.png";

                  return (
                    // <div key={builder.id} className="col-sm-6 col-md-4 col-xl-3">
                    //   <div className="card border-0 shadow-sm builder_card position-relative h-100">
                    //     <Link to={`/builder/${builder?.slug}`}>
                    //     <img
                    //       src={img}
                    //       className="card-img-top"
                    //       alt={name}
                    //       style={{ height: "200px", objectFit: "cover" }}
                    //     />
                    //     </Link>
                    //     <div className="card-body">
                         
                    //       <h6 className="fw-bold text-green text-truncate">{name}</h6>
                    //       <p className="card-text text-truncate">
                    //         <strong>Location:</strong> {location} <br />
                    //         <strong>Specialisation: </strong>
                    //         {specialization.join(", ")}
                    //       </p>
                    //     <Link to={`/builder/${builder?.slug}`}>
                    //       <button
                    //         className="btn ud-btn btn-white search_home_btn black_btn"
                    //       >
                    //         Know more
                    //       </button>
                    //       </Link>
                    //     </div>
                    //   </div>
                    // </div>



                <div key={builder.id} className="col-md-6 col-lg-4">
                  <div className="card border-0 shadow-sm builder_card p-3 h-100">
                    {/* Agency Name & ID */}
                    <div className="d-flex justify-content-between align-items-end">
                      <Link to={`/builder/${builder?.slug}`} >
                      <img src={img} style={{height:"70px", width:"70px"}} className="rounded-3 shadow-sm border"  alt={name} />
                      </Link>
                        <div>
                          <p className="text-muted  mb-1"><b>Builder ID:</b> BLD{builder?.id || "0001"}</p>
                            <div className="d-flex align-items-center ">
                            <i className="fa fa-star text-warning me-1"></i>
                            <span className="fw-semibold me-2">5.0</span>
                            <span className="text-muted small">(123 reviews)</span>
                          </div>
                        </div>
                    </div>
                    <Link to={`/builder/${builder?.slug}`} >
                    <h5 className="fw-bold text-theme py-2 text-truncate">{builder?.user?.name || "Builder Agency Name"}</h5>
                    </Link>

                    {/* Rating */}
                    

                    {/* Performance Stats */}
                    <div className="row mb-3">
                      <div className="col-sm-6 mb-2 mb-sm-0">
                        <h6 className="small fw-bold mb-1">Sales performance</h6>
                        <p className="small mb-0"><i className="fa-regular fa-home"></i> 108 Properties sold</p>
                      </div>
                      <div className="col-sm-6">
                        <h6 className="small fw-bold mb-1">Rent performance</h6>
                        <p className="small mb-0"><i className="fa-regular fa-home"></i> 32 Properties leased</p>
                      </div>
                    </div>

                    {/* Recently Sold/Completed Projects */}
                    <div className="mb-3">
                      <h6 className="text-dark mb-2 small fw-bold">Recently sold properties</h6>
                      <div className="d-flex gap-2">
                        {["/images/card1.jpg", "/images/card3.jpg", "/images/card2.jpg", "/images/card4.jpg"].map((src, index) => (
                          <img
                            key={index}
                            src={src}
                            alt={`build-${index}`}
                            className="rounded"
                            style={{ width: "50px", height: "50px", objectFit: "cover" }}
                          />
                        ))}
                      </div>
                    </div>

                    {/* Tags */}
                    <div className="mb-3">
                      {["Professional", "Trustworthy", "Reliable"].map((tag, i) => (
                        <span key={i} className="badge bg-secondary-subtle text-dark me-2">
                          {tag}
                        </span>
                      ))}
                    </div>

                    {/* CTA Buttons */}
                    <div className="d-flex gap-3 mt-3">
                      <button  data-bs-toggle="modal" data-bs-target="#contactModal" className="btn btn-sm btn-dark w-50">Contact</button>
                      <Link to={`/builder/${builder?.slug}`} className="btn btn-sm btn-theme w-50">Know more </Link>
                    </div>
                  </div>
                </div>

                  );
                })
              ) : (
                <div className="card border-0 d-flex flex-column justify-content-center align-items-center bg-light rounded-3 py-4 w-100">
                  <BiSearchAlt2 size={40} className="text-theme mb-2" />
                  <h6 className="fw-bold m-0">{errorMessage || "No builders found."}</h6>
                </div>
              )}
            </div>

             {/* Contact Modal */}
            <div
              className="modal fade"
              id="contactModal"
              tabIndex="-1"
              aria-hidden="true"
            >
              <div className="modal-dialog">
                <div className="modal-content">
                  <div className="modal-header">
                    <h5 className="fw-bold">
                      Contact {selectedBuilder?.name || "Builder"}
                    </h5>
                    <button
                      type="button"
                      className="btn-close"
                      data-bs-dismiss="modal"
                      aria-label="Close"
                    ></button>
                  </div>
                  <div className="modal-body">
                    <form>
                      <div className="mb-3">
                        <label className="form-label">Your Name</label>
                        <input type="text" className="form-control" placeholder="Enter your name" />
                      </div>
                      <div className="mb-3">
                        <label className="form-label">Your Email</label>
                        <input type="email" className="form-control" placeholder="Enter email address" />
                      </div>
                      <div className="mb-3">
                        <label className="form-label">Select Reason</label>
                         <select className="form-select" required>
                          <option value="">Select reason</option>
                          <option value="Project Enquiry">Project Enquiry</option>
                          <option value="visit-site">Visit Site</option>
                          <option value="Other">Other</option>
                          </select>
                        </div>
                      <div className="mb-3">
                        <label className="form-label">Message</label>
                        <textarea className="form-control" rows="3" placeholder="Write message..."></textarea>
                      </div>
                      <button type="submit" className="btn btn-sm btn-theme">
                        Send Message
                      </button>
                    </form>
                  </div>
                </div>
              </div>
            </div>
            
          </div>
        </section>

          <section className="py-5 bg-white">
            <div className="container text-center">
              <h2 className="sec-title mb-4">Why Build With Us?</h2>
              <div className="row justify-content-center g-4">
                <div className="col-sm-6 col-lg-4">
                    <div className="p-4 shadow-sm rounded bg-light h-100">
                    <div className="icon-circle bg-green text-white mx-auto mb-3 d-flex align-items-center justify-content-center" style={{ width: '60px', height: '60px', borderRadius: '50%' }}>
                        <i className="fas fa-shield-alt fs-3"></i>
                    </div>
                    <h5 className="mt-3 fw-bold">Trusted Builders</h5>
                    <p>We connect you with licensed and verified builders across Australia.</p>
                    </div>
                </div>

                <div className="col-sm-6 col-lg-4">
                    <div className="p-4 shadow-sm rounded bg-light h-100">
                    <div className="icon-circle bg-green text-white mx-auto mb-3 d-flex align-items-center justify-content-center" style={{ width: '60px', height: '60px', borderRadius: '50%' }}>
                        <i className="fas fa-building fs-3"></i>
                    </div>
                    <h5 className="mt-3 fw-bold">Custom Solutions</h5>
                    <p>From affordable homes to luxury designs, find builders that match your vision.</p>
                    </div>
                </div>

                <div className="col-sm-6 col-lg-4">
                    <div className="p-4 shadow-sm rounded bg-light h-100">
                    <div className="icon-circle bg-green text-white mx-auto mb-3 d-flex align-items-center justify-content-center" style={{ width: '60px', height: '60px', borderRadius: '50%' }}>
                        <i className="fas fa-leaf fs-3"></i>
                    </div>
                    <h5 className="mt-3 fw-bold">Sustainable Living</h5>
                    <p>Choose eco-friendly and energy-efficient builders for a healthier home.</p>
                    </div>
                </div>
              </div>
            </div>
        </section>
       
        <section className="py-5 bg-green">
            <div className="container text-center">
            <h2 className="sec-title text-white mb-4">How It Works – Your Dream Home Journey</h2>


            <div className="row align-items-center">

                <div className="col-lg-5 mb-4 mb-lg-0">
                    <img src="/images/how-work.jpg" className="w-100 rounded-3" alt="" />
                </div>

                <div className="col-lg-6 offset-lg-1">
                <div className="row g-4">
                    <div className="col-sm-6">
                    <div className="p-4 bg-white text-dark shadow-sm rounded h-100">
                        <span className="badge bg-theme fs-6">1</span>
                        <h6 className="mt-3 fw-bold">Search Builders</h6>
                        <p>Filter builders by location, type, and budget.</p>
                    </div>
                    </div>
                    <div className="col-sm-6">
                    <div className="p-4 bg-white text-dark shadow-sm rounded h-100">
                        <span className="badge bg-theme fs-6">2</span>
                        <h6 className="mt-3 fw-bold">Compare Options</h6>
                        <p>Check portfolios, reviews, and specialisations.</p>
                    </div>
                    </div>
                    <div className="col-sm-6">
                    <div className="p-4 bg-white text-dark shadow-sm rounded h-100">
                        <span className="badge bg-theme fs-6">3</span>
                        <h6 className="mt-3 fw-bold">Contact Builder</h6>
                        <p>Send enquiries directly from our platform.</p>
                    </div>
                    </div>
                    <div className="col-sm-6">
                    <div className="p-4 bg-white text-dark shadow-sm rounded h-100">
                        <span className="badge bg-theme fs-6">4</span>
                        <h6 className="mt-3 fw-bold">Start Building</h6>
                        <p>Begin your dream home journey with confidence.</p>
                    </div>
                    </div>
                </div>
                </div>
                
            </div>
            </div>
        </section>

        <CTA />     
        
      </div>
      <Footer />


      {/* Modal Form Component */}
      <BuildNewHouseForm show={showNewHouseForm} onClose={() => setShowNewHouseForm(false)} />

      <RetrofitHouseForm show={showRetrofitForm} onClose={() => setShowRetrofitForm(false)} />

    </>
  );
};

export default BuildPage;
