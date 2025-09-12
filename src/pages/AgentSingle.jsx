import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import { useEffect, useRef, useState } from "react";
import AgencySingleSkeleton from "../components/skeletons/AgencySingleSkeleton";

const AgentSingle = () => {

  const { slug } = useParams();
  const ApiUrl = import.meta.env.VITE_API_URL;
  const [agent, setAgent] = useState([]);
  const [agencies, setAgencies] = useState([]);
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


  /*--- Agent Single Api ----*/

  useEffect(() => {
    const fetchAgency = async () => {
      try {
        const res = await axios.get(`${ApiUrl}/agents/single/listing/${slug}`, {
          headers: {
            "X-API-DOMAIN":
              "$2y$10$Vs8ujkh6QGdPgRU4Qsub7uP6l8fu5deHcfhF/ePrPWOkVWi3lDT0u",
          },
        });

        if (res.data.success) {
          setAgent(res.data.data);
          setAgencies(res.data.data.agencies[0]);
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


   useEffect(() => {
      if (descRef.current) {
        setIsTruncatable(descRef.current.scrollHeight > descRef.current.clientHeight);
      }
    }, [agent?.profile?.short_bio]);
  



  // Agents Listing
  
    let allProperties = [];
    let rentProperties = [];
    let buyProperties = [];
    let sellProperties = [];
  
    if (agent) {

      allProperties = agent.properties || [];

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
  
  
    // Property Card UI
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
                <Link to="#" className="me-2">
                  <i className="fa-solid fa-arrow-up-right-from-square"></i>
                </Link>
                <Link to="#">
                  <i className="fa-regular fa-heart"></i>
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
        //  <div  className="d-flex flex-column justify-content-center align-items-center" style={{ height: "80vh" }}  >
        //   <i className="fa-solid fa-home text-theme fs-1 loader-icon"></i>
        //   <span>Please wait...</span>
        // </div>
        <AgencySingleSkeleton />

    ) : !agent ? (
      <p className="text-center fw-bold py-5">No Details Found</p>
    ) : (
      <div className="agency_single agent_single">
        <div className="cta-agency cta-agent">
          <div className="container">
            <div className="row align-items-center">
              <div className="col-lg-8 mb-4 mb-lg-0">
                <div className="agent-single d-sm-flex align-items-center">
                  <div className="single-img mb-4 mb-sm-0">
                    <img alt="agents" src={`https://${agent.profile.profile_image}`} loading="lazy" />
                  </div>
                  <div className="single-contant ms-4 ">
                    <h1 className="title mb-0 text-white">{agent.name}</h1>
                    <p className="fz15 text-white">
                     Agent at<Link to={`/agency/${agencies.slug}`} className="ms-1"><b>{agencies.agency_name}</b></Link>
                    </p>
                    <div className="agent-meta mb15 d-md-flex align-items-center">
                      <Link
                        className="text fz15 pe-2 bdrr1 text-white"
                        to="#"
                      >
                        <i className="fas fa-star fz10 review-color2 pe-3"></i>
                        4.6 • 49 Reviews
                      </Link>
                      <a
                        className="text fz15 pe-2 ps-2 bdrr1 text-white"
                        href={`tel:${agent.phone_number}`}
                      >
                        <i className="fa-solid fa-phone"></i>{agent.phone_number}
                      </a>
                      <a href={`mailto:${agent.email}`} className="text fz15 ps-2 text-white">
                        <i className="fa-solid fa-envelope"></i> {agent.email}
                      </a>
                    </div>
                    <div className="agent-social mt-2">
                      {agent.profile.facebook && (
                        <Link className="me-3" target="_blank" to={agent.profile.facebook}>
                        <i className="fab fa-facebook-f"></i>
                      </Link>
                      )}
                      
                      {agent.profile.twitter && (
                        <Link className="me-3" target="_blank" to={agent.profile.twitter}>
                        <i className="fab fa-twitter"></i>
                      </Link>
                      )}
                      
                      {agent.profile.instagram && (
                        <Link className="me-3" target="_blank" to={agent.profile.instagram}>
                        <i className="fab fa-instagram"></i>
                      </Link>
                      )}
                      
                      {agent.profile.linkedin && (
                        <Link className="me-3" target="_blank" to={agent.profile.linkedin}>
                          <i className="fab fa-linkedin-in"></i>
                        </Link>  
                      )}
                    </div>
                  </div>
                </div>
                <div className="img-box-12 position-relative d-none d-xl-block">
                  <img
                    className="img-1"
                    src="/images/agency-single.png"
                    alt="svg image"
                  />
                  <img
                    className="img-2"
                    src="/images/agency-single1.png"
                    alt="svg image"
                  />
                </div>
              </div>
              <div className="col-lg-4">
                <div className="agent_company_details ">
                  <Link to={`/agency/${agencies.slug}`}>
                  <img src={`https://${agencies.logo}`} className="mb-3" alt="" />
                 <h5>{agencies.agency_name}</h5>
                 </Link>
                 <div className="row">
                    <div className="col-6 mb-2">
                      <p className="fz14  mb-0"><i className="fa-solid fa-building me-2"></i>{agencies.established}</p>
                    </div>
                    {/* <div className="col-6">
                      <p className="fz14 mb-2"><i className="fa-solid fa-users me-2"></i>250+ agents</p>
                    </div>
                    <div className="col-6">
                      <p className="fz14 mb-2"><i className="fa-solid fa-house me-2"></i>1300+ Sold</p>
                    </div> */}
                    {agencies.phone && (
                      <div className="col-6 mb-2">
                        <a href={`tel:${agencies.phone}`} className="fz14 "><i className="fa-solid fa-phone me-2"></i>{agencies.phone}</a>
                      </div>
                    )}

                    {agencies.contact_email && (
                      <div className="col-12 mb-2">
                      <a href={`mailto:${agencies.contact_email}`} className="fz14 "><i className="fa-solid fa-envelope me-2"></i>{agencies.contact_email}</a>
                      </div>
                    )}

                    {agencies.website && (
                      <div className="col-12 mb-2">
                      <Link target="_blank" to={agencies.website} className="fz14 "><i className="fa-solid fa-globe me-2"></i>{agencies.website}</Link>
                      </div>   
                    )}

                 </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="container">
          <div className="row py-5">
            <div className="col-lg-8 mb-4 mb-lg-0 pe-lg-5">
              <div className="row ">
                <div className="col-lg-12">
                  <div className="agent-single-details pb30 bdrb1">
                    <h5 className="mb-3 fw-bold">About Agent</h5>
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
                        __html: agent.profile.short_bio || "No description available.",
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
                        Listing ({allProperties.length})
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


                  </div>

                  <hr />

                  <div className="agent_reviews">
                    <div className="row align-items-baseline mt-4">
                      <div className="col-sm-4 mb-3 mb-sm-0">
                        <h5 className="fw-bold mb-0">Reviews (2)</h5>
                      </div>

                      <div className="col-sm-8"></div>
                    </div>

                    <div className="col-md-12">
                      <div className="mbp_first position-relative d-flex align-items-center justify-content-start mt-4 mb-sm-4">
                        <img
                          src="/images/review.png"
                          alt="review.png"
                          loading="lazy"
                        />
                        <div className="ms-4">
                          <h6 className="mt-0 mb-0 fw-bold">Bessie Cooper</h6>
                          <div>
                            <span className="fz14">12 March 2022</span>
                            <div className="blog-single-review">
                              <ul className="mb0 ps-0">
                                <li className="list-inline-item me-0">
                                  <Link to="#">
                                    <i className="fas fa-star review-color2 fz10"></i>
                                  </Link>
                                </li>
                                <li className="list-inline-item me-0">
                                  <Link to="#">
                                    <i className="fas fa-star review-color2 fz10"></i>
                                  </Link>
                                </li>
                                <li className="list-inline-item me-0">
                                  <Link to="#">
                                    <i className="fas fa-star review-color2 fz10"></i>
                                  </Link>
                                </li>
                                <li className="list-inline-item me-0">
                                  <Link to="#">
                                    <i className="fas fa-star review-color2 fz10"></i>
                                  </Link>
                                </li>
                                <li className="list-inline-item me-0">
                                  <Link to="#">
                                    <i className="fas fa-star review-color2 fz10"></i>
                                  </Link>
                                </li>
                              </ul>
                            </div>
                          </div>
                        </div>
                      </div>
                      <p className="text mt20 mb20">Every single thing we tried with Mark was delicious! Found some awesome places we would definitely go back to on our trip. Mark was also super friendly and passionate about Beşiktaş and Istanbul.</p>
                      <div className="row g-2 review_images">
                        <div className="col-3 col-sm-2">
                            <img src="/images/card1.jpg" className="" alt="image1" />
                        </div>
                        <div className="col-3 col-sm-2">
                            <img src="/images/card2.jpg" className="" alt="image2" />
                        </div>
                        <div className="col-3 col-sm-2">
                            <img src="/images/card3.jpg" className="" alt="image3" />
                        </div>
                        <div className="col-3 col-sm-2">
                            <img src="/images/card4.jpg" className="" alt="image4" />
                        </div>
                      </div>
                      {/* <div className="d-flex mt-3">
                        <div className="d-flex align-items-baseline me-4">
                            <i className="fa-regular fa-thumbs-up me-1"></i><span>Helpul</span>
                        </div>
                        <div className="d-flex align-items-baseline">
                            <i className="fa-regular fa-thumbs-down me-1"></i><span>Not Helpul</span>
                        </div>
                      </div> */}
                    </div>
                    <hr />
                     <div className="col-md-12">
                      <div className="mbp_first position-relative d-flex align-items-center justify-content-start mt-4 mb-sm-4">
                        <img
                          src="/images/review.png"
                          alt="review.png"
                          loading="lazy"
                        />
                        <div className="ms-4">
                          <h6 className="mt-0 mb-0 fw-bold">John Wick</h6>
                          <div>
                            <span className="fz14">12 March 2022</span>
                            <div className="blog-single-review">
                              <ul className="mb0 ps-0">
                                <li className="list-inline-item me-0">
                                  <Link to="#">
                                    <i className="fas fa-star review-color2 fz10"></i>
                                  </Link>
                                </li>
                                <li className="list-inline-item me-0">
                                  <Link to="#">
                                    <i className="fas fa-star review-color2 fz10"></i>
                                  </Link>
                                </li>
                                <li className="list-inline-item me-0">
                                  <Link to="#">
                                    <i className="fas fa-star review-color2 fz10"></i>
                                  </Link>
                                </li>
                                <li className="list-inline-item me-0">
                                  <Link to="#">
                                    <i className="fas fa-star review-color2 fz10"></i>
                                  </Link>
                                </li>
                                <li className="list-inline-item me-0">
                                  <Link to="#">
                                    <i className="fas fa-star review-color2 fz10"></i>
                                  </Link>
                                </li>
                              </ul>
                            </div>
                          </div>
                        </div>
                      </div>
                      <p className="text mt20 mb20">Every single thing we tried with Mark was delicious! Found some awesome places we would definitely go back to on our trip. Mark was also super friendly and passionate about Beşiktaş and Istanbul.</p>
                      <div className="row g-2 review_images">
                        <div className="col-3 col-sm-2">
                            <img src="/images/card1.jpg" className="" alt="image1" />
                        </div>
                        <div className="col-3 col-sm-2">
                            <img src="/images/card2.jpg" className="" alt="image1" />
                        </div>
                        <div className="col-3 col-sm-2">
                            <img src="/images/card3.jpg" className="" alt="image1" />
                        </div>
                        <div className="col-3 col-sm-2">
                            <img src="/images/card4.jpg" className="" alt="image1" />
                        </div>
                      </div>

                      {/* <div className="d-flex mt-3">
                        <div className="d-flex align-items-baseline me-4">
                            <i className="fa-regular fa-thumbs-up me-1"></i><span>Helpul</span>
                        </div>
                        <div className="d-flex align-items-baseline">
                            <i className="fa-regular fa-thumbs-down me-1"></i><span>Not Helpul</span>
                        </div>
                      </div> */}

                    </div>
                    <hr />
                  </div>
                </div>
              </div>
            </div>

            <div className="col-lg-4">
              <div className="agency_single_right">
                <div className="agency_single_right_wrapper">
                  <div className="agency_single_form mb-4">
                    <h5 className="form-title mb-4 fw-bold">Contact Form</h5>
                    <form className="form-style1">
                      <div className="row">
                        <div className="col-lg-12">
                          <div className="mb-3">
                            <input
                              className="form-control"
                              placeholder="Your Name"
                              required=""
                              type="text"
                            />
                          </div>
                        </div>
                        <div className="col-lg-12">
                          <div className="mb-3">
                            <input
                              className="form-control"
                              placeholder="Phone"
                              required=""
                              type="text"
                            />
                          </div>
                        </div>
                        <div className="col-md-12">
                          <div className="mb-3">
                            <input
                              className="form-control"
                              placeholder="Email"
                              required=""
                              type="email"
                            />
                          </div>
                        </div>
                        <div className="col-md-12">
                          <div className="mb-3">
                            <textarea
                              className="px-2 py-3"
                              cols="30"
                              rows="4"
                              placeholder="Write message here..."
                              required=""
                            ></textarea>
                          </div>
                        </div>
                        <div className="col-md-12 ">
                          <Link
                            className="btn ud-btn btn-white search_home_btn w-100"
                            data-discover="true"
                          >
                            Send Message
                          </Link>
                        </div>
                      </div>
                    </form>
                  </div>
                  <div className="agency_single_info border-0">
                    <div className="widget-wrapper mb-0">
                      <h6 className="title fw-bold mb-4"> Agent Information </h6>
                      {agent.profile.location && (
                        <div className="list-news-style d-flex align-items-center justify-content-between mb10">
                          <div className="flex-shrink-0">
                            <h6 className="fw-bold mb-0">Address</h6>
                          </div>
                          <div className="news-content flex-shrink-1 ms-3 text-end">
                            <p className="text mb-0 fz14">{agent.profile.location}</p>
                          </div>
                        </div>
                      )}

                      {agent.profile.experience_years && (
                        <div className="list-news-style d-flex align-items-center justify-content-between mb10">
                          <div className="flex-shrink-0">
                            <h6 className="fw-bold mb-0">Experience</h6>
                          </div>
                          <div className="news-content flex-shrink-1 ms-3 text-end">
                            <p className="text mb-0 fz14">{agent.profile.experience_years} years</p>
                          </div>
                        </div>
                      )}

                      {agent.phone_number && (
                        <div className="list-news-style d-flex align-items-center justify-content-between mb10">
                          <div className="flex-shrink-0">
                            <h6 className="fw-bold mb-0">Phone</h6>
                          </div>
                          <div className="news-content flex-shrink-1 ms-3 text-end">
                            <p className="text mb-0 fz14"><a href={`mailto:${agent.phone_number}`}>{agent.phone_number}</a></p>
                          </div>
                        </div>
                      )}

                      {agent.email && (
                        <div className="list-news-style d-flex align-items-center justify-content-between mb10">
                          <div className="flex-shrink-0">
                            <h6 className="fw-bold mb-0">Email</h6>
                          </div>
                          <div className="news-content flex-shrink-1 ms-3 text-end">
                            <p className="text mb-0 fz14"><a href={`mailto:${agent.email}`}> {agent.email}</a></p>
                          </div>
                        </div> 
                      )}

                      {agent.profile.website && (
                        <div className="list-news-style d-flex align-items-center justify-content-between mb10">
                          <div className="flex-shrink-0">
                            <h6 className="fw-bold mb-0">Website</h6>
                          </div>
                          <div className="news-content flex-shrink-1 ms-3 text-end">
                            <p className="text mb-0 fz14"><Link to={agent.profile.website} target="_blank" >{agent.profile.website}</Link></p>
                          </div>
                        </div>
                      )}

                      {/* <div className="list-news-style d-flex align-items-center justify-content-between mb10">
                        <div className="flex-shrink-0">
                          <h6 className="fw-bold mb-0">Member since</h6>
                        </div>
                        <div className="news-content flex-shrink-1 ms-3 text-end">
                          <p className="text mb-0 fz14">10-01-2024</p>
                        </div>
                      </div> */}
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

export default AgentSingle;
