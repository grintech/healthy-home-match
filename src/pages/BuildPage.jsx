import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { Link } from "react-router-dom";
import { BiSearchAlt2 } from "react-icons/bi";
import { useAuth } from "../context/AuthContext";
import api from "../utils/axios";
import LocationSearchInput from "../components/LocationSearchInput";
import BuildNewHouseForm from "./BuildNewHouseForm";
import RetrofitHouseForm from "./RetrofitHouseForm";
import CTA from "../components/CTA";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";

const BuildPage = () => {
  const { user } = useAuth();
  const [selectedType, setSelectedType] = useState("build");

  const [showNewHouseForm, setShowNewHouseForm] = useState(false);
  const [showRetrofitForm, setShowRetrofitForm] = useState(false);

  const [builderData, setBuilderData] = useState([]);

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
               <p className="text-muted mb-4 fs-6">
                  Discover top-rated and verified builders near you who bring your dream home to life with quality craftsmanship and transparency. Explore modern and custom home designs, compare trusted professionals, and start your building journey with complete confidence. Whether you’re planning a new house from the ground up or upgrading your current one, we help you connect with the right experts every step of the way.
                </p>

                {/* <div className="d-flex gap-2 flex-wrap">
                  <Link
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
                </div> */}
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
                          <Link to={`/builder/${builder?.slug}`} className="btn btn-sm btn-theme w-50">Know More </Link>
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
            className="modal fade p-0"
            id="contactModal"
            tabIndex="-1"
            aria-hidden="true"
           >
            <div className="modal-dialog modal-dialog-centered">
              <div className="modal-content ">
                <form>

                <div className="modal-header">
                  <h5 className="fw-bold m-0">Contact Builder</h5>
                  <button
                    type="button"
                    className="btn-close"
                    data-bs-dismiss="modal"
                    aria-label="Close"
                  ></button>
                </div>

                  <div className="modal-body">
                      <div className="row">
                        {/* Radio buttons */}
                        <div className="col-12">
                          <div className="d-flex flex-wrap  mb-4 p-0">
                            <div className="form-check me-4">
                              <input
                                className="form-check-input"
                                type="radio"
                                name="radioDefault"
                                id="radioBuild"
                                value="build"
                                checked={selectedType === "build"}
                                onChange={() => setSelectedType("build")}
                              />
                              <label className="form-check-label" htmlFor="radioBuild">
                                Build a Healthy Home
                              </label>
                            </div>

                            <div className="form-check ">
                              <input
                                className="form-check-input"
                                type="radio"
                                name="radioDefault"
                                id="radioRetrofit"
                                value="retrofit"
                                checked={selectedType === "retrofit"}
                                onChange={() => setSelectedType("retrofit")}
                              />
                              <label className="form-check-label" htmlFor="radioRetrofit">
                                Retrofit a Home
                              </label>
                            </div>
                          </div>
                        </div>

                        {/* Common fields */}
                        <div className="col-12 mb-3 location_div">
                          <label className="form-label">Location / Postcode</label>
                          <LocationSearchInput />
                        </div>

                        <div className="col-sm-6 mb-3">
                          <label className="form-label">Property Type</label>
                          <select name="propertyType" className="form-select">
                            <option value="">Select</option>
                            <option value="house">House</option>
                            <option value="duplex">Duplex</option>
                            <option value="townhouse">Townhouse</option>
                            <option value="apartment">Apartment</option>
                            <option value="villa">Villa</option>
                            <option value="acreage">Acreage</option>
                            <option value="other">Other</option>
                          </select>
                        </div>

                        <div className="col-sm-6 mb-3">
                          <label className="form-label">Storey</label>
                          <select name="storey" className="form-select">
                            <option value="single">Single Storey</option>
                            <option value="double">Double Storey</option>
                          </select>
                        </div>

                        {/* Show only when Retrofit is selected */}
                        {selectedType === "retrofit" && (
                          <>
                            <div className="col-sm-6 mb-3">
                              <label className="form-label">Year Built</label>
                              <input
                                type="text"
                                name="yearBuilt"
                                className="form-control"
                                placeholder="e.g: 1950"
                                maxLength={4}
                              />
                            </div>

                            <div className="col-sm-6 mb-3">
                              <label className="form-label">Upgrade Type</label>
                              <select name="upgradeType" className="form-select">
                                <option value="">Select</option>
                                <option value="roof">Roof Repairs</option>
                                <option value="cracks">Cracks Fixing</option>
                                <option value="insulation">Wall / Roof Insulation</option>
                                <option value="solar">Solar Panels</option>
                              </select>
                            </div>
                          </>
                        )}

                        {/* Show only when Build New is selected */}
                        {selectedType === "build" && (
                          <>
                            <div className="col-sm-6 mb-3">
                              <label className="form-label">Energy Rating</label>
                              <select className="form-select" aria-label="Select energy rating">
                                <option value="">Select</option>
                                <option value="Passivhaus">Passivhaus</option>
                                <option value="NatHERS">NatHERS</option>
                                <option value="Green Star">Green Star</option>
                                <option value="5 Star">5 Star</option>
                                <option value="6 Star">6 Star</option>
                                <option value="7 Star">7 Star</option>
                                <option value="8 Star">8 Star</option>
                                <option value="9 Star">9 Star</option>
                                <option value="10 Star">10 Star</option>
                              </select>
                            </div>

                            <div className="col-sm-6 mb-3">
                              <label className="form-label">Budget (AUD)</label>
                              <input
                                type="text"
                                name="budget"
                                className="form-control"
                                placeholder="e.g. $50,000 - $100,000"
                              />
                            </div>
                          </>
                        )}

                        <div className="col-sm-6 mb-3">
                          <label className="form-label">Preferred Start Date</label>
                          <select name="startDate" className="form-select">
                            <option value="immediately">Immediately</option>
                            <option value="one-month">Within one month</option>
                            <option value="three-months">Within next three months</option>
                            <option value="six-months">Within next six months</option>
                            <option value="twelve-months">Within next twelve months</option>
                            <option value="notSure">Not sure</option>
                          </select>
                        </div>

                        <div className="col-sm-6 mb-3">
                          <label className="form-label">Your Name</label>
                          <input type="text" className="form-control" placeholder="Enter your name" />
                        </div>

                        <div className="col-sm-6 mb-3">
                          <label className="form-label">Your Email</label>
                          <input type="email" className="form-control" placeholder="Enter email address" />
                        </div>

                        <div className="col-sm-6 mb-3">
                          <label className="form-label">Phone Number</label>
                          <PhoneInput
                            country={"au"}
                            inputClass="form-control"
                            enableSearch={true}
                            searchPlaceholder="Search country"
                          />
                        </div>

                        <div className="col-12 mb-4">
                          <label className="form-label">Additional Note</label>
                          <textarea
                            className="form-control"
                            name="message"
                            rows={3}
                            placeholder="Message..."
                          ></textarea>
                        </div>

                      
                      </div>
                    
                  </div>

                 <div className="modal-footer">
                    <div className="col-12 text-center">
                        <button type="submit" className="btn btn-sm btn-theme">
                          Submit
                        </button>
                      </div>
                 </div>
                 </form>       

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
