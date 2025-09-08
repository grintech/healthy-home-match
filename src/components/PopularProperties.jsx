import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";

import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";


const PopularProperties = () => {
  const ApiUrl = import.meta.env.VITE_API_URL;
  const ApiKey = import.meta.env.VITE_API_KEY;

  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);


   const [shareModalOpen, setShareModalOpen] = useState(false);
  const [shareUrl, setShareUrl] = useState("");

  const [likedIds, setLikedIds] = useState(new Set());

  // Fetch API data
  useEffect(() => {
    const cachedData = sessionStorage.getItem("popular_properties");

    // Load cached data first for instant render
    if (cachedData) {
      setProperties(JSON.parse(cachedData));
      setLoading(false);
    }

    // Always fetch fresh data in background
    axios
      .get(`${ApiUrl}/property-list`, {
        headers: {
          "X-API-DOMAIN": "$2y$10$Vs8ujkh6QGdPgRU4Qsub7uP6l8fu5deHcfhF/ePrPWOkVWi3lDT0u",
        },
      })
      .then((res) => {
        if (res.data.status === true) {
          const newData = res.data.data;

          // Update state only if data is different from cached
          const oldData = cachedData ? JSON.parse(cachedData) : [];
          const isDifferent = JSON.stringify(newData) !== JSON.stringify(oldData);

          if (isDifferent) {
            setProperties(newData);
            sessionStorage.setItem("popular_properties", JSON.stringify(newData));
          }

          console.log(res.data.message || "Properties updated successfully");
        } else {
          console.warn(res.data.message || "Failed to fetch properties");
        }
      })
      .catch((err) => {
        console.error("Error fetching properties:", err);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [ApiUrl]);


  // Copy URL to clipboard function
  const handleCopy = (textToCopy, e) => {
    e.preventDefault();
    if (navigator.clipboard) {
      navigator.clipboard
        .writeText(textToCopy)
        .then(() => toast.success("Link copied to clipboard!"))
        .catch(() => toast.error("Failed to copy!"));
    } else {
      toast.error("Clipboard API not supported.");
    }
  };

  // Toggle like/unlike by property ID
  const toggleHeart = (propertyId, e) => {
    e.preventDefault();
    setLikedIds((prev) => {
      const newLiked = new Set(prev);
      if (newLiked.has(propertyId)) {
        newLiked.delete(propertyId); // unlike
      } else {
        newLiked.add(propertyId); // like
      }
      return newLiked;
    });
  };


  // Open modal and set URL to share
  const openShareModal = (url, e) => {
    e.preventDefault();
    setShareUrl(url);
    setShareModalOpen(true);
  };

  // Close modal
  const closeShareModal = () => setShareModalOpen(false);

  // Social share URLs
  const socialLinks = {
    facebook: (url) =>
      `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`,
    twitter: (url) =>
      `https://twitter.com/intent/tweet?url=${encodeURIComponent(url)}`,
    linkedin: (url) =>
      `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`,
    instagram: () => `https://www.instagram.com/`, // Instagram doesn't support direct share URLs
  };

  return (
    <section className="popular_properties pt-5 mt-5 pb-5">
      <div className="container">
        <div className="row ">
          <div className="col-lg-6">
            <h2 className="sec-title m-0">Discover Popular Properties</h2>
            <p className="paragraph">
              Handpicked properties that are trending right now.
            </p>
          </div>

          {properties.length > 0 && (
            <div className="col-lg-6">
              <div className="filter-menu d-flex justify-content-lg-end align align-items-center">
                <Link to='/homes' className="th-btn tab-btn active rounded-2" type="button">
                  View All <i className="fa-solid fa-arrow-right"></i>
                </Link>
              </div>
            </div>
          )}
        </div>

        {/* Cards */}
        {/* <div className="row ">
          {properties.length > 0 ? (
            properties.slice(0, 8).map((property) => {
              const url = `${window.location.origin}/property/${property.slug}`;

              return (
                <div className="col-md-6 col-xl-3" key={property.id}>
                  <div className="listing-style6">
                    <div className="list-thumb">
                      <img
                        alt={property.title}
                        loading="lazy"
                        className="w-100"
                        src={
                          property.featured_image
                            ? `https://${property.featured_image}`
                            : "/images/card1.jpg"
                        }
                      />
                      {property.is_featured && (
                        <div className="sale-sticker-wrap">
                          <div className="list-tag fz12">
                            <i className="fas fa-bolt me-1"></i>FEATURED
                          </div>
                        </div>
                      )}
                      <div className="list-meta">
                        <div className="icons">
                          <Link to="#" onClick={(e) => toggleHeart(property.id, e)}>
                            <i
                              className={
                                likedIds.has(property.id)
                                  ? "fa-solid fa-heart"
                                  : "fa-regular fa-heart"
                              }
                            ></i>
                          </Link>

                          <Link to="#" onClick={(e) => handleCopy(url, e)}>
                            <i className="fa-regular fa-copy"></i>
                          </Link>

                          <Link to="#" onClick={(e) => openShareModal(url, e)}>
                            <i className="fa-regular fa-share-from-square"></i>
                          </Link>
                        </div>
                      </div>
                    </div>
                    <Link to={`/property/${property.slug}`}>
                      <div className="list-content">
                        <h6 className="list-title text-capitalize text-truncate">
                          {property.title}
                        </h6>
                        <p className="list-text text-capitalize text-truncate">
                          {property.address}
                        </p>
                        <div className="list-price mb-2">${property.price}</div>
                      </div>
                    </Link>
                  </div>
                </div>
              );
            })
          ) : (
            <h6 className="text-theme fw-semibold">No properties found.</h6>
          )}

        </div> */}


        <div className="row">
          {loading
            ? Array.from({ length: 4 }).map((_, index) => (
                <div className="col-md-6 col-xl-3" key={index}>
                  <div className="listing-style6">
                    <div className="list-thumb">
                      <Skeleton height={330} borderRadius={8} />
                    </div>
                    <div className="list-content p-2">
                      <h6 className="list-title">
                        <Skeleton width={`80%`} height={20} />
                      </h6>
                      <p className="list-text">
                        <Skeleton width={`60%`} height={15} />
                      </p>
                      <div className=" mb-2">
                        <Skeleton width={120} height={40} />
                      </div>
                    </div>
                  </div>
                </div>
              ))
            : properties.length > 0
            ? properties.slice(0, 8).map((property) => {
                const url = `${window.location.origin}/property/${property.slug}`;
                return (
                <div className="col-md-6 col-xl-3" key={property.id}>
                  <div className="listing-style6">
                    <div className="list-thumb">
                      <img
                        alt={property.title}
                        loading="lazy"
                        className="w-100"
                        src={
                          property.featured_image
                            ? `https://${property.featured_image}`
                            : "/images/card1.jpg"
                        }
                      />
                      {property.is_featured && (
                        <div className="sale-sticker-wrap">
                          <div className="list-tag fz12">
                            <i className="fas fa-bolt me-1"></i>FEATURED
                          </div>
                        </div>
                      )}
                      <div className="list-meta">
                        <div className="icons">
                          <Link to="#" onClick={(e) => toggleHeart(property.id, e)}>
                            <i
                              className={
                                likedIds.has(property.id)
                                  ? "fa-solid fa-heart"
                                  : "fa-regular fa-heart"
                              }
                            ></i>
                          </Link>

                          <Link to="#" onClick={(e) => handleCopy(url, e)}>
                            <i className="fa-regular fa-copy"></i>
                          </Link>

                          <Link to="#" onClick={(e) => openShareModal(url, e)}>
                            <i className="fa-regular fa-share-from-square"></i>
                          </Link>
                        </div>
                      </div>
                    </div>
                    <Link to={`/property/${property.slug}`}>
                      <div className="list-content">
                        <h6 className="list-title text-capitalize text-truncate">
                          {property.title}
                        </h6>
                        <p className="list-text text-capitalize text-truncate">
                          {property.address}
                        </p>
                        <div className="list-price mb-2">${property.price}</div>
                      </div>
                    </Link>
                  </div>
                </div>           
                );
              })
            : (
              <h6 className="text-theme fw-semibold">No properties found.</h6>
            )}
        </div>



          {shareModalOpen && (
            <div
              className="modal fade show shareModal"
              style={{ display: "block", backgroundColor: "rgba(0,0,0,0.5)" }}
              tabIndex="-1"
              role="dialog"
              onClick={closeShareModal}
            >
              <div
                className="modal-dialog modal-dialog-centered"
                role="document"
                onClick={(e) => e.stopPropagation()}
              >
                <div className="modal-content p-2">
                  <div className="modal-header py-3">
                    <h5 className="modal-title fw-bold">Share this property</h5>
                    <button
                      type="button"
                      className="btn-close"
                      onClick={closeShareModal}
                    ></button>
                  </div>
                  <div className="modal-body d-flex justify-content-around">
                    <Link
                      to={socialLinks.facebook(shareUrl)}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label="Share on Facebook"
                    >
                      <i className="fa-brands fa-facebook "></i>
                    </Link>
                    <Link
                      to={socialLinks.twitter(shareUrl)}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label="Share on Twitter"
                    >
                      <i className="fa-brands fa-twitter "></i>
                    </Link>
                    <Link
                      to={socialLinks.linkedin(shareUrl)}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label="Share on LinkedIn"
                    >
                      <i className="fa-brands fa-linkedin "></i>
                    </Link>
                    <Link
                      to="https://www.whatsapp.com/"
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label="Share on Whatsapp"
                    >
                      <i className="fa-brands fa-whatsapp "></i>
                    </Link>

                    <Link 
                     onClick={() => {
                      navigator.clipboard.writeText(shareUrl);
                      toast.success("Link copied to clipboard!");
                    }}
                     >
                      <i className="fa-solid fa-link "></i>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          )}

      </div>
    </section>
  );
};

export default PopularProperties;
