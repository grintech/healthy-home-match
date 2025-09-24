import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import api from "../utils/axios";
import { useAuth } from "../context/AuthContext";

const PopularProperties = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);
  const [likedIds, setLikedIds] = useState(new Set());
  const [processingIds, setProcessingIds] = useState(new Set()); // new: for spinner

  const [shareModal, setShareModal] = useState(false);
  const [shareUrl, setShareUrl] = useState("");

  useEffect(() => {
    const cached = sessionStorage.getItem("popular_properties");
    if (cached) {
      setProperties(JSON.parse(cached));
      setLoading(false);
    }

    const url = user?.id ? `/property-list?user_id=${user.id}` : `/property-list`;

    api
      .get(url)
      .then((res) => {
        if (res.data.status) {
          const fresh = res.data.data;
          const saved = new Set(fresh.filter((p) => p.is_saved).map((p) => p.id));
          setLikedIds(saved);

          const old = cached ? JSON.parse(cached) : [];
          if (JSON.stringify(fresh) !== JSON.stringify(old)) {
            setProperties(fresh);
            sessionStorage.setItem("popular_properties", JSON.stringify(fresh));
          }
        }
      })
      .catch((err) => console.error("Error:", err))
      .finally(() => setLoading(false));
  }, [user]);

  const toggleHeart = async (id, e) => {
    e.preventDefault();
    if (!user?.id) {
      toast.error("Please login to save properties.");
      setTimeout(() => navigate("/login"), 2000);
      return;
    }

    // Start spinner for this property
    setProcessingIds((prev) => new Set(prev).add(id));

    try {
      if (likedIds.has(id)) {
        const res = await api.post("/properties/unsave", { user_id: user.id, propertyId: id });
        setLikedIds((prev) => {
          const updated = new Set(prev);
          updated.delete(id);
          return updated;
        });
        toast.success(res.data.message || "Removed from saved");
      } else {
        const res = await api.post("/properties/save", { user_id: user.id, propertyId: id });
        setLikedIds((prev) => new Set(prev).add(id));
        toast.success(res.data.message || "Property saved");
      }
    } catch (err) {
      console.error(err);
      toast.error("Something went wrong");
    } finally {
      // Remove spinner for this property
      setProcessingIds((prev) => {
        const updated = new Set(prev);
        updated.delete(id);
        return updated;
      });
    }
  };

  const handleCopy = (text, e) => {
    e.preventDefault();
    navigator.clipboard.writeText(text)
      .then(() => toast.success("Link copied!"))
      .catch(() => toast.error("Copy failed"));
  };

  const openShare = (url, e) => {
    e.preventDefault();
    setShareUrl(url);
    setShareModal(true);
  };

  const closeShare = () => setShareModal(false);

  const socials = {
    facebook: (url) => `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`,
    twitter: (url) => `https://twitter.com/intent/tweet?url=${encodeURIComponent(url)}`,
    linkedin: (url) => `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`,
  };

  return (
    <section className="popular_properties pt-5 mt-5 pb-5">
      <div className="container">
        <div className="row ">
          <div className="col-lg-6">
            <h2 className="sec-title m-0">Discover Popular Properties</h2>
            <p className="paragraph">Handpicked properties trending now.</p>
          </div>
          {properties.length > 0 && (
            <div className="col-lg-6 filter-menu d-flex justify-content-lg-end align-items-center">
              <Link to="/homes" className="th-btn tab-btn active rounded-2">
                View All <i className="fa-solid fa-arrow-right"></i>
              </Link>
            </div>
          )}
        </div>

        <div className="row">
          {loading
            ? Array.from({ length: 4 }).map((_, i) => (
                <div className="col-md-6 col-xl-3" key={i}>
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
                      <Skeleton width={120} height={40} />
                    </div>
                  </div>
                </div>
              ))
            : properties.length > 0
            ? properties.slice(0, 8).map((p) => {
                const url = `${window.location.origin}/property/${p.slug}`;
                return (
                  <div className="col-md-6 col-xl-3" key={p.id}>
                    <div className="listing-style6">
                      <div className="list-thumb">
                        <img
                          alt={p.title}
                          loading="lazy"
                          className="w-100"
                          src={p.featured_image ? `https://${p.featured_image}` : "/images/card1.jpg"}
                        />
                        {p.is_featured && (
                          <div className="sale-sticker-wrap">
                            <div className="list-tag fz12">
                              <i className="fas fa-bolt me-1"></i>FEATURED
                            </div>
                          </div>
                        )}
                        <div className="list-meta">
                          <div className="icons">
                            <Link
                              to="#"
                              onClick={(e) => toggleHeart(p.id, e)}
                              className="position-relative"
                            >
                              {processingIds.has(p.id) ? (
                                <i className="fa fa-spinner fa-spin text-theme"></i>
                              ) : (
                                <i
                                  className={
                                    likedIds.has(p.id)
                                      ? "fa-solid fa-heart text-theme"
                                      : "fa-regular fa-heart"
                                  }
                                ></i>
                              )}
                            </Link>
                            <Link to="#" onClick={(e) => handleCopy(url, e)}>
                              <i className="fa-regular fa-copy"></i>
                            </Link>
                            <Link to="#" onClick={(e) => openShare(url, e)}>
                              <i className="fa-regular fa-share-from-square"></i>
                            </Link>
                          </div>
                        </div>
                      </div>
                      <Link to={`/property/${p.slug}`}>
                        <div className="list-content">
                          <h6 className="list-title text-capitalize text-truncate">{p.title}</h6>
                          <p className="list-text text-capitalize text-truncate">{p.address}</p>
                          <div className="list-price mb-2">${p.price}</div>
                        </div>
                      </Link>
                    </div>
                  </div>
                );
              })
            : !loading && (
                <h6 className="text-theme fw-semibold">No properties found.</h6>
              )}
        </div>

        {shareModal && (
          <div
            className="modal fade show shareModal"
            style={{ display: "block", backgroundColor: "rgba(0,0,0,0.5)" }}
            onClick={closeShare}
          >
            <div className="modal-dialog modal-dialog-centered" onClick={(e) => e.stopPropagation()}>
              <div className="modal-content p-2">
                <div className="modal-header py-3">
                  <h5 className="modal-title fw-bold">Share this property</h5>
                  <button type="button" className="btn-close" onClick={closeShare}></button>
                </div>
                <div className="modal-body d-flex justify-content-around">
                  <Link to={socials.facebook(shareUrl)} target="_blank">
                    <i className="fa-brands fa-facebook"></i>
                  </Link>
                  <Link to={socials.twitter(shareUrl)} target="_blank">
                    <i className="fa-brands fa-twitter"></i>
                  </Link>
                  <Link to={socials.linkedin(shareUrl)} target="_blank">
                    <i className="fa-brands fa-linkedin"></i>
                  </Link>
                  <Link to="https://www.whatsapp.com/" target="_blank">
                    <i className="fa-brands fa-whatsapp"></i>
                  </Link>
                  <Link
                    to="#"
                    onClick={() => {
                      navigator.clipboard.writeText(shareUrl);
                      toast.success("Link copied!");
                    }}
                  >
                    <i className="fa-solid fa-link"></i>
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
