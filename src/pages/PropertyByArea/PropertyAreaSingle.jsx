import React, { useState } from "react";
import { Link, useParams } from "react-router-dom";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import Slider from "rc-slider";
import "rc-slider/assets/index.css";

const PropertyAreaSingle = () => {
  const { stateId } = useParams();
  const [priceRange, setPriceRange] = useState([0, 100000]);

  const allProperties = [
    {
      id: 1,
      state: "qld",
      title: "Goodstart Childcare Opposite Primary School",
      address: "Goodstart, 40 Eaglesfield St, Beaudesert, QLD 4285",
      image:
        "https://images.unsplash.com/photo-1505691938895-1758d7feb511?auto=format&fit=crop&w=900&q=60",
      agency: "Ray White Commercial QLD",
      agents: [
        { id: "0", name: "John", image: "/images/agent1.jpg" },
        { id: "1", name: "Alex", image: "/images/agent2.jpg" },
      ],
      type: "Medical & Consulting",
      area: "1,111 m²",
      auction: "Auction Fri 31 Oct",
    },
    {
      id: 2,
      state: "qld",
      title: "Impressive 3,631 sqm Brisbane Childcare",
      address: "Brisbane, QLD 4000",
      image:
        "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=900&q=60",
      agency: "Colliers International",
      agents: [
        { id: "0", name: "John", image: "/images/agent1.jpg" },
        { id: "1", name: "Alex", image: "/images/agent2.jpg" },
      ],
      type: "Commercial",
      area: "3,631 m²",
      auction: "Auction Fri 31 Oct",
    },
    {
      id: 3,
      state: "vic",
      title: "Melbourne Office Tower Investment",
      address: "120 Collins St, Melbourne, VIC 3000",
      image:
        "https://images.unsplash.com/photo-1570129477492-45c003edd2be?auto=format&fit=crop&w=900&q=60",
      agency: "CBRE Melbourne",
      agents: [
        { id: "0", name: "John", image: "/images/agent1.jpg" },
        { id: "1", name: "Alex", image: "/images/agent2.jpg" },
      ],
      type: "Office",
      area: "8,200 m²",
      auction: "EOI Closing Soon",
    },
  ];

  return (
    <>
      <Navbar />

      <section className="py-5 bg-light property_area_single">
        <div className="container">
          <div className="d-flex flex-wrap justify-content-between align-items-center mb-3">
            <h4 className="fw-bold text-capitalize mb-0">
              Commercial Properties For Sale in{" "}
              {stateId?.toUpperCase() || "All"}
            </h4>

              {/* <div className="text-muted small">
                Showing {allProperties.length} results
              </div> */}

            {/* Filters Button for Mobile */}
            <button
              className="btn mobile-filter-btn d-lg-none"
              data-bs-toggle="offcanvas"
              data-bs-target="#filterSidebar"
              aria-controls="filterSidebar"
            >
              <i className="fa fa-sliders me-1"></i> Filters
            </button>
          </div>

          <div className="row">
            {/* Sidebar (visible on large screens) */}
            <div className="col-lg-4 mb-4 mb-lg-0 d-none d-lg-block">
              <FilterSidebar priceRange={priceRange} setPriceRange={setPriceRange} stateId={stateId} />
            </div>

            {/* Right column - Property cards */}
            <div className="col-lg-8">
            

              {allProperties.length > 0 ? (
                allProperties.map((p) => (
                  <div
                    key={p.id}
                    className="card mb-4 shadow-sm border-0 rounded-4 overflow-hidden"
                  >
                    <Link
                      to="/property-single"
                      className="position-relative property_card"
                    >
                      <img
                        src={p.image}
                        alt={p.title}
                        className="img-fluid w-100"
                      />
                      <span className="badge bg-dark position-absolute top-0 start-0 m-3 p-2">
                        {p.auction}
                      </span>
                    </Link>
                    <div className="card-body">
                      <Link to="/property-single">
                        <h5 className="card-title text-green">{p.title}</h5>
                      </Link>
                      <p className="text-muted mb-1">{p.address}</p>
                      <div className="d-flex flex-wrap gap-3 justify-content-between align-items-center">
                        <div className="d-flex gap-3">
                          <div className="d-flex align-items-baseline">
                            <i className="fa-solid fa-chart-area me-1"></i>
                            <span className="fw-bold">{p.area}</span>
                          </div>
                          <div className="d-flex align-items-baseline">
                            <i className="fa-solid fa-house me-1"></i>
                            <span className="fw-bold">{p.type}</span>
                          </div>
                        </div>
                        <Link
                          to="/property-single"
                          className="btn btn-theme btn-sm"
                        >
                          View More
                        </Link>
                      </div>
                    </div>
                    <div className="small text-muted bg-lgreen">
                      <div className="card-body">
                        <div className="d-flex justify-content-between align-items-center">
                          <Link to="/agency">
                            <h6 className="text-theme fw-bold m-0">
                              {p.agency}
                            </h6>
                          </Link>
                          <div className="d-flex">
                            {p.agents.map((agent) => (
                              <Link to="/agents" key={agent.id}>
                                <img
                                  src={agent.image}
                                  width={50}
                                  height={50}
                                  className="me-1 rounded-circle border border-2 border-white"
                                  alt={agent.name}
                                />
                              </Link>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <div className="alert alert-light text-center">
                  No properties found in this location.
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Offcanvas Sidebar for Mobile */}
      <div
        className="offcanvas offcanvas-start "
        tabIndex="-1"
        id="filterSidebar"
        aria-labelledby="filterSidebarLabel"
      >
        <div className="offcanvas-header">
          <h5 id="filterSidebarLabel" className="fw-bold">
            Filters
          </h5>
          <button
            type="button"
            className="btn-close text-reset"
            data-bs-dismiss="offcanvas"
            aria-label="Close"
          ></button>
        </div>
        <div className="offcanvas-body">
          <FilterSidebar priceRange={priceRange} setPriceRange={setPriceRange} stateId={stateId} />
        </div>
      </div>

      <Footer />
    </>
  );
};

// Filter Sidebar Component
const FilterSidebar = ({ priceRange, setPriceRange, stateId }) => {
  return (
    <div className="bg-lgreen shadow-sm p-4 rounded-3 property_area_filters">
      {/* Search */}
      <label className="form-label fw-semibold">Location</label>
      <input
        type="text"
        className="form-control mb-3"
        placeholder={`Search in ${stateId?.toUpperCase() || "All States"}`}
      />

      {/* Listing Type */}
      <label className="form-label fw-semibold">Listing Type</label>
      <select className="form-select rounded-pill mb-3">
        <option value="buy">Buy</option>
        <option value="lease">Lease</option>
        <option value="sold">Sold</option>
      </select>

      {/* Property Type */}
      <label className="form-label fw-semibold">Property Type</label>
      <select className="form-select rounded-pill mb-3">
        <option value="all-type">All Types</option>
        <option value="house">House</option>
        <option value="townhouse">Townhouse</option>
        <option value="apartment">Apartment</option>
        <option value="villa">Villa</option>
        <option value="land">Land</option>
      </select>

      {/* Price Range */}
      <label className="form-label fw-semibold">Price Range</label>
      <Slider
        range
        min={0}
        max={100000}
        value={priceRange}
        onChange={setPriceRange}
      />
      <div className="row justify-content-between mt-2">
        <div className="col-6">
          <input
            type="text"
            className="form-control text-center"
            value={`$${priceRange[0]}`}
            readOnly
          />
        </div>
        <div className="col-6">
          <input
            type="text"
            className="form-control text-center"
            value={`$${priceRange[1]}`}
            readOnly
          />
        </div>
      </div>

      <button className="btn btn-green rounded-pill mt-4 w-100">
        <i className="bi bi-funnel"></i> Apply Filters
      </button>
    </div>
  );
};

export default PropertyAreaSingle;
