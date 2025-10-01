import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { Link, Links, useLocation, useNavigate, useParams } from "react-router-dom";
import { useRef } from "react";
import AgencySingleSkeleton from "../components/skeletons/AgencySingleSkeleton";
import Avatar from "react-avatar";
import api from "../utils/axios";
import { toast } from "react-toastify";
import { useAuth } from "../context/AuthContext";

const AgencySingle = () => {
  const { slug } = useParams();
  const {user} = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [agency, setAgency] = useState(null);
  const [loading, setLoading] = useState(true);

  const [showFullText, setShowFullText] = useState(false);
  const [isTruncatable, setIsTruncatable] = useState(false);
  const descRef = useRef(null);
  const toggleText = () => setShowFullText((prev) => !prev);

  const [visibleCounts, setVisibleCounts] = useState({
  all: 4,
  rent: 4,
  buy: 4,
  sell: 4,
});


const handleShowMore = (type) => {
  setVisibleCounts((prev) => ({
    ...prev,
    [type]: prev[type] + 4,
  }));
};

const handleShowLess = (type) => {
  setVisibleCounts((prev) => ({
    ...prev,
    [type]: 4,
  }));
};


function formatTime(timeStr) {
  if (!timeStr) return "";
  const [hourStr, minStr] = timeStr.split(":");
  let hour = parseInt(hourStr, 10);
  const min = minStr;
  const ampm = hour >= 12 ? "PM" : "AM";
  hour = hour % 12 || 12; // convert 0->12, 13->1
  return `${hour}:${min} ${ampm}`;
}


 /*--- Agency Single Api ----*/

  useEffect(() => {
    const fetchAgency = async () => {
      try {
        const res = await api.get(`/agency/single/listing/${slug}`);

        if (res.data.success) {
          setAgency(res.data.data);
          console.log(res.data.data);
        }
      } catch (err) {
        console.error("Error fetching agency:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchAgency();
  }, [slug]);


  const handleContactClick = (e) => {
      e.preventDefault();
  
      if (!user) {
        toast.error("Login to view agent profile!");
        setTimeout(() => {
          navigate("/login" , { state: { from: location } });
        }, 2000);
        return;
      }
      // If logged in → redirect to agent profile
      navigate(`/agent/${agent?.profile?.slug}`);
    };


  useEffect(() => {
    if (descRef.current) {
      // Check if the description height is greater than 5 lines (7.5em)
      setIsTruncatable(descRef.current.scrollHeight > descRef.current.clientHeight);
    }
  }, [agency?.description]);


  // if (loading) return <p className="text-center py-5">Loading...</p>;
  // if (!agency) return <p className="text-center py-5">No Agency Found</p>;


  // Agents Listing

  let allProperties = [];
  let rentProperties = [];
  let buyProperties = [];
  let sellProperties = [];

  if (agency) {
    // allProperties = agency.agents?.flatMap((agent) => agent.properties || []) || [];
     allProperties = agency.agents?.flatMap((agent) =>
    (agent.properties || []).map((property) => ({
      ...property,
      agentName: agent.name,  
      agentSlug: agent.profile.slug,
      agentProfile: agent.profile.profile_image,
    }))
  ) || [];
    rentProperties = allProperties.filter(
      (p) => p.listing_type?.toLowerCase() === "rent"
    );
    buyProperties = allProperties.filter(
      (p) => p.listing_type?.toLowerCase() === "buy"
    );
    sellProperties = allProperties.filter(
      (p) => p.listing_type?.toLowerCase() === "sell"
    );
  }


  //  Card UI
  const renderPropertyCard = (property) => (
    <div className="col-md-6 " key={property.id}>
      <div className="listing-style1 mb-0">
        <div className="list-thumb">
          <img
            alt={property.title}
            className="w-100"
            loading="lazy"
            src={
              property.featured_image
                ? `https://${property.featured_image}`
                : "/images/default-property.png"
            }
          />
          <div className="sale-sticker-wrap">
            {property.performance_rating && (
              <div className="list-tag fz12">
                <i className="fa-solid fa-bolt me-1"></i>
                {property.performance_rating}
              </div>
            )}
            <div className="list-tag fz12 bg-dark">
              <i className="fa-solid fa-flag me-1"></i>
              {property.listing_type}
            </div>
          </div>
          <div className="list-price">
            {property.currency} {parseFloat(property.price).toLocaleString()}
          </div>
        </div>

        <div className="list-content">
          <h6 className="list-title text-truncate">
            <Link to={`/property/${property.slug}`}>{property.title}</Link>
          </h6>
          <p className="list-text text-truncate">{property.address}</p>

          <div className="list-meta d-flex align-items-center">
            <div>
              <i className="fas fa-bed"></i> {property.bedrooms}
            </div>
            <div>
              <i className="fas fa-bath"></i> {property.bathrooms}
            </div>
            {property.area_m2 && property.area_unit && (
              <div>
                <i className="fa-solid fa-chart-area"></i>
                {property.area_m2} {property.area_unit}
              </div>
            )}

            <div className="text-capitalize">
              <i className="fa-solid fa-home"></i> {property.property_type}
            </div>
          </div>

          

          <hr className="my-2" />
          <div className="list-meta2 d-flex justify-content-between align-items-center mt-3">
            <Link className="view_details" to={`/property/${property.slug}`}>
              View details
            </Link>
            <div className="icons d-flex align-items-center">
              {/* <Link to="#" className="me-2">
                <i className="fa-solid fa-arrow-up-right-from-square"></i>
              </Link> */}
              {/* <Link to="#" className="me-2">
                <i className="fa-regular fa-heart"></i>
              </Link> */}
              <Link to={`/agent/${property.agentSlug}`} className="d-flex justify-content-end">
              {/* <span className="small badge bg-warning "> <strong className="text-dark">{property.agentName}</strong>  </span> */}
              <img className="rounded-circle shadow bg-0 w-100 h-100" src={`https://${property.agentProfile}`} alt="property.agentName" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
 


  return (
    <div>
      <Navbar />
      {loading ? (
        // <div  className="d-flex flex-column justify-content-center align-items-center" style={{ height: "80vh" }}  >
        //   <i className="fa-solid fa-home text-theme fs-1 loader-icon"></i>
        //   <span>Please wait...</span>
        // </div>
        <AgencySingleSkeleton />

    ) : !agency ? (
      <div  className="d-flex flex-column justify-content-center align-items-center" style={{ height: "80vh" }}  >
        <i className="fa-solid fa-home text-theme fs-1 loader-icon mb-2"></i>
        <h5 className="text-center fw-bold ">No Agency Found</h5>

      </div>
    ) : (
      
      <div className="agency_single">
        <div className="cta-agency">
          <div className="container">
            <div className="row align-items-center">
              <div className="col-xl-7">
                <div className="agent-single d-sm-flex align-items-center">
                  <div className="single-img mb-4">
                    <img
                      alt={agency.agency_name}
                      src={`https://${agency.logo}` || "/images/default_img.png"}
                      loading="lazy"
                    />
                  </div>
                  <div className="single-contant ms-4">
                    <h1 className="title mb-0 text-white">{agency.agency_name}</h1>
                    <p className="fz15 text-white">{agency.location}</p>
                    {/* <div className="agent-meta mb15 d-md-flex align-items-center">
                      <Link className="text fz15 pe-2 bdrr1 text-white" to="#">
                        <i className="fas fa-star fz10 review-color2 pe-3"></i>
                        4.6 • 49 Reviews
                      </Link>
                      <Link className="text fz15 pe-2 ps-2 bdrr1 text-white" to="#">
                        <i className="fa-solid fa-phone"></i> {agency.phone}
                      </Link>
                      <a href={`mailto:${agency.contact_email}`} className="text fz15 ps-2 text-white">
                        <i className="fa-solid fa-envelope"></i> {agency.contact_email}
                      </a>
                    </div> */}
                  </div>
                </div>
                <div className="img-box-12 position-relative d-none d-xl-block">
                  <img className="img-1" src="/images/agency-single.png" alt="svg image" />
                  <img className="img-2" src="/images/agency-single1.png" alt="svg image" />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* CONTENT */}
        <div className="container">
          <div className="row py-5">
            <div className="col-lg-8 mb-4 mb-lg-0 pe-lg-5">
              <div className="row">
                <div className="col-lg-12">
                  {/* <div className="agent-single-details pb30 bdrb1">
                    <h5 className="mb-3 fw-bold">About Agency</h5>
                    <p>{agency.description || "No description available."}</p>
                  </div> */}

                  <div className="agent-single-details pb30 bdrb1">
                    <h5 className="mb-3 fw-bold">About Agency</h5>
                    <div
                      className={`text mb-2 description-text ${showFullText ? "expanded" : ""
                        }`}
                      ref={descRef}
                      style={{
                        maxHeight: !showFullText ? "7.5em" : "none", // ~5 lines if line-height = 1.5em
                        overflow: "hidden",
                        lineHeight: "1.5em",
                        transition: "max-height 0.3s ease",
                      }}
                      dangerouslySetInnerHTML={{
                        __html: agency.description || "No description available.",
                      }}
                    />

                    {isTruncatable && (
                      <p
                        className="fw-bold text-theme"
                        style={{ cursor: "pointer" }}
                        onClick={toggleText}
                      >
                        {showFullText ? "Show less" : "Show more"}
                      </p>
                    )}
                  </div>



                  {/* Property Lisiting Tabs */}
                  <div className="row align-items-baseline mt-4">
                    <div className="col-sm-4 mb-3 mb-sm-0">
                      <h5 className="fw-bold mb-0 me-3">
                        Properties ({allProperties.length})
                      </h5>
                    </div>
                    <div className="col-sm-8">
                      <ul
                        className="nav nav-pills mb-3 justify-content-start justify-content-sm-end"
                        id="pills-tab"
                        role="tablist"
                      >
                        <li className="nav-item" role="presentation">
                          <button
                            className="nav-link active"
                            id="pills-all-tab"
                            data-bs-toggle="pill"
                            data-bs-target="#pills-all"
                            type="button"
                            role="tab"
                          >
                            All
                          </button>
                        </li>
                        <li className="nav-item" role="presentation">
                          <button
                            className="nav-link"
                            id="pills-rent-tab"
                            data-bs-toggle="pill"
                            data-bs-target="#pills-rent"
                            type="button"
                            role="tab"
                          >
                            For Rent
                          </button>
                        </li>
                        <li className="nav-item" role="presentation">
                          <button
                            className="nav-link"
                            id="pills-buy-tab"
                            data-bs-toggle="pill"
                            data-bs-target="#pills-buy"
                            type="button"
                            role="tab"
                          >
                            For Sale
                          </button>
                        </li>
                        <li className="nav-item" role="presentation">
                          <button
                            className="nav-link"
                            id="pills-sell-tab"
                            data-bs-toggle="pill"
                            data-bs-target="#pills-sell"
                            type="button"
                            role="tab"
                          >
                            Sold
                          </button>
                        </li>
                      </ul>
                    </div>
                  </div>

                  {/* Property Lisiting Content */}
                  <div className="row py-4">
                    <div className="col-12">
                      <div className="tab-content p-0" id="pills-tabContent">
                        {/* All */}
                        <div
                          className="tab-pane fade show active"
                          id="pills-all"
                          role="tabpanel"
                        >
                          <div className="row g-4">
                            {/* {allProperties.length > 0 ? (
                              allProperties.map(renderPropertyCard)
                            ) : (
                              <p>No properties available.</p>
                            )} */}

                            {allProperties.length > 0 ? (
                              <>
                                {allProperties.slice(0, visibleCounts.all).map(renderPropertyCard)}

                                {allProperties.length > 4 && (
                                  <div className="col-12 d-flex justify-content-center mt-4">
                                    {visibleCounts.all < allProperties.length ? (
                                      <button
                                        className="btn ud-btn btn-white search_home_btn black_btn"
                                        onClick={() => handleShowMore("all")}
                                      >
                                        Show More
                                      </button>
                                    ) : (
                                      <button
                                        className="btn ud-btn btn-white search_home_btn black_btn"
                                        onClick={() => handleShowLess("all")}
                                      >
                                        Show Less
                                      </button>
                                    )}
                                  </div>
                                )}
                              </>
                            ) : (
                              <p>No properties available.</p>
                            )}


                          </div>
                        </div>

                        {/* Rent */}
                        <div className="tab-pane fade" id="pills-rent" role="tabpanel">
                          <div className="row g-4">
                            {rentProperties.length > 0 ? (
                              rentProperties.map(renderPropertyCard)
                            ) : (
                              <p>No rental properties.</p>
                            )}
                          </div>
                        </div>

                        {/* Buy */}
                        <div className="tab-pane fade" id="pills-buy" role="tabpanel">
                          <div className="row g-4">
                            {buyProperties.length > 0 ? (
                              buyProperties.map(renderPropertyCard)
                            ) : (
                              <p>No properties for sale.</p>
                            )}
                          </div>
                        </div>

                        {/* Sold */}
                        <div className="tab-pane fade" id="pills-sell" role="tabpanel">
                          <div className="row g-4">
                            {sellProperties.length > 0 ? (
                              sellProperties.map(renderPropertyCard)
                            ) : (
                              <p className="m-0 fw-bold text-center py-3">No sold properties yet.</p>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* <div className="col-12">
                      <Link className="btn ud-btn btn-white search_home_btn black_btn">
                        View all Listings <i className="fas fa-arrow-right-long"></i>
                      </Link>
                    </div> */}

                  </div>

                  <hr />

                  {/* Agents */}
                  {agency.agents && agency.agents.length > 0 && (
                    <div className="agents_section py-4">
                      <h5 className="fw-bold mb-3">Our Agents</h5>
                      <div className="row g-4">
                        {agency.agents.slice(0, 3).map((agent) => (
                          <div className="col-lg-4 col-sm-4 col-6" key={agent.id}>
                            <div className="item agent_card">
                              <Link onClick={handleContactClick}>
                                <div className="team-style1">
                                  <div className="team-img">
                                    {/* { agent.photo ?  <img
                                          alt={agent.name}
                                          src={agent.photo || "/images/deagult_img.png"}
                                          className="w-100"
                                        /> : 
                                        <Avatar 
                                          size="150"
                                          name={agent.name }
                                          className="w-100"
                                          round={4}
                                    />  } */}

                                         <img
                                          alt={agent.name}
                                          src={ agent?.profile?.profile_image ? `https://${agent?.profile?.profile_image}`: "/images/default_img.png"}
                                          className="w-100"
                                        />
                                        {/* <p>{agent.profile.instagram}</p> */}
                                  </div>
                                  <div className="team-content pt-4">
                                    <h6 className="name mb-1 text-capitalize">
                                      {agent.name}
                                    </h6>
                                    {/* <p className="text fz15 mb-0">{agent.phone_number}</p> */}
                                  </div>
                                </div>
                              </Link>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Sidebar */}
            <div className="col-lg-4">
              <div className="agency_single_right">
                <div className="agency_single_right_wrapper">
                  <div className="agency_single_form mb-4">
                    <h5 className="form-title mb-4 fw-bold">Contact Form</h5>
                    <form className="form-style1">
                      <div className="row">
                        <div className="col-lg-12 mb-3">
                          <input className="form-control" placeholder="Your Name" type="text" />
                        </div>
                        <div className="col-lg-12 mb-3">
                          <input className="form-control" placeholder="Phone" type="text" />
                        </div>
                        <div className="col-md-12 mb-3">
                          <input className="form-control" placeholder="Email" type="email" />
                        </div>
                        <div className="col-md-12 mb-3">
                          <textarea
                            className="px-2 py-3"
                            cols="30"
                            rows="4"
                            placeholder="Write message here..."
                          ></textarea>
                        </div>
                        <div className="col-md-12">
                          <Link className="btn ud-btn btn-white search_home_btn w-100">
                            Send Message
                          </Link>
                        </div>
                      </div>
                    </form>
                  </div>

                  <div className="agency_single_info border-0">
                    <div className="widget-wrapper mb-0">
                      <h6 className="title fw-bold mb-4">Professional Information</h6>
                      
                      {agency.location && (
                        <div className="list-news-style d-flex justify-content-between align-items-baseline mb10">
                          <h6 className="fw-bold mb-0 me-3">Address</h6>
                          <p className="text mb-0 fz14">{agency.location}</p>
                        </div>
                      )}
                
                      {(agency.open_time && agency.close_time) && (
                        <div className="list-news-style d-flex justify-content-between align-items-baseline mb10">
                          <h6 className="fw-bold mb-0 me-3">Office Hours</h6>
                          <p className="text mb-0 fz14">
                            {formatTime(agency.open_time)} - {formatTime(agency.close_time)}
                          </p>
                        </div>
                      )}

                      {agency.other_hours && agency.other_hours.trim() !== "" && (
                        <div className="list-news-style d-flex justify-content-between align-items-baseline mb10">
                          <h6 className="fw-bold mb-0 me-3">Other Hours</h6>
                          <p className="text mb-0 fz14">{agency.other_hours}</p>
                        </div>
                      )}
                      
                   
                      {agency.website && (
                        <div className="list-news-style d-flex justify-content-between align-items-baseline mb10">
                          <h6 className="fw-bold mb-0 me-3">Website</h6>
                          <a
                            href={agency.website.startsWith("http") ? agency.website : `https://${agency.website}`}
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            <p className="text mb-0 fz14">{agency.website}</p>
                          </a>

                        </div>
                      )}
                      {agency.established && (
                        <div className="list-news-style d-flex justify-content-between align-items-baseline mb10">
                          <h6 className="fw-bold mb-0 me-3">Member since</h6>
                          <p className="text mb-0 fz14">{agency.established}</p>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    )}
      <Footer />
    </div>
  );
};

export default AgencySingle;
