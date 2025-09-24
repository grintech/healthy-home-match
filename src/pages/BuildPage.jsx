import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { Link } from "react-router-dom";
import { BiSearchAlt2 } from "react-icons/bi";
import { useAuth } from "../context/AuthContext";
import api from "../utils/axios";
import LocationSearchInput from "../components/LocationSearchInput";
import { toast } from "react-toastify";

const BuildPage = () => {
  const { user } = useAuth();
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

  const handleContactClick = (builder) => {
    if (!user) {
      toast.error("Please login to contact builder");
      return;
    }
    setSelectedBuilder(builder);
    const modal = new bootstrap.Modal(document.getElementById("contactModal"));
    modal.show();
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
                    to="/register?builder"
                    className="btn ud-btn btn-white search_home_btn rounded-3 d-inline-flex"
                  >
                    Register as a builder
                  </Link>
                  <a href="#builders" className="btn ud-btn btn-white search_home_btn black_btn">
                    Find a builder
                  </a>
                </div>
              </div>

              <div className="col-lg-5 text-center">
                <img src="/images/build.jpg" alt="Build Your Home" className="img-fluid rounded shadow" />
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


        {/* Builders Section */}
        <section id="builders">
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
                <div className="text-center w-100">Loading...</div>
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
                    <div key={builder.id} className="col-sm-6 col-md-4 col-xl-3">
                      <div className="card border-0 shadow-sm builder_card position-relative h-100">
                        <img
                          src={img}
                          className="card-img-top"
                          alt={name}
                          style={{ height: "200px", objectFit: "cover" }}
                        />
                        <div className="card-body">
                          <h6 className="fw-bold text-green text-truncate">{name}</h6>
                          <p className="card-text">
                            <strong>Location:</strong> {location} <br />
                            <strong>Specialisation: </strong>
                            {specialization.join(", ")}
                          </p>

                          <button
                            className="btn ud-btn btn-white search_home_btn black_btn"
                            onClick={() => handleContactClick(builder)}
                          >
                            Contact Builder
                          </button>
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
                        <input type="text" className="form-control" />
                      </div>
                      <div className="mb-3">
                        <label className="form-label">Your Email</label>
                        <input type="email" className="form-control" />
                      </div>
                      <div className="mb-3">
                        <label className="form-label">Message</label>
                        <textarea className="form-control" rows="3"></textarea>
                      </div>
                      <button type="submit" className="btn btn-theme">
                        Send Message
                      </button>
                    </form>
                  </div>
                </div>
              </div>
            </div>
            
          </div>
        </section>
      </div>
      <Footer />
    </>
  );
};

export default BuildPage;
