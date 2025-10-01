import { useNavigate } from "react-router-dom";
import LocationSearchInput from "./LocationSearchInput";
import { useState } from "react";

const HeroBanner = () => {
  const navigate = useNavigate();

  const [long, setLong] = useState("");
  const [lat, setLat] = useState("");
  const [bedroom, setBedroom] = useState("");
  const [energyRating, setEnergyRating] = useState("");
  const [activeTab, setActiveTab] = useState("buy"); 

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

    if (activeTab === "build") {
      navigate(`/build?${params}`);
    } else if (activeTab === "rent") {
      navigate(`/rent?${params}`);
    } else {
      navigate(`/homes?${params}`);
    }
  };

  return (
    <section className="hero_banner">
      <div className="container">
        <div className="col-xl-9 hero_tabs">
          <h1 className="hero_title">
            Easy Way to Find a <br /> Perfect <span> Property</span>
          </h1>
          <p className="hero-text fz15 animate-up-2">
            Discover homes that match your style, budget, and lifestyle in just a
            few clicks.
          </p>

          <div>
            <ul className="nav nav-tabs mt-5" role="tablist">
              <li className="nav-item" role="presentation">
                <button
                  className={`nav-link ${activeTab === "buy" ? "active" : ""}`}
                  type="button"
                  onClick={() => setActiveTab("buy")}
                >
                  Buy
                </button>
              </li>
              <li className="nav-item" role="presentation">
                <button
                  className={`nav-link ${activeTab === "rent" ? "active" : ""}`}
                  type="button"
                  onClick={() => setActiveTab("rent")}
                >
                  Rent
                </button>
              </li>
              <li className="nav-item" role="presentation">
                <button
                  className={`nav-link ${activeTab === "build" ? "active" : ""}`}
                  type="button"
                  onClick={() => setActiveTab("build")}
                >
                  Build
                </button>
              </li>
            </ul>

            <div className="tab-content">
              {["buy", "rent", "build"].map((tab, idx) => (
                <div
                  key={tab}
                  className={`tab-pane fade ${activeTab === tab ? "show active" : ""}`}
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
                      <i className="fa-solid fa-lightbulb"></i>
                    </div>

                    <div className="col-lg-1 ps-lg-0 text-center">
                      <button className="nav_search" onClick={handleSearch}>
                        <i className="fa-solid fa-magnifying-glass"></i>
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroBanner;
