import { useEffect, useMemo, useState } from "react";
import { useLocation, Link, useNavigate } from "react-router-dom";
import Navbar from "../../components/Navbar";
import Slider from "rc-slider";
import "rc-slider/assets/index.css";
import "./searchHome.css";
import Footer from "../../components/Footer";
import LocationSearchInput from "../../components/LocationSearchInput";
import api from "../../utils/axios";
import { useAuth } from "../../context/AuthContext";
import { toast } from "react-toastify";
import Tooltip from "../../components/Tooltip";
import { Offcanvas } from "bootstrap";


const ALL_PROPERTY_OPTIONS = [
  { value: "all-types", label: "All Types" },
  { value: "house", label: "House" },
  { value: "townhouse", label: "Townhouse" },
  { value: "apartment", label: "Apartment" },
  { value: "villa", label: "Villa" },
  { value: "retirement-living", label: "Retirement Living" },
  { value: "land", label: "Land" },
  { value: "acerage", label: "Acerage" },
  { value: "rural", label: "Rural" },
  { value: "block-of-units", label: "Block Of Units" },
];

// Which property types are allowed per listing type
const PROPERTY_BY_LISTING = {
  Buy: [
    "all-types",
    "house",
    "townhouse",
    "apartment",
    "villa",
    "retirement-living",
    "land",
    "acerage",
    "rural",
    "block-of-units",
  ],
  
  Rent: ["all-types", "apartment", "townhouse", "house"],
  Build: ["all-types", "land", "villa", "house", "acerage"],
};

