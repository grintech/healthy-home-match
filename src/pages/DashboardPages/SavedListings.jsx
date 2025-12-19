import { useState, useEffect } from 'react';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import { Link } from 'react-router-dom';
import Tooltip from '../../components/Tooltip';
import api from '../../utils/axios';
import { useAuth } from '../../context/AuthContext';
import { toast } from 'react-toastify';
import DashSidebar from './DashSidebar';

const SavedListings = () => {
  const { user } = useAuth();

  const [properties, setProperties] = useState([]);
  const [unsavingIds, setUnsavingIds] = useState([]);
  const [loading, setLoading] = useState(true);

  const [watchlists, setWatchlists] = useState([]);
  const [selectedListing, setSelectedListing] = useState(null);
  const [selectedWatchlistId, setSelectedWatchlistId] = useState('');
  const [addingToWatchlist, setAddingToWatchlist] = useState(false);

  /* ============================
     FETCH SAVED PROPERTIES
  ============================ */
  useEffect(() => {
    if (!user?.id) return;

    api
      .get(`/saved-properties/${user.id}`)
      .then((res) => {
        if (res.data.success) {
          setProperties(res.data.data.map(p => ({ ...p, liked: true })));
        }
      })
      .catch(() => toast.error('Failed to load saved properties'))
      .finally(() => setLoading(false));
  }, [user]);

  /* ============================
     FETCH WATCHLISTS (ON MODAL OPEN)
  ============================ */
  const fetchWatchlists = async () => {
    try {
      const res = await api.get('/list-saved-watchlist');
      if (res.data.status) {
        setWatchlists(res.data.data || []);
      } else {
        setWatchlists([]);
      }
    } catch (error) {
      setWatchlists([]);
    }
  };

  /* ============================
     UNSAVE PROPERTY
  ============================ */
  const handleUnsaveProperty = async (propertyId) => {
    setUnsavingIds((prev) => [...prev, propertyId]);

    try {
      const res = await api.post(`/properties/unsave`, {
        propertyId,
        user_id: user.id,
      });

      if (res.data.success) {
        setProperties((prev) => prev.filter((p) => p.id !== propertyId));
        toast.success(res.data.message || 'Property removed');
      } else {
        toast.error(res.data.message || 'Failed to remove');
      }
    } catch {
      toast.error('Something went wrong');
    } finally {
      setUnsavingIds((prev) => prev.filter((id) => id !== propertyId));
    }
  };

  /* ====== ADD PROPERTY TO WATCHLIST ========== */
  const handleAddToWatchlist = async () => {
  if (!selectedListing || !selectedWatchlistId) return;

  try {
    setAddingToWatchlist(true);

    const res = await api.post('/watchlist-items', {
      watchlist_id: selectedWatchlistId,
      property_id: selectedListing.id,
    });

    if (res.data.status) {
      toast.success(res.data.message || 'Added to watchlist');

      setSelectedListing(null);
      setSelectedWatchlistId('');
      document.getElementById('addWatchlistModalClose')?.click();
    } else {
      toast.info(res.data.message || 'Property already exists in watchlist');
    }
  } catch (error) {
    console.error(error);
    toast.error(
      error?.response?.data?.message ||
      'Something went wrong while adding to watchlist'
    );
  } finally {
    setAddingToWatchlist(false);
  }
};


  return (
    <div className="user_dashboard">
      <Navbar />

      <div className="saved_listings py-5">
        <div className="container">
          <div className="row">
            <div className="col-lg-4 col-xl-3 mb-4">
              <DashSidebar />
            </div>

            <div className="col-lg-8 col-xl-9">
              {loading ? (
                <div className="d-flex flex-column justify-content-center align-items-center" style={{ height: '80vh' }}>
                  <i className="fa-solid fa-home text-theme fs-1 loader-icon"></i>
                  <span>Loading...</span>
                </div>
              ) : properties.length === 0 ? (
                <div className="d-flex flex-column justify-content-center align-items-center" style={{ height: '80vh' }}>
                  <i className="fa-regular fa-heart text-theme fs-1"></i>
                  <h5 className="mt-2 fw-bold">You have no saved properties yet!</h5>
                </div>
              ) : (
                <>
                  <h1 className="mb-3 sec-title">Saved Listings ({properties.length})</h1>

                  <div className="row search_right">
                    {properties.map((listing) => (
                      <div key={listing.id} className="col-md-6 col-lg-6 col-xl-4">
                        <div className="listing-style1">
                          <div className="list-thumb">
                            <img
                              alt={listing.title}
                              src={
                                listing.featured_image
                                  ? `https://${listing.featured_image}`
                                  : "/images/default-property.png"
                              }
                              className="w-100"
                              loading="lazy"
                            />
                            <div className="sale-sticker-wrap">
                              {listing.performance_rating && (
                                <div className="list-tag fz12">
                                  <i className="fa-solid fa-bolt me-1"></i>
                                  {listing.performance_rating}
                                </div>
                              )}
                              {listing.listing_type && (
                                <div className="list-tag fz12 bg-dark">
                                  <i className="fa-solid fa-flag me-1"></i>
                                  {listing.listing_type}
                                </div>
                              )}
                            </div>
                            {listing.price && (
                              <div className="list-price">
                                {listing.currency}-{listing.price}
                              </div>
                            )}
                          </div>
                          <div className="list-content">
                            <h6 className="list-title text-truncate text-capitalize">
                              <Link to={`/property/${listing.slug}`}>
                                {listing.title}
                              </Link>
                            </h6>

                            <p className="list-text mb-2 text-truncate">{listing.address}</p>
                            <div className="list-meta d-flex align-items-baseline gap-2 flex-wrap">
                              {listing.bedrooms && (
                                <span className="d-flex align-items-center">
                                  <i className="fas fa-bed me-1"></i> {listing.bedrooms}
                                </span>
                              )}

                              {listing.bathrooms && (
                                <span className="d-flex align-items-center">
                                  <i className="fas fa-bath me-1"></i> {listing.bathrooms}
                                </span>
                              )}

                              {listing.area_m2 && listing.area_unit && (
                                <span className="d-flex align-items-center">
                                  <i className="fa-solid fa-chart-area me-1"></i>
                                  {listing.area_m2} {listing.area_unit}
                                </span>
                              )}

                              {listing.property_type && (
                                <span className="d-flex align-items-center text-capitalize">
                                  <i className="fa-solid fa-home me-1"></i>
                                  {listing.property_type}
                                </span>
                              )}
                            </div>

                            <hr />

                            <div className="list-meta2 d-flex justify-content-between align-items-center mt-3">
                              <Link
                                to={`/property/${listing.slug}`}
                                className="view_details"
                              >
                                View details
                              </Link>

                              <div className="d-flex align-items-center gap-3">
                                <Tooltip text="Add to watchlist">
                                  <Link
                                    className="btn btn-light btn-sm"
                                    data-bs-toggle="modal"
                                    data-bs-target="#addWatchlistModal"
                                    onClick={() => {
                                      setSelectedListing(listing);
                                      fetchWatchlists();
                                    }}
                                  >
                                    <i className="fa-solid fa-plus"></i>
                                  </Link>
                                </Tooltip>

                                <Tooltip text="Unsave">
                                  <button
                                    className="btn btn-light btn-sm"
                                    onClick={() => handleUnsaveProperty(listing.id)}
                                    disabled={unsavingIds.includes(listing.id)}
                                  >
                                    {unsavingIds.includes(listing.id) ? (
                                      <i className="fa fa-spinner fa-spin"></i>
                                    ) : (
                                      <i className="fa-solid fa-heart text-danger"></i>
                                    )}
                                  </button>
                                </Tooltip>
                              </div>

                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>

                </>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* ADD TO WATCHLIST MODAL */}
      <div className="modal fade" id="addWatchlistModal" tabIndex="-1">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title fw-bold">Add this listing to a watchlist</h5>
              <button type="button" className="btn-close" data-bs-dismiss="modal" id="addWatchlistModalClose"></button>
            </div>

            <div className="modal-body">
              {watchlists.length === 0 ? (
               <div className='text-center'>
                 <h6 className="text-center  mb-3 fw-bold"> <i className="fa-solid fa-home text-theme fs-4"></i> <br /> <br />
                  No watchlists found.
                  <br />
                </h6>
                  <Link to="/watchlist"
                    onClick={(e) => {
                      e.preventDefault(); // prevent default navigation for a moment

                      const modalEl = document.getElementById('addWatchlistModal');
                      const modal = window.bootstrap?.Modal.getInstance(modalEl);

                      modal?.hide();
                      const backdrop = document.querySelector('.modal-backdrop');
                      if (backdrop) backdrop.remove();

                      setTimeout(() => {
                        window.location.href = '/watchlist';
                      }, 100);
                    }}
                    className='btn btn-green'
                  >
                    Create a watchlist
                  </Link>

                </div>
              ) : (
                <>
                  <label className="form-label">Choose Watchlist</label>
                  <select
                    className="form-select"
                    value={selectedWatchlistId}
                    onChange={(e) => setSelectedWatchlistId(e.target.value)}
                  >
                    <option value="">Select Watchlist</option>
                    {watchlists.map((w) => (
                      <option key={w.id} value={w.id} className="text-capitalize">
                        {w.title}
                      </option>
                    ))}
                  </select>
                  <div className="text-end mt-2">
                     <Link to="/watchlist"
                    onClick={(e) => {
                      e.preventDefault(); 
                      const modalEl = document.getElementById('addWatchlistModal');
                      const modal = window.bootstrap?.Modal.getInstance(modalEl);

                      modal?.hide();
                      const backdrop = document.querySelector('.modal-backdrop');
                      if (backdrop) backdrop.remove();

                      setTimeout(() => {
                        window.location.href = '/watchlist';
                      }, 100);
                    }}
                    className='text-theme text-underline'
                  >
                    Create a watchlist
                  </Link>
                  </div>
                </>
              )}
            </div>

            {watchlists.length > 0 && (
              <div className="modal-footer border-0">
                <button className="btn btn-dark" data-bs-dismiss="modal">
                  Cancel
                </button>
                <button
                  className="btn btn-theme"
                  onClick={handleAddToWatchlist}
                  disabled={!selectedWatchlistId || addingToWatchlist}
                >
                  {addingToWatchlist ? 'Adding...' : 'Add'}
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default SavedListings;
