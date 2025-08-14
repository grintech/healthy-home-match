import { useEffect, useState } from "react";
import Navbar from "../../components/Navbar";
import Slider from "rc-slider";
import "rc-slider/assets/index.css";
import "./searchHome.css";
import { Link } from "react-router-dom";

// import  homeData from './Home.json'
import Footer from "../../components/Footer";
import axios from "axios";

const SearchHome = () => {

  const ApiUrl = import.meta.env.VITE_API_URL;
  const [isListView, setIsListView] = useState(false);
  // const [priceRange, setPriceRange] = useState([0, 100000]);
  const [priceRange, setPriceRange] = useState([0, 3000000]);
  const [bedroom, setBedroom] = useState("any");
  const [bathroom, setBathroom] = useState("any");

  const [likedHomes, setLikedHomes] = useState([]);

  const [filteredHomes, setFilteredHomes] = useState([]);
  const [loading, setLoading] = useState(true);


 // Filter states
  const [location, setLocation] = useState("");
  const [listingType, setListingType] = useState("");
  const [propertyType, setPropertyType] = useState("");
  const [performanceRating, setPerformanceRating] = useState("");
  const [amenities, setAmenities] = useState([]);

 
  const [pagination, setPagination] = useState({
    current_page: 1,
    per_page: 8,
    total: 0,
    last_page: 1,
    has_more: false,
  });

  const handleAmenityChange = (e) => {
  const { id, checked } = e.target;

  setAmenities((prev) => {
    if (checked) {
      // Add if not already present
      return [...prev, id];
    } else {
      // Remove if unchecked
      return prev.filter((amenity) => amenity !== id);
    }
  });
};





  const fetchProperties = async (
    page = 1,
    filters = {
      location,
      priceRange,
      listingType,
      propertyType,
      performanceRating,
      bedroom,
      bathroom,
      amenities
    }
) => {
  window.scrollTo({ top: 0, behavior: "smooth" });
  setLoading(true);

  const queryParams = new URLSearchParams();
  queryParams.append("page", page);

  if (filters.location.trim()) queryParams.append("locations", filters.location);
  if (filters.priceRange[0] > 0) queryParams.append("min_price", filters.priceRange[0]);
  if (filters.priceRange[1] < 3000000) queryParams.append("max_price", filters.priceRange[1]);
  if (filters.propertyType) queryParams.append("property_type", filters.propertyType);
  if (filters.listingType) queryParams.append("listing_type", filters.listingType);
  if (filters.bedroom !== "any") queryParams.append("bedrooms", filters.bedroom.replace("+", ""));
  if (filters.bathroom !== "any") queryParams.append("bathrooms", filters.bathroom.replace("+", ""));
  if (filters.amenities.length > 0) queryParams.append("amenities", filters.amenities.join(","));
  if (filters.performanceRating) queryParams.append("performance_rating", filters.performanceRating);

  try {
    const res = await axios.get(`${ApiUrl}/properties/filter?${queryParams.toString()}`, {
      headers: {
        "X-API-DOMAIN": "$2y$10$Vs8ujkh6QGdPgRU4Qsub7uP6l8fu5deHcfhF/ePrPWOkVWi3lDT0u",
      },
    });

    if (res.data.status && Array.isArray(res.data.listings)) {
      const mappedData = res.data.listings.map((item) => ({
        id: item.id,
        slug: item.slug,
        title: item.title,
        price: item.price,
        location: item.address || "NA",
        image: item.featured_image,
        performanceRating: item.performance_rating || "NA",
        listingType: item.listing_type || "NA",
        bed: item.bedrooms || "NA",
        bath: item.bathrooms || "NA",
        area: item.area_sqft || "NA",
        currency: item.currency || "NA",
        propertyType: item.property_type || "NA"
      }));

      setFilteredHomes(mappedData);
      setPagination(res.data.pagination);
    }
  } catch (err) {
    console.error("Error fetching properties:", err);
  } finally {
    setLoading(false);
  }
};

useEffect(() => { fetchProperties(); }, []);


 const resetFilters = () => {
  const clearedFilters = {
    location: "",
    priceRange: [0, 3000000],
    listingType: "",
    propertyType: "",
    performanceRating: "",
    bedroom: "any",
    bathroom: "any",
    amenities: []
  };

  // Update state
  setLocation(clearedFilters.location);
  setPriceRange(clearedFilters.priceRange);
  setListingType(clearedFilters.listingType);
  setPropertyType(clearedFilters.propertyType);
  setPerformanceRating(clearedFilters.performanceRating);
  setBedroom(clearedFilters.bedroom);
  setBathroom(clearedFilters.bathroom);
  setAmenities(clearedFilters.amenities);

  // Fetch immediately with cleared values
  fetchProperties(1, clearedFilters);
};







  const toggleLike = (homeId) => {
    setLikedHomes((prev) =>
      prev.includes(homeId)
        ? prev.filter((id) => id !== homeId)
        : [...prev, homeId]
    );
  };



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
          <option value="Buy" >Buy</option>
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
          <option value="apartment" >Apartment</option>
          <option value="house" >House</option>
          <option value="villa" >Villa</option>
          <option value="plot" >Plot</option>
          <option value="commercial" >Commercial</option>
          <option value="office" >Office</option>
          <option value="shop" >Shop</option>
          <option value="wwarehouse" >Warehouse</option>
          <option value="other" >Other</option>
          
        </select>
      </div>

      <div className="widget-wrapper">
        <h6 className="list-title">Energy Rating</h6>
        <select className="form-control"
        value={performanceRating}
        onChange={(e) => setPerformanceRating(e.target.value)}
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
        <input
          className="form-check-input"
          type="checkbox"
          id="solar"
          onChange={handleAmenityChange}
          checked={amenities.includes("solar")}
        />
        <label className="form-check-label" htmlFor="solar">Solar Ready</label>
      </div>

      <div className="form-check">
        <input
          className="form-check-input"
          type="checkbox"
          id="all-electric"
          onChange={handleAmenityChange}
          checked={amenities.includes("all-electric")}
        />
        <label className="form-check-label" htmlFor="all-electric">All-Electric</label>
      </div>

      <div className="form-check">
        <input
          className="form-check-input"
          type="checkbox"
          id="sustainable-materials"
          onChange={handleAmenityChange}
          checked={amenities.includes("sustainable-materials")}
        />
        <label className="form-check-label" htmlFor="sustainable-materials">Sustainable Materials</label>
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
        <button className="btn ud-btn btn-white search_home_btn w-100"
          onClick={() => fetchProperties(1)}
        >
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
              {filteredHomes.length > 0 && (
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
              )}


              {loading ? (
                <div className="text-center py-5">
                  <div className="spinner-grow text-warning" role="status"></div>
                  <p className="text-dark">Please wait...</p>
                </div>
              ) : filteredHomes.length > 0 ? (
                <div className="row">
                  {filteredHomes.map((home) => (
                    <div key={home.id} className={`${isListView ? "col-12" : "col-md-6"} mb-3`}>
                      <div className={`listing-style1 ${isListView ? "d-flex" : ""}`}>
                        <div className={`${isListView ? "col-5" : ""} list-thumb`}>
                        <img
                          alt="property"
                          src={
                            home.image && home.image.trim() !== ""
                              ? `https://${home.image}`
                              : "/images/default-property.png"
                          }
                          className="w-100"
                          loading="lazy"
                        />


                          <div className="sale-sticker-wrap">
                            <div className="list-tag fz12">
                              <i className="fa-solid fa-bolt me-1"></i>
                              {home.performanceRating}
                            </div>
                            <div className="list-tag fz12 bg-dark">
                              <i className="fa-solid fa-flag me-1"></i>
                              {home.listingType}
                            </div>
                          </div>
                          <div className="list-price">{home.currency + " " + home.price}</div>
                        </div>
                        <div className={`${isListView ? "col-7" : ""} list-content d-flex flex-column justify-content-around`}>
                          <h6 className="list-title text-capitalize text-truncate">
                            <Link to="/property-single">{home.title}</Link>
                          </h6>
                          <p className="list-text text-capitalize text-truncate">{home.location}</p>
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
                            <Link to="#" className="text-capitalize">
                              <i className="fa-solid fa-home"></i> {home.propertyType}
                            </Link>
                          </div>
                          <hr className="" />
                          <div className="list-meta2 d-flex justify-content-between align-items-center ">
                            <Link to={`/property-single/${home.slug}`} className="view_details">
                              View details
                            </Link>
                            <div className="icons d-flex align-items-center">
                              <Link to="#" onClick={() => toggleLike(home.id)}>
                                <i
                                  className={`fa-heart ${
                                    likedHomes.includes(home.id)
                                      ? "fa-solid text-danger"
                                      : "fa-regular"
                                  }`}
                                ></i>
                              </Link>
                              <Link to="#">
                                <i className="fa-solid fa-share"></i>
                              </Link>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <>
                  <div className="overview_card py-4  border-0 d-flex flex-column justify-content-center align-items-center">
                    <i className="fa-solid fa-home text-theme fs-2 mb-3"></i>
                   <div className="text-centertext-muted">No properties found</div>  
                  </div>
                </>
              )}

             {/* {pagination.last_page > 1 && ( */}
             {!loading && pagination.last_page > 1 && (
              <div className="d-flex justify-content-center">
                <ul className="pagination">
                  <li className={`page-item ${pagination.current_page === 1 ? "disabled" : ""}`}>
                    <Link
                      className="page-link"
                      to="#"
                      aria-label="Previous"
                      onClick={() => fetchProperties(pagination.current_page - 1)}
                    >
                      <span aria-hidden="true">&laquo;</span>
                    </Link>
                  </li>

                  {Array.from({ length: pagination.last_page }, (_, i) => i + 1).map((pageNum) => (
                    <li
                      key={pageNum}
                      className={`page-item ${pageNum === pagination.current_page ? "active" : ""}`}
                    >
                      <Link
                        className="page-link"
                        to="#"
                        onClick={() => fetchProperties(pageNum)}
                      >
                        {pageNum}
                      </Link>
                    </li>
                  ))}

                  <li
                    className={`page-item ${
                      pagination.current_page === pagination.last_page ? "disabled" : ""
                    }`}
                  >
                    <Link
                      className="page-link"
                      to="#"
                      aria-label="Next"
                      onClick={() => fetchProperties(pagination.current_page + 1)}
                    >
                      <span aria-hidden="true">&raquo;</span>
                    </Link>
                  </li>
                </ul>

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
