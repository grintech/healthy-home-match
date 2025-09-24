import { useState, useEffect } from 'react';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import { Link } from 'react-router-dom';
import Tooltip from '../../components/Tooltip';
import api from '../../utils/axios';
import { useAuth } from '../../context/AuthContext';
import { toast } from 'react-toastify';

const SavedListings = () => {
  const { user } = useAuth();
  const [properties, setProperties] = useState([]);
  const [unsavingIds, setUnsavingIds] = useState([]);
   const [loading, setLoading] = useState(true);

  const [watchlists, setWatchlists] = useState([]);
  const [selectedListing, setSelectedListing] = useState(null);
  const [selectedWatchlistId, setSelectedWatchlistId] = useState('');

// Fetch Saved Properties
  useEffect(() => {
    if (!user?.id) return;

    api.get(`/saved-properties/${user.id}`)
      .then((res) => {
        if (res.data.success) {
          setProperties(res.data.data.map(p => ({ ...p, liked: true }))); // add liked state per property
        }
      })
      .catch((err) => console.error(err))
      .finally(() => setLoading(false)); 
  }, [user]);


  // Unsave property API
  const handleUnsaveProperty = async (propertyId) => {
    // Add property to unsaving state
    setUnsavingIds((prev) => [...prev, propertyId]);

    try {
      const res = await api.post(`/properties/unsave`, { propertyId, user_id: user.id });
      if (res.data.success) {
        setProperties((prev) => prev.filter((p) => p.id !== propertyId));
        toast.success(res.data.message || 'Property removed from saved listings!');
      } else {
        toast.error(res.data.message || 'Failed to remove property.');
      }
    } catch (err) {
      console.error(err);
      toast.error('Something went wrong while unsaving the property.');
    } finally {
      // Remove property from unsaving state
      setUnsavingIds((prev) => prev.filter((id) => id !== propertyId));
    }
  };


  useEffect(() => {
    const stored = localStorage.getItem('watchlists');
    if (stored) setWatchlists(JSON.parse(stored));
  }, []);


  const handleAddToWatchlist = () => {
    if (!selectedListing || !selectedWatchlistId) return;

    const updated = watchlists.map(w => {
      if (w.id === parseInt(selectedWatchlistId)) {
        const alreadyAdded = w.listings.find(l => l.id === selectedListing.id);
        if (!alreadyAdded) return { ...w, listings: [...w.listings, selectedListing] };
      }
      return w;
    });

    setWatchlists(updated);
    localStorage.setItem('watchlists', JSON.stringify(updated));
    setSelectedListing(null);
    setSelectedWatchlistId('');
    document.getElementById('addWatchlistModalClose')?.click();
  };



  return (
    <div className="user_dashboard">
      <Navbar />
      <div className="saved_listings py-5">
        <div className="container">
          {loading ? (
            <div className="d-flex flex-column justify-content-center align-items-center" style={{ height: "80vh" }}>
              <i className="fa-solid fa-home text-theme fs-1 loader-icon"></i>
              <span>Loading...</span>
            </div>
          ) : properties.length === 0 ? (
            <div className="d-flex flex-column justify-content-center align-items-center" style={{ height: "80vh" }}>
              <i className="fa-regular fa-heart text-theme fs-1"></i>
              <h5 className="mt-2 fw-bold">You have no saved properties yet!</h5>
            </div>
          ) : (
            <div className="col-lg-12">
              {properties.length > 0 && (
                <h1 className="mb-3 sec-title">Saved Listings ({properties.length})</h1>
              )}

              <div className="row search_right">
                {properties.map((listing) => (
                  <div key={listing.id} className="col-md-6 col-lg-4">
                    <div className="listing-style1">
                      <div className="list-thumb">
                        <img
                          alt={listing.title}
                          src={listing.featured_image ? `https://${listing.featured_image}` : "/images/default-property.png"}
                          className="w-100"
                          loading="lazy"
                        />
                        <div className="sale-sticker-wrap">
                          <div className="list-tag fz12">
                            <i className="fa-solid fa-bolt me-1"></i>{listing.performance_rating}
                          </div>
                          <div className="list-tag fz12 bg-dark">
                            <i className="fa-solid fa-flag me-1"></i>{listing.listing_type}
                          </div>
                        </div>
                        <div className="list-price">{listing.currency}-{listing.price}</div>
                      </div>

                      <div className="list-content">
                        <h6 className="list-title text-truncate">
                          <Link to={`/property/${listing.slug}`}>{listing.title}</Link>
                        </h6>
                        <p className="list-text">{listing.location}</p>
                        <div className="list-meta d-flex align-items-center">
                          <Link className='text-capitalize'><i className="fas fa-bed"></i> {listing.bedrooms}</Link>
                          <Link className='text-capitalize'><i className="fas fa-bath"></i> {listing.bathrooms}</Link>
                          {listing.area_m2 && listing.area_unit &&
                            <Link className=''><i className="fa-solid fa-chart-area"></i> {listing.area_m2} {listing.area_unit}</Link>
                          }
                          <Link className='text-capitalize'><i className="fa-solid fa-home"></i> {listing.property_type}</Link>
                        </div>
                        <hr />
                        <div className="list-meta2 d-flex justify-content-between align-items-center mt-3">
                          <Link to={`/property/${listing.slug}`} className="view_details">View details</Link>

                          <div className=" d-flex align-items-center gap-3 position-relative">
                      
                            <Tooltip text={"Add to watchlist"}>
                              <Link
                                data-bs-toggle="modal"
                                data-bs-target="#addWatchlistModal"
                                onClick={() => setSelectedListing(listing)}
                                className="btn btn-light btn-sm"
                              >
                                <i className="fa-solid fa-plus"></i>
                              </Link>
                            </Tooltip>                        

                            <Tooltip text={listing.liked ? "Unsave" : "Save"}>
                              <Link
                                to="#"
                               type="button"
                                onClick={() => listing.liked ? handleUnsaveProperty(listing.id) : null}
                                className="btn btn-light btn-sm "
                                disabled={unsavingIds.includes(listing.id)}
                              >
                               {unsavingIds.includes(listing.id) ? (
                                    <i className="fa fa-spinner fa-spin"></i>
                                  ) : (
                                    <i className={`fa-heart ${listing.liked ? "fa-solid text-danger" : "fa-regular"}`}></i>
                                  )}
                              </Link>
                            </Tooltip>

                          

                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Add to Watchlist Modal */}
      <div className="modal fade" id="addWatchlistModal" tabIndex="-1">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title fw-bold">Add this listing to a watchlist</h5>
              <button type="button" className="btn-close" data-bs-dismiss="modal" id="addWatchlistModalClose"></button>
            </div>
            <div className="modal-body">
              {watchlists.length === 0 ? (
                <h6 className='text-center m-0 py-4'>
                  No watchlists found. Please
                  <Link to="/watchlist" className="ms-1 me-1"
                    onClick={() => {
                      const modal = bootstrap.Modal.getInstance(document.getElementById('addWatchlistModal'));
                      if (modal) modal.hide();
                    }}
                  >
                    create a watchlist
                  </Link>
                  first.
                </h6>
              ) : (
                <>
                  <label className="form-label">Choose Watchlist:</label>
                  <select
                    className="form-select"
                    value={selectedWatchlistId}
                    onChange={(e) => setSelectedWatchlistId(e.target.value)}
                  >
                    <option value="">Select Watchlist</option>
                    {watchlists.map(w => (
                      <option className='text-capitalize' key={w.id} value={w.id}>
                        {w.name}
                      </option>
                    ))}
                  </select>
                  <div className="mt-2 d-flex justify-content-end">
                    <Link
                      to='/watchlist'
                      className='ms-1 text_blue text-capitalize text-underline'
                      onClick={() => {
                        const modal = bootstrap.Modal.getInstance(document.getElementById('addWatchlistModal'));
                        if (modal) modal.hide();
                      }}
                    >
                      create a new watchlist
                    </Link>
                  </div>
                </>
              )}
            </div>

            {watchlists.length > 0 && (
              <div className="modal-footer border-0 pt-0">
                <div className="d-flex w-100 justify-content-center align-items-center">
                  <button type="button" className="btn btn-dark mx-2" data-bs-dismiss="modal">Cancel</button>
                  <button
                    type="button"
                    className="btn btn-theme mx-2"
                    onClick={handleAddToWatchlist}
                    disabled={!selectedWatchlistId}
                  >
                    Add
                  </button>
                </div>
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
