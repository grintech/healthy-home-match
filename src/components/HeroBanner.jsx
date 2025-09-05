import { useNavigate } from "react-router-dom";
import LocationSearchInput from "./LocationSearchInput";
import { useState } from "react";

const HeroBanner = () => {
  const navigate = useNavigate();

  const [long, setLong] = useState("");
  const [lat, setLat] = useState("");
  const [bedroom, setBedroom] = useState("");
  const [energyRating, setEnergyRating] = useState("");

  const handleLocationSelect = (loc) => {
    if (loc?.lat && loc?.lng) {
      setLat(String(loc.lat));
      setLong(String(loc.lng));
    }
  };

  const handleSearch = () => {
    const params = new URLSearchParams({
      long,
      lat,
      bed: bedroom,
      energy: energyRating,
    }).toString();

    navigate(`/homes?${params}`);
  };

  return (
    <section className="hero_banner">
      <div className="container">
        <div className="col-xl-9 hero_tabs ">
          <h1 className="hero_title">
            Easy Way to Find a <br /> Perfect <span> Property</span>
          </h1>
          <p className="hero-text fz15 animate-up-2">
            Discover homes that match your style, budget, and lifestyle in just a
            few clicks.
          </p>

          <div>
            <ul className="nav nav-tabs mt-5" id="myTab" role="tablist">
              <li className="nav-item" role="presentation">
                <button
                  className="nav-link active"
                  id="home-tab"
                  data-bs-toggle="tab"
                  data-bs-target="#home-tab-pane"
                  type="button"
                  role="tab"
                  aria-controls="home-tab-pane"
                  aria-selected="true"
                >
                  Buy
                </button>
              </li>
              <li className="nav-item" role="presentation">
                <button
                  className="nav-link"
                  id="profile-tab"
                  data-bs-toggle="tab"
                  data-bs-target="#profile-tab-pane"
                  type="button"
                  role="tab"
                  aria-controls="profile-tab-pane"
                  aria-selected="false"
                >
                  Rent
                </button>
              </li>
              <li className="nav-item" role="presentation">
                <button
                  className="nav-link"
                  id="contact-tab"
                  data-bs-toggle="tab"
                  data-bs-target="#contact-tab-pane"
                  type="button"
                  role="tab"
                  aria-controls="contact-tab-pane"
                  aria-selected="false"
                >
                  Build
                </button>
              </li>
            </ul>

            <div className="tab-content" id="myTabContent">
              {["home-tab-pane", "profile-tab-pane", "contact-tab-pane"].map(
                (paneId, idx) => (
                  <div
                    key={paneId}
                    className={`tab-pane fade ${idx === 0 ? "show active" : ""}`}
                    id={paneId}
                    role="tabpanel"
                    aria-labelledby={["home-tab","profile-tab","contact-tab"][idx]}
                    tabIndex="0"
                  >
                    <div className="row align-items-center hero_search_fields">
                      <div className="col-12 col-lg-5 mb-3 mb-lg-0 position-relative">
                        <LocationSearchInput onSelect={handleLocationSelect} />
                      </div>

                      <div className="col-sm-6 col-lg-3 mb-3 mb-lg-0 position-relative">
                        <select
                          className="form-select"
                          aria-label="Select bedrooms"
                          value={bedroom}
                          onChange={(e) => setBedroom(e.target.value)}
                        >
                          <option value="">Bedrooms</option>
                          <option value="1">1 Bedroom</option>
                          <option value="2">2 Bedrooms</option>
                          <option value="3">3 Bedrooms</option>
                          <option value="3+">3+ Bedrooms</option>
                        </select>
                        <i className="fa-solid fa-home"></i>
                      </div>

                      <div className="col-sm-6 col-lg-3 mb-3 mb-lg-0 position-relative">
                        <select
                          className="form-select"
                          aria-label="Select energy rating"
                          value={energyRating}
                          onChange={(e) => setEnergyRating(e.target.value)}
                        >
                          <option value="">Energy rating</option>
                          <option value="7 Star+">7 Star+</option>
                          <option value="Passivhaus">Passivhaus</option>
                          <option value="NatHERS">NatHERS</option>
                          <option value="Green Star">Green Star</option>
                        </select>
                        <i className="fa-solid fa-lightbulb"></i>
                      </div>

                      <div className="col-lg-1 ps-lg-0 text-center">
                        <button className="nav_search" onClick={handleSearch}>
                          <i className="fa-solid fa-magnifying-glass"></i>
                        </button>
                      </div>
                    </div>
                  </div>
                )
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroBanner;