const SearchHome = () => {
  const {user} = useAuth();
  // console.log(user);
  const navigate = useNavigate();
  const routerLocation = useLocation();
  const [savingPropertyIds, setSavingPropertyIds] = useState([]);

    const openMobileFilter = () => {
    const el = document.getElementById("mobileFilter");
    const instance = Offcanvas.getOrCreateInstance(el);
    instance.show();
  };

  const closeMobileFilter = () => {
    const el = document.getElementById("mobileFilter");
    const instance = Offcanvas.getInstance(el);
    instance?.hide();
  };

  

  const [isListView, setIsListView] = useState(false);
  const [priceRange, setPriceRange] = useState([0, 10000000]);
  const [bedroom, setBedroom] = useState("any");
  const [bathroom, setBathroom] = useState("any");
  const [parking, setParking] = useState("any");

  const [minArea, setMinArea] = useState("any");
  const [maxArea, setMaxArea] = useState("any");


  const [likedHomes, setLikedHomes] = useState([]);
  const [filteredHomes, setFilteredHomes] = useState([]);
  const [loading, setLoading] = useState(true);

  // Filter states
  const [locationText, setLocationText] = useState("");
  const [listingType, setListingType] = useState("");
  const [propertyType, setPropertyType] = useState("");
  const [performanceRating, setPerformanceRating] = useState("");
  const [amenities, setAmenities] = useState([]);

  const [pagination, setPagination] = useState({
    current_page: 1,
    per_page: 9,
    total: 0,
    last_page: 1,
    has_more: false,
  });

  const [savingSearch, setSavingSearch] = useState(false);



  // --- Detect param (?buy | ?rent | ?build) robustly ---
  const pageParam = useMemo(() => {
    const params = new URLSearchParams(routerLocation.search);
    if (params.has("buy")) return "Buy";
    if (params.has("rent")) return "Rent";
    if (params.has("build")) return "Build";

    // Also support explicit keys like ?listing=Rent or ?type=Rent
    const explicit =
      params.get("listing") ||
      params.get("listing_type") ||
      params.get("type") ||
      "";
    const normalized = explicit.trim().toLowerCase();
    if (["buy", "rent", "build"].includes(normalized)) {
      return normalized.charAt(0).toUpperCase() + normalized.slice(1);
    }
    return "";
  }, [routerLocation.search]);

  // Keep listingType synced to the URL param
  useEffect(() => {
    if (pageParam) {
      setListingType(pageParam);
      // console.log(pageParam)
    }
  }, [pageParam]);

  // If current propertyType is not allowed for the pageParam, clear it
  useEffect(() => {
    if (!pageParam) return;
    const allowed = PROPERTY_BY_LISTING[pageParam];
    if (propertyType && !allowed.includes(propertyType)) {
      setPropertyType("");
    }
  }, [pageParam, propertyType]);

  // Amenities change
  const handleAmenityChange = (e) => {
    const { id, checked } = e.target;
    setAmenities((prev) => (checked ? [...prev, id] : prev.filter((x) => x !== id)));
  };


  /*----- Fetch Properties -------*/

  const fetchProperties = async (
    page = 1,
    filters = {
      location: locationText,
      priceRange,
      listingType,
      propertyType,
      performanceRating,
      bedroom,
      bathroom,
      parking,
      amenities,
      minArea,
      maxArea,
    }
  ) => {
    window.scrollTo({ top: 0, behavior: "smooth" });
    setLoading(true);

    const queryParams = new URLSearchParams();
    queryParams.append("page", page);

    if (filters.location.trim()) queryParams.append("locations", filters.location);
    if (filters.priceRange[0] > 0) queryParams.append("min_price", filters.priceRange[0]);
    if (filters.priceRange[1] < 10000000) queryParams.append("max_price", filters.priceRange[1]);
    if (filters.propertyType) queryParams.append("property_type", filters.propertyType);
    if (filters.listingType) queryParams.append("listing_type", filters.listingType);
    if (filters.bedroom !== "any") queryParams.append("bedrooms", filters.bedroom);
    if (filters.bathroom !== "any") queryParams.append("bathrooms", filters.bathroom);
    if (filters.parking !== "any") queryParams.append("parking_spaces", filters.parking);
    if (filters.amenities.length > 0)
      queryParams.append("amenities", filters.amenities.join(","));
    if (filters.performanceRating)
      queryParams.append("performance_rating", filters.performanceRating);

     // Add area filters if not "any"
    if (filters.minArea !== "any") queryParams.append("min_area", filters.minArea.replace("m", ""));
    if (filters.maxArea !== "any") queryParams.append("max_area", filters.maxArea.replace("m", ""));

    //  Add user_id if logged in
    if (user && user.id) {
      queryParams.append("user_id", user.id);
    }

    try {
      const res = await api.get(`/properties/filter?${queryParams.toString()}`);

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
          park: item.parking_spaces || "NA",
          area: item.area_m2 || "NA",
          currency: item.currency || "NA",
          propertyType: item.property_type || "NA",
          is_saved: item.is_saved || false, // <-- for likedHomes
        }));

        setFilteredHomes(mappedData);

        // Set likedHomes based on fetched data
          const savedIds = mappedData.filter((h) => h.is_saved).map((h) => h.id);
          setLikedHomes(savedIds);

        setPagination(res.data.pagination);
      } else {
        setFilteredHomes([]);
        setLikedHomes([]);
      }
    } catch (err) {
      console.error("Error fetching properties:", err);
      setFilteredHomes([]);
    } finally {
      setLoading(false);
    }
  };

  // Initial fetch AFTER we’ve read the param and synced listingType
  useEffect(() => {
    // Run once on mount after pageParam is resolved
    fetchProperties(1, {
      location: locationText,
      priceRange,
      listingType: pageParam || listingType,
      propertyType,
      performanceRating,
      bedroom,
      bathroom,
      parking,
      amenities,
      minArea,
      maxArea,

    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pageParam]); // re-run if URL param changes

  const resetFilters = () => {
    const clearedFilters = {
      location: "",
      priceRange: [0, 3000000],
      listingType: pageParam || "",
      propertyType: "",
      performanceRating: "",
      bedroom: "any",
      bathroom: "any",
      parking: "any",
      amenities: [],
       minArea: "any",
      maxArea: "any",
    };

    setLocationText(clearedFilters.location);
    setPriceRange(clearedFilters.priceRange);
    setListingType(clearedFilters.listingType);
    setPropertyType(clearedFilters.propertyType);
    setPerformanceRating(clearedFilters.performanceRating);
    setBedroom(clearedFilters.bedroom);
    setBathroom(clearedFilters.bathroom);
    setParking(clearedFilters.parking);
    setAmenities(clearedFilters.amenities);
     setMinArea("any");
    setMaxArea("any");

    fetchProperties(1, clearedFilters);
  };

  // const toggleLike = (homeId) => {
  //   setLikedHomes((prev) =>
  //     prev.includes(homeId) ? prev.filter((id) => id !== homeId) : [...prev, homeId]
  //   );
  // };

  /*---- Toggle Save Unsave property ----*/

 const toggleSaveProperty = async (homeId) => {
  if (!user || !user.id) {
    toast.error("Please log in to save properties.");
    setTimeout(() => {
      navigate("/login", { state: { from: routerLocation } });
    }, 2000);
    return;
  }

  if (savingPropertyIds.includes(homeId)) return; // prevent multiple clicks

  const isSaved = likedHomes.includes(homeId);

  // Optimistically update UI
  setLikedHomes((prev) =>
    isSaved ? prev.filter((id) => id !== homeId) : [...prev, homeId]
  );

  setSavingPropertyIds((prev) => [...prev, homeId]);

  try {
    const url = isSaved ? "/properties/unsave" : "/properties/save";
    const res = await api.post(url, { propertyId: homeId, user_id: user.id });

    if (!res.data.success) {
      // Revert if API failed
      setLikedHomes((prev) =>
        isSaved ? [...prev, homeId] : prev.filter((id) => id !== homeId)
      );
      toast.error(res.data.message || "Something went wrong");
    } else {
      toast.success(res.data.message);
    }
  } catch (err) {
    console.error("Error saving/unsaving property:", err);
    // Revert on error
    setLikedHomes((prev) =>
      isSaved ? [...prev, homeId] : prev.filter((id) => id !== homeId)
    );
    toast.error("Failed to save property. Please try again.");
  } finally {
    // Remove from saving state
    setSavingPropertyIds((prev) => prev.filter((id) => id !== homeId));
  }
};



  const renderOptionButtons = (type, value, setValue) => {
    const options = ["any", "1", "2", "3", "4", "5"];
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

  // Build the visible property type options based on the pageParam
  const propertyTypeOptionsToShow = useMemo(() => {
    if (!pageParam) return ALL_PROPERTY_OPTIONS;
    const allowed = new Set(PROPERTY_BY_LISTING[pageParam] || []);
    return ALL_PROPERTY_OPTIONS.filter((opt) => allowed.has(opt.value));
  }, [pageParam]);

  // Sidebar
  const renderSidebar = () => (
    <>
      <div className="widget-wrapper location-widget">
        <h6 className="list-title">Location</h6>
        <LocationSearchInput />
      </div>

      <div className="widget-wrapper">
        <h6 className="list-title">Price Range</h6>
        <Slider range min={0} max={100000} value={priceRange} onChange={setPriceRange} />
        <div className="row justify-content-between mt-3">
          <div className="col-6">
            <input
              type="text"
              className="form-control w-100"
              value={`$${priceRange[0]}`}
              readOnly
            />
          </div>
          <div className="col-6">
            <input
              type="text"
              className="form-control w-100"
              value={`$${priceRange[1]}`}
              readOnly
            />
          </div>
        </div>
      </div>

      {/* LISTING TYPE — show only the param option when present */}
      <div className="widget-wrapper">
        <h6 className="list-title">Listing Type</h6>
        <select
          className="form-control"
          value={listingType}
          onChange={(e) => setListingType(e.target.value)}
        >
          {/* <option value="">Select</option> */}
          {pageParam ? (
            <option value={pageParam}>{pageParam}</option>
          ) : (
            <>
              <option value="Buy">Buy</option>
              <option value="Rent">Rent</option>
              <option value="Build">Build</option>
            </>
          )}
        </select>
      </div>

      {/* PROPERTY TYPE — filtered by listing param */}
      <div className="widget-wrapper">
        <h6 className="list-title">Property Type</h6>
        <select
          className="form-control"
          id="propertyType"
          value={propertyType}
          onChange={(e) => setPropertyType(e.target.value)}
        >
          <option value="">Select</option>
          {propertyTypeOptionsToShow.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>
      </div>

        {
          pageParam !== "Rent" && (
          <div className="widget-wrapper">
            <h6 className="list-title">Land Size</h6>
            <div className="row justify-content-between mt-2">
              <div className="col-6">
                <label>Min</label>
                <select className="form-control"
                value={minArea}
                onChange={(e) => setMinArea(e.target.value)}
                >
                  <option value="any">Any</option>
                  <option value="200m">200 ㎡</option>
                  <option value="300m">300 ㎡</option>
                  <option value="400m">400 ㎡</option>
                  <option value="500m">500 ㎡</option>
                  <option value="600m">600 ㎡</option>
                  <option value="700m">700 ㎡</option>
                  <option value="800m">800 ㎡</option>
                  <option value="900m">900 ㎡</option>
                  <option value="1000m">1000 ㎡</option>
                  <option value="1200m">1200 ㎡</option>
                  <option value="1500m">1500 ㎡</option>
                  <option value="1750m">1750 ㎡</option>
                  <option value="2000m">2000 ㎡</option>
                  <option value="3000m">3000 ㎡</option>
                  <option value="4000m">4000 ㎡</option>
                  <option value="5000m">5000 ㎡</option>
                  <option value="10000m">1 ha</option>
                  <option value="20000m">2 ha</option>
                  <option value="30000m">3 ha</option>
                  <option value="40000m">4 ha</option>
                  <option value="50000mm">5 ha</option>
                  <option value="100000m">10 ha</option>
                </select>
              </div>
              <div className="col-6">
                <label>Max</label>
                <select className="form-control"
                value={maxArea}
                onChange={(e) => setMaxArea(e.target.value)}
                >
                  <option value="any">Any</option>
                  <option value="200m">200 ㎡</option>
                  <option value="300m">300 ㎡</option>
                  <option value="400m">400 ㎡</option>
                  <option value="500m">500 ㎡</option>
                  <option value="600m">600 ㎡</option>
                  <option value="700m">700 ㎡</option>
                  <option value="800m">800 ㎡</option>
                  <option value="900m">900 ㎡</option>
                  <option value="1000m">1000 ㎡</option>
                  <option value="1200m">1200 ㎡</option>
                  <option value="1500m">1500 ㎡</option>
                  <option value="1750m">1750 ㎡</option>
                  <option value="2000m">2000 ㎡</option>
                  <option value="3000m">3000 ㎡</option>
                  <option value="4000m">4000 ㎡</option>
                  <option value="5000m">5000 ㎡</option>
                  <option value="10000m">1 ha</option>
                  <option value="20000m">2 ha</option>
                  <option value="30000m">3 ha</option>
                  <option value="40000m">4 ha</option>
                  <option value="50000mm">5 ha</option>
                  <option value="100000m">10 ha</option>
                </select>
              </div>
            
            </div>
          </div>

          )
        }

      <div className="widget-wrapper">
        <h6 className="list-title">Energy Rating</h6>
        <select
          className="form-control"
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

      <div className="widget-wrapper">
        <h6 className="list-title">Parking Space</h6>
        {renderOptionButtons("parking_spaces", parking, setParking)}
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
          <label className="form-check-label" htmlFor="solar">
            Solar Ready
          </label>
        </div>

        <div className="form-check">
          <input
            className="form-check-input"
            type="checkbox"
            id="all-electric"
            onChange={handleAmenityChange}
            checked={amenities.includes("all-electric")}
          />
          <label className="form-check-label" htmlFor="all-electric">
            All-Electric
          </label>
        </div>

        <div className="form-check">
          <input
            className="form-check-input"
            type="checkbox"
            id="sustainable-materials"
            onChange={handleAmenityChange}
            checked={amenities.includes("sustainable-materials")}
          />
          <label className="form-check-label" htmlFor="sustainable-materials">
            Sustainable Materials
          </label>
        </div>
      </div>

      <div className="reset_filters d-flex justify-content-between mb-3">
        <Link
        to="#"
        onClick={(e) => {
          e.preventDefault();
          handleSaveSearch();
        }}
        className={`d-flex align-items-baseline small ${
          savingSearch ? "disabled" : ""
        }`}
      >
        {savingSearch ? (
          <i className="fa fa-spinner fa-spin me-1"></i>
        ) : (
          <i className="fa-regular fa-star me-1 text-dark"></i>
        )}
        <p className="m-0 text-dark">
          {savingSearch ? "Saving..." : "Save Search"}
        </p>
      </Link>


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
         onClick={() => {
            closeMobileFilter();   
            fetchProperties(1);
          }}
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



  /* ----- Saved Searches Api -------*/

  const handleSaveSearch = async () => {
  if (!user || !user.id) {
    toast.error("Please login to save search");
    setTimeout(() => {
      navigate("/login", { state: { from: routerLocation } });
      
    }, 2000);
    return;
  }

  if (savingSearch) return;

  const authToken = localStorage.getItem("authToken");

  if (!authToken) {
    toast.error("Session expired. Please login .");
    navigate("/login");
    return;
  }

  setSavingSearch(true);

  try {
    const payload = {
      user_id: user.id,
      property_type: propertyType || null,
      listing_type: listingType || null,
      bedrooms: bedroom !== "any" ? bedroom : null,
      bathrooms: bathroom !== "any" ? bathroom : null,
      performance_rating: performanceRating || null,
      amenities: amenities.length ? amenities : [],
      min_area: minArea !== "any" ? minArea.replace("m", "") : null,
      max_area: maxArea !== "any" ? maxArea.replace("m", "") : null,
      min_price: priceRange[0],
      max_price: priceRange[1],
    };

    const res = await api.post("/saved-filter-searches", payload );

    if (res.status === 201 || res.data?.id) {
      toast.success("Search saved successfully");
    } else {
      toast.error("Failed to save search");
    }
  } catch (error) {
    console.error("Save search error:", error);
    toast.error(
      error?.response?.data?.message || "Something went wrong"
    );
  } finally {
    setSavingSearch(false);
  }
};




  return (
    <>
      <Navbar />
      <section className="search_homes py-5">
        <div className="container">
          <div className="d-flex flex-wrap justify-content-between">
            <h1 className="sec-title mb-2">Property Listings</h1>
            <div className=" text-end mb-2">
              <button
                className="btn mobile-filter-btn"
                type="button"
                onClick={openMobileFilter}
              >
                <i className="fa fa-sliders me-1"></i> Filters
              </button>
            </div>
          </div>

          <div className="row mt-4">
            {/* Sidebar Offcanvas for Mobile */}
            <div
              className="offcanvas offcanvas-start "
              tabIndex="-1"
              id="mobileFilter"
              aria-labelledby="mobileFilterLabel"
            >
              <div className="offcanvas-header mb-2">
                <h5 className="offcanvas-title fw-semibold" id="mobileFilterLabel">
                  Apply Filters
                </h5>
                <button type="button" className="btn-close" onClick={closeMobileFilter} ></button>
              </div>
              <div className="offcanvas-body">{renderSidebar()}</div>
            </div>

            {/* Sidebar for Desktop */}
            {/* <div className="col-lg-4 d-none d-lg-block">
              <div className="list-sidebar-style1">{renderSidebar()}</div>
            </div> */}

            {/* Right Section */}
            <div className="col-lg-12 search_right">
              {filteredHomes.length > 0 && (
                <div className="d-flex align-items-baseline justify-content-between mb-2">
                  <p className="m-0">{`Showing results (${filteredHomes.length})`} </p>
                  <div className="d-none d-sm-block">
                    <div className="d-flex">
                      <Link
                        className={`border-end px-2 m-0 cursor-pointer ${!isListView ? "text-theme " : "text-dark"}`}
                        onClick={() => setIsListView(false)}
                      >
                        Grid
                      </Link>
                      <Link
                        className={`px-2 m-0 cursor-pointer ${isListView ? "text-theme " : "text-dark"}`}
                        onClick={() => setIsListView(true)}
                      >
                        List
                      </Link>
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
                <div className="row g-4">
                  {filteredHomes.map((home) => (
                    <div key={home.id} className={`${isListView ? "col-md-12 col-lg-6" : "col-lg-4 col-md-6"} `}>
                      <Link to={`/property/${home.slug}`} className={`listing-style1 ${isListView ? "d-flex" : "d-block"}`}>
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
                            {home.title}
                          </h6>
                          <p className="list-text text-capitalize text-truncate">{home.location}</p>
                          <div className="list-meta d-flex align-items-center">
                            <div >
                              <i className="fas fa-bed"></i> {home.bed}
                            </div>
                            <div >
                              <i className="fas fa-bath"></i> {home.bath}
                            </div>
                            <div >
                              <i className="fa-solid fa-chart-area"></i> {home.area}
                            </div>
                            <div  className="text-capitalize">
                              <i className="fa-solid fa-home"></i> {home.propertyType}
                            </div>
                          </div>
                          <hr className="text-dark" />
                          <div className="list-meta2 d-flex justify-content-between align-items-center ">
                            <div  className="view_details">
                              View details
                            </div>
                               <Tooltip text={likedHomes.includes(home.id) ? "Unsave" : "Save"}>
                                <div className="btn btn-sm btn-light"
                                  onClick={(e) => {
                                    e.preventDefault();
                                    e.stopPropagation();
                                    toggleSaveProperty(home.id);
                                  }}
                                  disabled={savingPropertyIds.includes(home.id)}>
                                {savingPropertyIds.includes(home.id) ? (
                                  <i className="fa fa-spinner fa-spin text-green"></i>
                                ) : (
                                  <i
                                    className={`fa-heart ${
                                      likedHomes.includes(home.id) ? "fa-solid text-danger" : "fa-regular"
                                    }`}
                                  ></i>
                                )}
                              </div>

                               </Tooltip>

                          </div>
                        </div>
                      </Link>
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
                      <li key={pageNum} className={`page-item ${pageNum === pagination.current_page ? "active" : ""}`}>
                        <Link className="page-link" to="#" onClick={() => fetchProperties(pageNum)}>
                          {pageNum}
                        </Link>
                      </li>
                    ))}

                    <li className={`page-item ${pagination.current_page === pagination.last_page ? "disabled" : ""}`}>
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

          <div className="row mt-5 d-none">
               <div className="col-md-6 p-0 home_card_left ">
                <img src="/images/card1.jpg " className="w-100" alt="" />
                </div> 
               <div className="col-md-6  d-flex flex-column justify-content-center home_card_right  ">
                  <div className="home_card">
                      <Link className="navbar-brand  p-0" to="/">
                      <img className="mb-4" src="/images/healthy_logo.png" alt="logo" style={{ height: "65px" }} />
                    </Link>
                    <h4 className="mb-4  fw-bold">Want to calculate the mortgage cost of the  property?</h4>
                    <Link to='/mortgage-calculator' className="btn btn-theme f-5 px-3 fw-semibold">Get Estimate</Link>
                  </div>
                </div> 
          </div>

        </div>
      </section>
      <Footer />
    </>
  );
};

export default SearchHome;
