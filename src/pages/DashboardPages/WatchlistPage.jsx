import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import api from "../../utils/axios";
import { toast } from "react-toastify";
import Tooltip from "../../components/Tooltip";

const WatchlistPage = () => {
  const { slug } = useParams();
  const navigate = useNavigate();

  const [watchlist, setWatchlist] = useState(null);
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);

  const [showModal, setShowModal] = useState(false);
  const [selectedProperty, setSelectedProperty] = useState(null);
  const [removing, setRemoving] = useState(false);

  useEffect(() => {
    if (!slug) return;

    const fetchWatchlistItems = async () => {
      try {
        setLoading(true);
        const res = await api.get(`/list-watchlist-items/${slug}`);

        if (res.data.status) {
          setWatchlist(res.data.watchlist);
          setProperties(res.data.properties?.data || []);

          if (!res.data.properties?.data?.length) {
            toast.info("No property in this watchlist");
          }
        } else {
          toast.error("Failed to load watchlist");
        }
      } catch (err) {
        toast.error("Something went wrong while fetching watchlist");
      } finally {
        setLoading(false);
      }
    };

    fetchWatchlistItems();
  }, [slug]);

  /* ====== OPEN CONFIRMATION MODAL ======== */
  const openDeleteModal = (property) => {
    setSelectedProperty(property);
    setShowModal(true);
  };

  const closeModal = () => {
    if (!removing) {
      setShowModal(false);
      setSelectedProperty(null);
    }
  };

  /* ===== REMOVE PROPERTY API ===== */
  const confirmRemove = async () => {
    if (!selectedProperty) return;

    try {
      setRemoving(true);

      const formData = new FormData();
      formData.append("watchlist_id", watchlist.id);
      formData.append("property_id", selectedProperty.id);

      const res = await api.post("/delete-watchlist-items", formData);

      if (res.data.status) {
        toast.success(res.data.message || "Property removed");

        setProperties((prev) =>
          prev.filter((item) => item.id !== selectedProperty.id)
        );

        setShowModal(false);
        setSelectedProperty(null);
      } else {
        toast.error(res.data.message || "Failed to remove property");
      }
    } catch (err) {
      toast.error("Something went wrong while removing property");
    } finally {
      setRemoving(false);
    }
  };

  return (
    <div className="user_dashboard">
      <Navbar />

      <div className="container py-5 watchlist_properties " style={{minHeight:"80vh"}}>
        <Link className="text_blue" onClick={() => navigate(-1)}>
          <i className="fa-solid fa-chevron-left"></i>{" "}
          <span className="text-underline">Back</span>
        </Link>

        {loading && (
          <div className="text-center py-5">
            <i className="fa-solid fa-home fs-1 text-theme"></i>
            <p>Loading watchlist...</p>
          </div>
        )}

        {!loading && watchlist && (
          <>
            <h1 className="mb-4 mt-2 fw-bold fs-4">
              Watchlist: <span className="text-theme">{watchlist.title}</span>
            </h1>

            {properties.length === 0 && (
              <div className="text-center py-5">
                <i className="fa-regular fa-heart fs-2 text-theme"></i>
                <h6 className="mt-3">No property in this watchlist</h6>
              </div>
            )}

           {properties.length > 0 && (
              <div className="row search_right">
                {properties.map((item) => (
                  <div className="col-md-6 col-lg-4 " key={item.id}>
                    {/* ===== YOUR CARD (UNCHANGED) ===== */}
                    <div className="listing-style1 ">
                      <div className="list-thumb">
                        <img
                          src={
                            item.featured_image
                              ? `https://${item.featured_image}`
                              : "/images/default-property.png"
                          }
                          alt={item.title}
                          className="w-100"
                        />
                        <div className="sale-sticker-wrap">
                          <div className="list-tag fz12">
                            <i className="fa-solid fa-bolt me-1"></i>
                            {item.performance_rating}
                          </div>
                          <div className="list-tag fz12 bg-dark">
                            <i className="fa-solid fa-flag me-1"></i>
                            {item.listing_type}
                          </div>
                        </div>
                        <div className="list-price">
                          {item.currency}-{item.price}
                        </div>
                      </div>

                      <div className="list-content">
                        <h6 className="list-title text-truncate text-capitalize">
                          <Link to={`/property/${item.slug}`}>
                            {item.title}
                          </Link>
                        </h6>
                        <p className="list-text text-truncate">
                          {item.address}
                        </p>

                        <div className="list-meta d-flex gap-3">
                          <span>
                            <i className="fas fa-bed"></i> {item.bedrooms}
                          </span>
                          <span>
                            <i className="fas fa-bath"></i> {item.bathrooms}
                          </span>
                          {item.area_m2 && (
                            <span>
                              <i className="fa-solid fa-chart-area"></i>{" "}
                              {item.area_m2} {item.area_unit}
                            </span>
                          )}
                          <span className="text-capitalize">
                            <i className="fas fa-home"></i>{" "}
                            {item.property_type}
                          </span>
                        </div>

                        <hr className="text-dark" />
                        <div className="list-meta2 d-flex justify-content-between align-items-center">
                          <Link
                            to={`/property/${item.slug}`}
                            className="view_details"
                          >
                            View details
                          </Link>

                          <Tooltip text="Remove">
                            <div
                              className="btn btn-sm btn-danger"
                              onClick={() => openDeleteModal(item)}
                            >
                              <i className="fa-solid fa-trash"></i>
                            </div>
                          </Tooltip>
                        </div>
                      </div>
                    </div>
                    {/* ===== END CARD ===== */}
                  </div>
                ))}
              </div>
            )}

            
          </>
        )}
      </div>

      {/* ===== BOOTSTRAP CONFIRM MODAL ======= */}
      {showModal && (
        <div className="modal fade show d-block" tabIndex="-1">
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title fw-bold">Remove Property</h5>
                <button
                  type="button"
                  className="btn-close"
                  onClick={closeModal}
                ></button>
              </div>

              <div className="modal-body text-center">
                <h6>
                  Are you sure you want to remove this property from this watchlist.
                </h6>
              </div>

              <div className="modal-footer d-flex justify-content-center">
                <button
                  className="btn btn-dark"
                  onClick={closeModal}
                  disabled={removing}
                >
                  Cancel
                </button>

                <button
                  className="btn btn-danger"
                  onClick={confirmRemove}
                  disabled={removing}
                >
                  {removing ? "Removing..." : "Remove"}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {showModal && <div className="modal-backdrop fade show"></div>}

      <Footer />
    </div>
  );
};

export default WatchlistPage;
