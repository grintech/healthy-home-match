import { useEffect, useState } from "react";
import Navbar from "../../components/Navbar";
import Slider from "rc-slider";
import "rc-slider/assets/index.css";
import "./searchHome.css";
import { Link } from "react-router-dom";

import  homeData from './Home.json'
import Footer from "../../components/Footer";

const SearchHome = () => {
const [isListView, setIsListView] = useState(false);
const [priceRange, setPriceRange] = useState([0, 100000]);
const [bedroom, setBedroom] = useState("any");
const [bathroom, setBathroom] = useState("any");
const [location, setLocation] = useState("");
const [propertyType, setPropertyType] = useState("");
const [energyRating, setEnergyRating] = useState("");
const [listingType, setListingType] = useState("");

const [likedHomes, setLikedHomes] = useState([]);
const toggleLike = (homeId) => {
  setLikedHomes((prev) =>
    prev.includes(homeId)
      ? prev.filter((id) => id !== homeId)
      : [...prev, homeId]
  );
};



const [filteredHomes, setFilteredHomes] = useState(homeData);

// Convert "3+" to number (3), or "any" to 0
const parseFilterNumber = (val) => {
  if (val === "any") return 0;
  return parseInt(val.replace("+", ""));
};

// Filter Function

useEffect(() => {
  const minPrice = priceRange[0];
  const maxPrice = priceRange[1];
  const minBeds = parseFilterNumber(bedroom);
  const minBaths = parseFilterNumber(bathroom);
  const searchLocation = location.toLowerCase().trim();

  const filtered = homeData.filter((home) => {
    const price = parseInt(home.price.replace(/[^\d]/g, "")); // e.g., "$14,000 / mo"

     const matchesLocation =
      searchLocation === "" || home.location.toLowerCase().includes(searchLocation);

     const matchesPropertyType =
      propertyType === "" || home.propertyType.toLowerCase() === propertyType.toLowerCase();


     const matchesEnergyRating =
      energyRating === "" || home.energyRating === energyRating;

     const matchesListingType =
      listingType === "" || home.listingType === listingType;

    return (
      price >= minPrice &&
      price <= maxPrice &&
      home.bed >= minBeds &&
      home.bath >= minBaths && 
      matchesLocation && 
      matchesPropertyType &&
      matchesEnergyRating &&
      matchesListingType
    );
  });

  setFilteredHomes(filtered);

   // ✅ Scroll to top when filter changes
  window.scrollTo({ top: 0, behavior: "smooth" });

}, [priceRange, bedroom, bathroom, location, propertyType, energyRating, listingType]);




  const renderOptionButtons = (type, value, setValue) => {
    const options = ["any", "1+", "2+", "3+", "4+", "5+"];
    return (
      <div className="option-buttons">
        {options.map((opt) => (
          <button
            key={opt}
            className={`opt-btn ${value === opt ? "active" : ""}`}
            onClick={() => setValue(opt)}
          >
            {opt}
          </button>
        ))}
      </div>
    );
  };

  // Left filter Sidebar
  const renderSidebar = () => (
  <>
    {/* <div className="widget-wrapper ">
      <h6 className="list-title">Find your home</h6>
      <div className="search_area position-relative">
        <input
          type="text"
          className="form-control"
          placeholder="What are you looking for?"
        />
        <i className="fa-solid fa-magnifying-glass"></i>
      </div>
    </div> */}

    <div className="widget-wrapper">
      <h6 className="list-title">Location</h6>
      <input type="text" className="form-control" placeholder="Enter Postcode or Suburb"
       value={location}
        onChange={(e) => setLocation(e.target.value)}
       />
    </div>

    <div className="widget-wrapper">
      <h6 className="list-title">Price Range</h6>
      <Slider
        range
        min={0}
        max={100000}
        value={priceRange}
        onChange={setPriceRange}
      />
      <div className="row justify-content-between mt-3">
        <div className="col-6">
          <input type="text" className="form-control w-100" value={`$${priceRange[0]}`} readOnly />
        </div>
        <div className="col-6">
          <input type="text" className="form-control w-100" value={`$${priceRange[1]}`} readOnly />
        </div>
      </div>
    </div>

    <div className="widget-wrapper">
      <h6 className="list-title">Listing Type</h6>
      <select className="form-control"
         value={listingType}
         onChange={(e) => setListingType(e.target.value)}
      >
         <option value="">Select</option>
        <option value="Sale" >Buy</option>
        <option value="Rent" >Rent</option>
        <option value="Build" >Build</option>
      </select>
    </div>

    <div className="widget-wrapper">
      <h6 className="list-title">Property Type</h6>
      <select className="form-control"
        id="propertyType"
        value={propertyType}
        onChange={(e) => setPropertyType(e.target.value)}
      >
        <option value="">Select</option>
        <option value="House" >House</option>
        <option value="Apartment" >Apartment</option>
        <option value="Townhouse" >Townhouse</option>
        <option value="Land" >Land & Build Package</option>
      </select>
    </div>

    <div className="widget-wrapper">
      <h6 className="list-title">Energy Rating</h6>
      <select className="form-control"
        value={energyRating}
        onChange={(e) => setEnergyRating(e.target.value)}
      >
         <option value="">Select</option>
        <option value="7-Star+">7-Star+</option>
        <option value="NatHERS">NatHERS</option>
        <option value="Passivhaus">Passivhaus</option>
        <option value="Green Star">Green Star</option>
      </select>
    </div>

    <div className="widget-wrapper">
      <h6 className="list-title">Bedrooms</h6>
      {renderOptionButtons("bedrooms", bedroom, setBedroom)}
    </div>

    <div className="widget-wrapper">
      <h6 className="list-title">Bathrooms</h6>
      {renderOptionButtons("bathrooms", bathroom, setBathroom)}
    </div>

    <div className="widget-wrapper sustainable_wrapper">
      <h6 className="list-title">Sustainability Features</h6>
      <div className="form-check">
        <input className="form-check-input" type="checkbox" id="solar" />
        <label className="form-check-label" htmlFor="solar">Solar Ready</label>
      </div>
      <div className="form-check">
        <input className="form-check-input" type="checkbox" id="electric" />
        <label className="form-check-label" htmlFor="electric">All-Electric</label>
      </div>
      <div className="form-check">
        <input className="form-check-input" type="checkbox" id="materials" />
        <label className="form-check-label" htmlFor="materials">Sustainable Materials</label>
      </div>
    </div>

    <div className="reset_filters d-flex justify-content-end mb-3">
    <Link
        to="#"
        onClick={(e) => {
        e.preventDefault();
        resetFilters();
        }}
        className="d-flex align-items-baseline"
    >
        <i className="fa-solid fa-rotate me-1 text-dark"></i>
        <p className="m-0 text-dark">Reset all filters</p>
    </Link>
 </div>

    <div className="widget-wrapper">
      <button className="btn ud-btn btn-white search_home_btn w-100">
        <i className="fa-solid fa-magnifying-glass me-2 mb-1"></i> Search
      </button>
    </div>

    


  </>
  );


  useEffect(() => {
    const handleResize = () => {
        if (window.innerWidth < 575) {
        setIsListView(false); 
        }
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
    }, []);


    // Reset Filter
    const resetFilters = () => {
        setLocation("");      
        setPriceRange([0, 100000]); 
        setListingType(""); 
        setPropertyType(""); 
        setEnergyRating(""); 
        setBedroom("any");
        setBathroom("any");
        
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

  return (
    <>
      <Navbar />
      <section className="search_homes py-5">
        <div className="container">
          <div className="d-flex flex-wrap justify-content-between">
            <h1 className="sec-title mb-2">Property Listings</h1>
                {/* Filter Button for Mobile */}
                <div className="d-lg-none text-end mb-2">
                    <button
                        className="btn mobile-filter-btn"
                        type="button"
                        data-bs-toggle="offcanvas"
                        data-bs-target="#mobileFilter"
                        aria-controls="mobileFilter"
                    >
                        <i className="fa fa-sliders me-1"></i> Filter
                    </button>
                </div>
            </div>

          <div className="row mt-4">
        
                {/* Sidebar Offcanvas for Mobile */}
                <div className="offcanvas offcanvas-start d-lg-none" tabIndex="-1" id="mobileFilter" aria-labelledby="mobileFilterLabel">
                    <div className="offcanvas-header mb-4">
                        <h5 className="offcanvas-title " id="mobileFilterLabel">Listing Filters</h5>
                        <button type="button" className="btn-close" data-bs-dismiss="offcanvas" aria-label="Close"></button>
                    </div>
                    <div className="offcanvas-body">
                        {renderSidebar()}
                    </div>
                </div>

                {/* Sidebar for Desktop */}
                <div className="col-lg-4 d-none d-lg-block">
                <div className="list-sidebar-style1">
                    {renderSidebar()}
                </div>
                </div>


             {/* Right Section */}

            <div className="col-lg-8 search_right">
                <div className="d-flex align-items-baseline justify-content-between mb-2">
                    <p className="m-0">{`Showing results (${filteredHomes.length})`} </p>
                    <div className="d-none d-sm-block">
                        <div className="d-flex">
                            <Link className={`border-end px-2 m-0 cursor-pointer ${!isListView ? "text-theme " : "text-dark"}`}
                                onClick={() => setIsListView(false)}>
                                    Grid </Link>
                            <Link className={`px-2 m-0 cursor-pointer ${isListView ? "text-theme " : "text-dark"}`}
                                onClick={() => setIsListView(true)} 
                            > List </Link>
                        </div>
                    </div>
                </div>

            {filteredHomes.length > 0 ? (
              <div className="row">
                {filteredHomes.map((home) => (
                  <div
                    className={`${isListView ? "col-12" : "col-md-6"} mb-3`}
                    key={home.id}
                  >
                    <div
                      className={`listing-style1 ${isListView ? "d-flex" : ""}`}
                    >
                      <div
                        className={`${isListView ? "col-5" : ""} list-thumb`}
                      >
                        <img
                          alt="property_image"
                          src={home.image}
                          className="w-100"
                          loading="lazy"
                        />
                        <div className="sale-sticker-wrap">
                          <div className="list-tag fz12">
                            <i className="fa-solid fa-bolt me-1"></i>
                            {home.energyRating}
                          </div>
                          <div className="list-tag fz12 bg-dark">
                           <i className="fa-solid fa-flag me-1"></i>
                            {home.listingType}
                          </div>
                        </div>
                        <div className="list-price">{home.price}</div>
                      </div>
                      <div className={`${isListView ? "col-7" : ""} list-content`}>
                     
                        <h6 className="list-title">
                          <Link to="/property-single">{home.title}</Link>
                        </h6>
                        <p className="list-text">{home.location}</p>
                        <div className="list-meta d-flex align-items-center">
                          <Link to="#">
                            <i className="fas fa-bed"></i> {home.bed} 
                          </Link>
                          <Link to="#">
                            <i className="fas fa-bath"></i> {home.bath} 
                          </Link>
                          <Link to="#">
                            <i className="fa-solid fa-chart-area"></i> {home.area}
                          </Link>
                          <Link to="#">
                            <i className="fa-solid fa-home"></i> {home.propertyType}
                          </Link>
                        </div>
                        <hr />
                        <div className="list-meta2 d-flex justify-content-between align-items-center mt-3">
                          <Link to='/property-single' className="view_details">View details</Link>
                          <div className="icons d-flex align-items-center">
                              <Link to="#" onClick={() => toggleLike(home.id)}>
                                <i
                                  className={`fa-heart ${
                                    likedHomes.includes(home.id) ? "fa-solid text-danger" : "fa-regular"
                                  }`}
                                ></i>
                              </Link>
                              <Link to="#" data-bs-toggle="tooltip" data-bs-placement="top" data-bs-title="Share">
                                <i className="fa-solid fa-share"></i>
                              </Link>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}

              </div>
             ) : ( <div className="card shadow-sm border-0 d-flex flex-column align-items-center justify-content-center mt-4 py-5">
                    <i className="fa-solid fa-house-circle-xmark fs-2 mb-4 text-theme"></i>
                    <h6 className="mb-0 text-muted"> No properties found </h6>
                 </div>
             )}

            </div>
          </div>
        </div>
      </section>
      <Footer />
    </>
  );
};

export default SearchHome;
