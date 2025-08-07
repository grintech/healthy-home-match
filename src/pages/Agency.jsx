import React, { useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { Link } from "react-router-dom";

const agencyData = [
  {
    id: 1,
    name: "All American Real Estate",
    address: "1611 Michigan Ave, Miami Beach, FL 33139",
    image: "/images/agency1.png",
    agency : "amazon",
    propertyTag: "6 Properties",
    category: "Houses",
    rating: 4.6,
  },
  {
    id: 2,
    name: "All Australian Real Estate",
    address: "123 Harbour St, Sydney, NSW 2000",
    image: "/images/agency2.png",
     agency : "cisco",
    propertyTag: "12 Properties",
    category: "Apartments",
    rating: 4.8,
  },
  {
    id: 3,
    name: "Modern Villas Group",
    address: "22 Palm Drive, Los Angeles, CA",
    image: "/images/agency3.png",
     agency : "dropcam",
    propertyTag: "8 Properties",
    category: "Villa",
    rating: 4.9,
  },
  {
    id: 4,
    name: "Prime Office Realty",
    address: "55 Downtown Blvd, New York, NY",
    image: "/images/agency4.png",
     agency : "logitech",
    propertyTag: "10 Properties",
    category: "Office",
    rating: 4.5,
  },
  {
    id: 5,
    name: "Elite Apartments",
    address: "88 Skyline Ave, San Francisco, CA",
    image: "/images/agency5.png",
     agency : "spotify",
    propertyTag: "9 Properties",
    category: "Apartments",
    rating: 4.7,
  },
  {
    id: 6,
    name: "Coastal Homes",
    address: "7 Ocean View, Malibu, CA",
    image: "/images/agency1.png",
     agency : "flipkart",
    propertyTag: "4 Properties",
    category: "Houses",
    rating: 4.4,
  },
];

const Agency = () => {
  const [selectedCategories, setSelectedCategories] = useState(["All"]);
  const [searchName, setSearchName] = useState("");
  const [searchCity, setSearchCity] = useState("");

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

  // Filtered Data
  const filteredAgencies = agencyData.filter((a) => {
    const matchCategory =
      selectedCategories.includes("All") || selectedCategories.includes(a.category);

    const matchName = a.agency.toLowerCase().includes(searchName.toLowerCase());

    const matchCity = a.address.toLowerCase().includes(searchCity.toLowerCase());

    return matchCategory && matchName && matchCity;
  });

  return (
    <div>
      <Navbar />
      <div className="all_agencies py-5">
        <div className="container">
          <h1 className="sec-title mb-4">All Agencies</h1>

          {/* Filter Section */}
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

          {/* Cards */}
          <div className="row g-4">
            {filteredAgencies.length > 0 ? (
              filteredAgencies.map((agency) => (
                <div className="col-md-6 col-lg-4 " key={agency.id}>
                  <div className="agency-style1 ">
                    <div className="agency-img">
                      <img alt="agency" loading="lazy" src={agency.image} />
                      <div className="tag">{agency.propertyTag}</div>
                    </div>
                    <div className="agency-details pt-4">
                      <h6 className="fw400">
                        <i className="fas fa-star review-color2 pe-3 fz10"></i>
                        {agency.rating}
                      </h6>
                      <h6 className="agency-title text-truncate mb-1 fw-bold">{agency.name}</h6>
                      <p className="fz15">{agency.address}</p>
                      <div className="d-grid">
                        <Link to='/agency-single' className="btn ud-btn btn-white search_home_btn mt-4">
                          View Listings <i className="fas fa-arrow-right-long"></i>
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="card shadow-sm border-0 d-flex flex-column align-items-center justify-content-center mt-3 py-5">
                    <i className="fa-solid fa-house-circle-xmark fs-2 mb-4 text-theme"></i>
                    <p className="mb-0 fw-bold"> No agencies match your search. </p>
                 </div>
            )}
          </div>
          
          {
            filteredAgencies.length > 0 && 
              <div className="d-flex justify-content-center mt-4">
                  <nav aria-label="Page navigation example">
                <ul className="pagination">
                  <li className="page-item">
                    <Link className="page-link" to="#" aria-label="Previous">
                      <span aria-hidden="true">&laquo;</span>
                    </Link>
                  </li>
                  <li className="page-item"><Link className="page-link active" to="#">1</Link></li>
                  <li className="page-item"><Link className="page-link " to="#">2</Link></li>
                  <li className="page-item">
                    <Link className="page-link" to="#" aria-label="Next">
                      <span aria-hidden="true">&raquo;</span>
                    </Link>
                  </li>
                </ul>
              </nav>
              </div>
          }

        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Agency;
