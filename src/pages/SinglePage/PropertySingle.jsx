import { useRef, useState, useEffect } from "react";
import Lightbox from "yet-another-react-lightbox";
import Zoom from "yet-another-react-lightbox/plugins/zoom";
import Thumbnails from "yet-another-react-lightbox/plugins/thumbnails";
import "yet-another-react-lightbox/styles.css";
import "yet-another-react-lightbox/plugins/thumbnails.css";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import { Link, useNavigate, useParams, useLocation } from "react-router-dom";
import "./single.css";
import Tooltip from "../../components/Tooltip";
import { toast } from "react-toastify";
import SinglePageCalculator from "../../components/SinglePageCalculator";
import { FaRegHeart, FaShareAlt } from "react-icons/fa";
import Avatar from "react-avatar";
import api from "../../utils/axios";
import { useAuth } from "../../context/AuthContext";

import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const PropertySingle = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const { slug } = useParams();
  const [property, setProperty] = useState(null);
  const [similarProperties, setSimilarProperties] = useState([]);

  const [images, setImages] = useState([]);

  const [galleryLoading, setGalleryLoading] = useState(true);

  const [enquiry, setEnquiry] = useState({
    name: "",
    email: "",
    reason: "",
    message: "",
  });

  const [addedPlans, setAddedPlans] = useState({});

  const togglePlan = (index) => {
    setAddedPlans((prev) => ({
      ...prev,
      [index]: !prev[index], // toggle only this index
    }));
  };

  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [slideIndex, setSlideIndex] = useState(0);

  const [liked, setLiked] = useState(false);
  const [processing, setProcessing] = useState(false); // new: track API call
  const [animate, setAnimate] = useState(false); // trigger heart animation

  const [similarLiked, setSimilarLiked] = useState({});
  const [similarProcessing, setSimilarProcessing] = useState({});
  const [similarAnimate, setSimilarAnimate] = useState({});


  const [reviewText, setReviewText] = useState("");
  const [rating, setRating] = useState(0);
  const [reviewProcessing, setReviewProcessing] = useState(false);
  const [showAllReviews, setShowAllReviews] = useState(false);



  const shareRef = useRef(null);
  const [showShare, setShowShare] = useState(false);
  const toggleShare = () => setShowShare(!showShare);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (shareRef.current && !shareRef.current.contains(event.target)) {
        setShowShare(false);
      }
    };

    if (showShare) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [showShare]);

  

  /********* Fetch Property Api ****************/

  useEffect(() => {
    if (slug) {
      setGalleryLoading(true);

      const url = user
        ? `/property/${slug}?user_id=${user.id}`
        : `/property/${slug}`;

      api
        .get(url)
        .then((res) => {
          if (res.data.status) {
            const data = res.data.data;
            setProperty(data);
            setLiked(data.is_saved || false);

              // SET SIMILAR PROPERTIES
              const similer = res.data.similer_property || [];
              setSimilarProperties(similer);

              // INITIALIZE HEART STATE FOR SIMILAR PROPERTIES
              const likedMap = {};
              similer.forEach((p) => {
                likedMap[p.id] = p.is_saved || false;
              });
              setSimilarLiked(likedMap);


            let gallery = [];
            if (data.gallery_images) {
              try {
                const galleryArr = JSON.parse(data.gallery_images);
                gallery = galleryArr.map((img) => `https://${img}`);
              } catch {
                console.error("Invalid gallery images format");
              }
            }

            setImages(gallery);
          }
        })
        .catch((err) => console.error("API Error:", err))
        .finally(() => {
          setGalleryLoading(false);
        });
    }
  }, [slug, user]);

  /* ------- Toggle Save unsave Api ---------- */

  const toggleHeart = async () => {
    if (!user) {
      toast.error("Please login to save properties!");
      setTimeout(() => navigate("/login", { state: { from: location } }), 2000);
      return;
    }

    if (processing) return;

    setProcessing(true);

    try {
      if (!liked) {
        // Save property
        const res = await api.post(`/properties/save`, {
          propertyId: property.id,
          user_id: user.id,
        });
        if (res.data.success) {
          setLiked(true);
          setAnimate(true); // trigger pop
          toast.success(res.data.message || "Property added to favorites!");
        } else {
          toast.error(res.data.message || "Failed to save property.");
        }
      } else {
        // Unsave property
        const res = await api.post(`/properties/unsave`, {
          propertyId: property.id,
          user_id: user.id,
        });
        if (res.data.success) {
          setLiked(false);
          toast.success(res.data.message || "Property removed from favorites!");
        } else {
          toast.error(res.data.message || "Failed to remove property.");
        }
      }
    } catch (err) {
      console.error("Save/Unsave API Error:", err);
      toast.error("Something went wrong. Please try again.");
    } finally {
      setProcessing(false);
      if (liked) setTimeout(() => setAnimate(false), 500); // reset animation after pop
    }
  };


  const toggleSimilarHeart = async (propertyId) => {
  if (!user) {
    toast.error("Please login to save properties!");
    setTimeout(() => navigate("/login", { state: { from: location } }), 2000);
    return;
  }

  if (similarProcessing[propertyId]) return;

  setSimilarProcessing((prev) => ({ ...prev, [propertyId]: true }));

  try {
    if (!similarLiked[propertyId]) {
      // SAVE
      const res = await api.post(`/properties/save`, {
        propertyId,
        user_id: user.id,
      });

      if (res.data.success) {
        setSimilarLiked((prev) => ({ ...prev, [propertyId]: true }));
        setSimilarAnimate((prev) => ({ ...prev, [propertyId]: true }));
        toast.success(res.data.message || "Property added to favorites!");
      } else {
        toast.error(res.data.message || "Failed to save property.");
      }
    } else {
      // UNSAVE
      const res = await api.post(`/properties/unsave`, {
        propertyId,
        user_id: user.id,
      });

      if (res.data.success) {
        setSimilarLiked((prev) => ({ ...prev, [propertyId]: false }));
        toast.success(res.data.message || "Property removed from favorites!");
      } else {
        toast.error(res.data.message || "Failed to remove property.");
      }
    }
  } catch (err) {
    console.error("Save/Unsave API Error:", err);
    toast.error("Something went wrong. Please try again.");
  } finally {
    setSimilarProcessing((prev) => ({ ...prev, [propertyId]: false }));
    if (similarLiked[propertyId]) {
      setTimeout(() => {
        setSimilarAnimate((prev) => ({ ...prev, [propertyId]: false }));
      }, 500);
    }
  }
};


  /******* Enquiry Form Api Starts***********/

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEnquiry((prev) => ({ ...prev, [name]: value }));
  };

  const handleEnquirySubmit = async (e) => {
    e.preventDefault();

    if (!user) {
      toast.error("Please login to submit enquiry!");
      setTimeout(() => {
        navigate("/login", { state: { from: location } });
      }, 2000);
      return;
    }

    if (!property?.id || !property?.user_id) {
      toast.error("Failed to get property data.");
      return;
    }

    const payload = {
      ...enquiry,
      property_id: property.id,
      user_id: property.user_id,
    };

    try {
      const res = await api.post(`/enquiry`, payload);

      if (res.data.success === true) {
        toast.success(res.data.message || "Enquiry submitted successfully!");
        setEnquiry({ name: "", email: "", reason: "", message: "" });
      } else {
        toast.error(res.data.message || "Failed to submit enquiry.");
      }
    } catch (err) {
      console.error("Enquiry API Error:", err);
      toast.error("Server error. Please try again later.");
    }
  };

  /******* Enquiry Form Api Ends  ***********/

  const shareUrl = `${window.location.origin}/property/${slug}`;

  const handleShare = (platform) => {
    let url = "";

    switch (platform) {
      case "facebook":
        url = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
          shareUrl
        )}`;
        break;
      case "twitter":
        url = `https://twitter.com/intent/tweet?url=${encodeURIComponent(
          shareUrl
        )}`;
        break;
      case "linkedin":
        url = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(
          shareUrl
        )}`;
        break;
      case "whatsapp":
        url = `https://api.whatsapp.com/send?text=${encodeURIComponent(
          shareUrl
        )}`;
        break;
      default:
        break;
        ``;
    }

    if (url) {
      window.open(url, "_blank", "noopener,noreferrer");
    }
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(shareUrl).then(() => {
      toast.success("Link copied to clipboard!");
    });
  };

  const getYouTubeEmbedUrl = (url, loop = false) => {
    try {
      let videoId = "";

      if (url.includes("shorts/")) {
        videoId = url.split("shorts/")[1].split("?")[0];
      } else if (url.includes("watch?v=")) {
        videoId = url.split("watch?v=")[1].split("&")[0];
      } else if (url.includes("youtu.be/")) {
        videoId = url.split("youtu.be/")[1].split("?")[0];
      }

      if (!videoId) return url;

      let embedUrl = `https://www.youtube.com/embed/${videoId}`;
      if (loop) {
        embedUrl += `?loop=1&playlist=${videoId}`;
      }
      return embedUrl;
    } catch {
      return url;
    }
  };

  const openLightbox = (index) => {
    setSlideIndex(index);
    setLightboxOpen(true);
  };

  const [showFullText, setShowFullText] = useState(false);
  const [isTruncatable, setIsTruncatable] = useState(false);
  const descRef = useRef(null);

  useEffect(() => {
    if (descRef.current) {
      // Check if the description height is greater than 5 lines (7.5em)
      setIsTruncatable(
        descRef.current.scrollHeight > descRef.current.clientHeight
      );
    }
  }, [property?.description]);

  const toggleText = () => setShowFullText((prev) => !prev);

  useEffect(() => {
    if (descRef.current) {
      const lineHeight = parseFloat(
        getComputedStyle(descRef.current).lineHeight
      );
      const lines = descRef.current.scrollHeight / lineHeight;
      setIsTruncatable(lines > 5);
    }
  }, []);

  const handleContactClick = (e) => {
    e.preventDefault();

    if (!user) {
      toast.error("Please login to contact the agent!");
      setTimeout(() => {
        navigate("/login", { state: { from: location } });
      }, 2000);
      return;
    }

    // If logged in → redirect to agent profile
    navigate(`/agent/${property.user.profile.slug}`);
  };

  /*--- Inspections Meta data -------*/
  const formatTimeToAMPM = (time) => {
    if (!time) return "";

    const [hours, minutes] = time.split(":");
    const h = parseInt(hours, 10);

    const ampm = h >= 12 ? "PM" : "AM";
    const formattedHour = h % 12 || 12;

    return `${formattedHour}:${minutes} ${ampm}`;
  };

  // Filter inspections to only include future or today dates
  const inspections = property?.meta
    ?.filter((m) => m.property_meta_key === "inspection")
    .map((m) => {
      const data = JSON.parse(m.property_meta_value);

      // combine date + start_time to compare with current datetime
      const inspectionDateTime = new Date(
        `${data.available_date}T${data.start_time}`
      );
      const now = new Date();

      if (inspectionDateTime < now) return null; // skip past inspections

      const dateObj = new Date(data.available_date);

      return {
        inspection_meta_id: m.id,
        property_id: m.property_id,
        available_date: data.available_date,
        start_time: data.start_time,
        end_time: data.end_time,
        day: dateObj.toLocaleDateString("en-US", { weekday: "long" }),
        date: dateObj.toLocaleDateString("en-US", {
          day: "numeric",
          month: "short",
          year: "numeric",
        }),
        time: `${formatTimeToAMPM(data.start_time)} – ${formatTimeToAMPM(
          data.end_time
        )}`,
      };
    })
    .filter(Boolean); // remove nulls for past inspections

  const savedInspectionMetaIds =
    property?.inspection
      ?.filter((i) => i.user_id === user?.id)
      .map((i) => i.property_meta_id) || [];

  /*--- Track adding state ---*/
  const [addingInspectionId, setAddingInspectionId] = useState(null);

  /*------- Save Inspection --------*/
  const saveInspection = async (inspection) => {
    if (!user) {
      toast.error("Please login to save inspection");
      navigate("/login", { state: { from: location } });
      return;
    }

    try {
      setAddingInspectionId(inspection.inspection_meta_id); // set adding state

      const formData = new FormData();
      formData.append("user_id", user.id);
      formData.append("property_id", inspection.property_id);
      formData.append("property_meta_id", inspection.inspection_meta_id);
      formData.append("available_date", inspection.available_date);
      formData.append("start_time", inspection.start_time);
      formData.append("end_time", inspection.end_time);

      const res = await api.post("/save-inspection", formData);

      if (res.data.status) {
        toast.success(res.data.message || "Inspection saved successfully");

        setAddedPlans((prev) => ({
          ...prev,
          [inspection.inspection_meta_id]: true,
        }));
      } else {
        toast.error(res.data.message || "Failed to save inspection");
      }
    } catch (error) {
      console.error("Save inspection error:", error);
      toast.error("Something went wrong. Please try again.");
    } finally {
      setAddingInspectionId(null); // reset adding state
    }
  };


  /*----- Leave a review --------*/

  const formatDate = (dateStr) => {
  return new Date(dateStr).toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  });
};

