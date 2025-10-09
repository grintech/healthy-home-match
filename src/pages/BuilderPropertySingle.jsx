import { useRef, useState, useEffect } from "react";
import Lightbox from "yet-another-react-lightbox";
import Zoom from "yet-another-react-lightbox/plugins/zoom";
import Thumbnails from "yet-another-react-lightbox/plugins/thumbnails";
import "yet-another-react-lightbox/styles.css";
import "yet-another-react-lightbox/plugins/thumbnails.css";
import { Link } from "react-router-dom";
import "./SinglePage/single.css";
import Navbar from "../components/Navbar";
import Tooltip from "../components/Tooltip";
import Footer from "../components/Footer";

const BuilderPropertySingle = () => {
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [slideIndex, setSlideIndex] = useState(0);

  const [liked, setLiked] = useState(false);
    const toggleHeart = () => {
    setLiked(!liked);
  };

   const [inputType, setInputType] = useState("text");


  const images = [
    "/images/card1.jpg",
    "/images/card2.jpg",
    "/images/card3.jpg",
    "/images/card4.jpg",
    "/images/blog1.jpg",
    "/images/blog2.jpg",
    "/images/blog3.jpg",
  ];

  const openLightbox = (index) => {
    setSlideIndex(index);
    setLightboxOpen(true);
  };

  const [showFullText, setShowFullText] = useState(false);
const [isTruncatable, setIsTruncatable] = useState(false);
const descRef = useRef(null);

const toggleText = () => setShowFullText((prev) => !prev);

useEffect(() => {
  if (descRef.current) {
    const lineHeight = parseFloat(getComputedStyle(descRef.current).lineHeight);
    const lines = descRef.current.scrollHeight / lineHeight;
    setIsTruncatable(lines > 5);
  }
}, []);

  return (
    <>
      <Navbar />
      <div className="property_single">
        <div className="container my-5">
            {/* Title & Meta */}
            <div className="mb-4 row justify-content-between">
            <div className="col-md-8 mb-4 mb-md-0">
                <h1 className="sec-title">Luxury Villa in Rego Park</h1>
                <div className="d-flex small_desc flex-wrap">
                    <p className="border-end pe-2 mb-1">New York City, CA, USA</p>
                    <p className="border-end px-2 mb-1">
                        <i className="fa-solid fa-circle text-theme"></i> For Sale
                    </p>
                    <p className="border-end px-2 mb-1">
                        <i className="fa-regular fa-clock"></i> 7 years ago
                    </p>
                </div>
                <div className="d-flex">
                    <div className="list-tag fz12 me-2"><i className="fa-solid fa-bolt me-1"></i>NatHERS</div>
                    <div className="list-tag fz12 me-2"><i className="fa-solid fa-bolt me-1"></i>All-Electric</div>
                </div>
            </div>
            <div className="col-md-4">
                <div className="property-action text-md-end">
                <div className="d-flex mb20 mb10-md align-items-center justify-content-md-end mb-3">
                    <Tooltip text={liked ? "Remove from Favorites" : "Add to Favorites"}>
                      <Link
                        to="#"
                        onClick={toggleHeart}
                        className="icon me-3"
                    >
                        <i className={`fa-heart ${liked ? "fa-solid text-danger" : "fa-regular"}`}></i>
                    </Link>

                    </Tooltip>

                    <Tooltip text={"Share"}>
                        <Link
                            className="icon me-3"
                            to="#"
                        >
                            <i className="fa-solid fa-share"></i>
                        </Link>

                    </Tooltip>

                    <Tooltip text={"Download brochure"}>
                        <Link
                            className="icon"
                            to="#"
                        >
                            <i className="fa-solid fa-download"></i>
                        </Link>
                    </Tooltip>
                   
                </div>
                <h4 className="price">$14,000</h4>
                </div>
            </div>
            </div>

            {/* Gallery with Lightbox */}
            <div className="gallery_images row g-3 mb-5">
            <div className="col-sm-6 overflow-hidden">
                <div className="img_wrapper h-100">
                <img
                    className="w-100 h-100"
                    src="/images/card1.jpg"
                    alt="property image"
                    onClick={() => openLightbox(0)}
                    style={{ cursor: "pointer" }}
                />
                </div>
            </div>
            <div className="col-sm-6">
                <div className="row g-3">
                <div className="col-6 overflow-hidden">
                    <div className="img_wrapper">
                    <img
                        className="w-100"
                        src="/images/card2.jpg"
                        alt="property image"
                        onClick={() => openLightbox(1)}
                        style={{ cursor: "pointer" }}
                    />
                    </div>
                </div>
                <div className="col-6 overflow-hidden">
                    <div className="img_wrapper">
                    <img
                        className="w-100"
                        src="/images/card3.jpg"
                        alt="property image"
                        onClick={() => openLightbox(2)}
                        style={{ cursor: "pointer" }}
                    />
                    </div>
                </div>
                <div className="col-6 overflow-hidden">
                    <div className="img_wrapper">
                    <img
                        className="w-100"
                        src="/images/card4.jpg"
                        alt="property image"
                        onClick={() => openLightbox(3)}
                        style={{ cursor: "pointer" }}
                    />
                    </div>
                </div>
                <div className="col-6 overflow-hidden">
                    <div className="img_wrapper">
                    <img
                        className="w-100"
                        src="/images/blog1.jpg"
                        alt="property image"
                        onClick={() => openLightbox(4)}
                        style={{ cursor: "pointer" }}
                    />
                    </div>
                </div>
                </div>
            </div>
            </div>

            <Lightbox
            open={lightboxOpen}
            close={() => setLightboxOpen(false)}
            index={slideIndex}
            slides={images.map((src) => ({ src }))}
            plugins={[Zoom, Thumbnails]}
            />

            <div className="row">
            {/* Left Column */}
            <div className="col-lg-8">
                <div className="card overview_card border-0">
                <h4 className="mb-4 single_head">Overview</h4>
                <div className="row prop_desc">
                    <div className="col-6 col-lg-4 mb-4">
                    <div className="overview-element position-relative d-flex align-items-center">
                        <i className="fa-solid fa-bed"></i>
                        <div className="ms-3">
                        <h6 className="mb-0">Bedroom</h6>
                        <p className="text mb-0 ">1</p>
                        </div>
                    </div>
                    </div>
                    <div className="col-6 col-lg-4 mb-4">
                    <div className="overview-element position-relative d-flex align-items-center">
                        <i className="fa-solid fa-bath"></i>
                        <div className="ms-3">
                        <h6 className="mb-0">Bathrooms</h6>
                        <p className="text mb-0 ">2</p>
                        </div>
                    </div>
                    </div>
                    <div className="col-6 col-lg-4 mb-4">
                    <div className="overview-element position-relative d-flex align-items-center">
                        <i className="fa-solid fa-calendar-days"></i>
                        <div className="ms-3">
                        <h6 className="mb-0">Year Built</h6>
                        <p className="text mb-0 ">2018</p>
                        </div>
                    </div>
                    </div>
                    <div className="col-6 col-lg-4 mb-4">
                    <div className="overview-element position-relative d-flex align-items-center">
                        <i className="fa-solid fa-warehouse"></i>

                        <div className="ms-3">
                        <h6 className="mb-0">Garage</h6>
                        <p className="text mb-0 ">2</p>
                        </div>
                    </div>
                    </div>
                    <div className="col-6 col-lg-4 mb-4">
                    <div className="overview-element position-relative d-flex align-items-center">
                        <i className="fa-solid fa-chart-area"></i>

                        <div className="ms-3">
                        <h6 className="mb-0">Sqft</h6>
                        <p className="text mb-0 ">1200</p>
                        </div>
                    </div>
                    </div>
                    <div className="col-6 col-lg-4 mb-4">
                    <div className="overview-element position-relative d-flex align-items-center">
                        <i className="fa-solid fa-home"></i>
                        <div className="ms-3">
                        <h6 className="mb-0">Property Type</h6>
                        <p className="text mb-0 ">Houses</p>
                        </div>
                    </div>
                    </div>
                </div>
                </div>

                <div className="card overview_card border-0">
               <div className="mb-5">
                <h4 className="mb-4 single_head">Property Description</h4>
                <p
                    className={`text mb-2 description-text ${showFullText ? "expanded" : ""}`}
                    ref={descRef}
                    style={{
                    maxHeight: !showFullText ? "7.5em" : "none", // 7.5em = 5 lines if line-height = 1.5em
                    overflow: "hidden",
                    lineHeight: "1.5em",
                    transition: "max-height 0.3s ease",
                    }}
                >
                    This 3-bed with a loft, 2-bath home in the gated community of The Hideout has it all. From the open floor plan to the abundance of light from the windows, this home is perfect for entertaining. The living room and dining room have vaulted ceilings and a beautiful fireplace. You will love spending time on the deck taking in the beautiful views. In the kitchen, you'll find stainless steel appliances and a tile backsplash, as well as a breakfast bar. This 3-bed with a loft, 2-bath home in the gated community of The Hideout has it all. 
                     This 3-bed with a loft, 2-bath home in the gated community of The Hideout has it all. From the open floor plan to the abundance of light from the windows, this home is perfect for entertaining. The living room and dining room have vaulted ceilings and a beautiful fireplace. You will love spending time on the deck taking in the beautiful views. In the kitchen, you'll find stainless steel appliances and a tile backsplash, as well as a breakfast bar. This 3-bed with a loft, 2-bath home in the gated community of The Hideout has it all. 
                </p>

                {isTruncatable && (
                    <p className="fw-bold text-theme"style={{ cursor: "pointer" }} onClick={toggleText} >
                    {showFullText ? "Show less" : "Show more"}
                    </p>
                )}
                </div>


                <div>
                    <h4 className="mb-4 single_head">Property Details</h4>
                    <div className="row">
                    <div className="col-md-6 col-xl-4">
                        <div className="d-flex justify-content-between">
                        <div className="pd-list">
                            <p className="fw600 mb10 ff-heading dark-color">
                            Property ID
                            </p>
                        </div>
                        <div className="pd-list">
                            <p className="text mb10">RT48</p>
                        </div>
                        </div>
                        <div className="d-flex justify-content-between">
                        <div className="pd-list">
                            <p className="fw600 mb10 ff-heading dark-color">Price</p>
                        </div>
                        <div className="pd-list">
                            <p className="text mb10">$252,000</p>
                        </div>
                        </div>
                        <div className="d-flex justify-content-between">
                        <div className="pd-list">
                            <p className="fw600 mb10 ff-heading dark-color">
                            Property Size
                            </p>
                        </div>
                        <div className="pd-list">
                            <p className="text mb10">1500 Sq Ft</p>
                        </div>
                        </div>
                        <div className="d-flex justify-content-between">
                        <div className="pd-list">
                            <p className="fw600 mb10 ff-heading dark-color">
                            Bathrooms
                            </p>
                        </div>
                        <div className="pd-list">
                            <p className="text mb10">3</p>
                        </div>
                        </div>
                        <div className="d-flex justify-content-between">
                        <div className="pd-list">
                            <p className="fw600 mb10 ff-heading dark-color">Bedrooms</p>
                        </div>
                        <div className="pd-list">
                            <p className="text mb10">2</p>
                        </div>
                        </div>
                    </div>
                    <div className="col-md-6 col-xl-4 offset-xl-2">
                        <div className="d-flex justify-content-between">
                        <div className="pd-list">
                            <p className="fw600 mb10 ff-heading dark-color">Garage</p>
                        </div>
                        <div className="pd-list">
                            <p className="text mb10">2</p>
                        </div>
                        </div>
                        <div className="d-flex justify-content-between">
                        <div className="pd-list">
                            <p className="fw600 mb10 ff-heading dark-color">
                            Garage Size
                            </p>
                        </div>
                        <div className="pd-list">
                            <p className="text mb10">200 SqFt</p>
                        </div>
                        </div>
                        <div className="d-flex justify-content-between">
                        <div className="pd-list">
                            <p className="fw600 mb10 ff-heading dark-color">
                            Year Built
                            </p>
                        </div>
                        <div className="pd-list">
                            <p className="text mb10">2022</p>
                        </div>
                        </div>
                        <div className="d-flex justify-content-between">
                        <div className="pd-list">
                            <p className="fw600 mb10 ff-heading dark-color">
                            Property Type
                            </p>
                        </div>
                        <div className="pd-list">
                            <p className="text mb10">Apartment</p>
                        </div>
                        </div>
                        <div className="d-flex justify-content-between">
                        <div className="pd-list">
                            <p className="fw600 mb10 ff-heading dark-color">
                            Property Status
                            </p>
                        </div>
                        <div className="pd-list">
                            <p className="text mb10">For Sale</p>
                        </div>
                        </div>
                    </div>
                    </div>
                </div>
                </div>

                <div className="card overview_card border-0">
                <h4 className="mb-4 single_head">Location</h4>
                <div className="row">
                    <div className="col-md-6  mb-3 mb-md-0">
                    <div className="d-flex justify-content-between">
                        <div className="pd-list">
                        <p className="fw600 mb10 ff-heading dark-color">Address</p>
                        <p className="fw600 mb10 ff-heading dark-color">City</p>
                        <p className="fw600 mb-0 ff-heading dark-color">
                            State/county
                        </p>
                        </div>
                        <div className="pd-list">
                        <p className="text mb10">10425 Tabor St</p>
                        <p className="text mb10">Los Angeles</p>
                        <p className="text mb-0">California</p>
                        </div>
                    </div>
                    </div>
                    <div className="col-md-6 ">
                    <div className="d-flex justify-content-between">
                        <div className="pd-list">
                        <p className="fw600 mb10 ff-heading dark-color">Address</p>
                        <p className="fw600 mb10 ff-heading dark-color">City</p>
                        <p className="fw600 mb-0 ff-heading dark-color">
                            State/county
                        </p>
                        </div>
                        <div className="pd-list">
                        <p className="text mb10">10 Downing Street</p>
                        <p className="text mb10">London</p>
                        <p className="text mb-0">Greater London</p>
                        </div>
                    </div>
                    </div>
                    <div className="col-md-12 mt-4">
                    <iframe
                        className="position-relative w-100"
                        style={{ height: "250px" }}
                        loading="lazy"
                        src="https://maps.google.com/maps?q=10425 Tabor St&amp;t=m&amp;z=14&amp;output=embed&amp;iwloc=near"
                        title="10425 Tabor St"
                        aria-label="10425 Tabor St"
                    ></iframe>
                    </div>
                </div>
                </div>

                {/* <div className="card overview_card border-0">
                    <h4 className="mb-4 single_head">Features & Amenities</h4>
                    <div className="row"><div className="col-sm-6 col-md-4"><div className="pd-list"><p className="text mb10"><i className="fas fa-circle fz6 align-middle pe-2"></i>Air Conditioning</p><p className="text mb10"><i className="fas fa-circle fz6 align-middle pe-2"></i>Barbeque</p><p className="text mb10"><i className="fas fa-circle fz6 align-middle pe-2"></i>Dryer</p><p className="text mb10"><i className="fas fa-circle fz6 align-middle pe-2"></i>Gym</p></div></div><div className="col-sm-6 col-md-4"><div className="pd-list"><p className="text mb10"><i className="fas fa-circle fz6 align-middle pe-2"></i>Lawn</p><p className="text mb10"><i className="fas fa-circle fz6 align-middle pe-2"></i>Microwave</p><p className="text mb10"><i className="fas fa-circle fz6 align-middle pe-2"></i>Outdoor Shower</p><p className="text mb10"><i className="fas fa-circle fz6 align-middle pe-2"></i>Refrigerator</p></div></div><div className="col-sm-6 col-md-4"><div className="pd-list"><p className="text mb10"><i className="fas fa-circle fz6 align-middle pe-2"></i>Swimming Pool</p><p className="text mb10"><i className="fas fa-circle fz6 align-middle pe-2"></i>TV Cable</p><p className="text mb10"><i className="fas fa-circle fz6 align-middle pe-2"></i>Washer</p><p className="text mb10"><i className="fas fa-circle fz6 align-middle pe-2"></i>WiFi6</p></div></div></div>
                </div> */}

                <div className="card overview_card border-0">
                <h4 className="mb-4 single_head">Energy Class</h4>
                <div className="col-sm-12">
                    <div className="pd-list d-flex justify-content-between">
                    <p className="text mb10">Global Energy Performance Index</p>
                    <p>A+</p>
                    </div>
                    <div className="pd-list d-flex justify-content-between">
                    <p className="text mb10">Renewable energy performance index</p>
                    <p>92.42 kWh / m²a</p>
                    </div>
                    <div className="pd-list d-flex justify-content-between">
                    <p className="text mb10">Energy performance of the building</p>
                    <p>00.00 kWh / m²a</p>
                    </div>
                    <div className="pd-list d-flex justify-content-between">
                    <p className="text mb10">EPC Current Rating</p>
                    <p>92</p>
                    </div>
                    <div className="pd-list d-flex justify-content-between">
                    <p className="text mb10">EPC Potential Rating</p>
                    <p>80+</p>
                    </div>
                </div>

                <div className="col-12">
                    <img src="/images/energy-class.png" className="w-100" alt="performance scale" />
                </div>
                </div>

                <div className="card overview_card border-0">
                <h4 className="mb-4 single_head">Floor Plan</h4>

                <div className="row">
                    <div className="col-md-12">
                    <div className="accordion-style1 style2">
                        <div className="accordion" id="accordionExample">
                        <div className="accordion-item ">
                            <h2 className="accordion-header" id="heading0">
                            <button
                                className="accordion-button collapsed"
                                type="button"
                                data-bs-toggle="collapse"
                                data-bs-target="#collapse0"
                                aria-expanded="false"
                                aria-controls="collapse0"
                            >
                                <span className="w-100 d-md-flex align-items-center">
                                <span className="me-3 ">First Floor</span>
                                <span className="ms-auto d-md-flex align-items-center justify-content-end floor_accordion">
                                    <span className="me-2 me-md-4">
                                    <span className="fw600">Size: </span>
                                    <span className="text">1267 Sqft</span>
                                    </span>
                                    <span className="me-2 me-md-4">
                                    <span className="fw600">Bedrooms: </span>
                                    <span className="text">2</span>
                                    </span>
                                    <span className="me-2 me-md-4">
                                    <span className="fw600">Bathrooms: </span>
                                    <span className="text">2</span>
                                    </span>
                                    <span>
                                    <span className="fw600">Price: </span>
                                    <span className="text">$920,99</span>
                                    </span>
                                </span>
                                </span>
                            </button>
                            </h2>
                            <div
                            id="collapse0"
                            className="accordion-collapse collapse "
                            aria-labelledby="heading0"
                            data-parent="#accordionExample"
                            >
                            <div className="accordion-body text-center">
                                <img src="/images/floor.png" className="w-100" alt="floor image" />
                            </div>
                            </div>
                        </div>
                        <div className="accordion-item ">
                            <h2 className="accordion-header" id="heading1">
                            <button
                                className="accordion-button collapsed"
                                type="button"
                                data-bs-toggle="collapse"
                                data-bs-target="#collapse1"
                                aria-expanded="false"
                                aria-controls="collapse1"
                            >
                                <span className="w-100 d-md-flex align-items-center">
                                <span className="me-3">Second Floor</span>
                                <span className="ms-auto d-md-flex align-items-center justify-content-end floor_accordion">
                                    <span className="me-2 me-md-4">
                                    <span className="fw600">Size: </span>
                                    <span className="text">1267 Sqft</span>
                                    </span>
                                    <span className="me-2 me-md-4">
                                    <span className="fw600">Bedrooms: </span>
                                    <span className="text">2</span>
                                    </span>
                                    <span className="me-2 me-md-4">
                                    <span className="fw600">Bathrooms: </span>
                                    <span className="text">2</span>
                                    </span>
                                    <span>
                                    <span className="fw600">Price: </span>
                                    <span className="text">$920,99</span>
                                    </span>
                                </span>
                                </span>
                            </button>
                            </h2>
                            <div
                            id="collapse1"
                            className="accordion-collapse collapse "
                            aria-labelledby="heading1"
                            data-parent="#accordionExample"
                            >
                            <div className="accordion-body text-center">
                                <img src="/images/floor.png" className="w-100" alt="floor image" />
                            </div>
                            </div>
                        </div>
                        <div className="accordion-item ">
                            <h2 className="accordion-header" id="heading2">
                            <button
                                className="accordion-button collapsed"
                                type="button"
                                data-bs-toggle="collapse"
                                data-bs-target="#collapse2"
                                aria-expanded="false"
                                aria-controls="collapse2"
                            >
                                <span className="w-100 d-md-flex align-items-center">
                                <span className="me-3">Third Floor</span>
                                <span className="ms-auto d-md-flex align-items-center justify-content-end floor_accordion">
                                    <span className="me-2 me-md-4">
                                    <span className="fw600">Size: </span>
                                    <span className="text">1267 Sqft</span>
                                    </span>
                                    <span className="me-2 me-md-4">
                                    <span className="fw600">Bedrooms: </span>
                                    <span className="text">2</span>
                                    </span>
                                    <span className="me-2 me-md-4">
                                    <span className="fw600">Bathrooms: </span>
                                    <span className="text">2</span>
                                    </span>
                                    <span>
                                    <span className="fw600">Price: </span>
                                    <span className="text">$920,99</span>
                                    </span>
                                </span>
                                </span>
                            </button>
                            </h2>
                            <div
                            id="collapse2"
                            className="accordion-collapse collapse "
                            aria-labelledby="heading2"
                            data-parent="#accordionExample"
                            >
                            <div className="accordion-body text-center">
                                <img src="/images/floor.png" className="w-100" alt="floor image" />
                            </div>
                            </div>
                        </div>
                        </div>
                    </div>
                    </div>
                </div>
                </div>

                <div className="card overview_card border-0">
                    <h4 className="mb-4 single_head">Video Tour</h4>

                    <div className="property_video property_video1 bdrs12 w-100">
                        <button className="video_popup_btn mx-auto popup-img" data-bs-toggle="modal" data-bs-target="#VideoModal" >
                            <i className="fa-solid fa-play"></i>
                        </button>
                    </div>


                    <div className="modal fade " id="VideoModal" tabIndex="-1" aria-labelledby="VideoModalLabel" aria-hidden="true">
                    <div className="modal-dialog modal-dialog-centered modal-lg">
                        <div className="modal-content bg-dark">
                            <button type="button" className="btn-close btn-theme" data-bs-dismiss="modal" aria-label="Close"></button>
                       
                        <div className="modal-body">
                          <iframe className="rounded-2 video_iframe" width="100%"
                           src="//www.youtube.com/embed/oqNZOOWF8qM?autoplay=1&amp;cc_load_policy=1&amp;controls=1&amp;disablekb=0&amp;enablejsapi=0&amp;fs=1&amp;iv_load_policy=1&amp;loop=0&amp;rel=0&amp;showinfo=1&amp;start=0&amp;wmode=transparent&amp;theme=dark&amp;mute=0" frameBorder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope;" allowFullScreen="" tabIndex="-1"></iframe>
                        </div>
                       
                        </div>
                    </div>
                    </div>

                </div>

            </div>

            {/* Right Column - Sidebar */}
            <div className="col-lg-4">
                    <div className="mb-4 subscribe_button">
                        <button className="btn ud-btn btn-white contact_btn_light2  w-100" data-bs-toggle="modal" data-bs-target="#subscribeModal" data-discover="true">Subscribe for alerts <i className="fas fa-bell"></i></button>
                    </div>
                <div className="enquiry_section  mb-4">
                    <div className="card mb-4 overview_card border-0 ">
                    <h5 className="single_head mb-2">Schedule a tour</h5>
                    <p className="text-muted small">Choose your preferred day</p>
                   
                    <form>
                     <input
                        type={inputType}
                        className="form-control mb-3"
                        placeholder="Time"
                        onFocus={() => setInputType("datetime-local")}
                        onBlur={(e) => {
                            if (!e.target.value) setInputType("text");
                        }}
                        />

                        <input
                        type="text"
                        className="form-control mb-3"
                        placeholder="Your Name"
                        />
                        <input
                        type="email"
                        className="form-control mb-3"
                        placeholder="Email"
                        />
                        <textarea
                        className="form-control mb-3"
                        placeholder="Message"
                        rows={3}
                        ></textarea>
                        <Link to="#" className="btn ud-btn btn-white search_home_btn w-100"> Send Inquiry <i className="fa-solid fa-arrow-right"></i></Link>
                    </form>
                    </div>

                    <div className="card mb-0 overview_card border-0 ">
                    <h5 className="single_head mb-4">Get More Information</h5>
                    <div className="d-flex align-items-center mb-3">
                        <img
                        src="/images/agent1.jpg"
                        alt="Agent"
                        className="rounded-circle agent_img me-3"
                    
                        />
                        <div>
                         <Link to='/agent-single'>
                             <h6 className="mb-0 fw-bold">Mark Klasen</h6>
                         </Link>  
                         <div className="d-flex align-items-center text-muted py-2"><i className="fa-solid fa-phone me-1"></i> (+1) 234 456 445</div> 
                        <small className="">Real Estate Agent</small>
                        </div>
                    </div>
                  
                        <Link to="/agent-single"  className="btn ud-btn black_btn search_home_btn w-100"> Contact Agent <i className="fa-solid fa-arrow-right"></i> </Link>
                    </div>
                    
                </div>
            </div>


            <div className="modal fade" id="subscribeModal" tabIndex="-1" aria-labelledby="subscribeModalLabel" aria-hidden="true">
            <div className="modal-dialog">
                <div className="modal-content">

                <div className="modal-header">
                    <h5 className="modal-title fw-bold" id="subscribeModalLabel">Subscribe for Property Alerts</h5>
                    <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>

                <div className="modal-body">
                    <form id="subscribeForm">
                    <div className="mb-3">
                        <label htmlFor="emailInput" className="form-label">Email address</label>
                        <input type="email" className="form-control" id="emailInput" name="email" required />
                    </div>

                    <div className="mb-3">
                        <label htmlFor="alertTypeSelect" className="form-label">Alert Type</label>
                        <select className="form-select" id="alertTypeSelect" name="alertType" required>
                        <option value="">Select Alert Type</option>
                        <option value="Inspection">Inspection</option>
                        <option value="Price Drop">Price Drop</option>
                        <option value="Status Change">Status Change</option>
                        </select>
                    </div>

                    <button type="submit" className="btn btn-theme w-100 mt-4">Subscribe</button>
                    </form>

                    
                </div>

    </div>
  </div>
</div>


            </div>

            <div className="row mt-4 search_right">
                <h2 className="sec-title mb-4">Similar Properties</h2>    

                <div className="col-lg-4 col-md-6 mb-0 mb-md-4">
                  <div className="listing-style1">
                      <div className="list-thumb" >
                        <img
                          alt="property_image"
                          src="/images/card1.jpg"
                          className="w-100"
                          loading="lazy"
                        />
                        <div className="sale-sticker-wrap">
                          <div className="list-tag fz12">
                            <i className="fa-solid fa-bolt me-1"></i>
                            Featured
                          </div>
                          <div className="list-tag fz12 bg-dark">
                           <i className="fa-solid fa-flag me-1"></i>
                            Sale
                          </div>
                        </div>
                        <div className="list-price">$14000</div>
                      </div>
                      <div className="list-content"> 
                        <h6 className="list-title">
                          <Link to="/property-single">Equestrian Family Home</Link>
                        </h6>
                        <p className="list-text">San Diego City, CA, USA</p>
                        <div className="list-meta d-flex align-items-center">
                          <Link to="#"> <i className="fas fa-bed"></i> 4 </Link>
                          <Link to="#"> <i className="fas fa-bath"></i> 5 </Link>
                          <Link to="#"> <i className="fa-solid fa-chart-area"></i> 1500 </Link>
                          <Link to="#"> <i className="fa-solid fa-home"></i> Villa </Link>
                        </div>
                        <hr />
                        <div className="list-meta2 d-flex justify-content-between align-items-center mt-3">
                          <Link to='/property-single' className="view_details">View details</Link>
                          <div className="icons d-flex align-items-center">
                              <Link to="#"> <i className="fa-heart fa-regular"></i></Link>
                              <Link to="#"> <i className="fa-solid fa-share"></i> </Link>
                          </div>
                        </div>
                      </div>
                  </div>
                </div>        
                <div className="col-lg-4 col-md-6 mb-0 mb-md-4">
                  <div className="listing-style1">
                      <div className="list-thumb">
                        <img
                          alt="property_image"
                          src="/images/card2.jpg"
                          className="w-100"
                          loading="lazy"
                        />
                        <div className="sale-sticker-wrap">
                          <div className="list-tag fz12">
                            <i className="fa-solid fa-bolt me-1"></i>
                            Featured
                          </div>
                          <div className="list-tag fz12 bg-dark">
                           <i className="fa-solid fa-flag me-1"></i>
                            Rent
                          </div>
                        </div>
                        <div className="list-price">$16000</div>
                      </div>
                      <div className="list-content">
                     
                        <h6 className="list-title">
                          <Link to="/property-single">Modern Glass Complex</Link>
                        </h6>
                        <p className="list-text">Austin, TX, USA</p>
                        <div className="list-meta d-flex align-items-center">
                          <Link to="#"> <i className="fas fa-bed"></i> 4 </Link>
                          <Link to="#"> <i className="fas fa-bath"></i> 3 </Link>
                          <Link to="#"> <i className="fa-solid fa-chart-area"></i> 1200 </Link>
                          <Link to="#"> <i className="fa-solid fa-home"></i> Apartment </Link>
                        </div>
                        <hr />
                        <div className="list-meta2 d-flex justify-content-between align-items-center mt-3">
                          <Link to='/property-single' className="view_details">View details</Link>
                          <div className="icons d-flex align-items-center">
                              <Link to="#"> <i className="fa-heart fa-regular" ></i> </Link>
                              <Link to="#"> <i className="fa-solid fa-share"></i> </Link>
                              
                          </div>
                          
                        </div>
                      </div>
                  </div>
                </div>        
                <div className="col-lg-4 col-md-6 mb-0 mb-md-4">
                  <div className="listing-style1">
                    <div className="list-thumb" >
                    <img
                        alt="property_image"
                        src="/images/card3.jpg"
                        className="w-100"
                        loading="lazy"
                    />
                    <div className="sale-sticker-wrap">
                      <div className="list-tag fz12">
                        <i className="fa-solid fa-bolt me-1"></i>
                        Featured
                      </div>
                        <div className="list-tag fz12 bg-dark">
                        <i className="fa-solid fa-flag me-1"></i>
                        Sale
                      </div>
                    </div>
                    <div className="list-price">$18000</div>
                    </div>
                    <div className="list-content">
                    
                    <h6 className="list-title">
                        <Link to="/property-single">Luxury villa in Rego Park</Link>
                    </h6>
                    <p className="list-text">New Jersey City, CA, USA</p>
                    <div className="list-meta d-flex align-items-center">
                        <Link to="#"> <i className="fas fa-bed"></i> 3 </Link>
                        <Link to="#"> <i className="fas fa-bath"></i> 2 </Link>
                        <Link to="#"> <i className="fa-solid fa-chart-area"></i> 1200 </Link>
                        <Link to="#"> <i className="fa-solid fa-home"></i> Townhouse</Link>
                    </div>
                    <hr />
                    <div className="list-meta2 d-flex justify-content-between align-items-center mt-3">
                        <Link to='/property-single' className="view_details">View details</Link>
                        <div className="icons d-flex align-items-center">
                            <Link to="#"> <i className="fa-heart fa-regular" ></i> </Link>
                            <Link to="#"> <i className="fa-solid fa-share"></i> </Link>
                        </div>
                    </div>
                    </div>
                  </div>
                </div>        
            </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default BuilderPropertySingle;