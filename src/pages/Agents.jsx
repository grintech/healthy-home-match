import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { Link } from "react-router-dom";
import Slider from "rc-slider";
import "rc-slider/assets/index.css";
import axios from "axios";
import AgentCardSkeleton from "../components/skeletons/AgentCardSkeleton";
import LocationSearchInput from "../components/LocationSearchInput";

const Agents = () => {
  const ApiUrl = import.meta.env.VITE_API_URL;
  const DEFAULT_RANGE = [0, 1800000];

  const [agents, setAgents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [priceRange, setPriceRange] = useState(DEFAULT_RANGE);
  const [specialties, setSpecialties] = useState([]);

  const [location, setLocation] = useState(null);
  const [agentName, setAgentName] = useState("");



  const [pagination, setPagination] = useState({
    current_page: 1,
    last_page: 1,
  });

  const toggleSpecialty = (option) => {
    setSpecialties((prev) =>
      prev.includes(option)
        ? prev.filter((s) => s !== option)
        : [...prev, option]
    );
  };

  const fetchAgents = async (page = 1, filters = {}) => {
    try {
      setLoading(true);
      const params = new URLSearchParams();
      params.append("page", page);

      if (filters.price_min !== undefined) params.append("price_min", filters.price_min);
      if (filters.price_max !== undefined) params.append("price_max", filters.price_max);
      if (filters.specialty?.length > 0) params.append("specialty", filters.specialty.join(","));

      if (filters.latitude) params.append("latitude", filters.latitude);
      if (filters.longitude) params.append("longitude", filters.longitude);
      if (filters.name) params.append("name", filters.name);



      const res = await axios.get(`${ApiUrl}/agents/listing/?${params.toString()}`, {
        headers: {
          "X-API-DOMAIN": "$2y$10$Vs8ujkh6QGdPgRU4Qsub7uP6l8fu5deHcfhF/ePrPWOkVWi3lDT0u",
        },
      });

      if (res.data.success) {
        setAgents(res.data.data);
        setPagination(res.data.pagination);
      } else {
        setAgents([]);
      }
    } catch (err) {
      console.error("API Error:", err);
      setAgents([]);
    } finally {
      setLoading(false);
    }
  };

  const applyFilters = () => {
    const filters = {};
    if (priceRange[0] !== DEFAULT_RANGE[0] || priceRange[1] !== DEFAULT_RANGE[1]) {
      filters.price_min = priceRange[0];
      filters.price_max = priceRange[1];
    }
    if (specialties.length > 0) filters.specialty = specialties;

    if (location?.lat && location?.lng) {
      filters.latitude = location.lat;
      filters.longitude = location.lng;
    }

    if (agentName.trim() !== "") {
      filters.name = agentName.trim();
    }


    fetchAgents(1, filters);

    // Close dropdowns
    document.querySelectorAll(".dropdown-menu.show").forEach((menu) => menu.classList.remove("show"));
    document.querySelectorAll(".dropdown-toggle.show").forEach((btn) => {
      btn.classList.remove("show");
      btn.setAttribute("aria-expanded", "false");
    });
  };

  const resetFilters = () => {
    setPriceRange(DEFAULT_RANGE);
    setSpecialties([]);
    fetchAgents();
  };

  useEffect(() => {
    fetchAgents();
  }, []);

  return (
    <div className="all_agents_page">
      <Navbar />
      <div className="cta-agency cta-agent">
        <div className="container">
          <h1 className="sec-title mb-4">Real estate agents</h1>
          <form
            className="search_agent_form"
            onSubmit={(e) => {
              e.preventDefault();
              applyFilters();
            }}
          >
            <div className="row justify-content-center">
              <div className="col-lg-6 col-md-5 mb-3 mb-lg-0">
                {/* <input type="text" className="form-control" placeholder="City, Province, State , Zipcode" /> */}
                <LocationSearchInput onSelect={(loc) => setLocation(loc)}  />
              </div>
              <div className="col-lg-4 col-md-4 mb-3 mb-lg-0">
                <input type="text" className="form-control" placeholder="Agent Name"
                value={agentName}
                onChange={(e) => setAgentName(e.target.value)}
                />
              </div>
              <div className="col-lg-2 col-md-3 col-6 mb-3 mb-lg-0">
                <button type="submit" className="btn btn-theme w-100">
                  <i className="fa-solid fa-magnifying-glass"></i> Find agent
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>

      <div className="all_agents py-4">
        <div className="container">
          <div className="agents_section py-4">
            <div className="agent_filter_tabs d-flex align-items-center gap-3 flex-wrap mb-4">
              {/* Price Filter */}
              <div className="dropdown">
                <button className="btn btn-light dropdown-toggle" type="button" data-bs-toggle="dropdown">
                  Price Range
                </button>
                <div className="dropdown-menu p-3" style={{ minWidth: "250px" }} onClick={(e) => e.stopPropagation()}>
                  <div className="d-flex justify-content-between mb-2">
                    <span>${priceRange[0].toLocaleString()}</span>
                    <span>${priceRange[1] >= 1800000 ? "1.8M+" : priceRange[1].toLocaleString()}</span>
                  </div>
                  <Slider range min={0} max={1800000} step={5000} value={priceRange} onChange={setPriceRange} />
                  <button className="btn btn-active w-100 mt-3" onClick={applyFilters}>
                    Apply
                  </button>
                </div>
              </div>

              {/* Specialty Filter */}
              <div className="dropdown">
                <button className="btn btn-light dropdown-toggle" type="button" data-bs-toggle="dropdown">
                  Specialty
                </button>
                <ul className="dropdown-menu p-2" onClick={(e) => e.stopPropagation()}>
                  {["First Time Buyers", "Rental", "Luxury Homes", "New Construction", "Land"].map((option) => (
                    <li key={option}>
                      <label className="dropdown-item d-flex align-items-center">
                        <input type="checkbox" checked={specialties.includes(option)} onChange={() => toggleSpecialty(option)} className="me-2" />
                        {option}
                      </label>
                    </li>
                  ))}
                  <li>
                    <button className="btn btn-active w-100 mt-2" onClick={applyFilters}>
                      Apply
                    </button>
                  </li>
                </ul>
              </div>

              <Link onClick={resetFilters} className="text-theme">
                <i className="fa-solid fa-rotate"></i> Reset all filters
              </Link>
            </div>

            {/* Agents List */}
            {!loading && agents.length > 0 && <h6 className="fw-bold mb-3">({pagination.total}) Agents Found</h6>}

            {loading ? (
              <div className="row g-4 g-xxl-5">
                {[...Array(4)].map((_, i) => (
                  <AgentCardSkeleton key={i} />
                ))}
              </div>
            ) : agents.length > 0 ? (
              <>
                <div className="row g-4 g-xxl-5">
                  {agents.map((agent) => (
                    <div key={agent.id} className="col-lg-3 col-md-4 col-6 single-agent-card">
                      <div className="item agent_card h-100">
                        <Link to={`/agent/${agent.slug}`}>
                          <div className="team-style1">
                            <div className="team-img">
                              <img
                                alt={agent.slug}
                                src={agent.profile_image ? `https://${agent.profile_image}` : "/images/default_img.png"}
                              />
                            </div>
                            <div className="team-content">
                              <div className="d-flex justify-content-between align-items-start mb-2">
                                <h6 className="name mb-0 text-truncate">{agent.user.name}</h6>
                                <span className="small text-dark d-flex align-items-baseline">
                                  4.5 <i className="fa-solid fa-star text-theme small"></i> (20)
                                </span>
                              </div>
                              <p className="mb-0">Real Estate Agency</p>

                              {agent.price_range && (
                                <p className="mb-0">
                                  Price Range: <b>AUD {agent.price_range}</b>
                                </p>
                              )}
                              <p className="mb-0">Sold Properties: <b>(48)</b></p>
                            </div>
                          </div>
                        </Link>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Pagination */}
                {pagination.last_page > 1 && (
                <nav className="mt-4">
                    <ul className="pagination justify-content-center">
                    {/* Previous button */}
                    <li className={`page-item ${pagination.current_page === 1 ? "disabled" : ""}`}>
                        <button className="page-link" onClick={() => fetchAgents(pagination.current_page - 1)}>
                        &laquo;
                        </button>
                    </li>

                    {/* Page numbers */}
                    {Array.from({ length: pagination.last_page }, (_, i) => i + 1).map((page) => (
                        <li key={page} className={`page-item ${pagination.current_page === page ? "active" : ""}`}>
                        <button className="page-link" onClick={() => fetchAgents(page)}>
                            {page}
                        </button>
                        </li>
                    ))}

                    {/* Next button */}
                    <li className={`page-item ${pagination.current_page === pagination.last_page ? "disabled" : ""}`}>
                        <button className="page-link" onClick={() => fetchAgents(pagination.current_page + 1)}>
                        &raquo;
                        </button>
                    </li>
                    </ul>
                </nav>
                )}


              </>
            ) : (
              <h6 className="text-danger fw-bold">No agents found</h6>
            )}
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Agents;