const renderStars = (rating) => {
  return [...Array(5)].map((_, i) => (
    <li key={i} className="list-inline-item me-0">
      <i
        className={`fas fa-star fz12 ${
          i < rating ? "review-color2" : "text-muted"
        }`}
      ></i>
    </li>
  ));
};

const reviewsToShow = showAllReviews ? property?.reviews : property?.reviews?.slice(0, 2);



 const submitReview = async (e) => {
  e.preventDefault();

  if (!user) {
    toast.error("Please login to submit a review!");
    setTimeout(() => navigate("/login", { state: { from: location } }), 2000);
    return;
  }

  if (!reviewText.trim()) {
    toast.error("Please write a review message");
    return;
  }

  if (!rating) {
    toast.error("Please select a rating");
    return;
  }


  if (reviewProcessing) return;

  setReviewProcessing(true);

  try {
    const res = await api.post("/save/review", {
      property_id: property.id,
      user_id: user.id,
      rating,
      review: reviewText,
    });

    if (res.data.status) {
      toast.success(res.data.message || "Review submitted successfully!");
      setReviewText("");
      setRating(0);
    } else {
      toast.error(res.data.message || "You already reviewed this property");
      setReviewText("");
      setRating(0);
    }
  } catch (err) {
    console.error("Review API Error:", err);

    if (err.response?.status === 409) {
      toast.error(err.response.data.message);
    } else {
      toast.error("Something went wrong. Please try again.");
    }
  } finally {
    setReviewProcessing(false);
    setReviewText("");
    setRating(0);
  }
};







  return (
    <>
      <Navbar />
      <div className="property_single">
        <div className="container my-5">
          {!property ? (
            <div
              className="d-flex flex-column justify-content-center align-items-center"
              style={{ height: "80vh" }}
            >
              <i className="fa-solid fa-home text-theme fs-1 loader-icon"></i>
              <span>Loading...</span>
            </div>
          ) : (
            <>
              <div className="mb-4 row justify-content-between">
                <div className="col-md-7 mb-4 mb-md-0">
                  <h1 className="sec-title">{property.title}</h1>
                  <p className="d-flex pe-2 mb-1">
                    {[
                      property.address,
                      property.city,
                      property.state,
                      property.country,
                    ]
                      .filter(Boolean)
                      .join(", ")}
                  </p>

                  <div className="d-flex small_desc flex-wrap">
                    <p className="border-end pe-2 mb-1">
                      <i className="fa-solid fa-circle text-theme"></i> For
                      {property.listing_type}
                    </p>
                    <p className="border-end px-2 mb-1">
                      <i className="fa-regular fa-clock"></i>
                      {new Date(property.created_at).toLocaleDateString()}
                    </p>
                  </div>
                  <div className="d-flex mt-2">
                    {property.performance_rating && (
                      <div className="list-tag fz12 me-2">
                        <i className="fa-solid fa-bolt me-1"></i>
                        {property.performance_rating}
                      </div>
                    )}
                  </div>

                </div>
                <div className="col-md-5">
                  <div className="property-action text-md-end">
                    <div
                      ref={shareRef}
                      className="d-flex gap-3 mb20 mb10-md align-items-center justify-content-md-end mb-3 position-relative"
                    >
                      <Tooltip
                        text={
                          liked ? "Remove from Favorites" : "Add to Favorites"
                        }
                      >
                        <Link to="#" onClick={toggleHeart} className="icon">
                          {processing ? (
                            <i className="fa fa-spinner fa-spin text-theme"></i>
                          ) : (
                            <i
                              className={`fa-heart ${
                                liked ? "fa-solid text-danger" : "fa-regular"
                              } ${animate ? "pop-heart" : ""}`}
                            ></i>
                          )}
                        </Link>
                      </Tooltip>

                      <Tooltip text={"Share"}>
                        <Link className="icon" to="#" onClick={toggleShare}>
                          <i className="fa-solid fa-share"></i>
                        </Link>
                      </Tooltip>

                      <Tooltip text={"Download brochure"}>
                        <Link className="icon" to="#">
                          <i className="fa-solid fa-download"></i>
                        </Link>
                      </Tooltip>

                      {showShare && (
                        <div className="social_icons_container">
                          <div className="modal-body p-3">
                            <div className="d-flex flex-wrap justify-content-between social_links mt-2">
                              <button
                                className="btn btn-sm btn-theme mx-1 mb-2"
                                onClick={() => handleShare("facebook")}
                              >
                                <i className="fa-brands fa-facebook"></i>
                              </button>

                              <button
                                className="btn btn-sm btn-theme mx-1 mb-2"
                                onClick={() => handleShare("twitter")}
                              >
                                <i className="fa-brands fa-twitter"></i>
                              </button>

                              <button
                                className="btn btn-sm btn-theme mx-1 mb-2"
                                onClick={() => handleShare("linkedin")}
                              >
                                <i className="fa-brands fa-linkedin"></i>
                              </button>

                              <button
                                className="btn btn-sm btn-theme mx-1 mb-2"
                                onClick={() => handleShare("whatsapp")}
                              >
                                <i className="fa-brands fa-whatsapp"></i>
                              </button>

                              <button
                                className="btn btn-sm btn-theme mx-1 mb-2"
                                onClick={handleCopy}
                              >
                                <i className="fa-solid fa-link"></i>
                              </button>
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                    <h4 className="price fw-bold">
                      {property.currency} {property.price}
                    </h4>
                  </div>
                </div>
              </div>

              {/* Check conditions */}

              <div className="py-2 inspection_section d-flex flex-wrap justify-content-end align-items-end">
                <div className="agency-details d-flex">
                  <button
                    className="btn ud-btn btn-white search_home_btn me-3"
                    data-bs-toggle="modal"
                    data-bs-target="#inspectionModal"
                  >
                    Inspection Time
                  </button>
                  <button
                    className="btn ud-btn btn-white search_home_btn"
                    data-bs-toggle="modal"
                    data-bs-target="#calculateEmi"
                  >
                    Calculate EMI
                  </button>
                </div>
              </div>

              {/* Calculate Emi Modal */}
              <div
                className="modal fade"
                id="calculateEmi"
                tabIndex="-1"
                aria-labelledby="calculateEmiLabel"
                aria-hidden="true"
              >
                <div className="modal-dialog modal-dialog-centered">
                  <div className="modal-content">
                    <div className="modal-header">
                      <h1
                        className="modal-title single_head fs-5"
                        id="calculateEmiLabel"
                      >
                        Mortgage Calculator
                      </h1>
                      <button
                        type="button"
                        className="btn-close"
                        data-bs-dismiss="modal"
                        aria-label="Close"
                      ></button>
                    </div>
                    <div className="modal-body">
                      <SinglePageCalculator propertyPrice={property.price} />
                    </div>
                  </div>
                </div>
              </div>

              {/* Modal */}
              <div
                className="modal fade"
                id="inspectionModal"
                tabIndex="-1"
                aria-labelledby="inspectionModalLabel"
                aria-hidden="true"
              >
                <div className="modal-dialog modal-dialog-centered modal-md">
                  <div className="modal-content rounded-3 shadow-lg">
                    <div className="modal-header border-0">
                      <h5
                        className="modal-title fw-bold"
                        id="inspectionModalLabel"
                      >
                        Available Inspections
                      </h5>
                      <button
                        type="button"
                        className="btn-close"
                        data-bs-dismiss="modal"
                        aria-label="Close"
                      ></button>
                    </div>

                    <div className="modal-body pb-0">
                      {inspections.length > 0 ? (
                        inspections.map((item) => {
                          const isAlreadyAdded =
                            savedInspectionMetaIds.includes(
                              item.inspection_meta_id
                            ) || addedPlans[item.inspection_meta_id];

                          return (
                            <div
                              key={item.inspection_meta_id}
                              className="card mb-3 shadow-sm rounded-3"
                            >
                              <div className="card-body d-flex justify-content-between align-items-center">
                                <div>
                                  <h6 className="mb-1 fw-bold">{item.day}</h6>
                                  <p className="mb-0 text-muted small">
                                    {item.date} | {item.time}
                                  </p>
                                </div>

                                <button
                                  className="btn btn-sm btn-theme"
                                  disabled={
                                    savedInspectionMetaIds.includes(
                                      item.inspection_meta_id
                                    ) ||
                                    addedPlans[item.inspection_meta_id] ||
                                    addingInspectionId ===
                                      item.inspection_meta_id
                                  }
                                  onClick={() => saveInspection(item)}
                                >
                                  {addingInspectionId ===
                                  item.inspection_meta_id
                                    ? "Adding..."
                                    : savedInspectionMetaIds.includes(
                                        item.inspection_meta_id
                                      ) || addedPlans[item.inspection_meta_id]
                                    ? "Added"
                                    : "Add to plan"}
                                </button>
                              </div>
                            </div>
                          );
                        })
                      ) : (
                        <p className="text-muted text-center">
                          No inspections available
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              </div>

              {galleryLoading ? (
                <div className="gallery_images row g-3 mb-5 mt-2">
                  <div className="col-sm-8">
                    <Skeleton height={500} borderRadius={8} />
                  </div>

                  <div className="col-sm-4 d-flex flex-column gap-3">
                    <Skeleton height={240} borderRadius={8} />
                    <Skeleton height={240} borderRadius={8} />
                  </div>
                </div>
              ) : images.length > 0 ? (
                <div className="gallery_images row g-3 mb-5">
                  {/* Single Image */}
                  {images.length === 1 && (
                    <div className="col-12">
                      <div className="img_wrapper h-100">
                        <img
                          src={images[0]}
                          className="w-100 single_image"
                          alt="property-0"
                          onClick={() => openLightbox(0)}
                          style={{ cursor: "pointer", objectFit: "cover" }}
                        />
                      </div>
                    </div>
                  )}

                  {/* Two Images */}
                  {images.length === 2 &&
                    images.map((src, i) => (
                      <div className="col-sm-6" key={i}>
                        <div className="img_wrapper h-100">
                          <img
                            src={src}
                            className="w-100 h-100"
                            alt={`property-${i}`}
                            onClick={() => openLightbox(i)}
                            style={{ cursor: "pointer", objectFit: "cover" }}
                          />
                        </div>
                      </div>
                    ))}

                  {/* Three or More Images */}
                  {images.length >= 3 && (
                    <>
                      <div className="col-sm-8">
                        <div className="img_wrapper h-100 position-relative">
                          <img
                            src={images[0]}
                            className="w-100 h-100"
                            alt="property-0"
                            onClick={() => openLightbox(0)}
                            style={{ cursor: "pointer", objectFit: "cover" }}
                          />
                        </div>
                      </div>

                      <div className="col-sm-4 d-flex flex-column gap-3">
                        {images.slice(1, 3).map((src, i) => (
                          <div
                            key={i}
                            className="img_wrapper flex-fill position-relative"
                          >
                            <img
                              src={src}
                              className="w-100 h-100"
                              alt={`property-${i + 1}`}
                              onClick={() => openLightbox(i + 1)}
                              style={{ cursor: "pointer", objectFit: "cover" }}
                            />
                            {/* Overlay for extra images */}
                            {i === 1 && images.length > 3 && (
                              <div
                                className="overlay_more_images position-absolute top-0 start-0 w-100 h-100 d-flex align-items-center justify-content-center text-white fw-bold fs-3"
                                style={{
                                  background: "rgba(0,0,0,0.5)",
                                  borderRadius: "8px",
                                  cursor: "pointer",
                                }}
                                onClick={() => openLightbox(2)}
                              >
                                <span className="gallery_more">
                                  {" "}
                                  +{images.length - 3} more
                                </span>
                              </div>
                            )}
                          </div>
                        ))}
                      </div>
                    </>
                  )}
                </div>
              ) : property.featured_image ? (
                // Case 2: Show featured image if gallery not present
                <div className="gallery_images mb-5 overflow-hidden">
                  <div className="col-12 overflow-hidden">
                    <div className="img_wrapper overflow-hidden">
                      <img
                        src={`https://${property.featured_image}`}
                        className="w-100"
                        alt="Featured Property"
                        style={{
                          height: "500px",
                          borderRadius: "8px",
                          objectFit: "cover",
                        }}
                      />
                    </div>
                  </div>
                </div>
              ) : (
                // Case 3: Default image if none available
                <div className="row mb-5 mt-2">
                  <div className="col-12">
                    <img
                      src="/images/default-property.png"
                      className="w-100 rounded-3"
                      alt="Default Property"
                      style={{
                        height: "350px",
                        objectFit: "contain",
                        backgroundColor: "#f5f5f5",
                      }}
                    />
                  </div>
                </div>
              )}

              {/* Lightbox */}
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
                    <h4 className="mb-3 single_head">Overview</h4>
                    <div className="row prop_desc">
                      <div className="col-6 col-lg-4 mb-4">
                        <div className="overview-element position-relative d-flex align-items-center">
                          <i className="fa-solid fa-bed"></i>
                          <div className="ms-3">
                            <h6 className="mb-0">Bedroom</h6>
                            <p className="text mb-0 ">
                              {property.bedrooms == null
                                ? "NA"
                                : property.bedrooms}
                            </p>
                          </div>
                        </div>
                      </div>
                      <div className="col-6 col-lg-4 mb-4">
                        <div className="overview-element position-relative d-flex align-items-center">
                          <i className="fa-solid fa-bath"></i>
                          <div className="ms-3">
                            <h6 className="mb-0">Bathrooms</h6>
                            <p className="text mb-0 ">
                              {property.bathrooms == null
                                ? "NA"
                                : property.bathrooms}
                            </p>
                          </div>
                        </div>
                      </div>
                      <div className="col-6 col-lg-4 mb-4">
                        <div className="overview-element position-relative d-flex align-items-center">
                          <i className="fa-solid fa-calendar-days"></i>
                          <div className="ms-3">
                            <h6 className="mb-0">Year Built</h6>
                            <p className="text mb-0 ">
                              {property.age_of_property == null
                                ? "NA"
                                : property.age_of_property}
                            </p>
                          </div>
                        </div>
                      </div>

                      <div className="col-6 col-lg-4 mb-4">
                        <div className="overview-element position-relative d-flex align-items-center">
                          <i className="fa-solid fa-chart-area"></i>

                          <div className="ms-3">
                            <h6 className="mb-0">Area</h6>
                            <p className="text mb-0 ">
                              {property.area_m2 && property.area_unit
                                ? `${property.area_m2 ?? ""} ${
                                    property.area_unit ?? ""
                                  }`.trim()
                                : "NA"}
                            </p>
                          </div>
                        </div>
                      </div>
                      <div className="col-6 col-lg-4 mb-4">
                        <div className="overview-element position-relative d-flex align-items-center">
                          <i className="fa-solid fa-home"></i>
                          <div className="ms-3">
                            <h6 className="mb-0">Property Type</h6>
                            <p className="text mb-0 text-capitalize">
                              {property.property_type == null
                                ? "NA"
                                : property.property_type}
                            </p>
                          </div>
                        </div>
                      </div>
                      <div className="col-6 col-lg-4 mb-4">
                        <div className="overview-element position-relative d-flex align-items-center">
                          <i className="fa-solid fa-car"></i>
                          <div className="ms-3">
                            <h6 className="mb-0">Parking Spaces</h6>
                            <p className="text mb-0 text-capitalize">
                              {property.parking_spaces == null
                                ? "NA"
                                : property.parking_spaces}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="">
                      <h4 className="mb-3 single_head">Property Description</h4>
                      <p
                        className={`text mb-2 description-text ${
                          showFullText ? "expanded" : ""
                        }`}
                        ref={descRef}
                        style={{
                          maxHeight: !showFullText ? "7.5em" : "none", // 5 lines if line-height = 1.5em
                          overflow: "hidden",
                          lineHeight: "1.5em",
                          transition: "max-height 0.3s ease",
                        }}
                      >
                        {property.description || "No description available"}
                      </p>

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
                  </div>

                  <div className="card overview_card border-0 d-none">
                    <div>
                      <h4 className="mb-3 single_head">Property Details</h4>
                      <div className="row">
                        <div className="col-md-6 col-xl-4">
                          <div className="d-flex justify-content-between">
                            <div className="pd-list">
                              <p className="fw600 mb10 ff-heading dark-color">
                                Property ID
                              </p>
                            </div>
                            <div className="pd-list">
                              <p className="text mb10">
                                {property.property_code == null
                                  ? "NA"
                                  : property.property_code}
                              </p>
                            </div>
                          </div>
                          <div className="d-flex justify-content-between">
                            <div className="pd-list">
                              <p className="fw600 mb10 ff-heading dark-color">
                                Price
                              </p>
                            </div>
                            <div className="pd-list">
                              <p className="text mb10">
                                {property.currency || property.price
                                  ? `${property.currency ?? ""} ${
                                      property.price ?? ""
                                    }`.trim()
                                  : "NA"}
                              </p>
                            </div>
                          </div>
                          <div className="d-flex justify-content-between">
                            <div className="pd-list">
                              <p className="fw600 mb10 ff-heading dark-color">
                                Property Size
                              </p>
                            </div>
                            <div className="pd-list">
                              <p className="text mb10">
                                {property.area_m2 && property.area_unit
                                  ? `${property.area_m2 ?? ""} ${
                                      property.area_unit ?? ""
                                    }`.trim()
                                  : "NA"}
                              </p>
                            </div>
                          </div>
                          <div className="d-flex justify-content-between">
                            <div className="pd-list">
                              <p className="fw600 mb10 ff-heading dark-color">
                                Bathrooms
                              </p>
                            </div>
                            <div className="pd-list">
                              <p className="text mb10">
                                {property.bathrooms == null
                                  ? "NA"
                                  : property.bathrooms}
                              </p>
                            </div>
                          </div>
                          <div className="d-flex justify-content-between">
                            <div className="pd-list">
                              <p className="fw600 mb10 ff-heading dark-color">
                                Bedrooms
                              </p>
                            </div>
                            <div className="pd-list">
                              <p className="text mb10">
                                {property.bedrooms == null
                                  ? "NA"
                                  : property.bedrooms}
                              </p>
                            </div>
                          </div>
                        </div>
                        <div className="col-md-6 col-xl-4 offset-xl-2">
                          <div className="d-flex justify-content-between">
                            <div className="pd-list">
                              <p className="fw600 mb10 ff-heading dark-color">
                                Balcony
                              </p>
                            </div>
                            <div className="pd-list">
                              <p className="text mb10">
                                {property.balconies == null
                                  ? "NA"
                                  : property.balconies}
                              </p>
                            </div>
                          </div>
                          <div className="d-flex justify-content-between">
                            <div className="pd-list">
                              <p className="fw600 mb10 ff-heading dark-color">
                                Carpet Area
                              </p>
                            </div>
                            <div className="pd-list">
                              <p className="text mb10">
                                {property.carpet_area == null
                                  ? "NA"
                                  : property.carpet_area}
                              </p>
                            </div>
                          </div>
                          <div className="d-flex justify-content-between">
                            <div className="pd-list">
                              <p className="fw600 mb10 ff-heading dark-color">
                                Year Built
                              </p>
                            </div>
                            <div className="pd-list">
                              <p className="text mb10">
                                {property.age_of_property == null
                                  ? "NA"
                                  : property.age_of_property}
                              </p>
                            </div>
                          </div>
                          <div className="d-flex justify-content-between">
                            <div className="pd-list">
                              <p className="fw600 mb10 ff-heading dark-color">
                                Property Type
                              </p>
                            </div>
                            <div className="pd-list">
                              <p className="text mb10 text-capitalize">
                                {property.property_type == null
                                  ? "NA"
                                  : property.property_type}
                              </p>
                            </div>
                          </div>
                          <div className="d-flex justify-content-between">
                            <div className="pd-list">
                              <p className="fw600 mb10 ff-heading dark-color">
                                Property Status
                              </p>
                            </div>
                            <div className="pd-list">
                              <p className="text mb10">
                                {property.listing_type == null
                                  ? "NA"
                                  : property.listing_type}
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="card overview_card border-0">
                    <h4 className="mb-3 single_head">Location</h4>
                    <div className="row">
                      <div className="col-md-12">
                        <iframe
                          className="position-relative w-100"
                          style={{ height: "250px" }}
                          loading="lazy"
                          src={`https://maps.google.com/maps?q=${property.latitude},${property.longitude}&t=m&z=14&output=embed&iwloc=near`}
                          title="Property Location"
                          aria-label="Property Location"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="card overview_card border-0">
                    <h4 className="mb-3 single_head">Energy Class</h4>
                    <div className="col-sm-12">
                      <div className="pd-list d-flex justify-content-between">
                        <p className="text mb10">
                          Global Energy Performance Index
                        </p>
                        <p>A+</p>
                      </div>
                      <div className="pd-list d-flex justify-content-between">
                        <p className="text mb10">
                          Renewable energy performance index
                        </p>
                        <p>92.42 kWh / m²a</p>
                      </div>
                      <div className="pd-list d-flex justify-content-between">
                        <p className="text mb10">
                          Energy performance of the building
                        </p>
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
                      <img
                        src="/images/energy-class.png"
                        className="w-100"
                        alt="performance scale"
                      />
                    </div>
                  </div>

                  {property.video_url && property.video_url.trim() !== "" && (
                    <div className="card overview_card border-0">
                      <h4 className="mb-3 single_head">Video Tour</h4>
                      <div
                        className="property_video bdrs12 w-100"
                        style={{
                          backgroundImage: `url(${
                            property.featured_image &&
                            property.featured_image.trim() !== "" &&
                            property.featured_image !== "null"
                              ? `https://${property.featured_image}`
                              : "/images/card4.jpg"
                          })`,
                          backgroundSize: "cover",
                          backgroundPosition: "center",
                        }}
                      >
                        <button
                          className="video_popup_btn mx-auto popup-img"
                          data-bs-toggle="modal"
                          data-bs-target="#VideoModal"
                        >
                          <i className="fa-solid fa-play"></i>
                        </button>
                      </div>

                      <div
                        className="modal fade"
                        id="VideoModal"
                        tabIndex="-1"
                        aria-labelledby="VideoModalLabel"
                        aria-hidden="true"
                      >
                        <div className="modal-dialog modal-dialog-centered modal-lg">
                          <div className="modal-content bg-dark">
                            <button
                              type="button"
                              className="btn-close btn-theme"
                              data-bs-dismiss="modal"
                              aria-label="Close"
                              onClick={(e) => {
                                const iframe = e.target
                                  .closest(".modal")
                                  .querySelector("iframe");
                                if (iframe) iframe.src = iframe.src;
                              }}
                            ></button>

                            <div className="modal-body">
                              <iframe
                                className="rounded-2 video_iframe"
                                width="100%"
                                src={getYouTubeEmbedUrl(
                                  property.video_url,
                                  true
                                )}
                                allow="accelerometer; autoplay; encrypted-media; gyroscope;"
                                allowFullScreen
                                tabIndex="-1"
                              ></iframe>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}

                  {property.amenities && property.amenities.trim() !== "" && (
                    <div className="card overview_card border-0 amenities_card">
                      <h4 className="mb-3 single_head">Features & Amenities</h4>
                      <div className="row">
                        {property.amenities.split(",").map((amenity, index) => (
                          <div className="col-sm-6 col-md-4" key={index}>
                            <div className="pd-list">
                              <p className="text mb10 text-capitalize">
                                <i className="fas fa-circle fz6 align-middle pe-3"></i>
                                {amenity.trim()}
                              </p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {property.floors && property.floors.length > 0 && (
                    <div className="card overview_card border-0">
                      <h4 className="mb-3 single_head">Floor Plan</h4>
                      <div className="accordion-style1 style2">
                        <div className="accordion" id="accordionExample">
                          {property.floors.map((floor, index) => (
                            <div className="accordion-item" key={floor.id}>
                              <h2
                                className="accordion-header"
                                id={`heading${index}`}
                              >
                                <button
                                  className="accordion-button collapsed"
                                  type="button"
                                  data-bs-toggle="collapse"
                                  data-bs-target={`#collapse${index}`}
                                  aria-expanded="false"
                                  aria-controls={`collapse${index}`}
                                >
                                  <span className="w-100 d-md-flex align-items-center">
                                    <span className="me-3">
                                      {floor.floor_title}
                                    </span>
                                    <span className="ms-auto d-md-flex align-items-center justify-content-end floor_accordion">
                                      <span className="me-3">
                                        <strong>Size:</strong> {floor.size}
                                      </span>
                                      <span className="me-3">
                                        <strong>Bedrooms:</strong>{" "}
                                        {floor.bedrooms}
                                      </span>
                                      <span className="me-3">
                                        <strong>Bathrooms:</strong>{" "}
                                        {floor.bathrooms}
                                      </span>
                                      <span>
                                        <strong>Price:</strong>{" "}
                                        {property.currency} {floor.price}
                                      </span>
                                    </span>
                                  </span>
                                </button>
                              </h2>
                              <div
                                id={`collapse${index}`}
                                className="accordion-collapse collapse"
                                aria-labelledby={`heading${index}`}
                                data-bs-parent="#accordionExample"
                              >
                                <div className="accordion-body text-center">
                                  {floor.floor_image ? (
                                    <img
                                      src={`https://${floor.floor_image}`}
                                      alt={floor.floor_title}
                                      className="w-100 rounded"
                                    />
                                  ) : (
                                    <p className="text-muted">
                                      No floor image available
                                    </p>
                                  )}
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  )}

                  {property.meta && property.meta.length > 0 &&
                    (() => {
                      const schools = property.meta.filter(
                        (m) => m.property_meta_key === "school"
                      );
                      const hospitals = property.meta.filter(
                        (m) => m.property_meta_key === "hospital"
                      );

                      if (schools.length === 0 && hospitals.length === 0)
                        return null;
                      const firstTab =
                        schools.length > 0 ? "education" : "health";

                      return (
                        <div className="card overview_card border-0 ">
                          <h4 className="mb-3 single_head">
                            What's nearby the property?
                          </h4>

                          <ul
                            className="nav nav-tabs mb-3"
                            id="nearbyTabs"
                            role="tablist"
                          >
                            {schools.length > 0 && (
                              <li className="nav-item">
                                <button
                                  className={`nav-link ${
                                    firstTab === "education" ? "active" : ""
                                  }`}
                                  id="education-tab"
                                  data-bs-toggle="tab"
                                  data-bs-target="#education"
                                  type="button"
                                  role="tab"
                                >
                                  Education
                                </button>
                              </li>
                            )}

                            {hospitals.length > 0 && (
                              <li className="nav-item">
                                <button
                                  className={`nav-link ${
                                    firstTab === "health" ? "active" : ""
                                  }`}
                                  id="health-tab"
                                  data-bs-toggle="tab"
                                  data-bs-target="#health"
                                  type="button"
                                  role="tab"
                                >
                                  Health & Medical
                                </button>
                              </li>
                            )}
                          </ul>

                          <div className="tab-content" id="nearbyTabsContent">
                            {schools.length > 0 && (
                              <div
                                className={`tab-pane fade ${
                                  firstTab === "education" ? "show active" : ""
                                }`}
                                id="education"
                                role="tabpanel"
                              >
                                <ul className="list-unstyled">
                                  {schools.map((m, i) => {
                                    const school = JSON.parse(
                                      m.property_meta_value
                                    );
                                    return (
                                      <li
                                        key={i}
                                        className="d-flex justify-content-between align-items-center mb-3"
                                      >
                                        <div className="d-flex">
                                          <h6 className="me-2 fw-semibold">
                                            {i + 1})
                                          </h6>
                                          <div>
                                            <h6 className="mb-1 fw-semibold">
                                              {school.name}
                                            </h6>
                                            <p className="text-muted">
                                              Type: {school.type} | Owner:{" "}
                                              {school.owner} | Distance:
                                              {school.distance}
                                            </p>
                                          </div>
                                        </div>
                                      </li>
                                    );
                                  })}
                                </ul>
                              </div>
                            )}

                            {hospitals.length > 0 && (
                              <div
                                className={`tab-pane fade ${
                                  firstTab === "health" ? "show active" : ""
                                }`}
                                id="health"
                                role="tabpanel"
                              >
                                <ul className="list-unstyled">
                                  {hospitals.map((m, i) => {
                                    const hospital = JSON.parse(
                                      m.property_meta_value
                                    );
                                    return (
                                      <li
                                        key={i}
                                        className="d-flex justify-content-between align-items-center mb-3"
                                      >
                                        <div className="d-flex">
                                          <h6 className="me-2 fw-semibold">
                                            {i + 1})
                                          </h6>
                                          <div>
                                            <h6 className="mb-1 fw-semibold">
                                              {hospital.name}
                                            </h6>
                                            <p className="text-muted">
                                              Type: {hospital.type} | Distance:{" "}
                                              {hospital.distance}
                                            </p>
                                          </div>
                                        </div>
                                      </li>
                                    );
                                  })}
                                </ul>
                              </div>
                            )}
                          </div>
                        </div>
                      );
                    })()}

                  <div className="card overview_card border-0">
                    <div className="agent_reviews">
                      <h5 className="fw-bold mb-3">
                        Reviews ({property?.reviews?.length || 0})
                      </h5>

                      {reviewsToShow?.length > 0 ? (
                        reviewsToShow.map((rev, index) => (
                          <div key={rev.id}>
                            <div className="col-md-12">
                              <div className="mbp_first position-relative d-flex align-items-center justify-content-start mt-3 mb-sm-3">
                                <img
                                  src={
                                    rev?.user?.profile?.profile_image
                                      ? `https://${rev.user.profile.profile_image}`
                                      : "/images/default_img.png"
                                  }
                                  alt="review"
                                  loading="lazy"
                                  width={50}
                                  height={50}
                                  className="rounded-circle object-fit-cover"
                                />

                                <div className="ms-4">
                                  <h6 className="mt-0 mb-0 fw-bold text-capitalize">
                                    {rev.user?.name || "User"}
                                  </h6>

                                  <div>
                                    <span className="fz12">
                                      {formatDate(rev.created_at)}
                                    </span>

                                    <div className="blog-single-review">
                                      <ul className="mb0 ps-0">
                                        {renderStars(rev.rating)}
                                      </ul>
                                    </div>
                                  </div>
                                </div>
                              </div>

                              <p className="text mb-0">{rev.review}</p>
                            </div>

                            {index !== reviewsToShow.length - 1 && <hr />}
                          </div>
                        ))
                      ) : (
                        <p className="text-muted">No reviews yet.</p>
                      )}

                      {/* SHOW MORE / LESS BUTTON */}
                      {property?.reviews?.length > 2 && (
                        <div className="col-12 d-flex justify-content-center mt-4">
                          <button
                            className="btn ud-btn btn-white search_home_btn black_btn"
                            onClick={() => setShowAllReviews(!showAllReviews)}
                          >
                            {showAllReviews ? "Show Less" : "Show More"}
                          </button>
                        </div>
                      )}
                    </div>
                  </div>




                    <div className="card overview_card border-0">
                      <h4 className="mb-4 single_head">Leave A Review</h4>

                      <form className="property_review_form" onSubmit={submitReview}>
                        <div className="col-12 mb-4">
                          <label className="mb-2">Message</label>
                          <textarea
                            rows={5}
                            placeholder="Write your message..."
                            className="form-control"
                            value={reviewText}
                            onChange={(e) => setReviewText(e.target.value)}
                          ></textarea>
                        </div>

                          <div className="col-12 mb-4">
                            <div className="d-flex flex-column">
                              <label className="mb-2">Fill Rating</label>

                              <div className="d-flex">
                                {[1, 2, 3, 4, 5].map((star) => (
                                  <i
                                    key={star}
                                    className={`fs-3 me-1 ${
                                      star <= rating
                                        ? "fa-solid fa-star text-theme"
                                        : "fa-regular fa-star text-theme"
                                    }`}
                                    style={{ cursor: "pointer" }}
                                    onClick={() => setRating(star)}
                                  ></i>
                                ))}
                              </div>
                            </div>
                          </div>

                          <button
                            type="submit"
                            className="btn ud-btn submit_review_btn"
                            disabled={reviewProcessing}
                          >
                            {reviewProcessing ? (
                              <>
                                Submitting...
                                <i className="fa fa-spinner fa-spin ms-2"></i>
                              </>
                            ) : (
                              <>
                                Submit Review
                                <i className="fa-solid fa-arrow-right ms-2"></i>
                              </>
                            )}
                          </button>
                      </form>

                     </div>


                </div>

                {/* Right Column - Sidebar */}
                <div className="col-lg-4">
                    {/* <div className="mb-4 subscribe_button">
                    <button
                      className="btn ud-btn btn-white contact_btn_light2  w-100"
                      data-bs-toggle="modal"
                      data-bs-target="#subscribeModal"
                      data-discover="true"
                    >
                    Subscribe for alerts <i className="fas fa-bell"></i>
                  </button>
                 </div> */}

                  <div id="enquiryForm" className="enquiry_section  mb-4">
                    <div className="card mb-4 overview_card border-0">
                      <h5 className="single_head mb-2">Send an enquiry</h5>

                      <form onSubmit={handleEnquirySubmit}>
                        <input
                          type="text"
                          name="name"
                          value={enquiry.name}
                          onChange={handleChange}
                          className="form-control mb-3"
                          placeholder="Your Name"
                          required
                        />
                        <input
                          type="email"
                          name="email"
                          value={enquiry.email}
                          onChange={handleChange}
                          className="form-control mb-3"
                          placeholder="Email"
                          required
                        />
                        <select
                          name="reason"
                          value={enquiry.reason}
                          onChange={handleChange}
                          className="form-select mb-3"
                          required
                        >
                          <option value="">Select reason</option>
                          <option value="Schedule Inspection">
                            Schedule Inspection
                          </option>
                          <option value="Price information">
                            Price information
                          </option>
                          <option value="Rates & Fees">Rates & Fees</option>
                        </select>
                        <textarea
                          name="message"
                          value={enquiry.message}
                          onChange={handleChange}
                          className="form-control mb-3"
                          placeholder="Message"
                          rows={3}
                          required
                        ></textarea>
                        <button
                          type="submit"
                          className="btn ud-btn black_btn search_home_btn w-100"
                        >
                          Submit <i className="fa-solid fa-arrow-right"></i>
                        </button>
                      </form>
                    </div>

                    <div className="card mb-0 overview_card agent_contact_card border-0 ">
                      <h5 className="single_head mb-4">Get More Information</h5>
                      <div className="d-flex align-items-center mb-3">
                        <Link onClick={handleContactClick}>
                          <img
                            src={
                              property?.user?.profile?.profile_image
                                ? `https://${property.user.profile.profile_image}`
                                : "/images/default_img.png"
                            }
                            alt="Agent"
                            className="rounded-circle agent_img me-3"
                          />
                        </Link>
                        {/* <Avatar
                      name={"Mark Klasen" || "Unknown Agent"}
                      src="" 
                      size="70"
                      round={true}
                      className="me-3"
                    /> */}
                        <div>
                          <Link onClick={handleContactClick}>
                            <h6 className="mb-2 fw-bold">
                              {property.user.name}
                            </h6>
                          </Link>
                          <div className="d-flex small align-items-center">
                            <i className="fa-solid fa-star text-theme"> </i> 5.0
                            (39 reviews)
                          </div>
                        </div>
                      </div>

                      <Link
                        onClick={handleContactClick}
                        className="btn ud-btn black_btn search_home_btn w-100"
                      >
                        Contact Agent{" "}
                        <i className="fa-solid fa-arrow-right"></i>
                      </Link>
                    </div>

                    {property?.user?.agency?.slug && (
                      <Link
                        to={`/agency/${property.user.agency.slug}`}
                        className="d-flex justify-content-between align-items-center py-2 px-3 bg-green rounded-bottom-4"
                      >
                        <h6 className="text-white m-0 fw-bold">
                          {property.user.agency.agency_name}
                        </h6>
                        <img
                          src={`https://${property.user.agency.logo}`}
                          style={{
                            width: "50px",
                            height: "50px",
                            objectFit: "cover",
                          }}
                          className="rounded-circle "
                          alt=""
                        />
                      </Link>
                    )}
                  </div>

                </div>

                <div
                  className="modal fade"
                  id="subscribeModal"
                  tabIndex="-1"
                  aria-labelledby="subscribeModalLabel"
                  aria-hidden="true"
                >
                  <div className="modal-dialog">
                    <div className="modal-content">
                      <div className="modal-header">
                        <h5
                          className="modal-title fw-bold"
                          id="subscribeModalLabel"
                        >
                          Subscribe for Property Alerts
                        </h5>
                        <button
                          type="button"
                          className="btn-close"
                          data-bs-dismiss="modal"
                          aria-label="Close"
                        ></button>
                      </div>

                      <div className="modal-body">
                        <form id="subscribeForm">
                          <div className="mb-3">
                            <label htmlFor="emailInput" className="form-label">
                              Email address
                            </label>
                            <input
                              type="email"
                              className="form-control"
                              id="emailInput"
                              name="email"
                              required
                            />
                          </div>

                          <div className="mb-3">
                            <label
                              htmlFor="alertTypeSelect"
                              className="form-label"
                            >
                              Alert Type
                            </label>
                            <select
                              className="form-select"
                              id="alertTypeSelect"
                              name="alertType"
                              required
                            >
                              <option value="">Select Alert Type</option>
                              <option value="Inspection">
                                Open House Scheduling
                              </option>
                              <option value="Price Change">Price Change</option>
                              <option value="high-interest">
                                High Interest Alerts
                              </option>
                            </select>
                          </div>

                          <button
                            type="submit"
                            className="btn btn-theme w-100 mt-4"
                          >
                            Subscribe
                          </button>
                        </form>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="row mt-4 search_right">
                <h2 className="sec-title mb-4">Similar Properties</h2>

                <div className="row">
                  {similarProperties.slice(0, 3).map((item) => (
                    <div key={item.id} className="col-lg-4 col-md-6 mb-4">
                      <div className="listing-style1">
                        <div className="list-thumb">
                          <img
                            alt={item.title}
                            src={
                              item.featured_image
                                ? `https://${item.featured_image}`
                                : "/images/default-property.png"
                            }
                            className="w-100"
                            loading="lazy"
                          />

                          <div className="sale-sticker-wrap">
                            {item.is_featured && (
                              <div className="list-tag fz12">
                                <i className="fa-solid fa-bolt me-1"></i>
                                Featured
                              </div>
                            )}

                            <div className="list-tag fz12 bg-dark ">
                              <i className="fa-solid fa-flag me-1"></i>
                              {item.listing_type}
                            </div>
                          </div>

                          <div className="list-price">
                            {item.currency}{" "}
                            {Number(item.price).toLocaleString()}
                          </div>
                        </div>

                        <div className="list-content">
                          <h6 className="list-title text-truncate text-capitalize">
                            <Link to={`/property/${item.slug}`}>
                              {item.title}
                            </Link>
                          </h6>

                          <p className="list-text  text-truncate text-capitalize">
                            {item.address || "N/A"}
                          </p>

                          <div className="list-meta d-flex align-items-center">
                            <Link to="#">
                              <i className="fas fa-bed"></i>{" "}
                              {item.bedrooms ?? "-"}
                            </Link>

                            <Link to="#">
                              <i className="fas fa-bath"></i>{" "}
                              {item.bathrooms ?? "-"}
                            </Link>
                            {
                              item.area_m2 && item.area_unit && (
                                <Link to="#">
                                  <i className="fa-solid fa-chart-area"></i>{" "}
                                  {item.area_m2} {item.area_unit}
                                </Link>
                              )
                            }

                            <Link to="#" className="text-capitalize">
                              <i className="fa-solid fa-home"></i>{" "}
                              {item.property_type}
                            </Link>
                          </div>

                          <hr />

                          <div className="list-meta2 d-flex justify-content-between align-items-center mt-3">
                            <Link
                              to={`/property/${item.slug}`}
                              className="view_details"
                            >
                              View details
                            </Link>

                            <div className="icons gap-2 d-flex align-items-center">
                              <Tooltip
                                text={
                                  similarLiked[item.id]
                                    ? "Remove from Favorites"
                                    : "Add to Favorites"
                                }
                              >
                                <Link
                                  to="#"
                                  className="icon d-block"
                                  onClick={() => toggleSimilarHeart(item.id)}
                                >
                                  {similarProcessing[item.id] ? (
                                    <i className="fa fa-spinner fa-spin text-theme"></i>
                                  ) : (
                                    <i
                                      className={`fa-heart ${
                                        similarLiked[item.id]
                                          ? "fa-solid text-danger"
                                          : "fa-regular"
                                      } ${similarAnimate[item.id] ? "pop-heart" : ""}`}
                                    ></i>
                                  )}
                                </Link>
                              </Tooltip>

                              <Link to="#">
                                <FaShareAlt />
                              </Link>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="col-lg-4 col-md-6 mb-0 mb-md-4 d-none">
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
                        <Link to="/property">Modern Glass Complex</Link>
                      </h6>
                      <p className="list-text">Austin, TX, USA</p>
                      <div className="list-meta d-flex align-items-center">
                        <Link to="#">
                          <i className="fas fa-bed"></i> 4
                        </Link>
                        <Link to="#">
                          <i className="fas fa-bath"></i> 3
                        </Link>
                        <Link to="#">
                          <i className="fa-solid fa-chart-area"></i> 1200
                        </Link>
                        <Link to="#">
                          <i className="fa-solid fa-home"></i> Apartment
                        </Link>
                      </div>
                      <hr />
                      <div className="list-meta2 d-flex justify-content-between align-items-center mt-3">
                        <Link to="/property" className="view_details">
                          View details
                        </Link>
                        <div className="icons d-flex align-items-center">
                        
                          <Link>
                            <FaRegHeart />
                          </Link>
                          <Tooltip text={"Share"}>
                            <Link className="icon" to="#" onClick={toggleShare}>
                              <FaShareAlt />
                            </Link>
                          </Tooltip>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
      <Footer />
    </>
  );
};

export default PropertySingle;
