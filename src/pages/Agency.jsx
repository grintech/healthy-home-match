import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { Link } from "react-router-dom";
import axios from "axios";

const Agency = () => {
  const [selectedCategories, setSelectedCategories] = useState(["All"]);
  const [searchName, setSearchName] = useState("");
  const [searchCity, setSearchCity] = useState("");
  const [agencies, setAgencies] = useState([]);
  const [pagination, setPagination] = useState(null);
  const [loading, setLoading] = useState(true);

  const ApiUrl = import.meta.env.VITE_API_URL;

  // Handle category toggle
  const handleCategoryChange = (category) => {
    if (category === "All") {
      setSelectedCategories(["All"]);
    } else {
      let updated;
      if (selectedCategories.includes("All")) updated = [category];
      else if (selectedCategories.includes(category))
        updated = selectedCategories.filter((c) => c !== category);
      else updated = [...selectedCategories, category];
      if (updated.length === 0) updated = ["All"];
      setSelectedCategories(updated);
    }
  };

  // Fetch Agencies API
  const fetchAgencies = async (page = 1) => {
    try {
      setLoading(true);
      const res = await axios.get(`${ApiUrl}/agency/listing?page=${page}`, {
        headers: {
          "X-API-DOMAIN": "$2y$10$Vs8ujkh6QGdPgRU4Qsub7uP6l8fu5deHcfhF/ePrPWOkVWi3lDT0u",
        },
      });

      if (res.data.success) {
        const response = res.data.data;
        setAgencies(response); 
        console.log(response)
        setPagination({
          currentPage: response.current_page,
          lastPage: response.last_page,
          nextPage: response.next_page_url,
          prevPage: response.prev_page_url,
        });
      }
    } catch (err) {
      console.error("API Error:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAgencies();
  }, []);

  // Filter agencies client-side
  const filteredAgencies = agencies.filter((a) => {
    const matchCategory =
      selectedCategories.includes("All") || selectedCategories.includes(a.category);

    const matchName = a.agency_name?.toLowerCase().includes(searchName.toLowerCase());

    const matchCity = a.location?.toLowerCase().includes(searchCity.toLowerCase());

    return matchCategory && matchName && matchCity;
  });

  return (
    <div>
      <Navbar />
      <div className="all_agencies py-5">
        <div className="container">
          <h1 className="sec-title mb-4">All Agencies</h1>

          {/* Filter Section */}
          {!loading && filteredAgencies.length > 0 && (
            <div className="row align-items-center mb-4">
              <div className="col-lg-9">
                <div className="agent-page-meta dropdown-lists">
                  <div className="d-flex flex-wrap gap-sm-3 gap-2">
                    <div className="position-relative">
                      <input
                        className="form-control"
                        placeholder="Enter agency name"
                        type="text"
                        value={searchName}
                        onChange={(e) => setSearchName(e.target.value)}
                      />
                    </div>

                    <div className="position-relative">
                      <input
                        className="form-control"
                        placeholder="Enter City"
                        type="text"
                        value={searchCity}
                        onChange={(e) => setSearchCity(e.target.value)}
                      />
                    </div>

                    <div className="position-relative">
                      <div className="dropdown">
                        <button
                          className="btn open-btn dropdown-toggle"
                          type="button"
                          data-bs-toggle="dropdown"
                          aria-expanded="false"
                        >
                          All Categories
                        </button>
                        <ul className="dropdown-menu py-3 px-2">
                          {["All", "Houses", "Apartments", "Office", "Villa"].map((cat) => (
                            <div className="form-check" key={cat}>
                              <input
                                className="form-check-input"
                                type="checkbox"
                                id={cat}
                                checked={selectedCategories.includes(cat)}
                                onChange={() => handleCategoryChange(cat)}
                              />
                              <label className="form-check-label" htmlFor={cat}>
                                {cat}
                              </label>
                            </div>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Loading */}
          {loading && (
            <div className="d-flex flex-column justify-content-center align-items-center py-5" >
              <i className="fa-solid fa-home text-theme fs-1 loader-icon"></i>
              <span>Loading...</span>
            </div>
          )
          }

          {/* Cards */}
          <div className="row g-4">
            {!loading && filteredAgencies.length > 0 ? (
              filteredAgencies.map((agency) => (
                <div className="col-md-6 col-lg-4 " key={agency.id}>
                  <div className="agency-style1 ">
                    <div className="agency-img">
                      <img alt="agency" loading="lazy" className="rounded-2" src={`https://${agency.logo}`} />
                      <div className="tag">{`${agency.properties_count} properties`}</div>
                    </div>
                    <div className="agency-details pt-4">
                      <h6 className="fw400">
                        <i className="fas fa-star review-color2 pe-3 fz10"></i> 4.6
                      </h6>
                      <h6 className="agency-title text-truncate mb-1 fw-bold">{agency.agency_name}</h6>
                      <p className="fz15">{agency.location}</p>
                      <div className="d-grid">
                        <Link to={`/agency-single/${agency.slug}`} className="btn ud-btn btn-white search_home_btn ">
                          View Listings <i className="fas fa-arrow-right-long"></i>
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              !loading && (
                <div className="card shadow-sm border-0 d-flex flex-column align-items-center justify-content-center mt-3 py-5">
                  <i className="fa-solid fa-house-circle-xmark fs-2 mb-4 text-theme"></i>
                  <p className="mb-0 fw-bold"> No agencies match your search. </p>
                </div>
              )
            )}
          </div>

          {/* Pagination */}
          {pagination && agencies.length > 0 && pagination.lastPage > 1 && (
            <div className="d-flex justify-content-center mt-4">
              <nav aria-label="Page navigation example">
                <ul className="pagination">
                  <li className={`page-item ${!pagination.prevPage ? "disabled" : ""}`}>
                    <button
                      className="page-link"
                      onClick={() =>
                        pagination.prevPage && fetchAgencies(pagination.currentPage - 1)
                      }
                    >
                      &laquo;
                    </button>
                  </li>

                  {[...Array(pagination.lastPage)].map((_, i) => (
                    <li
                      className={`page-item ${
                        pagination.currentPage === i + 1 ? "active" : ""
                      }`}
                      key={i}
                    >
                      <button className="page-link" onClick={() => fetchAgencies(i + 1)}>
                        {i + 1}
                      </button>
                    </li>
                  ))}

                  <li className={`page-item ${!pagination.nextPage ? "disabled" : ""}`}>
                    <button
                      className="page-link"
                      onClick={() =>
                        pagination.nextPage && fetchAgencies(pagination.currentPage + 1)
                      }
                    >
                      &raquo;
                    </button>
                  </li>
                </ul>
              </nav>
            </div>
          )}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Agency;
